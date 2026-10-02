import {Toolbar} from './toolbar';
import {useEffect,useRef,useState} from 'react';
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const edges=['n','ne','e','se','s','sw','w','nw'];
export function Adjustment({characterId,character,chatRequest=0,native=false,children}:{characterId:string;character:any;chatRequest?:number;native?:boolean;children:any}){
 const key='live2d-stage.layout.'+(native?'native.':'app.')+characterId;
 const defaults={width:350,height:470,scale:1,x:0,y:0,left:Math.max(0,window.innerWidth-426),top:Math.max(0,window.innerHeight-494)};
 const initial=()=>{try{const v=JSON.parse(localStorage.getItem(key)||'{}');return {...defaults,width:clamp(Number(v.width)||350,240,1000),height:clamp(Number(v.height)||470,300,1200),scale:clamp(Number(v.scale)||1,.3,3),x:clamp(Number(v.x)||0,-800,800),y:clamp(Number(v.y)||0,-800,800),left:clamp(Number(v.left??defaults.left),0,Math.max(0,window.innerWidth-80)),top:clamp(Number(v.top??defaults.top),0,Math.max(0,window.innerHeight-80))};}catch{return defaults;}};
 const [layout,setLayout]=useState(initial),[editing,setEditing]=useState(false),[panel,setPanel]=useState('');
 const surface=useRef<HTMLDivElement>(null),drag=useRef<any>(null),tap=useRef<any>(null),nativeDouble=useRef(-1000),pointerDouble=useRef(-1000),current=useRef(layout);current.current=layout;
 const post=(text:string)=>(window as any).chrome?.webview?.postMessage(text);
 const update=(value:typeof layout)=>{current.current=value;setLayout(value);};
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(current.current));}catch{}if(native){post('layout:'+JSON.stringify({key,value:JSON.stringify(current.current)}));post('save');}};
 useEffect(()=>{if(native)post('resize:'+(layout.width+52+(panel?320:0))+':'+layout.height);else setLayout(v=>({...v,left:clamp(v.left,0,Math.max(0,window.innerWidth-v.width-52-(panel?320:0))),top:clamp(v.top,0,Math.max(0,window.innerHeight-v.height))}));},[layout.width,layout.height,native,panel]);
 useEffect(()=>{if(native&&chatRequest)setPanel('chat');},[native,chatRequest]);
 function reset(){update({...defaults,left:Math.max(0,window.innerWidth-426),top:Math.max(0,window.innerHeight-494)});setPanel('');setEditing(false);tap.current=null;save();if(native)post('reset');}
 function begin(e:any,canvas=false,edge=''){if(e.button!==0)return;e.stopPropagation();drag.current={x:e.screenX,y:e.screenY,pointerId:e.pointerId,start:current.current,canvas,edge,moved:false,offsetX:0,offsetY:0};e.currentTarget.closest('.l2ds-adjust').setPointerCapture(e.pointerId);}
 function move(e:any){
  const d=drag.current;if(!d)return;const dx=e.screenX-d.x,dy=e.screenY-d.y;
  if(!d.moved&&Math.hypot(dx,dy)<4)return;d.moved=true;tap.current=null;
  const v=d.start;
  if(d.edge){
   const width=clamp(v.width+(d.edge.includes('e')?dx:d.edge.includes('w')?-dx:0),240,1000);
   const height=clamp(v.height+(d.edge.includes('s')?dy:d.edge.includes('n')?-dy:0),300,1200);
   const ox=d.edge.includes('w')?v.width-width:0,oy=d.edge.includes('n')?v.height-height:0;
   if(native){post('move:'+(ox-d.offsetX)+':'+(oy-d.offsetY));d.offsetX=ox;d.offsetY=oy;}
   update({...v,width,height,left:native?v.left:Math.max(0,v.left+ox),top:native?v.top:Math.max(0,v.top+oy)});
  }else if(d.canvas||!editing){
   if(native){post('move:'+(dx-d.offsetX)+':'+(dy-d.offsetY));d.offsetX=dx;d.offsetY=dy;}
   else update({...v,left:clamp(v.left+dx,0,Math.max(0,window.innerWidth-80)),top:clamp(v.top+dy,0,Math.max(0,window.innerHeight-80))});
  }else update({...v,x:clamp(v.x+dx,-800,800),y:clamp(v.y+dy,-800,800)});
 }
 function end(e:any,cancel=false){
  const d=drag.current;drag.current=null;if(!d)return;
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
  // WebView2 composition can lose DOM dblclick when pointer capture/window movement intervenes.
  // Recognize two stationary pointer releases, and never treat a completed drag as a click.
  if(!cancel&&!d.moved&&!d.canvas&&!d.edge){const prev=tap.current,now=performance.now();if(prev&&now-prev.time<500&&Math.hypot(e.screenX-prev.x,e.screenY-prev.y)<8){if(!native||now-nativeDouble.current>250){setEditing(v=>!v);pointerDouble.current=now;}tap.current=null;}else tap.current={time:now,x:e.screenX,y:e.screenY};}else tap.current=null;
  save();
 }
 useEffect(()=>{if(!native)return;function doubleClick(event:Event){const {x,y}=(event as CustomEvent).detail||{};const target=document.elementFromPoint(x,y);if(!target?.closest('.l2ds-adjust')||target.closest('.l2ds-toolbar,.l2ds-sidepanel,.l2ds-resize'))return;const now=performance.now();nativeDouble.current=now;tap.current=null;if(now-pointerDouble.current>250){save();setEditing(v=>!v);}}window.addEventListener('live2d-native-doubleclick',doubleClick);return()=>window.removeEventListener('live2d-native-doubleclick',doubleClick);},[native]);
 useEffect(()=>{if(editing){surface.current?.focus({preventScroll:true});if(native)post('focus');}},[editing,native]);
 useEffect(()=>{
  function finish(){const d=drag.current;drag.current=null;if(d&&surface.current?.hasPointerCapture(d.pointerId))surface.current.releasePointerCapture(d.pointerId);save();setEditing(false);tap.current=null;}
  function keydown(e:KeyboardEvent){if(e.key==='Escape'&&editing){e.preventDefault();e.stopImmediatePropagation();finish();}}
  function nativeEscape(){if(editing)finish();}
  window.addEventListener('keydown',keydown,true);window.addEventListener('live2d-native-escape',nativeEscape);
  return()=>{window.removeEventListener('keydown',keydown,true);window.removeEventListener('live2d-native-escape',nativeEscape);};
 },[editing]);
 return <div ref={surface} tabIndex={-1} className={'l2ds-adjust'+(editing?' is-editing':'')} aria-label="Live2D 画布" style={native?{width:'100%',height:'100%'}:{position:'fixed',left:layout.left,top:layout.top,width:layout.width+52+(panel?320:0),height:layout.height}} onDoubleClick={e=>e.preventDefault()} onPointerDown={e=>{if(!(e.target as HTMLElement).closest('.l2ds-toolbar,.l2ds-sidepanel,.l2ds-resize'))begin(e);}} onPointerMove={move} onPointerUp={e=>end(e)} onPointerCancel={e=>end(e,true)} onWheel={e=>{if(!editing||(e.target as HTMLElement).closest('.l2ds-toolbar,.l2ds-sidepanel'))return;update({...current.current,scale:clamp(current.current.scale*(e.deltaY<0?1.05:1/1.05),.3,3)});save();}}>
  <div className="l2ds-viewport" style={{width:layout.width,height:layout.height}}><div className="l2ds-model" style={{width:`${layout.scale*100}%`,height:`${layout.scale*100}%`,left:`calc(${(1-layout.scale)*50}% + ${layout.x}px)`,top:`calc(${(1-layout.scale)*50}% + ${layout.y}px)`,right:'auto',bottom:'auto'}}>{children}</div></div>
  {editing&&<div className="l2ds-resize-frame" style={{width:layout.width,height:layout.height}}><small className="l2ds-adjust-hint">Esc 退出保存，滚轮控制人物放大</small>{edges.map(edge=><div key={edge} className={'l2ds-resize l2ds-resize-'+edge} aria-label={'调整画布 '+edge} onPointerDown={e=>begin(e,false,edge)}/>)}</div>}
  <div className="l2ds-controls" style={{left:layout.width}}><Toolbar character={character} native={native} panel={panel} setPanel={setPanel} reset={reset} startDrag={e=>begin(e,true)}/></div>
 </div>;
}
