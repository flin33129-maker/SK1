import{s as e}from"./i18n-BwCuf8CS.js";import{n as t,t as n}from"./fonts-CSLQRemL.js";import"./protocol-DeUHbhU5.js";var r=`cot-room-chat-style`;function i(){if(document.getElementById(r))return;let e=document.createElement(`style`);e.id=r,e.textContent=`
.cot-room-chat{position:fixed;z-index:46;left:max(18px,env(safe-area-inset-left));
  top:clamp(270px,50%,calc(var(--cot-viewport-height,100dvh) - 230px));bottom:auto;transform:translateY(-50%);
  width:min(380px,calc(50vw - 34px));min-width:280px;display:grid;gap:7px;pointer-events:none;
  color:#e5edf3;font-family:${t};text-shadow:0 1px 3px rgba(0,0,0,.95)}
.cot-room-chat[hidden]{display:none}.cot-room-chat *{box-sizing:border-box}
.cot-room-chat-log{max-height:146px;overflow:hidden;display:flex;flex-direction:column;
  justify-content:flex-end;gap:3px;padding:6px 8px;transition:opacity .45s ease}
.cot-room-chat.quiet:not(.open) .cot-room-chat-log{opacity:.18}
.cot-room-chat:hover .cot-room-chat-log,.cot-room-chat.open .cot-room-chat-log{opacity:1}
.cot-room-chat:not(.open) .cot-room-chat-message:nth-last-child(n+6){display:none}
.cot-room-chat-message{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;
  gap:7px;padding:3px 7px;border-left:2px solid rgba(159,178,192,.45);
  background:linear-gradient(90deg,rgba(5,9,13,.82),rgba(5,9,13,.14));
  font-size:11px;line-height:1.35;overflow-wrap:anywhere}
.cot-room-chat-message.alpha{border-left-color:#6fbcff}.cot-room-chat-message.bravo{border-left-color:#ff8479}
.cot-room-chat-message.self{background:linear-gradient(90deg,rgba(50,35,14,.88),rgba(10,10,8,.16));
  border-left-color:#edaa43}.cot-room-chat-name{font:800 9px/1 ${n};letter-spacing:.1em;
  color:#aebdca;text-transform:uppercase;white-space:nowrap}.cot-room-chat-message.alpha .cot-room-chat-name{color:#9bd2ff}
.cot-room-chat-message.bravo .cot-room-chat-name{color:#ffaaa3}.cot-room-chat-message.self .cot-room-chat-name{color:#ffd18a}
.cot-room-chat-text{min-width:0}.cot-room-chat-controls{display:flex;align-items:stretch;gap:7px;
  padding:8px;border:1px solid rgba(166,185,199,.25);border-left:3px solid #eaa340;
  background:linear-gradient(100deg,rgba(7,11,15,.95),rgba(12,17,22,.88));
  box-shadow:0 10px 30px rgba(0,0,0,.34);pointer-events:auto}
.cot-room-chat:not(.open) .cot-room-chat-controls{justify-self:start;padding:4px}
.cot-room-chat-toggle{flex:0 0 auto;min-width:70px;border:1px solid rgba(177,196,210,.26);
  background:rgba(17,24,30,.92);color:#c9d5de;font:800 9px ${n};letter-spacing:.13em;
  text-transform:uppercase;cursor:pointer}.cot-room-chat-toggle b{color:#f1ae49;font-size:11px}
.cot-room-chat-toggle:hover,.cot-room-chat-toggle:focus-visible{border-color:#eaa340;color:#fff;outline:none}
.cot-room-chat-form{position:relative;min-width:0;flex:1;display:none;grid-template-columns:minmax(0,1fr) auto;gap:7px}
.cot-room-chat.open .cot-room-chat-form{display:grid}.cot-room-chat.open .cot-room-chat-toggle{display:none}
.cot-room-chat-input{min-width:0;height:34px;border:1px solid rgba(180,199,213,.3);outline:0;
  background:rgba(2,6,9,.9);color:#f1f5f8;padding:0 10px;font:12px ${t};caret-color:#ffbd5f}
.cot-room-chat-input:focus{border-color:#eaa340;box-shadow:inset 0 -1px #eaa340}
.cot-room-chat-send{height:34px;min-width:60px;border:1px solid #ba7727;background:#4b2e0e;
  color:#ffd291;font:800 9px ${n};letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.cot-room-chat-send:disabled{opacity:.4;cursor:not-allowed}.cot-room-chat-count{position:absolute;right:79px;
  bottom:-13px;color:#8494a0;font:700 8px ${n};letter-spacing:.08em}.cot-room-chat-count.over{color:#ff867d}
body.cot-touch-layout .cot-room-chat{left:max(9px,env(safe-area-inset-left));top:180px;bottom:auto;
  width:min(58vw,390px);min-width:0;z-index:48;transform:none}
body.cot-touch-layout .cot-room-chat-log{max-height:105px;padding-left:0}
body.cot-touch-layout .cot-room-chat-message{font-size:10px}
body.cot-touch-layout .cot-room-chat-controls{padding:6px}
body.cot-touch-layout .cot-room-chat-toggle{min-width:82px;height:38px;background:rgba(7,11,15,.9)}
@media(prefers-reduced-motion:reduce){.cot-room-chat-log{transition:none}}
`,document.head.appendChild(e)}function a(e){return e instanceof HTMLElement&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable)}function o(e){if(!e||typeof e!=`object`)return null;let t=e,n=String(t.id||``);if(!n)return null;let r=String(t.team||`spectator`),i=r===`alpha`||r===`bravo`?r:`spectator`;return{id:n,senderId:String(t.senderId||``),senderName:String(t.senderName||`Player`),team:i,text:String(t.text||``)}}function s({input:t,onSend:n=()=>!1,isAvailable:r=()=>!0,shouldRelock:s=()=>!1}={}){i();let c=document.createElement(`section`);c.className=`cot-room-chat quiet`,c.hidden=!0,c.dataset.testid=`room-chat`,c.setAttribute(`aria-label`,e(`chat.aria`));let l=document.createElement(`div`);l.className=`cot-room-chat-log`,l.dataset.testid=`room-chat-log`,l.setAttribute(`role`,`log`),l.setAttribute(`aria-live`,`polite`),l.setAttribute(`aria-relevant`,`additions`);let u=document.createElement(`div`);u.className=`cot-room-chat-controls`;let d=document.createElement(`button`);d.className=`cot-room-chat-toggle`,d.type=`button`,d.dataset.testid=`room-chat-toggle`,d.innerHTML=`<b>↵</b>&nbsp; ${e(`chat.toggle`)}`,d.setAttribute(`aria-label`,e(`chat.open`)),d.setAttribute(`aria-keyshortcuts`,`Enter`);let f=document.createElement(`form`);f.className=`cot-room-chat-form`;let p=document.createElement(`input`);p.className=`cot-room-chat-input`,p.dataset.testid=`room-chat-input`,p.type=`text`,p.autocomplete=`off`,p.spellcheck=!0,p.enterKeyHint=`send`,p.placeholder=e(`chat.placeholder`),p.setAttribute(`aria-label`,e(`chat.messageAria`));let m=document.createElement(`button`);m.className=`cot-room-chat-send`,m.dataset.testid=`room-chat-send`,m.type=`submit`,m.textContent=e(`chat.send`);let h=document.createElement(`span`);h.className=`cot-room-chat-count`,h.setAttribute(`aria-hidden`,`true`),f.append(p,m,h),u.append(d,f),c.append(l,u),document.body.appendChild(c);let g=!1,_=!1,v=``,y=null,b=new Set;function x(){return[...p.value].length}function S(){let e=x();h.textContent=`${e}/240`,h.classList.toggle(`over`,e>240),m.disabled=e===0||e>240}function C({relock:e=!0}={}){_&&(_=!1,c.classList.remove(`open`),p.blur(),t?.setEnabled?.(!0),S(),e&&s()&&t?.requestLock?.())}function w(){return!g||!r()||_?!1:(_=!0,c.classList.add(`open`),t?.setEnabled?.(!1),document.pointerLockElement&&document.exitPointerLock&&document.exitPointerLock(),p.focus({preventScroll:!0}),S(),!0)}function T(){let e=x();return e<1||e>240||!n(p.value)?!1:(p.value=``,S(),C(),!0)}function E(e){if(!(!g||!r()||e.isComposing))if(e.code===`Enter`){if(!_&&a(e.target))return;e.preventDefault(),e.stopImmediatePropagation(),_?T():w()}else _&&e.code===`Escape`&&(e.preventDefault(),e.stopImmediatePropagation(),C())}function D(){c.classList.remove(`quiet`),y&&clearTimeout(y),y=setTimeout(()=>c.classList.add(`quiet`),9e3)}function O(t){let n=o(t);if(!n||b.has(n.id))return!1;b.add(n.id);let r=document.createElement(`div`);r.className=`cot-room-chat-message ${n.team||`spectator`}`+(n.senderId===v?` self`:``),r.dataset.messageId=String(n.id||``),r.dataset.senderId=String(n.senderId||``);let i=document.createElement(`span`);i.className=`cot-room-chat-name`,i.textContent=n.senderName||e(`chat.player`);let a=document.createElement(`span`);for(a.className=`cot-room-chat-text`,a.textContent=n.text||``,r.append(i,a),l.appendChild(r);l.childElementCount>48;){let e=l.firstElementChild;e instanceof HTMLElement&&e.dataset.messageId&&b.delete(e.dataset.messageId),e?.remove()}return l.scrollTop=l.scrollHeight,D(),!0}d.addEventListener(`click`,w),f.addEventListener(`submit`,e=>{e.preventDefault(),T()}),p.addEventListener(`input`,S);for(let e of[`pointerdown`,`mousedown`,`mouseup`,`wheel`])c.addEventListener(e,e=>e.stopPropagation());return window.addEventListener(`keydown`,E,!0),S(),{root:c,append:O,open:w,close:C,setPlayer(e){v=String(e||``);for(let e of l.children)e instanceof HTMLElement&&e.classList.toggle(`self`,e.dataset.senderId===v)},setActive(e){g=!!e,c.hidden=!g,g||C({relock:!1})},clear(){l.replaceChildren(),b.clear(),p.value=``,S()},get isOpen(){return _},dispose(){y&&clearTimeout(y),window.removeEventListener(`keydown`,E,!0),c.remove()}}}export{s as createRoomChat,o as normalizeRoomChatMessage};