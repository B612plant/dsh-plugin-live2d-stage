import {useEffect,useMemo,useRef} from 'react';
import {Live2DPlayer} from '../../vendor/live2d/live2d-player/Live2DPlayer';
import {PlatformDelegate} from '../../vendor/live2d/live2d-player/engine/PlatformDelegate';
import {api} from './api';
// Override only this plugin's bundled copy; the source project's runtime is untouched.
export default function Player({character,onStatus}:{character:any;onStatus:(text:string)=>void}) {
  const player=useRef<any>(null),issues=useRef<string[]>([]);
  useEffect(()=>{const error=(e:ErrorEvent)=>{issues.current.push(String(e.error?.stack||e.message).slice(0,2000));issues.current=issues.current.slice(-5);};const rejection=(e:PromiseRejectionEvent)=>{issues.current.push(String(e.reason?.stack||e.reason).slice(0,2000));issues.current=issues.current.slice(-5);};window.addEventListener('error',error);window.addEventListener('unhandledrejection',rejection);return()=>{window.removeEventListener('error',error);window.removeEventListener('unhandledrejection',rejection);};},[]);

  // A monitor DPI change need not change the CSS viewport size.
  useEffect(()=>{let media:MediaQueryList;function changed(){if(player.current?.getDiagnostics()?.status==='ready')window.dispatchEvent(new Event('resize'));watch();}function watch(){media?.removeEventListener('change',changed);media=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);media.addEventListener('change',changed);}watch();return()=>media.removeEventListener('change',changed);},[]);

  useEffect(()=>{
    let pointer:{x:number;y:number}|null=null;
    const move=(e:PointerEvent)=>{if(e.pointerType==='mouse')pointer={x:e.clientX,y:e.clientY};};
    const leave=(e:MouseEvent)=>{if(!e.relatedTarget)pointer=null;};
    const clear=()=>{pointer=null;};
    const native=(e:MessageEvent)=>{const d=e.data;if(d?.type==='live2d-pointer'&&Number.isFinite(d.x)&&Number.isFinite(d.y))pointer={x:d.x,y:d.y};};
    const webview=(window as any).chrome?.webview;
    window.addEventListener('pointermove',move,true);window.addEventListener('mouseout',leave);window.addEventListener('blur',clear);
    webview?.addEventListener?.('message',native);
    const timer=window.setInterval(()=>{
      if(!pointer||document.hidden)return;
      const canvas=document.querySelector('.l2ds canvas');const rect=canvas?.getBoundingClientRect();
      if(!rect?.width||!rect.height)return;
      PlatformDelegate.getInstance().setLookTarget((pointer.x-rect.left-rect.width/2)/(rect.width/2),(rect.top+rect.height/2-pointer.y)/(rect.height/2));
    },50);
    return()=>{clearInterval(timer);window.removeEventListener('pointermove',move,true);window.removeEventListener('mouseout',leave);window.removeEventListener('blur',clear);webview?.removeEventListener?.('message',native);};
  },[character.id]);

  const model=useMemo(()=>{const split=character.modelPath.lastIndexOf('/'),dir=split<0?'':character.modelPath.slice(0,split+1);const refs=character.model.FileReferences;return {id:character.id,name:character.name,resourcesPath:'/live2d-stage/models/'+character.id+'/'+dir,defaultModelDir:'.',defaultModel3Json:character.modelPath.slice(split+1),icon:'',models:[],idleGroup:Object.keys(refs.Motions??{}).find(x=>/^idle$/i.test(x))??null,motionGroups:Object.fromEntries(Object.entries(refs.Motions??{}).map(([g,rows]:any)=>[g,rows.map((r:any)=>r.File)])),hitAreas:(character.model.HitAreas??[]).map((h:any)=>({id:h.Id,name:h.Name}))};},[character.id,character.modelPath]);
  useEffect(()=>{let closed=false,after:number|undefined,epoch:string|undefined;const client=crypto.randomUUID();let timer:any,lastReport=0;
    async function tick(){try{
      const diagnostics=player.current?.getDiagnostics();const ready=diagnostics?.status==='ready';onStatus(diagnostics?.message??'模型加载中…');
      if(Date.now()-lastReport>5000){lastReport=Date.now();const canvas=document.querySelector('.l2ds canvas') as HTMLCanvasElement;let pixels=0,drawError='';try{const snapshot=ready?PlatformDelegate.getInstance().snapshot():null;if(snapshot){const sample=document.createElement('canvas');sample.width=64;sample.height=64;const ctx=sample.getContext('2d')!;ctx.drawImage(snapshot,0,0,64,64);const data=ctx.getImageData(0,0,64,64).data;for(let i=3;i<data.length;i+=4)if(data[i]>10)pixels++;}}catch(e:any){drawError=String(e.stack||e);}
        const delegate:any=PlatformDelegate.getInstance(),sub=delegate.subdelegate,manager=sub?._live2dManager,loaded=manager?._models?.[0],gl=sub?._glManager?.getGl();const render={modelState:loaded?._state,modelLoaded:!!loaded?._model,textureCount:sub?._textureManager?._textures?.length,gpu:gl?.getParameter(gl.RENDERER),contextLost:gl?.isContextLost(),glError:gl?.getError()};
        void api('diagnostics',{render,client,characterId:character.id,protocol:location.protocol,status:diagnostics,pixels,drawError,issues:issues.current,canvas:canvas?{width:canvas.width,height:canvas.height,rect:canvas.getBoundingClientRect().toJSON()}:null}).catch(()=>{});
      }
      const page=await api('events?client='+client+'&character='+character.id+'&ready='+ready+(after===undefined?'':'&after='+after));
      if(closed)return;if(epoch&&epoch!==page.epoch){after=page.sequence;epoch=page.epoch;return;}epoch=page.epoch;
      for(const event of page.events){void (async()=>{if(closed)return;let played=false;if(ready){const a=event.action;played=a.kind==='motion'?await player.current.playMotion(a.group,a.index):player.current.setExpression(a.expressionId);}await api('receipt',{eventId:event.id,status:played?'played':'failed'});if(!closed)onStatus(played?'已播放：'+event.action.name:'动作播放失败');})().catch((e:any)=>{if(!closed)onStatus(e.message);});}
      after=page.sequence;
    }catch(e:any){if(!closed)onStatus(e.message);}finally{if(!closed)timer=setTimeout(tick,650);}}
    void tick();return()=>{closed=true;clearTimeout(timer);};
  },[character.id,onStatus]);
  return <Live2DPlayer ref={player} character={model} translate={(message,values=[])=>message.replace(/\{(\d+)\}/g,(match,index)=>Number(index)<values.length?String(values[Number(index)]):match)} hint={null} interactive={false}/>;
}

