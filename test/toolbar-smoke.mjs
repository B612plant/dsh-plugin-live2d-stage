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
  let chatMessages=[];const route=handler(s,resolve(plugin,'assets'),()=>({peer:{}}),v=>s.updatePreferences(v),{list:async()=>({workspaces:[{workspaceId:'harness-workspace',title:'Harness 测试工作区',path:'E:/harness-project'},{workspaceId:'second-workspace',title:'另一个工作区',path:'E:/other-project'}],items:[{sessionId:'test-chat',title:'测试对话',workspaceId:'harness-workspace'},{sessionId:'other-chat',title:'其他对话',workspaceId:'second-workspace'}]}),history:async()=>({messages:chatMessages,running:false}),send:async data=>{assert.equal(data.workspaceId,'harness-workspace');chatMessages=[{id:'u',role:'user',text:data.text},{id:'a',role:'assistant',text:'测试回复'}];return {sessionId:'test-chat',accepted:true};}});
  server=createServer((req,res)=>{if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end('<html><body style="background:#16191f"><div id="root"></div><script src="/react.js"></script><script src="/client.js"></script></body></html>');}else if(req.url==='/react.js'){res.setHeader('Content-Type','text/javascript');res.end(reactBuild.outputFiles[0].contents);}else if(req.url==='/client.js'){res.setHeader('Content-Type','text/javascript');readFile(resolve(plugin,'lib/client.js'),'utf8').then(b=>res.end(b.replaceAll('setLookTarget(x, y) {','setLookTarget(x, y) { window.__gazeTest=this;')));}else void route(req,res);});
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
  const stage=page.getByLabel('Live2D 画布',{exact:true});
  assert.deepEqual(await page.locator('.l2ds-toolbar [data-icon]').evaluateAll(els=>els.map(el=>el.dataset.icon)),['type','face-slightly-smiling-plus','move','reload','square-arrow-right-exit','x']);assert.deepEqual((await page.locator('.l2ds-toolbar button').allTextContents()).map(s=>s.trim()),['','','','','','']);assert.equal(await page.getByRole('button',{name:'恢复人物显示',exact:true}).count(),0);
  const modelRect=await page.locator('.l2ds canvas').boundingBox();
  await page.mouse.move(modelRect.x+modelRect.width*.1,modelRect.y+modelRect.height*.1);
  await page.waitForFunction(()=>window.__gazeTest?.getParameterValue('ParamEyeBallX')<-.4&&window.__gazeTest?.getParameterValue('ParamEyeBallY')>.3);
  await page.mouse.move(modelRect.x+modelRect.width*.9,modelRect.y+modelRect.height*.9);
  await page.waitForFunction(()=>window.__gazeTest?.getParameterValue('ParamEyeBallX')>.4&&window.__gazeTest?.getParameterValue('ParamEyeBallY')<-.3);
  const handle=page.getByRole('button',{name:'拖拽画布',exact:true}),box=await handle.boundingBox(),before=await stage.boundingBox();await page.mouse.move(box.x+15,box.y+15);await page.mouse.down();await page.mouse.move(box.x-45,box.y-45,{steps:4});await page.mouse.up();assert.ok((await stage.boundingBox()).x<before.x-40);
  await page.getByRole('button',{name:'动作',exact:true}).click();await page.locator('.l2ds-preview-actions button').first().click();const deadline=Date.now()+12000;while(Date.now()<deadline&&![...s.receipts.values()].some(r=>r.status==='played'))await new Promise(r=>setTimeout(r,200));assert.ok([...s.receipts.values()].some(r=>r.status==='played'));
  await page.getByRole('button',{name:'重置',exact:true}).click();const reset=await stage.boundingBox();assert.equal(reset.x,1150-426);assert.equal(reset.y,900-494);
  // Both app and WebView entrypoints share pointer-release double-click and edge resizing.
  async function adjustmentChecks(native=false){
    const surface=page.getByLabel('Live2D 画布',{exact:true});if(!native){const h=await page.getByRole('button',{name:'拖拽画布',exact:true}).boundingBox();const r=await surface.boundingBox();await page.mouse.move(h.x+15,h.y+15);await page.mouse.down();await page.mouse.move(h.x+15-r.x+150,h.y+15-r.y+150,{steps:4});await page.mouse.up();}let b=await surface.boundingBox();
    await page.mouse.move(b.x+170,b.y+220);await page.mouse.down();await page.mouse.move(b.x+171,b.y+220);await page.mouse.up();await page.mouse.down();await page.mouse.up();
    await page.waitForFunction(()=>document.querySelector('.l2ds-adjust.is-editing'));
    assert.equal(await page.locator('.l2ds-editor,input[type=range]').count(),0);
    assert.equal(await page.locator('.l2ds-resize').count(),8);assert.equal(await page.locator('.l2ds-adjust-hint').innerText(),'Esc 退出保存，滚轮控制人物放大');assert.equal(await surface.evaluate(el=>document.activeElement===el),true);
    for(const edge of ['n','ne','e','se','s','sw','w','nw']){
      const handle=page.getByLabel('调整画布 '+edge,{exact:true}),r=await handle.boundingBox();
      const before=await page.locator('.l2ds-viewport').boundingBox();
      await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2+(edge.includes('w')?-12:edge.includes('e')?12:0),r.y+r.height/2+(edge.includes('n')?-12:edge.includes('s')?12:0),{steps:3});await page.mouse.up();
      const after=await page.locator('.l2ds-viewport').boundingBox();
      if(/[ew]/.test(edge))assert.ok(after.width>before.width+10,edge+' width');
      if(/[ns]/.test(edge))assert.ok(after.height>before.height+10,edge+' height');
    }
    b=await surface.boundingBox();const beforeModel=await page.locator('.l2ds-model').boundingBox();
    await page.mouse.move(b.x+170,b.y+220);await page.mouse.down();await page.mouse.move(b.x+190,b.y+240,{steps:4});await page.mouse.up();assert.ok((await page.locator('.l2ds-model').boundingBox()).x>beforeModel.x+15);
    await page.mouse.wheel(0,-100);await page.waitForTimeout(150);assert.ok((await page.locator('.l2ds-model').boundingBox()).width>beforeModel.width);
    const beforeSave=await page.locator('.l2ds-model').boundingBox();await page.keyboard.press('Escape');assert.equal(await page.locator('.l2ds-resize').count(),0);assert.equal(await page.locator('.l2ds-adjust-hint').count(),0);const saved=await page.evaluate(({id,native})=>JSON.parse(localStorage.getItem('live2d-stage.layout.'+(native?'native.':'app.')+id)),{id:c.id,native});assert.ok(Math.abs(saved.width*saved.scale-beforeSave.width)<1);if(native)assert.ok(await page.evaluate(()=>window.nativeMessages.includes('focus')&&window.nativeMessages.includes('save')));
    await surface.dblclick({position:{x:170,y:220}});await page.waitForFunction(()=>document.querySelector('.l2ds-adjust.is-editing'));
    await surface.dblclick({position:{x:170,y:220}});await page.waitForFunction(()=>!document.querySelector('.l2ds-adjust.is-editing'));
    if(native)assert.ok(await page.evaluate(()=>window.nativeMessages.some(m=>m.startsWith('resize:'))&&window.nativeMessages.some(m=>m.startsWith('move:'))));
    await page.getByRole('button',{name:'重置',exact:true}).click();
  }
  await adjustmentChecks();
  await page.screenshot({path:resolve(report,'toolbar.png')});
  await s.updatePreferences({actionControl:true});await page.getByRole('button',{name:'移出 Harness',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('.l2ds-toolbar'));assert.equal(s.preferences().desktopFloating,true);assert.equal(s.preferences().actionControl,true);
  await fetch(url+'/live2d-stage/dock',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({outside:false})});await stage.waitFor();assert.equal(s.preferences().actionControl,true);
  await s.updatePreferences({actionControl:true});await page.getByRole('button',{name:'关闭',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('.l2ds-toolbar'));assert.equal(s.preferences().actionControl,false);assert.equal(s.preferences().visible,false);assert.equal(s.preferences().desktopFloating,false);
  await s.updatePreferences({visible:true,desktopFloating:true,actionControl:true});await page.addInitScript(()=>{window.nativeMessages=[];window.chrome={...window.chrome,webview:{postMessage:m=>window.nativeMessages.push(m)}};});await page.goto(url+'/live2d-stage/assets/floating.html');await adjustmentChecks(true);await page.waitForTimeout(300);await page.evaluate(()=>window.dispatchEvent(new CustomEvent('live2d-native-doubleclick',{detail:{x:170,y:220}})));await page.waitForFunction(()=>document.querySelector('.l2ds-adjust.is-editing'));await page.evaluate(()=>window.dispatchEvent(new Event('live2d-native-escape')));await page.waitForFunction(()=>!document.querySelector('.l2ds-adjust.is-editing'));assert.equal(await page.locator('[data-icon="square-arrow-right-enter"]').count(),1);await page.getByRole('button',{name:'文本',exact:true}).click();await page.getByLabel('选择工作区').selectOption('harness-workspace');assert.equal(await page.getByLabel('选择对话').locator('option').count(),2);await page.getByLabel('对话内容').fill('后台对话测试');await page.getByRole('button',{name:'发送',exact:true}).click();await page.getByText('测试回复',{exact:true}).waitFor();await page.screenshot({path:resolve(report,'toolbar-chat.png')});await page.getByRole('button',{name:'移入 Harness',exact:true}).click();await page.waitForTimeout(300);assert.equal(s.preferences().desktopFloating,false);assert.equal(s.preferences().actionControl,true);assert.deepEqual(errors,[]);
  await writeFile(resolve(report,'toolbar.json'),JSON.stringify({mouseGazeParametersVerified:true,buttonOrder:true,doubleClickAppAndNative:true,eightResizeEdges:true,noSliders:true,escapeSavesAndExits:true,nativeEscapeForwarding:true,editingHint:true,dockPreservesActions:true,crossDrag:true,actualActionPlayback:true,resetBottomRight:true,closeDisablesAll:true,backgroundChatUiWithMockHost:true,errors},null,2));console.log('Toolbar, cross drag, playback, bottom-right reset, close and chat UI passed');
}finally{await browser?.close();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}






