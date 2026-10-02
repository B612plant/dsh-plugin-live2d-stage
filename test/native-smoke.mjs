import {mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
import {StageStore} from '../lib/store.cjs';
import {handler} from '../lib/index.mjs';
import {FloatingController} from '../lib/floating.mjs';
const plugin=resolve('.'),root=await mkdtemp(resolve(tmpdir(),'live2d-native-test-')),report=resolve('build/reports/live2d-plugin');
let server,controller;
try{
 await mkdir(report,{recursive:true});const store=new StageStore(root);await store.initialize();await store.ensureDefaultCharacter(resolve(plugin,'character/hiyori'));
 server=createServer((req,res)=>handler(store,resolve(plugin,'assets'),r=>controller.admits(r)?{peer:{}}:{rejection:401})(req,res));await new Promise(r=>server.listen(0,'127.0.0.1',r));
 controller=new FloatingController({directory:resolve(plugin,'lib/native'),profile:resolve(root,'webview2'),origin:'http://127.0.0.1:'+server.address().port});
 await controller.start({screenshot:resolve(report,'native-floating.png')});assert.equal(controller.readyInfo.transparent,true);assert.equal(controller.readyInfo.topmost,true);
 assert.equal((await fetch(controller.origin+'/live2d-stage/state')).status,401);
 const entry=await fetch(controller.origin+'/live2d-stage/assets/floating.html?launch=test',{headers:{'X-Live2D-Float':controller.token}});assert.equal(entry.headers.get('cache-control'),'no-store');const html=await entry.text();assert.match(html,/floating\.js\?v=[a-f0-9]{16}/);const script=await fetch(controller.origin+'/live2d-stage/assets/'+html.match(/src="(floating\.js[^"]*)"/)[1],{headers:{'X-Live2D-Float':controller.token}});assert.equal(script.headers.get('cache-control'),'no-store');assert.ok((await script.text()).includes('square-arrow-right-enter')); 
 assert.equal(controller.admits({headers:{'x-live2d-float':controller.token},url:'/live2d-stage/preferences',method:'POST'}),false);
 const deadline=Date.now()+25000;while(Date.now()<deadline&&![...store.clients.values()].some(c=>c.characterId))await new Promise(r=>setTimeout(r,200));
 const c=store.character(),event=store.play(c.id,c.actions[0].id);
 while(Date.now()<deadline&&store.receipts.get(event.eventId).status==='queued')await new Promise(r=>setTimeout(r,200));assert.equal(store.receipts.get(event.eventId).status,'played');
 await new Promise(r=>setTimeout(r,2200));await writeFile(resolve(report,'native-floating.json'),JSON.stringify({window:controller.readyInfo,actualPlayback:true,unauthenticatedRejected:true,writeScopeRejected:true},null,2));
 await controller.stop();assert.equal(controller.child,null);console.log('Native transparent topmost window, scoped authentication, real model playback and shutdown passed');
}finally{await controller?.stop();if(server){server.closeAllConnections();await new Promise(r=>server.close(r));}await rm(root,{recursive:true,force:true,maxRetries:10,retryDelay:500});}
