/** Turn owned styles into a factory module while keeping relative theme imports in the module graph. */
export function clientStyleModule(raw,id,tag){
  const pattern=/^@import\s+["']([^"']+)["'];\s*$/gm;
  const imports=[...raw.matchAll(pattern)].map(match=>'import '+JSON.stringify(match[1])+';').join('\n');
  return imports+'\nconst css='+JSON.stringify(raw.replace(pattern,''))+';const style=document.createElement("style");style.dataset.plugin='+JSON.stringify(id)+';style.dataset.pluginCss='+JSON.stringify(tag)+';style.textContent=css;document.head.append(style);';
}
