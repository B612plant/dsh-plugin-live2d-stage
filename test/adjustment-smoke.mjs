import {build} from 'esbuild';
import {chromium} from 'playwright';
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
  browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1150,height:900}});const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text());});page.on('response',r=>{if(r.status()>=400)console.log('HTTP',r.status(),r.url());});
  await page.goto(url);await page.getByRole('button',{name:'设置',exact:true}).click();
  if(process.argv[2]!=='--default')await page.getByLabel('上传角色 ZIP').setInputFiles(process.argv[2]);
  const readyDeadline=Date.now()+25000;while(Date.now()<readyDeadline&&![...s.clients.values()].some(c=>c.characterId))await new Promise(r=>setTimeout(r,200));
  assert.ok([...s.clients.values()].some(c=>c.characterId),'model ready');
  assert.equal(s.state.characters.length,1);const c=s.character();assert.ok(c.actions.length>0);
  await page.locator('nav').evaluate(el=>{el.parentElement.style.display='none';});
  const stage=page.getByLabel('Live2D 画布',{exact:true});assert.equal((await page.locator('.l2ds').innerText()).trim(),'');
  const before=await stage.boundingBox();await page.mouse.move(before.x+170,before.y+260);await page.mouse.down();await page.mouse.move(before.x+210,before.y+300,{steps:5});await page.mouse.up();
  const moved=await stage.boundingBox();assert.ok(moved.x>before.x+30&&moved.y>before.y+30,'normal drag moves canvas');
  assert.equal(await page.locator('.l2ds-editor').count(),0);
  await stage.dblclick({position:{x:170,y:260}});await page.getByRole('button',{name:'人物',exact:true}).waitFor();
  const transform=await page.locator('.l2ds-model').getAttribute('style');await page.mouse.move(moved.x+170,moved.y+300);await page.mouse.down();await page.mouse.move(moved.x+200,moved.y+320,{steps:5});await page.mouse.up();assert.notEqual(await page.locator('.l2ds-model').getAttribute('style'),transform);assert.deepEqual(await stage.boundingBox(),moved);
  await page.mouse.wheel(0,-120);await page.waitForTimeout(150);assert.ok((await page.locator('.l2ds-model').getAttribute('style')).includes('105%'));
  await page.getByRole('button',{name:'画布',exact:true}).click();await page.getByLabel('画布宽度').fill('500');await page.getByLabel('画布高度').fill('600');assert.equal((await stage.boundingBox()).width,500);
  await page.screenshot({path:resolve(report,'adjustment.png')});await page.getByRole('button',{name:'完成',exact:true}).click();assert.equal((await page.locator('.l2ds').innerText()).trim(),'');
  await page.reload();await stage.waitFor();assert.equal((await stage.boundingBox()).width,500);assert.ok((await page.locator('.l2ds-model').getAttribute('style')).includes('105%'));
  await page.screenshot({path:resolve(report,'textless.png')});assert.deepEqual(errors,[]);await writeFile(resolve(report,'adjustment.json'),JSON.stringify({textless:true,normalDragMovesCanvas:true,doubleClickEditor:true,independentModelDrag:true,modelZoom:true,canvasResize:true,persistence:true,errors},null,2));console.log('Textless canvas, normal drag, double-click editor, independent transforms and persistence passed');
}finally{await browser?.close();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}





