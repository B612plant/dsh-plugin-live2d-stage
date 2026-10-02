import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {mkdtemp,mkdir,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';
const runtime=process.argv[2],plugin=process.argv[3];
const root=await mkdtemp(resolve(tmpdir(),'live2d-profile-smoke-'));
process.env.DSH_HOME=root;
const require=createRequire(pathToFileURL(resolve(runtime,'package.json')));
const {loadProfileDirectory,loadLayeredEnv}=await import(pathToFileURL(require.resolve('@deepseek-ai/dsh-app-boot')).href);
const {runProfile}=await import(pathToFileURL(require.resolve('@deepseek-ai/dsh/profile-boot')).href);
let app;
try{
  const profileDir=resolve(root,'profiles/desktop');await mkdir(resolve(profileDir,'node_modules'),{recursive:true});
  await symlink(plugin,resolve(profileDir,'node_modules/dsh-plugin-live2d-stage'),'junction');
  await writeFile(resolve(profileDir,'package.json'),JSON.stringify({name:'live2d-smoke',private:true,dependencies:{'dsh-plugin-live2d-stage':'file:'+plugin},dsh:{profile:{bundles:['@deepseek-ai/dsh-base','@deepseek-ai/dsh-web-app','dsh-plugin-live2d-stage']}}}));
  await writeFile(resolve(profileDir,'cordis.patch.yml'),'- id: desktop-product-telemetry\n  disabled: true\n- id: product-analytics\n  disabled: true\n- id: web-app\n  config:\n    openBrowser: false\n    printUrl: false\n');
  const anchor=resolve(runtime,'node_modules/@deepseek-ai/dsh/package.json');
  const profile=loadProfileDirectory('dsh',profileDir,anchor);
  app=await runProfile({environment:loadLayeredEnv('dsh'),profile:'desktop',resolvedProfile:{profile,installAnchor:anchor},patchFiles:[],args:['--no-open','--port','0']});
  const url=app.ctx.connection.authenticatedUrl('http://127.0.0.1:'+app.ctx.webServer.port);
  const exchange=await fetch(url,{redirect:'manual'});assert.equal(exchange.status,303);
  const authenticated=new URL(url);const headers={cookie:exchange.headers.get('set-cookie').split(';')[0]};authenticated.search='';
  const index=await fetch(authenticated,{headers});assert.equal(index.status,200);
  const html=await index.text();assert.ok(html.includes('dsh-plugin-live2d-stage'),'plugin client is present in native boot graph');
  const endpoint=new URL(url);endpoint.pathname='/live2d-stage/state';
  endpoint.search='';const state=await fetch(endpoint,{headers});assert.equal(state.status,200);assert.equal((await state.json()).characters.length,1);
  console.log('Native desktop profile boot, plugin activation, client graph and authenticated API passed.');
  if(process.argv.includes('--settings-ui')){
    const localRequire=createRequire(import.meta.url);
    const {chromium}=localRequire('playwright');
    const browser=await chromium.launch({channel:'msedge',headless:true});
    try{
      const page=await browser.newPage({viewport:{width:1200,height:900}});
      const errors=[];page.on('pageerror',e=>errors.push(e.stack));
      await page.goto(url);await page.getByRole('button',{name:'继续',exact:true}).click({timeout:15000});
      await page.getByRole('button',{name:/^(设置|Settings)$/}).click({timeout:25000});
      await page.getByRole('button',{name:'稍后配置',exact:true}).click({timeout:15000});await page.getByRole('button',{name:'Live2D',exact:true}).click();
      await page.getByRole('heading',{name:'Live2D',exact:true}).waitFor();
      await page.getByRole('button',{name:'导入角色 ZIP',exact:true}).waitFor();
      await page.getByLabel('动作控制',{exact:true}).click();await page.waitForFunction(()=>!document.querySelector('input[aria-label="动作控制"]')?.disabled);
      await page.getByLabel('动作控制',{exact:true}).click();await page.waitForFunction(()=>!document.querySelector('input[aria-label="动作控制"]')?.disabled);
      await page.getByLabel('桌面悬浮',{exact:true}).click();await page.waitForFunction(()=>!document.querySelector('input[aria-label="桌面悬浮"]')?.disabled,{},{timeout:30000});assert.equal(await page.getByLabel('桌面悬浮',{exact:true}).isChecked(),true);assert.equal(await page.locator('.l2ds').count(),0);
      await page.getByLabel('桌面悬浮',{exact:true}).click();await page.waitForFunction(()=>!document.querySelector('input[aria-label="桌面悬浮"]')?.disabled);
      await page.getByRole('button',{name:'恢复人物显示',exact:true}).click();await page.waitForTimeout(1200);await page.screenshot({path:'build/reports/live2d-plugin/native-settings.png'});
      await page.getByRole('button',{name:'关闭',exact:true}).click();await page.evaluate(async()=>{const s=await (await fetch('/live2d-stage/state')).json();localStorage.setItem('live2d-stage.layout.app.'+s.selectedId,JSON.stringify({width:350,height:470,scale:1.8856491423232367,x:4,y:151,left:513,top:81}));});await page.reload();await page.waitForTimeout(4500);await page.getByRole('button',{name:'稍后配置',exact:true}).click();assert.ok((await page.locator('.l2ds').boundingBox()).width>0);console.log(await page.locator('.l2ds').evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),canvas:el.querySelector('canvas')?.getBoundingClientRect().toJSON(),html:el.outerHTML.slice(0,2000)})));await page.screenshot({path:'build/reports/live2d-plugin/host-visibility.png'});
      assert.deepEqual(errors,[]);
      console.log('Native Settings > Live2D page opened successfully.');
    }catch(error){const pages=browser.contexts().flatMap(c=>c.pages());if(pages[0]){await pages[0].screenshot({path:'build/reports/live2d-plugin/native-settings-failure.png'});console.log((await pages[0].locator('body').innerText()).slice(0,4000));}throw error;}finally{await browser.close();}
  }
}finally{await app?.ctx.fiber.dispose();await rm(root,{recursive:true,force:true});}









