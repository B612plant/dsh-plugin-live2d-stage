const base='/live2d-stage/';
export async function api(path:string,data?:unknown){const r=await fetch(base+path,data===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const value=await r.json();if(!r.ok)throw new Error(value.message??'请求失败');return value;}
