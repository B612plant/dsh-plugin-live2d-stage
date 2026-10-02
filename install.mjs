import {mkdir,readFile,writeFile,cp,rename,rm,lstat,symlink,open,readdir,realpath} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {homedir} from 'node:os';
import {randomUUID,createHash} from 'node:crypto';
const source=dirname(fileURLToPath(import.meta.url)),app=resolve(process.argv[2]??'E:/deepseek-desktop');
const destination=resolve(app,'plugins/dsh-plugin-live2d-stage');
const profile=resolve(process.env.DSH_HOME||resolve(homedir(),'.dsh'),'profiles/desktop');
const report=resolve(source,'build/reports/live2d-plugin');
await mkdir(report,{recursive:true});
await lstat(resolve(app,'resources/app.asar'));
const manifestPath=resolve(profile,'package.json');const original=await readFile(manifestPath,'utf8');const manifest=JSON.parse(original);
if(!Array.isArray(manifest.dsh?.profile?.bundles))throw new Error('未找到桌面 profile');
await mkdir(dirname(destination),{recursive:true});
// Refuse to replace another installation or delete user-owned files.
try {await lstat(destination);throw new Error('目标插件已存在，请先检查版本并通过插件管理升级');}catch(e){if(e.code!=='ENOENT')throw e;}
const link=resolve(profile,'node_modules/dsh-plugin-live2d-stage');
try {await lstat(link);throw new Error('profile 中已有同名插件');}catch(e){if(e.code!=='ENOENT')throw e;}
const lock=await open(resolve(profile,'lock'),'wx');
const candidate=destination+'.candidate-'+randomUUID();let linked=false,published=false,committed=false;
try {
  await lock.writeFile(String(process.pid)+'\n');
  if(await readFile(manifestPath,'utf8')!==original)throw new Error('profile 已变化，请重新安装');
  await mkdir(candidate);
  for(const item of ['package.json','cordis.patch.yml','README.md','lib/index.mjs','lib/store.cjs','lib/client.js','lib/floating.mjs','lib/chat.mjs','lib/native','assets','licenses','locale','character']){await mkdir(dirname(resolve(candidate,item)),{recursive:true});await cp(resolve(source,item),resolve(candidate,item),{recursive:true});}
  const inventory=[];
  async function scan(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())await scan(join(dir,e.name),p+'/');else{const b=await readFile(join(dir,e.name));if(b.length>10000000)throw new Error('发布单文件超过 10,000,000 字节：'+p);inventory.push({path:p,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});}}}
  await scan(candidate);
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');
  await writeFile(resolve(report,'profile-before-'+stamp+'.json'),original);
  await rename(candidate,destination);published=true;
  await mkdir(dirname(link),{recursive:true});await symlink(destination,link,'junction');linked=true;
  manifest.dependencies={...manifest.dependencies,'dsh-plugin-live2d-stage':'file:'+destination.replaceAll('\\','/')};
  manifest.dsh.profile.bundles.push('dsh-plugin-live2d-stage');
  const tmp=manifestPath+'.live2d-'+randomUUID();
  try {await writeFile(tmp,JSON.stringify(manifest,null,2)+'\n');await rename(tmp,manifestPath);committed=true;}finally{await rm(tmp,{force:true});}
  const result={destination,profile,bytes:inventory.reduce((n,f)=>n+f.bytes,0),files:inventory.length,inventory};
  await writeFile(resolve(report,'install.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({destination,bytes:result.bytes,files:result.files,restartRequired:true}));
}catch(e){if(!committed){if(linked)await rm(link,{recursive:true,force:true});if(published)await rm(destination,{recursive:true,force:true});await rm(candidate,{recursive:true,force:true});}throw e;}finally{await lock.close();await rm(resolve(profile,'lock'),{force:true});}
