import {Component,useEffect,useRef,useState,useSyncExternalStore,lazy,Suspense} from 'react';
import './stage.css';
import {Adjustment} from './adjustment';
const base='/live2d-stage/';
let loading:Promise<void>|undefined;
function core(){return loading??=new Promise<void>((resolve,reject)=>{if('Live2DCubismCore'in globalThis){resolve();return;}const s=document.createElement('script');s.src=base+'assets/core.js';s.onload=()=>resolve();s.onerror=()=>{s.remove();loading=undefined;reject(new Error('Live2D Core 加载失败'));};document.head.append(s);});}
const Player=lazy(()=>core().then(()=>import('./player')));
class PreviewBoundary extends Component<any,{error:string}>{state={error:''};static getDerivedStateFromError(e:Error){return {error:e.message};}render(){return this.state.error?<p role="alert">预览加载失败：{this.state.error}</p>:this.props.children;}}
import {api} from './api';
function createState(){
  let state:any={characters:[],selectedId:null,visible:true,error:'',generation:0,playerStatus:''};
  try{state.visible=localStorage.getItem('live2d-stage.visible')!=='false';}catch{}
  const listeners=new Set<()=>void>();
  const publish=(patch:any)=>{state={...state,...patch};listeners.forEach(fn=>fn());};
  let pending:Promise<void>|undefined;
  return {subscribe:(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn);};},getSnapshot:()=>state,
    refresh:()=>pending??=(api('state').then(data=>publish({...data,error:''})).catch(e=>{publish({error:e.message});throw e;}).finally(()=>{pending=undefined;})),
    status:(value:string)=>{if(state.playerStatus!==value)publish({playerStatus:value});},

    visible:(value:boolean)=>{try{localStorage.setItem('live2d-stage.visible',String(value));}catch{}publish({visible:value});}
  };
}
type StageState=ReturnType<typeof createState>;
function useStage(store:StageState){const state=useSyncExternalStore(store.subscribe,store.getSnapshot);useEffect(()=>{void store.refresh().catch(()=>{});const timer=setInterval(()=>void store.refresh().catch(()=>{}),2000);return()=>clearInterval(timer);},[store]);return state;}
function Panel({store}:{store:StageState}){
  const state=useStage(store);
  const character=state.characters.find((c:any)=>c.id===state.selectedId);
  if(state.preferences?.desktopFloating)return null;
  if(state.preferences?.visible===false||!character)return null;
  return <section className="l2ds l2ds-app"><Adjustment key={character.id} characterId={character.id} character={character}><PreviewBoundary key={character.id}><Suspense fallback={null}><Player key={character.id} character={character} onStatus={store.status}/></Suspense></PreviewBoundary></Adjustment></section>;

}
function Settings({store,close}:{store:StageState;close?:()=>void}){
  const state=useStage(store),[error,setError]=useState(''),[busy,setBusy]=useState(false),[saved,setSaved]=useState(''),[query,setQuery]=useState('');
  const file=useRef<HTMLInputElement>(null),lock=useRef(false),character=state.characters.find((c:any)=>c.id===state.selectedId);
  async function run(fn:()=>Promise<any>){if(lock.current)return false;lock.current=true;setError('');setSaved('');setBusy(true);try{await fn();await store.refresh();setSaved('已保存');return true;}catch(e:any){setError(e.message);return false;}finally{lock.current=false;setBusy(false);}}
  useEffect(()=>setQuery(''),[state.selectedId]);
  async function preview(actionId:string){setError('');if(state.preferences?.visible===false&&!state.preferences?.desktopFloating){setError('请先启用「Harness 内使用」或「桌面悬浮」，等待模型就绪后再试播。');return;}try{await api('play',{characterId:character.id,actionId});close?.();}catch(e:any){setError(e.message);}}
  const actions=character?.actions.filter((a:any)=>a.name.toLowerCase().includes(query.toLowerCase()))??[];
  return <section className="l2ds-config" aria-label="DSHLive2D 配置">
    <h2>DSHLive2D</h2><p className="l2ds-muted">作者：小红书号 4190947207 · GitHub：<a href="https://github.com/B612plant" target="_blank" rel="noreferrer">B612plant</a></p><p className="l2ds-muted">配置角色模型与演出动作，让 Agent 根据当前角色选择动作。</p>
    <div className="l2ds-config-card l2ds-toggle"><div><strong>Harness 内使用</strong><p className="l2ds-muted">仅显示角色。拖拽移动画布，双击后分别调整画布和人物的大小、位置。</p></div><label><input type="checkbox" checked={state.preferences?.visible!==false} disabled={busy} onChange={e=>void run(()=>api('preferences',{visible:e.target.checked}))}/>启用</label></div>

    <div className="l2ds-config-card l2ds-toggle"><div><strong>桌面悬浮</strong><p className="l2ds-muted">独立透明置顶窗口，切换到其他应用后仍可使用。拖拽角色移动窗口，双击进入调整。</p></div><label><input aria-label="桌面悬浮" type="checkbox" disabled={busy} checked={!!state.preferences?.desktopFloating} onChange={e=>void run(()=>api('preferences',{desktopFloating:e.target.checked}))}/>启用</label></div>
    <div className="l2ds-config-card l2ds-toggle"><div><strong>动作控制（将消耗更多 token）</strong><p className="l2ds-muted">允许 Agent 在对话中读取动作列表，选择与内容最合适的动作播放。请先试播并准确命名动作。</p></div><label><input aria-label="动作控制" type="checkbox" disabled={busy} checked={!!state.preferences?.actionControl} onChange={e=>void run(()=>api('preferences',{actionControl:e.target.checked}))}/>启用</label></div>
    <div className="l2ds-config-heading"><h3>角色模型</h3><button disabled={busy} onClick={()=>file.current?.click()}>{busy?'正在保存…':'导入角色 ZIP'}</button></div>
    <input ref={file} className="l2ds-file" type="file" accept=".zip,application/zip" disabled={busy} aria-label="上传角色 ZIP" onChange={e=>{const zip=e.target.files?.[0];if(!zip)return;void run(async()=>{if(zip.size>128*1024*1024)throw new Error('ZIP 大小须小于 128 MiB');const r=await fetch(base+'import?name='+encodeURIComponent(zip.name.replace(/\.zip$/i,'')),{method:'POST',headers:{'Content-Type':'application/zip'},body:zip});const value=await r.json();if(!r.ok)throw new Error(value.message);});e.target.value='';}}/>
    <p className="l2ds-muted">从 ZIP 根目录及子目录查找 moc3。请包含配套纹理、动作文件，建议保留 model3.json。每个 ZIP 对应一个角色，最大 128 MiB。</p>
    {state.characters.length?<div className="l2ds-fields"><label>当前角色<select value={state.selectedId??''} disabled={busy} onChange={e=>run(()=>api('update',{characterId:e.target.value,select:true}))}>{state.characters.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>{character&&<label>角色名称<input key={character.id+character.name} defaultValue={character.name} maxLength={80} disabled={busy} onBlur={e=>{if(e.target.value!==character.name)void run(()=>api('update',{characterId:character.id,name:e.target.value}));}}/></label>}</div>:<div className="l2ds-empty">还没有角色。导入一个 Live2D ZIP 开始配置。</div>}
    {character&&<><div className="l2ds-config-heading"><h3>动作列表 <span>{character.actions.length}</span></h3><input type="search" aria-label="搜索动作" placeholder="搜索动作" value={query} onChange={e=>setQuery(e.target.value)}/></div>
      <p className="l2ds-muted">请以实际动作命名，例如“低头眨眼”，避免把歪头标为招手。修改名称后移开焦点即保存。只有已命名确认的动作才会提供给 Agent；点击试播会关闭设置，展示演出。</p>
      {!actions.length&&<div className="l2ds-empty">{query?'没有匹配的动作。':'模型没有动作或表情文件，可预览静态模型。'}</div>}
      <div className="l2ds-action-list">{actions.map((a:any)=><div className="l2ds-action" key={character.id+a.id}><span className="l2ds-kind" title={a.named?'已命名':'请先试播并确认名称'}>{a.named?(a.kind==='motion'?'动作':'表情'):'待命名'}</span><input key={a.name} aria-label="动作名称" defaultValue={a.name} maxLength={80} disabled={busy} onBlur={e=>{if(e.target.value!==a.name)void run(()=>api('update',{characterId:character.id,actionId:a.id,actionName:e.target.value}));}}/><button title="试播后，修改名称或点击确认名称，才会提供给 Agent" disabled={busy||(state.preferences?.visible===false&&!state.preferences?.desktopFloating)} onClick={()=>void preview(a.id)}>试播</button>{!a.named&&<button disabled={busy} onClick={()=>void run(()=>api('update',{characterId:character.id,actionId:a.id,actionName:a.name}))}>确认名称</button>}</div>)}</div></>}
    {(error||state.error)&&<p role="alert" className="l2ds-error">{error||state.error}</p>}<div className="l2ds-save" aria-live="polite">{busy?'正在保存…':saved}</div>
    <div className="l2ds-config-card"><strong>Agent 演出能力</strong><p className="l2ds-muted">动作控制默认关闭；开启后才向 Agent 提供演出工具与选择说明。Harness 内的角色或桌面悬浮角色就绪后均可播放；没有合适动作时继续正常回复。</p></div>
  </section>;
}
export const name='live2d-stage-client';
export const inject=['slots'];
export function apply(ctx:any){const store=createState();ctx.slots.inject('shell.overlay',()=>ctx.slots.register({name:'shell.overlay',id:'live2d-stage',order:45,inject:()=>({store})},Panel));ctx.slots.inject('settings.section',()=>ctx.slots.register({name:'settings.section',id:'live2d-stage',label:()=> 'DSHLive2D',order:60,inject:()=>({store})},Settings));}
