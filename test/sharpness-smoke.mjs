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
  const results=[];
  for(const dpr of [1,1.5,2]){
    const context=await browser.newContext({viewport:{width:1400,height:1000},deviceScaleFactor:dpr});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url);const stage=page.getByLabel('Live2D 画布',{exact:true});await stage.waitFor();
    for(const scale of [.3,.75,1,1.5,2,3]){
      await page.evaluate(({id,scale})=>localStorage.setItem('live2d-stage.layout.app.'+id,JSON.stringify({scale})),{id:s.character().id,scale});await page.reload();await stage.waitFor();
      await page.waitForFunction(()=>{const c=document.querySelector('.l2ds canvas');return c&&Math.abs(c.width-c.clientWidth*devicePixelRatio)<1&&Math.abs(c.height-c.clientHeight*devicePixelRatio)<1;});
      const sizes=await page.locator('canvas').evaluate(c=>{const rect=c.getBoundingClientRect();return {width:c.width,height:c.height,cssWidth:rect.width,cssHeight:rect.height,transform:getComputedStyle(c.parentElement.parentElement).transform};});
      assert.ok(Math.abs(sizes.cssWidth-350*scale)<1);assert.ok(Math.abs(sizes.width-sizes.cssWidth*dpr)<2);assert.ok(Math.abs(sizes.height-sizes.cssHeight*dpr)<2);assert.equal(sizes.transform,'none');results.push({dpr,scale,...sizes});
    }
    await stage.dblclick({position:{x:170,y:250}});const edge=await page.getByLabel('调整画布 nw',{exact:true}).boundingBox();await page.mouse.move(edge.x+5,edge.y+5);await page.mouse.down();await page.mouse.move(edge.x-145,edge.y-125,{steps:5});await page.mouse.up();await page.waitForFunction(()=>{const c=document.querySelector('canvas');return Math.abs(c.width-1500*devicePixelRatio)<2&&Math.abs(c.height-1800*devicePixelRatio)<2;});await page.keyboard.press('Escape');await page.screenshot({path:resolve(report,'sharpness-dpr-'+dpr+'.png')});assert.deepEqual(errors,[]);await context.close();
  }
  await writeFile(resolve(report,'sharpness.json'),JSON.stringify({nativeResolution:true,results},null,2));console.log('18 scale/DPI combinations and canvas resizing keep full physical-pixel render resolution');
}finally{await browser?.close();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}





