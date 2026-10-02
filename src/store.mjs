import {mkdir, readFile, writeFile, rename, rm, readdir} from 'node:fs/promises';
import {resolve, dirname, posix} from 'node:path';
import {randomUUID} from 'node:crypto';
import unzipper from 'unzipper';

export const MAX_ZIP = 128 * 1024 * 1024;
const MAX_EXPANDED = 512 * 1024 * 1024;
export function safePath(value) {
  if (typeof value !== 'string' || !value || /[\\:\x00-\x1f?#]/.test(value) || value.startsWith('/') || value.split('/').some(x => x === '..' || x === '.' || /[. ]$/.test(x) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(x))) throw new Error('模型路径不安全');
  return value;
}
function label(value) {
  if(typeof value !== 'string' || !value.trim() || value.trim().length > 80) throw new Error('名称需为 1–80 个字符');
  return value.trim();
}
function resource(modelPath, file, files) {
  safePath(file);
  const full = posix.join(posix.dirname(modelPath), file);
  if(!files.has(full)) throw new Error('模型缺少资源：' + full);
  return full;
}
export function inspectModel(files, mocPath) {
  const candidates = [...files.keys()].filter(x => x.endsWith('.model3.json')).sort();
  let model, modelPath;
  for(const p of candidates) {
    const data = JSON.parse(files.get(p).toString('utf8'));
    if(data.FileReferences?.Moc && resource(p, data.FileReferences.Moc, files) === mocPath) {
      if(model) throw new Error('同一 moc3 对应多个 model3.json，请保留一个配置');
      model=data; modelPath=p;
    }
  }
  if(!model) {
    const base=posix.dirname(mocPath);
    const relative=p=>posix.relative(base,p);
    const inside=[...files.keys()].filter(p=>base==='.' || p.startsWith(base+'/'));
    const textures=inside.filter(p=>/\.png$/i.test(p)).sort();
    if(!textures.length) throw new Error('moc3 需要配套 PNG 纹理');
    modelPath=posix.join(base,'generated.model3.json');
    if(files.has(modelPath)) throw new Error('自动模型配置文件名冲突');
    const motions=inside.filter(p=>p.endsWith('.motion3.json')).sort();
    const expressions=inside.filter(p=>p.endsWith('.exp3.json')).sort();
    const physics=inside.filter(p=>p.endsWith('.physics3.json'));
    if(physics.length>1) throw new Error('发现多个 physics3.json，请提供 model3.json 指定物理配置');
    model={Version:3,FileReferences:{Moc:relative(mocPath),Textures:textures.map(relative),Motions:{Actions:motions.map(p=>({File:relative(p)}))},Expressions:expressions.map(p=>({Name:posix.basename(p,'.exp3.json'),File:relative(p)})),...(physics[0]?{Physics:relative(physics[0])}:{})}};
    files.set(modelPath,Buffer.from(JSON.stringify(model,null,2)));
  }
  const refs=model.FileReferences;
  if(!Array.isArray(refs.Textures)||!refs.Textures.length) throw new Error('模型没有纹理配置');
  const allowed=new Set([modelPath,mocPath]);
  const add=p=>allowed.add(resource(modelPath,p,files));
  refs.Textures.forEach(add);
  for(const key of ['Physics','Pose','UserData','DisplayInfo']) if(refs[key]) add(refs[key]);
  const actions=[];
  for(const [group,rows] of Object.entries(refs.Motions??{})) {
    if(!Array.isArray(rows)) throw new Error('动作组必须是数组');
    rows.forEach((row,index)=>{add(row.File);if(row.Sound)add(row.Sound);actions.push({id:'motion:'+encodeURIComponent(group)+':'+index,kind:'motion',group,index,name:posix.basename(row.File,'.motion3.json')});});
  }
  for(const row of refs.Expressions??[]) {add(row.File);actions.push({id:'expression:'+encodeURIComponent(row.Name),kind:'expression',expressionId:row.Name,name:row.Name});}
  if(new Set(actions.map(x=>x.id)).size!==actions.length) throw new Error('模型存在重复表情名称');
  if(actions.length>1000) throw new Error('动作数量超过 1000');
  return {modelPath,model,actions,allowed:[...allowed]};
}

const hiyoriNames={hiyori_m01:'低头抬眼，轻轻侧头',hiyori_m02:'左右歪头，眨眼张嘴',hiyori_m05:'侧头闭眼微笑',hiyori_m03:'抬眼侧头，身体轻摆',hiyori_m04:'低头左右看',hiyori_m06:'身体后仰，睁眼张嘴',hiyori_m07:'脸红皱眉，低头张嘴',hiyori_m08:'垂眼低头，张嘴'};
function nameHiyori(character){for(const action of character.actions){const row=character.model.FileReferences.Motions?.[action.group]?.[action.index];if(!row)continue;const original=posix.basename(row.File,'.motion3.json'),name=hiyoriNames[original];if(name&&action.name===original){action.name=name;action.named=true;}else if(name&&action.named===undefined)action.named=true;}}
export class StageStore {
  constructor(root) {this.root=resolve(root);this.state={version:1,selectedId:null,characters:[]};this.queue=Promise.resolve();this.sequence=0;this.events=[];this.receipts=new Map();this.clients=new Map();this.epoch=randomUUID();}
  async initialize() {await mkdir(this.root,{recursive:true});try{this.state=JSON.parse(await readFile(resolve(this.root,'characters.json'),'utf8'));if(this.state.version!==1||!Array.isArray(this.state.characters))throw new Error('角色配置版本不支持');}catch(e){if(e.code!=='ENOENT')throw e;}}
  async transaction(fn) {
    const job=this.queue.then(async()=>{const previous=structuredClone(this.state);try{const result=await fn();const tmp=resolve(this.root,'characters.'+randomUUID()+'.tmp');try{await writeFile(tmp,JSON.stringify(this.state,null,2));await rename(tmp,resolve(this.root,'characters.json'));}finally{await rm(tmp,{force:true});}return result;}catch(e){this.state=previous;throw e;}});
    this.queue=job.catch(()=>{});return job;
  }
  async ensureDefaultCharacter(directory) {
    let createdDirectory;
    try {return await this.transaction(async()=>{
      const existing=this.state.characters.find(c=>c.builtin==='hiyori');
      if(existing){nameHiyori(existing);if(!this.state.characters.some(c=>c.id===this.state.selectedId))this.state.selectedId=existing.id;return existing;}
      const files=new Map();
      async function scan(dir,prefix=''){for(const entry of await readdir(dir,{withFileTypes:true})){const p=prefix+entry.name;safePath(p);if(entry.isDirectory())await scan(resolve(dir,entry.name),p+'/');else if(entry.isFile())files.set(p,await readFile(resolve(dir,entry.name)));else throw new Error('默认模型资源不允许链接');}}
      await scan(directory);
      const mocs=[...files.keys()].filter(p=>p.endsWith('.moc3'));
      if(mocs.length!==1||files.get(mocs[0]).subarray(0,4).toString()!=='MOC3')throw new Error('默认 Hiyori 模型资源无效');
      const info=inspectModel(files,mocs[0]),id=randomUUID();
      createdDirectory=resolve(this.root,'models',id);
      for(const p of info.allowed){const target=resolve(createdDirectory,p);await mkdir(dirname(target),{recursive:true});await writeFile(target,files.get(p));}
      const character={id,name:'Hiyori',builtin:'hiyori',modelPath:info.modelPath,model:info.model,actions:info.actions,files:info.allowed};
      nameHiyori(character);
      this.state.characters.push(character);
      if(!this.state.characters.some(c=>c.id===this.state.selectedId))this.state.selectedId=id;
      return character;
    });}catch(error){if(createdDirectory)await rm(createdDirectory,{recursive:true,force:true});throw error;}
  }
  preferences() {return {desktopFloating:false,actionControl:false,visible:true,...this.state.preferences};}
  async updatePreferences(value) {return this.transaction(()=>{for(const [key,v] of Object.entries(value))if(!['desktopFloating','actionControl','visible'].includes(key)||typeof v!=='boolean')throw new Error('无效的 Live2D 开关');this.state.preferences={...this.preferences(),...value};return this.snapshot();});}
  snapshot() {return structuredClone({...this.state,preferences:this.preferences(),chatRequest:this.chatRequest??0,epoch:this.epoch});}
  character(id=this.state.selectedId) {const c=this.state.characters.find(x=>x.id===id);if(!c)throw new Error('请先导入并选择角色');return c;}
  catalog() {const c=this.character();return {characterId:c.id,characterName:c.name,actions:c.actions};}
  async importZip(bytes,name) {
    name=label(name);
    if(!bytes.length||bytes.length>MAX_ZIP)throw new Error('ZIP 大小须小于 128 MiB');
    const archive=await unzipper.Open.buffer(bytes);
    if(archive.files.length>5000) throw new Error('ZIP 文件数超过 5000');
    const files=new Map();let total=0;
    for(const entry of archive.files) {
      const p=safePath(entry.path.replace(/\/$/,''));
      if(entry.type==='Directory')continue;
      if((entry.externalFileAttributes>>>16&0xf000)===0xa000)throw new Error('ZIP 不允许符号链接');
      if(entry.flags&1)throw new Error('不支持加密 ZIP');
      total+=entry.uncompressedSize;
      if(total>MAX_EXPANDED||entry.uncompressedSize>MAX_ZIP)throw new Error('ZIP 解压体量超限');
      if([...files.keys()].some(x=>x.toLowerCase()===p.toLowerCase()))throw new Error('ZIP 存在重复路径');
      const chunks=[];let size=0;
      for await(const chunk of entry.stream()) {size+=chunk.length;if(size>entry.uncompressedSize||size>MAX_ZIP)throw new Error('ZIP 资源体量异常');chunks.push(chunk);}
      if(size!==entry.uncompressedSize)throw new Error('ZIP 资源不完整');
      files.set(p,Buffer.concat(chunks));
    }
    const mocs=[...files.keys()].filter(x=>/\.moc3$/i.test(x));
    if(mocs.length!==1)throw new Error(mocs.length?'一个角色 ZIP 请只放一个 moc3 模型':'从 ZIP 根目录及其子目录未找到 moc3');
    if(files.get(mocs[0]).subarray(0,4).toString()!=='MOC3')throw new Error('moc3 文件头无效');
    const info=inspectModel(files,mocs[0]);
    const id=randomUUID(),directory=resolve(this.root,'models',id);
    const character={id,name,modelPath:info.modelPath,model:info.model,actions:info.actions,files:info.allowed};
    try {
      for(const p of info.allowed) {const target=resolve(directory,p);await mkdir(dirname(target),{recursive:true});await writeFile(target,files.get(p));}
      await this.transaction(()=>{this.state.characters.push(character);this.state.selectedId=id;});
      return character;
    } catch(e) {await rm(directory,{recursive:true,force:true});throw e;}
  }
  async update(args) {return this.transaction(()=>{const c=this.character(args.characterId);if(args.select===true)this.state.selectedId=c.id;if(args.name!==undefined)c.name=label(args.name);if(args.actionId!==undefined){const a=c.actions.find(x=>x.id===args.actionId);if(!a)throw new Error('动作不存在');a.name=label(args.actionName);a.named=true;}return this.snapshot();});}
  play(characterId,actionId) {
    const c=this.character(characterId);
    if(c.id!==this.state.selectedId)throw new Error('角色已切换，请重新读取动作列表');
    const action=c.actions.find(a=>a.id===actionId);if(!action)throw new Error('请从当前角色动作列表选择有效 ID');
    if(![...this.clients.values()].some(x=>x.characterId===c.id&&Date.now()-x.time<4000))throw new Error('Live2D 预览尚未就绪，请先打开预览并等待模型加载');
    const event={id:randomUUID(),seq:++this.sequence,characterId:c.id,action:structuredClone(action),createdAt:Date.now()};
    this.events.push(event);if(this.events.length>64)this.events.shift();
    this.receipts.set(event.id,{eventId:event.id,status:'queued'});if(this.receipts.size>128)this.receipts.delete(this.receipts.keys().next().value);
    return {eventId:event.id,status:'queued'};
  }
  poll(clientId,characterId,after,ready) {
    if(typeof clientId!=='string'||clientId.length>80)throw new Error('无效预览客户端');
    for(const [id,c]of this.clients)if(Date.now()-c.time>10000)this.clients.delete(id);
    this.clients.set(clientId,{characterId:ready?characterId:null,time:Date.now()});
    return {epoch:this.epoch,sequence:this.sequence,events:after===null?[]:this.events.filter(e=>e.seq>after&&e.characterId===characterId&&Date.now()-e.createdAt<10000)};
  }
  receipt(args) {if(!this.receipts.has(args.eventId))throw new Error('演出请求已过期');if(!['played','failed'].includes(args.status))throw new Error('无效演出回执');this.receipts.set(args.eventId,{eventId:args.eventId,status:args.status});return this.receipts.get(args.eventId);}
}
