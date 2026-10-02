import {registerHooks,createRequire} from 'node:module';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
const runtime=process.argv[2];
if(!runtime)throw new Error('Provide target app.asar/dsh directory (run using Electron Node mode)');
const hostRequire=createRequire(pathToFileURL(resolve(runtime,'package.json')));
const toolsUrl=pathToFileURL(hostRequire.resolve('@deepseek-ai/dsh-tools')).href;
registerHooks({resolve(specifier,context,next){if(specifier==='@deepseek-ai/dsh-tools')return {url:toolsUrl,shortCircuit:true};return next(specifier,context);}});
const {apply}=await import('../lib/index.mjs');
const root=await mkdtemp(resolve(tmpdir(),'live2d-host-smoke-'));
const tools=[],sections=[],routes=[];
let server;
try {
  await apply({effect:fn=>fn(),webServer:{register:r=>{routes.push(r);return()=>{};}},connection:{admit:()=>({peer:{}})},tools:{register:t=>{tools.push(t);return()=>tools.splice(tools.indexOf(t),1);}},systemPrompt:{section:s=>sections.push(s)}},{dataDir:root});
  assert.equal(tools.length,0);assert.equal(routes.length,1);assert.equal(sections[0].text(),'');
  server=createServer(routes[0].handler);await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base='http://127.0.0.1:'+server.address().port+'/live2d-stage/';
  assert.equal((await (await fetch(base+'state')).json()).characters.length,1);
  assert.equal((await fetch(base+'assets/core.js')).status,200);
  assert.equal((await fetch(base+'state',{headers:{Origin:'http://evil.invalid'}})).status,403);
  const toggle=async value=>{const r=await fetch(base+'preferences',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({actionControl:value})});assert.equal(r.status,200);};
  await toggle(true);assert.equal(tools.length,3);assert.ok(sections[0].text().includes('Live2D'));const stale=tools[0];assert.equal((await stale.execute({})).actions.length,8);await toggle(false);assert.equal(tools.length,0);assert.equal(sections[0].text(),'');await assert.rejects(stale.execute({}),/已关闭/);
  await toggle(true);assert.equal(tools.length,3);const closed=await fetch(base+'close',{method:'POST'});assert.equal(closed.status,200);assert.equal(tools.length,0);assert.equal((await closed.json()).preferences.visible,false);
  const gateway=await import(toolsUrl);
  assert.equal(typeof gateway.defineTool,'function');
  console.log('Target runtime 0.2.0-rc.2: tool schemas, prompt registration, HTTP resources and origin rejection passed.');
} finally {if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true});}


