import {spawn} from 'node:child_process';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {createInterface} from 'node:readline';
import {resolve} from 'node:path';

export class FloatingController {
  constructor({directory,profile,origin,onClose=()=>{}}){this.directory=directory;this.profile=profile;this.origin=origin;this.onClose=onClose;this.child=null;this.token='';this.status='closed';this.error='';this.pending=null;}
  admits(req){const token=req.headers['x-live2d-float'];if(!this.token||typeof token!=='string'||Buffer.byteLength(token)!==Buffer.byteLength(this.token)||!timingSafeEqual(Buffer.from(token),Buffer.from(this.token)))return false;const path=new URL(req.url,'http://localhost').pathname;return req.method==='GET'&&(path==='/live2d-stage/state'||path==='/live2d-stage/events'||path==='/live2d-stage/chat/sessions'||path==='/live2d-stage/chat/history'||path.startsWith('/live2d-stage/assets/')||path.startsWith('/live2d-stage/models/'))||req.method==='POST'&&['/live2d-stage/diagnostics','/live2d-stage/receipt','/live2d-stage/play','/live2d-stage/close','/live2d-stage/dock','/live2d-stage/chat/send'].includes(path);}
  start(testOptions={}) {
    if(this.pending)return this.pending;if(this.child&&this.status==='ready')return Promise.resolve();
    if(process.platform!=='win32')return Promise.reject(new Error('桌面悬浮目前支持 Windows'));
    this.status='starting';this.error='';this.token=randomBytes(32).toString('hex');
    this.pending=new Promise((resolveStart,reject)=>{
      const child=spawn(resolve(this.directory,'Live2DFloating.exe'),[],{windowsHide:true,stdio:['pipe','pipe','pipe']});this.child=child;
      let settled=false;const finish=(error)=>{if(settled)return;settled=true;clearTimeout(timer);if(error){this.error=error.message;this.status='error';reject(error);}else{this.status='ready';resolveStart();}};
      const timer=setTimeout(()=>{finish(new Error('桌面悬浮启动超时，请确认 WebView2 可用'));this.stop();},25000);
      const lines=createInterface({input:child.stdout});lines.on('line',line=>{let event;try{event=JSON.parse(line);}catch{return;}if(event.type==='ready'){this.readyInfo=event;finish();}if(event.type==='error'){finish(new Error(event.message));}});
      child.stderr.on('data',()=>{});child.on('error',error=>{if(this.child===child){this.child=null;this.token='';}finish(error);});
      child.on('exit',()=>{lines.close();if(this.child===child){this.child=null;this.token='';this.status='closed';this.onClose();}finish(new Error(this.error||'桌面悬浮窗口已关闭'));});
      child.stdin.on('error',()=>{});
      child.stdin.write(JSON.stringify({url:this.origin+'/live2d-stage/assets/floating.html?launch='+randomBytes(12).toString('hex'),token:this.token,profile:this.profile,parentPid:process.pid,...testOptions})+'\n','utf8');
    }).finally(()=>{this.pending=null;});return this.pending;
  }
  async stop(){const child=this.child;if(!child)return;this.child=null;this.token='';this.status='closed';await new Promise(resolveStop=>{const timer=setTimeout(()=>{child.kill();resolveStop();},4000);child.once('exit',()=>{clearTimeout(timer);resolveStop();});child.stdin.end();});}
}
