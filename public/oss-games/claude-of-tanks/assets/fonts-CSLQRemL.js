var e=`'ABC Monument Grotesk','Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif`,t=`'ABC Monument Grotesk','Arial Narrow','Avenir Next Condensed','Helvetica Neue Condensed','Roboto Condensed','Liberation Sans Narrow',Arial,sans-serif`,n=[500,600,700,800],r=`/fonts/abc-monument-grotesk`,i=`@font-face{
  font-family:'ABC Monument Grotesk';
  src:url('${r}/ABCMonumentGrotesk-Regular.woff2') format('woff2');
  font-weight:100 400;font-style:normal;font-display:optional;}
@font-face{
  font-family:'ABC Monument Grotesk';
  src:url('${r}/ABCMonumentGrotesk-Medium.woff2') format('woff2');
  font-weight:500 600;font-style:normal;font-display:optional;}
@font-face{
  font-family:'ABC Monument Grotesk';
  src:url('${r}/ABCMonumentGrotesk-Bold.woff2') format('woff2');
  font-weight:700 900;font-style:normal;font-display:optional;}
/* stats and timers line up: lining tabular figures across every overlay */
.cot-garage,.cot-hud,.cot-settings,.cot-dp,.cot-hints,.cot-end{
  font-variant-numeric:lining-nums tabular-nums;}
/* weight floor 500 for every overlay root: unweighted text never renders at
   book/regular (explicit 600/700/800 hierarchy steps are unaffected) */
.cot-garage,.cot-hud,.cot-settings,.cot-dp,.cot-hints,.cot-end,
.cot-bl,.cot-si,.cot-kc,.cot-touch,.cot-studio{
  font-weight:500;font-optical-sizing:auto;}`,a=!1;function o(){if(!document.getElementById(`cot-fonts`)){let e=document.createElement(`style`);e.id=`cot-fonts`,e.textContent=i,document.head.appendChild(e)}if(!a&&document.fonts&&document.fonts.load){a=!0;for(let e of n)document.fonts.load(`${e} 16px 'ABC Monument Grotesk'`).catch(()=>{})}}export{e as n,o as r,t};