import React,{useState} from 'react';
import * as JSX from 'react/jsx-runtime';
import {createRoot} from 'react-dom/client';
const slots=[];
function Shell(){const [open,setOpen]=useState(false);return <><button onClick={()=>setOpen(true)}>设置</button>{slots.filter(s=>s.config.name==='shell.overlay').map(s=><s.Component key={s.config.id} {...s.config.inject?.()}/>)}{open&&<div style={{position:'relative',zIndex:200,background:'white',color:'#202329',margin:'30px',padding:'30px',width:'600px'}}><nav>设置 / Live2D</nav>{slots.filter(s=>s.config.name==='settings.section').map(s=><s.Component key={s.config.id} {...s.config.inject?.()} close={()=>setOpen(false)}/>)}</div>}</>;}
window.__ModuleLoader__={load(record){const plugin=record.factory(name=>{if(name==='react')return React;if(name==='react/jsx-runtime')return JSX;throw Error(name)});plugin.apply({slots:{inject:(_,fn)=>fn(),register:(config,Component)=>{slots.push({config,Component});return()=>{}}}});createRoot(document.getElementById('root')).render(<Shell/>);}};
