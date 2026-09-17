import{n as e,r as t,s as n}from"./i18n-BwCuf8CS.js";import{Cr as r,Er as i,It as a,Vn as o,xt as s,yt as c}from"./three.core-3Slefer1.js";import{n as l}from"./frameScheduler-C8z9S5wp.js";import{a as u}from"./quality-DkBoKjcL.js";import{C as d,a as f,b as p,c as m,d as h,f as g,i as _,l as v,n as y,o as b,p as ee,r as te,s as x,t as S,u as ne}from"./objectiveGlyphs-7kLRGYtX.js";import{n as re,t as C}from"./dom-DQVRVNJD.js";import{n as w,r as ie,t as T}from"./fonts-CSLQRemL.js";import{a as E,c as ae,d as oe,o as se,s as D}from"./campaignOperations-BW289sUD.js";import{p as O}from"./specs-DzJ33J6i.js";import{n as ce,t as le}from"./presentationAnchors.generated-B6eIwLQw.js";import{n as ue,t as de}from"./icons-BHibIFPX.js";import{t as k}from"./uiIcons-D7cq5V9M.js";import{i as fe,n as pe,r as me,t as he}from"./moduleRegistry-BfrVTtVC.js";import{o as ge,r as _e,s as ve}from"./specialActions-BhdRiLKd.js";import{n as ye}from"./tier-Pvk6fSHL.js";import{i as be}from"./matchModes-C7cw_gEg.js";import{c as xe,f as Se,r as Ce}from"./matchRuleset-D4GettyL.js";import{a as we,n as Te,t as Ee}from"./consumables-CXMqMUv-.js";import{a as De,i as Oe,n as ke,r as Ae,t as je}from"./hitEventFormat-tYjX0FsR.js";import{t as Me}from"./maps-oinsofA9.js";import{i as Ne}from"./shoreline-Dv_l_pkP.js";function Pe(e,t){try{let n=t();if(e&&n===null)throw Error(`textured minimap capture returned no scene`);return n}catch(t){if(e)throw Error(`textured minimap capture failed`,{cause:t});return null}}function Fe(e,t){if(!e||e.source!==`scene`||e.generation!==t||e.width<=0||e.height<=0)throw Error(`strict minimap export requires a fresh textured scene capture`)}function Ie(e,t,n){let r=Math.max(0,e),i=Math.min(3,n,Math.max(0,Math.floor((r-(t?62:0)-18)/53))),a=i?18+i*53:0,o=a&&t?8:0;return{toastRows:i,toastHeight:a,chatOffset:a+o,chatHeight:Math.max(0,r-a-o)}}function Le(e){let t=0,n=new Set,r=new WeakMap,i=new ResizeObserver(f),a=new MutationObserver(e=>{let t=!1;for(let n of e){if(n.type===`childList`){t=!0;continue}let e=n.attributeName;if(e===null)continue;let i=n.target,a=r.get(i),o=i.getAttribute(e);a?.get(e)!==o&&(t=!0),a?.set(e,o)}t&&f()}),o=(e,t,n=!1)=>{let i=r.get(e);i||(i=new Map,r.set(e,i));for(let n of t)i.set(n,e.getAttribute(n));a.observe(e,{attributes:!0,attributeFilter:t,childList:n})},s=e=>{let t=document.querySelector(e);return!t||!t.getClientRects().length||getComputedStyle(t).visibility===`hidden`?null:t.getBoundingClientRect()},c=(e,t=!1)=>{for(let r of document.querySelectorAll(e))n.has(r)||(n.add(r),i.observe(r),o(r,[`class`,`hidden`],t))};function l(e,t){let n=s(`.cot-dp`);return Math.min(e-12,n?n.top-(t?8:36):e,s(`.cot-spec.show`)?.top??e,t?s(`.cot-touch.on .joy`)?.top??e:e,t?s(`.cot-touch.on .fire.alt`)?.top??e:e,s(`.cot-drive`)?.top??e)-8}function u(e,t,n){return Math.min(e-92,n&&n.left>t/2?n.top-8:e,s(`.cot-spec.show`)?.top??e,t<768?s(`.cot-drive`)?.top??e:e,t<768?s(`.cot-special.show`)?.top??e:e)}function d(){t=0;let n=!!e.getClientRects().length;if(document.body.hasAttribute(`data-cot-battle-layout`)!==n&&document.body.toggleAttribute(`data-cot-battle-layout`,n),!n)return;c(`.cot-ear,.cot-minimap,.cot-dp,.cot-drive,.cot-special,.cot-spec,.cot-top,.cot-touch .joy,.cot-touch .fire.alt`),c(`.cot-si-toasthost,.cot-room-chat`,!0);let r=window.visualViewport?.height||window.innerHeight,i=window.visualViewport?.width||window.innerWidth,a=document.body.classList.contains(`cot-touch-layout`),o=i<1e3?`stacked`:`inline`;document.body.dataset.hudTray!==o&&(document.body.dataset.hudTray=o);let d=s(`.cot-minimap`),f=s(`.cot-top`)?.bottom||64,p=Math.max(f,s(`.cot-ear.l`)?.bottom||0,d&&d.left<i/2?d.bottom:0)+8,m=l(r,a),h=Math.max(f,s(`.cot-ear.r`)?.bottom||0)+8,g=u(r,i,d),_=!!s(`.cot-room-chat:not([hidden])`),v=e.querySelector(`.cot-si-toasthost`)?.childElementCount||0,y=Ie(m-p,_,a?Math.min(1,v):v),b={"left-top":p,"left-height":Math.max(0,m-p),"right-top":h,"right-height":Math.max(0,g-h),"toast-height":y.toastHeight,"chat-top":p+y.chatOffset,"chat-height":y.chatHeight};for(let[e,t]of Object.entries(b)){let n=`--hud-${e}`,r=`${Math.floor(t)}px`;document.body.style.getPropertyValue(n)!==r&&document.body.style.setProperty(n,r)}let ee=String(y.toastRows);e.dataset.toastRows!==ee&&(e.dataset.toastRows=ee)}function f(){t||=requestAnimationFrame(d)}o(document.body,[`class`],!0),o(e,[`style`],!0),window.addEventListener(`resize`,f,{passive:!0}),window.visualViewport?.addEventListener(`resize`,f,{passive:!0}),window.addEventListener(`cot:layoutchange`,f);let p=e=>{n.has(e.target)&&f()};window.addEventListener(`transitionend`,p),window.addEventListener(`transitioncancel`,p),f()}function Re(e,t,r){let i=!1,a=-1,o=!1,s=!1,c=null,l=()=>{c!==null&&clearTimeout(c),c=null},u=()=>{s=!s,r.classList.remove(`tick`,`tick-alt`),r.classList.add(s?`tick`:`tick-alt`)};return{reset:()=>{l(),i=!1,o=!1,a=-1,e.classList.remove(`on`,`rollout`,`waiting`,`preparing`),r.classList.remove(`tick`,`tick-alt`,`go`),t.textContent=n(`hud.battleBeginsIn`),r.textContent=``},setWaiting(o){i!==o&&(i=o,l(),a=-1,e.classList.remove(`rollout`),e.classList.toggle(`waiting`,o),r.classList.remove(`go`,`tick`,`tick-alt`),t.textContent=n(o?`hud.waitingForCommanders`:`hud.battleBeginsIn`),r.textContent=o?n(`playMenu.ready.iAmReady`):``,e.classList.toggle(`on`,o))},countdown(s,d=!1){if(!(i||!Number.isFinite(s)))if(s>0){if(d){if(o)return;o=!0,a=-1,l(),e.classList.remove(`rollout`),e.classList.add(`on`,`preparing`),r.classList.remove(`go`,`tick`,`tick-alt`),t.textContent=n(`hud.preparingBattlefield`),r.textContent=``;return}o&&(o=!1,e.classList.remove(`preparing`),t.textContent=n(`hud.battleBeginsIn`));let i=Math.ceil(s);if(i===a)return;l(),e.classList.remove(`rollout`),e.classList.add(`on`),a=i,r.classList.remove(`go`),r.textContent=String(i),u()}else a!==0&&(o&&(o=!1,e.classList.remove(`preparing`),t.textContent=n(`hud.battleBeginsIn`)),a=0,e.classList.add(`rollout`),r.textContent=n(`hud.rollout`),r.classList.add(`go`),u(),l(),c=setTimeout(()=>{e.classList.remove(`on`),c=null},1100))}}}var ze=/^[a-z0-9_]+$/;function Be(e={}){let t=ze.test(String(e.specId||``))?String(e.specId):``,n=e.count??0,r=e.index??0,i=Number.isInteger(n)&&n>0?n:0,a=Number.isInteger(r)&&r>0?Math.min(r,i||r):0;return{icon:t?`/icons/${t}_angle.webp`:``,position:i&&a?`${a} / ${i}`:``}}function Ve(){return`<div class="portrait" aria-hidden="true"><img alt=""></div><div class="identity" aria-live="polite"><span class="spec-status">`+k(`scope`,14)+`<span>${n(`spectator.spectating`)}</span><b class="idx" hidden></b></span><span class="who"><b class="nick"></b><span class="veh"></span></span></div><div class="switch" role="group" aria-label="`+n(`spectator.switchGroupAria`)+`"><button type="button" class="cycle prev" aria-label="`+n(`spectator.cyclePrevAria`)+`"><span class="cycle-icon" aria-hidden="true">`+k(`chevronLeft`,13)+`</span><kbd aria-hidden="true">A</kbd></button><button type="button" class="cycle next" aria-label="`+n(`spectator.cycleNextAria`)+`"><kbd aria-hidden="true">D</kbd><span class="cycle-icon" aria-hidden="true">`+k(`chevronRight`,13)+`</span></button></div><button type="button" class="gar" aria-label="${n(`spectator.garageAria`)}"><span class="gar-icon" aria-hidden="true">`+k(`garage`,17)+`</span><span>${n(`spectator.garage`)}</span></button>`}function He(e,t=0){return typeof e==`number`&&Number.isFinite(e)?e:t}var Ue=1e-6;function We(e,t,n){return t<0||e-t>=n-Ue}function Ge(e,t,n){let r=He(t?.speed)*3.6,i=Math.min(999,Math.abs(r)),a=Math.round(i),o=r>.5?`FWD`:r<-.5?`REV`:`HOLD`,s=Math.max(0,He(n?.topSpeedKmh)),c=Math.max(0,He(n?.reverseSpeedKmh,s*.2)),l=o===`REV`?c:s,u=l>0?Math.min(1,i/l):0;return e.speedKmh=a,e.direction=o,e.limitKmh=Math.round(l),e.speedRatio=u,e.sweepDeg=u*270,e.sweepLength=u*75,e.needleDeg=-135+e.sweepDeg,e}function Ke({index:e,elements:t,locale:n,drawIcon:r,typeLabel:i,count:a,selectionLabel:o,typeColors:s,underlineColors:c}){let l=!1,u=``,d=``,f,p,m,h,g=!1,_=!1,v,y,b,ee,te,x,S,ne,re,C,w,ie,T,E,ae,oe=e=>{v!==e&&(t.button.classList.toggle(`sel`,e),v=e)},se=(e,t)=>t===d&&e.name===f&&Object.is(e.penLabel,p)&&Object.is(e.dmg,m)&&Object.is(e.count,h),D=(e,t,n)=>l&&e===u&&t===g&&n===_,O=(e,n)=>{if((!l||e!==d)&&(r(e),t.type.style.color=s[e]||`#9fb0bf`,t.underline.style.background=c[e]||`rgba(146,164,180,.4)`),!l||e!==d||n!==u){let n=i(e);b!==n&&(t.type.textContent=n,b=n)}},ce=e=>{let n=e.penLabel==null?`—`:String(e.penLabel);te!==n&&(t.penetration.textContent=n,te=n);let r=e.dmg==null?`—`:String(e.dmg);x!==r&&(t.damage.textContent=r,x=r);let i=a(e);S!==i&&(t.count.textContent=`${i}`,S=i);let o=i<=0;return y!==o&&(t.button.classList.toggle(`empty`,o),y=o),i},le=(n,r,i,a)=>{let s=i?`true`:`false`;ne!==s&&(t.button.setAttribute(`aria-pressed`,s),ne=s);let c=a&&i?`true`:`false`;re!==c&&(t.button.setAttribute(`aria-busy`,c),re=c);let l=o(n.name||n.type||`slot ${e+1}`,r,i,a);C!==l&&(t.button.setAttribute(`aria-label`,l),C=l)};return{get selected(){return v===!0},select:oe,render(e,r,i=!1){oe(r);let a=e.type||``,o=n();if(D(o,r,i)&&se(e,a))return;O(a,o);let s=e.name||`—`;ee!==s&&(t.name.textContent=s,ee=s);let c=ce(e);le(e,c,r,i),l=!0,u=o,d=a,f=e.name,p=e.penLabel,m=e.dmg,h=e.count,g=r,_=i},layout(e,n,r){let i=v===!0,a=i?`0px`:`${-(r*56)}px`;w!==a&&(t.button.style.setProperty(`--touch-ammo-x`,a),w=a);let o=!e||i||n,s=o?0:-1;ie!==s&&(t.button.tabIndex=s,ie=s);let c=o?null:`true`;T!==c&&(c===null?t.button.removeAttribute(`aria-hidden`):t.button.setAttribute(`aria-hidden`,c),T=c);let l=e&&i?n?`true`:`false`:null;E!==l&&(l===null?t.button.removeAttribute(`aria-expanded`):t.button.setAttribute(`aria-expanded`,l),E=l)},setCooldown(e){ae!==e&&(t.cooldown.style.height=e,ae=e)}}}var qe=Math.PI*2;function Je(e){let t=Number(e);if(!Number.isFinite(t))return 0;let n=((t+Math.PI)%qe+qe)%qe-Math.PI;return Math.abs(n)<1e-10?0:n}function Ye(e,t,n,r,i){let a=i||[0,0],o=n*.5;return a[0]=(o-e)/n*r,a[1]=(o-t)/n*r,a}function Xe(e,t){return Je(Math.atan2(-t,-e))}function Ze(e){return Je(-Number(e))}var Qe=4096*4,$e=8;function et(e,t){return Number.isInteger(e)&&Number.isInteger(t)&&e>0&&t>0&&e<=8192&&t<=8192&&e*t<=16777216}function*tt(e){let t=0,n=0;for(let r=0;r<e.length;r+=Qe){let i=Math.min(e.length,r+Qe);for(let a=r;a<i;a+=4)e[a+3]<16||(t+=e[a]*.2126+e[a+1]*.7152+e[a+2]*.0722,n+=1);yield}let r=n?t/n:128;for(let t=0;t<e.length;t+=Qe){let n=Math.min(e.length,t+Qe);for(let i=t;i<n;i+=4){if(e[i+3]===0)continue;let t=e[i]*.2126+e[i+1]*.7152+e[i+2]*.0722,n=Math.max(24,Math.min(250,178+(t-r)*2.1));e[i]=e[i+1]=e[i+2]=n}yield}}function nt(e,t,n,r){for(let i=1;i<n-1;i+=1){let a=(r*n+i)*4;if(!(t[a+3]<8))for(let r=0;r<3;r+=1){let i=t[a+r],o=e=>t[a+e+3]>=8?t[a+e+r]:i;e[a+r]=i*3.2-.55*(o(-4)+o(4)+o(-n*4)+o(n*4))}}}function rt(e,t,n,r,i){for(let a=-2;a<=2;a+=1)for(let o=-2;o<=2;o+=1){let s=r+o,c=i+a;if(s<0||c<0||s>=t||c>=n||e[(c*t+s)*4+3]<8)return!0}return!1}function*it(e,t,n){let r=new Uint8ClampedArray(e);for(let i=1;i<n-1;i+=1)nt(e,r,t,i),i%$e===0&&(yield);yield;for(let i=0;i<n;i+=1){for(let a=0;a<t;a+=1){let o=(i*t+a)*4;r[o+3]<8||!rt(r,t,n,a,i)||(e[o]=e[o+1]=e[o+2]=36,e[o+3]=Math.max(e[o+3],216))}i%$e===0&&(yield)}}function at(e){let t=e.getContext(`2d`,{willReadFrequently:!0});if(!t)throw Error(`Schematic Canvas2D unavailable`);return t}function*A(e,t,n){let r=e.createImageData(t,n);for(let i=0;i<n;i+=$e){let a=Math.min($e,n-i);r.data.set(e.getImageData(0,i,t,a).data,i*t*4),yield}return r}function*ot(e,t){for(let n=0;n<t.height;n+=$e)e.putImageData(t,0,0,0,n,t.width,Math.min($e,t.height-n)),yield}function*st(e,t,n,r,i){if(!et(t,n)||!et(r.width,r.height))throw Error(`Invalid schematic dimensions`);let a=[],o=null,s=(e,t)=>{let n=i(e,t);return a.push(n),n};try{yield;let i=s(t,n),a=at(i);a.drawImage(e,0,0),yield;let c=yield*A(a,t,n);yield*tt(c.data),yield*ot(a,c);let l=s(r.width,r.height),u=at(l),d=Math.min(r.width/t,r.height/n),f=t*d,p=n*d;u.imageSmoothingQuality=`high`,u.drawImage(i,(r.width-f)/2,(r.height-p)/2,f,p),yield;let m=yield*A(u,r.width,r.height);return yield*it(m.data,r.width,r.height),yield*ot(u,m),o=l,l}finally{for(let e of a)e!==o&&(e.width=0,e.height=0)}}function ct(e,t){return!!e&&typeof e==`object`&&`url`in e&&e.url===t.url&&`width`in e&&e.width===t.width&&`height`in e&&e.height===t.height}function lt(e,t){return!e||typeof e!=`object`||!(`id`in e)||e.id!==t.id||!(`request`in e)||!ct(e.request,t.request)||!(`blob`in e)?null:e.blob instanceof Blob&&e.blob.type===`image/png`&&e.blob.size>0?e.blob:null}function ut(e,t){return new Promise((n,r)=>{let i=()=>{t.removeEventListener(`abort`,i),n(null)};t.addEventListener(`abort`,i,{once:!0}),e.then(e=>{t.removeEventListener(`abort`,i),n(t.aborted?null:e)},e=>{t.removeEventListener(`abort`,i),r(e)}),t.aborted&&i()})}function dt(e,t={}){let n=new Map,r=[],i=null,a=null,o=null,s=null,c=null,l=!1,u=!1,d=1,f=t.timeoutMs??15e3;function p(){c?.(),c=null;let e=o;if(o=null,e){e.onmessage=e.onerror=e.onmessageerror=null;try{e.terminate()}catch{}}}function m(){l=!0,p();let e=s;s=null,e?.(null)}function h(e,t){if(o!==e||!i||!s||t&&typeof t==`object`&&`id`in t&&typeof t.id==`number`&&t.id<i.id)return;let n=lt(t,i);if(!n){m();return}let r=s;s=null,r(n)}function g(t){return l?Promise.resolve(null):new Promise(n=>{s=n;try{if(!o){let t=e.worker();if(!t){m();return}o=t,t.onmessage=e=>h(t,e.data),t.onerror=t.onmessageerror=()=>{o===t&&m()}}o.postMessage({id:t.id,request:t.request})}catch{m()}})}async function _(t,n){let r=e.schedule(()=>{i===t&&s&&m()},f),a;try{a=await g(t)}finally{r()}if(n.signal.aborted)return null;let o=e.schedule(()=>n.abort(),f);try{return a||=await ut(e.fallback(t.request,n.signal),n.signal),!a||n.signal.aborted?null:await ut(e.dataUrl(a,n.signal),n.signal)}finally{o()}}function v(){if(u||i)return;let s=r.shift();if(!s){let n=o;try{c=e.schedule(()=>{!i&&!r.length&&o===n&&(p(),l=!1)},t.idleMs??5e3)}catch{p()}return}i=s;let d=new AbortController;a=d,_(s,d).catch(()=>null).then(e=>{i===s&&(i=null,a=null,e||n.delete(s.key),s.resolve(e),v())})}function y(e,a){if(u)return Promise.resolve(null);let o=n.get(e);if(o)return o;if(!et(a.width,a.height)||r.length+Number(!!i)>=(t.maxPending??64))return Promise.resolve(null);c?.(),c=null;let s,l=new Promise(e=>{s=e});return n.set(e,l),r.push({id:d++,key:e,request:{...a},resolve:s}),v(),l}function b(){if(!u){u=!0,a?.abort(),a=null,m(),i?.resolve(null),i=null;for(let e of r.splice(0))e.resolve(null);n.clear()}}return{get:y,dispose:b}}function ft(e){if(e.aborted)throw Error(`Schematic preparation cancelled`)}function pt(e,t){return new Promise((n,r)=>{let i=new Image,a=()=>{i.onload=i.onerror=null,t.removeEventListener(`abort`,o)},o=()=>{a(),i.src=``,r(Error(`Schematic image cancelled`))};i.onload=()=>{a(),n(i)},i.onerror=()=>{a(),r(Error(`Schematic image unavailable`))},t.addEventListener(`abort`,o,{once:!0}),t.aborted?o():i.src=e})}async function mt(e,t){let n=await pt(e.url,t),r=l(2,16),i=st(n,n.naturalWidth,n.naturalHeight,e,(e,t)=>{let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}),a=null;try{let e=0;for(;;){ft(t);let n=i.next();if(n.done){a=n.value;break}e+=1,await ut(r(e===1||e%16==0),t)}if(ft(t),!a)return null;let n=a;return await new Promise(e=>{let r=()=>{t.removeEventListener(`abort`,r),e(null)};t.addEventListener(`abort`,r,{once:!0});try{n.toBlob(n=>{t.removeEventListener(`abort`,r),e(t.aborted?null:n)},`image/png`)}catch{r()}})}finally{i.return(null),n.src=``,a&&(a.width=0,a.height=0)}}function ht(e,t){return new Promise(n=>{let r=new FileReader,i=()=>{r.onload=r.onerror=r.onabort=null,t.removeEventListener(`abort`,o)},a=e=>{i(),n(e)},o=()=>{i(),r.abort(),n(null)};r.onload=()=>a(typeof r.result==`string`&&!t.aborted?r.result:null),r.onerror=r.onabort=()=>a(null),t.addEventListener(`abort`,o,{once:!0});try{t.aborted?o():r.readAsDataURL(e)}catch{a(null)}})}function gt(){if(typeof Worker!=`function`||typeof OffscreenCanvas!=`function`||typeof createImageBitmap!=`function`)return null;let e=new Worker(new URL(``+new URL(`shotSchematicWorker-BUlVgtvg.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),t={onmessage:null,onerror:null,onmessageerror:null,postMessage:t=>e.postMessage(t),terminate:()=>{e.onmessage=e.onerror=e.onmessageerror=null,e.terminate()}};return e.onmessage=e=>t.onmessage?.({data:e.data}),e.onerror=()=>t.onerror?.(),e.onmessageerror=()=>t.onmessageerror?.(),t}var _t=null;function vt(e,t){try{return _t||=dt({worker:gt,fallback:mt,dataUrl:ht,schedule:(e,t)=>{let n=setTimeout(e,t);return()=>clearTimeout(n)}}),_t.get(e,{...t,url:new URL(t.url,document.baseURI).href})}catch{return Promise.resolve(null)}}function yt(){_t?.dispose(),_t=null}typeof window<`u`&&window.addEventListener(`pagehide`,yt);var bt=1.07;function xt(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function St(){return{minX:1/0,maxX:-1/0,minZ:1/0,maxZ:-1/0}}function Ct(e,t,n){!Number.isFinite(t)||!Number.isFinite(n)||(e.minX=Math.min(e.minX,t),e.maxX=Math.max(e.maxX,t),e.minZ=Math.min(e.minZ,n),e.maxZ=Math.max(e.maxZ,n))}function wt(e,t,n=[0,0,0]){for(let r of t||[])for(let t of r.verts||[])Ct(e,t[0]+n[0],t[2]+n[2])}function Tt(e,t){for(let n of t||[])for(let t of n.poly||[])Ct(e,n.x0,t[0]),Ct(e,n.x1,t[0])}function Et(e,t,n){let r=t.xM-n/2,i=t.xM+n/2;if(!Number.isFinite(e.minX)){e.minX=r,e.maxX=i;return}e.minX=Math.min(e.minX,r),e.maxX=Math.max(e.maxX,i)}function Dt(e,t,n){Number.isFinite(e.minZ)||(e.minZ=t.zM-n/2,e.maxZ=t.zM+n/2)}function Ot(e,t,n,r,i){let a=xt(n.gunBarrel?.lengthM,0);if(a>0){let t=n.gunPivot||[0,0,0];e.maxZ=Math.max(e.maxZ,r[2]+t[2]+a);return}e.maxZ=Math.max(e.maxZ,e.minZ+xt(t.overallLengthM,i))}function kt(e,t={}){let n=Array.isArray(e?.impactLocalPos)?e.impactLocalPos:null,r=n||e?.localPos||null;if(!r)return null;let i=[r[0],r[1],r[2]],a=Array.isArray(e?.impactLocalDir)?e.impactLocalDir:e?.localDir,o=a?[a[0],a[1],a[2]]:null,s=n?e?.impactFrame:`hull`;if(s===`turret`||s===`gun`||s===`barrel`){let e=t.turretPivot||[0,0,0];i[0]+=e[0],i[1]+=e[1],i[2]+=e[2]}if(s===`barrel`){let e=t.gunPivot||[0,0,0];i[0]+=e[0],i[1]+=e[1],i[2]+=e[2]}return{point:i,direction:o}}function At(e,t){let n=e.dims||{},r=e.armor||{},i=St();wt(i,r.hullPlates);let a=r.turretPivot||[0,0,0];wt(i,r.turretPlates,a),Tt(i,r.trackShapes),Et(i,t,xt(n.widthM,1));let o=xt(n.hullLengthM,1);return Dt(i,t,o),Ot(i,n,r,a,o),i}function jt(e,t={}){let n=e.dims,r=t.topSize||96,i=t.sideWidth||184,a=t.sideHeight||92,o=t.margin||bt,s=t.presentationAnchor||{xM:0,zM:0},c={xM:xt(s.xM,0),zM:xt(s.zM,0)},l=At(e,c),u=Math.max(c.xM-l.minX,l.maxX-c.xM),d=Math.max(c.zM-l.minZ,l.maxZ-c.zM),f=t.presentationProjection||{},p=xt(f.topHalfM,Math.max(u,d)*o),m=r/2/p,h=xt(f.centerYM,xt(n.heightM,1)/2),g=xt(f.sideHalfM,Math.max(xt(n.heightM,1)/2,d/2)*o),_=a/2/g;return{topScale:m,sideScale:_,topPoint(e,t){return[r/2-(e-c.xM)*m,r/2-(t-c.zM)*m]},sidePoint(e,t){return[i/2+(t-c.zM)*_,a/2-(e-h)*_]}}}var j={amber:`#f0a030`,amberHi:`#ffd27a`,gold:`#ffd166`,green:`#7fdc8a`,red:`#f27a6e`,steel:`#cfd9e2`,text:`#e6edf3`,dim:`#8a97a3`},Mt=`
.cot-es{position:fixed;inset:0;z-index:71;display:none;pointer-events:none;
  flex-direction:column;align-items:center;justify-content:center;
  padding:2.2vh 0 2.6vh;overflow:hidden;font-family:${w};color:${j.text};
  background:
    radial-gradient(110% 80% at 50% -10%,rgba(240,160,48,.13),rgba(240,160,48,0) 48%),
    linear-gradient(180deg,rgba(5,8,12,.985),rgba(4,7,10,.955) 44%,rgba(3,5,8,.99));}
.cot-es.show{display:flex;}
.cot-es *{box-sizing:border-box;margin:0;padding:0;}
.cot-es::before{content:"";position:fixed;left:0;right:0;top:0;height:4px;
  background:linear-gradient(90deg,transparent 8%,${j.amber} 50%,transparent 92%);
  box-shadow:0 0 22px rgba(240,160,48,.5);}
.cot-es.result-victory::before{background:linear-gradient(90deg,transparent 8%,${j.green} 50%,transparent 92%);}
.cot-es.result-defeat::before{background:linear-gradient(90deg,transparent 8%,${j.red} 50%,transparent 92%);}
.cot-es .es-hero{position:relative;width:1160px;max-width:96vw;flex:0 0 auto;overflow:hidden;}
/* staggered entrance: hero first, tallies cascade, buttons last (--i steps) */
@keyframes cotEsIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@keyframes cotEsHero{from{opacity:0;transform:translateY(-10px) scale(.96);letter-spacing:.5em;}
  to{opacity:1;transform:none;}}
.cot-es .es-in{opacity:0;animation:cotEsIn var(--cot-motion-slow) var(--cot-ease-out) forwards;
  animation-delay:calc(var(--i,0)*45ms);}
/* --- hero ----------------------------------------------------------------- */
.cot-es .es-kick{font-family:${T};font-weight:800;font-size:11.5px;
  letter-spacing:.34em;text-indent:.34em;color:${j.amber};text-transform:uppercase;
  text-align:center;}
.cot-es .es-ban{margin-top:6px;font-weight:800;font-size:clamp(44px,5.8vw,68px);
  line-height:1;letter-spacing:.18em;text-indent:.18em;text-align:center;
  text-transform:uppercase;opacity:0;
  animation:cotEsHero var(--cot-motion-scene) var(--cot-ease-soft) forwards;
  text-shadow:0 3px 30px rgba(0,0,0,.85);}
.cot-es .es-ban.v{color:#eafce9;text-shadow:0 0 34px rgba(127,220,138,.35),0 3px 30px rgba(0,0,0,.85);}
.cot-es .es-ban.d{color:#fceeec;text-shadow:0 0 34px rgba(242,110,100,.32),0 3px 30px rgba(0,0,0,.85);}
.cot-es .es-ban.n{color:${j.steel};}
.cot-es .es-rule{width:132px;height:2px;margin:12px auto 0;
  background:linear-gradient(90deg,rgba(240,160,48,0),#f0a030 30%,#ffcf7d 50%,#f0a030 70%,rgba(240,160,48,0));
  box-shadow:0 0 12px rgba(240,160,48,.55);}
.cot-es .es-ban.v+.es-rule{background:linear-gradient(90deg,rgba(127,220,138,0),#5fcf74 30%,#a8f0b2 50%,#5fcf74 70%,rgba(127,220,138,0));box-shadow:0 0 12px rgba(127,220,138,.5);}
.cot-es .es-ban.d+.es-rule{background:linear-gradient(90deg,rgba(242,110,100,0),#e06055 30%,#ffb0a6 50%,#e06055 70%,rgba(242,110,100,0));box-shadow:0 0 12px rgba(242,110,100,.5);}
.cot-es .es-sub{margin-top:11px;text-align:center;font-size:14.5px;font-weight:650;
  color:${j.steel};letter-spacing:.04em;}
.cot-es .es-sub b{color:#ffe4b0;font-weight:800;}
.cot-es .es-meta{margin-top:4px;text-align:center;font-family:${T};
  font-weight:700;font-size:12px;letter-spacing:.14em;color:#aab7c2;
  text-transform:uppercase;font-variant-numeric:tabular-nums;display:flex;align-items:center;justify-content:center;gap:18px;}
.cot-es .es-meta span{display:flex;align-items:center;gap:7px}.cot-es .es-meta svg{color:#8797a3}
.cot-es .es-meta b{color:#c8d4de;font-weight:800;}
.cot-es .es-campaign{margin:12px auto 0;width:min(560px,92vw);padding:10px 14px 11px;text-align:center;
  border:1px solid rgba(230,154,54,.5);border-left:3px solid #e69a36;border-radius:4px;background:rgba(9,13,18,.72);}
.cot-es .es-campaign .ck{font-family:${T};font-size:9px;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#e2b56a;}
.cot-es .es-campaign .ct{margin-top:3px;font-family:${T};font-size:19px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#fff0d8;}
.cot-es .es-campaign .cs{margin-top:5px;font-size:12.5px;color:#c8d3db;}
.cot-es .es-campaign .cs b{color:#ffe4b0;font-weight:800;}
.cot-es .es-campaign .stars{display:inline-flex;gap:3px;margin:6px 0 0;font-size:20px;line-height:1;letter-spacing:.04em;}
.cot-es .es-campaign .stars i{font-style:normal;color:#4a5560;}
.cot-es .es-campaign .stars i.on{color:#ffcc55;text-shadow:0 0 10px rgba(255,190,70,.55);}
.cot-es .es-campaign .cn{margin-top:6px;font-family:${T};font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8ea2b0;}
/* --- two-column debrief --------------------------------------------------- */
.cot-es .es-report{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);
  align-items:stretch;gap:12px;width:1160px;max-width:96vw;height:clamp(300px,45vh,390px);
  flex:0 0 clamp(300px,45vh,390px);margin-top:12px;min-height:0;}
.cot-es .es-debrief{display:flex;flex-direction:column;min-width:0;min-height:0;height:100%;
  overflow:hidden;background:linear-gradient(155deg,rgba(13,18,23,.96),rgba(6,9,12,.97));
  border:1px solid rgba(166,184,199,.3);box-shadow:0 12px 36px rgba(0,0,0,.42);pointer-events:auto;}
.cot-es .es-dh{display:flex;align-items:center;justify-content:space-between;gap:12px;
  min-height:41px;padding:9px 14px;border-bottom:1px solid rgba(166,184,199,.2);}
.cot-es .es-dh .titleline{display:flex;align-items:center;gap:9px}.cot-es .es-dh .titleline svg{flex:0 0 auto;opacity:.92}
.cot-es .es-dh .ey{font:800 12px ${T};letter-spacing:.18em;text-transform:uppercase;color:${j.amberHi};}
.cot-es .es-dh .context{font:700 10px ${T};letter-spacing:.08em;color:#8f9da9;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-es .es-debrief.teams .es-dh .ey{color:#a8eab1;}
.cot-es .es-stat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;
  background:rgba(166,184,199,.15);border-bottom:1px solid rgba(166,184,199,.18);}
.cot-es .es-stat-grid.has-vehicle{grid-template-columns:minmax(112px,.72fr) repeat(2,minmax(0,1fr));}
.cot-es .es-vehicle-card{position:relative;display:grid;place-items:center;min-width:0;min-height:80px;
  overflow:hidden;background:radial-gradient(100% 85% at 50% 35%,rgba(240,160,48,.13),rgba(8,12,16,.98) 72%);}
.cot-es .es-vehicle-card img{display:block;width:100%;height:76px;padding:4px 7px 7px;object-fit:contain;
  object-position:center;opacity:.84;filter:grayscale(.12) contrast(1.12) drop-shadow(0 9px 11px rgba(0,0,0,.72));}
.cot-es .es-tal{display:flex;flex-direction:column;justify-content:center;gap:3px;min-width:0;
  min-height:80px;text-align:left;padding:12px 16px;background:rgba(8,12,16,.98);}
.cot-es .es-tal .v{font-family:${T};font-weight:800;font-size:23px;
  letter-spacing:-.01em;font-variant-numeric:tabular-nums;color:#f2f7fb;line-height:1.05;text-align:left;}
.cot-es .es-tal .v i{font-style:normal;font-size:14px;color:${j.dim};font-weight:700;}
.cot-es .es-tal .k{order:-1;display:flex;align-items:center;gap:7px;font-size:11px;font-weight:800;letter-spacing:.1em;
  color:#aab7c2;text-transform:uppercase;font-family:${T};}
.cot-es .es-tal .k svg{flex:0 0 auto;color:${j.amberHi}}
.cot-es .es-tal.hot{background:linear-gradient(135deg,rgba(255,209,102,.13),rgba(255,209,102,.025));}
.cot-es .es-tal .v,.cot-es .es-tal.hot .v{font-size:34px}.cot-es .es-tal.hot .v{color:${j.gold};}
.cot-es .es-stat-secondary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  border-bottom:1px solid rgba(166,184,199,.18);}
.cot-es .es-mini{min-width:0;padding:10px 14px;border-right:1px solid rgba(166,184,199,.13);}
.cot-es .es-mini:last-child{border-right:0}.cot-es .es-mini .mk{display:flex;align-items:center;gap:6px;font:800 10px ${T};letter-spacing:.08em;
  text-transform:uppercase;color:#91a0ac}.cot-es .es-mini .mk svg{flex:0 0 auto}.cot-es .es-mini .mv{margin-top:5px;font:800 21px ${T};
  color:#edf4f8;font-variant-numeric:tabular-nums}.cot-es .es-mini .md{margin-top:2px;font-size:10px;color:#7f8e9a;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cot-es .es-best{display:grid;grid-template-columns:auto auto minmax(0,1fr);align-items:center;gap:9px;
  min-height:48px;padding:8px 14px;background:linear-gradient(90deg,rgba(240,160,48,.12),rgba(240,160,48,.015) 78%);
  border-bottom:1px solid rgba(240,160,48,.3);}
.cot-es .es-best .bk{font-family:${T};font-weight:800;font-size:10.5px;
  letter-spacing:.14em;color:${j.amberHi};text-transform:uppercase;flex:0 0 auto;display:flex;align-items:center;gap:7px;}
.cot-es .es-best .bd{font-family:${T};font-weight:800;font-size:20px;
  color:${j.gold};font-variant-numeric:tabular-nums;flex:0 0 auto;letter-spacing:-.01em;}
.cot-es .es-best .bt{font-size:12px;color:${j.steel};letter-spacing:.02em;flex:1;
  min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-variant-numeric:tabular-nums;}
.cot-es .es-best .bt b{color:#eef4f9;font-weight:700;}
.cot-es .es-best .bt small{display:block;margin-top:2px;font-size:11px;color:#83929e;}
.cot-es .es-kill-block{display:flex;flex:1;min-height:0;flex-direction:column;padding:0 12px 10px;}
.cot-es .es-kill-list{min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(240,160,48,.45) transparent;}
/* the legacy integration overlay may flash its old button/earnings line in
   the frames between endOverlayRuntime.show() and the report flush — armed on
   battle:ended, this suppresses it outright (the end screen owns the frame;
   !important beats the integration overlay's inline display:flex) */
body.cot-es-armed .cot-end{display:none !important;}
.cot-es .es-ph{font-size:11px;font-weight:800;letter-spacing:.1em;color:#aebbc6;
  text-transform:uppercase;font-family:${T};padding:9px 2px 7px;
  border-bottom:1px solid rgba(166,184,199,.25);margin-bottom:4px;
  display:flex;justify-content:space-between;font-variant-numeric:tabular-nums;}
.cot-es .es-ph .ph-title{display:flex;align-items:center;gap:7px}.cot-es .es-ph svg{flex:0 0 auto}
.cot-es .es-ph.ally{color:${j.green};border-bottom-color:rgba(127,220,138,.35);}
.cot-es .es-ph.foe{color:${j.red};border-bottom-color:rgba(242,122,114,.35);}
.cot-es .es-scoreboard{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;min-height:86px;
  padding:10px 22px;border-bottom:1px solid rgba(166,184,199,.18);background:rgba(7,11,15,.72);}
.cot-es .es-score-side{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;}
.cot-es .es-score-side.foe{text-align:right;grid-template-columns:auto 1fr}.cot-es .es-score-copy{min-width:0}
.cot-es .es-score-side .sl{font:800 12px ${T};letter-spacing:.12em;text-transform:uppercase;}
.cot-es .es-score-side .sl{display:flex;align-items:center;gap:7px}.cot-es .es-score-side.foe .sl{justify-content:flex-end}
.cot-es .es-score-side.ally .sl{color:${j.green}}.cot-es .es-score-side.foe .sl{color:${j.red}}
.cot-es .es-score-side .ss{margin-top:5px;font-size:11px;color:#8f9daa;}
.cot-es .es-score-side .sn{font:800 38px ${T};color:#edf4f8;font-variant-numeric:tabular-nums;line-height:1;}
.cot-es .es-score-dash{padding:0 18px;font:500 24px ${T};color:#53616c;}
.cot-es .es-rosters{display:grid;grid-template-columns:1fr 1fr;gap:12px;flex:1;min-height:0;padding:12px;}
.cot-es .es-roster{display:flex;min-width:0;min-height:0;flex-direction:column;}
.cot-es .es-roster-cols{display:grid;grid-template-columns:minmax(0,1fr) 58px;gap:8px;padding:0 28px 6px 54px;
  font:800 8px ${T};letter-spacing:.12em;text-transform:uppercase;color:#6f7e8a;}
.cot-es .es-roster-cols span:last-child{text-align:right;}
.cot-es .es-roster-list{flex:1;min-height:0;padding-top:7px;overflow-y:auto;border-top:1px solid rgba(166,184,199,.28);
  scrollbar-width:thin;scrollbar-color:rgba(166,184,199,.38) transparent;}
.cot-es .es-roster-list:focus-visible{outline:2px solid ${j.amberHi};outline-offset:-2px;}
.cot-es .es-roster.ally .es-roster-list{border-top-color:rgba(127,220,138,.38)}
.cot-es .es-roster.foe .es-roster-list{border-top-color:rgba(242,122,114,.38)}
/* team rows: one readable identity line, one natural-language result line */
.cot-es .es-tr{display:flex;align-items:center;gap:8px;height:43px;padding:0 8px;
  background:rgba(255,255,255,.024);border-left:2px solid rgba(146,164,180,.25);
  margin-bottom:4px;font-variant-numeric:tabular-nums;}
.cot-es .es-tr.ally{border-left-color:rgba(127,220,138,.45);}
.cot-es .es-tr.foe{border-left-color:rgba(242,122,114,.45);}
.cot-es .es-tr.me{background:linear-gradient(90deg,rgba(240,160,48,.18),rgba(240,160,48,.03));
  border-left-color:${j.amber};}
.cot-es .es-tr .tier{display:none}.cot-es .es-tr .si{flex:0 0 44px;height:19px;}
.cot-es .es-tr .identity{flex:1;min-width:0}.cot-es .es-tr .nm{display:block;min-width:0;font-size:12px;font-weight:700;color:#e5edf4;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-es .es-tr .nm .you{color:${j.gold};font-family:${T};font-weight:800;
  font-size:10px;letter-spacing:.06em;margin-right:5px;vertical-align:1px;}
.cot-es .es-tr .veh{display:block;margin-top:2px;font-size:10.5px;color:#7f8e9a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-es .es-tr .veh b{color:${j.gold};font-weight:800}
.cot-es .es-tr .output{display:flex;flex:0 0 58px;min-width:0;flex-direction:column;gap:3px;align-items:stretch;}
.cot-es .es-tr .ov{text-align:right;font:800 11.5px ${T};line-height:1;color:#dfe8ef;
  letter-spacing:-.01em;font-variant-numeric:tabular-nums;}
.cot-es .es-tr .obar{display:block;height:2px;background:rgba(146,164,180,.16);overflow:hidden;}
.cot-es .es-tr .obar i{display:block;height:100%;background:${j.green};}
.cot-es .es-tr.foe .obar i{background:${j.red};}.cot-es .es-tr.me .obar i{background:${j.gold};}
.cot-es .es-tr.me .ov{color:${j.gold};}
.cot-es .es-tr .st{display:grid;place-items:center;flex:0 0 18px;
  color:${j.green};filter:drop-shadow(0 0 5px rgba(127,220,138,.3));}
/* Dead rows remain legible; status color carries the state instead of a
   line-through that made player/tank names needlessly difficult to scan. */
.cot-es .es-tr.dead{opacity:.78;background:rgba(120,30,24,.1);}
.cot-es .es-tr.dead .nm{color:#aab7c2;}
.cot-es .es-tr.dead .st{color:${j.red};filter:none;opacity:1;}
.cot-es .es-tr.dead .si{opacity:.75;}
/* your kill rows */
.cot-es .es-kr{display:flex;align-items:center;gap:10px;height:39px;padding:0 7px;
  border-bottom:1px solid rgba(146,164,180,.1);font-variant-numeric:tabular-nums;}
.cot-es .es-kr .si{flex:0 0 50px;height:20px;}.cot-es .es-kr .nm{flex:1;min-width:0;font-size:13px;font-weight:700;color:#eef4f9;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-es .es-kr .dm{flex:0 0 52px;text-align:right;font-family:${T};font-weight:800;
  font-size:13px;color:${j.gold};letter-spacing:-.01em;}
.cot-es .es-none{padding:9px 5px;font-size:10.5px;color:${j.dim};letter-spacing:.04em;}
/* persistent private/LAN room: results are one round inside a social session */
.cot-es .es-rematch{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:0;width:1160px;
  max-width:96vw;margin-top:12px;padding:0;background:linear-gradient(100deg,rgba(15,22,28,.98),rgba(25,18,10,.98));
  border:1px solid rgba(240,160,48,.45);border-left:3px solid ${j.amber};pointer-events:auto;overflow:hidden;flex:0 0 auto}
.cot-es .es-room-info{min-width:0;padding:13px 16px}.cot-es .es-room-head{display:grid;grid-template-columns:36px minmax(0,1fr) auto;
  align-items:center;gap:11px}.cot-es .es-room-mode-icon{display:grid;place-items:center;width:36px;height:36px;color:${j.amberHi};
  background:rgba(240,160,48,.1);border:1px solid rgba(240,160,48,.32)}
.cot-es .es-room-title{min-width:0}.cot-es .es-room-title span{display:block;font:800 10px ${T};letter-spacing:.14em;
  text-transform:uppercase;color:${j.amberHi}}.cot-es .es-room-title b{display:block;margin-top:2px;font:800 19px ${T};
  letter-spacing:.12em;color:#fff0d4}.cot-es .es-room-round{display:flex;align-items:center;gap:7px;font:800 11px ${T};
  letter-spacing:.08em;text-transform:uppercase;color:#aebbc6}.cot-es .es-room-round svg{color:${j.amberHi}}
.cot-es .es-room-players{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.cot-es .es-room-player{display:grid;
  grid-template-columns:44px minmax(100px,1fr) auto;align-items:center;gap:9px;min-width:245px;height:50px;padding:5px 10px;
  background:rgba(4,8,12,.58);border-left:2px solid rgba(228,170,88,.65)}
.cot-es .es-room-player.ready{border-left-color:${j.green}}.cot-es .es-room-player .ri{width:44px;height:21px}
.cot-es .es-room-player .room-copy{min-width:0}.cot-es .es-room-player .rn{display:block;min-width:0;overflow:hidden;
  text-overflow:ellipsis;white-space:nowrap;font-size:11.5px;font-weight:750}.cot-es .es-room-player .rv{display:block;margin-top:2px;
  font-size:10px;color:#8796a2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cot-es .es-room-player .rs{display:flex;
  align-items:center;gap:5px;font:800 10px ${T};letter-spacing:.04em;color:#e4aa58}.cot-es .es-room-player .rs svg{flex:0 0 auto}
.cot-es .es-room-player.ready .rs{color:${j.green}}.cot-es .es-room-actions{display:flex;flex-direction:column;align-items:stretch;
  justify-content:center;gap:8px;padding:13px 14px;background:rgba(6,9,12,.65);border-left:1px solid rgba(240,160,48,.22)}
.cot-es .es-ready-meter{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;margin-bottom:2px;color:#9eacb8}
.cot-es .es-ready-meter .meter-label{font:800 10px ${T};letter-spacing:.1em;text-transform:uppercase}.cot-es .es-ready-meter b{
  font:800 13px ${T};color:#f5e7d3;font-variant-numeric:tabular-nums}.cot-es .es-ready-track{grid-column:1/-1;height:3px;
  background:rgba(151,171,186,.16);overflow:hidden}.cot-es .es-ready-fill{display:block;height:100%;background:${j.green};
  box-shadow:0 0 10px rgba(127,220,138,.45);transition:width .25s ease}.cot-es .es-room-actions .cot-es-btn{width:100%;min-width:0;
  min-height:44px;padding:9px 14px;font-size:11.5px}
.cot-es .cot-es-btn.ready-now{color:#b8f2c2;border-color:rgba(127,220,138,.6);background:rgba(31,88,45,.68)}
@keyframes cotEsReadyPulse{50%{box-shadow:0 0 0 5px rgba(240,160,48,.16),0 0 26px rgba(240,160,48,.42)}}
.cot-es .cot-es-btn.can-start,.cot-es .cot-es-btn.needs-ready:not(:disabled){animation:cotEsReadyPulse 1.35s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){
  .cot-es .es-in,.cot-es .es-ban,.cot-es .cot-es-btn.can-start,
  .cot-es .cot-es-btn.needs-ready:not(:disabled){animation:none!important;opacity:1;transform:none;}
}
/* --- actions -------------------------------------------------------------- */
.cot-es .es-actions{display:flex;gap:14px;margin-top:1.8vh;padding:4px 10px;
  flex:0 0 auto;pointer-events:auto;z-index:2;}
.cot-es .cot-es-btn{font-family:${T};font-weight:800;font-size:13.5px;
  letter-spacing:.22em;text-indent:.11em;text-transform:uppercase;cursor:pointer;
  min-width:230px;min-height:52px;padding:13px 40px;
  transition:transform .12s ease,box-shadow .12s ease,filter .12s ease;}
.cot-es .cot-es-btn .btn-inner{display:flex;align-items:center;justify-content:center;gap:10px}.cot-es .cot-es-btn svg{flex:0 0 auto}
.cot-es .cot-es-btn:hover{transform:translateY(-1px);filter:brightness(1.08);}
.cot-es .cot-es-btn:active{transform:translateY(0);}
.cot-es .cot-es-btn:disabled{cursor:not-allowed;opacity:.62;transform:none;filter:none}
.cot-es .cot-es-btn.prime{color:#1a0e02;border:1px solid #ffc169;
  background:linear-gradient(180deg,#ffb64f,#e07a10);
  box-shadow:0 6px 22px rgba(240,150,40,.35);}
.cot-es .cot-es-btn.ghost{color:#f4e9d8;border:1px solid rgba(240,193,105,.55);
  background:rgba(240,160,48,.08);}
.cot-es .cot-es-btn.ghost:hover{background:rgba(240,160,48,.16);}
`,Nt=e=>{let t=Math.max(0,Math.floor(e||0));return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`},M=t=>e(Math.round(t));function Pt(e=[]){return e.reduce((e,t)=>(e.total+=1,t.dead||(e.alive+=1),e.kills+=Math.max(0,Number(t.kills)||0),e.damage+=Math.max(0,Number(t.dmg)||0),e),{total:0,alive:0,kills:0,damage:0})}function Ft(e,t){let n=Math.max(0,Number(e)||0),r=Math.max(0,Number(t)||0);return r<=0?0:Math.round(Math.min(1,n/r)*1e3)/10}function It(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Lt(e){return It(e)&&typeof e.id==`string`}function N(e){return!It(e)||typeof e.playerId!=`string`||!It(e.state)||!Array.isArray(e.state.players)||!e.state.players.every(Lt)?null:{state:{...e.state,players:e.state.players},playerId:e.playerId,...typeof e.role==`string`?{role:e.role}:{}}}function Rt(e,t){let n=e.querySelector(t);if(!n)throw Error(`end screen requires ${t}`);return n}function zt(e){if(!e)return``;try{let t=O(e);return It(t)&&typeof t.name==`string`?t.name:e}catch{return e}}function Bt(e,t){ie(),re(`cot-es-style`,Mt),t.classList.add(`cot-es`),t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-modal`,`true`),t.setAttribute(`aria-label`,n(`endScreen.resultsAria`)),t.setAttribute(`aria-hidden`,`true`);let r=!1,i=null,a=null,o=null,s=[],c;e.on(`battle:ended`,()=>document.body.classList.add(`cot-es-armed`)),e.on(`phase:change`,e=>{It(e)&&e.phase===`battle`&&c.hide()}),e.on(`network:roomState`,e=>{a=N(e),o&&te(o)});function l(e,t,{durMs:n=1050,delayMs:r=0,fmt:i=M,prefix:a=``}={}){let o=()=>{e.textContent=a+i(t)};if(typeof document<`u`&&document.hidden){o();return}let c={raf:0,done:!1,fin:o};s.push(c);let l=performance.now()+r,u=r=>{if(c.done)return;let s=Math.min(1,Math.max(0,(r-l)/n));if(e.textContent=a+i(t*(1-(1-s)**3)),s>=1){c.done=!0,o();return}c.raf=requestAnimationFrame(u)};e.textContent=a+i(0),c.raf=requestAnimationFrame(u)}function u(){for(let e of s)e.done||(cancelAnimationFrame(e.raf),e.done=!0,e.fin());s.length=0}function d(e){let t=document.querySelector(`.cot-end`);if(t){let e=t.querySelector(`button`);e&&(e.removeAttribute(`style`),e.classList.add(`cot-es-btn`,`ghost`),e.innerHTML=`<span class="btn-inner">${k(`garage`,18)}<span>${n(`endScreen.returnToGarage`)}</span></span>`,i=e),t.style.display=`none`}return i&&e.appendChild(i),i}let f=0,p=()=>String(f++);function m(e,n,r,i={}){let a=C(`div`,`es-tal es-in${i.hot?` hot`:``}`,e);a.style.setProperty(`--i`,p());let o=C(`div`,`v`,a),s=C(`div`,`k`,a);return s.innerHTML=`${i.icon?k(i.icon,16):``}<span>${r}</span>`,i.text==null?l(o,i.value||0,{delayMs:260+f*60,fmt:i.fmt}):o.textContent=i.text,n&&(t.dataset[n]=String(i.datasetV==null?Math.round(i.value||0):i.datasetV)),a}function h(e,t,r){let i=t.mode===`lan`?n(`endScreen.lan`):n(`endScreen.private`),a=C(`div`,`es-room-head`,e),o=C(`span`,`es-room-mode-icon`,a);o.innerHTML=k(t.mode===`lan`?`battleLan`:`battlePrivate`,21);let s=C(`span`,`es-room-title`,a);s.innerHTML=`<span>${i}</span><b>${t.roomCode||``}</b>`;let c=C(`span`,`es-room-round`,a);c.innerHTML=`${k(`rematch`,16)}<span>${n(`endScreen.round`,{n:r})}</span>`}function g(e,t,r){let i=C(`div`,`es-room-player${t.ready?` ready`:``}`,e),a=C(`span`,`ri`,i);t.specId&&ue(a,t.specId,`side_silhouette`,t.ready?`rgba(127,220,138,.88)`:`rgba(190,204,215,.72)`);let o=C(`span`,`room-copy`,i),s=C(`span`,`rn`,o),c=zt(t.specId)||n(`endScreen.noVehicle`);s.textContent=`${t.name||n(`playMenu.commander.fallback`)}${t.id===r?n(`endScreen.you`):``}`,C(`span`,`rv`,o).textContent=c;let l=C(`span`,`rs`,i),u=t.team===`spectator`?`scope`:t.ready?`check`:`clock`,d=t.team===`spectator`?n(`endScreen.watching`):t.ready?n(`endScreen.ready`):n(`endScreen.notReady`);l.innerHTML=`${k(u,13)}<span>${d}</span>`}function _(e,t,n){let r=C(`div`,`es-room-players`,e);for(let e of t.players)g(r,e,n)}function v(e,t,r,i){let a=C(`div`,`es-ready-meter`,e),o=i?Math.round(r/i*100):0;a.innerHTML=`${k(`check`,15)}<span class="meter-label">${n(`endScreen.readyForRound`,{n:t})}</span><b>${r} / ${i}</b><span class="es-ready-track"><span class="es-ready-fill" style="width:${o}%"></span></span>`}function y(t,r,i){if(!i||i.team===`spectator`)return;let a=C(`button`,`cot-es-btn ${i.ready?`ready-now`:`prime needs-ready`}`,t);a.type=`button`,a.innerHTML=`<span class="btn-inner">${k(i.ready?`close`:`check`,17)}<span>${i.ready?n(`endScreen.notReady`):n(`endScreen.readyNext`)}</span></span>`,a.disabled=r.phase!==`waiting`||i.connected===!1||!i.specId,a.setAttribute(`aria-pressed`,String(!!i.ready)),a.setAttribute(`aria-label`,i.ready?n(`playMenu.ready.markNotReady`):n(`playMenu.ready.markReady`)),a.addEventListener(`click`,()=>{e.emit(`ui:click`,{}),e.emit(`ui:roomReady`,{ready:!i.ready})})}function b(t,r,i){let a=C(`button`,`cot-es-btn ghost${i?` can-start`:``}`,t);a.type=`button`,a.innerHTML=`<span class="btn-inner">${k(i?`rematch`:`clock`,17)}<span>${n(i?`endScreen.startNext`:`endScreen.waitingTeam`)}</span></span>`,a.disabled=r.phase!==`waiting`||!i,a.addEventListener(`click`,()=>{e.emit(`ui:click`,{}),e.emit(`ui:roomStart`,{})})}function ee(e,t,n,r,i,a){let o=C(`div`,`es-room-actions`,e),s=r>0&&i===r;v(o,a,i,r),y(o,t.state,n),t.role===`host`&&b(o,t.state,s)}function te(e){e.textContent=``;let t=a;if(!t?.state){e.remove(),o=null;return}let{state:n,playerId:r}=t,i=n.players.find(e=>e.id===r),s=n.players.filter(e=>e.team!==`spectator`),c=s.filter(e=>e.ready).length,l=(Number(n.round)||0)+1,u=C(`div`,`es-room-info`,e);h(u,n,l),_(u,n,r),ee(e,t,i,s.length,c,l)}function x(e,t,r,i){let a=C(`div`,`es-tr ${r?`foe`:`ally`}${t.isPlayer?` me`:``}${t.dead?` dead`:``}`,e);a.setAttribute(`role`,`listitem`);let o=[zt(t.specId)];t.kills>0&&o.push(n(t.kills===1?`endScreen.killsCountOne`:`endScreen.killsCountMany`,{count:t.kills})),a.innerHTML=`<span class="si"></span><span class="identity"><span class="nm">${t.isPlayer?`<b class="you">${n(`endScreen.you`)}</b>`:``}${t.name||t.id}</span><span class="veh">${o.filter(Boolean).join(` · `)}</span></span><span class="output"><span class="ov"></span><span class="obar" aria-hidden="true"><i></i></span></span><span class="st">${k(t.dead?`skull`:`check`,16)}</span>`;let s=Math.max(0,Number(t.dmg)||0),c=Rt(a,`.output`);c.setAttribute(`role`,`meter`),c.setAttribute(`aria-label`,n(`endScreen.damageAria`)),c.setAttribute(`aria-valuemin`,`0`),c.setAttribute(`aria-valuemax`,String(Math.max(1,Math.round(i)))),c.setAttribute(`aria-valuenow`,String(Math.round(s))),c.setAttribute(`aria-valuetext`,n(`endScreen.damageValueAria`,{value:M(s)})),c.title=n(`endScreen.damageValueAria`,{value:M(s)}),Rt(a,`.ov`).textContent=M(s),Rt(a,`.obar i`).style.width=`${Ft(s,i)}%`;let l=Rt(a,`.st`);l.setAttribute(`role`,`img`),l.setAttribute(`aria-label`,t.dead?n(`endScreen.destroyed`):n(`endScreen.survived`)),l.title=t.dead?n(`endScreen.destroyed`):n(`endScreen.survived`),ue(Rt(a,`.si`),t.specId||t.id,`side_silhouette`,t.dead?`rgba(242,143,143,.8)`:`rgba(206,220,232,0.8)`)}function S(e,t,r,i,a){let o=C(`div`,`es-roster ${i?`foe`:`ally`}`,e);o.setAttribute(`role`,`group`),o.setAttribute(`aria-label`,t);let s=C(`div`,`es-roster-cols`,o);s.innerHTML=`<span>${n(`endScreen.roster.colCombatant`)}</span><span>${n(`endScreen.damage`)}</span>`;let c=C(`div`,`es-roster-list`,o);if(c.setAttribute(`role`,`list`),c.setAttribute(`aria-label`,n(`endScreen.roster.damageResults`,{title:t})),c.tabIndex=0,!r.length){C(`div`,`es-none`,c).textContent=n(`endScreen.noCombatants`);return}for(let e of r)x(c,e,i,a)}function ne(e,t){return t.reason===`network_disconnect`?n(`endScreen.outcome.disconnect`):e===`victory`?t.playerDead?n(`endScreen.outcome.victory.survived`):n(`endScreen.outcome.victory.alive`):e===`defeat`?t.reason===`time_limit`?n(`endScreen.outcome.defeat.time`):n(`endScreen.outcome.defeat`):e===`draw`?t.reason===`time_limit`?n(`endScreen.outcome.draw.time`):n(`endScreen.outcome.draw.stalemate`):``}function w(e,r){let i=C(`div`,`es-hero`,t),a=C(`div`,`es-kick es-in`,i);a.style.setProperty(`--i`,p()),a.textContent=n(`endScreen.kicker`);let o=e===`victory`?`v`:e===`defeat`?`d`:`n`,s=n(e===`victory`?`endScreen.victory`:e===`defeat`?`endScreen.defeat`:e===`draw`?`endScreen.draw`:`endScreen.battleOver`),c=C(`div`,`es-ban ${o}`,i);c.textContent=s,t.dataset.banner=s,C(`div`,`es-rule`,i);let l=C(`div`,`es-sub es-in`,i);l.style.setProperty(`--i`,p()),l.innerHTML=`${r.playerVehicle?`<b>${r.playerVehicle}</b> — `:``}`+ne(e,r);let u=C(`div`,`es-meta es-in`,i);u.style.setProperty(`--i`,p());let d=[];r.map&&d.push(`<span>${k(`map`,14)}<b>${r.map}</b></span>`),r.timeS>0&&d.push(`<span>${k(`clock`,14)}<b>${Nt(r.timeS)}</b></span>`),u.innerHTML=d.join(``),r.map&&(t.dataset.map=r.map),r.timeS>0&&(t.dataset.durationS=String(Math.floor(r.timeS))),r.campaign&&T(i,r.campaign)}function T(e,t){let r=C(`div`,`es-campaign es-in`,e);r.style.setProperty(`--i`,p()),r.dataset.campaignOperation=t.operation.id,r.dataset.campaignStars=String(t.stars);let i=C(`div`,`ck`,r);i.textContent=n(`endScreen.campaign.kicker`,{index:String(t.operation.index),total:`6`});let a=C(`div`,`ct`,r);a.textContent=n(`campaign.op.${t.operation.id}.title`);let o=C(`div`,`cs`,r),s=t.durationS==null?``:n(`endScreen.campaign.time`,{time:Nt(t.durationS),par:Nt(t.parTimeS)});o.innerHTML=`${n(t.cleared?`endScreen.campaign.cleared`:`endScreen.campaign.lost`,{taken:`<b>${t.sectorsTaken}</b>`,total:String(t.sectorsTotal)})}${s?` · ${s}`:``}`;let c=C(`div`,`stars`,r);c.setAttribute(`role`,`img`),c.setAttribute(`aria-label`,n(`endScreen.campaign.starsAria`,{stars:String(t.stars)}));let l=[`endScreen.campaign.star.held`,`endScreen.campaign.star.par`,`endScreen.campaign.star.allies`],u=[t.cleared,t.underPar,t.noAllyLost];l.forEach((e,t)=>{let r=C(`i`,u[t]?`on`:``,c);r.textContent=`★`,r.title=n(e)});let d=C(`div`,`cn`,r);d.textContent=t.cleared?t.next?n(`endScreen.campaign.nextHint`,{title:n(`campaign.op.${t.next.id}.title`)}):n(`endScreen.campaign.complete`):n(`endScreen.campaign.retryHint`)}function E(e,n,r,i,a,o=``){let s=C(`div`,`es-mini`,e);s.innerHTML=`<div class="mk">${k(n,14)}<span>${i}</span></div><div class="mv">${a}</div>${o?`<div class="md">${o}</div>`:``}`,r&&(t.dataset[r]=a)}function ae(e,r){let i=r.hits>0?Math.round(r.pens/r.hits*100):0;E(e,`penetration`,null,n(`endScreen.penetrations`),`${r.pens} / ${r.hits}`,n(`endScreen.penetrationPercent`,{percent:i})),E(e,`shield`,`blocked`,n(`endScreen.damageBlocked`),M(r.blocked)),E(e,`damage`,`received`,n(`endScreen.damageReceived`),M(r.received)),t.dataset.hits=String(r.hits),t.dataset.pens=String(r.pens),t.dataset.received=String(Math.round(r.received)),t.dataset.fired=String(r.fired),t.dataset.assist=String(Math.round(r.assist))}function oe(e,r){if(!r||(r.damage||0)<=0)return;let i=C(`div`,`es-best`,e);i.style.setProperty(`--i`,p());let a=[r.zone,r.distM?`${Math.round(r.distM)} m`:``,r.destroyed?n(`endScreen.killConfirmed`):``].filter(Boolean).join(` · `);i.innerHTML=`<span class="bk">${k(`autoAim`,16)}<span>${n(`endScreen.bestShot`)}</span></span><span class="bd">${M(r.damage)}</span><span class="bt"><b>${r.targetName||n(`endScreen.enemyVehicle`)}</b><small>${a}</small></span>`,t.dataset.bestShot=String(Math.round(r.damage))}function se(e,t,r){let i=C(`div`,`es-kill-block`,e),a=C(`div`,`es-ph`,i);a.innerHTML=`<span class="ph-title">${k(`skull`,15)}<span>${n(`endScreen.killsHeading`)}</span></span><span>${r.length}</span>`;let o=C(`div`,`es-kill-list`,i);r.length||(C(`div`,`es-none`,o).textContent=n(t===`victory`?`endScreen.noKillsVictory`:`endScreen.noKillsBattle`));for(let e of r){let t=C(`div`,`es-kr`,o);t.innerHTML=`<span class="si"></span><span class="nm">${e.name||e.id}</span><span class="dm">${e.dmg>0?M(e.dmg):``}</span>`,ue(Rt(t,`.si`),e.specId||e.id,`side_silhouette`,`rgba(255,209,102,.85)`)}}function D(e,t,r){let i=C(`section`,`es-debrief personal`,e);i.setAttribute(`aria-label`,n(`endScreen.personal.aria`));let a=C(`div`,`es-dh`,i);a.innerHTML=`<span class="titleline">${k(`battleRecord`,18)}<span class="ey">${n(`endScreen.personal.title`)}</span></span>`;let o=C(`div`,`es-stat-grid`,i);if(r.playerSpecId){o.classList.add(`has-vehicle`);let e=C(`img`,``,C(`div`,`es-vehicle-card`,o));e.src=de(r.playerSpecId,`angle`),e.alt=r.playerVehicle?n(`endScreen.vehicle.alt`,{name:r.playerVehicle}):n(`endScreen.vehicle.altFallback`)}m(o,`dealt`,n(`endScreen.tile.dealt`),{value:Math.round(r.stats.dealt),hot:!0,icon:`damage`}),m(o,`kills`,n(`endScreen.tile.kills`),{value:r.kills.length,datasetV:r.kills.length,icon:`skull`}),ae(C(`div`,`es-stat-secondary`,i),r.stats),oe(i,r.bestShot),se(i,t,r.kills)}function O(e,r){let i=C(`section`,`es-debrief teams`,e);i.setAttribute(`aria-label`,n(`endScreen.team.aria`));let a=Pt(r.allies),o=Pt(r.enemies),s=C(`div`,`es-dh`,i);s.innerHTML=`<span class="titleline">${k(`team`,19)}<span class="ey">${n(`endScreen.team.outcome`)}</span></span>`;let c=C(`div`,`es-scoreboard`,i);c.innerHTML=`<div class="es-score-side ally"><div class="es-score-copy"><div class="sl">${k(`team`,16)}<span>${n(`endScreen.team.ally`)}</span></div><div class="ss">${n(`endScreen.team.survived`,{alive:a.alive,total:a.total,damage:M(a.damage)})}</div></div><div class="sn">${M(a.kills)}</div></div><div class="es-score-dash">—</div><div class="es-score-side foe"><div class="sn">${M(o.kills)}</div><div class="es-score-copy"><div class="sl"><span>${n(`endScreen.team.enemy`)}</span>${k(`team`,16)}</div><div class="ss">${n(`endScreen.team.survived`,{alive:o.alive,total:o.total,damage:M(o.damage)})}</div></div></div>`;let l=C(`div`,`es-rosters`,i),u=Math.max(0,...r.allies.map(e=>Number(e.dmg)||0),...r.enemies.map(e=>Number(e.dmg)||0));S(l,n(`endScreen.team.ally`),r.allies,!1,u),S(l,n(`endScreen.team.enemy`),r.enemies,!0,u),t.dataset.rosterAllies=String(r.allies.length),t.dataset.rosterEnemies=String(r.enemies.length),t.dataset.damageRows=String(r.allies.length+r.enemies.length),t.dataset.maxVehicleDamage=String(Math.round(u))}function ce(){if(!a?.state){o=null;return}o=C(`section`,`es-rematch es-in`,t),o.style.setProperty(`--i`,String(f+1)),te(o)}function le(r=null){let i=C(`div`,`es-actions es-in`,t);if(i.style.setProperty(`--i`,String(f+3)),!a?.state&&r?.campaign?.next){let t=r.campaign,a=t.next,o=C(`button`,`cot-es-btn prime`,i);o.type=`button`,o.dataset.campaignNext=a.id,o.innerHTML=`<span class="btn-inner">${k(`modeZones`,18)}<span>${n(t.cleared?`endScreen.campaign.next`:`endScreen.campaign.retry`,{title:n(`campaign.op.${a.id}.title`)})}</span></span>`,o.addEventListener(`click`,()=>{e.emit(`ui:click`,{}),e.emit(`ui:campaignNext`,{operationId:a.id,mapId:a.mapId})})}if(!a?.state){let t=C(`button`,`cot-es-btn prime`,i);t.type=`button`,t.innerHTML=`<span class="btn-inner">${k(`rematch`,18)}<span>${n(`endScreen.battleAgain`)}</span></span>`,t.addEventListener(`click`,()=>{e.emit(`ui:click`,{}),e.emit(`ui:battleAgain`,{})})}d(i)}return c={root:t,get visible(){return r},show(e,n){u(),f=0,r=!0,i&&i.parentNode&&i.parentNode.removeChild(i),t.textContent=``;let a=e||``;t.classList.remove(`result-victory`,`result-defeat`,`result-draw`),t.classList.add(`result-${a===`victory`||a===`defeat`||a===`draw`?a:`draw`}`),w(a,n);let o=C(`div`,`es-report es-in`,t);o.style.setProperty(`--i`,p()),D(o,a,n),O(o,n),ce(),le(n),t.classList.add(`show`),t.setAttribute(`aria-hidden`,`false`),document.body.classList.add(`cot-si-report`)},hide(){document.body.classList.remove(`cot-es-armed`),!(!r&&!t.classList.contains(`show`))&&(r=!1,o=null,u(),t.classList.remove(`show`),t.setAttribute(`aria-hidden`,`true`),document.body.classList.remove(`cot-si-report`))}},c}function Vt(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function Ht(e){if(!e||e.gameMode!==`frontline_assault`)return null;let t=se(typeof e.campaignOperationId==`string`?e.campaignOperationId:null)??D(typeof e.mapId==`string`?e.mapId:null);if(!t)return null;let n=e.line&&typeof e.line==`object`&&!Array.isArray(e.line)?e.line:null,r=Math.max(1,Math.round(Vt(n?.total??null)??3)),i=e.result===`victory`,a=i?r:Math.max(0,Math.min(r,Math.round(Vt(n?.index??null)??0))),o=Vt(e.durationS??null),s=Vt(e.alliesLost??null),c=ae(t);return{operation:t,cleared:i,sectorsTaken:a,sectorsTotal:r,stars:oe({result:e.result,durationS:e.durationS,timeLimitS:e.timeLimitS??t.timeLimitS,alliesLost:e.alliesLost}),underPar:i&&o!=null&&o<=c,noAllyLost:i&&s===0,parTimeS:c,durationS:o,alliesLost:s,next:i?E(t):t}}function Ut(e){return e}function Wt(e){return O(e)}function Gt(e,t){return e[t]||t}var P={green:`#7ee87e`,red:`#f05a5a`,yellow:`#f0b04a`,text:`#e6edf3`,dim:`#8a97a3`},Kt={AP:`#ffd27a`,APCR:`#e8f4ff`,HEAT:`#ff8a5c`,HE:`#ffb02e`,APFSDS:`#ffc46b`,HESH:`#ffb02e`},qt={ballistic:k(`scope`,10),shell:k(`shell`,10),target:k(`autoAim`,10),angle:k(`scope`,10),armor:k(`shield`,10),damage:k(`damage`,10),pen:k(`penetration`,10),trackL:k(`track`,12),engine:k(`engine`,12),fuelTank:k(`fuelTank`,12),ammoRack:k(`ammoRack`,12),gun:k(`gun`,12),radio:k(`radio`,12),optics:k(`optics`,12),turretRing:k(`turretRing`,12),gunMount:k(`gunMount`,12),transmission:k(`transmission`,12),autoloader:k(`autoloader`,12),feedSystem:k(`feedSystem`,12),missileRack:k(`missileRack`,12),crew:k(`crew`,12)};qt.trackR=qt.trackL,qt.star=k(`star`,12),qt.shield=k(`shield`,12),qt.skull=k(`skull`,12);var Jt=`
.cot-si{position:absolute;z-index:var(--hud-layer-status,18);inset:0;pointer-events:none;font-family:${w};color:${P.text};}
.cot-si *{box-sizing:border-box;margin:0;padding:0;}
.cot-si-cardhost{position:absolute;right:16px;top:var(--cot-si-card-top,var(--cot-si-roster-bottom,272px));width:320px;display:flex;
  flex-direction:column;gap:6px;align-items:stretch;contain:layout style;}
.cot-si-card{position:relative;min-height:0;overflow:hidden;contain:layout paint style;
  background:linear-gradient(145deg,rgba(16,23,29,.96),rgba(7,11,15,.96) 64%,rgba(11,16,21,.98));
  border:1px solid rgba(174,192,205,.3);border-right:3px solid rgba(146,164,180,.3);
  box-shadow:0 12px 34px rgba(0,0,0,.58),inset 0 1px rgba(255,255,255,.035);
  padding:0 0 4px;transition:opacity .8s ease;}
.cot-si-card.out{opacity:0;}
.cot-si-hd{min-height:38px;display:flex;align-items:center;justify-content:space-between;
  padding:4px 9px 3px;border-bottom:1px solid rgba(146,164,180,.2);}
.cot-si-state{display:flex;min-width:0;flex-direction:column;gap:3px;}
.cot-si-kicker{font-family:${T};font-size:7px;font-weight:800;line-height:1;
  letter-spacing:.2em;color:#778692;text-transform:uppercase;display:flex;align-items:center;gap:4px;}
.cot-si-kicker svg{width:9px;height:9px;flex:0 0 auto;}
.cot-si-badge{font-family:${T};font-weight:800;
  font-size:12px;line-height:1;letter-spacing:.13em;white-space:nowrap;
  display:flex;align-items:center;gap:5px;}
.cot-si-badge svg{width:11px;height:11px;flex:0 0 auto;}
.cot-si-dmg{min-width:62px;text-align:right;font-family:${T};letter-spacing:-.02em;font-weight:800;font-size:20px;
  font-variant-numeric:tabular-nums;color:#ffd166;display:flex;justify-content:flex-end;align-items:center;gap:4px;}
.cot-si-dmg svg{width:12px;height:12px;flex:0 0 auto;}
.cot-si-sub{height:21px;padding:3px 9px;font-size:9px;color:#c6d2dc;letter-spacing:.03em;
  display:grid;grid-template-columns:minmax(0,1fr) minmax(80px,1fr);align-items:center;gap:8px;
  background:rgba(149,168,184,.045);font-variant-numeric:tabular-nums;}
.cot-si-sub>span{min-width:0;display:flex;align-items:center;gap:4px;overflow:hidden;white-space:nowrap;}
.cot-si-sub>span:last-child{text-align:right;color:#e4ebf0;font-weight:700;}
.cot-si-sub>span:last-child{justify-content:flex-end;}
.cot-si-sub svg{width:9px;height:9px;flex:0 0 auto;color:#81909d;}
.cot-si-sub .cot-si-subtext{min-width:0;overflow:hidden;text-overflow:ellipsis;}
.cot-si-sub .ty{font-weight:800;font-size:9px;letter-spacing:.08em;
  font-family:${T};display:inline-flex;align-items:center;gap:3px;}
.cot-si-sub .ty svg{color:inherit;}
.cot-si-body{display:flex;flex-direction:column;gap:3px;padding:4px 9px 0;}
.cot-si-rows{padding:0;display:grid;grid-template-columns:1fr;gap:1px;}
.cot-si-kv{min-width:0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:7px;
  align-items:center;font-size:9px;line-height:1.15;color:${P.dim};font-variant-numeric:tabular-nums;letter-spacing:.045em;}
.cot-si-kv .cot-si-k{display:flex;align-items:center;gap:4px;}
.cot-si-kv .cot-si-k svg{width:9px;height:9px;flex:0 0 auto;color:#7f8f9c;}
.cot-si-kv b{min-width:0;text-align:right;color:#dbe6ef;font-weight:750;font-family:${T};
  letter-spacing:-.005em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
/* r8: the pen row spans the card on ONE line (the 'Pen roll' label broke
   across two lines and the value wrapped, r7 critic); the ERA/screens
   qualifier is an unbreakable suffix chip and a dim caption legends the
   'fresh → after screens / nominal' format once. */
.cot-si-kv.w{grid-column:1/-1;}
.cot-si-kv.pen{margin-top:2px;padding-top:3px;border-top:1px solid rgba(146,164,180,.24);}
.cot-si-kv.pen b{white-space:nowrap;}
.cot-si-kv b .q{display:inline-block;margin-left:5px;padding:0 3px 1px;
  border:1px solid currentColor;font-size:7.5px;letter-spacing:.12em;
  vertical-align:1px;line-height:1.25;font-weight:800;}
.cot-si-kv.armor{padding:2px 0;border-top:1px solid rgba(146,164,180,.12);border-bottom:1px solid rgba(146,164,180,.12);}
.cot-si-kv.result b{color:#f2c06d;letter-spacing:.06em;}
.cot-si-pencap{grid-column:1/-1;font-size:7.5px;color:#687683;letter-spacing:.07em;
  text-align:right;margin-top:-2px;text-transform:uppercase;}
.cot-si-diag{display:grid;grid-template-columns:90px 172px;gap:9px;align-items:center;
  justify-content:center;width:100%;margin:0;padding:4px 5px;border:1px solid rgba(146,164,180,.16);
  background:linear-gradient(110deg,rgba(146,164,180,.075),rgba(146,164,180,.018));}
.cot-si-diag .box{position:relative;flex:0 0 auto;}
.cot-si-diag .box:first-child{width:90px!important;height:90px!important;}
.cot-si-diag .box:nth-child(2){width:172px!important;height:86px!important;}
.cot-si-diag .box::after{content:attr(data-view);position:absolute;left:2px;bottom:0;
  font:800 6.5px/1 ${T};letter-spacing:.14em;color:#758491;text-transform:uppercase;}
.cot-si-diag .sil{position:absolute;inset:0;}
/* shaded per-tank plan-form render (icons pipeline <id>_top/_side.png)
   layered over the silhouette base: a canvas-baked NEUTRAL-GRAY schematic
   (luminance-normalized, see schematicUrl) carries the turret/barrel/fender
   read the flat mask lacked (r7: top view parsed as a generic rounded box).
   r2: full grayscale(1) fallback while the bake lands — grayscale(.85)+
   brightness(2) left bright camo a fuzzy yellow-green blob at compact sizes. The
   layer is slightly translucent so the zone glow now drawn UNDER it tints
   through without burying the plan shape. */
.cot-si-diag .pf{position:absolute;inset:0;background-size:contain;
  background-position:center;background-repeat:no-repeat;opacity:.86;
  filter:grayscale(1) brightness(1.5) contrast(1.4);}
.cot-si-diag svg.ov{position:absolute;inset:0;overflow:visible;}
.cot-si-diag svg.ov .wdg{animation:cotSiWedge 1.6s ease-in-out infinite;}
@keyframes cotSiWedge{0%,100%{opacity:.5;}50%{opacity:1;}}
.cot-si-zone{min-width:0;font-size:8.5px;color:#f2ca82;font-weight:800;letter-spacing:.07em;
  text-transform:uppercase;font-family:${T};text-align:right;line-height:1.3;}
.cot-si-zone .cap{display:block;color:#778692;font-weight:800;letter-spacing:.15em;font-size:7px;}
.cot-si-mods{display:flex;flex-wrap:wrap;gap:4px;padding:5px 10px 0;}
.cot-si-mod{display:flex;align-items:center;gap:3px;font-size:8.5px;font-weight:800;
  letter-spacing:.06em;font-family:${T};text-transform:uppercase;
  border:1px solid currentColor;padding:1.5px 4px 1.5px 3px;line-height:1;}
.cot-si-mod svg{width:11px;height:11px;display:block;}
.cot-si-log{position:absolute;right:16px;top:clamp(272px,30vh,336px);width:340px;display:none;
  pointer-events:auto;background:linear-gradient(180deg,rgba(10,14,18,.92),rgba(6,9,12,.94));
  border:1px solid rgba(146,164,180,.3);box-shadow:0 6px 22px rgba(0,0,0,.55);
  max-height:calc(var(--cot-viewport-height,100dvh) - 560px);min-height:120px;overflow-y:auto;}
.cot-si-log.open{display:block;}
.cot-si-log .sec{font-size:9.5px;font-weight:800;letter-spacing:.18em;color:${P.dim};
  font-family:${T};text-transform:uppercase;
  padding:6px 9px 3px;display:flex;justify-content:space-between;
  border-bottom:1px solid rgba(146,164,180,.16);}
.cot-si-lrow{display:flex;align-items:baseline;gap:6px;padding:3px 9px;font-size:10px;
  color:#c6d2dc;font-variant-numeric:tabular-nums;border-bottom:1px solid rgba(146,164,180,.08);}
.cot-si-lrow .b{font-family:${T};font-weight:800;
  font-size:8.5px;letter-spacing:.06em;width:92px;flex:0 0 auto;white-space:nowrap;}
.cot-si-lrow .d{font-weight:800;color:#ffd166;width:36px;flex:0 0 auto;text-align:right;
  font-family:${T};letter-spacing:-.01em;}
.cot-si-lrow .n{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-si-lrow .z{color:${P.dim};font-size:9px;flex:0 0 auto;}
.cot-si-empty{padding:6px 9px;font-size:9.5px;color:${P.dim};letter-spacing:.04em;}
.cot-si-toasthost{position:absolute;left:16px;bottom:452px;width:270px;min-height:164px;
  display:flex;flex-direction:column;justify-content:flex-end;gap:5px;contain:layout style;}
.cot-si-toasthost:not(:empty)::before{content:"INCOMING FIRE";align-self:flex-start;
  padding-left:8px;font:800 7.5px/1 ${T};letter-spacing:.2em;color:#c06f66;}
.cot-si-toast{height:48px;overflow:hidden;contain:layout paint style;
  background:linear-gradient(100deg,rgba(38,12,12,.94),rgba(11,10,12,.84) 78%,rgba(8,10,13,.3));
  border:1px solid rgba(240,90,90,.2);border-left:3px solid ${P.red};padding:6px 10px 6px;
  box-shadow:0 6px 18px rgba(0,0,0,.3);transition:opacity .7s ease;text-shadow:0 1px 2px rgba(0,0,0,.85);}
.cot-si-toast.deflected{
  background:linear-gradient(100deg,rgba(22,31,39,.94),rgba(10,14,18,.84) 78%,rgba(8,10,13,.3));
  border-color:rgba(159,176,191,.22);box-shadow:0 6px 18px rgba(0,0,0,.25);}
.cot-si-toast.out{opacity:0;}
.cot-si-toast .l1{height:18px;display:flex;justify-content:space-between;align-items:baseline;gap:6px;
  font-size:11px;font-weight:750;color:#f2c6bf;}
.cot-si-toast .l1 span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-si-toast .l1 b{color:#ff8f80;font-family:${T};letter-spacing:-.01em;
  font-variant-numeric:tabular-nums;font-size:13px;display:flex;align-items:center;gap:4px;
  white-space:nowrap;}
.cot-si-toast .l1 b svg{width:11px;height:11px;flex:0 0 auto;}
.cot-si-toast .l2{height:16px;font-size:9px;color:#c9a9a2;letter-spacing:.04em;display:flex;
  justify-content:space-between;gap:6px;font-variant-numeric:tabular-nums;}
.cot-si-toast .l2>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-si-toast .l2 .m{font-weight:800;text-transform:uppercase;
  font-family:${T};letter-spacing:.07em;text-align:right;}
.cot-si-stats{position:fixed;inset:0;z-index:71;display:none;pointer-events:none;
  flex-direction:column;align-items:center;justify-content:center;
  padding:2vh 0 4vh;overflow:hidden;
  font-family:${w};color:${P.text};
  background:linear-gradient(180deg,rgba(5,8,12,.9),rgba(4,7,10,.8) 42%,rgba(3,5,8,.92));}
.cot-si-stats.show{display:flex;}
.cot-si-stats *{box-sizing:border-box;margin:0;padding:0;}
/* While the battle report is up, the integration end-overlay underneath
   (endOverlayRuntime.ts .cot-end, z-index 70) must not stack a second verdict banner
   mid-screen — the report renders its own. Its RETURN TO GARAGE button is
   kept and pinned as the report footer, directly under the last panel
   (--cot-si-endpad is measured in pinFooter(); the r6 report left the button
   floating in an empty black bottom half). The earnings line is hidden too:
   the econ strip above renders the same payout with its formula caption. */
body.cot-si-report .cot-end>div:first-child{display:none;}
body.cot-si-report .cot-end>div:nth-child(2){display:none;}
body.cot-si-report .cot-end{align-items:center !important;
  justify-content:flex-end !important;
  padding-bottom:var(--cot-si-endpad,3.2vh) !important;
  z-index:72 !important;background:transparent !important;}
/* Clean cinematic results screen: no battle-HUD chrome may bleed through the
   report backdrop (r6: kill-feed rows and dimmed team panels overlapped the
   VICTORY banner). Hidden only while body.cot-si-report is set — hideStats()
   and reset() restore everything for the next battle. */
body.cot-si-report .cot-killfeed,body.cot-si-report .cot-ear,
body.cot-si-report .cot-top,
body.cot-si-report .cot-alert,
body.cot-si-report .cot-sixth,body.cot-si-report .cot-tgt,
body.cot-si-report .cot-net,body.cot-si-report .cot-camoind,
body.cot-si-report .cot-shells,body.cot-si-report .cot-minimap,
body.cot-si-report .cot-hpbars,body.cot-si-report .cot-dmglayer,
body.cot-si-report .cot-dp,body.cot-si-report .cot-si-log,
body.cot-si-report .cot-ret{display:none !important;}
.cot-si-ban{font-family:${T};font-weight:800;font-size:56px;
  letter-spacing:.34em;text-indent:.34em;line-height:1;text-shadow:0 2px 22px rgba(0,0,0,.85);}
.cot-si-ban.v{color:#7ee87e;}.cot-si-ban.d{color:#f05a5a;}.cot-si-ban.n{color:#cfd9e2;}
.cot-si-bansub{font-size:10px;letter-spacing:.32em;color:${P.dim};margin:7px 0 2.6vh;
  text-transform:uppercase;font-family:${T};font-weight:800;}
.cot-si-hdr{font-size:10.5px;letter-spacing:.2em;color:#a9b6c2;margin:0 0 2.2vh;
  text-transform:uppercase;font-family:${T};font-weight:700;
  font-variant-numeric:tabular-nums;}
.cot-si-hdr b{color:#dbe6ef;font-weight:800;}
.cot-si-cols{display:flex;gap:16px;width:1120px;max-width:94vw;align-items:stretch;
  min-height:220px;}
.cot-si-panel{background:linear-gradient(180deg,rgba(10,14,18,.92),rgba(6,9,12,.95));
  border:1px solid rgba(146,164,180,.3);box-shadow:0 10px 40px rgba(0,0,0,.5);
  padding:14px 20px 16px;min-height:0;overflow:hidden;}
.cot-si-panel .ph{font-size:9.5px;font-weight:800;letter-spacing:.22em;color:${P.dim};
  text-transform:uppercase;font-family:${T};
  padding-bottom:6px;border-bottom:1px solid rgba(146,164,180,.2);margin-bottom:7px;
  display:flex;justify-content:space-between;}
.cot-si-pl{flex:1.15;}
.cot-si-pr{flex:1;}
.cot-si-you{display:flex;align-items:center;gap:8px;font-size:11px;padding:3px 0 6px;
  font-variant-numeric:tabular-nums;border-bottom:1px solid rgba(146,164,180,.14);
  margin-bottom:5px;}
.cot-si-you .si{width:62px;height:24px;flex:0 0 auto;}
.cot-si-you .n{flex:1;color:#f2f7fb;font-weight:800;font-family:${T};
  letter-spacing:.1em;}
.cot-si-meta{margin-top:12px;font-size:9.5px;letter-spacing:.2em;color:${P.dim};
  text-transform:uppercase;font-family:${T};
  font-weight:700;text-align:center;}
.cot-si-you .s{color:${P.dim};font-size:10px;}
.cot-si-you .dm{color:#ffd166;font-weight:800;font-family:${T};letter-spacing:-.01em;
  width:60px;text-align:right;}
.cot-si-ribbons{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px;}
.cot-si-rib{border:1px solid rgba(214,178,94,.75);color:#e8c86a;font-family:${T};
  font-weight:800;font-size:9px;letter-spacing:.14em;
  padding:3px 8px;text-transform:uppercase;background:rgba(120,90,20,.16);
  display:inline-flex;align-items:center;gap:5px;}
.cot-si-rib svg{width:12px;height:12px;display:block;flex:0 0 auto;}
.cot-si-tlwrap{width:1120px;max-width:94vw;margin-top:14px;}
.cot-si-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 16px;margin-bottom:12px;}
.cot-si-grid.c5{grid-template-columns:repeat(5,1fr);}
.cot-si-stat{text-align:center;}
.cot-si-stat .v{font-size:28px;font-weight:800;font-family:${T};letter-spacing:-.01em;
  font-variant-numeric:tabular-nums;color:#f2f7fb;line-height:1.1;}
.cot-si-econ{display:flex;gap:16px;width:1120px;max-width:94vw;margin-bottom:14px;}
.cot-si-ecoitem{flex:1;display:flex;flex-direction:column;
  background:linear-gradient(180deg,rgba(10,14,18,.92),rgba(6,9,12,.95));
  border:1px solid rgba(146,164,180,.3);box-shadow:0 10px 40px rgba(0,0,0,.5);
  padding:10px 16px 11px;}
.cot-si-ecoitem .et{display:flex;align-items:baseline;justify-content:center;gap:10px;}
.cot-si-ecoitem .ek{font-size:9.5px;font-weight:800;letter-spacing:.22em;color:${P.dim};
  text-transform:uppercase;font-family:${T};}
.cot-si-ecoitem .ev{font-size:30px;font-weight:800;font-family:${T};letter-spacing:-.01em;
  font-variant-numeric:tabular-nums;line-height:1;}
.cot-si-ecoitem.cr .ev{color:#ffd166;}
.cot-si-ecoitem.xp .ev{color:#9fd0ff;}
.cot-si-ecoitem .eb{font-size:9px;color:${P.dim};letter-spacing:.05em;
  font-variant-numeric:tabular-nums;}
/* itemized earnings receipt (r4, WoT detailed-results depth): one line item
   per source, each printing its exact inputs x rate — the strip total above
   MUST reconcile with the visible rows (rounding stated on the total row) */
.cot-si-erows{margin-top:7px;border-top:1px solid rgba(146,164,180,.16);
  padding-top:5px;display:flex;flex-direction:column;gap:1px;}
.cot-si-erows>div{display:flex;justify-content:space-between;font-size:9.5px;
  color:${P.dim};font-variant-numeric:tabular-nums;letter-spacing:.03em;}
.cot-si-erows b{color:#cfdae4;font-weight:700;font-family:${T};letter-spacing:-.01em;
  }
.cot-si-erows .tot{border-top:1px solid rgba(146,164,180,.22);margin-top:3px;
  padding-top:3px;}
.cot-si-ecoitem.cr .tot b{color:#ffd166;}
.cot-si-ecoitem.xp .tot b{color:#9fd0ff;}
/* expandable enemy rows (r4): click reveals the per-shot exchange ledger —
   the same resolved events the floating cards / toasts already showed */
.cot-si-kill.x{pointer-events:auto;cursor:pointer;}
.cot-si-kill.x:hover{background:rgba(146,164,180,.07);}
.cot-si-kill .ex{color:${P.dim};font-size:8px;width:10px;flex:0 0 auto;
  transition:transform .15s ease;}
.cot-si-kill.open .ex{transform:rotate(90deg);}
.cot-si-xd{display:none;background:rgba(8,12,16,.6);
  border-bottom:1px solid rgba(146,164,180,.08);
  padding:3px 6px 4px 24px;max-height:96px;overflow-y:auto;pointer-events:auto;}
.cot-si-xd.open{display:block;}
.cot-si-xd .xr{display:flex;gap:7px;align-items:baseline;font-size:9.5px;
  color:#b9c6d2;font-variant-numeric:tabular-nums;padding:1px 0;}
.cot-si-xd .xr .t{color:${P.dim};width:30px;flex:0 0 auto;}
.cot-si-xd .xr .w{font-family:${T};font-weight:800;
  font-size:8.5px;letter-spacing:.08em;width:52px;flex:0 0 auto;}
.cot-si-xd .xr .d{color:#ffd166;font-weight:700;width:34px;text-align:right;
  flex:0 0 auto;font-family:${T};letter-spacing:-.01em;}
.cot-si-xd .xr .z{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  color:#93a2af;}
/* roster clicks must reach the report — the transparent integration overlay
   (.cot-end, z 72) sits above it solely to host its RETURN button */
body.cot-si-report .cot-end{pointer-events:none !important;}
body.cot-si-report .cot-end button{pointer-events:auto !important;}
.cot-si-stat .k{font-size:8.5px;font-weight:700;letter-spacing:.16em;color:${P.dim};
  text-transform:uppercase;font-family:${T};}
.cot-si-shell{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:8px;
  font-size:9.5px;color:${P.dim};font-variant-numeric:tabular-nums;letter-spacing:.05em;}
.cot-si-shell b{color:#dbe6ef;font-family:${T};letter-spacing:-.01em;font-weight:800;}
.cot-si-shell .ty{font-weight:800;font-family:${T};
  letter-spacing:.08em;font-size:9px;}
.cot-si-tl{margin-bottom:9px;}
.cot-si-tl svg{display:block;width:100%;height:58px;}
.cot-si-tl .cap{font-size:8px;letter-spacing:.14em;color:${P.dim};text-transform:uppercase;
  font-family:${T};font-weight:700;text-align:center;margin-top:2px;}
.cot-si-kills{padding-top:2px;margin-bottom:6px;}
.cot-si-kill{display:flex;align-items:center;gap:8px;font-size:11.5px;padding:3px 0;
  font-variant-numeric:tabular-nums;border-bottom:1px solid rgba(146,164,180,.08);}
.cot-si-kill .si{width:34px;height:14px;flex:0 0 auto;}
.cot-si-kill .n{flex:1;color:#dbe6ef;font-weight:600;white-space:nowrap;
  overflow:hidden;text-overflow:ellipsis;}
.cot-si-kill .n .you{color:#ffd166;font-family:${T};
  font-weight:800;font-size:9px;letter-spacing:.12em;border:1px solid rgba(255,209,102,.6);
  padding:0 4px 1px;margin-right:4px;vertical-align:1px;}
.cot-si-kill .kd{color:${P.red};font-weight:800;font-size:9px;letter-spacing:.12em;
  font-family:${T};width:38px;text-align:right;flex:0 0 auto;}
.cot-si-kill .al{color:${P.green};font-weight:800;font-size:9px;letter-spacing:.12em;
  font-family:${T};width:38px;text-align:right;flex:0 0 auto;
  opacity:.75;}
.cot-si-kill .s{color:${P.dim};font-size:10px;}
.cot-si-kill .k{color:#dbe6ef;font-weight:800;font-family:${T};letter-spacing:-.01em;
  width:30px;text-align:right;font-size:10px;flex:0 0 auto;}
.cot-si-kill .dm{color:#ffd166;font-weight:800;font-family:${T};letter-spacing:-.01em;
  width:48px;text-align:right;flex:0 0 auto;}
/* roster column micro-captions (r6): the right-hand figure is the
   combatant's TOTAL battle damage output — un-headed it read as damage
   done to you next to 'no engagement with you' */
.cot-si-kill.cap{padding:0 0 1px;border-bottom:none;}
.cot-si-kill.cap span{color:${P.dim} !important;font-size:7.5px;font-weight:700;
  letter-spacing:.12em;text-transform:uppercase;font-family:${T};
  }
/* The game owns an explicit touch-layout state; do not make battle UI depend
   on browser pointer heuristics alone (desktop emulation and hybrid tablets
   can report a fine pointer while touch controls are active). */
/* Touch battles already show a reticle hit-confirm and resolved damage number.
   The desktop analysis dossier duplicates that feedback while obscuring a
   third of a phone battlefield, so it is intentionally desktop-only. */
body.cot-touch-layout .cot-si-cardhost,
body.cot-touch-layout .cot-si-log{display:none!important;}
/* Incoming fire remains actionable, but as one compact reading below the
   minimap—not a stack over the ammo tray or the steering/aim controls. */
body.cot-touch-layout .cot-si-toasthost{top:calc(max(8px,env(safe-area-inset-top)) + 108px);
  bottom:auto;left:max(8px,env(safe-area-inset-left));right:auto;width:min(200px,48vw);min-height:41px;}
body.cot-touch-layout .cot-si-toast:nth-last-of-type(n+2){display:none;}
body.cot-touch-layout .cot-si-toast{height:41px;padding:4px 7px;}
body.cot-touch-layout .cot-si-toast .l1{height:17px;font-size:9.5px;}
body.cot-touch-layout .cot-si-toast .l1 b{font-size:11px;}
body.cot-touch-layout .cot-si-toast .l2{height:14px;font-size:7.5px;}
@media (prefers-reduced-motion:reduce){
  .cot-si-card,.cot-si-toast,.cot-si-diag svg.ov .wdg{animation:none;transition:none;}
}
`,Yt=e=>{let t=Math.max(0,Math.floor(e||0));return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`},Xt=96,Zt=184,Qt=92;function $t(e,t,n,r){return vt(`${e}|${t}|${n}x${r}`,{url:de(e,t),width:n,height:r})}function en(e,t,n,r,i){let a=C(`div`,`pf`,e);return a.style.backgroundImage=`url(${de(t,n)})`,$t(t,n,r*2,i*2).then(e=>{e&&a.isConnected!==!1&&(a.style.backgroundImage=`url(${e})`,a.style.filter=`none`)}),a}function tn(e,t,n){e.dataset.kind=t.kind,e.dataset.damage=String(Math.round(t.damage||0)),e.dataset.dmgroll=String(Math.round(t.dmgRoll||0)),e.dataset.eff=String(Math.round(t.effectiveMm||0)),e.dataset.pen=String(Math.round(t.penRollMm||0)),e.dataset.nominal=String(Math.round(t.nominalMm||0)),e.dataset.dist=String(Math.round(t.flightDistM||0)),e.dataset.angle=String(Math.round(t.impactAngleDeg||0)),e.dataset.zone=t.zone||``,e.dataset.outcome=n.id,e.style.borderRightColor=n.color}function nn(e,t,r){let i=C(`div`,`cot-si-hd`,e),a=C(`div`,`cot-si-state`,i),o=C(`span`,`cot-si-kicker`,a);o.innerHTML=`${qt.ballistic}<span>${n(`killcam.ballisticAnalysis`)}</span>`;let s=C(`span`,`cot-si-badge`,a);s.innerHTML=`${k(r.icon,11)}<span>${r.label}</span>`,s.style.color=r.color;let c=C(`span`,`cot-si-dmg`,i);c.innerHTML=`${qt.damage}<span>${t.damage>0?`−${Math.round(t.damage)}`:`0`}</span>`,t.damage>0||(c.style.color=P.dim)}function rn(e,t){let n=C(`div`,`cot-si-sub`,e);n.innerHTML=`<span><span class="ty" style="color:${Kt[t.shellType]||`#9fb0bf`}">${qt.shell}${t.shellType}</span><span class="cot-si-subtext">${Oe(t)}</span></span><span>${qt.target}<span class="cot-si-subtext">${t.targetName||``}</span></span>`}function an(e){return e.kind===`screen_pierce`?e.physicalMm&&e.physicalMm>0?`${Math.round(e.physicalMm)} mm screen`:`screen`:(e.nominalMm||0)>0||(e.effectiveMm||0)>0?`${Math.round(e.nominalMm||0)} → ${Math.round(e.effectiveMm||0)} mm eff.`:e.zone&&[`optics`,`gun`,`gun_barrel`,`trackL`,`trackR`].includes(e.zone)?`external — no armor`:`—`}function on(e,t,n,r){if(e.eraPlate)return`ERA`;let i=r>n+1;return n>0&&(i||t>0&&n<t*.75-2)?`SCREENS`:``}function sn(e,t){if(t.kind===`screen_pierce`)return{html:`passed through`,qualifier:``,legend:``};let n=Ae(t),r=Math.round(t.penRollMm||0),i=Math.round(t.penRollFreshMm||0);e.dataset.pennom=String(n),e.dataset.penfresh=String(i);let a=i>r+1,o=on(t,n,r,i),s=a?`${i} → `:``,c=a?`fresh → after ${o===`ERA`?`ERA`:`screens`} / nominal`:r>0&&n>0?`roll / nominal`:``;return r<=0||n<=0?{html:r>0?`${s}${r} mm`:`—`,qualifier:o,legend:c}:{html:`<span style="color:${(a?i:r)>=n?P.green:P.red}">${s}${r}</span> / ${n} mm`,qualifier:o,legend:c}}function cn(e,t,n,r,i,a,o){let s=C(`div`,`sil`,e);ue(s,t,n,`transparent`),s.style.background=`radial-gradient(circle ${a}px at ${r.toFixed(1)}px ${i.toFixed(1)}px,${o}ff 0%,${o}c0 55%,${o}00 100%)`}function ln(e,t,n,r){if(!e)return``;let i=Math.hypot(e[0],e[2]);if(i<=1e-4)return``;let a=e[0]/i,o=e[2]/i,s=(e,t,n)=>[e*Math.cos(n)-t*Math.sin(n),e*Math.sin(n)+t*Math.cos(n)],[c,l]=s(a,o,.46),[u,d]=s(a,o,-.46);return`<path class="wdg" d="M${t.toFixed(1)} ${n.toFixed(1)} L${(t+c*17).toFixed(1)} ${(n+l*17).toFixed(1)} L${(t+a*17*1.12).toFixed(1)} ${(n+o*17*1.12).toFixed(1)} L${(t+u*17).toFixed(1)} ${(n+d*17).toFixed(1)} Z" fill="${r}" fill-opacity="0.5" stroke="${r}" stroke-width="0.8"/>`}function un(e,t,n,r,i){let a=n-e,o=r-t,s=1;return a>0?s=Math.min(s,(i-2-e)/a):a<0&&(s=Math.min(s,(2-e)/a)),o>0?s=Math.min(s,(i-2-t)/o):o<0&&(s=Math.min(s,(2-t)/o)),s=Math.max(0,s),[e+a*s,t+o*s]}function dn(e,t,n,r,i,a){if(!e)return``;let o=i(t[0]-e[0]*2.2,t[2]-e[2]*2.2),[s,c]=un(n,r,o[0],o[1],a);return`<line x1="${s.toFixed(1)}" y1="${c.toFixed(1)}" x2="${n.toFixed(1)}" y2="${r.toFixed(1)}" stroke="#ff8a5c" stroke-width="2.2" marker-end="url(#cotsiarw)"/>`}function fn(e,t,n,r){if(!e?.turretPivot)return``;let[i,a]=n(e.turretPivot[0],e.turretPivot[2]),o=Math.min(t.widthM*.3,1.05)*r,s=e.gunBarrel?.lengthM||t.overallLengthM*.45,[c,l]=n(e.turretPivot[0],e.turretPivot[2]+s);return`<circle cx="${i.toFixed(1)}" cy="${a.toFixed(1)}" r="${o.toFixed(1)}" fill="none" stroke="rgba(232,242,252,0.8)" stroke-width="1.6"/><line x1="${i.toFixed(1)}" y1="${a.toFixed(1)}" x2="${c.toFixed(1)}" y2="${l.toFixed(1)}" stroke="rgba(232,242,252,0.8)" stroke-width="2.5" stroke-linecap="round"/>`}function pn(e){ie(),re(`cot-si-style`,Jt);let t=C(`div`,`cot-si`),r=C(`div`,`cot-si-cardhost`,t);r.setAttribute(`role`,`status`),r.setAttribute(`aria-live`,`polite`);let i=C(`div`,`cot-si-log`,t);i.tabIndex=0;let a=C(`div`,`cot-si-toasthost`,t);a.setAttribute(`role`,`status`),a.setAttribute(`aria-live`,`polite`);let o=C(`div`,`cot-si-stats`);document.body.appendChild(o);let s=Bt(e,o),c=null,l=!1,u=0,d=null,f=()=>{u+=1,d!==null&&cancelAnimationFrame(d),d=null},p=[],m=[],h=[],g=ae(),_=null,v=()=>document.body.classList.contains(`cot-touch-layout`),y=new Map,b=new Set,ee=!1,te=new Map,x=null,S=new Map;function ne(e,t=null,n=null){let r=te.get(e);if(r||(r={name:null,specId:null,dmg:0,kills:0,dead:!1},te.set(e,r)),t&&!r.name&&(r.name=t),n&&!r.specId&&(r.specId=n,!r.name))try{r.name=Wt(n).name}catch{}return r}function w(e){let t=S.get(e);if(t||(t={p:e,r:0},S.set(e,t)),t.p===e)return{root:e,r:0};let n=w(t.p);return t.p=n.root,t.r=t.r+n.r&1,{root:t.p,r:t.r}}function T(e,t){if(e==null||t==null||e===t)return;let n=w(e),r=w(t);if(n.root===r.root)return;let i=S.get(n.root);i&&(i.p=r.root,i.r=n.r+r.r+1&1)}function E(e){if(c==null)return null;if(e===c)return`ally`;if(!S.has(e))return null;let t=w(c),n=w(e);return n.root===t.root?n.r===t.r?`ally`:`enemy`:null}function ae(){return{fired:0,hits:0,pens:0,dealt:0,received:0,blocked:0,assist:0,modulesDestroyed:0,perTarget:new Map,perShell:new Map,timeline:[]}}function oe(e){let t=g.perShell.get(e);return t||(t={fired:0,hits:0,pens:0,dmg:0},g.perShell.set(e,t)),t}function se(e,t){let n=e.targetSpecId||e.targetId,r=null,i=null;try{let e=n?Wt(n):null;r=e?e.dims:null,i=e?e.armor:null}catch{r=null}let a=C(`div`,`cot-si-diag`),o=kt(e,i||{});if(!r||!o)return a.remove(),null;let s=o.point,c=o.direction,l=jt({dims:r,armor:i||void 0},{topSize:Xt,sideWidth:Zt,sideHeight:Qt,presentationAnchor:le(n)||void 0,presentationProjection:ce(n)||void 0}),u=t&&t.color||`#ff8a5c`,d=`rgba(206,222,236,0.55)`,f=`drop-shadow(0 0 1px rgba(232,242,250,0.9)) drop-shadow(0 0 1px rgba(150,175,195,0.5))`,p=Xt,m=C(`div`,`box`,a);m.dataset.view=`Top`,m.style.width=`${p}px`,m.style.height=`${p}px`;let h=C(`div`,`sil`,m);ue(h,n,`top_silhouette`,d),h.style.filter=f;let g=l.topScale,_=l.topPoint,[v,y]=_(s[0],s[2]);cn(m,n,`top_silhouette`,v,y,24,u),en(m,n,`top`,p,p);let b=ln(c,v,y,u),ee=dn(c,s,v,y,_,p),te=fn(i,r,_,g),x=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);x.setAttribute(`class`,`ov`),x.setAttribute(`viewBox`,`0 0 ${p} ${p}`),x.innerHTML=`<defs><marker id="cotsiarw" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="5"
        markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="#ff8a5c"/></marker></defs>`+b+te+ee+`<circle cx="${v.toFixed(1)}" cy="${y.toFixed(1)}" r="6.2" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="${v.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#ff8a5c"/>`,m.appendChild(x);let S=Zt,ne=Qt,re=C(`div`,`box`,a);re.dataset.view=`Side`,re.style.width=`${S}px`,re.style.height=`${ne}px`;let w=C(`div`,`sil`,re);ue(w,n,`side_silhouette`,d),w.style.filter=f;let[ie,T]=l.sidePoint(s[1],s[2]);cn(re,n,`side_silhouette`,ie,T,20,u),en(re,n,`side`,S,ne);let E=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);return E.setAttribute(`class`,`ov`),E.setAttribute(`viewBox`,`0 0 ${S} ${ne}`),E.innerHTML=`<circle cx="${ie.toFixed(1)}" cy="${T.toFixed(1)}" r="5.6" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="${ie.toFixed(1)}" cy="${T.toFixed(1)}" r="3" fill="#ff8a5c"/>`,re.appendChild(E),a}function D(e,t){let n=C(`div`,`cot-si-card`);tn(n,e,t),nn(n,e,t),rn(n,e);let r=C(`div`,`cot-si-body`,n),i=C(`div`,`cot-si-rows`,r),a=(e,t,n=``)=>{let r=C(`div`,`cot-si-kv${n?` ${n}`:``}`,i);return r.innerHTML=`<span class="cot-si-k">${qt[e.toLowerCase()]||``}<span>${e}</span></span><b>${t}</b>`,r};a(`Angle`,`${Math.round(e.impactAngleDeg||0)}°`,`w`),a(`Armor`,an(e),`w armor`);let o=sn(n,e);a(`Damage`,`${Math.round(e.damage||0)} / ${Math.round(e.dmgRoll||0)}`,`w`);{let e=a(`Pen`,o.html+(o.qualifier?`<span class="q" style="color:${o.qualifier===`ERA`?P.yellow:`#9fb0bf`}">${o.qualifier}</span>`:``),`w pen`);e.title=o.legend?`Penetration (mm): ${o.legend}`:`Penetration roll at impact`}let s=se(e,t);return s&&r.appendChild(s),n}function O(e,t){if(v()||l)return;for(;r.firstChild;)r.firstChild.remove();let n=D(e,t);r.appendChild(n);let i=setTimeout(()=>n.classList.add(`out`),6200);setTimeout(()=>{clearTimeout(i),n.parentNode&&n.remove()},7200)}function de(){i.textContent=``;let e=C(`div`,`sec`,i);e.innerHTML=`<span>${n(`action.shotLog`)}</span><span>${p.length} / 6</span>`,p.length||(C(`div`,`cot-si-empty`,i).textContent=n(`shotInfo.emptyShots`));for(let e of p){let t=C(`div`,`cot-si-lrow`,i);t.innerHTML=`<span class="b" style="color:${e.cls.color}">${e.cls.label}</span><span class="d">${(e.ev.damage||0)>0?`−${Math.round(e.ev.damage)}`:`·`}</span><span class="n">${e.ev.targetName||e.ev.targetId||``}</span><span class="z">${De(e.ev.zone)} · ${Math.round(e.ev.flightDistM||0)}m</span>`}let t=h.reduce((e,t)=>e+t.dmg,0),r=C(`div`,`sec`,i);r.innerHTML=`<span>${n(`endScreen.damageReceived`)}</span><span>${n(`shotInfo.damageAmount`,{amount:Math.round(t)})}</span>`,h.length||(C(`div`,`cot-si-empty`,i).textContent=n(`shotInfo.emptyReceived`));for(let e=h.length-1;e>=0;e--){let t=h[e],n=C(`div`,`cot-si-lrow`,i);n.innerHTML=`<span class="b" style="color:${t.dmg>0?P.red:t.outcome.color}">${t.dmg>0?Yt(t.t):t.outcome.label}</span><span class="d">${t.dmg>0?`−${Math.round(t.dmg)}`:`·`}</span><span class="n">${t.attacker}</span><span class="z">${t.shellType}${t.mods?` · `+t.mods:``}</span>`}}function fe(){if(v()){l=!1,i.classList.remove(`open`);return}if(l=!l,i.classList.toggle(`open`,l),l){for(;r.firstChild;)r.firstChild.remove();de()}}function ge(e,t){let n=C(`div`,`cot-si-toast`,a);n.dataset.damage=String(Math.round(e.damage||0)),n.dataset.kind=e.kind;let r=e=>e===`red`?me.red:e===`yellow`?me.yellow:P.dim,i=(e.eraPlate?[`<span style="color:${P.yellow}">ERA</span>`]:[]).concat((e.modulesHit||[]).map(e=>`<span style="color:${r(e.newState)}">${Gt(pe,e.module)}${e.newState===`red`?` ✕`:``}</span>`)).concat((e.crewHit||[]).map(e=>`<span style="color:${P.red}">${Gt(he,e)} ✕</span>`)).join(`, `);n.innerHTML=`<div class="l1"><span>${e.attackerName||`Enemy`}</span><b>${k((e.damage||0)>0?`damage`:t.icon,11)}${(e.damage||0)>0?`−${Math.round(e.damage)}`:t.label}</b></div><div class="l2"><span>${e.shellType||``} ${Oe(e)} · ${De(e.zone)}</span>${i?`<span class="m">${i}</span>`:``}</div>`,n.dataset.outcome=t.id,e.damage>0||n.classList.add(`deflected`),n.style.borderLeftColor=(e.damage||0)>0?P.red:t.color;let o=n.querySelector(`.l1 b`);for(o&&(o.style.color=(e.damage||0)>0?P.red:t.color);a.children.length>3;)a.firstChild?.remove();setTimeout(()=>n.classList.add(`out`),4600),setTimeout(()=>{n.parentNode&&n.remove()},5500)}function _e(){let e=new Map;for(let[t,n]of te)e.set(t,{id:t,name:n.name,specId:n.specId,dmg:Math.round(n.dmg),kills:n.kills,dead:n.dead,side:E(t),isPlayer:t===c});for(let t of x||[])ve(e,t);return e}function ve(e,t){let n=e.get(t.id);n||(n={id:t.id,name:null,specId:null,dmg:0,kills:0,dead:!1,side:null,isPlayer:!1},e.set(t.id,n)),!n.name&&(t.vehicle||t.name)&&(n.name=t.vehicle||t.name||null),!n.specId&&t.specId&&(n.specId=t.specId),t.team&&(n.side=t.team===`enemy`?`enemy`:`ally`),t.alive===!1&&(n.dead=!0),t.isPlayer&&(n.isPlayer=!0)}function ye(e){let t=[],n=[];for(let r of e.values())r.side===`ally`?t.push(r):r.side===`enemy`&&n.push(r);let r=(e,t)=>!!t.isPlayer-+!!e.isPlayer||t.dmg-e.dmg;return t.sort(r),n.sort(r),{allies:t,enemies:n}}function be(){let e=[];for(let[t,n]of g.perTarget)n.killed&&e.push({id:t,name:n.name||t,specId:n.specId||t,dmg:Math.round(n.dmg)});return e.sort((e,t)=>t.dmg-e.dmg),e}function xe(){let e=null;for(let t of m)t.ev.damage>0&&(!e||t.ev.damage>e.ev.damage)&&(e=t);return e}function Se(){let e=_?.map||null;if(!e)return null;try{e=Me(e).name||e}catch{}return e}function Ce(){return typeof _?.timeS==`number`&&Number.isFinite(_.timeS)?_.timeS:Math.max(0,...g.timeline.map(e=>e.t),...h.map(e=>e.t))}function we(e){let t=_e(),{allies:n,enemies:r}=ye(t),i=be(),a=xe(),o=c===null?void 0:t.get(c);return{result:e,reason:_?.reason||null,playerVehicle:o?.name||``,playerSpecId:o?.specId||null,playerDead:!!o?.dead,map:Se(),timeS:Ce(),stats:{dealt:g.dealt,received:g.received,blocked:g.blocked,fired:g.fired,hits:g.hits,pens:g.pens,assist:g.assist,modulesDestroyed:g.modulesDestroyed,spotted:b.size,spotAttributed:ee},kills:i,bestShot:a?{damage:a.ev.damage,shellType:a.ev.shellType||``,shellName:Oe(a.ev),targetName:a.ev.targetName||``,zone:De(a.ev.zone),distM:a.ev.flightDistM||0,destroyed:!!a.ev.destroyed}:null,allies:n,enemies:r,campaign:_?.campaign??null}}function Te(e){s.show(e,we(e)),o.classList.add(`show`)}function Ee(e){let t=g.perTarget.get(e.targetId);return t||(t={name:e.targetName,specId:e.targetSpecId,dmg:0,hits:0,pens:0,killed:!1,lastZone:null,hpLeft:null},g.perTarget.set(e.targetId,t)),t}function ke(e){if(e.attackerId==null||e.targetId==null||e.attackerId===e.targetId)return;let t=ne(e.attackerId,e.attackerName,e.attackerSpecId);t.dmg+=e.damage||0;let n=ne(e.targetId,e.targetName,e.targetSpecId);e.destroyed&&(n.dead=!0),e.kind!==`he_splash`&&T(e.attackerId,e.targetId)}function Ae(e){let t=y.get(e.targetId);e.attackerId===c||e.targetId===c||e.damage<=0||t===void 0||(e.timeS||0)-t>12||e.attackerId!=null&&E(e.attackerId)===`ally`&&(g.assist+=e.damage)}function Ne(e){if(e.attackerId!==c||!e.targetId||e.targetId===c)return;let t=je(e);g.hits+=1,t.penetrated&&(g.pens+=1),g.dealt+=e.damage||0;let n=oe(e.shellType||`—`);n.hits+=1,t.penetrated&&(n.pens+=1),n.dmg+=e.damage||0,e.damage>0&&g.timeline.push({t:e.timeS||0,d:e.damage}),g.modulesDestroyed+=(e.modulesHit||[]).filter(e=>e.newState===`red`).length;let r=Ee(e);r.dmg+=e.damage||0,r.hits+=1,t.penetrated&&(r.pens+=1),e.zone&&(r.lastZone=e.zone),typeof e.targetHpAfter==`number`&&Number.isFinite(e.targetHpAfter)&&(r.hpLeft=Math.max(0,Math.round(e.targetHpAfter))),e.destroyed&&(r.killed=!0,r.hpLeft=0),p.unshift({ev:e,cls:t}),p.length>6&&p.pop(),m.push({ev:e,cls:t}),O(e,t),l&&de()}function Pe(e){if(e.targetId!==c)return;let t=je(e);g.received+=e.damage||0,(e.damage||0)<=0&&t.blocked&&(g.blocked+=e.dmgRoll||0);let n=(e.modulesHit||[]).filter(e=>e.newState===`red`).map(e=>Gt(pe,e.module)).join(`, `);h.push({t:e.timeS||0,dmg:e.damage||0,kind:e.kind,aid:e.attackerId,attacker:e.attackerName||`Enemy`,shellType:e.shellType||``,mods:n,outcome:t,zone:e.zone||``}),ge(e,t),l&&de()}e.on(`shell:fired`,e=>{let t=Ut(e);t.isPlayer&&(t.shooterId!=null&&(c=t.shooterId),g.fired+=1,oe(t.shellType||`—`).fired+=1)}),e.on(`tank:spotted`,e=>{let t=Ut(e);!t||t.id==null||(t.team===`player`&&c!=null&&T(c,t.id),t.spotterId!=null&&(ee=!0,c!=null&&t.spotterId===c&&t.id!==c&&(y.set(t.id,t.timeS||0),b.add(t.id))))}),e.on(`shell:hit`,e=>{let t=Ut(e);ke(t),c!=null&&(Ae(t),Ne(t),Pe(t))}),e.on(`tank:destroyed`,e=>{let t=Ut(e);if(ne(t.id,null,t.specId).dead=!0,t.killerId!=null&&t.killerId!==t.id&&(ne(t.killerId).kills+=1,T(t.killerId,t.id)),c==null||t.killerId!==c||t.id===c)return;let n=g.perTarget.get(t.id);if(!n){let e=t.specId;try{e=Wt(t.specId).name}catch{}n={name:e,specId:t.specId,dmg:0,hits:0,pens:0,killed:!1,lastZone:null,hpLeft:null},g.perTarget.set(t.id,n)}n.killed=!0,n.hpLeft=0});let Fe=!1,Ie=null,Le=null,Re=null;function ze(){Ie=null,Le&&=(clearTimeout(Le),null),Re&&=(clearTimeout(Re),null)}function Be(){if(Ie===null)return;let e=Ie;ze(),Te(e)}function Ve(){let e=()=>{if(Ie!==null){if(Le&&=(clearTimeout(Le),null),!Fe){Be();return}Re||=setTimeout(Be,16e3)}};requestAnimationFrame(()=>setTimeout(e,0)),Le&&clearTimeout(Le),Le=setTimeout(e,600)}e.on(`killcam:begin`,()=>{Fe=!0}),e.on(`killcam:done`,()=>{Fe=!1,Ie!==null&&Be()}),e.on(`battle:ended`,e=>{let t=Ut(e);for(;r.firstChild;)r.firstChild.remove();for(;a.firstChild;)a.firstChild.remove();if(t&&Array.isArray(t.roster)&&(x=t.roster),c==null&&x){let e=x.find(e=>e.isPlayer);e&&e.id!=null&&(c=e.id)}_=t?{timeS:t.timeS,map:t.map||t.mapId||null,reason:t.reason||null,campaign:Ht(t)}:null,Ie=t&&t.result||``,Ve()}),e.on(`ui:shotLog`,()=>fe()),e.on(`ui:battleStart`,()=>He.reset());let He={warmSchematics(e){f();let t=u,n=(e||[]).filter(Boolean),r=0,i=()=>{if(d=null,t!==u||r>=n.length)return;let e=n[r++];$t(e,`top`,Xt*2,Xt*2),$t(e,`side`,Zt*2,Qt*2),r<n.length&&(d=requestAnimationFrame(i))};i()},root:t,statsRoot:o,toggleLog:fe,setPlayer(e){c=e},hideStats(){ze(),s.hide(),o.classList.remove(`show`),document.body.classList.remove(`cot-si-report`)},reset(){for(ze();r.firstChild;)r.firstChild.remove();for(;a.firstChild;)a.firstChild.remove();p.length=0,m.length=0,h.length=0,te.clear(),S.clear(),x=null,_=null,y.clear(),b.clear(),ee=!1,Object.assign(g,ae()),g.perTarget=new Map,l=!1,i.classList.remove(`open`),s.hide(),o.classList.remove(`show`),document.body.classList.remove(`cot-si-report`)}};return He}function mn(e){let t=e.getContext(`2d`);if(!t)throw Error(`[hud] Canvas2D context unavailable`);return t}function F(e,t){let n=e.querySelector(t);if(!n)throw Error(`[hud] missing required element: ${t}`);return n}function hn(e){return Array.isArray(e.pos)&&e.pos.length>=3&&e.pos.every(e=>Number.isFinite(e))&&Number.isFinite(e.damage)}var gn=`#7ee87e`,_n=`#f0b04a`,vn=`#f05a5a`,yn=`rgba(236,242,248,0.95)`,bn=`rgba(208,233,211,0.85)`,xn=`rgba(140,242,140,0.95)`,Sn=`rgba(240,160,48,0.95)`,I=4,Cn=2.25,wn=.14,Tn=`rgba(174,184,192,0.9)`,En=1.4;function Dn(e,t=!1){let n=t?e.dmgRoll:e.damage;return Number.isFinite(n)?Math.max(0,Math.round(n||0)):0}function On(e,t,n){return t>0&&(n!==`bounce`||e)}function kn(e,t=null){let r=t||{visible:!1,kind:``,text:``};return r.visible=!1,r.kind=``,r.text=``,e?.selfRightLabel?(r.kind=`rollover`,r.visible=!0,r.text=n(`hud.aimWarning.selfRight`,{key:e.selfRightLabel})):e?.blockedDistM==null?e?.gunLimitSpec&&(r.kind=`limit`,r.visible=!0,r.text=n(`hud.gunTravelLimit`)):(r.kind=`blocked`,r.visible=!!e.blockedLabel,r.text=n(`hud.aimWarning.muzzleBlocked`,{dist:Math.round(e.blockedDistM)})),r}function An(e){let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)}function jn(e,t=!1,n=null){let r=n||{visible:!1,opacity:0,radius:18.5,length:13,halfWidth:3.5,flash:0};if(r.visible=Number.isFinite(e)&&e>=0&&e<=1.4,!r.visible)return r.opacity=0,r.radius=18.5,r.length=13,r.halfWidth=3.5,r.flash=0,r;let i=1-(1-Math.min(1,e/.14))**3,a=Math.max(0,Math.min(1,(e-.34)/(En-.34))),o=e<=.34?1:1-An(a);return r.opacity=(.62+.38*i)*o,r.radius=t?18.5:29-10.5*i,r.length=t?13:8.5+4.5*i,r.halfWidth=t?3.5:2.7+.8*i,r.flash=t?0:1-An(e/.2),r}function Mn(e,t=!1){if(t)return 1;let n=e?.totalS??0,r=e?.t??0;return!(n>0)||!(r>.001)?0:Math.max(0,Math.min(1,r/n))}function Nn(e,t=!1){return t?`SWITCHING`:e.t>=10?`${Math.ceil(e.t)}`:e.t.toFixed(1)}function Pn(e,t,n=!1){return!n&&e&&!t}function Fn(e,t,r,i=!1){let a=t<=0?n(`hud.ammo.empty`):``;return n(i&&r?`hud.ammo.switchingAria`:r?`hud.ammo.selectedAria`:`hud.ammo.selectAria`,{name:e,count:t,empty:a})}function In(e,t=null){let n=t||{x:null,y:null,single:!1},r=Number.isFinite(e?.gunX)&&Number.isFinite(e?.gunY);return n.single=!!e?.singleReticle&&r,n.x=(n.single?e?.gunX:e?.cx)??null,n.y=(n.single?e?.gunY:e?.cy)??null,n}function Ln(e,t,n=null){let r=Math.max(0,(e?.capacity??0)|0);if(r<=1)return null;let i=Math.max(0,Math.min(r,(e?.rounds??0)|0)),a=t?.totalS??0,o=t?.t??0,s=t?.kind===`magazine`&&a>0&&o>.001,c=s?Math.max(0,Math.min(1,1-o/a)):0,l=n||{capacity:0,rounds:0,visibleShells:0,readyShells:0,overflow:0,fullReload:!1,loadProgress:0,intraClip:!1,reloading:!1};return l.capacity=r,l.rounds=i,l.visibleShells=Math.min(4,r),l.readyShells=Math.min(l.visibleShells,i),l.overflow=Math.max(0,i-l.visibleShells),l.fullReload=s,l.loadProgress=c,l.intraClip=t?.kind===`intraClip`&&o>.001,l.reloading=o>.001,l}function Rn(e,t,n=null){let r=Math.max(1,Math.min(4,t|0)),i=Math.max(0,Math.min(r-1,e|0)),a=(r-1)*.5,o=a>0?(i-a)/a:0,s=n||{y:0,rotation:0};return s.y=(1-Math.abs(o))*Cn,s.rotation=-o*wn,s}function zn(e,t,n,r,i){e.beginPath(),e.moveTo(t+r*.5,n),e.lineTo(t+r,n+i*.28),e.lineTo(t+r,n+i*.82),e.lineTo(t+r*.72,n+i),e.lineTo(t+r*.28,n+i),e.lineTo(t,n+i*.82),e.lineTo(t,n+i*.28),e.closePath()}function Bn(e,t,n,r,i,a,o,s,c=0){let l=-i,u=r,d=a-c,f=a+o*.28,p=a+o*.78,m=a+o+c,h=s+c,g=s*.45+c*.55;e.beginPath(),e.moveTo(t+r*d,n+i*d),e.lineTo(t+r*f+l*h,n+i*f+u*h),e.lineTo(t+r*p+l*g,n+i*p+u*g),e.lineTo(t+r*m,n+i*m),e.lineTo(t+r*p-l*g,n+i*p-u*g),e.lineTo(t+r*f-l*h,n+i*f-u*h),e.closePath()}var Vn=11,Hn=.15,Un=new s,Wn=new r,Gn=new r,Kn=new r,qn=new r,Jn={x:0,y:0,single:!1},Yn={visible:!1,kind:``,text:``},Xn=new Set([`gun`,`turretRing`,`gunMount`,`autoloader`,`feedSystem`,`missileRack`,`engine`,`transmission`,`fuelTank`,`ammoRack`,`radio`,`optics`]);function Zn(e){return e===`trackL`||e===`trackR`?`track`:Xn.has(e)?e:`damage`}function Qn(e,t){return e.timeLimitS===void 0?xe(be(t||`standard`)).timeLimitS:e.timeLimitS}function $n(e,t){return _r(t==null?e.timeS:t-e.timeS)}var er=[{name:`M829A4`,type:`APFSDS`,dmg:540,penLabel:`750 mm`},{name:`M830A1`,type:`HEAT`,dmg:480,penLabel:`600 mm`},{name:`M1147`,type:`HE`,dmg:600,penLabel:`60 mm`}],tr={AP:`#ffd27a`,APCR:`#e8f4ff`,HEAT:`#ff8a5c`,HE:`#ffb02e`,APFSDS:`#ffc46b`},nr={AP:`rgba(205,216,226,.85)`,APCR:`rgba(205,216,226,.85)`,APFSDS:`rgba(205,216,226,.85)`,HEAT:`rgba(240,138,74,.9)`,HE:`rgba(154,165,90,.9)`},rr={AP:24,APCR:20,APFSDS:24,HEAT:16,HE:12};function ir(e,t=!1){let n=rr[String(e?.type||``)]??20,r=e?.count==null?n:Number(e.count),i=Math.max(0,Math.floor(Number.isFinite(r)?r:0));return{count:i,empty:i<=0,selected:!!t}}function ar(e){return ir(e).count}function or(e){return e===`fire`?n(`hud.fire`):e===`ammorack`?n(`hud.ammorack`):e===`ram`?n(`hud.rammed`):``}var sr=[`IronMaus`,`SteppeWolf_71`,`Kranvagn`,`DustDevil`,`Bogatyr`,`HullDown_Hank`,`PzKpfwPete`,`Kettenkrad`,`RicochetRita`,`TokTokkie`,`GeneralLee42`,`Zaseka`,`MudCrawler`,`BiaTheBear`,`SabotSally`,`Feldwebel_K`,`OldNikolai`,`TinCanAlly`,`GrilleGuy`,`VodkaVanya`,`CamoNet`,`LongStop`,`DerbyDozer`,`PakWagen`],cr=`Claude`;function lr(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}var ur=[`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`J`,`K`],L=`rgba(238,244,250,0.86)`,dr={repair:`hud.consumable.repair`,first_aid:`hud.consumable.firstAid`,extinguisher:`hud.consumable.extinguisher`},fr=e=>n(dr[e]||`hud.consumable.repair`),pr=[{key:`4`,label:fr(`repair`),count:`∞`,svg:k(`repair`,20,L)},{key:`5`,label:fr(`first_aid`),count:`∞`,svg:k(`medkit`,20,L)},{key:`6`,label:fr(`extinguisher`),count:`∞`,svg:k(`extinguisher`,20,L)}];function mr(e,t){let n=d(46,46,window.devicePixelRatio||1,u()===`mobile`);e.width=Math.round(46*n),e.height=Math.round(46*n),e.style.width=`46px`,e.style.height=`46px`;let r=mn(e);r.setTransform(n,0,0,n,0,0),r.clearRect(0,0,46,46);function i(){if(r.beginPath(),t===`APFSDS`)r.moveTo(23,4),r.lineTo(25,11),r.lineTo(25,35),r.lineTo(29.5,42),r.lineTo(29.5,42),r.lineTo(24,40.5),r.lineTo(22,40.5),r.lineTo(16.5,42),r.lineTo(21,35),r.lineTo(21,11);else if(t===`HEAT`)r.moveTo(21.8,4),r.lineTo(24.2,4),r.lineTo(24.2,9),r.lineTo(25.8,11),r.lineTo(29.2,37),r.lineTo(29.2,39.5),r.lineTo(27.6,42),r.lineTo(18.4,42),r.lineTo(16.8,39.5),r.lineTo(16.8,37),r.lineTo(20.2,11),r.lineTo(21.8,9);else if(t===`HE`)r.moveTo(14,42),r.lineTo(14,20),r.quadraticCurveTo(14.4,11,19.6,8.6),r.lineTo(20.8,6.2),r.lineTo(25.2,6.2),r.lineTo(26.4,8.6),r.quadraticCurveTo(31.6,11,32,20),r.lineTo(32,42);else{let e=t===`APCR`?6:7;r.moveTo(23-e,42),r.lineTo(23-e,17),r.quadraticCurveTo(23-e*.82,8,23,4),r.quadraticCurveTo(23+e*.82,8,23+e,17),r.lineTo(23+e,42)}r.closePath()}if(i(),r.fillStyle=`rgba(238,244,250,0.86)`,r.fill(),t!==`APFSDS`&&(r.save(),i(),r.clip(),r.globalCompositeOperation=`destination-out`,t===`HEAT`?r.fillRect(15,23.5,16,1.6):r.fillRect(13,33.5,20,1.6),t===`HE`&&r.fillRect(13,29.5,20,1.2),r.restore()),t===`APFSDS`){r.fillStyle=`rgba(238,244,250,0.5)`;for(let e of[-1,1])r.beginPath(),r.moveTo(23+e*2.6,17),r.lineTo(23+e*7.2,24),r.lineTo(23+e*7.2,31),r.lineTo(23+e*3.2,27.5),r.closePath(),r.fill()}i(),r.strokeStyle=`rgba(8,12,16,0.7)`,r.lineWidth=1,r.stroke()}var hr=`
.cot-hud{position:fixed;inset:0;pointer-events:none;z-index:40;font-family:${w};isolation:isolate;
  --hud-panel:rgba(7,11,15,.92);--hud-edge:rgba(181,199,212,.32);
  --hud-muted:#93a3af;--hud-text:#e8f0f5;--hud-action:#f0a030;
  --hud-layer-world:6;--hud-layer-sight:8;--hud-layer-status:18;
  --hud-layer-controls:24;--hud-layer-score:30;
  -webkit-user-select:none;user-select:none;color:var(--hud-text);overflow:hidden;}
.cot-hud *{box-sizing:border-box;margin:0;padding:0;}
.cot-ret{position:absolute;z-index:var(--hud-layer-sight);inset:0;width:100%;height:100%;display:block;}
.cot-top{position:absolute;z-index:var(--hud-layer-score);top:0;left:50%;transform:translateX(-50%);width:min(344px,calc(100vw - 24px));
  min-height:62px;display:grid;grid-template-columns:minmax(78px,1fr) 86px minmax(78px,1fr);
  align-items:stretch;padding:0 25px 8px;isolation:isolate;overflow:hidden;
  background:linear-gradient(180deg,rgba(18,24,30,.98),rgba(7,10,14,.93));
  border:1px solid rgba(176,194,208,.34);border-top:none;
  box-shadow:inset 0 1px 0 rgba(239,247,252,.12),inset 0 -1px 0 rgba(0,0,0,.68);
  filter:drop-shadow(0 5px 11px rgba(0,0,0,.5));
  clip-path:polygon(0 0,100% 0,calc(100% - 25px) 100%,25px 100%);}
.cot-top::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;
  background:linear-gradient(90deg,rgba(126,232,126,.12),transparent 34%,transparent 66%,rgba(240,90,90,.12));}
.cot-top::after{content:none;}
.cot-top .sc,.cot-top .tm-block{position:relative;z-index:1;}
.cot-top .sc{display:grid;grid-template-rows:10px 1fr 7px;place-items:center;gap:1px;
  min-width:0;padding:6px 7px 5px;}
.cot-top .team-label,.cot-top .tm-label{font-family:${T};font-size:7.5px;font-weight:800;
  line-height:1;letter-spacing:.2em;text-transform:uppercase;color:#8f9eaa;white-space:nowrap;}
.cot-top .sc.ally .team-label{color:rgba(161,225,170,.76);}
.cot-top .sc.enemy .team-label{color:rgba(241,148,140,.76);}
.cot-top .fg,.cot-top .fe{font-family:${T};font-size:28px;font-weight:800;line-height:.96;
  letter-spacing:-.02em;font-variant-numeric:tabular-nums;text-shadow:0 2px 3px rgba(0,0,0,.72);}
.cot-top .fg{color:${gn};}
.cot-top .fe{color:${vn};}
.cot-top .tm-block{align-self:stretch;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:4px;padding:5px 9px 9px;
  background:linear-gradient(180deg,rgba(126,148,164,.11),rgba(2,5,8,.2));
  border-left:1px solid rgba(161,181,196,.16);border-right:1px solid rgba(161,181,196,.16);
  clip-path:polygon(0 0,100% 0,88% 100%,12% 100%);}
.cot-top .tm-label{color:#798996;letter-spacing:.24em;}
.cot-top .tm{font-size:18px;font-weight:750;color:#e2ebf2;letter-spacing:.08em;
  font-family:${T};text-shadow:0 1px 3px rgba(0,0,0,.9);
  font-variant-numeric:tabular-nums;line-height:1;}
/* One socket per opposing vehicle; kills illuminate outward from the clock. */
.cot-top .wedge{display:flex;gap:3px;align-items:center;min-width:0;}
.cot-top .wedge i{display:block;width:6px;height:6px;
  background:rgba(2,5,8,.9);border:1px solid rgba(150,166,180,.38);
  box-shadow:inset 0 1px 1px rgba(0,0,0,.72);}
.cot-top .wedge i.on{animation:cotChipIn .18s ease-out;
  background:rgba(134,232,134,.95);border-color:rgba(150,244,150,.95);
  box-shadow:0 0 4px rgba(126,232,126,.4);}
.cot-top .wedge.r i.on{background:rgba(242,110,100,.95);border-color:rgba(250,130,120,.95);
  box-shadow:0 0 4px rgba(240,90,90,.4);}
.cot-mode-status{position:absolute;z-index:var(--hud-layer-score);top:66px;left:50%;transform:translateX(-50%);
  min-height:28px;display:none;align-items:center;gap:8px;padding:5px 11px;color:#e8f0f5;
  background:rgba(7,11,15,.88);border:1px solid rgba(176,194,208,.28);box-shadow:0 5px 14px rgba(0,0,0,.38);
  font:800 8px ${T};letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;}
.cot-mode-status.show{display:flex}.cot-mode-status .mi,.cot-mode-status .mi svg{display:block;width:15px;height:15px}
.cot-mode-status .mi{color:#f0a030}.cot-mode-status .mv{color:#fff1d6;font-variant-numeric:tabular-nums}
.cot-mode-status .mb{margin-left:4px;padding:4px 8px 3px;min-height:24px;border:1px solid rgba(240,176,74,.5);border-radius:3px;
  background:rgba(240,160,48,.12);color:#ffd27a;font:inherit;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;
  pointer-events:auto;touch-action:none}
.cot-mode-status .mb[hidden]{display:none}.cot-mode-status .mb:hover{background:rgba(240,160,48,.24)}
@keyframes cotChipIn{from{opacity:0}to{opacity:1}}
/* Compact player telemetry. The engineering dashboard folds this strip into
   its richer top-right panel instead of allowing two readouts to overlap. */
.cot-net{position:absolute;z-index:var(--hud-layer-controls);top:8px;right:10px;display:flex;align-items:center;
  min-height:28px;padding:4px 8px;font-family:${T};font-variant-numeric:tabular-nums;
  background:linear-gradient(180deg,rgba(14,20,25,.82),rgba(5,9,12,.74));
  border:1px solid rgba(174,193,207,.22);box-shadow:0 5px 14px rgba(0,0,0,.22);
  text-transform:uppercase;text-shadow:0 1px 2px rgba(0,0,0,.85);}
.cot-net-unit{min-width:42px;display:grid;grid-template-columns:auto auto;align-items:baseline;
  justify-content:center;column-gap:4px;color:#dce6ed;}
.cot-net-unit+.cot-net-unit{margin-left:7px;padding-left:8px;border-left:1px solid rgba(171,190,204,.2);}
.cot-net .metric{font-size:11px;font-weight:800;line-height:1;letter-spacing:.02em;}
.cot-net .label{font-size:6.5px;font-weight:800;line-height:1;letter-spacing:.13em;color:#8494a0;}
.cot-net-unit.good .metric{color:#b9e7c0}.cot-net-unit.warn .metric{color:#ffd27a}
.cot-net-unit.bad .metric{color:#ff8c82}.cot-net-unit.local .metric{color:#b9c7d1;font-size:8px;letter-spacing:.08em}
body.cot-debug-hud .cot-net{display:none!important;}
/* Circular analog speedometer beside the damage schematic. The 270° sweep
   leaves a quiet lower gap for the numeric speed and physical limit. */
.cot-drive{position:absolute;z-index:var(--hud-layer-controls);left:169px;bottom:12px;
  width:108px;height:108px;border-radius:50%;pointer-events:none;overflow:hidden;
  contain:layout paint style;
  font-family:${T};font-variant-numeric:tabular-nums;color:#edf3f7;
  background:radial-gradient(circle at 50% 42%,rgba(24,32,38,.96),rgba(5,9,12,.93) 72%);
  border:1px solid rgba(190,204,214,.38);box-shadow:0 6px 22px rgba(0,0,0,.48),inset 0 0 16px rgba(0,0,0,.5);
  text-shadow:0 1px 2px rgba(0,0,0,.9);}
.cot-drive .dial{position:absolute;inset:5px;border-radius:50%;isolation:isolate;
  background:transparent;}
.cot-drive .dial::after{content:'';position:absolute;z-index:0;inset:7px;border-radius:50%;
  background:radial-gradient(circle at 48% 38%,#172027,#090e12 72%);
  border:1px solid rgba(191,207,219,.12);}
.cot-drive .arc{position:absolute;z-index:1;inset:0;width:100%;height:100%;overflow:visible;}
.cot-drive .arc circle{fill:none;stroke-width:3;}
.cot-drive .arc-track{stroke:rgba(131,149,162,.24);stroke-dasharray:75 25;}
.cot-drive .arc-value{stroke:#f1f5f7;stroke-dasharray:0 100;
  transition:stroke-dasharray .065s linear;}
.cot-drive .arc-red{stroke:#d94b4b;stroke-dasharray:15 85;stroke-dashoffset:-60;}
.cot-drive .ticks{position:absolute;z-index:2;inset:0;border-radius:50%;}
.cot-drive .ticks i{position:absolute;left:calc(50% - .5px);top:8px;width:1px;height:6px;
  transform-origin:50% 41px;transform:rotate(calc(-135deg + var(--tick) * 13.5deg));
  background:rgba(241,246,249,.88);box-shadow:0 0 2px rgba(255,255,255,.2);}
.cot-drive .ticks i:nth-child(5n + 1){left:calc(50% - 1px);width:2px;height:9px;background:#fff;}
.cot-drive .ticks i:nth-last-child(-n + 5){background:#e34f4f;box-shadow:0 0 3px rgba(227,79,79,.45);}
.cot-drive .needle{position:absolute;z-index:2;left:50%;top:50%;width:2px;height:35px;
  margin:-35px 0 0 -1px;transform-origin:50% 100%;rotate:-135deg;
  transition:rotate .05s linear;will-change:transform;
  background:linear-gradient(#ff7777,#d82f36);box-shadow:0 0 5px rgba(222,55,62,.62);}
.cot-drive .hub{position:absolute;z-index:4;left:50%;top:50%;width:8px;height:8px;
  margin:-4px 0 0 -4px;border-radius:50%;background:#f4f7f9;border:2px solid #b8393f;
  box-shadow:0 1px 4px rgba(0,0,0,.8);}
.cot-drive .speed{position:absolute;z-index:3;left:0;right:0;top:58px;text-align:center;
  font-size:26px;line-height:1;font-weight:780;letter-spacing:-.04em;}
.cot-drive .unit{position:absolute;z-index:3;left:0;right:0;top:84px;text-align:center;
  font-size:7px;font-weight:800;letter-spacing:.14em;color:#c1ccd4;}
.cot-drive .zero,.cot-drive .limit{position:absolute;z-index:3;bottom:17px;font-size:6.5px;
  line-height:1;}.cot-drive .zero{left:15px;color:#d8e1e7}.cot-drive .limit{right:13px;color:#ed6262}
@media (prefers-reduced-motion:reduce){
  .cot-drive .arc-value,.cot-drive .needle{transition:none;}
}
.cot-ear{position:absolute;z-index:var(--hud-layer-status);top:52px;width:194px;display:flex;flex-direction:column;gap:1px;}
.cot-ear.l{left:0;}
.cot-ear.r{right:0;}
.cot-ear .hd{font-size:9px;font-weight:800;letter-spacing:.22em;color:#95a4af;
  font-family:${T};
  text-transform:uppercase;padding:4px 10px;display:flex;justify-content:space-between;
  background:linear-gradient(180deg,rgba(13,19,24,.82),rgba(6,10,14,.68));}
.cot-ear.l .hd{border-left:2px solid rgba(126,232,126,.75);}
.cot-ear.r .hd{border-right:2px solid rgba(240,90,90,.75);text-align:right;}
.cot-er{display:flex;align-items:center;gap:5px;padding:3px 10px 4px 8px;font-size:11px;
  font-weight:600;letter-spacing:.02em;color:#d6e2ec;position:relative;
  text-shadow:0 1px 2px rgba(0,0,0,.85);}
/* r5: FLAT single translucent dark strips + a 1px separator line (WoT ears)
   — the old fade-to-transparent gradients read as glossy web chrome */
.cot-ear.l .cot-er{background:linear-gradient(90deg,rgba(7,10,14,.76),rgba(7,10,14,.56));
  border-left:2px solid rgba(126,232,126,.75);
  box-shadow:0 1px 0 rgba(0,0,0,.45);}
/* battle_hud r1: the right ear is a TRUE mirror of the left — row-reverse
   flips the flex order but not the padding, so the enemy silhouette sat
   10px off its edge vs the ally's 8px. Mirrored padding keeps both panels'
   row metrics identical. */
.cot-ear.r .cot-er{background:linear-gradient(270deg,rgba(7,10,14,.76),rgba(7,10,14,.56));padding:3px 8px 4px 10px;
  border-right:2px solid rgba(240,90,90,.75);flex-direction:row-reverse;
  box-shadow:0 1px 0 rgba(0,0,0,.45);}
.cot-er .ic{width:29px;height:14px;flex:0 0 auto;display:block;
  filter:drop-shadow(0 1px 1px rgba(0,0,0,.78));}
/* Generated side silhouettes face right. Mirror only the enemy ear so both
   rosters point inward toward the battlefield instead of toward the bezel. */
.cot-ear.r .cot-er .ic{transform:scaleX(-1);}
.cot-er .n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;
  display:flex;flex-direction:column;gap:0;line-height:1.15;}
.cot-ear.r .cot-er .n{text-align:right;align-items:flex-end;}
.cot-er .n .nick{font-size:10.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;
  white-space:nowrap;max-width:100%;}
.cot-er .n .veh{font-size:8.5px;font-weight:600;color:#8a97a3;letter-spacing:.05em;
  font-family:${T};text-transform:uppercase;
  max-width:100%;display:flex;gap:4px;align-items:baseline;}
.cot-ear.r .cot-er .n .veh{justify-content:flex-end;}
/* r7: BARE roman tier numeral next to the vehicle name (WoT) — the boxed
   badge chips read as foreign UI furniture in the blind side-by-side.
   battle_hud r1: the numeral gets a fixed column (min-width covers 'VIII')
   so tiers ALIGN down the panel instead of ragged-leading each name; on the
   right ear it mirrors to the outer edge (order swap) so both panels carry
   an aligned tier column on their outboard side. */
.cot-er .n .veh .tier{flex:0 0 auto;font-weight:800;color:#9fb0bf;
  font-style:normal;letter-spacing:.04em;min-width:23px;}
.cot-ear.r .cot-er .n .veh .tier{order:2;text-align:right;}
.cot-er .n .veh .vn{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-er.me .n .nick{color:#ffd27a;}
/* r5-2: per-row HP moved OFF the full-width underline (round critique:
   "thin HP strip under every row is XVM-mod flavor, not stock WoT") onto a
   slim vertical gauge hugging each row's INNER edge — quiet enough to pass
   as panel furniture, still carries the health read. Fill grows upward. */
.cot-er .hpm{position:absolute;top:2px;bottom:2px;width:3px;
  background:rgba(4,6,9,.55);display:flex;flex-direction:column;
  justify-content:flex-end;}
.cot-ear.l .cot-er .hpm{right:0;}
.cot-ear.r .cot-er .hpm{left:0;}
.cot-er .hpm i{display:block;width:100%;height:100%;}
.cot-ear.l .cot-er .hpm i{background:rgba(126,232,126,.75);}
.cot-ear.r .cot-er .hpm i{background:rgba(240,120,110,.75);}
.cot-er.unlit{opacity:.45;filter:saturate(.5);}
/* battle_hud r1: clearer dead-row read — the strike runs through BOTH name
   lines (nick + vehicle) and the row keeps enough alpha (.38 -> .45) for the
   red strike itself to stay legible; the side accent bar desaturates so
   living rows pop against the dead ones. */
.cot-er.dead{opacity:.45;}
.cot-er.dead .n .nick,.cot-er.dead .n .veh .vn{
  text-decoration:line-through;text-decoration-color:rgba(240,90,90,.85);}
.cot-ear.l .cot-er.dead{border-left-color:rgba(126,232,126,.3);}
.cot-ear.r .cot-er.dead{border-right-color:rgba(240,90,90,.3);}
.cot-er.dead .hpm{display:none;}
.cot-killfeed{position:absolute;z-index:var(--hud-layer-status);top:52px;left:210px;display:flex;flex-direction:column;
  gap:5px;align-items:flex-start;max-width:420px;}
.cot-kf{display:flex;gap:7px;align-items:baseline;padding:5px 16px 5px 12px;font-size:12.5px;
  letter-spacing:.03em;background:linear-gradient(270deg,rgba(8,12,16,0) 0%,rgba(8,12,16,.82) 26%);
  border-left:2px solid #f05a5a;text-shadow:0 1px 2px rgba(0,0,0,.8);
  transition:opacity var(--cot-motion-slow) var(--cot-ease-out);opacity:1;
  box-sizing:border-box;max-width:100%;min-width:0;overflow:hidden;white-space:nowrap;}
.cot-kf.out{opacity:0;}
.cot-kf .k,.cot-kf .v{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-kf .k{color:#cfe3f4;font-weight:600;}
.cot-kf .v{color:#f28f8f;font-weight:600;}
.cot-kf .d{color:#8a97a3;font-weight:500;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;flex:0 0 auto;}
.cot-kf .c{color:#f0b04a;font-size:10px;letter-spacing:.1em;font-weight:700;flex:0 0 auto;}
.cot-kf .si{width:30px;height:12px;flex:0 0 auto;align-self:center;display:inline-block;}
.cot-dmglayer{position:absolute;z-index:calc(var(--hud-layer-world) + 1);inset:0;}
/* Spectator command strip: battle-HUD steel, amber acquisition marks, and the
   shared icon set keep this state legible without covering the chase view. */
.cot-spec{position:absolute;z-index:var(--hud-layer-controls);left:50%;bottom:16px;transform:translate(-50%,14px);
  opacity:0;display:none;pointer-events:auto;align-items:stretch;overflow:hidden;
  grid-template-columns:88px minmax(210px,1fr) 164px 116px;column-gap:0;
  width:min(760px,calc(100vw - 32px));min-width:0;min-height:82px;
  color:#dce6ed;background:
    linear-gradient(112deg,rgba(17,25,31,.985),rgba(8,13,17,.98) 62%,rgba(13,19,24,.985));
  border:1px solid rgba(161,181,196,.32);
  box-shadow:0 16px 46px rgba(0,0,0,.64),inset 0 1px rgba(255,255,255,.035);
  padding:6px 7px 6px 6px;
  transition:opacity var(--cot-motion-slow) var(--cot-ease-out) var(--cot-motion-instant),
    transform var(--cot-motion-scene) var(--cot-ease-drawer) var(--cot-motion-instant);}
.cot-spec.show{display:grid;}
.cot-spec.in{opacity:1;transform:translate(-50%,0);}
.cot-spec .portrait{position:relative;display:grid;place-items:center;overflow:hidden;
  border:1px solid rgba(161,181,196,.2);border-right-color:rgba(240,160,48,.38);
  background:linear-gradient(145deg,rgba(99,119,133,.12),rgba(38,50,59,.035));}
.cot-spec .portrait img{display:block;width:80px;height:66px;object-fit:contain;
  filter:drop-shadow(0 6px 7px rgba(0,0,0,.68));}
.cot-spec .identity{display:flex;min-width:0;flex-direction:column;justify-content:center;padding:7px 15px;}
.cot-spec .spec-status{display:flex;align-items:center;gap:6px;margin-bottom:7px;font-family:${T};
  font-size:8px;font-weight:800;line-height:1;letter-spacing:.18em;text-transform:uppercase;color:#f0b04a;}
.cot-spec .spec-status svg{width:13px;height:13px;display:block;flex:0 0 auto;}
.cot-spec .spec-status::after{content:"";width:18px;height:1px;background:rgba(240,176,74,.55);}
.cot-spec .spec-status .idx{margin-left:1px;color:#8998a4;font-size:8px;font-weight:800;
  letter-spacing:.12em;font-variant-numeric:tabular-nums;}
.cot-spec .who{display:flex;width:100%;min-width:0;flex-direction:column;}
.cot-spec .who b{font-size:18px;line-height:1.05;font-weight:800;color:#f2f7fb;letter-spacing:.01em;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cot-spec .who span{margin-top:6px;font-family:${T};font-weight:700;font-size:9px;line-height:1;
  letter-spacing:.14em;color:#aab8c2;text-transform:uppercase;white-space:nowrap;
  overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums;}
@keyframes cotSpecSw{0%{opacity:.2;transform:translateY(4px);}100%{opacity:1;transform:none;}}
.cot-spec .who.sw{animation:cotSpecSw var(--cot-motion-base) var(--cot-ease-out);}
.cot-spec .switch{align-self:center;justify-self:center;width:136px;height:48px;display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:1fr;grid-auto-flow:column;
  overflow:hidden;border:1px solid rgba(176,192,204,.22);border-radius:3px;
  background:linear-gradient(180deg,rgba(139,157,171,.075),rgba(54,68,78,.035));
  box-shadow:inset 0 1px rgba(255,255,255,.025);}
.cot-spec .cycle{min-width:0;display:flex;align-items:center;justify-content:center;gap:7px;
  flex-flow:row nowrap;padding:0 10px;font-family:${T};text-transform:uppercase;color:#a9b6c0;cursor:pointer;
  border:0;border-radius:0;background:transparent;
  transition:transform var(--cot-motion-fast) var(--cot-ease-out),
    background-color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    color var(--cot-motion-fast) ease;}
.cot-spec .cycle+.cycle{border-left:1px solid rgba(176,192,204,.18);}
.cot-spec .cycle-icon{display:grid;place-items:center;color:#e2ebf1;opacity:.82;
  transition:transform var(--cot-motion-fast) var(--cot-ease-out),
    color var(--cot-motion-fast) ease,opacity var(--cot-motion-fast) ease;}
.cot-spec .cycle-icon svg{display:block;width:12px;height:12px;}
.cot-spec .cycle kbd{width:24px;height:24px;display:grid;place-items:center;padding:0;
  font:800 10px/1 ui-monospace,SFMono-Regular,monospace;color:#ffc76b;
  border:1px solid rgba(240,176,74,.38);border-bottom-color:rgba(240,176,74,.6);border-radius:2px;
  background:linear-gradient(180deg,rgba(240,176,74,.15),rgba(240,160,48,.055));
  box-shadow:inset 0 1px rgba(255,229,182,.1),0 2px 0 rgba(3,6,9,.78);
  transition:transform var(--cot-motion-instant) var(--cot-ease-out);}
.cot-spec .cycle:active{transform:scale(.97);}
.cot-spec .cycle:focus-visible,.cot-spec .gar:focus-visible{outline:2px solid #d9e4eb;
  outline-offset:2px;}
.cot-spec .gar{align-self:center;height:48px;display:flex;align-items:center;justify-content:center;gap:8px;margin:0 8px 0 0;
  padding:0 10px;font-family:${T};font-weight:800;font-size:9px;letter-spacing:.13em;
  text-transform:uppercase;color:#f0b04a;cursor:pointer;border:1px solid rgba(240,176,74,.48);border-radius:2px;
  background:linear-gradient(180deg,rgba(240,160,48,.16),rgba(240,160,48,.06));white-space:nowrap;
  box-shadow:inset 0 1px rgba(255,224,166,.06),0 5px 18px rgba(0,0,0,.16);
  transition:transform var(--cot-motion-fast) var(--cot-ease-out),
    background-color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    color var(--cot-motion-fast) ease;}
.cot-spec .gar-icon,.cot-spec .gar-icon svg{display:block;width:19px;height:19px;}
.cot-spec .gar:active{transform:scale(.97);}
@media (hover:hover) and (pointer:fine){
  .cot-spec .cycle:hover{background:rgba(146,164,180,.12);color:#f2f7fb;}
  .cot-spec .cycle:hover .cycle-icon{color:#f0b04a;opacity:1;}
  .cot-spec .cycle:hover kbd{color:#ffd995;border-color:rgba(240,176,74,.72);
    background:linear-gradient(180deg,rgba(240,176,74,.23),rgba(240,160,48,.09));}
  .cot-spec .cycle.prev:hover .cycle-icon{transform:translateX(-2px);}
  .cot-spec .cycle.next:hover .cycle-icon{transform:translateX(2px);}
  .cot-spec .gar:hover{background:rgba(240,160,48,.22);border-color:rgba(240,176,74,.8);color:#ffd27a;}
}
.cot-spec .cycle:active kbd{transform:translateY(1px);box-shadow:inset 0 1px rgba(255,229,182,.06),0 1px 0 rgba(3,6,9,.78);}
@media (prefers-reduced-motion:reduce){
  .cot-top .wedge i.on,.cot-spec,.cot-spec .who.sw,.cot-spec .cycle,.cot-spec .gar{
    animation:none;transition:none;}
}
/* while spectating, the DEAD player's own-tank furniture is meaningless and
   collides with the bar — shell tray, damage panel (+ its camo lamp) and the
   reticle canvas hide; team panels / minimap / killfeed stay (that is the
   information a spectator wants). Removed with the bar (spectate:end). */
body.cot-spectating .cot-shells,body.cot-spectating .cot-special,body.cot-spectating .cot-dp,
body.cot-spectating .cot-drive,
body.cot-spectating .cot-ret,body.cot-spectating .cot-camoind{display:none !important;}
.cot-dmgnum{position:absolute;font-family:${T};font-weight:900;font-size:18px;
  letter-spacing:-.02em;color:#ffd166;white-space:nowrap;text-transform:uppercase;
  text-shadow:-1px 0 #05080b,1px 0 #05080b,0 -1px #05080b,0 2px #05080b;
  animation:cotFloat 1.7s cubic-bezier(.2,.6,.3,1) forwards;will-change:transform,opacity;}
.cot-dmgnum.miss{color:#bcc8d2;font-size:13px;font-weight:850;letter-spacing:.1em;}
.cot-dmgnum .crit{position:absolute;left:50%;bottom:calc(100% + 1px);transform:translateX(-50%);
  font-size:10px;font-weight:900;letter-spacing:.12em;color:#ff9b72;margin:0;}
@keyframes cotFloat{0%{opacity:0;transform:translate(-50%,-30%)}10%{opacity:1}
  70%{opacity:.95}100%{opacity:0;transform:translate(-50%,-190%)}}
.cot-alert{position:absolute;z-index:var(--hud-layer-controls);left:50%;bottom:23%;max-width:calc(100vw - 32px);min-height:38px;
  display:flex;align-items:center;justify-content:center;gap:8px;padding:8px 14px;
  transform:translate(-50%,7px);font-family:${T};font-size:12px;font-weight:800;
  letter-spacing:.14em;text-align:center;text-transform:uppercase;color:#ffd27a;white-space:nowrap;
  background:linear-gradient(100deg,rgba(7,11,15,.95),rgba(15,21,26,.91));
  border:1px solid rgba(184,201,214,.3);border-bottom:2px solid rgba(240,160,48,.72);
  box-shadow:0 9px 24px rgba(0,0,0,.38),inset 0 1px rgba(255,255,255,.035);
  text-shadow:0 1px 3px rgba(0,0,0,.9);opacity:0;
  transition:opacity var(--cot-motion-base) var(--cot-ease-out),
    transform var(--cot-motion-base) var(--cot-ease-out);}
.cot-alert-icon{width:18px;height:18px;display:grid;place-items:center;flex:0 0 auto;}
.cot-alert-icon svg{display:block;width:18px;height:18px;}
.cot-alert-copy{min-width:0;overflow:hidden;text-overflow:ellipsis;}
.cot-alert.danger{color:#ff9b91;border-bottom-color:#ef6157;}
.cot-alert.success{color:#a8e8b2;border-bottom-color:#68cf78;}
.cot-alert.info{color:#cbd8e2;border-bottom-color:#8fa3b4;}
/* respawn (owner 2026-09-15): in a mode that revives the player the death is a count, not a
   hand-off — kicker + numeral in the pre-battle style, a little lower so the wreck stays visible.
   Hidden the instant the revive lands (mode:respawn) or the battle ends. */
.cot-revive{position:absolute;z-index:var(--hud-layer-status);left:50%;top:30%;transform:translateX(-50%);
  width:min(390px,calc(100vw - 32px));display:grid;grid-template-rows:30px 92px;row-gap:7px;
  justify-items:center;text-align:center;pointer-events:none;
  opacity:0;transition:opacity var(--cot-motion-fast) var(--cot-ease-out);}
.cot-revive.on{opacity:1;}
.cot-revive .k{display:inline-block;padding:7px 18px 6px;font-family:${T};font-size:17px;font-weight:900;
  line-height:1;letter-spacing:.3em;text-indent:.3em;text-transform:uppercase;color:#ffe0a2;
  text-shadow:-1px -1px 0 rgba(4,7,10,.98),1px -1px 0 rgba(4,7,10,.98),-1px 1px 0 rgba(4,7,10,.98),1px 1px 0 rgba(4,7,10,.98),
    0 2px 8px rgba(0,0,0,.9),0 0 16px rgba(240,160,48,.24);}
.cot-revive .n{font-family:${T};font-size:84px;font-weight:900;line-height:92px;color:#f6f1e6;
  text-shadow:-2px -2px 0 rgba(4,7,10,.98),2px -2px 0 rgba(4,7,10,.98),-2px 2px 0 rgba(4,7,10,.98),2px 2px 0 rgba(4,7,10,.98),
    0 3px 14px rgba(0,0,0,.9);}
/* battle_countdown r3: WoT-style pre-battle freeze — kicker + big numeral,
   center-upper so it never fights the reticle. The numeral pops on each
   second via a keyed scale animation; the release swaps to ROLL OUT! and
   fades. Both lines use dark text edges instead of backdrops so terrain stays
   visible behind them. Fixed grid rows keep the numeral anchored while the
   kicker hides for rollout. Pure overlay: pointer-events none, no page layout impact. */
.cot-prebattle{position:absolute;z-index:var(--hud-layer-status);left:50%;top:22%;transform:translateX(-50%);
  width:min(390px,calc(100vw - 32px));display:grid;grid-template-columns:minmax(0,1fr);
  grid-template-rows:30px 92px auto;
  row-gap:7px;justify-items:center;text-align:center;pointer-events:none;
  opacity:0;transition:opacity var(--cot-motion-slow) var(--cot-ease-out);}
.cot-prebattle.on{opacity:1;}
.cot-prebattle .k{display:inline-block;padding:7px 18px 6px;font-family:${T};
  font-size:17px;font-weight:900;line-height:1;letter-spacing:.3em;text-indent:.3em;
  text-transform:uppercase;color:#ffe0a2;
  text-shadow:-1px -1px 0 rgba(4,7,10,.98),1px -1px 0 rgba(4,7,10,.98),
    -1px 1px 0 rgba(4,7,10,.98),1px 1px 0 rgba(4,7,10,.98),
    0 2px 8px rgba(0,0,0,.9),0 0 16px rgba(240,160,48,.24);
  transition:opacity var(--cot-motion-fast) var(--cot-ease-out);}
.cot-prebattle.rollout .k{visibility:hidden;opacity:0;}
.cot-prebattle .r{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 6px;max-width:100%;margin-top:2px;
  transition:opacity var(--cot-motion-fast) var(--cot-ease-out);}
.cot-prebattle .r:empty{display:none}
.cot-prebattle .r span{padding:3px 8px 2px;border:1px solid rgba(240,200,120,.42);border-radius:3px;
  background:rgba(6,9,13,.72);font-family:${T};font-size:10px;font-weight:800;letter-spacing:.1em;
  text-transform:uppercase;color:#f2d9a6;text-shadow:0 1px 3px rgba(0,0,0,.9);}
.cot-prebattle.rollout .r,.cot-prebattle.waiting .r{visibility:hidden;opacity:0;}
.cot-prebattle .n{width:100%;height:92px;display:flex;align-items:center;justify-content:center;
  font-family:${w};font-size:92px;
  font-weight:800;line-height:1;color:#ffd27a;font-variant-numeric:tabular-nums;
  text-shadow:-2px -2px 0 rgba(4,7,10,.98),0 -2px 0 rgba(4,7,10,.98),
    2px -2px 0 rgba(4,7,10,.98),2px 0 0 rgba(4,7,10,.98),
    2px 2px 0 rgba(4,7,10,.98),0 2px 0 rgba(4,7,10,.98),
    -2px 2px 0 rgba(4,7,10,.98),-2px 0 0 rgba(4,7,10,.98),
    0 2px 10px rgba(0,0,0,.85),0 0 34px rgba(240,160,48,.35);}
.cot-prebattle .n.tick{animation:cot-pb-pop var(--cot-motion-slow) var(--cot-ease-out);}
.cot-prebattle .n.tick-alt{animation:cot-pb-pop-alt var(--cot-motion-slow) var(--cot-ease-out);}
.cot-prebattle .n.go{font-size:64px;letter-spacing:.12em;text-indent:.12em;color:#ffe4b0;}
.cot-prebattle.waiting .n{font-size:48px;letter-spacing:.12em;text-indent:.12em;}
.cot-prebattle.waiting .k{font-size:14px;letter-spacing:.16em;text-indent:.16em;}
@keyframes cot-pb-pop{from{transform:scale(1.28);opacity:.4;}to{transform:scale(1);opacity:1;}}
@keyframes cot-pb-pop-alt{from{transform:scale(1.28);opacity:.4;}to{transform:scale(1);opacity:1;}}
.cot-alert.show{opacity:1;transform:translate(-50%,0);}
.cot-jump{position:absolute;z-index:var(--hud-layer-controls);left:50%;bottom:150px;transform:translateX(-50%);display:none;align-items:center;gap:8px;padding:6px 12px;border:1px solid rgba(255,255,255,.28);border-radius:6px;background:rgba(10,12,14,.55);color:#e8e6df;font:600 12px/1 var(--hud-font,system-ui);letter-spacing:.14em;text-transform:uppercase;pointer-events:none}
.cot-jump.on{display:flex}
.cot-jump .sk{padding:2px 6px;border:1px solid rgba(255,255,255,.5);border-radius:4px;font-weight:700}
.cot-special{position:absolute;z-index:var(--hud-layer-controls);left:50%;bottom:88px;transform:translateX(-50%);
  min-width:164px;min-height:42px;padding:5px 12px 5px 8px;display:none;
  grid-template-columns:24px 1fr auto;align-items:center;gap:7px;pointer-events:auto;
  cursor:pointer;color:#dce7ef;background:linear-gradient(180deg,rgba(22,30,36,.96),var(--hud-panel));
  border:1px solid var(--hud-edge);border-bottom:2px solid rgba(184,201,214,.45);border-radius:2px;
  box-shadow:0 5px 16px rgba(0,0,0,.42),inset 0 1px rgba(255,255,255,.045);
  font-family:${T};text-transform:uppercase;
  transition:transform .1s ease-out,border-color .12s ease,color .12s ease,background-color .12s ease;}
.cot-special.show{display:grid;}
.cot-special:hover{border-color:rgba(240,176,74,.72);color:#ffd27a;}
.cot-special:active{transform:translateX(-50%) scale(.97);}
.cot-special.active{border-color:#f0a030;color:#ffd27a;background:linear-gradient(180deg,rgba(54,39,15,.95),rgba(21,14,7,.97));
  box-shadow:0 0 16px rgba(240,160,48,.3);}
.cot-special.empty{color:#69737b;border-color:rgba(105,115,123,.34);
  background:linear-gradient(180deg,rgba(22,25,28,.94),rgba(10,12,14,.96));box-shadow:none;}
.cot-special.empty .si{filter:grayscale(1);opacity:.42;}
.cot-special.deny{animation:cotAmmoDeny .34s ease-out 2;}
.cot-special.pending .si{animation:cotSpecialPulse .8s ease-in-out infinite alternate;}
.cot-special .si{display:flex;align-items:center;justify-content:center;}
.cot-special .si svg{width:22px;height:22px;display:block;}
.cot-special .sl{font-size:9px;font-weight:800;letter-spacing:.13em;white-space:nowrap;text-align:left;}
.cot-special .sk{font-size:9px;font-weight:800;color:#9fb0bf;border:1px solid rgba(146,164,180,.42);
  padding:1px 4px;line-height:13px;}
.cot-special.active .sk{color:#ffd27a;border-color:rgba(240,176,74,.6);}
.cot-special:focus-visible,.cot-shell:focus-visible,.cot-con:focus-visible{outline:2px solid #f5c36d;outline-offset:2px;}
@keyframes cotSpecialPulse{from{opacity:.45}to{opacity:1}}
.cot-shells{position:absolute;z-index:var(--hud-layer-controls);bottom:16px;left:50%;transform:translateX(-50%);display:flex;
  gap:6px;pointer-events:auto;align-items:flex-end;}
/* The reticle already prints SWITCHING; this live region must not occupy the
   special-action control's space above the ammo tray. */
.cot-ammo-switching{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);
  white-space:nowrap;pointer-events:none;}
.cot-shell{width:64px;height:64px;background:linear-gradient(180deg,rgba(14,19,24,.92),rgba(8,11,14,.95));
  border:1px solid rgba(146,164,180,.28);border-bottom:2px solid rgba(146,164,180,.28);
  appearance:none;color:inherit;font:inherit;padding:0;cursor:pointer;position:relative;
  box-shadow:inset 0 1px rgba(255,255,255,.035),0 4px 13px rgba(0,0,0,.26);
  transition:border-color .12s,background .12s,transform .1s ease-out;}
.cot-shell:active{transform:scale(.97);}
.cot-shell.sel{border-color:#f0a030;border-bottom-color:#f0a030;
  background:linear-gradient(180deg,rgba(34,26,12,.9),rgba(18,13,7,.92));
  box-shadow:0 0 14px rgba(240,160,48,.25);}
.cot-shell.empty{color:#657079;border-color:rgba(105,115,123,.28);border-bottom-color:rgba(105,115,123,.28);
  background:linear-gradient(180deg,rgba(22,25,28,.91),rgba(10,12,14,.95));box-shadow:none;}
.cot-shell.empty canvas,.cot-shell.empty .ty,.cot-shell.empty .clr{filter:grayscale(1);opacity:.34;}
.cot-shell.empty .cnt,.cot-shell.empty .key{color:#66717a;border-color:rgba(105,115,123,.3);}
.cot-shell.deny{animation:cotAmmoDeny .34s ease-out 2;}
@keyframes cotAmmoDeny{0%,100%{border-color:rgba(105,115,123,.32);box-shadow:none}
  45%{border-color:#ff4338;background:linear-gradient(180deg,rgba(82,15,12,.96),rgba(32,7,6,.98));
    color:#ff8d84;box-shadow:0 0 18px rgba(255,54,45,.58)}}
/* r6-2: thin SHELL-CLASS color underline inside each ammo slot (silver
   kinetic / orange HEAT / olive HE) — class reads without the text label */
.cot-shell .clr{position:absolute;left:0;right:0;bottom:0;height:2px;z-index:2;
  background:rgba(146,164,180,.4);}
.cot-shell.sel .clr{bottom:0;}
.cot-shell canvas{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}
.cot-shell .key{position:absolute;top:2px;left:3px;font-size:9.5px;font-weight:700;color:#8a97a3;
  font-family:${T};letter-spacing:-.01em;
  border:1px solid rgba(146,164,180,.4);padding:0 3.5px;line-height:13px;z-index:2;}
.cot-shell.sel .key{color:#f0b04a;border-color:rgba(240,176,74,.6);}
.cot-shell .cnt{position:absolute;bottom:1px;right:4px;font-size:13px;font-weight:700;
  font-family:${T};
  color:#e6edf3;font-variant-numeric:tabular-nums;letter-spacing:.02em;z-index:2;
  text-shadow:0 1px 2px rgba(0,0,0,.9);}
.cot-shell .ty{position:absolute;bottom:2px;left:4px;font-size:8px;font-weight:800;
  font-family:${T};
  letter-spacing:.08em;z-index:2;text-shadow:0 1px 2px rgba(0,0,0,.9);}
.cot-shell .cool{position:absolute;left:0;right:0;top:0;height:0;
  background:rgba(4,6,9,.72);pointer-events:none;z-index:3;}
.cot-shell .tip{display:none;position:absolute;bottom:70px;left:50%;transform:translateX(-50%);
  white-space:nowrap;background:rgba(7,10,14,.94);border:1px solid rgba(146,164,180,.4);
  padding:5px 9px 6px;font-size:10.5px;color:#c6d2dc;letter-spacing:.04em;z-index:5;
  box-shadow:0 4px 14px rgba(0,0,0,.5);text-align:center;}
.cot-shell .tip b{color:#e6edf3;font-weight:600;}
.cot-shell .tip .tnm{font-size:11px;font-weight:600;color:#eef4f9;margin-bottom:2px;}
@media (hover:hover) and (pointer:fine){
  .cot-shell:hover{border-color:rgba(210,225,240,.5);}
  .cot-shell:hover .tip{display:block;}
}
/* Equipment uses the same target size as ammo so every bottom-tray action is
   equally easy to acquire. The divider and smaller pictograms preserve the
   ammo/equipment grouping without shrinking the buttons themselves. */
.cot-consep{width:1px;align-self:stretch;background:rgba(146,164,180,.3);margin:2px 6px;}
/* MOBILE-UX r1: the consumables live in their own container so the mobile
   tier can re-park them as a right-edge thumb column (touchControls.ts).
   display:contents = the wrapper generates NO box on desktop — the slots
   stay direct flex items of the tray, pixel-identical to the old markup. */
.cot-cons{display:contents;}
.cot-con{width:64px;height:64px;position:relative;cursor:pointer;
  background:linear-gradient(180deg,rgba(14,19,24,.92),rgba(8,11,14,.95));
  border:1px solid rgba(146,164,180,.28);border-bottom:2px solid rgba(146,164,180,.28);
  appearance:none;color:inherit;font:inherit;padding:0;display:flex;align-items:center;justify-content:center;
  box-shadow:inset 0 1px rgba(255,255,255,.035),0 4px 13px rgba(0,0,0,.26);
  transition:border-color .12s,transform .1s ease-out;}
.cot-con svg{width:26px;height:26px;display:block;}
.cot-con:active{transform:scale(.97);}
@media (hover:hover) and (pointer:fine){.cot-con:hover{border-color:rgba(210,225,240,.5);}}
.cot-con .key{position:absolute;top:3px;left:4px;font-size:9px;font-weight:700;color:#8a97a3;
  font-family:${T};letter-spacing:-.01em;
  border:1px solid rgba(146,164,180,.4);padding:0 3px;line-height:12px;z-index:2;}
.cot-con .cnt{position:absolute;bottom:2px;right:4px;font-size:11px;font-weight:700;
  font-family:${T};letter-spacing:-.01em;color:#cfd9e2;
  font-variant-numeric:tabular-nums;text-shadow:0 1px 2px rgba(0,0,0,.9);z-index:2;}
.cot-con .cool{position:absolute;inset:0;display:none;
  background:conic-gradient(rgba(4,6,9,.82) var(--cool,0%),transparent 0);z-index:1;pointer-events:none;}
.cot-con.cooling{border-color:rgba(118,137,153,.38);cursor:not-allowed;}
.cot-con.used{opacity:.35;filter:grayscale(1);}
.cot-con.deny{animation:cotConDeny .3s;}
@keyframes cotConDeny{0%,100%{border-color:rgba(146,164,180,.28);}50%{border-color:rgba(240,90,90,.9);}}
.cot-hpbars{position:absolute;z-index:var(--hud-layer-world);inset:0;}
.cot-hpb{position:absolute;width:128px;height:31px;text-align:center;will-change:transform;
  contain:layout paint style;transform:translate3d(0,0,0);}
.cot-hpb .nm{height:21px;padding:2px 7px 3px;font-size:11px;font-weight:750;letter-spacing:.045em;color:#ff746a;
  font-family:${T};
  text-shadow:0 1px 2px rgba(0,0,0,.92),0 0 3px rgba(0,0,0,.68);white-space:nowrap;
  display:flex;align-items:center;justify-content:center;gap:5px;
  background:none;}
.cot-hpb.ally .nm{color:#9af09a;}
.cot-hpb .nm .si{width:26px;height:11px;flex:0 0 auto;display:block;}
.cot-hpb .nm span{min-width:0;flex:0 0 auto;overflow:visible;text-overflow:clip;}
.cot-hpb .tr{height:6px;margin:0 7px;background:rgba(4,6,8,.94);border:1px solid rgba(0,0,0,.9);
  box-shadow:0 2px 4px rgba(0,0,0,.72);position:relative;overflow:hidden;}
.cot-hpb .fl{height:100%;background:linear-gradient(90deg,#d63a30,#ff746a);transition:width .15s linear;}
.cot-hpb.ally .fl{background:linear-gradient(180deg,#9df09d,#3fae3f);}
.cot-hpb::after{content:"";display:block;width:0;height:0;margin:1px auto 0;
  border-left:4px solid transparent;border-right:4px solid transparent;
  border-top:5px solid rgba(255,116,106,.9);filter:drop-shadow(0 1px 1px #000);}
.cot-hpb.ally::after{border-top-color:rgba(154,240,154,.9);}
/* Over-target marker: a stable-height instrument follows the exact projected
   turret roof. Width changes only when its target copy changes, preserving
   complete names without causing steady-state frame reflow. */
.cot-tgt{position:absolute;z-index:var(--hud-layer-world);width:176px;height:64px;text-align:center;display:none;
  will-change:transform;contain:layout paint style;transform:translate3d(0,0,0);}
.cot-tgt .bk{height:64px;padding:4px 8px 3px;background:none;}
/* Tight glyph shadows preserve contrast without painting a dark rectangle
   across the battlefield behind the whole label.
   r7-2: nickname in WoT crimson (#fa5252) — the salmon-pink read as damage
   text, not an enemy nameplate. */
.cot-tgt .nick{height:17px;font-size:13px;font-weight:750;color:#ff6a60;letter-spacing:.025em;
  white-space:nowrap;overflow:visible;text-overflow:clip;
  text-shadow:0 1px 2px rgba(0,0,0,.9),0 0 3px rgba(0,0,0,.65);}
.cot-tgt .vrow{height:17px;display:grid;grid-template-columns:30px 18px max-content;
  align-items:center;justify-content:center;gap:4px;margin-top:1px;}
.cot-tgt .cg{display:inline-flex;align-items:center;
  filter:drop-shadow(0 1px 1px rgba(0,0,0,.7));}
.cot-tgt .cg{justify-content:flex-end;}.cot-tgt .cg svg{display:block;}
.cot-tgt .tier{font-size:9px;font-weight:800;line-height:1;color:#e8bcb5;
  font-family:${T};letter-spacing:.04em;
  text-shadow:0 1px 2px rgba(0,0,0,.75),0 0 6px rgba(0,0,0,.5);}
.cot-tgt .veh{font-size:10px;font-weight:750;color:#f0d4ce;letter-spacing:.075em;text-align:left;
  font-family:${T};text-transform:uppercase;
  white-space:nowrap;overflow:visible;text-overflow:clip;
  text-shadow:0 1px 2px rgba(0,0,0,.86),0 0 3px rgba(0,0,0,.58);}
/* r7-2 (round critique: "thick full-width red bar + separate 1000/1000 line
   makes the plate feel oversized"): the HP bar slims to ~60% plate width at
   4px and the WHITE numerals move INLINE to its right — one quiet gauge
   line instead of two stacked rows. */
.cot-tgt .hrow{height:16px;display:grid;grid-template-columns:104px 44px;align-items:center;
  justify-content:center;gap:6px;margin-top:2px;}
.cot-tgt .tr{height:6px;width:104px;background:rgba(4,6,8,.92);
  border:1px solid rgba(0,0,0,.9);box-shadow:0 1px 3px rgba(0,0,0,.7);}
.cot-tgt .fl{height:100%;background:linear-gradient(180deg,#ff7a6e,#d63a30);}
.cot-tgt .hp{width:44px;font-size:9.5px;font-weight:700;color:rgba(255,255,255,.92);line-height:1;
  font-family:${T};font-variant-numeric:tabular-nums;
  letter-spacing:.04em;
  text-shadow:0 1px 2px rgba(0,0,0,.75),0 0 6px rgba(0,0,0,.5);}
/* r5: anchor chevron — small downward triangle tying the plate to its
   vehicle (the plate floated context-free above the turret before) */
.cot-tgt .anch{width:0;height:0;margin:3px auto 0;
  border-left:5px solid transparent;border-right:5px solid transparent;
  border-top:6px solid rgba(255,120,110,.95);
  filter:drop-shadow(0 1px 1px rgba(0,0,0,.65));}
.cot-minimap{position:absolute;z-index:var(--hud-layer-controls);right:16px;bottom:16px;width:220px;height:220px;
  border:1px solid rgba(222,234,246,.46);border-radius:3px;
  box-shadow:0 0 0 1px rgba(0,0,0,.62),0 0 0 3px rgba(20,26,30,.55),0 10px 28px rgba(0,0,0,.6),inset 0 0 0 1px rgba(255,255,255,.07);
  background:#0d1310;}
.cot-minimap canvas{display:block;width:100%;height:100%;}
/* Detection is one compact instrument, revealed after the authoritative
   sixth-sense delay. A finite entry sweep replaces the old forever-pulsing
   bulb, keeping motion quiet while the state remains active. */
.cot-sixth{position:absolute;z-index:var(--hud-layer-controls);top:12%;left:50%;
  width:min(248px,calc(100vw - 28px));min-height:48px;transform:translate(-50%,-6px);
  display:grid;grid-template-columns:42px minmax(0,1fr);align-items:center;
  color:#ffd46f;background:linear-gradient(105deg,rgba(29,22,8,.96),rgba(9,13,17,.94));
  border:1px solid rgba(240,184,72,.5);border-bottom:2px solid #e9ad3e;
  box-shadow:0 10px 28px rgba(0,0,0,.45),inset 0 1px rgba(255,226,181,.06);
  opacity:0;transition:opacity var(--cot-motion-fast) var(--cot-ease-out),
    transform var(--cot-motion-base) var(--cot-ease-out);pointer-events:none;}
.cot-sixth.on{opacity:1;transform:translate(-50%,0);
  animation:cotDetectedIn var(--cot-motion-slow) var(--cot-ease-out) 1;}
.cot-sixth .sig{height:100%;display:grid;place-items:center;color:#ffd05c;
  border-right:1px solid rgba(240,184,72,.32);background:rgba(240,184,72,.09);}
.cot-sixth .sig svg{width:24px;height:24px;display:block;filter:drop-shadow(0 0 7px rgba(255,202,72,.46));}
.cot-sixth .copy{min-width:0;padding:7px 12px 8px;display:flex;flex-direction:column;gap:3px;}
.cot-sixth .lb{font:850 12px/1 ${T};letter-spacing:.23em;text-transform:uppercase;color:#ffd46f;}
.cot-sixth .sub{font:700 8px/1 ${T};letter-spacing:.16em;text-transform:uppercase;color:#aebbc5;}
@keyframes cotDetectedIn{0%{clip-path:inset(0 50% 0 50%)}100%{clip-path:inset(0)}}
/* Concealment is a quiet positive-state chip on the damage panel. Detection
   belongs exclusively to the authoritative sixth-sense instrument above, so
   the same threat is never presented twice. */
.cot-camoind{position:absolute;bottom:150px;left:14px;width:46px;height:40px;
  display:flex;align-items:center;justify-content:center;pointer-events:none;}
.cot-camoind.onpanel{left:-1px;top:-29px;bottom:auto;width:36px;height:29px;
  background:linear-gradient(180deg,rgba(12,17,22,.9),rgba(8,11,15,.78));
  border:1px solid rgba(146,164,180,.25);border-bottom:none;}
.cot-camoind.onpanel svg{width:21px;height:21px;}
.cot-camoind svg{display:block;flex:0 0 auto;transition:opacity .2s;
  filter:drop-shadow(0 1px 2px rgba(0,0,0,.85));}
/* camo_spotting r2: brighter concealed glow — the dim green closed eye was
   nearly invisible against bright terrain at 1080p */
.cot-camoind.hidden-in-bush svg{
  filter:drop-shadow(0 0 6px rgba(120,225,140,.75)) drop-shadow(0 1px 2px rgba(0,0,0,.85));}
.cot-camoind.conceal-pulse{animation:cotConcealPulse .7s ease-out 1;}
@keyframes cotConcealPulse{0%{transform:scale(1)}35%{transform:scale(1.3)}100%{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){
  .cot-sixth.on,.cot-camoind.conceal-pulse{animation:none;}
}
`;function gr(e){return e==null||!isFinite(e)?yn:e>=1.15?gn:e>=.85?_n:vn}function _r(e){let t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`}function vr(e){ie(),re(`cot-hud-style`,hr);let s=C(`div`,`cot-hud`);document.body.appendChild(s),Le(s);let l=C(`canvas`,`cot-ret`,s),w=mn(l),E=(t,n)=>e.on(t,e=>n(e)),ae=typeof window.matchMedia==`function`?window.matchMedia(`(prefers-reduced-motion: reduce)`):null,oe=C(`div`,`cot-hpbars`,s),se=C(`div`,`cot-dmglayer`,s),D=C(`div`,`cot-tgt`,s);D.innerHTML=`<div class="bk"><div class="nick"></div><div class="vrow"><span class="cg"></span><span class="tier"></span><span class="veh"></span></div><div class="hrow"><div class="tr"><div class="fl"></div></div><div class="hp"></div></div><div class="anch"></div></div>`;let O={nick:F(D,`.nick`),tier:F(D,`.tier`),veh:F(D,`.veh`),fl:F(D,`.fl`),hp:F(D,`.hp`),cg:F(D,`.cg`)},ce=null,le=!1,de=null,pe=176,me=null,he=null,be=!1,xe=null,De=C(`div`,`cot-top`,s);De.innerHTML=`<div class="sc ally"><span class="team-label">${n(`hud.team.ally`)}</span><b class="fg">0</b><div class="wedge l"></div></div><div class="tm-block"><span class="tm-label">${n(`hud.team.time`)}</span><span class="tm">15:00</span></div><div class="sc enemy"><span class="team-label">${n(`hud.team.enemy`)}</span><b class="fe">0</b><div class="wedge r"></div></div>`;let Oe=F(De,`.fg`),Ae=F(De,`.fe`),Me=F(De,`.tm`),Ie=F(De,`.sc.ally .team-label`),ze=F(De,`.sc.enemy .team-label`),He=F(De,`.tm-label`),Ue=F(De,`.wedge.l`),qe=F(De,`.wedge.r`),Je=C(`div`,`cot-mode-status`,s);Je.setAttribute(`role`,`status`),Je.innerHTML=`<span class="mi"></span><span class="mn"></span><span class="mv"></span><button class="mb" type="button" hidden aria-label="${n(`hud.modeStatus.briefAria`)}">${n(`hud.modeStatus.brief`)}</button>`;let Qe=F(Je,`.mi`),$e=F(Je,`.mn`),et=F(Je,`.mv`),tt=F(Je,`.mb`),nt=0,rt=()=>{e.emit(`ui:click`,{}),e.emit(`ui:missionBrief`,{})};tt.addEventListener(`pointerup`,e=>{e.stopPropagation(),nt=performance.now(),rt()}),tt.addEventListener(`click`,e=>{if(e.stopPropagation(),performance.now()-nt<600){e.preventDefault();return}rt()});let it=``,at=`alpha`,A=C(`div`,`cot-net`,s);A.setAttribute(`role`,`status`),A.setAttribute(`aria-label`,n(`hud.net.perfAria`)),A.innerHTML=`<span class="cot-net-unit fps"><b class="metric">—</b><span class="label">${n(`hud.net.fps`)}</span></span><span class="cot-net-unit ping"><b class="metric">${n(`hud.net.local`)}</b><span class="label">${n(`hud.net.link`)}</span></span>`;let ot=F(A,`.fps`),st=F(A,`.ping`),ct=F(ot,`.metric`),lt=F(st,`.metric`),ut=F(st,`.label`);A.style.display=`none`;let dt=0,ft=0,pt=0,mt=1/60,ht=!1;function gt(e){let t=document.body.classList.contains(`cot-touch-layout`);if(!ht&&!t)return;let r=performance.now();if(ft>0){let e=Math.min(.25,(r-ft)/1e3);mt+=(e-mt)*.08}if(ft=r,dt++,dt<30||r-pt<250)return;pt=r,A.style.display=``;let i=Math.max(1,Math.min(999,Math.round(1/mt))),a=Math.max(0,Math.min(999,Math.round(Number(e?.pingMs)||0)));ct.textContent=String(i),ot.className=`cot-net-unit fps ${i>=50?`good`:i>=28?`warn`:`bad`}`,lt.textContent=a>0?String(a):n(`hud.net.local`),ut.textContent=n(a>0?`hud.net.ms`:`hud.net.link`),st.className=`cot-net-unit ping ${a<=0?`local`:a<80?`good`:a<160?`warn`:`bad`}`,A.setAttribute(`aria-label`,a>0?n(`hud.net.ariaLive`,{fps:i,ping:a}):n(`hud.net.ariaLocal`,{fps:i}))}let _t=C(`div`,`cot-drive`,s);_t.setAttribute(`role`,`status`),_t.setAttribute(`aria-label`,n(`hud.drive.aria`)),_t.innerHTML=`<div class="dial"><svg class="arc" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(135 50 50)"><circle class="arc-track" cx="50" cy="50" r="45" pathLength="100"/><circle class="arc-value" cx="50" cy="50" r="45" pathLength="100"/><circle class="arc-red" cx="50" cy="50" r="45" pathLength="100"/></g></svg><span class="ticks">${Array.from({length:21},(e,t)=>`<i style="--tick:${t}"></i>`).join(``)}</span></div><div class="needle"></div><div class="hub"></div><strong class="speed" data-drive-speed>0</strong><span class="unit">${n(`hud.drive.kmh`)}</span><span class="zero">0</span><span class="limit" data-drive-limit>—</span>`;let vt=F(_t,`[data-drive-speed]`),yt=F(_t,`[data-drive-limit]`),bt=F(_t,`.arc-value`),xt=F(_t,`.needle`),St={speedKmh:0,direction:`HOLD`,limitKmh:0,speedRatio:0,sweepDeg:0,sweepLength:0,needleDeg:-135},Ct=null,wt=-1,Tt=-1,Et=-1,Dt=-1,Ot=-1,kt=-1,At=-1,jt=-999e3;function j(e,t){let n=e?.state;if(!n)return;let r=Number.isFinite(t)?t:0,i=e.id!==Ct||r<wt;i&&(Ct=e.id,Tt=-1,Et=-1,Dt=-1),wt=r;let a=i||We(r,Tt,1/30),o=i||We(r,Et,1/20),s=i||We(r,Dt,.1);if(!(!a&&!o&&!s)){if(Ge(St,n,e.spec),s&&(Dt=r,St.speedKmh!==Ot&&(Ot=St.speedKmh,vt.textContent=String(Ot)),St.limitKmh!==kt&&(kt=St.limitKmh,yt.textContent=String(kt))),o){Et=r;let e=Math.round(St.sweepLength*1e3);e!==At&&(At=e,bt.style.strokeDasharray=`${e/1e3} 100`)}if(a){Tt=r;let e=Math.round(St.needleDeg*1e3);e!==jt&&(jt=e,xt.style.rotate=`${e/1e3}deg`)}}}function Mt(e,t,n,r){let i=n.length;if(e.children.length!==t){e.textContent=``;for(let n=0;n<t;n++)C(`i`,``,e)}for(let n=0;n<t;n++){let a=r?n:t-1-n;e.children[n].classList.toggle(`on`,a<i)}}let Nt=C(`div`,`cot-ear l`,s),M=C(`div`,`cot-ear r`,s);Nt.innerHTML=`<div class="hd"><span>${n(`hud.team.ally`)}</span><span class="al"></span></div>`,M.innerHTML=`<div class="hd"><span class="al"></span><span>${n(`hud.team.enemies`)}</span></div>`;let Pt=F(Nt,`.al`),Ft=F(M,`.al`),It=new Map,Lt=C(`div`,`cot-killfeed`,s),N=C(`div`,`cot-spec`,s);N.innerHTML=Ve();let Rt=F(N,`.who`),zt=F(N,`.nick`),Bt=F(N,`.veh`),Vt=F(N,`.idx`),Ht=F(N,`.portrait img`);F(N,`.cycle.prev`).addEventListener(`click`,()=>{e.emit(`spectate:cycle`,{direction:-1}),e.emit(`ui:click`,{})}),F(N,`.cycle.next`).addEventListener(`click`,()=>{e.emit(`spectate:cycle`,{direction:1}),e.emit(`ui:click`,{})}),F(N,`.gar`).addEventListener(`click`,()=>{let e=document.querySelector(`.cot-end button`)||document.querySelector(`.cot-es-btn.ghost`);e&&e.click()});function Ut(e,t){let r=(he||[]).find(t=>t&&t.id===e.id)||null,i=Be(e);zt.textContent=r?Wi(r):e.name||e.vehicle||String(e.id);let a=e.specId?ye(e.specId):``,o=a?`${a} · `:``;Bt.textContent=`${o}${e.vehicle||n(`hud.spec.unknownVehicle`)}`,Vt.textContent=i.position,Vt.hidden=!i.position,Ht.src=i.icon,Ht.hidden=!i.icon,N.classList.add(`show`),document.body.classList.add(`cot-spectating`),t?(N.offsetWidth,N.classList.add(`in`)):(Rt.classList.remove(`sw`),Rt.offsetWidth,Rt.classList.add(`sw`))}function Wt(){N.classList.remove(`in`),document.body.classList.remove(`cot-spectating`),setTimeout(()=>{N.classList.contains(`in`)||N.classList.remove(`show`)},350)}E(`spectate:begin`,e=>Ut(e,!0)),E(`spectate:change`,e=>Ut(e,!1)),E(`spectate:end`,()=>Wt());let Gt=pn(e);s.appendChild(Gt.root);let P=C(`div`,`cot-prebattle`,s),Kt=C(`div`,`k`,P);Kt.textContent=n(`hud.battleBeginsIn`);let qt=C(`div`,`n`,P),Jt=C(`div`,`r`,P);Jt.setAttribute(`aria-label`,n(`hud.preBattleRules`));let Yt=Re(P,Kt,qt),Xt=C(`div`,`cot-revive`,s);Xt.setAttribute(`aria-live`,`polite`);let Zt=C(`div`,`k`,Xt),Qt=C(`div`,`n`,Xt),$t=null,en=null,tn=0,nn={hide(){en!==null&&clearInterval(en),en=null,Xt.classList.remove(`on`)},onDestroyed(e){G==null||e!==G||nn.start()},observe(e){e&&en===null?nn.start():!e&&en!==null&&nn.hide()},start(){let e=$t?.respawnS;if(e==null)return;nn.hide(),tn=performance.now()+e*1e3,Zt.textContent=n(`hud.revive.kicker`);let t=()=>{let e=Math.max(1,Math.ceil((tn-performance.now())/1e3));Qt.textContent=String(e)};t(),Xt.classList.add(`on`),en=setInterval(t,100)}},rn=C(`div`,`cot-alert`,s);rn.setAttribute(`role`,`status`),rn.setAttribute(`aria-live`,`polite`);let an=C(`span`,`cot-alert-icon`,rn),on=C(`span`,`cot-alert-copy`,rn),sn=C(`div`,`cot-sixth`,s);sn.innerHTML=`<span class="sig">${k(`lightbulb`,24)}</span><span class="copy"><span class="lb">${n(`hud.sixth.label`)}</span><span class="sub">${n(`hud.sixth.sub`)}</span></span>`;let cn=-1,ln=-1,un=!1,dn=null;function fn(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;dn||=new e,dn.state===`suspended`&&dn.resume();let t=dn.currentTime+.01;for(let[e,n]of[[1244.5,0],[830.6,.13]]){let r=dn.createOscillator(),i=dn.createGain();r.type=`triangle`,r.frequency.value=e,i.gain.setValueAtTime(1e-4,t+n),i.gain.exponentialRampToValueAtTime(.16,t+n+.015),i.gain.exponentialRampToValueAtTime(1e-4,t+n+.3),r.connect(i).connect(dn.destination),r.start(t+n),r.stop(t+n+.32)}}catch{}}E(`player:spotted`,({timeS:e=0})=>{cn<0&&!(un&&e<ln-3)&&(cn=e+3)});function _n(e){cn>=0&&e>=cn&&(cn=-1,ln=e+8,un||(un=!0,sn.classList.add(`on`)),fn()),un&&(e>ln||e<ln-8-1)&&(un=!1,sn.classList.remove(`on`))}let I=C(`div`,`cot-camoind`,s);I.innerHTML=`<svg viewBox="0 0 24 24" width="32" height="32"><path class="ceye" fill="none" stroke="#8a97a3" stroke-width="1.7" d="M2.5 12c2.7-4.4 6-6.6 9.5-6.6s6.8 2.2 9.5 6.6c-2.7 4.4-6 6.6-9.5 6.6S5.2 16.4 2.5 12Z"/><path class="clid" fill="none" stroke="#9ae8a6" stroke-width="1.7" stroke-linecap="round" d="M2.5 12c2.7 3.6 6 5.4 9.5 5.4s6.8-1.8 9.5-5.4M6 15.6l-1.5 2M12 17.6v2.3M18 15.6l1.5 2" style="display:none"/><circle class="cpup" cx="12" cy="12" r="3" fill="#8a97a3"/></svg>`,I.style.display=`none`;let Cn=F(I,`svg`),En=F(I,`.ceye`),An=F(I,`.clid`),Xn=F(I,`.cpup`),rr=`off`;function ir(e){let t=e&&!e.spotted&&(e.inBush&&!e.fired||(e.camo??0)>=.4)?`concealed`:`off`;if(t===rr)return;let n=rr;rr=t,I.style.display=t===`concealed`?`flex`:`none`,I.classList.toggle(`hidden-in-bush`,t===`concealed`),I.classList.remove(`conceal-pulse`),t===`concealed`&&n===`off`&&(I.offsetWidth,I.classList.add(`conceal-pulse`)),t===`concealed`&&(En.style.display=`none`,An.style.display=``,Xn.style.display=`none`,Cn.style.opacity=`0.85`)}let L=C(`button`,`cot-special`,s);L.type=`button`,L.innerHTML=`<span class="si"></span><span class="sl"></span><span class="sk">E</span>`,L.addEventListener(`pointerdown`,t=>{t.preventDefault(),t.stopPropagation(),e.emit(`ui:specialAction`,{})}),L.addEventListener(`click`,t=>{t.stopPropagation(),t.detail===0&&e.emit(`ui:specialAction`,{})});let dr=C(`div`,`cot-jump`,s);dr.innerHTML=`<span class="sl"></span><span class="sk">F</span>`;let fr=F(dr,`.sl`),_r=F(L,`.si`),vr=F(L,`.sl`),yr=F(L,`.sk`),br=null,xr=_e.NONE;function Sr(e){let t=e?.spec?.id||null;if(t!==br){br=t;let r=ge(e?.spec);xr=r.kind;let i=xr===_e.GUIDED_MISSILE?`missileRack`:xr===_e.HYDROPNEUMATIC_AIM?`track`:xr===_e.MAGAZINE_RELOAD?`autoloader`:null;_r.innerHTML=i?k(i,22,`currentColor`):``,vr.textContent=r.label,vr.dataset.short=r.shortLabel,L.title=r.label,L.setAttribute(`aria-label`,r.label||n(`hud.special.unavailable`)),L.classList.toggle(`show`,xr!==_e.NONE)}let r=e?.specialAction,i=ve(r,e?.combat?.shellSlot),a=xr===_e.GUIDED_MISSILE?Number(r?.missileSlot):-1,o=e?.combat?.ammo,s=Number.isInteger(a)&&a>=0&&Array.isArray(o)&&(o[a]||0)<=0;L.classList.toggle(`active`,i),L.classList.toggle(`empty`,s),L.classList.remove(`pending`),L.disabled=!e||!!e.combat?.destroyed,L.setAttribute(`aria-pressed`,i?`true`:`false`)}let Cr=C(`div`,`cot-shells`,s),wr=C(`span`,`cot-ammo-switching`,Cr);wr.setAttribute(`role`,`status`),wr.setAttribute(`aria-live`,`polite`),wr.setAttribute(`aria-label`,n(`hud.ammo.waitingForHostAria`)),wr.hidden=!0,Cr.setAttribute(`role`,`group`),Cr.setAttribute(`aria-label`,n(`hud.ammunition.aria`));let Tr=[],Er=[],Dr=!1,Or;function kr(e){let t=document.body.classList.contains(`cot-touch-layout`);Dr=!!e&&t,Or!==Dr&&(Cr.classList.toggle(`touch-open`,Dr),Or=Dr);let n=0;for(let e of Er)e.layout(t,Dr,e.selected?0:++n)}function Ar(t,n){n.preventDefault(),n.stopPropagation();let r=document.body.classList.contains(`cot-touch-layout`);if(r&&!Dr){kr(!0);return}r&&kr(!1),e.emit(`ui:shellSelect`,{slot:t}),e.emit(`ui:click`,{})}for(let e=0;e<3;e++){let r=C(`button`,`cot-shell`,Cr);r.type=`button`,r.innerHTML=`<div class="key">${e+1}</div><canvas></canvas><div class="cnt"></div><div class="ty"></div><div class="clr"></div><div class="tip"><div class="tnm"></div>${n(`hud.shell.pen`)} <b class="p"></b> &nbsp;&middot;&nbsp; ${n(`hud.shell.dmg`)} <b class="d"></b></div><div class="cool"></div>`,r._icon=F(r,`canvas`),Er.push(Ke({index:e,elements:{button:r,type:F(r,`.ty`),underline:F(r,`.clr`),name:F(r,`.tnm`),penetration:F(r,`.p`),damage:F(r,`.d`),count:F(r,`.cnt`),cooldown:F(r,`.cool`)},locale:t,drawIcon:e=>mr(r._icon,e),typeLabel:p,count:ar,selectionLabel:Fn,typeColors:tr,underlineColors:nr})),r.addEventListener(`pointerdown`,t=>{document.body.classList.contains(`cot-touch-layout`)&&Ar(e,t)}),r.addEventListener(`click`,t=>{if(document.body.classList.contains(`cot-touch-layout`)&&t.detail!==0){t.preventDefault(),t.stopPropagation();return}Ar(e,t)}),Tr.push(r)}kr(!1),window.addEventListener(`pointerdown`,e=>{Dr&&e.target instanceof Node&&!Cr.contains(e.target)&&kr(!1)},{capture:!0});let jr=C(`div`,`cot-consep`,Cr),Mr=C(`div`,`cot-cons`,Cr),R=[],Nr=[0,0,0],Pr=Ee.map(e=>e.cooldownS);for(let t=0;t<pr.length;t++){let r=pr[t],i=C(`button`,`cot-con`,Mr);i.type=`button`,i.title=r.label,i.setAttribute(`aria-label`,n(`hud.consumable.ready`,{name:r.label})),i.innerHTML=`<div class="key">${r.key}</div>${r.svg}<div class="cnt">${r.count==null?``:r.count}</div><div class="cool"></div>`;let a=n=>{n.preventDefault(),n.stopPropagation(),e.emit(`ui:consumable`,{slot:t})};i.addEventListener(`pointerdown`,e=>{document.body.classList.contains(`cot-touch-layout`)&&a(e)}),i.addEventListener(`click`,e=>{if(document.body.classList.contains(`cot-touch-layout`)&&e.detail!==0){e.preventDefault(),e.stopPropagation();return}a(e)}),R.push(i)}function Fr(e){for(let t=0;t<R.length;t++){let r=R[t],i=Te(e,Nr[t]),a=F(r,`.cool`),o=F(r,`.cnt`);if(i>0){let e=Math.max(0,Math.min(100,i/Pr[t]*100));a.style.display=`block`,a.style.setProperty(`--cool`,`${e.toFixed(1)}%`),o.textContent=String(Math.ceil(i)),r.classList.add(`cooling`),r.setAttribute(`aria-label`,n(`hud.consumable.cooling`,{name:pr[t].label,seconds:Math.ceil(i)}))}else a.style.display=`none`,o.textContent=`∞`,r.classList.remove(`cooling`),r.setAttribute(`aria-label`,n(`hud.consumable.ready`,{name:pr[t].label}))}}let Ir=C(`div`,`cot-minimap`,s),Lr=C(`canvas`,``,Ir),Rr=d(220,220,window.devicePixelRatio||1,u()===`mobile`);Lr.width=Math.round(220*Rr),Lr.height=Math.round(220*Rr);let z=mn(Lr);z.setTransform(Rr,0,0,Rr,0,0);let B=null,zr=null,V=`hidden`,Br=!1,Vr=-1e9,Hr=!0,Ur=0,Wr=new Map,Gr=new Float32Array(12),Kr=new Float32Array(12),H=1,U=1,qr=1,Jr=null,Yr=null,Xr=-1,Zr=-1,Qr=`hidden`,$r=null,W=0,G=null,ei=40,ti=!1,ni=-1,ri=0,ii=null,ai=er,oi=null,si=null,ci=new Map,li=new Map,K=[],ui={x:0,z:0},di={playerX:0,playerZ:0,rightX:0,rightZ:0,forwardX:0,forwardZ:0,centerX:0,centerY:0,minDimension:0,radius:0,thickness:0},fi={age:0,angle:0,alpha:0,growth:0,halfAngle:0,thickness:0,rimHalfAngle:0,bodyColor:``,bodyAlpha:0,rimColor:``,rimAlpha:0},pi=[],mi=null,hi={visible:!1,opacity:0,radius:18.5,length:13,halfWidth:3.5,flash:0},gi=null,q=null,_i={capacity:0,rounds:0,visibleShells:0,readyShells:0,overflow:0,fullReload:!1,loadProgress:0,intraClip:!1,reloading:!1},vi={y:0,rotation:0},yi={cx:0,cy:0,radius:Vn,circleX:0,circleY:0,sniper:!1,blocked:!1,limited:!1,reloadFraction:0,reloading:!1,gunColor:yn,ringColor:bn,zoomScale:1,markerLineWidth:1.6,centerClearanceRadius:14,single:!1,magazine:null,magazineBottomY:0},bi={advancing:!1,camera:null,dt:1/60},xi=new Map,Si=new Map,J=1024,Ci=``,wi=``,Ti=``,Ei=null;function Di(){K.length=0,mi=null,pi.length=0,se.replaceChildren(),Lt.replaceChildren(),oi&&=(clearTimeout(oi),null),rn.classList.remove(`show`,`danger`,`warning`,`success`,`info`)}function Oi(){H=s.clientWidth||window.innerWidth,U=s.clientHeight||window.innerHeight,qr=d(H,U,window.devicePixelRatio||1,!1),l.width=Math.round(H*qr),l.height=Math.round(U*qr),w.setTransform(qr,0,0,qr,0,0),Jr=null,Yr=null,Xr=-1}window.addEventListener(`resize`,Oi),Oi(),s.style.display=`none`;function ki(e){ri=e;for(let t=0;t<3;t++)Er[t].select(t===e);kr(!1)}let Ai=0,ji=0,Mi=!1,Ni=0;function Pi(e,t,n,r){if(Wn.set(t,n,r).applyMatrix4(Un),Ni=-Wn.z,Wn.z>-.3){Mi=!1;return}Gn.copy(Wn).applyMatrix4(e.projectionMatrix),Ai=(Gn.x*.5+.5)*H,ji=(-Gn.y*.5+.5)*U,Mi=Ai>-200&&Ai<H+200&&ji>-200&&ji<U+200}function Fi(e,t){let n=(e&&e.fov?e.fov:60)*Math.PI/180;return U*.5/(Math.tan(n*.5)*Math.max(t,1))}function Ii(e,t,n,r,i,a){if(!si)return!0;for(let o=1;o<16;o++){let s=o/16,c=t+(i-t)*s;if(si.getHeightAt(e+(r-e)*s,n+(a-n)*s)>c+.9)return!1}return!0}function Li(e){let t=Si.get(e.id);if(t)return t;let n={vis:!1,lastT:-1e9,lastX:0,lastZ:0,lastYaw:0,ever:!1};return Si.set(e.id,n),n}function Ri(e,t){e.lastX=t.pos.x,e.lastZ=t.pos.z,e.lastYaw=t.yaw}function zi(e,t){let n=t.pos.x-e.pos.x,r=t.pos.z-e.pos.z;return Math.hypot(n,r)>445?!1:Ii(e.pos.x,e.pos.y+2.6,e.pos.z,t.pos.x,t.pos.y+1.9,t.pos.z)}function Bi(e,t,n,r,i){n&&(e.lastT=i,e.ever=!0,Ri(e,t)),e.vis=r?n:n||i-e.lastT<5,e.vis&&Ri(e,t)}function Vi(e){let t=e.player;if(!t?.state)return;let n=e.tanks||[],r=e.spotting?.isSpotted?e.spotting:null;for(let i=0;i<n.length;i++){let a=n[i];if(!a?.state||a.isPlayer||a.team===`player`)continue;let o=Li(a);if(a.combat?.destroyed){o.vis=!0,o.ever=!0,Ri(o,a.state);continue}let s=r?r.isSpotted(a.id):zi(t.state,a.state);Bi(o,a.state,s,!!r,e.timeS)}}function Hi(e){let t=Si.get(e);return!t||t.vis}let Ui=new Map;function Wi(e){if(e.displayName)return e.displayName;if(e.isPlayer)return cr;let t=Ui.get(e.id);if(!t){let n=new Set(Ui.values()),r=lr(String(e.id)+(e.spec?e.spec.id:``))%sr.length;for(let e=0;e<sr.length;e++){let i=sr[(r+e)%sr.length];if(!n.has(i)){t=i;break}}t||=`Bot_${lr(String(e.id))%90+10}`,Ui.set(e.id,t)}return t}let Gi=[],Ki=[],Y={allyAlive:0,allyTotal:0,enemyAlive:0,enemyTotal:0,deadEnemies:[],deadAllies:[]};function qi(e){let t=0;for(let n of e)if(n?.spec){if(Gi[t]!==n.id||Ki[t]!==!!n.isPlayer)return!0;t++}return t!==Gi.length}function Ji(e){Gi.length=0,Ki.length=0;for(let t of e)t?.spec&&(Gi.push(t.id),Ki.push(!!t.isPlayer))}function Yi(e){if(qi(e)){Ji(e);for(let e of It.values())e.root.remove();It.clear(),Ui.clear(),Ci=``}}function Xi(e,t){let n=e.spec,r=C(`div`,`cot-er`);r.innerHTML=`<span class="ic" aria-hidden="true"></span><span class="n"><span class="nick"></span><span class="veh"><i class="tier"></i><span class="vn"></span></span></span><div class="hpm"><i></i></div>`;let i=F(r,`.ic`);ue(i,n.id,`side_silhouette`,t?gn:vn),e.isPlayer&&r.classList.add(`me`),F(r,`.tier`).textContent=ye(n.id)||`–`,F(r,`.nick`).textContent=Wi(e),F(r,`.vn`).textContent=n.name,(t?Nt:M).appendChild(r);let a={root:r,hp:F(r,`.hpm i`),ic:i,ally:t,lastFrac:-1,wasDead:null,wasSpotted:t};return It.set(e.id,a),a}function Zi(e,t,n){let r=It.get(e.id)||Xi(e,t);if(n!==r.wasDead&&(r.root.classList.toggle(`dead`,n),r.wasDead=n),!t){let t=n||Hi(e.id);t!==r.wasSpotted&&(r.root.classList.toggle(`unlit`,!t),r.wasSpotted=t)}if(!e.combat||n)return;let i=Math.max(0,Math.min(1,e.combat.hp/e.combat.maxHp));Math.abs(i-r.lastFrac)<=.005||(r.hp.style.height=`${(i*100).toFixed(1)}%`,r.lastFrac=i)}function Qi(){Y.allyAlive=0,Y.allyTotal=0,Y.enemyAlive=0,Y.enemyTotal=0,Y.deadEnemies.length=0,Y.deadAllies.length=0}function $i(e,t,n){if(t){Y.allyTotal++,n?Y.deadAllies.push(e.spec.id):Y.allyAlive++;return}Y.enemyTotal++,n?Y.deadEnemies.push(e.spec.id):Y.enemyAlive++}function ea(e){Yi(e),Qi();for(let t of e){if(!t?.spec)continue;let e=t.team===`player`||!!t.isPlayer,n=!!t.combat?.destroyed;$i(t,e,n),Zi(t,e,n)}return Y}function ta(e,t){e!==Ti&&(He.textContent=e,Ti=e),t!==wi&&(Me.textContent=t,wi=t)}function na(e,t,r){return t?n(`hud.timer.nextWave`):e===`capture_the_flag`?n(`hud.timer.capture`,{target:String(Ce.capture_the_flag)}):e===`zone_control`?n(`hud.timer.first`,{target:String(Ce.zone_control)}):e===`turbo_ball`?n(`hud.timer.first`,{target:String(Ce.turbo_ball)}):n(e===`frontline_assault`?`hud.timer.takeLine`:r==null?`hud.timer.survive`:`hud.team.time`)}function ra(e,t){if(e.id===`capture_the_flag`)return n(`hud.modeStatus.flags`,{own:String(t),target:String(e.target||3)});if(e.id===`zone_control`)return n(`hud.modeStatus.control`,{own:String(t),target:String(e.target||Ce.zone_control)});if(e.id===`turbo_ball`)return n(`hud.modeStatus.goals`,{own:String(t),target:String(e.target||5)});if(e.id===`frontline_assault`){let t=e.line;return n(`hud.modeStatus.assault`,{line:String(Math.min((t?.index??0)+1,t?.total??3)),total:String(t?.total??3),wave:String(e.horde?.wave||1),alive:String(e.horde?.alive||0)})}let r=e.horde;return n(`hud.modeStatus.horde`,{wave:String(r?.wave||1),alive:String(r?.alive||0),ammo:String(e.playerAmmo??`—`),capacity:String(e.playerAmmoCapacity??`—`)})}function ia(e){return e===`capture_the_flag`?`modeFlag`:e===`zone_control`||e===`frontline_assault`?`modeZones`:e===`turbo_ball`?`modeTurbo`:`modeHorde`}function aa(e,t){tt.hidden=e.id!==`frontline_assault`;let r=ra(e,t),i=`${e.id}|${r}`;i!==it&&(Qe.innerHTML=k(ia(e.id||``),15,`currentColor`),$e.textContent=e.label||n(`hud.modeStatus.objective`),et.textContent=r,Je.classList.add(`show`),it=i)}function oa(e,t,r){let i=t.perspectiveTeam===`bravo`?`bravo`:`alpha`;at=i;let a=i===`alpha`?`bravo`:`alpha`,o=t.id===`endless_horde`?t.horde:null,s=o?`W${o.wave}`:Math.round(t.score?.[i]||0),c=Math.round(o?o.alive||0:t.score?.[a]||0),l=`${t.id}|${s}:${c}|${r.allyAlive}/${r.allyTotal}|${r.enemyAlive}/${r.enemyTotal}`;l!==Ci&&(Oe.textContent=String(s),Ae.textContent=String(c),Ie.textContent=n(o?`hud.wave`:`hud.allies`),ze.textContent=n(o?`hud.hostiles`:`hud.enemy`),Ue.textContent=``,qe.textContent=``,Pt.textContent=`${r.allyAlive} / ${r.allyTotal}`,Ft.textContent=`${r.enemyAlive} / ${r.enemyTotal}`,Ci=l);let u=o?Math.ceil(o.nextWaveInS||0):0,d=Qn(e,t.id),f=u>0?`${u}s`:$n(e,d);ta(na(t.id||``,u>0,d),f),aa(t,s)}function sa(e,t){it&&=(Je.classList.remove(`show`),``);let r=t.enemyTotal-t.enemyAlive,i=t.allyTotal-t.allyAlive,a=`${r}:${i}|${t.allyAlive}/${t.allyTotal}|${t.enemyAlive}/${t.enemyTotal}`;if(a!==Ci){Oe.textContent=String(r),Ae.textContent=String(i),Ie.textContent=n(`hud.allies`),ze.textContent=n(`hud.enemy`);let e=Math.max(t.allyTotal,t.enemyTotal);Mt(Ue,e,t.deadEnemies,!1),Mt(qe,e,t.deadAllies,!0),Pt.textContent=`${t.allyAlive} / ${t.allyTotal}`,Ft.textContent=`${t.enemyAlive} / ${t.enemyTotal}`,Ci=a}let o=Qn(e,`standard`);ta(n(o==null?`hud.timer.elapsed`:`hud.team.time`),$n(e,o))}function ca(e){let t=ea(e.rosterTanks||e.tanks||[]),n=e.matchModeState;if(n?.id&&n.id!==`standard`){oa(e,n,t);return}sa(e,t)}function la(e){if(Jr&&Yr&&Xr===e)return;let t=.48,n=H*(.3-.012*Math.log2(e));Jr=w.createRadialGradient(0,0,n,0,0,H*.62),Jr.addColorStop(0,`rgba(2,3,4,0)`),Jr.addColorStop(.5,`rgba(2,3,4,${(t*.34).toFixed(3)})`),Jr.addColorStop(1,`rgba(2,3,4,${t.toFixed(3)})`),Yr=w.createRadialGradient(0,0,H*.4,0,0,H*.66),Yr.addColorStop(0,`rgba(84,118,205,0)`),Yr.addColorStop(.72,`rgba(88,122,210,0.055)`),Yr.addColorStop(1,`rgba(104,130,225,0.15)`),Xr=e}function ua(){if(Zr<0)return 1;let e=Math.min(1,(performance.now()-Zr)/100);return e>=1&&(Zr=-1),e}function da(e){if(!Jr||!Yr)return;let t=H/2,n=U/2,r=U/H;w.save(),w.translate(t,n),w.scale(1,r),w.globalAlpha=e,w.fillStyle=Jr,w.fillRect(-t,-n/r,H,U/r),w.fillStyle=Yr,w.fillRect(-t,-n/r,H,U/r),w.restore()}function fa(e,t,n,r,i){if(r==null||i==null||i<=e||r>=t){w.moveTo(e,n),w.lineTo(t,n);return}r-e>1&&(w.moveTo(e,n),w.lineTo(r,n)),t-i>1&&(w.moveTo(i,n),w.lineTo(t,n))}function pa(e,t,n,r,i){if(r==null||i==null||i<=e||r>=t){w.moveTo(n,e),w.lineTo(n,t);return}r-e>1&&(w.moveTo(n,e),w.lineTo(n,r)),t-i>1&&(w.moveTo(n,i),w.lineTo(n,t))}function ma(e,t,n,r,i,a){let o=le?de:null,s=o&&Math.abs(o.cx-e)<o.hw+3?o:null,c=o&&t>o.top-5&&t<o.bottom+5?o:null;w.strokeStyle=i,w.lineWidth=a,w.beginPath(),fa(e-r,e-n,t+.5,c?c.cx-c.hw-5:null,c?c.cx+c.hw+5:null),fa(e+n,e+r,t+.5,c?c.cx-c.hw-5:null,c?c.cx+c.hw+5:null),pa(t-r,t-n,e+.5,s?s.top-5:null,s?s.bottom+5:null),pa(t+n,t+r,e+.5,s?s.top-5:null,s?s.bottom+5:null),w.stroke()}function ha(e,t,n,r,i,a){w.strokeStyle=i,w.lineWidth=a,w.beginPath();for(let i=1;i<=r;i++){let r=i*n,a=i%2==0?4.5:3;w.moveTo(e-a,t-r+.5),w.lineTo(e+a,t-r+.5),w.moveTo(e-a,t+r+.5),w.lineTo(e+a,t+r+.5),w.moveTo(e-r+.5,t-a),w.lineTo(e-r+.5,t+a),w.moveTo(e+r+.5,t-a),w.lineTo(e+r+.5,t+a)}w.stroke()}function ga(e){let t=e.zoom||2,n=In(e,Jn),r=n.x??e.cx,i=n.y??e.cy;la(t);let a=ua();da(a),w.globalAlpha=a;let o=ja(ei),s=o+3,l=o*1.55+3;ma(r,i,s,l,`rgba(4,7,6,0.38)`,2.4),ma(r,i,s,l,`rgba(170,240,178,0.6)`,1.1);let u=c.clamp(8+t*1.2,11,22),d=Math.min(3,Math.max(1,Math.floor((l-4)/u)));ha(r,i,u,d,`rgba(3,7,5,0.52)`,2.2),ha(r,i,u,d,`rgba(176,242,184,0.70)`,.9),w.globalAlpha=1}let _a=.12,va={pen:{holdS:.9,fadeS:3,half:.56,thickF:.92,rim:`255,126,92`,body:`246,58,38`,rimA:.95,bodyA:.6},he:{holdS:.7,fadeS:2.2,half:.66,thickF:.78,rim:`255,198,100`,body:`250,146,42`,rimA:.9,bodyA:.5},bounce:{holdS:.5,fadeS:1.9,half:.38,thickF:.6,rim:`234,244,252`,body:`168,192,214`,rimA:.95,bodyA:.44}};function ya(e,t,n,r,i,a){w.beginPath();for(let a=0;a<=22;a++){let o=n+(-1+2*a/22)*r,s=e+Math.cos(o)*i,c=t+Math.sin(o)*i;a===0?w.moveTo(s,c):w.lineTo(s,c)}for(let o=22;o>=0;o--){let s=-1+2*o/22,c=n+s*r,l=i+a*Math.max(0,1-s*s)**.5;w.lineTo(e+Math.cos(c)*l,t+Math.sin(c)*l)}w.closePath()}function ba(){let e=$r,t=bs?.state;if(!e||!t)return null;let n=e.matrixWorld.elements,r=n[0],i=n[2],a=-n[8],o=-n[10],s=Math.hypot(r,i),c=Math.hypot(a,o);if(s<1e-4||c<1e-4)return null;r/=s,i/=s,a/=c,o/=c;let l=di;l.playerX=t.pos.x,l.playerZ=t.pos.z,l.rightX=r,l.rightZ=i,l.forwardX=a,l.forwardZ=o,l.centerX=H/2,l.centerY=U/2,l.minDimension=Math.min(H,U);let u=ja(ei);return l.radius=Math.min(Math.max(l.minDimension*.185,u+26),l.minDimension*.3),l.thickness=Math.min(Math.max(l.minDimension*.115,64),118),l}function xa(e){for(let t=K.length-1;t>=0;t--){let n=K[t],r=va[n.kind],i=e-n.t0;(i>_a+r.holdS+r.fadeS||i<0)&&K.splice(t,1)}}function Sa(e,t,n){let r=e.wx-n.playerX,i=e.wz-n.playerZ,a=Math.hypot(r,i);if(a<.001)return null;let o=r/a,s=i/a,c=Math.atan2(o*n.rightX+s*n.rightZ,o*n.forwardX+s*n.forwardZ);e._screenAng=c;let l=fi;l.age=t-e.t0,l.angle=c-Math.PI/2;let u=va[e.kind];if(l.age<_a){let t=l.age/_a,n=e.re?.8:.55;l.alpha=t,l.growth=n+(1.05-n)*(1-(1-t)*(1-t))}else{l.growth=1.05-.05*Math.min(1,(l.age-_a)/.14);let e=l.age-_a-u.holdS;l.alpha=e<=0?1:Math.max(0,1-e/u.fadeS)**1.35}l.halfAngle=u.half*l.growth;let d=e.kind===`bounce`?0:Math.min(1,(e.dmg||0)/520);return l.thickness=n.thickness*u.thickF*(.74+.4*d)*l.growth,l.rimHalfAngle=l.halfAngle*.82,l.bodyColor=u.body,l.bodyAlpha=u.bodyA,l.rimColor=u.rim,l.rimAlpha=u.rimA,l}function Ca(e,t){ya(e.centerX,e.centerY,t.angle,t.halfAngle,e.radius,t.thickness);let n=w.createRadialGradient(e.centerX,e.centerY,e.radius,e.centerX,e.centerY,e.radius+t.thickness);n.addColorStop(0,`rgba(8,11,14,${(.4*t.alpha).toFixed(3)})`),n.addColorStop(.55,`rgba(8,11,14,${(.16*t.alpha).toFixed(3)})`),n.addColorStop(1,`rgba(8,11,14,0)`),w.fillStyle=n,w.fill(),n=w.createRadialGradient(e.centerX,e.centerY,e.radius,e.centerX,e.centerY,e.radius+t.thickness),n.addColorStop(0,`rgba(${t.bodyColor},${(t.bodyAlpha*t.alpha).toFixed(3)})`),n.addColorStop(.32,`rgba(${t.bodyColor},${(t.bodyAlpha*.62*t.alpha).toFixed(3)})`),n.addColorStop(1,`rgba(${t.bodyColor},0)`),w.fillStyle=n,w.fill()}function wa(e,t,n,r,i,a){w.strokeStyle=n,w.lineWidth=r,w.beginPath(),w.arc(e.centerX,e.centerY,e.radius+i,t.angle-a,t.angle+a),w.stroke()}function Ta(e,t,n){if(w.lineCap=`butt`,wa(t,n,`rgba(8,11,14,${(.7*n.alpha).toFixed(3)})`,4.6,1,n.rimHalfAngle),wa(t,n,`rgba(${n.rimColor},${(n.rimAlpha*n.alpha).toFixed(3)})`,2.3,1,n.rimHalfAngle),n.age<.25){let e=1-n.age/.25;w.globalCompositeOperation=`lighter`,wa(t,n,`rgba(255,236,220,${(.55*e*n.alpha).toFixed(3)})`,3.4,1,n.rimHalfAngle*.9),w.globalCompositeOperation=`source-over`}if(e.crit&&e.kind!==`bounce`&&n.age<1.4){let e=.55+.45*Math.sin(n.age*Math.PI*4);w.globalCompositeOperation=`lighter`,wa(t,n,`rgba(255,216,164,${(.8*e*n.alpha).toFixed(3)})`,3.2,3.5,n.halfAngle*.34),w.globalCompositeOperation=`source-over`}}function Ea(e,t,n){let r=!e.numeric&&On(Br,e.amount,e.kind)?`${e.label} · ${e.amount}`:e.label,i=e.numeric?Math.round(Math.min(Math.max(t.minDimension*.023,14),19)):Math.round(Math.min(Math.max(t.minDimension*(r.length>13?.015:.018),10),14)),a=t.radius+n.thickness+(e.numeric?14:16);w.save(),w.font=`900 ${i}px ${T}`,w.textAlign=`center`,w.textBaseline=`middle`,w.lineJoin=`miter`,w.miterLimit=2;let o=w.measureText(r).width/2,s=Math.min(Math.max(t.centerX+Math.cos(n.angle)*a,o+8),H-o-8),c=Math.min(Math.max(t.centerY+Math.sin(n.angle)*a,i+8),U-i-8);if(w.globalAlpha=Math.min(1,.98*n.alpha),w.lineWidth=e.numeric?4.6:4,w.strokeStyle=`rgba(5,8,11,0.94)`,w.strokeText(r,s,c),w.fillStyle=e.labelColor,w.fillText(r,s,c),e.crit&&e.numeric){let e=a+i+5,r=Math.max(9,Math.round(i*.55));w.font=`900 ${r}px ${T}`;let o=w.measureText(`CRIT`).width/2,s=Math.min(Math.max(t.centerX+Math.cos(n.angle)*e,o+8),H-o-8),c=Math.min(Math.max(t.centerY+Math.sin(n.angle)*e,r+8),U-r-8);w.lineWidth=3.4,w.strokeText(`CRIT`,s,c),w.fillStyle=`#ffd0a8`,w.fillText(`CRIT`,s,c)}w.restore()}function Da(e){if(!K.length)return;let t=ba();if(t){xa(e);for(let n=0;n<K.length;n++){let r=K[n],i=Sa(r,e,t);i&&(Ca(t,i),Ta(r,t,i),Ea(r,t,i))}w.lineCap=`butt`}}function Oa(e,t){if(!mi)return;let n=jn(t-mi.t0,!!ae?.matches,hi);if(!n.visible){mi=null;return}let r=mi.bounced?`202,218,232`:`255,166,48`,i=mi.bounced?`241,247,252`:`255,235,190`;w.save(),w.lineJoin=`miter`,w.fillStyle=`rgba(5,8,12,${(n.opacity*.86).toFixed(3)})`;for(let t=0;t<4;t++){let r=Math.PI/4+t*Math.PI/2,i=Math.cos(r),a=Math.sin(r);Bn(w,e.cx,e.cy,i,a,n.radius,n.length,n.halfWidth,2.1),w.fill()}w.fillStyle=`rgba(${r},${n.opacity.toFixed(3)})`;for(let t=0;t<4;t++){let r=Math.PI/4+t*Math.PI/2,a=Math.cos(r),o=Math.sin(r);Bn(w,e.cx,e.cy,a,o,n.radius,n.length,n.halfWidth),w.fill();let s=-o,c=a,l=n.radius+n.length*.3,u=n.radius+n.length*.72;w.strokeStyle=`rgba(${i},${(n.opacity*.9).toFixed(3)})`,w.lineWidth=1.1,w.beginPath(),w.moveTo(e.cx+a*l+s*.65,e.cy+o*l+c*.65),w.lineTo(e.cx+a*u+s*.25,e.cy+o*u+c*.25),w.stroke()}if(n.flash>.001){let t=n.opacity*n.flash,r=3.5+2.5*n.flash;w.strokeStyle=`rgba(5,8,12,${(t*.75).toFixed(3)})`,w.lineWidth=3.2,w.beginPath(),w.moveTo(e.cx-r,e.cy-r),w.lineTo(e.cx+r,e.cy+r),w.moveTo(e.cx+r,e.cy-r),w.lineTo(e.cx-r,e.cy+r),w.stroke(),w.strokeStyle=`rgba(${i},${t.toFixed(3)})`,w.lineWidth=1.2,w.stroke()}w.restore()}function ka(e){return e.radPx}function Aa(){return Math.min(H,U)*Hn}function ja(e){return Math.max(Vn,Math.min(e,Aa()))}let Ma=Vn,Na=!1,Pa=0,Fa=0,Ia=yn,La=yn,X={valid:!1,mode:``,w:0,h:0,cx:0,cy:0,radPx:0,gunX:null,gunY:null,penRatio:null,distM:null,blockedDistM:null,gunDistM:null,gunTargetId:null,aimTargetId:null,singleReticle:!1,atGunLimit:!1,gunLimitSpec:!1,selfRightLabel:null,zoom:1,reloadKind:``,ammoSelectionPending:!1,magazineCapacity:0,magazineRounds:0,shellType:``,shellCount:0,drawnR:0},Ra=(e,t,n=.02)=>e==null&&t==null||e!=null&&t!=null&&Number.isFinite(e)&&Number.isFinite(t)&&Math.abs(e-t)<=n;function za(e){return X.mode===V&&X.w===H&&X.h===U&&Ra(X.cx,e.cx)&&Ra(X.cy,e.cy)&&Ra(X.radPx,e.radPx,.01)&&Ra(X.gunX,e.gunX)&&Ra(X.gunY,e.gunY)&&Ra(X.drawnR,Ma,.01)}function Ba(e){return Ra(X.penRatio,e.penRatio,.001)&&Ra(X.distM,e.distM,.25)&&Ra(X.blockedDistM,e.blockedDistM,.05)&&Ra(X.gunDistM,e.gunDistM,.05)&&X.gunTargetId===e.gunTargetId&&X.aimTargetId===me&&X.singleReticle===!!e.singleReticle&&X.atGunLimit===!!e.atGunLimit&&X.gunLimitSpec===!!e.gunLimitSpec&&X.selfRightLabel===e.selfRightLabel&&Ra(X.zoom,e.zoom||1,.001)}function Va(e){let t=ai&&ai[ri]||er[0],n=e.magazine;return X.reloadKind===(e.reload?.kind||``)&&X.ammoSelectionPending===e.ammoSelectionPending&&X.magazineCapacity===((n?.capacity??0)|0)&&X.magazineRounds===((n?.rounds??0)|0)&&X.shellType===(t.type||``)&&X.shellCount===ar(t)}function Ha(e){if(!X.valid||K.length||mi||ni>=0||Zr>=0||Mn(e.reload)>0)return!1;let t=ja(ka(e));return Math.abs(t-ei)>.01?!1:za(e)&&Ba(e)&&Va(e)}function Ua(e){let t=ai&&ai[ri]||er[0],n=e.magazine;X.valid=!0,X.mode=V,X.w=H,X.h=U,X.cx=e.cx,X.cy=e.cy,X.radPx=e.radPx,X.gunX=e.gunX,X.gunY=e.gunY,X.penRatio=e.penRatio,X.distM=e.distM,X.blockedDistM=e.blockedDistM,X.gunDistM=e.gunDistM,X.gunTargetId=e.gunTargetId,X.aimTargetId=me,X.singleReticle=!!e.singleReticle,X.atGunLimit=!!e.atGunLimit,X.gunLimitSpec=!!e.gunLimitSpec,X.selfRightLabel=e.selfRightLabel,X.zoom=e.zoom||1,X.reloadKind=e.reload?.kind||``,X.ammoSelectionPending=e.ammoSelectionPending,X.magazineCapacity=(n?.capacity??0)|0,X.magazineRounds=(n?.rounds??0)|0,X.shellType=t.type||``,X.shellCount=ar(t),X.drawnR=Ma}function Wa(e,t,n){w.beginPath(),w.arc(e,t,n,0,Math.PI*2),w.stroke()}function Ga(e,t,n,r){w.beginPath(),w.moveTo(e-8*n,t+.5),w.lineTo(e-2.8*n,t+.5),w.moveTo(e+2.8*n,t+.5),w.lineTo(e+8*n,t+.5),w.moveTo(e+.5,t-8*n),w.lineTo(e+.5,t-2.8*n),w.moveTo(e+.5,t+2.8*n),w.lineTo(e+.5,t+8*n),w.stroke(),w.beginPath(),w.arc(e,t,r*Math.min(n,1.35),0,Math.PI*2),w.fill()}function Ka(e,t){return t.blocked?vn:t.limited?`rgba(160,170,180,0.95)`:gr(me!=null&&(be||e.gunTargetId===me)?e.penRatio:null)}function qa(e){return e.blocked?vn:e.limited?`rgba(160,170,180,0.95)`:e.sniper?xn:bn}function Ja(e,t){let n=yi,r=In(e,Jn);n.cx=r.x??e.cx,n.cy=r.y??e.cy,n.single=r.single;let i=ka(e);return ei+=(i-ei)*(1-Math.exp(-14*t)),n.radius=ja(ei),n.circleX=e.gunX??n.cx,n.circleY=e.gunY??n.cy,Ma=n.radius,Na=e.gunX!=null&&e.gunY!=null&&Math.hypot(e.gunX-n.cx,e.gunY-n.cy)>n.radius,Pa=n.circleX,Fa=n.circleY,n.sniper=V===`sniper`,n.reloadFraction=Mn(e.reload,e.ammoSelectionPending),n.reloading=n.reloadFraction>0,n.blocked=e.blockedDistM!=null,n.limited=!n.blocked&&e.atGunLimit,n.gunColor=Ka(e,n),n.ringColor=qa(n),n.zoomScale=n.sniper?Math.min(1.8,1.1+.085*(e.zoom||8)):1,n.markerLineWidth=(n.sniper?1.8:1.6)*Math.min(n.zoomScale,1.4),n.centerClearanceRadius=14+(n.zoomScale-1)*9,n.magazine=null,n.magazineBottomY=0,n}function Ya(e,t){let n=e.ammoSelectionPending?null:Ln(e.magazine,e.reload,_i);if(t.magazine=n,t.magazineBottomY=0,!n){gi=null,q=null;return}let r=t.sniper?6.5:5.5,i=t.sniper?16:14,a=t.sniper?4:3.5,o=n.visibleShells,s=o*r+(o-1)*a,c=t.cy+t.centerClearanceRadius+6;t.magazineBottomY=c+i,gi=c,q=n;let l=n.reloading?Tn:Sn,u=n.reloading?`rgba(174,184,192,0.64)`:`rgba(240,160,48,0.7)`;for(let e=0;e<o;e++){let s=Rn(e,o,vi),d=t.cx+(e-(o-1)*.5)*(r+a),f=c+s.y+i*.5;t.magazineBottomY=Math.max(t.magazineBottomY,c+s.y+i);let p=e<n.readyShells,m=n.fullReload?Math.max(0,Math.min(1,n.loadProgress*o-e)):0;w.save(),w.translate(d,f),w.rotate(s.rotation);let h=-r*.5,g=-i*.5;if(zn(w,h,g,r,i),w.strokeStyle=`rgba(5,8,11,0.88)`,w.lineWidth=3,w.stroke(),zn(w,h,g,r,i),w.fillStyle=`rgba(7,11,14,0.52)`,w.fill(),p||m>0){w.save(),zn(w,h,g,r,i),w.clip(),w.fillStyle=l;let e=p?i:i*m;w.fillRect(h-1,g+i-e,r+2,e+1),w.restore()}zn(w,h,g,r,i),w.strokeStyle=p||m>0?l:u,w.lineWidth=1,w.stroke(),w.restore()}n.overflow>0&&(w.fillStyle=l,w.font=`700 9px ${T}`,w.textAlign=`left`,w.fillText(`+${n.overflow}`,t.cx+s*.5+3,c+i),w.textAlign=`center`)}function Xa(e){if(ni<0)return;let t=W-ni;if(t<0||t>=.4){ni=-1;return}be||(w.globalAlpha=.95*(1-t/.4),w.strokeStyle=`#ffffff`,w.fillStyle=`#ffffff`,w.lineWidth=e.markerLineWidth+.6,Ga(e.cx,e.cy,e.zoomScale,1.1))}function Za(e,t){if(t.single)return;if(e.gunX==null||e.gunY==null){La=yn;return}let n=.9*t.zoomScale;La=t.gunColor,w.globalAlpha=.55,w.strokeStyle=`rgba(6,9,12,0.9)`,w.fillStyle=`rgba(6,9,12,0.9)`,w.lineWidth=t.markerLineWidth*.9+1.3,Ga(e.gunX,e.gunY,n,1.1),w.globalAlpha=1,w.strokeStyle=t.gunColor,w.fillStyle=t.gunColor,w.lineWidth=t.markerLineWidth*.9,Ga(e.gunX,e.gunY,n,1.1)}function Qa(e,t){if(!t.reloading)return;let n=Nn(e.reload,e.ammoSelectionPending),r=t.magazine?t.magazineBottomY+15:t.cy+t.centerClearanceRadius+15;w.fillStyle=Sn,w.font=`700 16px ${T}`;let i=w.measureText(n).width;w.font=`500 10.5px ${T}`;let a=e.ammoSelectionPending?``:` s`,o=w.measureText(a).width,s=t.cx-(i+o)/2;w.textAlign=`left`,w.font=`700 16px ${T}`,w.fillText(n,s,r),w.font=`500 10.5px ${T}`,w.fillText(a,s+i,r),w.textAlign=`center`}function $a(e){if(e.blocked)return;let t=ai&&ai[ri]||er[0],n=ar(t),r=t.type||``,i=Math.min(e.cy+Math.max(e.radius*1.02+24,e.radius*1.55+18,96),U-150);w.font=`700 13.5px ${T}`;let a=w.measureText(`${n} `).width;w.font=`800 9px ${T}`;let o=w.measureText(r).width,s=e.cx-(a+o)/2;w.textAlign=`left`,w.font=`700 13.5px ${T}`,w.fillStyle=`rgba(226,236,244,0.92)`,w.fillText(`${n} `,s,i),w.font=`800 9px ${T}`,w.fillStyle=tr[r]||`rgba(159,176,191,0.9)`,w.fillText(r,s+a,i),w.textAlign=`center`}function eo(e,t){if(e.distM==null||!Number.isFinite(e.distM))return;let n=.7071*(t.radius+9);w.textAlign=`left`,w.fillStyle=`rgba(208,221,232,0.8)`,w.font=`600 11.5px ${T}`,w.fillText(`${Math.round(e.distM)} m`,t.cx+n+4,t.cy+n+12),w.textAlign=`center`}function to(e,t){if(window.__HUD_HIDE_ZOOM_PLATE)return;let n=U-96,r=`×${(e.zoom||8).toFixed(1)}`;w.font=`700 16px ${T}`,w.fillStyle=`rgba(196,246,202,0.95)`,w.fillText(r,t.cx,n);let i=w.measureText(r).width/2+12;w.strokeStyle=`rgba(170,240,178,0.5)`,w.lineWidth=1.2,w.beginPath(),w.moveTo(t.cx-i-20,n-5.5),w.lineTo(t.cx-i,n-5.5),w.moveTo(t.cx+i,n-5.5),w.lineTo(t.cx+i+20,n-5.5),w.stroke()}function no(e,t){t.sniper&&($a(t),eo(e,t),to(e,t))}function ro(e,t){let n=kn(e,Yn);if(!n.visible)return;let r=t.cy+Math.max(62,t.radius+24),i=n.kind===`blocked`,a=n.kind===`rollover`;w.font=`800 10.5px ${T}`;let o=w.measureText(n.text).width+32,s=t.cx-o*.5;w.fillStyle=i?`rgba(36,10,10,.92)`:a?`rgba(33,22,8,.94)`:`rgba(12,17,22,.9)`,w.fillRect(s,r-14,o,24),w.strokeStyle=i?`rgba(240,90,90,.78)`:a?`rgba(240,160,48,.88)`:`rgba(170,180,190,.55)`,w.lineWidth=1,w.strokeRect(s+.5,r-13.5,o-1,23),w.beginPath(),w.moveTo(s+13,r-8),w.lineTo(s+19,r+3),w.lineTo(s+7,r+3),w.closePath(),w.strokeStyle=i?vn:a?Sn:`rgba(190,201,210,.92)`,w.stroke(),w.fillStyle=i?`#ff9b91`:a?`#ffd17b`:`rgba(205,216,224,.96)`,w.textAlign=`left`,w.fillText(n.text,s+25,r+1),w.textAlign=`center`}function io(e,t){let n=Ja(e,t),{cx:r,cy:i,radius:a,circleX:o,circleY:s}=n,c=n.sniper,l=e.atGunLimit?vn:yn,u=n.reloadFraction,d=n.reloading,f=c?40:32,p=2*Math.PI*a/f,m=Math.max(2.5,p*.52),h=Math.max(1.5,p-m),g=c?1.5:1.3;w.lineCap=`butt`,w.setLineDash([m,h]),w.globalAlpha=.72,w.strokeStyle=`rgba(0,0,0,0.62)`,w.lineWidth=g+1.5,Wa(o,s,a),w.globalAlpha=.97;let _=n.gunColor,v=n.ringColor;w.strokeStyle=v,w.fillStyle=v,w.lineWidth=g,Wa(o,s,a),d&&(w.globalAlpha=1,w.strokeStyle=Sn,w.lineWidth=g+.8,w.beginPath(),w.arc(o,s,a,-Math.PI/2,-Math.PI/2+u*Math.PI*2),w.stroke()),w.setLineDash([]);let y=n.zoomScale,b=n.single?_:l;Ia=n.single?null:l,La=n.single?_:yn,w.shadowBlur=0,e.ammoSelectionPending?ni=-1:Pn(ti,d)&&(ni=W),ti=!e.ammoSelectionPending&&d;let ee=n.markerLineWidth;w.globalAlpha=.5,w.strokeStyle=`rgba(6,9,12,0.9)`,w.fillStyle=`rgba(6,9,12,0.9)`,w.lineWidth=ee+1.2,Ga(r,i,y,1.6),w.globalAlpha=.97,w.strokeStyle=b,w.fillStyle=b,w.lineWidth=ee,Ga(r,i,y,1.1),Ya(e,n),Xa(n),w.globalAlpha=1,w.shadowBlur=0,Za(e,n),w.globalAlpha=1,w.textAlign=`center`,w.shadowColor=`rgba(0,0,0,0.9)`,w.shadowBlur=3,Qa(e,n),no(e,n),ro(e,n),w.shadowBlur=0,w.textAlign=`left`}function ao(e,t,n=!1){for(let r=0;r<3;r++)Er[r].render(e?.[r]||er[r],r===t,n);wr.hidden===n&&(wr.textContent=n?`SWITCHING`:``,wr.hidden=!n),kr(Dr),ri=t}function oo(e,t,n=!1){for(let r=0;r<3;r++)r===t&&n?Er[r].setCooldown(`100%`):r===t&&e&&e.totalS>0&&e.t>.001?Er[r].setCooldown(`${(e.t/e.totalS*100).toFixed(1)}%`):Er[r].setCooldown(`0`)}let so=new Set;function co(e){return!e||e.isPlayer||!e.combat||e.combat.destroyed||e.id===me?!1:e.team===`player`||Hi(e.id)}function lo(e,t){if(e.visual?.turretTopWorld)e.visual.turretTopWorld(Kn);else if(e.state?.pos)Kn.copy(e.state.pos),Kn.y+=e.spec?.dims?.heightM??2.5;else return!1;return Pi(t,Kn.x,Kn.y,Kn.z),Mi&&Ni<=505}function uo(e){let t=e.team===`player`,n=C(`div`,t?`cot-hpb ally`:`cot-hpb`,oe);n.innerHTML=`<div class="nm"><i class="si"></i><span></span></div><div class="tr"><div class="fl"></div></div>`,e.spec&&ue(F(n,`.si`),e.spec.id,`side_silhouette`,t?gn:`#ff5555`);let r={root:n,nm:F(n,`.nm span`),fill:F(n,`.fl`),lastFrac:-1,lastName:``,lastOp:-1,layoutW:128};return xi.set(e.id,r),r}function fo(e,t){let n=t.spec?.name??t.id;if(e.lastName===n)return;e.nm.textContent=n,e.lastName=n;let r=Math.ceil(e.nm.scrollWidth)+26+5+14;e.layoutW=Math.max(128,Math.min(280,r)),e.root.style.width=`${e.layoutW}px`}function po(e){let t=Ai-e.layoutW*.5,n=ji-42;e.root.style.transform=`translate3d(${t.toFixed(1)}px,${n.toFixed(1)}px,0)`,e.root.style.display=`block`;let r=Math.max(.72,Math.min(1,1.25-Ni/445));Math.abs(r-e.lastOp)<=.03||(e.root.style.opacity=r.toFixed(2),e.lastOp=r)}function mo(e,t){let n=Math.max(0,Math.min(1,t.hp/t.maxHp));Math.abs(n-e.lastFrac)<=.001||(e.fill.style.width=`${(n*100).toFixed(1)}%`,e.lastFrac=n)}function ho(e){let t=e.camera;if(!t)return;let n=so;n.clear();let r=e.tanks||[];for(let e=0;e<r.length;e++){let i=r[e];if(!co(i)||!lo(i,t))continue;n.add(i.id);let a=xi.get(i.id)??uo(i);fo(a,i),po(a),mo(a,i.combat)}for(let[e,t]of xi)n.has(e)||(t.root.style.display=`none`)}function go(e){return!e||e.isPlayer||!e.state||!e.combat||e.combat.destroyed||e.team===`player`?!1:be||Hi(e.id)}function _o(e){let t=$.gunTargetId;if(be||t==null)return null;for(let n=0;n<e.length;n++){let r=e[n];if(r?.id===t&&go(r))return r}return null}function vo(e,t){if(!be&&$.gunTargetId!=null)return null;let n=Math.max(26,Math.min(ei,Math.min(H,U)*.42)),r=Math.max(n*1.15,70),i=null,a=1/0;for(let n=0;n<e.length;n++){let o=e[n];if(!go(o))continue;let s=o.spec?.dims?.heightM??2.4;if(Pi(t,o.state.pos.x,o.state.pos.y+s*.55,o.state.pos.z),!Mi)continue;let c=o.spec?.armor?.boundingRadiusM??6;if(Math.abs(Ni-($.distM??0))>c+16)continue;let l=Math.hypot(Ai-$.cx,ji-$.cy);l>=r||l>=a||(i=o,a=l)}return i}function yo(){let e=$r;return!e||V===`hidden`||$.distM==null?null:_o(he||[])??vo(he||[],e)}function bo(){me=null,le&&=(D.style.display=`none`,!1),de=null}function xo(e,t){return e.visual?.turretTopWorld?e.visual.turretTopWorld(Kn):(Kn.copy(e.state.pos),Kn.y+=e.spec?.dims?.heightM??2.5),Pi(t,Kn.x,Kn.y,Kn.z),Mi}function So(e){let t=Wi(e),n=e.spec?ye(e.spec.id):`–`,r=e.spec?.name??String(e.id),i=!1;if(O.nick.textContent!==t&&(O.nick.textContent=t,i=!0),O.tier.textContent!==n&&(O.tier.textContent=n),O.veh.textContent!==r&&(O.veh.textContent=r,i=!0),!i)return;let a=Math.ceil(O.nick.scrollWidth)+16,o=Math.ceil(O.veh.scrollWidth)+72;pe=Math.max(176,Math.min(320,Math.max(a,o))),D.style.width=`${pe}px`}function Co(){let e=pe*.5,t=Math.max(e+4,Math.min(H-e-4,Ai)),n=Math.max(72,Math.min(U-12,ji-14));D.style.transform=`translate3d(${(t-e).toFixed(1)}px,${(n-64).toFixed(1)}px,0)`,de={cx:t,hw:e,top:n-64,bottom:n}}function wo(e){let t=e.spec?.id??null;t&&t!==ce&&(ue(O.cg,t,`side_silhouette`,`#f0b4ab`),ce=t);let n=`${(Math.max(0,Math.min(1,e.combat.hp/e.combat.maxHp))*100).toFixed(1)}%`;O.fl.style.width!==n&&(O.fl.style.width=n);let r=`${Math.max(0,Math.round(e.combat.hp))}/${Math.round(e.combat.maxHp)}`;O.hp.textContent!==r&&(O.hp.textContent=r),le||=(D.style.display=`block`,!0);let i=xi.get(e.id);i&&(i.root.style.display=`none`)}function To(){let e=yo(),t=$r;if(!e||!t){bo();return}if(me=e.id,!xo(e,t)){bo();return}So(e),Co(),wo(e)}let Eo=[0,0];function Z(e,t){return Ye(e,t,J,220,Eo),Eo}function Do(e,t){return Pe(e?.requireTextured===!0,()=>{if(!e||!e.renderer||!e.scene)return null;let n=t*2,{renderer:s,scene:c,exclude:l}=e;if(e.requireTextured&&s.getContext().isContextLost())throw Error(`WebGL context is lost during minimap capture`);let u=J/2,d=new a(-u,u,u,-u,10,2400);d.position.set(0,900,0),d.up.set(0,0,1),d.lookAt(0,0,0),d.updateMatrixWorld(!0);let f=new Uint8Array(n*n*4),p=s.getRenderTarget(),m=c.fog,h=new i(n,n,{depthBuffer:!0}),g=[];try{if(h.texture.colorSpace=o,c.fog=null,Array.isArray(l))for(let e of l)e&&e.visible!==!1&&(e.visible=!1,g.push(e));let e=new r;c.traverse(t=>{let n=t;if(!n.visible||!n.isMesh&&!n.isSprite)return;let r=n.geometry;if(!r)return;!r.boundingSphere&&r.computeBoundingSphere&&r.computeBoundingSphere();let i=r.boundingSphere;!i||!isFinite(i.radius)||(n.getWorldScale(e),i.radius*Math.max(Math.abs(e.x),Math.abs(e.y),Math.abs(e.z))>J*.9&&(n.visible=!1,g.push(n)))}),s.setRenderTarget(h),s.render(c,d),s.readRenderTargetPixels(h,0,0,n,n,f)}finally{s.setRenderTarget(p),c.fog=m;for(let e of g)e.visible=!0;h.dispose()}let _=document.createElement(`canvas`);_.width=n,_.height=n;let v=mn(_),y=v.createImageData(n,n),b=y.data;for(let e=0;e<n;e++){let t=(n-1-e)*n*4,r=e*n*4;for(let e=0;e<n;e++){let n=t+e*4,i=r+e*4;b[i]=f[n],b[i+1]=f[n+1],b[i+2]=f[n+2],b[i+3]=255}}return v.putImageData(y,0,0),_})}let Oo={base:[70,94,52],hard:[104,96,78],soft:[48,70,54],forest:`rgba(36,64,30,0.82)`,forestStroke:`rgba(22,40,18,0.9)`,water:`rgba(50,84,82,0.7)`,waterStroke:`rgba(28,48,48,0.8)`,roadCasing:`rgba(46,40,28,0.9)`,roadFill:`rgba(196,178,140,0.95)`,buildingFill:`#ccd1d9`};function ko(e){let t=document.createElement(`canvas`);t.width=32,t.height=32;let n=mn(t);n.drawImage(e,0,0,32,32);let r=n.getImageData(0,0,32,32).data,i=0;for(let e=0;e<r.length;e+=4)i+=.2126*r[e]+.7152*r[e+1]+.0722*r[e+2];return i/(1024*255)}function Ao(e,t,n){let r=ko(t)>.58;e.imageSmoothingQuality=`high`,e.filter=r?`saturate(1.08) brightness(1.04) contrast(1.08)`:`saturate(1.12) brightness(1.08) contrast(1.10)`,e.drawImage(t,0,0,n,n),e.filter=`none`}function jo(e,t,n){let r=Math.max(24,Math.round(n/6)),i=document.createElement(`canvas`);i.width=r,i.height=r;let a=mn(i),o=a.createImageData(r,r),s=o.data,c=J/2,l=J/r,u=l*2,d=1.7/(2*u);for(let e=0;e<r;e++){let n=c-(e+.5)*l;for(let i=0;i<r;i++){let a=c-(i+.5)*l,o=t.getHeightAt(a-u,n)-t.getHeightAt(a+u,n),f=t.getHeightAt(a,n+u)-t.getHeightAt(a,n-u),p=Math.max(-1,Math.min(1,(o-f)*d)),m=(e*r+i)*4,h=p>0?255:0;s[m]=h,s[m+1]=h,s[m+2]=h,s[m+3]=Math.round(Math.abs(p)*(p>0?48:80))}}a.putImageData(o,0,0),e.imageSmoothingEnabled=!0,e.imageSmoothingQuality=`high`,e.drawImage(i,0,0,n,n)}function Mo(e,t,n,r){let i=e.createImageData(r,r),a=i.data,o=J/2,s=J/r,c=Math.max(.001,t.maxY-t.minY);for(let e=0;e<r;e++){let i=o-(e+.5)*s;for(let l=0;l<r;l++){let u=o-(l+.5)*s,d=t.getHeightAt(u,i),f=t.getHeightAt(u+s*2,i)-t.getHeightAt(u-s*2,i),p=t.getHeightAt(u,i+s*2)-t.getHeightAt(u,i-s*2),m=Math.max(.55,Math.min(1.2,.88-f*.05+p*.05));m=Math.round(m*5)/5;let h=Math.round((d-t.minY)/c*5)/5,g=t.getGroundType(u,i),_=g===`hard`?n.hard:g===`soft`?n.soft:n.base,v=(e*r+l)*4;a[v]=(_[0]+h*42)*m,a[v+1]=(_[1]+h*42)*m,a[v+2]=(_[2]+h*30)*m,a[v+3]=255}}e.putImageData(i,0,0)}function No(e,t,n){if(t?.length){e.fillStyle=n.water,e.beginPath();for(let n=0;n<t.length;n++){let r=t[n];for(let t=0;t<64;t++){let n=t/64*Math.PI*2,i=Ne(r,n),a=Z(r.x+Math.cos(n)*i,r.z+Math.sin(n)*i);t===0?e.moveTo(a[0],a[1]):e.lineTo(a[0],a[1])}e.closePath()}e.fill()}}function Po(e){let t=/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/.exec(e);return t?`rgba(${Math.round(+t[1]+(52-t[1])*.35)},${Math.round(+t[2]+(60-t[2])*.35)},${Math.round(+t[3]+(48-t[3])*.35)},${((t[4]==null?1:+t[4])*.8).toFixed(2)})`:e}function Fo(e,t,n,r,i,a){e.beginPath();for(let o=0;o<Gr.length;o++){let s=t+(Gr[o]-t)*a+r,c=n+(Kr[o]-n)*a+i;o===0?e.moveTo(s,c):e.lineTo(s,c)}e.closePath()}function Io(e,t,n,r,i){let a=Z(t.x,t.z),o=a[0],s=a[1],c=Math.abs(Math.sin(t.x*12.9898+t.z*78.233)*43758.5453),l=c-Math.floor(c),u=Math.max(2.2,t.r/J*220)*(.82+l*.4);for(let e=0;e<Gr.length;e++){let t=e/Gr.length*Math.PI*2,n=u*(.62+.46*Math.abs(Math.sin(c+e*2.3))+.14*Math.sin(c*3.1+e*5.7));Gr[e]=o+Math.cos(t)*n,Kr[e]=s+Math.sin(t)*n*(.86+.12*Math.sin(c*1.7))}r&&(e.filter=`blur(0.5px)`),Fo(e,o,s,.8,1.1,1),e.fillStyle=r?`rgba(8,14,7,0.18)`:`rgba(8,14,7,0.28)`,e.fill(),Fo(e,o,s,0,0,1),e.globalAlpha=(.68+l*.24)*(r?.72:1),e.fillStyle=i,e.fill(),r||(e.globalAlpha=.42,e.strokeStyle=n.forestStroke,e.lineWidth=.45,e.stroke()),e.globalAlpha=1,Fo(e,o,s,-.5,-.7,.55),e.fillStyle=`rgba(106,140,74,${r?.1:.22})`,e.fill(),r&&(e.filter=`none`)}function Lo(e,t,n,r){if(!t)return;e.lineJoin=`round`;let i=r?Po(n.forest):n.forest;for(let a=0;a<t.length;a++)Io(e,t[a],n,r,i)}function Ro(e,t,n,r){e.strokeStyle=n,e.lineWidth=r;for(let n=0;n<t.length;n++){let r=t[n];e.beginPath();for(let t=0;t<r.length;t++){let n=Z(r[t][0],r[t][1]);t===0?e.moveTo(n[0],n[1]):e.lineTo(n[0],n[1])}e.stroke()}}function zo(e,t,n){t&&(e.lineJoin=`round`,e.lineCap=`round`,Ro(e,t,n.roadCasing,3.8),Ro(e,t,n.roadFill,2),e.lineCap=`butt`)}function Bo(e){if(e[0]!==`#`||e.length!==7)return`rgb(56,50,42)`;let t=parseInt(e.slice(1),16);return`rgb(${(t>>16&255)*.32|0},${(t>>8&255)*.32|0},${(t&255)*.32|0})`}function Vo(e,t,n){if(!t)return;let r=Bo(n.buildingFill);e.strokeStyle=`rgba(198,208,218,0.4)`,e.lineWidth=.7;for(let n=0;n<t.length;n++){let i=t[n],a=Z(i.x,i.z),o=Math.max(4,(i.w??0)/J*220),s=Math.max(4,(i.d??0)/J*220);e.save(),e.translate(a[0],a[1]),e.rotate(-(i.rot||i.yaw||0)),e.globalAlpha=.9,e.fillStyle=r,e.fillRect(-o/2,-s/2,o,s),e.globalAlpha=1,o*s>=26&&e.strokeRect(-o/2,-s/2,o,s),e.restore()}}function Ho(e,t,n){if(!t?.length)return;let r=e.canvas.width,i=e.canvas.height,a=e.getTransform(),o=Math.max(1,Math.abs(a.a)||1),s=()=>{let e=document.createElement(`canvas`);return e.width=r,e.height=i,[e,mn(e)]},[c,l]=s();l.setTransform(a),l.beginPath();for(let e=0;e<t.length;e++){let n=t[e];for(let e=0;e<64;e++){let t=e/64*Math.PI*2,r=Ne(n,t),i=Z(n.x+Math.cos(t)*r,n.z+Math.sin(t)*r);e===0?l.moveTo(i[0],i[1]):l.lineTo(i[0],i[1])}l.closePath()}l.fillStyle=`#fff`,l.fill();let[u,d]=s();d.filter=`blur(${(1.9*o).toFixed(2)}px)`,d.drawImage(c,0,0),d.filter=`none`;let f=(e,t,n)=>{let[a,o]=s();return o.drawImage(e,0,0),o.globalCompositeOperation=`destination-out`,o.drawImage(t,0,0),o.globalCompositeOperation=`source-in`,o.fillStyle=n,o.fillRect(0,0,r,i),a},p=f(c,u,`rgb(204,234,240)`),m=f(u,c,n.waterStroke);e.save(),e.setTransform(1,0,0,1,0,0),e.globalAlpha=.55,e.drawImage(p,0,0),e.globalAlpha=.9,e.drawImage(m,0,0),e.restore()}function Uo(e,t,n,r){let i={...Oo,...n||{}};si=e,J=e&&e.size?e.size:1024;let a=220*Rr,o=r?Do(r,a):null,s=document.createElement(`canvas`);s.width=a,s.height=a;let c=mn(s);o?Ao(c,o,a):Mo(c,e,i,a),jo(c,e,a);let l=document.createElement(`canvas`);l.width=220*Rr,l.height=220*Rr;let u=mn(l);u.drawImage(s,0,0),u.setTransform(Rr,0,0,Rr,0,0);let d=t||{};No(u,d.waterOrSoft,i),Ho(u,d.waterOrSoft,i),Lo(u,d.treeClusters,i,!!o),zo(u,d.roads,i),Vo(u,d.buildings,i),B=l,zr={source:o?`scene`:`procedural`,generation:Ur,width:l.width,height:l.height}}function Wo(e){if(!e)return Promise.reject(Error(`Missing minimap asset URL`));let t=Wr.get(e);return t||(t=new Promise((t,n)=>{let r=new Image;r.decoding=`async`,r.onload=()=>t(r),r.onerror=()=>n(Error(`Failed to load minimap asset: ${e}`)),r.src=e,typeof r.decode==`function`&&r.decode().then(()=>t(r),()=>{})}).catch(n=>{throw Wr.get(e)===t&&Wr.delete(e),n}),Wr.set(e,t),t)}async function Go(e,t,n){let r=await Wo(t);return n!==Ur||(si=e,J=e&&e.size?e.size:1024,n!==Ur)?!1:(zr={source:`asset`,generation:n,width:r.naturalWidth,height:r.naturalHeight},B=r,Yo(),Hr=!0,!0)}let Ko=null;function qo(e){if(Ko)return Ko;let t=e.createRadialGradient(220/2,220/2,220*.44,220/2,220/2,220*.76);return t.addColorStop(0,`rgba(0,0,0,0)`),t.addColorStop(1,`rgba(0,0,0,0.32)`),Ko=t,t}function Jo(e){e.lineWidth=1,e.strokeStyle=`rgba(0,0,0,0.20)`,e.beginPath();for(let t=1;t<10;t++)e.moveTo(t*220/10+1,0),e.lineTo(t*220/10+1,220),e.moveTo(0,t*220/10+1),e.lineTo(220,t*220/10+1);e.stroke(),e.strokeStyle=`rgba(236,244,252,0.17)`,e.lineWidth=.7,e.beginPath();for(let t=1;t<10;t++)e.moveTo(t*220/10+.5,0),e.lineTo(t*220/10+.5,220),e.moveTo(0,t*220/10+.5),e.lineTo(220,t*220/10+.5);e.stroke(),e.font=`700 8px ${T}`,e.textAlign=`center`,e.textBaseline=`middle`,e.save(),e.shadowColor=`rgba(0,0,0,0.9)`,e.shadowBlur=3,e.fillStyle=`rgba(255,255,255,0.74)`;for(let t=0;t<10;t++){let n=t*220/10+220/20;e.fillText(String((t+1)%10),n,6),e.fillText(ur[t],6,t===0?Math.max(n,13):n+.5)}e.restore(),e.textAlign=`left`,e.textBaseline=`alphabetic`,e.fillStyle=qo(e),e.fillRect(0,0,220,220),e.strokeStyle=`rgba(0,0,0,0.55)`,e.lineWidth=2,e.strokeRect(1,1,218,218),e.strokeStyle=`rgba(226,236,246,0.24)`,e.lineWidth=1,e.strokeRect(.5,.5,219,219)}function Yo(){z.fillStyle=`#0b100e`,z.fillRect(0,0,220,220),B&&z.drawImage(B,0,0,220,220),Jo(z)}function Xo(e){let t=e.tanks||[],n=0,r=0,i=0,a=0,o=0,s=0;for(let e of t)!e||!e.state||(e.team===`player`||e.isPlayer?(n+=e.state.pos.x,r+=e.state.pos.z,i++):(a+=e.state.pos.x,o+=e.state.pos.z,s++));!i||!s||(Ei=[{x:n/i,z:r/i,color:`#8df08d`,fill:`rgba(126,232,126,0.30)`},{x:a/s,z:o/s,color:`#f26e64`,fill:`rgba(240,90,90,0.30)`}])}function Zo(e,t,n,r,i,a,o){e.save(),e.translate(t,n),e.rotate(Ze(r)),e.globalAlpha=o,e.beginPath(),e.moveTo(0,-a),e.lineTo(a*.74,a*.9),e.lineTo(0,a*.42),e.lineTo(-a*.74,a*.9),e.closePath(),e.fillStyle=i,e.strokeStyle=`rgba(4,8,6,0.95)`,e.lineWidth=1.4,e.lineJoin=`round`,e.fill(),e.stroke(),e.restore()}let Qo=new Map,$o=[],es=0;function ts(e,t,n,r,i,a,o){let s=$o[es];s||(s={x:0,y:0,yaw:0,fill:``,s:0,a:0,fixed:!1},$o[es]=s),s.x=e,s.y=t,s.yaw=n,s.fill=r,s.s=i,s.a=a,s.fixed=o,es++}function ns(e){let t=Qo.get(e);if(!t){let n=lr(String(e));t=[(n%5-2)*.9,((n>>3)%5-2)*.9],Qo.set(e,t)}return t}function rs(e,t){e.beginPath(),e.moveTo(0,-4.1*t),e.lineTo(4.6*t,0),e.lineTo(0,4.1*t),e.lineTo(-4.6*t,0),e.closePath()}function is(e,t,n){e.save(),e.translate(t,n);let r=1.35;e.globalAlpha=.8,e.strokeStyle=`rgba(8,12,16,0.85)`,e.lineWidth=3.2,rs(e,r),e.stroke(),e.globalAlpha=.4,e.fillStyle=`rgb(242,140,132)`,rs(e,r),e.fill(),e.globalAlpha=.9,e.lineWidth=1.1,e.strokeStyle=`rgba(255,178,170,0.95)`,rs(e,r),e.stroke(),e.globalAlpha=.75,e.fillStyle=`rgb(242,140,132)`,e.beginPath(),e.arc(0,0,1.7,0,Math.PI*2),e.fill(),e.restore()}function as(e,t){if(Ei)for(let n=0;n<Ei.length;n++){let r=Ei[n],i=Z(r.x,r.z),a=i[0],o=i[1],s=Math.hypot(a-e,o-t)<15;z.save(),s&&(z.globalAlpha=.55),v(z,a,o,10,r.color,r.fill||`rgba(240,246,252,0.07)`),z.restore()}}function os(e,t,n,r,i){let a=.5+.5*Math.sin(t*5.2);for(let t of e){let e=Z(t.x,t.z),o=Math.max(7,Math.min(213,e[0])),s=Math.max(7,Math.min(213,e[1])),c=ne(t.side),l=h(t.side),u=Math.hypot(o-n,s-r)<14,d=(e,t)=>{z.beginPath(),z.arc(o,s,e+a*3.5,0,Math.PI*2),z.lineWidth=2,z.strokeStyle=c,z.globalAlpha=t*(1-a),z.stroke(),z.globalAlpha=1};switch(z.save(),t.kind){case`spawn`:{let e=t.status===`respawn`&&t.side===`own`&&i;u&&!e&&(z.globalAlpha=.6),e&&d(12,.6),v(z,o,s,8.5,c,l);break}case`flagBase`:u&&(z.globalAlpha=.7),z.beginPath(),z.arc(o,s,10,0,Math.PI*2),z.fillStyle=l,z.fill(),z.lineWidth=3.6,z.strokeStyle=S.keyline,z.stroke(),t.status===`away`&&z.setLineDash([4,3]),z.lineWidth=2,z.strokeStyle=c,z.stroke(),z.setLineDash([]);break;case`flag`:t.pulse&&d(8,.55),t.status===`dropped`&&(z.setLineDash([2.5,2.5]),z.lineWidth=1.2,z.strokeStyle=c,z.beginPath(),z.arc(o,s,7.5,0,Math.PI*2),z.stroke(),z.setLineDash([])),b(z,o,s+4,15,c);break;case`zone`:case`sector`:{let e=t.status===`locked`,n=t.status===`taken`,r=n?7.5:t.kind===`zone`?8.5:9.5;e&&(z.globalAlpha=.72),t.pulse&&d(r+3,.5),f(z,o,s,r,{fill:l,stroke:c,label:t.label,ringWidth:2,dashed:t.side===`contested`||e,font:`700 ${n?8.5:10}px ${T}`});let i=t.progress??0;i>.01&&i<.995&&t.progressSide&&m(z,o,s,r+3.4,i,ne(t.progressSide),2),n&&te(z,o+r*.7,s+r*.7,5,S.own);break}case`goal`:u&&(z.globalAlpha=.7),_(z,o,s,9,c,l);break;case`ball`:d(5,.35),y(z,o,s,5.2);break;case`pickup`:x(z,o,s,6,t.status===`heal`?`heal`:`ammo`);break;default:break}z.restore()}}function ss(e){let t=Z(e.pos.x,e.pos.z);z.strokeStyle=`rgba(140,140,140,0.85)`,z.lineWidth=1.4,z.beginPath(),z.moveTo(t[0]-3.5,t[1]-3.5),z.lineTo(t[0]+3.5,t[1]+3.5),z.moveTo(t[0]+3.5,t[1]-3.5),z.lineTo(t[0]-3.5,t[1]+3.5),z.stroke()}function cs(e,t){let n=e.team===`player`,r=ns(e.id);if(n){let e=Z(t.pos.x,t.pos.z);ts(e[0]+r[0],e[1]+r[1],t.yaw,gn,5,.95,!1);return}let i=Si.get(e.id);if(i?.vis){let e=Z(t.pos.x,t.pos.z);ts(e[0]+r[0],e[1]+r[1],t.yaw,vn,5,.95,!1)}else if(i?.ever){let e=Z(i.lastX,i.lastZ);is(z,e[0],e[1])}}function ls(e){es=0;for(let t=0;t<e.length;t++){let n=e[t],r=n?.state;if(!(!n||!r||n.isPlayer)){if(n.combat?.destroyed){ss(r);continue}cs(n,r)}}}function us(e,t){let n=Z(e.pos.x,e.pos.z),r=n[0],i=n[1];if(z.strokeStyle=`rgba(240,246,252,0.35)`,z.setLineDash([3,3]),z.beginPath(),z.arc(r,i,220/J*445,0,Math.PI*2),z.stroke(),z.setLineDash([]),t){qn.set(0,0,-1).transformDirection(t.matrixWorld);let e=Xe(qn.x,qn.z);z.fillStyle=`rgba(235,245,255,0.15)`,z.beginPath(),z.moveTo(r,i),z.arc(r,i,36,e-.42,e+.42),z.closePath(),z.fill(),z.strokeStyle=`rgba(240,248,255,0.35)`,z.lineWidth=.8,z.beginPath(),z.moveTo(r,i),z.lineTo(r+Math.cos(e-.42)*36,i+Math.sin(e-.42)*36),z.moveTo(r,i),z.lineTo(r+Math.cos(e+.42)*36,i+Math.sin(e+.42)*36),z.stroke()}let a=Ze(e.yaw+e.turretYaw);z.strokeStyle=`rgba(235,245,255,0.75)`,z.lineWidth=1.2,z.beginPath(),z.moveTo(r,i),z.lineTo(r+Math.sin(a)*15,i-Math.cos(a)*15),z.stroke(),ts(r,i,e.yaw,`#f2f8ff`,6.6,1,!0)}function ds(e,t,n,r){let i=13.5,a=t.x-e.x,o=t.y-e.y,s=Math.hypot(a,o);if(s>=i)return!1;if(s<.01){let e=(n*2.399+r)%(Math.PI*2);a=Math.cos(e),o=Math.sin(e)}else a/=s,o/=s;let c=i-s;return e.fixed&&!t.fixed?(t.x+=a*c,t.y+=o*c):t.fixed&&!e.fixed?(e.x-=a*c,e.y-=o*c):!e.fixed&&!t.fixed&&(e.x-=a*c/2,e.y-=o*c/2,t.x+=a*c/2,t.y+=o*c/2),!0}function fs(){for(let e=0;e<6;e++){let e=!1;for(let t=0;t<es;t++)for(let n=t+1;n<es;n++)ds($o[t],$o[n],t,n)&&(e=!0);if(!e)break}}function ps(){let e=null;for(let t=0;t<es;t++){let n=$o[t];if(n.fixed){e=n;continue}n.x=Math.max(21,Math.min(215,n.x)),n.y=Math.max(14,Math.min(215,n.y)),Zo(z,n.x,n.y,n.yaw,n.fill,n.s,n.a)}e&&Zo(z,e.x,e.y,e.yaw,e.fill,e.s,e.a)}function ms(e){Yo();let t=e.tanks||[],n=e.player,r=NaN,i=NaN;if(n?.state){let e=Z(n.state.pos.x,n.state.pos.z);r=e[0],i=e[1]}let a=ee(e.matchModeState);Ei&&!g(a)&&as(r,i),a.length&&os(a,e.timeS,r,i,!!n?.combat?.destroyed),ls(t),n?.state&&us(n.state,e.camera),fs(),ps()}function hs(e){let t=(e.killerId?ci.get(e.killerId):null)||n(`hud.enemy`),r=(e.id?ci.get(e.id):null)||e.specId||n(`hud.tankFallback`),i=C(`div`,`cot-kf`,Lt),a=or(e.cause||``),o=e.killerId?li.get(e.killerId):null,s=(e.id?li.get(e.id):null)||e.specId;for(i.innerHTML=(o?`<span class="si ksi"></span>`:``)+`<span class="k"></span><span class="d">${n(`hud.shell.destroyed`)}</span>`+(s?`<span class="si vsi"></span>`:``)+`<span class="v"></span>`+(a?`<span class="c">${a}</span>`:``),o&&ue(F(i,`.ksi`),o,`side_silhouette`,`#cfe3f4`),s&&ue(F(i,`.vsi`),s,`side_silhouette`,`#f28f8f`),F(i,`.k`).textContent=t,F(i,`.v`).textContent=r,Lt.prepend(i);Lt.children.length>5;)Lt.lastChild?.remove();setTimeout(()=>i.classList.add(`out`),5200),setTimeout(()=>{i.parentNode&&i.remove()},6200)}function gs(e){if(!$r||V===`hidden`||(Pi($r,e.pos[0],e.pos[1]+1.5,e.pos[2]),!Mi))return;let t=C(`div`,`cot-dmgnum`,se),r=je(e);if(e.damage>0){if(t.textContent=`-${Math.round(e.damage)}`,e.modulesHit&&e.modulesHit.length||e.crewHit&&e.crewHit.length){let e=C(`span`,`crit`,t);e.textContent=n(`hud.dmg.crit`)}}else if(document.body.classList.contains(`cot-touch-layout`))t.classList.add(`miss`),t.dataset.outcome=r.id,t.style.color=r.color,t.textContent=r.label;else{t.remove();return}let i=Ai,a=ji,o=performance.now();for(let e=pi.length-1;e>=0;e--)pi[e].until<o&&pi.splice(e,1);for(let e=0;e<8;e++){let e=pi.find(e=>Math.abs(e.x-i)<72&&Math.abs(e.y-a)<24);if(!e)break;a=e.y-26,i+=(Math.random()-.5)*12}i=Math.min(Math.max(i,90),H-90),a=Math.min(Math.max(a,40),U-60),pi.push({x:i,y:a,until:o+900}),t.style.left=`${i.toFixed(0)}px`,t.style.top=`${a.toFixed(0)}px`,setTimeout(()=>{t.parentNode&&t.remove()},1800)}function _s(e,t,n){if(e.attackerId!=null&&he)for(let t=0;t<he.length;t++){let r=he[t];if(!(r?.id!==e.attackerId||!r.state))return n.x=r.state.pos.x,n.z=r.state.pos.z,!0}if(!e.localDir)return!1;let r=t.yaw||0,i=Math.cos(r),a=Math.sin(r),o=e.localDir[0]*i+e.localDir[2]*a,s=-e.localDir[0]*a+e.localDir[2]*i,c=Math.hypot(o,s);return c<=1e-4?!1:(n.x=t.pos.x-o/c*180,n.z=t.pos.z-s/c*180,!0)}function vs(e,t,n,r,i,a,o,s){let c=Math.atan2(n.x-r.pos.x,n.z-r.pos.z);for(let l=0;l<K.length;l++){let u=K[l];if(u.kind!==e||u.mergeKey!==t)continue;let d=Math.atan2(u.wx-r.pos.x,u.wz-r.pos.z),f=Math.abs(c-d)%(Math.PI*2);if(f>Math.PI&&(f=Math.PI*2-f),!(f>=.35))return u.wx=n.x,u.wz=n.z,u.dmg+=i,u.amount+=a,o&&(u.label=`-${u.amount}`),u.crit=u.crit||s,u.t0=W,u.re=!0,!0}return!1}function ys(e,t){if(!t?.state)return;let n=t.state;if(!_s(e,n,ui))return;let r=Number.isFinite(e.damage)?Math.max(0,e.damage||0):0,i=je(e),a=ke(e),o=a.kind,s=Dn(e,o===`bounce`&&i.blocked);if(!vs(o,a.mergeKey,ui,n,r,s,a.numeric,a.critical))for(K.push({wx:ui.x,wz:ui.z,kind:o,outcomeId:a.outcomeId,mergeKey:a.mergeKey,label:a.label,labelColor:a.color,numeric:a.numeric,crit:a.critical,dmg:r,amount:s,t0:W,re:!1,_screenAng:null});K.length>5;)K.shift()}function Q(e,{tone:t=`warning`,icon:n=`info`}={}){on.textContent=e,an.innerHTML=k(n,18),rn.classList.remove(`danger`,`warning`,`success`,`info`),rn.classList.add(t),rn.classList.add(`show`),oi&&clearTimeout(oi),oi=setTimeout(()=>rn.classList.remove(`show`),2400)}let bs=null;E(`tank:destroyed`,e=>{hs(e),nn.onDestroyed(e.id)}),E(`ui:shellSelect`,({slot:e})=>{e!=null&&!Tr[e]?.classList.contains(`empty`)&&ki(e)}),E(`ui:shellSelectionChanged`,({slot:e})=>{e!=null&&ki(e)}),E(`ui:perfMeter`,e=>{ht=!!(e&&e.on),ht||(A.style.display=`none`,dt=0,pt=0)}),E(`ui:directionalHitValues`,e=>{Br=!!(e&&e.on)}),E(`ui:bindingsChanged`,e=>{if(e){if(Array.isArray(e.shells))for(let t=0;t<3&&t<e.shells.length;t++){let n=Tr[t].querySelector(`.key`);n&&(n.textContent=e.shells[t])}if(Array.isArray(e.consumables))for(let t=0;t<R.length&&t<e.consumables.length;t++){let n=R[t].querySelector(`.key`);n&&(n.textContent=e.consumables[t])}typeof e.specialAction==`string`&&(yr.textContent=e.specialAction)}}),E(`ui:specialActionResult`,({kind:e,active:t})=>{e===_e.GUIDED_MISSILE?Q(n(t?`hud.alert.atgmSelected`:`hud.alert.atgmDeselected`),{icon:t?`missileRack`:`shell`,tone:t?`success`:`info`}):e===_e.HYDROPNEUMATIC_AIM?Q(n(t?`hud.alert.suspensionAimEngaged`:`hud.alert.suspensionAimDisengaged`),{icon:`gunMount`,tone:t?`success`:`info`}):e===_e.MAGAZINE_RELOAD&&Q(n(`hud.alert.magazineReloadStarted`),{icon:`shell`})});function xs(e,t=!1){let n=e==null?null:Tr[e];n&&(n.classList.remove(`deny`),n.offsetWidth,n.classList.add(`deny`)),t&&(L.classList.remove(`deny`),L.offsetWidth,L.classList.add(`deny`))}E(`ui:ammoSelectionDenied`,({slot:e,guided:t})=>{xs(e,!!t),Q(n(t?`hud.alert.missilesDepleted`:`hud.alert.ammoTypeEmpty`),{icon:t?`missileRack`:`shell`,tone:`danger`})}),E(`ui:specialActionDenied`,({reason:e,slot:t})=>{if(e===`AMMO_EMPTY`){xs(t,!0),Q(n(`hud.alert.missilesDepleted`),{icon:`missileRack`,tone:`danger`});return}Q(n(e===`MAGAZINE_RELOADING`?`hud.alert.magazineReloadInProgress`:e===`MAGAZINE_FULL`?`hud.alert.magazineAlreadyFull`:`hud.alert.specialActionUnavailable`),{icon:`clock`,tone:`info`})}),E(`ui:magazineReloadStarted`,()=>Q(n(`hud.alert.magazineReloadStarted`),{icon:`shell`})),E(`ui:magazineReloadDenied`,({reason:e})=>{Q(n(e===`MAGAZINE_RELOADING`?`hud.alert.magazineReloadInProgress`:e===`MAGAZINE_FULL`?`hud.alert.magazineAlreadyFull`:`hud.alert.magazineReloadUnavailable`),{icon:e===`MAGAZINE_FULL`?`check`:`clock`,tone:`info`})}),E(`ui:consumableUsed`,({slot:e,readyAt:t,cooldownS:r})=>{e==null||t==null||r==null||R[e]&&(Nr[e]=t,Pr[e]=r,Fr(W),Q(n(`hud.alert.consumableUsed`,{name:pr[e].label}),{icon:[`repair`,`medkit`,`extinguisher`][e]||`check`,tone:`success`}))}),E(`ui:consumableDenied`,({slot:e,reason:t,remainingS:r})=>{if(e==null)return;t===`NOTHING`?Q(n(e===2?`hud.alert.noFireToExtinguish`:e===1?`hud.alert.crewUnharmed`:`hud.alert.nothingToRepair`),{icon:[`repair`,`medkit`,`extinguisher`][e]||`info`,tone:`info`}):t===`COOLDOWN`?Q(n(`hud.alert.consumableReadyIn`,{seconds:Math.ceil(r||0)}),{icon:`clock`,tone:`info`}):t===`RULESET`&&Q(n(`hud.alert.consumablesDisabled`),{icon:`info`,tone:`info`});let i=R[e];i&&(i.classList.remove(`deny`),i.offsetWidth,i.classList.add(`deny`))}),E(`ui:consumableReset`,()=>{for(let e=0;e<R.length;e++)Nr[e]=0,Pr[e]=Ee[e].cooldownS,F(R[e],`.cnt`).textContent=`∞`,F(R[e],`.cool`).style.display=`none`,R[e].classList.remove(`used`,`deny`,`cooling`),R[e].setAttribute(`aria-label`,n(`hud.consumable.ready`,{name:pr[e].label}))}),E(`ui:autoAimState`,({on:e,targetName:t,reason:r})=>{e?Q(n(`hud.alert.autoAimOn`,{name:String(t||n(`hud.alert.autoAimTarget`)).toUpperCase()}),{icon:`autoAim`,tone:`success`}):r&&Q(r,{icon:`autoAim`,tone:`info`})}),E(`ammo:empty`,({id:e})=>{(G==null||e===G)&&Q(n(`hud.alert.ammoTypeEmpty`),{icon:`shell`,tone:`danger`})}),E(`ammo:depleted`,({id:e,slot:t,fallbackSlot:r})=>{if(G!=null&&e!==G)return;r!=null&&r>=0&&ki(r);let i=t!=null&&ai?.[t]?.type===`ATGM`;Q(n(i?`hud.alert.missilesDepletedNext`:r!=null&&r>=0?`hud.alert.ammoDepletedNext`:`hud.alert.allAmmoDepleted`),{icon:i?`missileRack`:`shell`,tone:`danger`})}),E(`mode:pickup_collected`,({by:e,kind:t,ammoAdded:r})=>{if(G!=null&&e!==G)return;let i=Math.max(0,Number(r)||0);Q(t===`heal`?n(`hud.alert.fieldRepairAcquired`):n(`hud.alert.ammoAcquired`,{amount:i}),{icon:t===`heal`?`repair`:`shell`,tone:`success`})}),E(`mode:wave_started`,({wave:e})=>{Q(n(`hud.alert.waveInbound`,{wave:Math.max(1,Number(e)||1)}),{icon:`modeHorde`,tone:`warning`})}),E(`mode:flag_captured`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.alliedFlagCapture`:`hud.alert.enemyFlagCapture`),{icon:`modeFlag`,tone:t?`success`:`danger`})}),E(`mode:zone_captured`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.sectorSecured`:`hud.alert.sectorLost`),{icon:`modeZones`,tone:t?`success`:`danger`})}),E(`mode:goal_scored`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.alliedGoal`:`hud.alert.enemyGoal`),{icon:`modeTurbo`,tone:t?`success`:`danger`})}),E(`mode:line_advanced`,({line:e,total:t})=>{Q(n(`hud.alert.lineTaken`,{line:Math.max(1,Number(e)||1),total:Math.max(1,Number(t)||3)}),{icon:`modeZones`,tone:`success`})}),E(`mode:wave_cleared`,({wave:e,nextWaveInS:t})=>{Q(n(`hud.alert.waveCleared`,{wave:Math.max(1,Number(e)||1),seconds:Math.ceil(Number(t)||0)}),{icon:`repair`,tone:`success`})}),E(`mode:respawn`,({id:e})=>{G!=null&&e!==G||(nn.hide(),Q(n(`hud.alert.respawned`),{icon:`rematch`,tone:`info`}))}),E(`mode:flag_taken`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.flagTakenEnemy`:`hud.alert.flagTakenAllied`),{icon:`modeFlag`,tone:t?`danger`:`success`})}),E(`mode:flag_dropped`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.flagDroppedEnemy`:`hud.alert.flagDroppedAllied`),{icon:`modeFlag`,tone:t?`success`:`warning`})}),E(`mode:flag_returned`,({team:e})=>{let t=e===at;Q(n(t?`hud.alert.flagReturnedAllied`:`hud.alert.flagReturnedEnemy`),{icon:`modeFlag`,tone:t?`success`:`info`})}),E(`mode:pickup_spawned`,({kind:e})=>{Q(n(e===`heal`?`hud.alert.repairCacheDropped`:`hud.alert.ammoCacheDropped`),{icon:e===`heal`?`repair`:`shell`,tone:`info`})});let Ss=[160,220,300],Cs=1;E(`ui:minimapZoom`,()=>{Cs=(Cs+1)%Ss.length;let e=`${Ss[Cs]}px`;Ir.style.width=e,Ir.style.height=e}),E(`shell:hit`,e=>{if(hn(e)){if(G!=null&&e.attackerId===G&&e.targetId&&e.targetId!==G){gs(e);let t=je(e).confirmTone===`deflect`;mi={t0:W,bounced:t}}G!=null&&e.targetId===G&&ys(e,bs)}}),E(`module:state`,e=>{if(G==null||e.id!==G||e.state===`ok`)return;let t=e.module||``,r=fe(t),i=Zn(t);if(e.repaired){Q(n(`hud.alert.moduleRepaired`,{label:r}),{icon:i,tone:`success`});return}Q(n(e.state===`red`?`hud.alert.moduleDestroyed`:`hud.alert.moduleDamaged`,{label:r}),{icon:i,tone:e.state===`red`?`danger`:`warning`})});let $={cx:0,cy:0,radPx:40,penRatio:null,distM:null,blockedDistM:null,blockedLabel:!1,gunX:null,gunY:null,gunDistM:null,gunTargetId:null,singleReticle:!1,atGunLimit:!1,gunLimitSpec:!1,selfRightLabel:null,reload:{t:0,totalS:1,kind:`ready`},ammoSelectionPending:!1,magazine:null,zoom:1,dispRadM:null};function ws(e){$.dispRadM=e.dispersionRadM??null,$.penRatio=e.penRatio??null,$.gunDistM=e.gunDistM??null,$.gunTargetId=e.gunTargetId??null,$.singleReticle=!!e.singleReticle,$.blockedDistM=e.blockedDistM??null,$.blockedLabel=!!e.blockedLabel,$.distM=e.distM??null,$.atGunLimit=!!e.atGunLimit,$.gunLimitSpec=!!e.gunLimitSpec,$.reload=e.reload||$.reload,$.ammoSelectionPending=e.ammoSelectionPending===!0,$.magazine=e.magazine||null,$.zoom=e.zoom||1,$.gunX=null,$.gunY=null}function Ts(e,t){if(!e||!t.point?.isVector3||(Pi(e,t.point.x,t.point.y,t.point.z),!Mi))return!1;$.cx=Ai,$.cy=ji;let n=t.distM??Ni;return $.radPx=(t.dispersionRadM??1.5)*Fi(e,n),!0}function Es(e,t){$.cx=H/2,$.cy=U/2,$.radPx=t.dispersionRadM!=null&&t.distM!=null?t.dispersionRadM*Fi(e,t.distM):Math.min(H,U)*.05}function Ds(e,t){!e||!t.gunMarker?.isVector3||(Pi(e,t.gunMarker.x,t.gunMarker.y,t.gunMarker.z),Mi&&($.gunX=Ai,$.gunY=ji))}function Os(e,t){ws(t),Ts(e,t)||Es(e,t),Ds(e,t)}function ks(e,t=!1){if(!(!t&&Ha($))){if(w.clearRect(0,0,H,U),V===`hidden`){X.valid=!1;return}V===`sniper`&&ga($),Da(W),io($,e),Oa($,W),Ua($)}}let As=null;function js(){if(!As||!As.isConnected){let e=document.getElementById(`app`);As=e?e.querySelector(`canvas`):null}return As}function Ms(){s.style.display=V===`hidden`?`none`:`block`,V===`sniper`&&Qr!==`sniper`&&(Zr=performance.now()),Qr=V;let e=js();e&&e.style.filter&&(e.style.filter=``)}function Ns(e){if(!xe||!bs?.state)return;let t=(e||$r)?.matrixWorld?.elements??null,n=t?Math.atan2(-t[8],-t[10]):0;xe.setPose(bs.state.yaw||0,bs.state.turretYaw||0,n)}function Ps(e){for(let t=0;t<e.length;t++){let n=e[t];n?.spec&&(ci.set(n.id,n.spec.name),li.set(n.id,n.spec.id))}}function Fs(e){let t=bi;return t.advancing=e.timeS!==W,t.advancing&&(ii=null,be=!1),t.camera=e.camera??null,$r=t.camera||$r,he=e.tanks||he,t.dt=Math.max(0,Math.min(.1,e.timeS-W))||1/60,W=e.timeS,Fr(W),e.mode&&e.mode!==V&&(V=e.mode,Ms(),Hr=!0),bs=e.player||bs,e.player&&(G=e.player.id),Sr(e.player||bs),j(e.player||bs,e.timeS),Ns(t.camera),Gt.setPlayer(G),Ps(e.tanks||[]),t}function Is(e,t){t&&(t.updateMatrixWorld(),Un.copy(t.matrixWorld).invert()),Ei||Xo(e),Vi(e),ca(e),gt(e),_n(e.timeS),ir(e.spotting?.player??null)}function Ls(e,t){let n=!t.advancing&&ii?ii:e.aim||{};Os(t.camera,n),nn.observe(e.player?.combat?.destroyed===!0),$.selfRightLabel=e.player?.combat?.destroyed!==!0&&we(e.player?.state)?e.selfRightKeyLabel||`F`:null,n.shells&&(ai=n.shells);let r=n.shellSlot??ri;ao(ai,r,n.ammoSelectionPending),oo(n.reload,r,n.ammoSelectionPending),To(),ks(t.dt),t.camera&&ho(e)}function Rs(e){let t=performance.now();!Hr&&t-Vr<50||(ms(e),Hr=!1,Vr=t)}let zs={root:s,shotInfo:Gt,forceHitMark(e=!1){mi={t0:W,bounced:!!e}},getHitArcs(){return K.map(e=>({kind:e.kind,outcomeId:e.outcomeId,label:e.label,crit:!!e.crit,dmg:e.dmg||0,amount:e.amount||0,screenAngRad:e._screenAng,ageS:Math.round((W-e.t0)*1e3)/1e3}))},getSpectateBar(){return{shown:N.classList.contains(`show`)&&N.classList.contains(`in`),nick:zt.textContent,vehicle:Bt.textContent}},stageSpectateBar(e={}){Ut({id:e.id||`spectator-preview`,name:e.name||`SteppeWolf_71`,vehicle:e.vehicle||`M1A2 SEP v3`,specId:e.specId||`m1a2_sepv3`,count:e.count,index:e.index},!0)},warmShotCards(e){Gt.warmSchematics(e)},preBattleCountdown(e,t=!1){Yt.countdown(e,t)},setPreBattleWaiting(e){Yt.setWaiting(e)},setPreBattleRules(e){$t=e,nn.hide(),fr.textContent=n(`hud.jump`),dr.classList.toggle(`on`,e?.jumpMps!=null);let t=e?.consumables===!1;if(jr.style.display=t?`none`:``,Mr.style.display=t?`none`:``,Jt.replaceChildren(),e)for(let t of Se(e)){let e=document.createElement(`span`);e.textContent=n(`rules.line.${t.key}`,t.key===`enemyNation`?{value:n(`campaign.enemy.${t.values.value}`)}:t.values),Jt.appendChild(e)}},setMode(e){let t=V===`hidden`;if(V=e,Ms(),Hr=!0,A.style.display=`none`,dt=0,ft=0,pt=0,e===`hidden`&&(Yt.reset(),kr(!1),w.clearRect(0,0,H,U),me=null,le&&=(D.style.display=`none`,!1),N.classList.remove(`in`,`show`),document.body.classList.remove(`cot-spectating`),Di()),e===`hidden`&&Gt.hideStats(),e===`battle`&&t&&Gt.reset(),e===`battle`&&t){Di(),Si.clear(),Ui.clear(),Ei=null,cn=-1,ln=-1,un=!1,sn.classList.remove(`on`);for(let e of It.values())e.root.remove();It.clear(),Gi.length=0,Ki.length=0;for(let[,e]of xi)e.root.remove();xi.clear(),Ci=``,wi=``,Ti=``}},update(e){let t=Fs(e);if(V===`hidden`){w.clearRect(0,0,H,U);return}Is(e,t.camera),Ls(e,t),Rs(e)},buildMinimap(e,t,n,r){Ur++,zr=null,Uo(e,t,n,r),Yo(),Hr=!0},preloadMinimapAsset:Wo,buildMinimapFromAsset(e,t){return Go(e,t,++Ur)},getMinimapCaptureReceipt:()=>zr?{...zr}:null,exportMinimapBackground(e=`image/webp`,t=.92,n=!1){if(n&&Fe(zr,Ur),!B)return null;if(B instanceof HTMLCanvasElement)return B.toDataURL(e,t);let r=document.createElement(`canvas`);return r.width=B.naturalWidth||Math.round(220*Rr),r.height=B.naturalHeight||Math.round(220*Rr),mn(r).drawImage(B,0,0,r.width,r.height),r.toDataURL(e,t)},setDamagePanel(e){e&&e.root&&e.root.parentNode!==s&&(s.appendChild(e.root),e.root.appendChild(I),I.classList.add(`onpanel`),xe=e)},forceAimDisplay(e){Zr=-1;let t={...e};ii=t,be=!0,ni=-1;let n=t.reload;ti=!!(n&&n.totalS>0&&n.t>.001),Os($r,t),ei=ka($),t.shells&&(ai=t.shells);let r=t.shellSlot==null?ri:t.shellSlot;ao(ai,r,t.ammoSelectionPending),oo(t.reload,r,t.ammoSelectionPending),To(),ks(1,!0)}};return typeof window<`u`&&(window.__HUD_DEBUG={getHitArcs:()=>zs.getHitArcs(),getSpectateBar:()=>zs.getSpectateBar(),stageSpectateBar:e=>zs.stageSpectateBar(e),getMinimapBackgroundDataUrl:(e,t)=>zs.exportMinimapBackground(e,t),getMinimapState:()=>({capture:zs.getMinimapCaptureReceipt(),rotationRad:0,rotationDeg:0,orientationSource:`north-up`,headingUp:!1,northUp:!0,backgroundKind:B?B instanceof HTMLImageElement?`image`:`canvas`:`none`,backgroundReady:!!B&&(B instanceof HTMLImageElement?B.complete&&B.naturalWidth>0:B.width>0&&B.height>0),backingWidth:Lr.width,backingHeight:Lr.height}),getReticleState:()=>({mode:V,singleReticle:$.singleReticle,w:H,h:U,zoom:$.zoom||1,distM:$.distM,dispRadM:$.dispRadM,radPx:$.radPx,smoothRadPx:ei,drawnR:Ma,gunOutside:Na,desiredX:$.cx,desiredY:$.cy,gunX:$.gunX,gunY:$.gunY,circleX:Pa,circleY:Fa,gunOffsetPx:$.gunX==null||$.gunY==null?null:Math.hypot($.gunX-$.cx,$.gunY-$.cy),atGunLimit:$.atGunLimit,gunTargetId:$.gunTargetId,penRatio:$.penRatio,cameraMarkerColor:Ia,gunMarkerColor:La,magazineIndicator:q?{shellCount:q.visibleShells,y:gi,rounds:q.rounds,capacity:q.capacity,overflow:q.overflow,fullReload:q.fullReload,loadProgress:q.loadProgress,reloading:q.reloading,curved:!0,outerRotationRad:wn,centerDropPx:Rn(Math.floor((q.visibleShells-1)*.5),q.visibleShells,vi).y}:null,floorPx:Vn,ceilPx:Aa()})}),zs}export{I as AUTOLOADER_HUD_SHELLS,En as HIT_CONFIRM_LIFETIME_S,kn as aimWarningState,Fn as ammunitionSelectionLabel,ir as ammunitionSlotViewState,Rn as autoloaderHudShellPose,Ln as autoloaderHudState,Dn as directionalHitAmount,On as directionalHitValueVisible,jn as hitConfirmVisualState,vr as initHud,Nn as reloadHudCountdown,Mn as reloadHudFraction,Pn as reloadHudReadyPulse,In as resolveReticleAnchor};