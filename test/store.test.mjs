import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {StageStore,safePath} from '../src/store.mjs';
// Minimal stored ZIP fixtures, generated in memory; never shipped in the plugin.
function crc(bytes){let n=0xffffffff;for(const b of bytes){n^=b;for(let i=0;i<8;i++)n=(n>>>1)^((n&1)?0xedb88320:0);}return(n^0xffffffff)>>>0;}
function zip(entries){const local=[],central=[];let offset=0;for(const [name,value]of Object.entries(entries)){const data=Buffer.from(typeof value==='string'?value:JSON.stringify(value)),filename=Buffer.from(name),a=Buffer.alloc(30),b=Buffer.alloc(46);a.writeUInt32LE(0x04034b50);a.writeUInt16LE(20,4);a.writeUInt32LE(crc(data),14);a.writeUInt32LE(data.length,18);a.writeUInt32LE(data.length,22);a.writeUInt16LE(filename.length,26);b.writeUInt32LE(0x02014b50);b.writeUInt16LE(20,4);b.writeUInt16LE(20,6);b.writeUInt32LE(crc(data),16);b.writeUInt32LE(data.length,20);b.writeUInt32LE(data.length,24);b.writeUInt16LE(filename.length,28);b.writeUInt32LE(offset,42);local.push(a,filename,data);central.push(b,filename);offset+=a.length+filename.length+data.length;}const dir=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(central.length/2,8);end.writeUInt16LE(central.length/2,10);end.writeUInt32LE(dir.length,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,dir,end]);}
const model={Version:3,FileReferences:{Moc:'model.moc3',Textures:['texture.png'],Motions:{Idle:[{File:'idle.motion3.json'}]},Expressions:[{Name:'smile',File:'smile.exp3.json'}]}};
const fixture=(prefix='')=>Object.fromEntries(Object.entries({'model.moc3':'MOC3fixture','texture.png':'png-fixture','model.model3.json':model,'idle.motion3.json':{},'smile.exp3.json':{}}).map(([k,v])=>[prefix+k,v]));
async function isolated(fn){const root=await mkdtemp(join(tmpdir(),'live2d-stage-test-'));try{const store=new StageStore(root);await store.initialize();await fn(store,root);}finally{await rm(root,{recursive:true,force:true});}}
test('root and nested models, renamed actions survive reload, roles remain isolated',()=>isolated(async(s,root)=>{const a=await s.importZip(zip(fixture()),'A');const b=await s.importZip(zip(fixture('nested/')),'B');assert.equal(s.catalog().characterId,b.id);await s.update({characterId:a.id,select:true,actionId:a.actions[0].id,actionName:'招手'});assert.equal(s.catalog().actions[0].name,'招手');assert.equal(b.actions[0].name,'idle');const reloaded=new StageStore(root);await reloaded.initialize();assert.equal(reloaded.catalog().actions[0].name,'招手');assert.equal(reloaded.catalog().actions[0].id,a.actions[0].id);}));
test('missing model3 is generated from moc3 and adjacent resources',()=>isolated(async s=>{const files=fixture('bundle/');delete files['bundle/model.model3.json'];const c=await s.importZip(zip(files),'自动');assert.equal(c.modelPath,'bundle/generated.model3.json');assert.equal(c.actions.length,2);assert.equal(c.model.FileReferences.Moc,'model.moc3');}));
test('rejects traversal, absolute paths, duplicate model candidates and missing textures without corrupting prior state',()=>isolated(async s=>{await s.importZip(zip(fixture()),'保留');const previous=s.snapshot();for(const bad of [{'../outside.moc3':'MOC3'},{'/absolute.moc3':'MOC3'},{...fixture(),'second.moc3':'MOC3'}, {'model.moc3':'MOC3'}]){await assert.rejects(s.importZip(zip(bad),'错误'));assert.deepEqual(s.snapshot(),previous);}for(const path of ['../x','C:/x','/x','x\\y','a/../../x','NUL.png','a./x','a?b'])assert.throws(()=>safePath(path));}));
test('playback needs ready preview; rejects stale role and unknown action; returns honest receipts',()=>isolated(async s=>{const a=await s.importZip(zip(fixture()),'A');await assert.rejects(async()=>s.play(a.id,a.actions[0].id),/未就绪/);s.poll('preview',a.id,null,true);const event=s.play(a.id,a.actions[0].id);assert.equal(event.status,'queued');assert.equal(s.poll('preview',a.id,0,true).events.length,1);s.receipt({eventId:event.eventId,status:'played'});assert.equal(s.receipts.get(event.eventId).status,'played');assert.throws(()=>s.play(a.id,'made-up'));await s.importZip(zip(fixture()),'B');assert.throws(()=>s.play(a.id,a.actions[0].id),/角色已切换/);}));
test('concurrent writes preserve both role names',()=>isolated(async s=>{const a=await s.importZip(zip(fixture()),'A'),b=await s.importZip(zip(fixture()),'B');await Promise.all([s.update({characterId:a.id,name:'一'}),s.update({characterId:b.id,name:'二'})]);assert.deepEqual(s.state.characters.map(c=>c.name),['一','二']);}));

test('bundled Hiyori initializes once, selects by default and preserves renamed actions',()=>isolated(async(s,root)=>{
  const directory=new URL('../character/hiyori/',import.meta.url);
  const {fileURLToPath}=await import('node:url');
  const path=fileURLToPath(directory);
  const [a,b]=await Promise.all([s.ensureDefaultCharacter(path),s.ensureDefaultCharacter(path)]);
  assert.equal(a.id,b.id);assert.equal(s.state.characters.length,1);assert.equal(s.catalog().characterName,'Hiyori');assert.equal(a.actions.length,8);assert.ok(a.actions.every(a=>a.named&&!a.name.startsWith('hiyori_')));
  await s.update({characterId:a.id,actionId:a.actions[0].id,actionName:'默认招手'});
  const reload=new StageStore(root);await reload.initialize();await reload.ensureDefaultCharacter(path);
  assert.equal(reload.catalog().actions[0].name,'默认招手');assert.equal(reload.state.characters.length,1);
}));
test('adding default model preserves an existing selected user character',()=>isolated(async s=>{
  const selected=await s.importZip(zip(fixture()),'我的角色');
  const {fileURLToPath}=await import('node:url');await s.ensureDefaultCharacter(fileURLToPath(new URL('../character/hiyori/',import.meta.url)));
  assert.equal(s.state.selectedId,selected.id);assert.equal(s.state.characters.length,2);
}));

test('preferences persist and reject invalid keys without changing state',()=>isolated(async(s,root)=>{assert.deepEqual(s.preferences(),{desktopFloating:false,actionControl:false,visible:true});await s.updatePreferences({actionControl:true,desktopFloating:true});const next=new StageStore(root);await next.initialize();assert.deepEqual(next.preferences(),{desktopFloating:true,actionControl:true,visible:true});await assert.rejects(s.updatePreferences({actionControl:'true'}));await assert.rejects(s.updatePreferences({unknown:true}));assert.equal(s.preferences().actionControl,true);}));
