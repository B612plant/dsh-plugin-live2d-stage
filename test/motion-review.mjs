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
  try{await page.waitForFunction(()=>document.querySelector('[role="status"]')?.textContent?.includes('已就绪'),{},{timeout:25000});}catch(e){console.log(await page.locator('body').innerText());await page.screenshot({path:resolve(report,'failure.png')});throw e;}
  assert.equal(s.state.characters.length,1);const c=s.character();assert.ok(c.actions.length>0);
  await page.locator('nav').evaluate(el=>{el.parentElement.style.display='none';});
  for(let i=0;i<c.actions.length;i++){s.poll('review',c.id,null,true);s.play(c.id,c.actions[i].id);for(let j=0;j<3;j++){await new Promise(r=>setTimeout(r,1100));await page.locator('.l2ds-stage').screenshot({path:resolve(report,'motion-'+i+'-'+j+'.png')});}await new Promise(r=>setTimeout(r,3500));}
  console.log(JSON.stringify(c.actions));
}finally{await browser?.close();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}





