import {useEffect,useState,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Player from './player';
import {Adjustment} from './adjustment';
import {api} from './api';
import './stage.css';
function Floating(){const [state,setState]=useState<any>(null),[status,setStatus]=useState('模型加载中…');
  const onStatus=useCallback((value:string)=>{setStatus(value);if(value.includes('已就绪'))(window as any).chrome?.webview?.postMessage('ready');},[]);
  useEffect(()=>{let active=true;async function refresh(){try{const next=await api('state');if(active)setState(next);}catch(e:any){if(active)setStatus(e.message);}}void refresh();const timer=setInterval(refresh,2000);return()=>{active=false;clearInterval(timer);};},[]);
  const character=state?.characters.find((c:any)=>c.id===state.selectedId);
  return <section className="l2ds l2ds-native">{character&&<Adjustment key={character.id} characterId={character.id} character={character} chatRequest={state?.chatRequest} native><Player character={character} onStatus={onStatus}/></Adjustment>}</section>;
}
createRoot(document.getElementById('root')!).render(<Floating/>);
