import{s as e}from"./i18n-BwCuf8CS.js";import{_ as t,a as n,c as r,g as i,h as a,n as o,o as s,r as c,t as l}from"./quality-DkBoKjcL.js";import{n as u,t as d}from"./fonts-CSLQRemL.js";import{t as f}from"./uiIcons-D7cq5V9M.js";var p=`
.cot-touch{position:fixed;inset:0;z-index:60;display:none;pointer-events:none;
  font-family:${u};color:#eef4f9;-webkit-user-select:none;user-select:none;
  touch-action:none;overflow:hidden;--edge:max(14px,env(safe-area-inset-left));
  --touch-panel:rgba(7,11,15,.94);--touch-edge:rgba(205,219,229,.34);
  --touch-action:#f0a030;--touch-action-soft:rgba(240,160,48,.18);}
.cot-touch-aim{position:fixed;inset:0;z-index:39;display:none;pointer-events:none;
  font-family:${u};color:#eef4f9;-webkit-user-select:none;user-select:none;
  touch-action:none;overflow:hidden;}
.cot-touch.on,.cot-touch-aim.on{display:block;}
.cot-touch *,.cot-touch-aim *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
.cot-touch button{font:inherit;color:inherit;}
.cot-touch-aim .aimpad{position:absolute;inset:auto 0 0 auto;top:18%;width:62%;
  pointer-events:auto;touch-action:none;}
.cot-touch-aim .aimhint{position:absolute;right:21%;bottom:31%;font-family:${d};
  font-size:8px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(234,242,248,.3);text-shadow:0 1px 3px #000;}
.cot-touch .joy{position:absolute;z-index:2;left:var(--edge);
  bottom:max(16px,env(safe-area-inset-bottom));width:138px;height:138px;
  border-radius:50%;pointer-events:auto;touch-action:none;
  background:radial-gradient(circle,rgba(78,91,101,.24) 0 28%,transparent 29% 45%,rgba(218,230,238,.1) 46% 47%,transparent 48%),
    conic-gradient(from 45deg,rgba(212,225,234,.08),transparent 13% 37%,rgba(212,225,234,.08) 50%,transparent 63% 87%,rgba(212,225,234,.08)),
    radial-gradient(circle,rgba(23,31,37,.72),rgba(5,9,12,.58) 68%,rgba(2,5,8,.4));
  border:2px solid var(--touch-edge);box-shadow:inset 0 0 0 5px rgba(3,7,10,.28),inset 0 0 25px rgba(0,0,0,.58),0 7px 20px rgba(0,0,0,.34);}
.cot-touch .joy::before,.cot-touch .joy::after{content:"";position:absolute;left:50%;top:50%;
  background:rgba(219,231,240,.16);transform:translate(-50%,-50%);}
.cot-touch .joy::before{width:76%;height:1px}.cot-touch .joy::after{width:1px;height:76%}
.cot-touch .knob{position:absolute;left:50%;top:50%;width:56px;height:56px;margin:-28px;
  border-radius:50%;background:radial-gradient(circle at 38% 30%,#778794,#34414b 35%,#151d23 72%,#080c10);
  border:2px solid rgba(231,239,245,.58);box-shadow:0 6px 14px rgba(0,0,0,.68),inset 0 1px 4px rgba(255,255,255,.2);}
.cot-touch .arrow{position:absolute;color:rgba(231,240,247,.72);font-size:16px;line-height:1;
  text-shadow:0 1px 3px #000}.cot-touch .arrow.u{left:61px;top:8px}.cot-touch .arrow.d{left:61px;bottom:8px}
.cot-touch .arrow.l{left:10px;top:58px}.cot-touch .arrow.r{right:10px;top:58px}
/* All four arrows are the same glyph rotated, avoiding platform variants. */
.cot-touch .arrow.d{transform:rotate(180deg)}
.cot-touch .arrow.l{transform:rotate(-90deg)}
.cot-touch .arrow.r{transform:rotate(90deg)}
.cot-touch .round{position:absolute;z-index:3;display:flex;align-items:center;justify-content:center;
  border-radius:50%;pointer-events:auto;touch-action:none;border:2px solid rgba(220,231,239,.32);
  background:radial-gradient(circle at 38% 27%,rgba(108,122,133,.8),rgba(27,36,43,.96) 48%,var(--touch-panel) 76%);
  box-shadow:0 6px 18px rgba(0,0,0,.52),inset 0 0 0 4px rgba(3,7,10,.3),inset 0 1px 4px rgba(255,255,255,.18);
  transition:transform 90ms ease-out,border-color 90ms ease,color 90ms ease,box-shadow 90ms ease;}
.cot-touch .round::before{content:"";position:absolute;inset:7px;border-radius:50%;pointer-events:none;
  border:1px solid rgba(222,233,241,.1);}
.cot-touch .round:active,.cot-touch .round.down{transform:scale(.94);border-color:#f0ad45;
  box-shadow:0 0 18px rgba(240,150,40,.35),inset 0 2px 7px rgba(0,0,0,.65);}
.cot-touch .fire{right:max(20px,env(safe-area-inset-right));bottom:max(22px,env(safe-area-inset-bottom));
  width:96px;height:96px;color:#ffd27a;border-color:rgba(255,190,91,.58);
  background:radial-gradient(circle at 50% 48%,rgba(240,160,48,.24),transparent 35%),
    radial-gradient(circle at 38% 27%,rgba(118,103,75,.88),rgba(36,31,24,.97) 48%,rgba(10,10,9,.98) 76%);}
.cot-touch .fire svg{width:34px;height:54px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.8));}
.cot-touch .fire .lb,.cot-touch .scope .lb,.cot-touch .autoaim .lb{position:absolute;bottom:-17px;
  left:50%;transform:translateX(-50%);font-family:${d};font-size:8px;font-weight:800;
  letter-spacing:.13em;text-transform:uppercase;white-space:nowrap;text-shadow:0 1px 3px #000;}
.cot-touch .fire.alt{left:166px;right:auto;bottom:156px;width:64px;height:64px;opacity:.86;}
.cot-touch .fire.alt svg{width:20px;height:34px}.cot-touch .fire.alt .lb{display:none}
.cot-touch .fire.aiming{border-color:#ffd27a;box-shadow:0 0 0 5px rgba(240,160,48,.13),
  0 0 22px rgba(240,150,40,.45),inset 0 2px 7px rgba(0,0,0,.65);}
.cot-touch .fire.autofire{border-color:#ffbd5c;box-shadow:0 0 0 5px rgba(255,179,74,.16),
  0 0 25px rgba(255,147,30,.58),inset 0 0 14px rgba(255,173,58,.16);}
.cot-touch .fire-cancel{position:fixed;z-index:5;width:56px;height:56px;margin:-28px;
  display:flex;align-items:center;justify-content:center;pointer-events:none;visibility:hidden;
  opacity:0;transform:scale(.78);border-radius:50%;border:1.5px solid rgba(255,112,98,.7);
  background:rgba(28,8,7,.68);color:#ff8f83;box-shadow:0 4px 13px rgba(0,0,0,.48);
  transition:opacity 90ms ease,transform 90ms ease,border-color 90ms ease;}
.cot-touch .fire-cancel b{font:400 28px/1 ${d};}
.cot-touch.fire-armed .fire-cancel{visibility:visible;opacity:.82;transform:scale(1);}
.cot-touch-aim.fire-armed .aimhint{opacity:0;}
.cot-touch.fire-cancel-hot .fire-cancel{opacity:1;color:#fff;border-color:#ff594c;background:rgba(111,14,8,.94);
  transform:scale(1.07);box-shadow:0 0 18px rgba(255,52,38,.46);}
.cot-touch .scope{right:134px;bottom:43px;width:62px;height:62px;color:#dce7ef;}
.cot-touch .scope svg{width:32px;height:24px;filter:drop-shadow(0 2px 3px #000);}
.cot-touch .autoaim{right:206px;bottom:43px;width:58px;height:58px;color:#dce7ef;}
.cot-touch .autoaim svg{width:28px;height:28px;filter:drop-shadow(0 2px 3px #000);}
.cot-touch .autoaim.on{color:#ffd27a;border-color:#f0ad45;
  background:radial-gradient(circle at 35% 28%,rgba(120,83,28,.92),rgba(42,27,10,.96) 64%,rgba(8,7,5,.98));
  box-shadow:0 0 18px rgba(240,150,40,.42),inset 0 1px 4px rgba(255,225,170,.2);}
.cot-touch .mobile-chrome{position:absolute;z-index:4;top:max(8px,env(safe-area-inset-top));
  right:max(10px,env(safe-area-inset-right));display:flex;gap:4px;pointer-events:auto;}
body.cot-touch-layout[data-cot-orientation='portrait'] .cot-touch .mobile-chrome{
  top:calc(max(8px,env(safe-area-inset-top)) + 60px);
}
.cot-touch .quick{width:44px;height:44px;padding:3px 2px 2px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:1px;pointer-events:auto;touch-action:none;
  border:1px solid var(--touch-edge);border-bottom:2px solid rgba(205,219,229,.42);border-radius:2px;
  background:linear-gradient(180deg,rgba(29,38,45,.96),var(--touch-panel));
  color:#dce7ef;box-shadow:0 4px 13px rgba(0,0,0,.4),inset 0 1px rgba(255,255,255,.05);
  transition:transform 90ms ease-out,border-color 90ms ease,color 90ms ease;}
.cot-touch .quick:active{transform:scale(.95);border-color:#f0ad45;color:#ffd27a;background:rgba(48,32,12,.96);}
.cot-touch .quick svg{width:18px;height:18px;display:block;}
.cot-touch .quick .ql{font-family:${d};font-size:6.5px;font-weight:800;line-height:1;
  letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;}
.cot-touch .quick.muted{color:#f08b75;border-color:rgba(240,102,83,.55);}
/* Recompose the existing live HUD instead of duplicating ammo/state UI. */
body.cot-touch-layout{overscroll-behavior:none;}
body.cot-touch-layout #app canvas{touch-action:none;}
body.cot-touch-layout .cot-hints,body.cot-touch-layout .cot-ear{display:none!important;}
body.cot-touch-layout .cot-top{top:0;padding:5px 29px 7px;gap:10px;z-index:30;}
body.cot-touch-layout .cot-top .fg,body.cot-touch-layout .cot-top .fe{font-size:22px;}
body.cot-touch-layout .cot-top .tm{font-size:12px;}
body.cot-touch-layout .cot-killfeed{top:48px;left:50%;transform:translateX(-50%);max-width:48%;align-items:center;}
body.cot-touch-layout .cot-kf{font-size:9px;padding:3px 7px;background:rgba(7,10,14,.68);}
/* Ammo is directly above the equipment/consumable stack, leaving the top
   edge to the three global mobile controls. */
body.cot-touch-layout .cot-shells{left:auto;right:max(10px,env(safe-area-inset-right));
  top:auto;bottom:calc(max(22px,env(safe-area-inset-bottom)) + 302px);
  width:48px;height:52px;display:block;transform:none;z-index:24;overflow:visible;}
body.cot-touch-layout .cot-shell{position:absolute;right:0;top:0;width:48px;height:52px;
  opacity:0;pointer-events:none;transform:scale(.94);transform-origin:right center;
  transition:transform 160ms ease-out,opacity 120ms ease-out,border-color 120ms ease-out,background 120ms ease-out;}
body.cot-touch-layout .cot-shell.sel{z-index:3;opacity:1;pointer-events:auto;transform:none;}
body.cot-touch-layout .cot-shell.sel::after{content:'‹';position:absolute;left:2px;top:50%;
  transform:translateY(-50%);font:800 13px/1 ${d};color:rgba(255,210,122,.9);}
body.cot-touch-layout .cot-shells.touch-open .cot-shell{opacity:1;pointer-events:auto;
  transform:translateX(var(--touch-ammo-x,0));}
body.cot-touch-layout .cot-shells.touch-open .cot-shell.sel::after{content:'›';}
body.cot-touch-layout .cot-shell canvas{transform:translate(-50%,-50%) scale(.76);}
body.cot-touch-layout .cot-shell .key,body.cot-touch-layout .cot-con .key{display:none;}
body.cot-touch-layout .cot-shell .tip{display:none!important;}
body.cot-touch-layout .cot-shell .ty{font-size:7px}
body.cot-touch-layout .cot-shell .cnt{font-size:11px;}
/* stronger ACTIVE-AMMO read at glance distance: brighter amber frame, inner
   keyline + glow (the desktop .sel border alone washes out at phone size) */
body.cot-touch-layout .cot-shell.sel{border-color:#ffbd5c;border-bottom-color:#ffbd5c;
  background:linear-gradient(180deg,rgba(58,42,17,.97),rgba(30,20,9,.97));
  box-shadow:inset 0 0 0 1px rgba(255,196,107,.5),0 0 16px rgba(240,160,48,.5);}
body.cot-touch-layout .cot-shell.sel .ty{font-size:8px;}
/* MOBILE-UX r1 (owner: "move equipment to right side in a vertical column"):
   the consumable tray re-parks on the RIGHT EDGE as a thumb-reachable
   column sitting above the FIRE cluster. 48 px targets; the selection/used/
   cooldown chrome is the same .cot-con skin the desktop tray wears. */
body.cot-touch-layout .cot-consep{display:none;}
body.cot-touch-layout .cot-cons{display:flex;flex-direction:column;gap:9px;position:fixed;
  left:auto;right:max(14px,env(safe-area-inset-right));
  bottom:calc(max(22px,env(safe-area-inset-bottom)) + 124px);z-index:24;}
body.cot-touch-layout .cot-con{width:48px;height:52px;}
body.cot-touch-layout .cot-con svg{transform:none;}
/* The HUD's context-aware Special Action remains the one canonical button on
   touch. Recompose it into the fire cluster instead of adding a second mobile
   implementation or another input path. */
body.cot-touch-layout .cot-special{left:auto;right:128px;
  bottom:calc(max(22px,env(safe-area-inset-bottom)) + 112px);transform:none;
  width:64px;min-width:64px;height:64px;padding:5px;border-radius:50%;
  grid-template-columns:1fr;grid-template-rows:28px 12px;gap:0;justify-items:center;
  border:2px solid var(--touch-edge);background:radial-gradient(circle at 38% 27%,rgba(108,122,133,.8),rgba(27,36,43,.96) 48%,var(--touch-panel) 76%);
  box-shadow:0 6px 18px rgba(0,0,0,.52),inset 0 0 0 4px rgba(3,7,10,.3),inset 0 1px 4px rgba(255,255,255,.18);}
body.cot-touch-layout .cot-special:active{transform:scale(.94);}
body.cot-touch-layout .cot-special .si svg{width:27px;height:27px;}
body.cot-touch-layout .cot-special .sl{font-size:0;letter-spacing:.07em;text-align:center;}
body.cot-touch-layout .cot-special .sl::after{content:attr(data-short);font-size:7px;}
body.cot-touch-layout .cot-special .sk{display:none;}
body.cot-touch-layout .cot-net{top:max(8px,env(safe-area-inset-top));
  left:calc(max(8px,env(safe-area-inset-left)) + 124px);right:auto;width:max-content;z-index:24;}
/* The former Garage shortcut occupied the first 44 px of this corner. With
   battle exit living in Settings, let the minimap own the safe-area top row. */
body.cot-touch-layout .cot-minimap{left:max(8px,env(safe-area-inset-left));right:auto;
  top:max(8px,env(safe-area-inset-top));bottom:auto;
  width:116px!important;height:116px!important;opacity:.86;z-index:24;}
body.cot-touch-layout .cot-drive{display:block!important;left:calc(max(14px,env(safe-area-inset-left)) + 150px);
  bottom:max(16px,env(safe-area-inset-bottom));transform:scale(.82);transform-origin:left bottom;z-index:24;}
body.cot-touch-layout[data-cot-orientation='portrait'] .cot-drive{
  left:max(14px,env(safe-area-inset-left));bottom:calc(max(16px,env(safe-area-inset-bottom)) + 150px);transform:scale(.78);}
body.cot-touch-layout .cot-dp{left:max(232px,calc(env(safe-area-inset-left) + 224px));
  bottom:max(8px,env(safe-area-inset-bottom));
  transform:scale(.58);transform-origin:left bottom;}
/* Compact phones keep the canonical damage-panel HP source instead of
   spawning a second mobile health widget. Only the expensive schematic,
   crew and equipment detail collapse; the live HP row stays bottom-center. */
body.cot-touch-layout[data-cot-width='compact'] .cot-dp,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp{
  display:block!important;left:50%!important;bottom:max(8px,env(safe-area-inset-bottom))!important;
  width:clamp(112px,38vw,184px);min-height:34px;padding:7px 8px 6px;
  transform:translateX(-50%)!important;transform-origin:center bottom!important;
  z-index:var(--hud-layer-controls,24);background:linear-gradient(180deg,rgba(13,19,24,.94),rgba(5,9,12,.92));
}
body.cot-touch-layout[data-cot-width='compact'] .cot-dp canvas,
body.cot-touch-layout[data-cot-width='compact'] .cot-dp .crew,
body.cot-touch-layout[data-cot-width='compact'] .cot-dp .equiprow,
body.cot-touch-layout[data-cot-width='compact'] .cot-dp .fire,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp canvas,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp .crew,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp .equiprow,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp .fire,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp canvas,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp .crew,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp .equiprow,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp .fire{display:none!important;}
body.cot-touch-layout[data-cot-width='compact'] .cot-dp .hptrack,
body.cot-touch-layout[data-cot-width='phone'] .cot-dp .hptrack,
body.cot-touch-layout[data-cot-height-density='tight'] .cot-dp .hptrack{margin-bottom:0;height:6px;}
body.cot-touch-layout .cot-alert{bottom:28%;max-width:calc(100vw - 24px);font-size:10px;white-space:normal;}
body.cot-touch-layout .cot-sixth{top:max(70px,12%);width:min(214px,calc(100vw - 24px));
  min-height:42px;grid-template-columns:36px minmax(0,1fr);}
body.cot-touch-layout .cot-sixth .sig svg{width:21px;height:21px;}
body.cot-touch-layout .cot-sixth .copy{padding:6px 9px 7px;}
body.cot-touch-layout .cot-sixth .lb{font-size:10px;}
body.cot-touch-layout .cot-sixth .sub{font-size:7px;letter-spacing:.12em;}

/* Shell chip label/count collision: at the 48px touch chip the
   selected slot's long class label (APFSDS, 35px) ran under the ammo count
   (11px overlap, both bottom-anchored). The keycap badge is hidden on touch,
   so its top-right corner is free: the count moves there. */
body.cot-touch-layout .cot-shell .cnt{top:2px;right:3px;bottom:auto;}
/* Touch-target floor for garage chrome the phone shares with desktop. */
body.cot-touch-layout .nv{padding:9px 14px;}
body.cot-touch-layout .cot-country-chip{padding:9px 12px;}
body.cot-touch-layout .cot-car-arrow{width:44px;}
@media (prefers-reduced-motion:reduce){
  .cot-touch .round,.cot-touch .quick,.cot-touch .fire-cancel{transition:none;}
}
`,m=f(`shell`,34),h=f(`scope`,34),g=f(`autoAim`,30),_=f(`sound`,20),v=f(`soundOff`,20),y=f(`graphics`,20),b=f(`settings`,20);function x(e,t=!1){let n=t?l:c,r=n.indexOf(e);return n[(r<0?0:r+1)%n.length]}function S({onAim:e=()=>{},onFire:t=()=>{},onHoldStart:n=()=>{},onHoldEnd:r=()=>{},onCancel:i=()=>{},isCancelPoint:a=()=>!1,deadzonePx:o=8,aimScale:s=1.18,holdDelayMs:c=320,scheduleHold:l=(e,t)=>setTimeout(e,t),cancelHold:u=e=>clearTimeout(e)}={}){let d=null,f=0,p=0,m=0,h=0,g=!1,_=!1,v=null,y=!1,b=!1,x=!1,S=()=>({active:d!==null,pointerId:d,dragging:g,cancelHot:_,autoFiring:x}),C=()=>{x&&(x=!1,r())},w=()=>{d===null||!y||_||x||(x=!0,b=!0,n())},T=()=>{v!==null&&u(v),v=null,d=null,g=!1,_=!1,y=!1,b=!1,x=!1},E=(t,n,r)=>{if(d===null||t!==d)return S();let i=Number(n)||0,c=Number(r)||0,l=i-m,u=c-h;return m=i,h=c,_=!!a(i,c),_?(C(),S()):(w(),!g&&Math.hypot(i-f,c-p)>=o&&(g=!0),g&&(l||u)&&e(l*s,u*s),S())};return{begin(e,t,n){return e==null||d!==null?!1:(d=e,f=m=Number(t)||0,p=h=Number(n)||0,g=!1,_=!1,y=!1,b=!1,x=!1,v=l(()=>{v=null,d===e&&(y=!0,w())},Math.max(0,Number(c)||0)),!0)},move:E,end(e,n,r){if(d===null||e!==d)return!1;E(e,n,r);let a=_,o=!a&&!b;return C(),T(),a?i():o&&t(),!a},cancel(e=d){return d===null||e!==d?!1:(C(),T(),i(),!0)},getState:S}}function C({input:c,bus:l,isBattleActive:u,isSniper:d=()=>!1,onOpenSettings:f=()=>{},onToggleSound:C=()=>!1}){if(!document.getElementById(`cot-touch-style`)){let e=document.createElement(`style`);e.id=`cot-touch-style`,e.textContent=p,document.head.appendChild(e)}let w=document.createElement(`div`);w.className=`cot-touch`,w.setAttribute(`role`,`group`),w.setAttribute(`aria-label`,e(`touch.rootAria`));let T=document.createElement(`div`);T.className=`cot-touch-aim`,T.setAttribute(`role`,`group`),T.setAttribute(`aria-label`,e(`touch.aimAria`)),T.innerHTML=`<div class="aimpad" role="group" aria-label="${e(`touch.aimHint`)}"></div><div class="aimhint">${e(`touch.aimHint`)}</div>`,w.innerHTML=`<div class="mobile-chrome" role="toolbar" aria-label="${e(`touch.toolbar`)}"><button class="quick sound" type="button" aria-label="${e(`touch.mute`)}">${_}<span class="ql">${e(`touch.sound`)}</span></button><button class="quick graphics" type="button" aria-label="${e(`touch.gfxAria`)}">${y}<span class="ql">${e(`touch.gfx`)}</span></button><button class="quick settings" type="button" aria-label="${e(`touch.settingsAria`)}">${b}<span class="ql">${e(`touch.settings`)}</span></button></div><div class="joy" role="group" aria-label="${e(`touch.joystick`)}"><span class="arrow u">&#9650;</span><span class="arrow d">&#9650;</span><span class="arrow l">&#9650;</span><span class="arrow r">&#9650;</span><div class="knob"></div></div><button class="round fire alt" type="button" aria-label="${e(`touch.fireLeftAria`)}">${m}<span class="lb">${e(`touch.fire`)}</span></button><button class="round autoaim" type="button" aria-label="${e(`touch.autoAimAria`)}" aria-pressed="false">${g}<span class="lb">${e(`touch.autoAim`)}</span></button><button class="round scope" type="button" aria-label="${e(`touch.scopeAria`)}">${h}<span class="lb">${e(`touch.scope`)}</span></button><button class="round fire" type="button" aria-label="${e(`touch.fireAria`)}">${m}<span class="lb">${e(`touch.fire`)}</span></button><div class="fire-cancel" aria-hidden="true"><b>&times;</b></div>`,document.body.appendChild(T),document.body.appendChild(w);let E=w.querySelector(`.joy`),ee=w.querySelector(`.knob`),D=T.querySelector(`.aimpad`),O=!!u(),k=!1,A=null,j=null,M=0,N=0,P=()=>{},F=new Map,I=-1;function te(){return c.isTouchLayout()}function L(){A=null,c.setVirtualMove(0,0),ee.style.transform=`translate(0px,0px)`,j=null,F.clear(),I=-1}function R(){k=te(),document.body.classList.toggle(`cot-touch-layout`,k),w.classList.toggle(`on`,k&&O),T.classList.toggle(`on`,k&&O),(!k||!O)&&(L(),P())}function ne(e){return O&&k?!0:e instanceof Element&&!!(e.closest(`#app`)||e.closest(`.cot-touch`)||e.closest(`.cot-touch-aim`)||e.closest(`.cot-hud`))}let re=e=>e.preventDefault();for(let e of[`gesturestart`,`gesturechange`,`gestureend`])document.addEventListener(e,re,{passive:!1});document.addEventListener(`touchmove`,e=>{e.touches.length>=2&&ne(e.target)&&e.preventDefault()},{passive:!1}),window.addEventListener(`wheel`,e=>{e.ctrlKey&&ne(e.target)&&e.preventDefault()},{passive:!1});function z(e){let t=E.getBoundingClientRect(),n=t.width*.34,r=e.clientX-(t.left+t.width/2),i=e.clientY-(t.top+t.height/2),a=Math.hypot(r,i);a>n&&(r*=n/a,i*=n/a),ee.style.transform=`translate(${r.toFixed(1)}px,${i.toFixed(1)}px)`,c.setVirtualMove(r/n,-i/n)}E.addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),A=e.pointerId;try{E.setPointerCapture(e.pointerId)}catch{}z(e)}),E.addEventListener(`pointermove`,e=>{e.pointerId===A&&z(e)});let B=e=>{e.pointerId===A&&L()};E.addEventListener(`pointerup`,B),E.addEventListener(`pointercancel`,B),E.addEventListener(`lostpointercapture`,B);function V(){let e=F.values(),t=e.next().value,n=e.next().value;return t&&n?Math.hypot(n.x-t.x,n.y-t.y):0}let H=!1;function U(e){let t=d()||H;if(e>0)t?c.tapVirtual(`zoomIn`):(c.tapVirtual(`sniperToggle`),H=!0);else{if(!t)return;c.tapVirtual(`zoomOut`)}l.emit(`ui:click`,{})}D.addEventListener(`pointerdown`,e=>{e.preventDefault(),F.set(e.pointerId,{x:e.clientX,y:e.clientY});try{D.setPointerCapture(e.pointerId)}catch{}F.size>=2?(j=null,I=V(),H=!1):(j=e.pointerId,M=e.clientX,N=e.clientY)}),D.addEventListener(`pointermove`,e=>{let t=F.get(e.pointerId);if(t&&(t.x=e.clientX,t.y=e.clientY),I>=0&&F.size>=2){let e=V();for(;e-I>=44;)U(1),I+=44;for(;I-e>=44;)U(-1),I-=44;return}if(e.pointerId!==j)return;let n=e.clientX-M,r=e.clientY-N;M=e.clientX,N=e.clientY,c.addVirtualAim(n*1.18,r*1.18)});let W=e=>{if(F.delete(e.pointerId),F.size<2&&(I=-1),e.pointerId===j&&(j=null),j===null&&F.size===1){let[e,t]=F.entries().next().value;j=e,M=t.x,N=t.y}};D.addEventListener(`pointerup`,W),D.addEventListener(`pointercancel`,W),D.addEventListener(`lostpointercapture`,W);let G=w.querySelector(`.fire-cancel`),K=null,q=S({onAim:(e,t)=>c.addVirtualAim(e,t),onFire:()=>c.tapVirtual(`fire`),onHoldStart:()=>{c.pressVirtual(`fire`),J()},onHoldEnd:()=>c.releaseVirtual(`fire`),isCancelPoint:(e,t)=>{let n=G.getBoundingClientRect();return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom}});function J(){let t=q.getState();if(w.classList.toggle(`fire-armed`,t.active),T.classList.toggle(`fire-armed`,t.active),w.classList.toggle(`fire-cancel-hot`,t.cancelHot),!K)return;K.classList.toggle(`down`,t.active),K.classList.toggle(`aiming`,t.dragging),K.classList.toggle(`autofire`,t.autoFiring);let n=K.querySelector(`.lb`);n&&(n.textContent=t.cancelHot?e(`touch.fire.cancel`):t.autoFiring?e(`touch.fire.auto`):t.active?e(`touch.fire.releaseFires`):e(`touch.fire`)),K.setAttribute(`aria-label`,t.active?t.cancelHot?e(`touch.fire.cancelAria`):t.autoFiring?e(`touch.fire.autoAria`):e(`touch.fire.dragAria`):K.classList.contains(`alt`)?e(`touch.fireLeftAria`):e(`touch.fireAria`))}function ie(e){let t=e.getBoundingClientRect(),n=t.left+t.width/2>innerWidth/2?-1:1,r=t.left+t.width/2+n*Math.max(190,t.width*2.1),i=t.top+t.height/2-Math.max(132,t.height*1.65);G.style.left=`${Math.max(32,Math.min(innerWidth-32,r)).toFixed(1)}px`,G.style.top=`${Math.max(32,Math.min(innerHeight-32,i)).toFixed(1)}px`}function Y(e,t){!K||e.pointerId!==q.getState().pointerId||(e.preventDefault(),e.stopPropagation(),t?q.end(e.pointerId,e.clientX,e.clientY):q.cancel(e.pointerId),J(),K=null)}for(let e of w.querySelectorAll(`.fire`))e.addEventListener(`pointerdown`,t=>{if(t.preventDefault(),t.stopPropagation(),q.begin(t.pointerId,t.clientX,t.clientY)){K=e,ie(e),J();try{e.setPointerCapture(t.pointerId)}catch{}}}),e.addEventListener(`pointermove`,e=>{e.pointerId===q.getState().pointerId&&(e.preventDefault(),e.stopPropagation(),q.move(e.pointerId,e.clientX,e.clientY),J())}),e.addEventListener(`pointerup`,e=>Y(e,!0)),e.addEventListener(`pointercancel`,e=>Y(e,!1)),e.addEventListener(`lostpointercapture`,e=>Y(e,!1));P=()=>{q.getState().active&&(q.cancel(),J(),K=null)};let ae=()=>{P(),L()};window.addEventListener(`blur`,ae),document.addEventListener(`visibilitychange`,()=>{document.hidden&&ae()}),w.querySelector(`.scope`).addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),c.tapVirtual(`sniperToggle`),l.emit(`ui:click`,{})});let X=w.querySelector(`.autoaim`);X.addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),l.emit(`ui:autoAimToggle`,{}),l.emit(`ui:click`,{})}),l.on(`ui:autoAimState`,t=>{let{on:n}=t;X.classList.toggle(`on`,!!n),X.setAttribute(`aria-pressed`,n?`true`:`false`);let r=X.querySelector(`.lb`);r&&(r.textContent=e(n?`touch.autoAim.locked`:`touch.autoAim`))});let Z=(e,t)=>{let n=null,r=0,i=0,a=!1,o=0,s=e=>{(e.clientX||e.clientY)&&(r=e.clientX,i=e.clientY,a=!0)};e.addEventListener(`pointerdown`,t=>{t.stopPropagation(),n=t.pointerId,a=!1,s(t);try{e.setPointerCapture(t.pointerId)}catch{}}),e.addEventListener(`pointermove`,e=>{e.pointerId===n&&s(e)}),e.addEventListener(`pointerup`,c=>{if(c.pointerId===n){if(n=null,c.stopPropagation(),s(c),a){let t=e.getBoundingClientRect();if(r<t.left-6||r>t.right+6||i<t.top-6||i>t.bottom+6)return}o=performance.now(),t()}}),e.addEventListener(`pointercancel`,e=>{e.pointerId===n&&(n=null)}),e.addEventListener(`click`,e=>{if(e.stopPropagation(),performance.now()-o<600){e.preventDefault();return}t()})},Q=w.querySelector(`.quick.sound`);Z(Q,()=>{let t=!!C();Q.classList.toggle(`muted`,t),Q.innerHTML=`${t?v:_}<span class="ql">${e(t?`touch.muted`:`touch.sound`)}</span>`,Q.setAttribute(`aria-label`,e(t?`touch.unmute`:`touch.mute`)),Q.setAttribute(`aria-pressed`,t?`true`:`false`)});let $=w.querySelector(`.quick.graphics`);function oe(){if(n()===`mobile`)return s();let e=r();return e===`auto`?a(e):e}function se(){let t=oe(),n=o[t]?.label||t,r=n===`Performance`?e(`touch.gfx.perf`):n===`Balanced`?e(`touch.gfx.bal`):n===`Quality`?e(`touch.gfx.qual`):n;$.querySelector(`.ql`).textContent=e(`touch.gfx.label`,{short:r}),$.setAttribute(`aria-label`,e(`touch.gfx.aria`,{label:n})),$.title=e(`touch.gfx.title`,{label:n})}return Z($,()=>{let e=n()===`mobile`,r=x(oe(),e);e?i(r):t(r),se(),l.emit(`ui:click`,{})}),se(),Z(w.querySelector(`.quick.settings`),()=>{l.emit(`ui:click`,{}),f()}),l.on(`phase:change`,e=>{let{phase:t}=e;O=t===`battle`,R()}),window.addEventListener(`resize`,R,{passive:!0}),window.addEventListener(`orientationchange`,R,{passive:!0}),R(),{root:w,get isLayout(){return k},refresh:R}}export{S as createMobileFireGesture,C as createTouchControls,x as nextQuickGraphicsPreset};