import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import {mkdir,cp,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {clientStyleModule} from './scripts/style-module.mjs';
const root=dirname(fileURLToPath(import.meta.url));
await mkdir(resolve(root,'lib'),{recursive:true});
await mkdir(resolve(root,'character'),{recursive:true});
// Bundle the already-present ZIP library; no runtime install or download is needed.
await build({stdin:{contents:"export {StageStore,MAX_ZIP,safePath,inspectModel} from './src/store.mjs'",resolveDir:root},bundle:true,platform:'node',format:'cjs',target:'node22',external:['@aws-sdk/client-s3'],outfile:resolve(root,'lib/store.cjs'),metafile:true}).then(async result=>writeFile(resolve(root,'lib/host.meta.json'),JSON.stringify(result.metafile,null,2)));
await writeFile(resolve(root,'lib/index.mjs'),(await readFile(resolve(root,'src/index.mjs'),'utf8')).replace("'./store.mjs'","'./store.cjs'"));
const sdk=resolve(root,'vendor/live2d/sdk');
const engine=resolve(root,'vendor/live2d/live2d-player/engine');
const aliases={'./lappdefine':'platform-define.ts','./lappsubdelegate':'platform-subdelegate.ts','./lappglmanager':'platform-gl-manager.ts','./lapplive2dmanager':'platform-live2dmanager.ts'};
const result=await build({entryPoints:[resolve(root,'src/client/index.tsx')],outfile:resolve(root,'lib/client.js'),bundle:true,platform:'browser',format:'cjs',target:'es2022',jsx:'automatic',metafile:true,external:['react','react/*','react-dom','react-dom/*','@deepseek-ai/*'],alias:{'@framework':resolve(sdk,'Framework/src'),'@live2d-sample':resolve(sdk,'Samples/TypeScript/Demo/src')},define:{'process.env.NODE_ENV':'"production"'},banner:{js:'window.__ModuleLoader__.load({id:"dsh-plugin-live2d-stage",factory:(require)=>{var module={exports:{}};var exports=module.exports;'},footer:{js:'return module.exports;}});'},plugins:[{name:'live2d-stage-owned-resources',setup(b){b.onResolve({filter:/^\.\/lapp(?:define|subdelegate|glmanager|live2dmanager)$/},args=>({path:resolve(engine,aliases[args.path])}));b.onLoad({filter:/platform-define\.ts$/},async args=>({loader:'ts',contents:(await readFile(args.path,'utf8')).replace('/api/nirei/live2d/shaders/','/live2d-stage/assets/shaders/')}));b.onLoad({filter:/\.css$/},async args=>({loader:'js',contents:clientStyleModule(await readFile(args.path,'utf8'),'dsh-plugin-live2d-stage',args.path)}));}}]});
await writeFile(resolve(root,'lib/client.meta.json'),JSON.stringify(result.metafile,null,2));
await mkdir(resolve(root,'assets/shaders'),{recursive:true});
await cp(resolve(sdk,'Core/live2dcubismcore.min.js'),resolve(root,'assets/core.js'));
await cp(resolve(sdk,'Framework/Shaders/WebGL'),resolve(root,'assets/shaders'),{recursive:true});
await mkdir(resolve(root,'licenses'),{recursive:true});
for(const [source,dest] of [['LICENSE.md','Cubism-Samples.md'],['NOTICE.md','Cubism-NOTICE.md'],['Core/LICENSE.md','Cubism-Core.md'],['Framework/LICENSE.md','Cubism-Framework.md']])await cp(resolve(sdk,source),resolve(root,'licenses',dest));
for(const pkg of ['react','react-dom','scheduler','unzipper','bluebird','duplexer2','fs-extra','graceful-fs','node-int64','readable-stream','inherits','isarray','process-nextick-args','safe-buffer','string_decoder','util-deprecate','universalify','jsonfile','core-util-is']) {
  const path=resolve(root,'node_modules',pkg);
  for(const filename of ['LICENSE','LICENSE.md','LICENSE-MIT']) {try{await cp(resolve(path,filename),resolve(root,'licenses',pkg+'.txt'));break;}catch(e){if(e.code!=='ENOENT')throw e;}}
}



await cp(resolve(root,"src/floating.mjs"),resolve(root,"lib/floating.mjs"));
await build({entryPoints:[resolve(root,"src/client/floating.tsx")],outfile:resolve(root,"assets/floating.js"),bundle:true,minify:true,platform:"browser",format:"iife",target:"es2022",jsx:"automatic",alias:{"@framework":resolve(sdk,"Framework/src"),"@live2d-sample":resolve(sdk,"Samples/TypeScript/Demo/src")},define:{"process.env.NODE_ENV":'"production"'},plugins:[{name:'live2d-stage-owned-resources',setup(b){b.onResolve({filter:/^\.\/lapp(?:define|subdelegate|glmanager|live2dmanager)$/},args=>({path:resolve(engine,aliases[args.path])}));b.onLoad({filter:/platform-define\.ts$/},async args=>({loader:'ts',contents:(await readFile(args.path,'utf8')).replace('/api/nirei/live2d/shaders/','/live2d-stage/assets/shaders/')}));b.onLoad({filter:/\.css$/},async args=>({loader:'js',contents:clientStyleModule(await readFile(args.path,'utf8'),'dsh-plugin-live2d-stage',args.path)}));}}]});
const floatingHash=createHash('sha256').update(await readFile(resolve(root,'assets/floating.js'))).digest('hex').slice(0,16);
await writeFile(resolve(root,'assets/floating.html'),`<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"><style>html,body,#root{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}</style></head><body><div id="root"></div><script src="core.js"></script><script src="floating.js?v=${floatingHash}"></script></body></html>`);

await cp(resolve(root,'src/chat.mjs'),resolve(root,'lib/chat.mjs'));
