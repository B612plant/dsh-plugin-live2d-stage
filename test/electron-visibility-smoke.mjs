import {build} from 'esbuild';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {mkdtemp,readFile,writeFile,readdir,rm,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {handler} from '../lib/index.mjs';
import {StageStore} from '../lib/store.cjs';
const directory=dirname(fileURLToPath(import.meta.url)),root=await mkdtemp(resolve(tmpdir(),'live2d-browser-smoke-'));
const plugin=resolve(directory,'..'),report=resolve(plugin,'build/reports/live2d-plugin');await mkdir(report,{recursive:true});
let browser,server;
try {
  const s=new StageStore(root);await s.initialize();if(process.argv[2]==='--default')await s.ensureDefaultCharacter(resolve(plugin,'character/hiyori'));
  const reactBuild=await build({entryPoints:[resolve(directory,'settings-harness.tsx')],bundle:true,platform:'browser',format:'iife',write:false,define:{'process.env.NODE_ENV':'"production"'}});
  const route=handler(s,resolve(plugin,'assets'),()=>({peer:{}}));
  server=createServer((req,res)=>{if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end('<html><body style="background:#16191f"><div id="root"></div><script src="/react.js"></script><script src="/client.js"></script></body></html>');}else if(req.url==='/react.js'){res.setHeader('Content-Type','text/javascript');res.end(reactBuild.outputFiles[0].contents);}else if(req.url==='/client.js'){res.setHeader('Content-Type','text/javascript');readFile(resolve(plugin,'lib/client.js')).then(b=>res.end(b));}else void route(req,res);});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const url='http://127.0.0.1:'+server.address().port;
  const env={...process.env};delete process.env.ELECTRON_RUN_AS_NODE;delete env.ELECTRON_RUN_AS_NODE;
  const probe=createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
  await mkdir(resolve(root,'electron'),{recursive:true});
  await writeFile(resolve('build/live2d-floating-inspect/electron-config.json'),JSON.stringify({origin:url,profile:resolve(root,'electron')}));
  const processHandle=spawn(resolve(process.env.ELECTRON_TEST_EXE||'node_modules/electron/dist/electron.exe'),[resolve('build/live2d-floating-inspect/minimal.cjs'),'--remote-debugging-port='+port],{env,windowsHide:true});processHandle.stderr.on('data',b=>console.log(String(b).slice(0,3000)));processHandle.on('exit',code=>console.log('Electron exited',code));
  let connection;for(let i=0;i<20;i++){try{connection=await chromium.connectOverCDP('http://127.0.0.1:'+port,{timeout:1000});break;}catch{await new Promise(r=>setTimeout(r,100));}}if(!connection){processHandle.kill();throw new Error('Electron CDP unavailable');}
  browser={close:async()=>{await connection.close();processHandle.kill();}};
  const page=connection.contexts()[0].pages()[0];const errors=[];page.on('pageerror',e=>{errors.push(e.stack);console.log(e.stack);});page.on('console',m=>{if(m.type()==='error')console.log(m.text());});
  const id=s.character().id;await page.addInitScript(({id})=>localStorage.setItem('live2d-stage.layout.app.'+id,JSON.stringify({width:350,height:470,scale:1.8856491423232367,x:4,y:151,left:513,top:81})),{id});
  await page.goto('dsh-app://app/');await page.getByRole('button',{name:'设置',exact:true}).click();
  if(process.argv[2]!=='--default')await page.getByLabel('上传角色 ZIP').setInputFiles(process.argv[2]);
  const readyDeadline=Date.now()+25000;while(Date.now()<readyDeadline&&![...s.clients.values()].some(c=>c.characterId))await new Promise(r=>setTimeout(r,200));
  assert.ok([...s.clients.values()].some(c=>c.characterId),'model ready');
  assert.equal(s.state.characters.length,1);const c=s.character();assert.ok(c.actions.length>0);
  await page.locator('nav').evaluate(el=>{el.parentElement.style.display='none';});
  const stage=page.getByLabel('Live2D 画布',{exact:true});
  await page.waitForTimeout(2000);
  const layer=await page.locator('.l2ds-app').boundingBox();assert.ok(layer.width>0&&layer.height>0);
  await page.getByRole('button',{name:'重置',exact:true}).click();
  await page.locator('nav').evaluate(el=>{el.parentElement.style.display='none';});await page.waitForTimeout(2500);
  assert.equal(await page.locator('.l2ds-model').evaluate(el=>el.style.width),'100%');
  await page.screenshot({path:resolve(report,'electron-visible.png')});
  const png=await page.locator('canvas').screenshot();await writeFile(resolve(report,'electron-canvas.png'),png);
  assert.deepEqual(errors,[]);await writeFile(resolve(report,'electron-visibility.json'),JSON.stringify({customDesktopProtocol:true,positiveCompositorLayer:true,recoverModel:true,errors},null,2));console.log('Electron custom protocol, saved layout and restore visibility passed');
}finally{await browser?.close();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}










