import{s as e}from"./i18n-BwCuf8CS.js";import{n as t,t as n}from"./fonts-CSLQRemL.js";import{t as r}from"./icons-BHibIFPX.js";import{n as i}from"./tier-Pvk6fSHL.js";var a=Object.freeze({"Loading combat interface":`battleLoad.stage.loadingCombatInterface`,"Loading battlefield":`battleLoad.stage.loadingBattlefield`,"Uploading battlefield textures":`battleLoad.stage.uploadingTextures`,"Battlefield ready":`battleLoad.stage.battlefieldReady`,"Assembling rosters":`battleLoad.stage.assemblingRosters`,"Drawing tactical map":`battleLoad.stage.drawingTacticalMap`,"Preparing player vehicle":`battleLoad.stage.preparingPlayer`,"Painting vehicles":`battleLoad.stage.paintingVehicles`,"Preparing deployment":`battleLoad.stage.preparingDeployment`,Ready:`battleLoad.stage.ready`,"Finishing camouflage":`battleLoad.stage.finishingCamo`,"Warming suspension terrain":`battleLoad.stage.warmingSuspension`,"Priming deployment view":`battleLoad.stage.primingDeployment`,"Priming deployment shadows":`battleLoad.stage.primingShadows`,"Combat effects ready":`battleLoad.stage.combatEffectsReady`,"Loading multiplayer runtime":`battleLoad.stage.loadingMultiplayer`,"Opening battle channel":`battleLoad.stage.openingBattleChannel`,"Preparing the next round":`battleLoad.stage.preparingNextRound`,"Opening dedicated channel":`battleLoad.stage.openingDedicatedChannel`,"Securing match channel":`battleLoad.stage.securingMatchChannel`,"Synchronizing authority":`battleLoad.stage.synchronizingAuthority`,"Priming wreck variants":`battleLoad.stage.primingWreckVariants`,"Surveying terrain":`battleLoad.stage.surveyingTerrain`,"Building terrain meshes":`battleLoad.stage.buildingTerrain`,"Placing structures":`battleLoad.stage.placingStructures`,"Sealing the battlefield":`battleLoad.stage.sealingBattlefield`,"Planting vegetation":`battleLoad.stage.plantingVegetation`,"Surveying battlefield":`battleLoad.stage.surveyingBattlefield`,"Settling actors":`battleLoad.stage.settlingActors`,"Studio ready":`battleLoad.stage.studioReady`,"Preparing player panel":`battleLoad.stage.preparingPlayerPanel`,"Compiling combat shaders":`battleLoad.stage.compilingCombatShaders`,"Priming combat effects":`battleLoad.stage.primingCombatEffects`});function o(t){let n=a[t];return n?e(n):t}var s=`
.cot-bl{position:fixed;inset:0;z-index:150;display:none;place-items:center;
  --bl-edge:clamp(18px,4vw,64px);--bl-panel:rgba(7,11,15,.9);
  font-family:${t};color:#e6edf3;-webkit-user-select:none;user-select:none;
  background:#05080b;opacity:1;overflow:hidden;isolation:isolate;}
.cot-bl.on{display:grid;opacity:1;}
.cot-bl.leaving{display:grid;opacity:0;transition:opacity var(--cot-motion-base) var(--cot-ease-out);}
.cot-bl *{box-sizing:border-box;margin:0;padding:0;}
.cot-bl::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(rgba(190,208,221,.022) 1px,transparent 1px),
    linear-gradient(90deg,rgba(190,208,221,.018) 1px,transparent 1px);
  background-size:48px 48px;mask-image:linear-gradient(180deg,transparent,black 36%,black);}
/* Full-bleed map art keeps every aspect ratio intentional; the briefing card
   caps the information width so ultrawide screens never become empty space. */
.cot-bl .hero{position:absolute;inset:0;z-index:-1;overflow:hidden;}
.cot-bl .hero .art{position:absolute;inset:-4%;background-size:cover;
  background-position:center;filter:saturate(.82) contrast(1.08) brightness(.7);
  transform:scale(1.04);}
.cot-bl .hero .art.none{background:linear-gradient(160deg,#1e2a1c,#0b1017 70%);}
.cot-bl .hero .art.desert{background-image:linear-gradient(160deg,#6d5330,#241a10 72%);}
.cot-bl .hero .art.winter{background-image:linear-gradient(160deg,#5d6b78,#141a20 72%);}
.cot-bl .hero .art.urban{background-image:linear-gradient(160deg,#4b4a45,#14161a 72%);}
.cot-bl .hero .art.coastal,.cot-bl .hero .art.fjord{background-image:linear-gradient(160deg,#426b78,#101b22 72%);}
.cot-bl .hero .art.autumn,.cot-bl .hero .art.badlands{background-image:linear-gradient(160deg,#80502f,#211510 72%);}
.cot-bl .hero .art.steppe,.cot-bl .hero .art.frontier{background-image:linear-gradient(160deg,#667247,#172015 72%);}
.cot-bl .hero .art.railyard,.cot-bl .hero .art.foundry{background-image:linear-gradient(160deg,#55514b,#151619 72%);}
.cot-bl .hero .art.delta,.cot-bl .hero .art.monsoon{background-image:linear-gradient(160deg,#315f4d,#0e1d1a 72%);}
.cot-bl .hero .art.alpine{background-image:linear-gradient(160deg,#7e96a6,#121a23 72%);}
.cot-bl .hero .art.caldera{background-image:linear-gradient(160deg,#59473f,#171316 72%);}
.cot-bl .hero .scrim{position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(3,6,9,.2),rgba(3,6,9,.62) 38%,rgba(3,6,9,.94) 100%);}
.cot-bl .hero .vig{position:absolute;inset:0;
  background:radial-gradient(110% 90% at 50% 20%,transparent 24%,rgba(0,0,0,.78) 100%);}
.cot-bl .briefing{position:relative;z-index:1;width:min(1180px,calc(100vw - (var(--bl-edge) * 2)));
  height:min(720px,78dvh);min-height:520px;
  display:grid;grid-template-rows:auto minmax(0,1fr) auto;align-items:stretch;
  padding:clamp(20px,3vh,34px) clamp(18px,2.5vw,34px) clamp(16px,2.2vh,26px);
  background:linear-gradient(180deg,rgba(9,14,18,.46),var(--bl-panel) 31%,rgba(4,7,10,.95));
  border:1px solid rgba(177,195,208,.24);border-top-color:rgba(240,176,74,.58);
  box-shadow:0 22px 80px rgba(0,0,0,.5),inset 0 1px rgba(255,255,255,.035);}
.cot-bl .cap{text-align:center;padding-bottom:clamp(15px,2.5vh,27px);}
.cot-bl .kicker{font-family:${n};font-size:10.5px;font-weight:700;
  letter-spacing:.36em;text-indent:.36em;color:#f0a030;text-transform:uppercase;}
.cot-bl .mapname{margin-top:7px;font-size:clamp(30px,4.1vw,52px);font-weight:800;
  letter-spacing:.14em;text-indent:.14em;text-transform:uppercase;color:#f4f8fc;
  text-shadow:0 3px 22px rgba(0,0,0,.9);}
/* --- rosters ------------------------------------------------------------- */
.cot-bl .teams{min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 54px minmax(0,1fr);
  align-items:center;gap:clamp(16px,3vw,42px);}
.cot-bl .team{min-width:0;display:flex;flex-direction:column;justify-content:center;}
.cot-bl .thead{display:flex;align-items:center;gap:9px;padding:0 8px 8px;
  border-bottom:1px solid rgba(146,164,180,.24);font-family:${n};
  font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;}
.cot-bl .team.ally .thead{color:#7fdc8a;border-bottom-color:rgba(127,220,138,.4);}
.cot-bl .team.foe .thead{color:#f07a72;border-bottom-color:rgba(240,122,114,.4);}
.cot-bl .team.foe .thead{flex-direction:row-reverse;}
.cot-bl .thead .n{margin-left:auto;font-variant-numeric:tabular-nums;color:#8a97a3;
  letter-spacing:.12em;}
.cot-bl .team.foe .thead .n{margin-left:0;margin-right:auto;}
.cot-bl .rows{display:flex;flex-direction:column;gap:3px;padding-top:7px;}
.cot-bl .row{display:flex;align-items:center;gap:10px;height:clamp(29px,4vh,35px);padding:0 8px;
  background:rgba(171,193,209,.045);border:1px solid rgba(161,181,196,.07);
  border-left:2px solid transparent;}
.cot-bl .team.foe .row{flex-direction:row-reverse;border-left:none;
  border-right:2px solid transparent;}
.cot-bl .team.ally .row{border-left-color:rgba(127,220,138,.42);}
.cot-bl .team.foe .row{border-right-color:rgba(240,122,114,.42);}
.cot-bl .row.me{background:linear-gradient(90deg,rgba(240,160,48,.20),rgba(240,160,48,.03));
  border-left-color:#f0a030;}
.cot-bl .row .tier{flex:0 0 26px;text-align:center;font-family:${n};
  font-size:11px;font-weight:700;letter-spacing:.04em;color:#ffd27a;}
.cot-bl .row .sil{flex:0 0 52px;height:24px;background-repeat:no-repeat;
  background-position:center;background-size:contain;opacity:.9;}
.cot-bl .team.foe .row .sil{transform:scaleX(-1);}
.cot-bl .row .nm{flex:1 1 auto;min-width:0;font-size:12.5px;font-weight:600;
  color:#dfe8f0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cot-bl .team.foe .row .nm{text-align:right;}
.cot-bl .row.me .nm{color:#ffe4b0;}
.cot-bl .vs{width:48px;height:48px;display:grid;place-items:center;justify-self:center;
  font-family:${n};font-size:11px;font-weight:800;letter-spacing:.14em;color:#c8d4dd;
  background:rgba(6,10,14,.82);border:1px solid rgba(240,176,74,.34);
  box-shadow:inset 0 0 0 3px rgba(4,7,10,.75),0 8px 22px rgba(0,0,0,.4);}
/* --- footer: progress + countdown --------------------------------------- */
.cot-bl .foot{padding-top:clamp(15px,2.5vh,24px);}
.cot-bl .fmeta{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;
  margin-bottom:8px;font-family:${n};letter-spacing:-.01em;font-variant-numeric:tabular-nums;}
.cot-bl .fstage{font-size:11px;font-weight:700;letter-spacing:.26em;color:#9fb0bf;
  text-transform:uppercase;}
.cot-bl .fpct{font-size:19px;font-weight:700;color:#ffd27a;}
.cot-bl .fbar{position:relative;height:5px;background:rgba(255,255,255,.07);overflow:hidden;
  box-shadow:inset 0 0 0 1px rgba(146,164,180,.22);}
.cot-bl .ffill{position:absolute;left:0;top:0;bottom:0;width:100%;
  transform:scaleX(0);transform-origin:left center;
  background:linear-gradient(90deg,#b96f10,#f0a030 65%,#ffcf7d);
  box-shadow:0 0 14px rgba(240,160,48,.5);transition:transform .18s linear;}
.cot-bl.on .ffill{will-change:transform;}
.cot-bl .count{margin-top:13px;text-align:center;font-family:${n};
  font-size:15px;font-weight:800;letter-spacing:.3em;text-indent:.3em;
  color:#dce6ee;text-transform:uppercase;min-height:24px;
  text-shadow:0 2px 8px rgba(0,0,0,.9);}
.cot-bl .count b{color:#ffd27a;font-size:23px;text-shadow:0 0 18px rgba(240,160,48,.36);}
.cot-bl .tip{margin-top:9px;text-align:center;font-size:11px;color:#82909b;
  line-height:1.45;padding:0 5%;}
.cot-bl .tip b{color:#c2903f;font-family:${n};font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;font-size:9.5px;margin-right:8px;}
@media (prefers-reduced-motion:reduce){.cot-bl.leaving,.cot-bl .ffill{transition-duration:1ms;}}
`,c=[[`battleLoad.tip.opening.heading`,`battleLoad.tip.opening.body`],[`battleLoad.tip.trade.heading`,`battleLoad.tip.trade.body`],[`battleLoad.tip.team.heading`,`battleLoad.tip.team.body`],[`battleLoad.tip.minimap.heading`,`battleLoad.tip.minimap.body`]];function l(t){return[e(t[0]),e(t[1])]}function u(e,t){let n=e.querySelector(t);if(!n)throw Error(`Battle loading screen is missing ${t}`);return n}function d(){if(!document.getElementById(`cot-bl-style`)){let e=document.createElement(`style`);e.id=`cot-bl-style`,e.textContent=s,document.head.appendChild(e)}let t=document.createElement(`div`);t.className=`cot-bl`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-label`,e(`battleLoad.preparing`)),t.innerHTML=`<div class="hero" aria-hidden="true"><div class="art none"></div><div class="scrim"></div><div class="vig"></div></div><main class="briefing"><div class="cap"><div class="kicker">${e(`battleLoad.kicker`)}</div><div class="mapname"></div></div><div class="teams"><div class="team ally"><div class="thead"><span>${e(`battleLoad.allies`)}</span><span class="n">0</span></div><div class="rows"></div></div><div class="vs">${e(`battleLoad.vs`)}</div><div class="team foe"><div class="thead"><span>${e(`battleLoad.enemies`)}</span><span class="n">0</span></div><div class="rows"></div></div></div><div class="foot" aria-live="polite"><div class="fmeta"><div class="fstage">${e(`battleLoad.loading`)}</div><div class="fpct">0%</div></div><div class="fbar" role="progressbar" aria-label="${e(`battleLoad.loading`)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="ffill"></div></div><div class="count"></div><div class="tip"></div></div></main>`,document.body.appendChild(t);let n=u(t,`.art`),a=u(t,`.mapname`),d=u(t,`.kicker`),f=u(t,`.team.ally .rows`),p=u(t,`.team.foe .rows`),m=u(t,`.team.ally .n`),h=u(t,`.team.foe .n`),g=u(t,`.fstage`),_=u(t,`.fpct`),v=u(t,`.ffill`),y=u(t,`.fbar`),b=u(t,`.count`),x=u(t,`.tip`),S=!1,C=!1,w=``,T=-1,E=``;function D(e,t,n=[]){e.textContent=``;for(let t of n){let n=document.createElement(`div`);n.className=`row`+(t.isPlayer?` me`:``);let a=document.createElement(`div`);a.className=`tier`,a.textContent=t.tier||i(t.id);let o=document.createElement(`div`);o.className=`sil`,o.style.backgroundImage=`url(${r(t.id,`side_silhouette`)})`;let s=document.createElement(`div`);s.className=`nm`,s.textContent=t.name||t.id,n.append(a,o,s),e.appendChild(n)}t.textContent=String(n.length)}let O={root:t,get visible(){return S},get covering(){return C},showPending(){O.show({mapName:``,mode:e(`battleLoad.kicker`),allies:[],enemies:[]})},show(r){a.textContent=r.mapName||e(`battleLoad.fallbackMapName`),r.mode&&(d.textContent=r.mode),n.className=`art`+(r.thumb?``:` ${r.biome||`none`}`),n.style.backgroundImage=r.thumb?`url(${r.thumb})`:``,D(f,m,r.allies),D(p,h,r.enemies);let[i,o]=l(c[Math.floor(Math.random()*c.length)]);x.innerHTML=`<b>${i}</b>${o}`,b.textContent=``,O.progress(0,e(`battleLoad.loading`)),S=!0,C=!0,t.classList.remove(`leaving`),t.style.display=``,t.classList.add(`on`)},rosters(e,t){D(f,m,e),D(p,h,t)},progress(e,t){let n=Number.isNaN(e)?0:Math.max(0,Math.min(1,e)),r=n.toFixed(3),i=Math.round(n*100);if(r!==w&&(w=r,v.style.transform=`scaleX(${r})`),i!==T&&(T=i,_.textContent=`${i}%`,y.setAttribute(`aria-valuenow`,String(i))),t){let e=o(t);e!==E&&(E=e,g.textContent=e)}},countdown(t){b.innerHTML=t>0?e(`battleLoad.countdown`,{n:t})+``:`<b>${e(`battleLoad.go`)}</b>`},hide(){return S?(S=!1,t.classList.add(`leaving`),t.classList.remove(`on`),new Promise(e=>setTimeout(()=>{S||(t.classList.remove(`leaving`),C=!1),e()},230))):Promise.resolve()}};return O}export{d as t};