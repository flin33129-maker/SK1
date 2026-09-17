import{s as e}from"./i18n-BwCuf8CS.js";import{n as t,r as n,t as r}from"./fonts-CSLQRemL.js";import{t as i}from"./uiIcons-D7cq5V9M.js";var a=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`,`),o=new Set([`small`,`medium`,`large`,`wide`]);function s(e,t,n){if(e.key!==`Tab`)return;let r=[...t.querySelectorAll(a)].filter(e=>!e.hidden&&e.getClientRects().length&&e.getAttribute(`aria-hidden`)!==`true`),i=r[0]||n,o=r.at(-1)||n;(!t.contains(document.activeElement)||(e.shiftKey?document.activeElement===i:document.activeElement===o))&&(e.preventDefault(),(e.shiftKey?o:i).focus({preventScroll:!0}))}var c=0,l=null,u=null,d=0;function f(){let e=typeof performance<`u`?performance.now():Date.now();return!!l||e<d}function p(e){return typeof e==`string`&&o.has(e)?e:`medium`}var m=`
.cot-modal-root{position:fixed;inset:0;z-index:10050;display:grid;place-items:center;padding:clamp(12px,3vw,38px);
  font-family:${t};color:#e9eff4;opacity:0;pointer-events:none;
  transition:opacity var(--cot-motion-base) var(--cot-ease-out)}
.cot-modal-root[hidden]{display:none}.cot-modal-root.is-open{opacity:1;pointer-events:auto}
.cot-modal-backdrop{position:absolute;inset:0;background:rgba(1,4,7,.78);backdrop-filter:blur(9px) saturate(.72)}
.cot-modal{--cot-modal-max:680px;position:relative;display:flex;flex-direction:column;width:min(100%,var(--cot-modal-max));
  max-height:min(88vh,900px);overflow:hidden;border:1px solid rgba(165,183,198,.28);border-top-color:rgba(240,176,74,.76);
  background:linear-gradient(155deg,rgba(16,23,29,.99),rgba(5,8,11,.995));box-shadow:0 28px 90px rgba(0,0,0,.76);
  transform:translateY(12px) scale(.992);
  transition:transform var(--cot-motion-slow) var(--cot-ease-drawer)}
.cot-modal-root.is-open .cot-modal{transform:translateY(0) scale(1)}
.cot-modal[data-size='small']{--cot-modal-max:500px}.cot-modal[data-size='large']{--cot-modal-max:900px}
.cot-modal[data-size='wide']{--cot-modal-max:1120px}
.cot-modal::before{content:"";position:absolute;z-index:3;left:0;top:0;width:96px;height:2px;
  background:linear-gradient(90deg,#f0a030,rgba(240,160,48,0));pointer-events:none}
.cot-modal__header{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:18px;
  padding:20px clamp(18px,3vw,30px) 17px;border-bottom:1px solid rgba(165,183,198,.17);background:rgba(8,12,16,.88)}
.cot-modal__eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:6px;color:#e5a542;font:900 10px/1 ${r};
  letter-spacing:.22em;text-transform:uppercase}.cot-modal__eyebrow::before{content:"";width:18px;height:2px;background:#e69a2d}
.cot-modal__title{margin:0;color:#f3f6f8;font:800 clamp(21px,3vw,30px)/1.08 ${t};letter-spacing:-.025em}
.cot-modal__subtitle{max-width:720px;margin:8px 0 0;color:#8fa0ad;font:650 13px/1.5 ${t}}
.cot-modal__close{width:40px;height:40px;display:grid;place-items:center;padding:0;border:1px solid rgba(165,183,198,.24);
  background:rgba(4,7,10,.64);color:#9cadb9;cursor:pointer;
  transition:color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    background-color var(--cot-motion-fast) ease,transform var(--cot-motion-fast) var(--cot-ease-out)}
.cot-modal__close:hover,.cot-modal__close:focus-visible{color:#ffd27a;border-color:#f0a030;background:rgba(240,160,48,.1);outline:none}
.cot-modal__close:active{transform:scale(.96)}
.cot-modal__body{min-height:0;overflow:auto;overscroll-behavior:contain;padding:clamp(18px,3vw,30px);scrollbar-width:thin;
  scrollbar-color:rgba(230,154,45,.45) rgba(8,11,14,.6)}
.cot-modal__body::-webkit-scrollbar{width:7px}.cot-modal__body::-webkit-scrollbar-track{background:rgba(8,11,14,.6)}
.cot-modal__body::-webkit-scrollbar-thumb{background:rgba(230,154,45,.42)}
.cot-modal__footer{display:flex;align-items:center;justify-content:flex-end;gap:9px;padding:13px clamp(18px,3vw,30px);
  border-top:1px solid rgba(165,183,198,.17);background:rgba(7,11,14,.94)}
.cot-modal__footer:empty{display:none}
.cot-modal__button{min-height:40px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 16px;
  border:1px solid rgba(165,183,198,.3);background:rgba(10,15,19,.86);color:#c5d0d8;cursor:pointer;
  font:900 10px/1 ${r};letter-spacing:.13em;text-transform:uppercase;
  transition:color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    background-color var(--cot-motion-fast) ease,transform var(--cot-motion-fast) var(--cot-ease-out)}
.cot-modal__button:hover,.cot-modal__button:focus-visible{border-color:#e69a2d;color:#ffd27a;background:rgba(230,154,45,.1);outline:none}
.cot-modal__button:active{transform:scale(.97)}.cot-modal__button--primary{border-color:#f0b04a;background:linear-gradient(#efaa45,#c8731d);color:#1c1003}
.cot-modal__button--primary:hover,.cot-modal__button--primary:focus-visible{background:linear-gradient(#ffc164,#df8525);color:#120a02}
body[data-cot-width='phone'] .cot-modal-root{padding:8px;place-items:end center}
body[data-cot-width='phone'] .cot-modal{width:100%;max-height:calc(var(--cot-viewport-height,100dvh) - 16px)}
body[data-cot-width='phone'] .cot-modal__header{padding:16px 16px 13px}
body[data-cot-width='phone'] .cot-modal__body{padding:16px}
body[data-cot-width='phone'] .cot-modal__footer{padding:11px 16px;flex-wrap:wrap}
body[data-cot-width='phone'] .cot-modal__title{font-size:22px}
body[data-cot-width='phone'] .cot-modal__subtitle{font-size:12px}
body[data-cot-width='phone'] .cot-modal__close{width:38px;height:38px}
@media(hover:hover){.cot-modal__button:hover,.cot-modal__close:hover{transform:translateY(-1px)}}
@media(prefers-reduced-motion:reduce){.cot-modal-root,.cot-modal,.cot-modal__button,.cot-modal__close{transition:none!important}}
`;function h(){if(n(),document.getElementById(`cot-shared-modal-css`))return;let e=document.createElement(`style`);e.id=`cot-shared-modal-css`,e.textContent=m,document.head.appendChild(e)}function g(){u??(u=document.body.style.overflow,document.body.style.overflow=`hidden`)}function _(){u!=null&&(document.body.style.overflow=u,u=null)}function v({title:t=``,eyebrow:n=``,subtitle:r=``,size:a=`medium`,closeLabel:o=``,className:u=``,onOpen:f=null,onClose:m=null}={}){h();let v=`cot-modal-${++c}`,y=document.createElement(`div`);y.className=`cot-modal-root`,y.hidden=!0;let b=document.createElement(`div`);b.className=`cot-modal-backdrop`;let x=document.createElement(`section`);x.className=`cot-modal${u?` ${u}`:``}`,x.dataset.size=p(a),x.setAttribute(`role`,`dialog`),x.setAttribute(`aria-modal`,`true`),x.setAttribute(`aria-labelledby`,`${v}-title`),r&&x.setAttribute(`aria-describedby`,`${v}-subtitle`);let S=document.createElement(`header`);S.className=`cot-modal__header`;let C=document.createElement(`div`),w=document.createElement(`div`);w.className=`cot-modal__eyebrow`,w.textContent=n||e(`modal.eyebrowDefault`);let T=document.createElement(`h2`);T.id=`${v}-title`,T.className=`cot-modal__title`,T.textContent=t||e(`modal.titleDefault`);let E=document.createElement(`p`);E.id=`${v}-subtitle`,E.className=`cot-modal__subtitle`,E.textContent=r,E.hidden=!r,C.append(w,T,E);let D=document.createElement(`button`);D.type=`button`,D.className=`cot-modal__close`,D.innerHTML=i(`close`,22),D.setAttribute(`aria-label`,o||e(`modal.closeLabel`));let O=document.createElement(`div`);O.className=`cot-modal__body`;let k=document.createElement(`footer`);k.className=`cot-modal__footer`,S.append(C,D),x.append(S,O,k),y.append(b,x),document.body.appendChild(y);let A=null,j=!1,M=0,N=0,P={root:y,panel:x,header:S,body:O,footer:k,closeButton:D,isOpen:()=>l===P,setTitle(t){T.textContent=String(t||e(`modal.titleDefault`))},setEyebrow(t){w.textContent=String(t||e(`modal.eyebrowDefault`))},setSubtitle(e){E.textContent=String(e||``),E.hidden=!e,e?x.setAttribute(`aria-describedby`,E.id):x.removeAttribute(`aria-describedby`)},open({trigger:e=null}={}){if(j)return;let t=++N;window.clearTimeout(M),l&&l!==P&&l.close({restoreFocus:!1,immediate:!0}),A=e||(document.activeElement instanceof HTMLElement?document.activeElement:null),O.scrollTop=0,y.hidden=!1,l=P,g(),requestAnimationFrame(()=>{j||t!==N||l!==P||y.hidden||(y.classList.add(`is-open`),(O.querySelector(`[autofocus]`)||D).focus({preventScroll:!0}))}),f?.(P)},close({restoreFocus:e=!0,immediate:t=!1}={}){if(j||y.hidden&&l!==P)return;N++,window.clearTimeout(M),y.classList.remove(`is-open`);let n=l===P;n&&(l=null),n&&(d=(typeof performance<`u`?performance.now():Date.now())+180),n&&_();let r=()=>{y.hidden=!0,e&&A?.isConnected&&A.focus({preventScroll:!0}),A=null};t||window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches?r():M=window.setTimeout(r,210),m?.(P)},dispose(){j||(P.close({restoreFocus:!1,immediate:!0}),j=!0,y.remove())}};return D.addEventListener(`click`,()=>P.close()),b.addEventListener(`pointerdown`,e=>{e.target===b&&P.close()}),x.addEventListener(`keydown`,e=>{if(e.key===`Escape`){e.preventDefault(),e.stopPropagation(),P.close();return}s(e,x,D)}),P}export{v as n,f as r,s as t};