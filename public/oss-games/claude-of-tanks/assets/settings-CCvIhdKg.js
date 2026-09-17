import{c as e,i as t,o as n,r,s as i}from"./i18n-BwCuf8CS.js";import{_ as a,a as o,c as s,g as c,o as l,r as u,t as d}from"./quality-DkBoKjcL.js";import{n as f,t as p}from"./dom-DQVRVNJD.js";import{n as m,r as ee}from"./fonts-CSLQRemL.js";import{t as h}from"./uiIcons-D7cq5V9M.js";import{r as te,t as ne}from"./modal-BcVtA3dh.js";var re=Object.freeze({forward:{id:`moveForward`},back:{id:`moveBack`},left:{id:`steerLeft`},right:{id:`steerRight`},handbrake:{id:`handbrake`,tone:`amber`},selfRight:{id:`reload`,tone:`amber`},fire:{id:`fireGun`,tone:`red`},sniperToggle:{id:`scope`,tone:`cyan`},shell1:{id:`shell`,tone:`amber`,badge:`1`},shell2:{id:`shell`,tone:`amber`,badge:`2`},shell3:{id:`shell`,tone:`amber`,badge:`3`},specialAction:{id:`star`,tone:`amber`},reloadMagazine:{id:`reload`,tone:`amber`},consumable1:{id:`repair`,tone:`amber`},consumable2:{id:`medkit`,tone:`green`},consumable3:{id:`extinguisher`,tone:`red`},freeLook:{id:`freeLook`,tone:`cyan`},freeCamera:{id:`mouse`,tone:`cyan`},zoomIn:{id:`zoomIn`,tone:`cyan`},zoomOut:{id:`zoomOut`,tone:`cyan`},minimapZoom:{id:`map`,tone:`green`},shotLog:{id:`battleRecord`,tone:`cyan`},perfHud:{id:`performance`,tone:`green`},settingsMenu:{id:`settings`}}),g=Object.freeze({sensitivity:{id:`mouse`},invertY:{id:`invertAim`,tone:`cyan`},sniperSensScale:{id:`scope`,tone:`cyan`},aimSmoothing:{id:`aimSmoothing`,tone:`cyan`},padSensitivity:{id:`controller`},rmbMode:{id:`mouse`,tone:`cyan`},aiDifficulty:{id:`battleBots`,tone:`red`},showPerfMeter:{id:`performance`,tone:`green`},showDebugHud:{id:`telemetry`,tone:`violet`},showDirectionalHitValues:{id:`damage`,tone:`red`},armorAimOverlay:{id:`armorFlashlight`},volMaster:{id:`sound`,tone:`cyan`},volEngine:{id:`engine`,tone:`amber`},volCombat:{id:`fireGun`,tone:`red`},volAmbience:{id:`ambience`,tone:`green`},volUi:{id:`music`,tone:`amber`},volVoice:{id:`radio`,tone:`cyan`},alarmHeartbeat:{id:`heartbeat`,tone:`red`},graphicsQuality:{id:`graphics`,tone:`cyan`}});function _(e){return!!(e&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable))}function ie({pointerLocked:e=!1,settingsOpen:t=!1,battleActive:n=!1,replayActive:r=!1,activeElement:i=null}={}){return!e&&!t&&n&&!r&&!_(i)}var ae=Object.freeze({ultra:`settings.preset.ultra`,high:`settings.preset.high`,medium:`settings.preset.medium`,low:`settings.preset.low`,"mobile-low":`settings.preset.mobileLow`,mobile:`settings.preset.mobile`,"mobile-high":`settings.preset.mobileHigh`});function v(e,t){let n=e.querySelector(t);if(!n)throw Error(`[settings] missing required element: ${t}`);return n}var oe=`
/* settings_ui r2 (owner: "make our settings screen look much better"):
   premium pass in the garage r9 kit — blurred pause veil, amber top strip,
   segmented tabs with amber underline, amber-tick section rules, keycap
   binding chips with bound/unbound/listening/conflict states, custom steel
   sliders with amber fill, ON/OFF segmented toggles, plate group-cards on
   the slider tabs, flat-orange chamfered RESUME (BATTLE-button plate), red
   LEAVE BATTLE, overflow-gated scroll fades. Reskin only — every class the
   probes and main.ts touch keeps its name and open/close semantics. */
.cot-settings{position:fixed;inset:0;z-index:80;display:none;align-items:center;justify-content:center;
  background:radial-gradient(130% 100% at 50% 42%,rgba(4,7,10,.50) 0%,rgba(2,4,6,.76) 100%);
  -webkit-backdrop-filter:blur(8px) saturate(.9);backdrop-filter:blur(8px) saturate(.9);
  font-family:${m};color:#e6edf3;-webkit-user-select:none;user-select:none;}
.cot-settings.open{display:flex;animation:cotSetVeil var(--cot-motion-base) var(--cot-ease-out);}
.cot-settings *{box-sizing:border-box;margin:0;padding:0;}
.cot-set-panel{position:relative;width:744px;max-width:96vw;max-height:88vh;
  display:flex;flex-direction:column;
  background:linear-gradient(180deg,rgba(12,17,22,.96),rgba(6,9,12,.985));
  border:1px solid rgba(146,164,180,.30);
  box-shadow:0 24px 90px rgba(0,0,0,.8),inset 0 1px 0 rgba(235,243,250,.05);}
.cot-settings.open .cot-set-panel{animation:cotSetIn var(--cot-motion-slow) var(--cot-ease-drawer) backwards;}
@keyframes cotSetVeil{from{opacity:0;}}
@keyframes cotSetIn{from{opacity:0;transform:translateY(14px) scale(.985);}}
.cot-set-hdr{display:flex;align-items:center;gap:12px;padding:15px 22px 11px;}
.cot-set-hdr h2{font-size:15px;font-weight:800;letter-spacing:.18em;color:#d5dfe7;
  text-transform:uppercase;margin-right:auto;}
.cot-set-hdr h2::before{content:'';display:inline-block;width:18px;height:3px;
  background:#f0a030;margin-right:12px;vertical-align:3px;}
/* PAUSE: battle-pause tag in the header — shown only while the open panel is
   actually freezing a live battle (root gets .paused; garage Esc never shows
   it). Era-chip plate + slow-pulsing amber lamp instead of the old blinking
   outline chip (settings_ui r2). */
.cot-set-paused{display:none;align-items:center;gap:8px;font-size:9.5px;font-weight:800;
  letter-spacing:.30em;color:#ffd27a;text-transform:uppercase;padding:6px 12px 5px 11px;
  border:1px solid rgba(240,176,74,.6);border-bottom:2px solid #f0a030;
  background:linear-gradient(180deg,rgba(58,40,14,.92),rgba(30,20,8,.95));}
.cot-set-paused::before{content:'';width:6px;height:6px;flex:0 0 auto;background:#f0a030;
  box-shadow:0 0 8px rgba(240,160,48,.8);animation:cotPausedPulse 1.7s ease-in-out infinite;}
.cot-settings.paused .cot-set-paused{display:inline-flex;}
@keyframes cotPausedPulse{0%,100%{opacity:1;}50%{opacity:.3;}}
.cot-set-close{cursor:pointer;width:30px;height:30px;flex:0 0 auto;display:flex;
  align-items:center;justify-content:center;
  border:1px solid rgba(146,164,180,.35);border-bottom:2px solid rgba(146,164,180,.45);
  background:rgba(11,15,20,.7);color:#9fb0bf;font-family:${m};font-size:13px;
  line-height:1;transition:color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    transform var(--cot-motion-fast) var(--cot-ease-out);}
.cot-set-close:active{transform:scale(.96);}
.cot-set-close:hover{color:#f0b04a;border-color:rgba(240,176,74,.6);}
/* segmented tabs: hover plate + amber active underline (garage era-chip kit) */
.cot-set-tabs{display:flex;gap:2px;padding:0 22px;border-bottom:1px solid rgba(146,164,180,.22);
  background:linear-gradient(180deg,rgba(146,164,180,.05),rgba(146,164,180,0));}
.cot-set-tab{position:relative;cursor:pointer;background:none;border:none;
  font-family:${m};font-size:11px;font-weight:700;letter-spacing:.22em;color:#8a97a3;
  text-transform:uppercase;padding:11px 16px 10px;
  transition:color var(--cot-motion-fast) ease,background-color var(--cot-motion-fast) ease;}
.cot-set-tab:hover{color:#c6d2dc;background:rgba(146,164,180,.07);}
.cot-set-tab.sel{color:#ffd27a;background:linear-gradient(180deg,rgba(240,160,48,.10),rgba(240,160,48,0));}
.cot-set-tab.sel::after{content:'';position:absolute;left:6px;right:6px;bottom:-1px;height:2px;
  background:#f0a030;box-shadow:0 -1px 8px rgba(240,160,48,.45);}
.cot-set-tab .ct{margin-left:7px;font-style:normal;font-weight:600;font-size:9.5px;
  color:#6d7a86;letter-spacing:.05em;font-variant-numeric:tabular-nums;}
.cot-set-tab.sel .ct{color:#d8a04c;}
/* scrolling rows area — thin steel scrollbar + overflow-gated fade masks
   (.fade-top/.fade-bot toggled by JS from live scroll position; the garage
   r9 .can-scroll pattern, split per edge) */
.cot-set-body{flex:1;overflow-y:auto;padding:2px 22px 16px;min-height:280px;
  scrollbar-width:thin;scrollbar-color:rgba(146,164,180,.45) rgba(8,11,14,.6);}
.cot-set-body::-webkit-scrollbar{width:6px;}
.cot-set-body::-webkit-scrollbar-track{background:rgba(8,11,14,.6);}
.cot-set-body::-webkit-scrollbar-thumb{background:rgba(146,164,180,.45);}
.cot-set-body::-webkit-scrollbar-thumb:hover{background:rgba(146,164,180,.65);}
.cot-set-body.fade-bot{-webkit-mask-image:linear-gradient(180deg,#000 0,#000 calc(100% - 28px),transparent 100%);
  mask-image:linear-gradient(180deg,#000 0,#000 calc(100% - 28px),transparent 100%);}
.cot-set-body.fade-top{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 28px,#000 100%);
  mask-image:linear-gradient(180deg,transparent 0,#000 28px,#000 100%);}
.cot-set-body.fade-top.fade-bot{
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%);
  mask-image:linear-gradient(180deg,transparent 0,#000 28px,#000 calc(100% - 28px),transparent 100%);}
/* section header: amber tick + hairline rule running to the right edge
   (the garage r9 .mtitle pattern) */
.cot-set-group{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:700;
  letter-spacing:.24em;color:#8a97a3;text-transform:uppercase;margin:18px 0 6px;}
.cot-set-group::before{content:'';width:8px;height:2px;flex:0 0 auto;background:#f0a030;}
.cot-set-group::after{content:'';flex:1;height:1px;background:rgba(146,164,180,.14);}
.cot-set-group:first-child{margin-top:12px;}
/* plate group-card (garage r9 battlefield/camo plate) — clusters on the
   GAMEPLAY / SOUND / GRAPHICS tabs sit on one industrial plate each */
.cot-set-card{margin:12px 0 0;padding:10px 12px 9px;
  background:linear-gradient(180deg,rgba(9,13,17,.66),rgba(6,9,12,.5));
  border:1px solid rgba(146,164,180,.16);}
.cot-set-card .cot-set-group{margin:0 0 4px;}
.cot-set-row{display:flex;align-items:center;justify-content:space-between;gap:14px;
  padding:7px 10px;border-bottom:1px solid rgba(146,164,180,.08);transition:background .12s;}
.cot-set-row:hover{background:rgba(146,164,180,.06);}
.cot-set-row.alt{background:rgba(146,164,180,.03);}
.cot-set-row.alt:hover{background:rgba(146,164,180,.06);}
.cot-set-row .lb{min-width:0;flex:1;display:flex;align-items:center;gap:9px;
  font-size:12.5px;color:#c6d2dc;letter-spacing:.04em;line-height:1.3;}
.cot-setting-icon{position:relative;width:24px;height:24px;flex:0 0 24px;display:grid;place-items:center;
  color:#91a3b2;background:linear-gradient(180deg,rgba(37,46,54,.72),rgba(16,21,26,.78));
  border:1px solid rgba(146,164,180,.24);box-shadow:inset 0 1px 0 rgba(235,243,250,.05);}
.cot-setting-icon svg{display:block;width:16px;height:16px;overflow:visible;}
.cot-setting-icon.tone-amber{color:#e2a64d;border-color:rgba(226,166,77,.28);}
.cot-setting-icon.tone-red{color:#d9685f;border-color:rgba(217,104,95,.28);}
.cot-setting-icon.tone-green{color:#67bd7d;border-color:rgba(103,189,125,.28);}
.cot-setting-icon.tone-cyan{color:#67b8d8;border-color:rgba(103,184,216,.28);}
.cot-setting-icon.tone-violet{color:#aa8bd3;border-color:rgba(170,139,211,.28);}
.cot-setting-icon[data-badge]::after{content:attr(data-badge);position:absolute;right:-4px;bottom:-4px;
  min-width:11px;height:11px;padding:0 2px;display:grid;place-items:center;font-size:7px;font-weight:900;
  line-height:1;color:#161009;background:#e2a64d;border:1px solid #6d4717;box-shadow:0 1px 3px #000;}
.cot-setting-label-text{min-width:0;}
.cot-set-row.conflict,.cot-set-row.conflict.alt{background:rgba(190,60,50,.12);
  box-shadow:inset 2px 0 0 #c8503c,inset 0 0 0 1px rgba(240,90,90,.35);}
.cot-set-row.conflict .cot-chip{border-color:rgba(240,110,95,.6);
  border-bottom-color:rgba(200,80,60,.85);}
.cot-set-row .chips{display:flex;gap:6px;align-items:center;}
.cot-set-colhdr{display:flex;align-items:center;gap:6px;padding:12px 10px 5px;
  border-bottom:1px solid rgba(146,164,180,.22);}
.cot-set-colhdr span{width:92px;text-align:center;font-size:8.5px;font-weight:700;
  letter-spacing:.2em;color:#68747f;text-transform:uppercase;}
.cot-set-colhdr span.act{width:auto;flex:1;text-align:left;}
.cot-set-colhdr span.pad{width:72px;}
/* binding chips: keycap read — top-light gradient, 1px inner highlight, 2px
   bottom edge. States: bound steel / unbound dashed dim / listening amber
   pulse / conflict red tint (row-scoped above). */
.cot-chip{width:92px;height:26px;text-align:center;cursor:pointer;font-family:${m};
  font-size:11px;font-weight:700;letter-spacing:.08em;color:#e6edf3;padding:5px 5px 4px;
  background:linear-gradient(180deg,rgba(40,49,58,.95) 0%,rgba(24,30,37,.95) 55%,rgba(15,20,25,.97) 100%);
  border:1px solid rgba(146,164,180,.5);border-bottom:2px solid rgba(88,102,115,.95);
  box-shadow:inset 0 1px 0 rgba(235,243,250,.12);
  transition:color .12s,border-color .12s,filter .12s;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cot-chip.padcol{width:72px;}
.cot-chip:hover{color:#ffd27a;border-color:rgba(240,176,74,.7);filter:brightness(1.08);}
.cot-chip:active{transform:translateY(1px);}
.cot-chip.empty{color:#55606a;background:rgba(11,15,20,.5);box-shadow:none;
  border:1px dashed rgba(146,164,180,.26);padding:5px;}
.cot-chip.listening{color:#ffd27a;border:1px solid #f0a030;border-bottom:2px solid #c97f18;
  background:linear-gradient(180deg,rgba(66,42,12,.96),rgba(34,22,8,.97));
  animation:cotChipPulse 1.1s ease-in-out infinite;font-size:9px;letter-spacing:.05em;padding:5px 3px 4px;}
/* controls_gunnery r4 minor: Chromium's default blue focus ring survived on
   chips after a rebind click (visible in the conflict screenshot) and read as
   web-page chrome inside the custom panel. All panel controls drop the UA
   outline; keyboard navigation keeps an on-brand amber ring via
   :focus-visible (mouse clicks set :focus but not :focus-visible, so the
   pointer flow stays clean). */
.cot-chip:focus,.cot-set-tab:focus,.cot-set-btn:focus,.cot-set-close:focus,
.cot-set-seg button:focus{outline:none;}
.cot-chip:focus-visible,.cot-set-tab:focus-visible,.cot-set-btn:focus-visible,
.cot-set-close:focus-visible,.cot-set-seg button:focus-visible{
  outline:1px solid #f0a030;outline-offset:1px;}
.cot-set-slider input[type=range]:focus{outline:none;}
.cot-set-slider input[type=range]:focus-visible{outline:1px solid #f0a030;outline-offset:2px;}
@keyframes cotChipPulse{
  0%,100%{box-shadow:inset 0 1px 0 rgba(255,210,122,.2),0 0 3px rgba(240,160,48,.25);}
  50%{box-shadow:inset 0 1px 0 rgba(255,210,122,.2),0 0 14px rgba(240,160,48,.6);}}
.cot-set-conflict{display:none;margin:10px 22px 0;padding:9px 14px;align-items:center;gap:12px;
  background:linear-gradient(180deg,rgba(52,16,13,.95),rgba(34,11,9,.95));
  border:1px solid rgba(216,92,68,.5);border-left:3px solid #c8503c;font-size:11.5px;
  letter-spacing:.04em;color:#f2b1a8;}
.cot-set-conflict.show{display:flex;}
.cot-set-conflict b{color:#ffd27a;font-weight:700;}
.cot-set-conflict .msg{flex:1;}
/* footer: quiet ghost reset (left) / red-outline LEAVE BATTLE + flat-orange
   chamfered RESUME (right) — the r7 BATTLE plate, no gloss, no bevel */
.cot-set-ftr{display:flex;align-items:center;gap:10px;padding:13px 22px 16px;
  border-top:1px solid rgba(146,164,180,.22);
  background:linear-gradient(180deg,rgba(146,164,180,.04),rgba(146,164,180,0));}
.cot-set-btn{cursor:pointer;font-family:${m};font-size:11px;font-weight:800;
  letter-spacing:.2em;color:#fff8ee;text-transform:uppercase;padding:10px 22px 9px;
  text-shadow:none;background:#ee8912;border:1px solid #8a4a06;border-bottom:2px solid #a85a05;
  transition:filter .12s;}
.cot-set-btn:hover{filter:brightness(1.08);}
.cot-set-btn:active{transform:translateY(1px);}
.cot-set-btn.ghost{background:rgba(11,15,20,.55);color:#9fb0bf;
  border:1px solid rgba(146,164,180,.3);border-bottom:2px solid rgba(146,164,180,.38);}
.cot-set-btn.ghost:hover{color:#f0b04a;border-color:rgba(240,176,74,.6);filter:none;}
/* reset anchors LEFT and pushes the action pair right — margin on RESET (not
   the old margin-left:auto on LEAVE) so the primary stays flush right even
   when LEAVE BATTLE is display:none in the garage context */
.cot-set-btn.reset{margin-right:auto;}
.cot-set-btn.leave{color:#f0a9a0;background:rgba(46,13,10,.55);
  border:1px solid rgba(216,92,68,.55);border-bottom:2px solid rgba(170,56,40,.85);}
.cot-set-btn.leave:hover{color:#ffd0c5;border-color:rgba(239,110,82,.9);
  background:rgba(66,18,14,.7);filter:none;}
.cot-set-btn.resume{width:150px;height:38px;padding:0 0 1px;border:none;text-indent:.24em;
  letter-spacing:.24em;font-size:11.5px;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 38'%3E%3Cpath d='M8.4 .5H141.6L149.5 19 141.6 37.5H8.4L.5 19Z' fill='%23ee8912' stroke='%238a4a06' stroke-width='1'/%3E%3Cpath d='M1.3 20.5 8.9 37.1h132.2l7.6-16.6' fill='none' stroke='%23a85a05' stroke-width='2' opacity='.9'/%3E%3C/svg%3E") 0 0/100% 100% no-repeat;}
.cot-set-btn.resume:hover{filter:brightness(1.07);}
/* sliders: steel track, amber fill (--f set from JS), keycap thumb */
.cot-set-slider{display:flex;align-items:center;gap:10px;}
.cot-set-slider input[type=range]{-webkit-appearance:none;appearance:none;--f:50%;
  width:190px;height:16px;cursor:pointer;background:transparent;}
.cot-set-slider input[type=range]::-webkit-slider-runnable-track{height:4px;
  background:linear-gradient(90deg,#c9812a 0,#f0a030 var(--f),rgba(146,164,180,.22) var(--f));
  box-shadow:inset 0 1px 1px rgba(0,0,0,.5);}
.cot-set-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;
  width:11px;height:16px;margin-top:-6px;
  background:linear-gradient(180deg,#4a5866,#232c34);
  border:1px solid rgba(210,225,240,.6);border-bottom:2px solid rgba(70,84,96,.95);
  box-shadow:inset 0 1px 0 rgba(235,243,250,.18),0 1px 3px rgba(0,0,0,.5);
  transition:border-color .12s;}
.cot-set-slider input[type=range]:hover::-webkit-slider-thumb{border-color:rgba(240,176,74,.75);}
.cot-set-slider input[type=range]::-moz-range-track{height:4px;background:rgba(146,164,180,.22);}
.cot-set-slider input[type=range]::-moz-range-progress{height:4px;background:#f0a030;}
.cot-set-slider input[type=range]::-moz-range-thumb{width:11px;height:16px;border-radius:0;
  background:linear-gradient(180deg,#4a5866,#232c34);border:1px solid rgba(210,225,240,.6);}
.cot-set-slider input[type=number]{width:62px;text-align:right;font-size:12px;font-weight:700;
  color:#ffd27a;font-variant-numeric:tabular-nums;letter-spacing:.03em;padding:4px 6px 3px;
  font-family:${m};background:rgba(8,11,15,.85);
  border:1px solid rgba(146,164,180,.4);border-bottom:2px solid rgba(146,164,180,.5);
  -moz-appearance:textfield;appearance:textfield;}
.cot-set-slider input[type=number]:focus{outline:none;border-color:rgba(240,176,74,.65);}
.cot-set-slider input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
.cot-set-slider .unit{width:16px;font-size:11px;font-weight:700;color:#8a97a3;}
/* segmented pickers (difficulty / RMB mode / quality) + ON/OFF toggles —
   keycap plates, amber selected (era-chip sel treatment) */
.cot-set-seg{display:flex;gap:4px;}
.cot-set-seg button{cursor:pointer;font-family:${m};font-size:10px;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;color:#8a97a3;padding:6px 14px 5px;
  background:linear-gradient(180deg,rgba(30,38,46,.9),rgba(16,21,26,.95));
  border:1px solid rgba(146,164,180,.42);border-bottom:2px solid rgba(88,102,115,.8);
  box-shadow:inset 0 1px 0 rgba(235,243,250,.07);
  transition:color var(--cot-motion-fast) ease,border-color var(--cot-motion-fast) ease,
    background-color var(--cot-motion-fast) ease,transform var(--cot-motion-fast) var(--cot-ease-out);}
.cot-set-seg button:active{transform:scale(.97);}
.cot-set-seg button:hover{color:#c6d2dc;border-color:rgba(210,225,240,.55);}
.cot-set-seg button.sel{color:#ffd27a;border-color:rgba(240,176,74,.75);border-bottom-color:#f0a030;
  background:linear-gradient(180deg,rgba(58,40,14,.92),rgba(30,20,8,.95));
  box-shadow:inset 0 1px 0 rgba(255,210,122,.12);}
.cot-set-seg.onoff button{padding:5px 13px 4px;min-width:48px;}
.cot-set-note{font-size:10px;letter-spacing:.05em;color:#68747f;margin:10px 10px 2px;line-height:1.55;}
.cot-set-note b{color:#9fb0bf;font-weight:700;}
/* settings_ui r2: the panel respects reduced motion — enter transition,
   paused lamp and listening pulse all freeze; hover transitions collapse */
@media (prefers-reduced-motion:reduce){
  .cot-settings.open,.cot-settings.open .cot-set-panel{animation:none;}
  .cot-set-paused::before{animation:none;}
  .cot-chip.listening{animation:none;
    box-shadow:inset 0 1px 0 rgba(255,210,122,.2),0 0 10px rgba(240,160,48,.5);}
  .cot-settings *{transition-duration:0s !important;}
}
/* Standalone fallback placement. The garage mounts this settings-owned button
   into its top navigation rail; these coordinates only apply before that
   mount or in a surface that creates settings without the garage. */
.cot-gear{position:fixed;top:60px;right:26px;z-index:62;width:42px;height:42px;display:none;
  align-items:center;justify-content:center;cursor:pointer;
  background:rgba(11,15,20,.8);border:1px solid rgba(146,164,180,.3);
  transition:border-color .12s;pointer-events:auto;}
.cot-gear:hover{border-color:rgba(240,176,74,.6);}
.cot-gear:hover svg path{fill:#f0b04a;}
.cot-hints{position:fixed;left:50%;bottom:100px;transform:translateX(-50%);z-index:45;
  display:none;align-items:center;gap:16px;padding:8px 20px;pointer-events:none;
  background:linear-gradient(180deg,rgba(9,13,17,.82),rgba(7,10,14,.7));
  border:1px solid rgba(146,164,180,.3);box-shadow:0 4px 18px rgba(0,0,0,.45);
  font-family:${m};font-size:10.5px;font-weight:600;letter-spacing:.12em;
  color:#9fb0bf;text-transform:uppercase;white-space:nowrap;
  opacity:1;transition:opacity 1.2s ease;}
.cot-hints .hg{display:flex;align-items:center;gap:5px;}
.cot-hints kbd{font-family:${m};font-size:10px;font-weight:700;color:#e6edf3;
  letter-spacing:.06em;padding:2px 6px;line-height:14px;
  background:linear-gradient(180deg,rgba(34,42,50,.95),rgba(18,23,28,.95));
  border:1px solid rgba(146,164,180,.45);border-bottom:2px solid rgba(146,164,180,.6);}
.cot-resume{position:fixed;inset:0;z-index:79;display:none;align-items:center;justify-content:center;
  flex-direction:column;gap:14px;cursor:pointer;background:rgba(4,7,10,.55);
  font-family:${m};color:#e6edf3;-webkit-user-select:none;user-select:none;}
.cot-resume.show{display:flex;}
.cot-resume .rz-title{font-size:22px;font-weight:800;letter-spacing:.34em;text-transform:uppercase;
  color:#f0b04a;text-shadow:0 2px 14px rgba(0,0,0,.8);}
.cot-resume .rz-sub{font-size:11px;font-weight:600;letter-spacing:.22em;color:#9fb0bf;
  text-transform:uppercase;}

/* Touch settings use a true finger-sized target floor in every orientation. */
body.cot-touch-layout .cot-settings button{min-height:44px;}
body.cot-touch-layout .cot-set-close{width:44px;height:44px;}
`,se=h(`settings`,22,`#9fb0bf`),ce=700,le=9,ue=17,de=250;function fe(e=`hold`){return[[i(`settings.group.move`),[`forward`,`left`,`back`,`right`]],[i(`settings.group.fire`),[`fire`]],[i(`settings.group.sniper`),[`sniperToggle`]],[i(`settings.group.gunHold`),[`freeLook`]],[i(e===`freelook`?`settings.group.gunHold`:`settings.group.aim`),[`freeCamera`]],[i(`settings.group.shells`),[`shell1`,`shell2`,`shell3`]],[i(`settings.group.repairs`),[`consumable1`,`consumable2`,`consumable3`]],[i(`settings.group.handbrake`),[`handbrake`]],[i(`settings.group.menu`),[`settingsMenu`]]]}function y(m){ee();let{input:_,bus:y}=m,b=m.isBattleActive||(()=>!1),pe=m.canLeaveBattle||b,me=m.onLeaveBattle||null,he=m.gearVisible||(()=>!1),ge=m.isGamePaused||(()=>!1),x=(e,t={})=>{y?.emit(e,t)};f(`cot-settings-style`,oe);let S=p(`div`,`cot-settings`);S.innerHTML=`<div class="cot-set-panel" role="dialog" aria-modal="true" aria-label="${i(`settings.title`)}"><div class="cot-set-hdr"><h2>${i(`settings.title`)}</h2><span class="cot-set-paused">${i(`settings.paused`)}</span><button class="cot-set-close" type="button" title="${i(`settings.close.title`)}">&#10005;</button></div><div class="cot-set-tabs"><button class="cot-set-tab sel" data-tab="controls" type="button">${i(`settings.tab.controls`)}<i class="ct">${_.actionDefs.length}</i></button><button class="cot-set-tab" data-tab="gameplay" type="button">${i(`settings.tab.gameplay`)}</button><button class="cot-set-tab" data-tab="sound" type="button">${i(`settings.tab.sound`)}</button><button class="cot-set-tab" data-tab="graphics" type="button">${i(`settings.tab.graphics`)}</button><button class="cot-set-tab" data-tab="language" type="button">${i(`settings.tab.language`)}</button></div><div class="cot-set-conflict"><span class="msg"></span><button class="cot-set-btn swap" type="button">${i(`settings.conflict.swap`)}</button><button class="cot-set-btn ghost dismiss" type="button">${i(`settings.conflict.cancel`)}</button></div><div class="cot-set-body"></div><div class="cot-set-ftr"><button class="cot-set-btn ghost reset" type="button">${i(`settings.reset`)}</button><button class="cot-set-btn ghost leave" type="button">${i(`settings.leave`)}</button><button class="cot-set-btn resume" type="button">${i(`settings.resume`)}</button></div></div>`,document.body.appendChild(S);let C=v(S,`.cot-set-body`),w=v(S,`.cot-set-conflict`),_e=v(w,`.msg`),ve=v(S,`.reset`),ye=v(S,`.leave`),be=v(S,`.resume`);function T(){let e=C.scrollTop>4,t=C.scrollTop<C.scrollHeight-C.clientHeight-4;C.classList.toggle(`fade-top`,e),C.classList.toggle(`fade-bot`,t)}C.addEventListener(`scroll`,T,{passive:!0}),window.addEventListener(`resize`,()=>{j&&T()});function xe(){let e=0;for(let t of C.querySelectorAll(`.cot-set-group,.cot-set-row`)){if(t.classList.contains(`cot-set-group`)){e=0;continue}t.classList.toggle(`alt`,e++%2==1)}}function E(e,t,n){let r=p(`span`,`lb`,e),i=p(`span`,`cot-setting-icon tone-${n.tone||`steel`}`,r);return i.setAttribute(`aria-hidden`,`true`),i.innerHTML=h(n.id,16),n.badge&&(i.dataset.badge=n.badge),p(`span`,`cot-setting-label-text`,r).textContent=t,r}let D=m.gear||p(`button`,`cot-gear`);D.type=`button`,D.setAttribute(`aria-label`,i(`settings.gearAria`)),D.innerHTML=se,D.title=i(`settings.gearAria`),D.parentNode||document.body.appendChild(D);let O=p(`div`,`cot-hints`);document.body.appendChild(O);let k=p(`div`,`cot-resume`);k.innerHTML=`<div class="rz-title">${i(`settings.pauseTitle`)}</div><div class="rz-sub">${i(`settings.pauseSub`)}</div>`,document.body.appendChild(k);function Se(){j||k.classList.contains(`show`)||M||_.isCursorAim&&_.isCursorAim()||(k.classList.add(`show`),x(`ui:click`,{}))}function A(){k.classList.remove(`show`)}k.addEventListener(`mousedown`,e=>{e.stopPropagation(),A(),b()&&_.requestLock(),x(`ui:click`,{})});let j=!1,M=!1,Ce=-1/0,we=()=>typeof performance<`u`?performance.now():Date.now(),Te=()=>M||we()-Ce<de,N=`controls`;if(_.isTouchLayout&&_.isTouchLayout()){N=`gameplay`;let e=S.querySelector(`.cot-set-tab[data-tab="controls"]`);e&&(e.style.display=`none`)}let P=null,F=null,I=null,L=!1,Ee=null,De=null,R=0,z=Array(ue).fill(!0),Oe={0:i(`settings.bind.primary`),1:i(`settings.bind.secondary`)},B=e=>_.labelFor(_.getBinding(e,0)||_.getBinding(e,1));function ke(){x(`ui:bindingsChanged`,{shells:[`shell1`,`shell2`,`shell3`].map(B),consumables:[`consumable1`,`consumable2`,`consumable3`].map(B),specialAction:B(`specialAction`)})}function V(){Ne(),ke(),x(`ui:click`,{})}let H=new Map;function Ae(e,t){if(t===`pad`){let t=_.padLabelFor(_.getPadBinding(e));return t===`—`?i(`settings.bind.empty`):t}let n=_.labelFor(_.getBinding(e,t));return n===`—`?i(`settings.bind.empty`):n}function je(e,t,n){let r=p(`button`,`cot-chip${t===`pad`?` padcol`:``}`,n);r.type=`button`;let a=i(e.label);return r.title=t===`pad`?`${a} — ${i(`settings.bind.pad`)}. ${i(`settings.bind.rightClickClear`)}`:`${a} — ${Oe[t]} ${i(`settings.bind.key`)}. ${i(`settings.bind.rightClickClear`)}`,r.addEventListener(`click`,()=>{x(`ui:click`,{}),He(e.id,t,r)}),r.addEventListener(`contextmenu`,n=>{n.preventDefault(),n.stopPropagation(),J(),X(),t===`pad`?_.setPadBinding(e.id,null):_.setBinding(e.id,null,t),V()}),r}function Me(){C.textContent=``,H.clear();let e=p(`div`,`cot-set-colhdr`,C);e.innerHTML=`<span class="act">`+i(`settings.bind.colAction`)+`</span><span>`+i(`settings.bind.primary`)+`</span><span>`+i(`settings.bind.secondary`)+`</span><span class="pad">`+i(`settings.bind.pad`)+`</span>`;let t=null;for(let e of _.actionDefs){e.group!==t&&(p(`div`,`cot-set-group`,C).textContent=i(e.group),t=e.group);let n=p(`div`,`cot-set-row`,C);n.dataset.action=e.id,E(n,i(e.label),re[e.id]);let r=p(`div`,`chips`,n),a={0:je(e,0,r),1:je(e,1,r),pad:je(e,`pad`,r)};H.set(e.id,{row:n,chips:a})}let n=p(`div`,`cot-set-note`,C);n.innerHTML=i(`settings.controls.note.part1`)+`<br>`+i(`settings.controls.note.part2`),Ne()}function Ne(){for(let e of _.actionDefs){let t=H.get(e.id);if(t)for(let n of[0,1,`pad`]){let r=t.chips[n];if(P&&P.chip===r)continue;let i=Ae(e.id,n);r.textContent=i,r.classList.toggle(`empty`,i===`—`)}}}function U(e,t,n,r,i,a={}){let o=a.toDisp||(e=>e),s=a.fromDisp||(e=>e),c=a.digits==null?2:a.digits,l=p(`div`,`cot-set-row`,e);E(l,t,g[n]);let u=p(`div`,`cot-set-slider`,l),d=p(`input`,``,u);d.type=`range`,d.setAttribute(`aria-label`,t),d.min=String(r),d.max=String(i),d.step=a.step||`0.05`;let f=p(`input`,``,u);f.type=`number`,f.setAttribute(`aria-label`,`${t} value`),f.min=String(o(r)),f.max=String(o(i)),f.step=a.dispStep||`0.05`,p(`span`,`unit`,u).textContent=a.unit||`×`;let m=()=>{let e=_.getSettings()[n];d.value=String(e);let t=(e-r)/(i-r)*100;d.style.setProperty(`--f`,`${Math.max(0,Math.min(100,t)).toFixed(1)}%`),f.value=String(parseFloat(o(e).toFixed(c)))};m(),d.addEventListener(`input`,()=>{_.setSetting(n,parseFloat(d.value)),m(),a.onChange&&a.onChange()}),f.addEventListener(`change`,()=>{let e=parseFloat(f.value);Number.isFinite(e)&&_.setSetting(n,s(e)),m(),a.onChange&&a.onChange(),x(`ui:click`,{})}),a.blipOnCommit&&d.addEventListener(`change`,()=>x(`ui:click`,{}))}function W(e,t){let n=p(`div`,`cot-set-card`,e);return p(`div`,`cot-set-group`,n).textContent=t,n}function G(e,t,n,r){let a=p(`div`,`cot-set-row`,e);E(a,t,g[n]);let o=p(`div`,`cot-set-seg onoff`,a),s=[],c=()=>{let e=!!_.getSettings()[n];s[0].classList.toggle(`sel`,!e),s[1].classList.toggle(`sel`,e),s[0].setAttribute(`aria-pressed`,String(!e)),s[1].setAttribute(`aria-pressed`,String(e))};for(let[e,a]of[[!1,i(`settings.off`)],[!0,i(`settings.on`)]]){let i=p(`button`,``,o);i.type=`button`,i.textContent=a,i.setAttribute(`aria-label`,`${t}: ${a}`),i.addEventListener(`click`,()=>{!!_.getSettings()[n]!==e&&(_.setSetting(n,e),c(),r&&r(),x(`ui:click`,{}))}),s.push(i)}return c(),a}function Pe(){C.textContent=``;let e=!!(_.isTouchLayout&&_.isTouchLayout()),t=W(C,i(e?`settings.aim.touch`:`settings.aim.mouse`));U(t,i(e?`settings.touch.swipeSensitivity`:`settings.mouse.sensitivity`),`sensitivity`,.2,3),U(t,i(`settings.mouse.sniperScale`),`sniperSensScale`,.2,3),U(t,i(`settings.mouse.aimSmoothing`),`aimSmoothing`,0,1,{step:`0.01`,dispStep:`1`,unit:`%`,digits:0,toDisp:e=>e*100,fromDisp:e=>e/100}),G(t,i(`settings.mouse.invertY`),`invertY`);let n=[[`hold`,i(`settings.rmb.hold`)],[`toggle`,i(`settings.rmb.toggle`)],[`freelook`,i(`settings.rmb.freelook`)]];if(!e){let e=p(`div`,`cot-set-row`,t);E(e,i(`settings.rmb.label`),g.rmbMode);let r=p(`div`,`cot-set-seg`,e),a=[];for(let[e,t]of n){let n=p(`button`,``,r);n.type=`button`,n.textContent=t,n.dataset.mode=e,n.addEventListener(`click`,()=>{_.setSetting(`rmbMode`,e);for(let t of a)t.classList.toggle(`sel`,t.dataset.mode===e);x(`ui:click`,{})}),a.push(n)}for(let e of a)e.classList.toggle(`sel`,e.dataset.mode===_.getSettings().rmbMode);let o=p(`div`,`cot-set-note`,t);o.textContent=i(`settings.aim.note`)}let r=W(C,i(`settings.battle.title`)),a=p(`div`,`cot-set-row`,r);E(a,i(`settings.gameplay.difficultyNext`),g.aiDifficulty);let o=p(`div`,`cot-set-seg`,a),s=[];for(let e of[`easy`,`normal`,`hard`]){let t=p(`button`,``,o);t.type=`button`,t.textContent=i(`settings.difficulty.${e}`),t.addEventListener(`click`,()=>{_.setSetting(`aiDifficulty`,e);for(let t of s)t.classList.toggle(`sel`,t.dataset.tier===e);x(`ui:difficulty`,{difficulty:e}),x(`ui:click`,{})}),t.dataset.tier=e,s.push(t)}for(let e of s)e.classList.toggle(`sel`,e.dataset.tier===_.getSettings().aiDifficulty);let c=p(`div`,`cot-set-note`,r);c.textContent=i(`settings.difficulty.note`);let l=W(C,i(`settings.interface.title`));G(l,i(`settings.interface.armorOverlay`),`armorAimOverlay`),G(l,i(`settings.gameplay.showPerfMeter`),`showPerfMeter`,Ie),G(l,i(`settings.interface.hitValues`),`showDirectionalHitValues`,Re),G(l,i(`settings.interface.debugHud`),`showDebugHud`,Le);let u=p(`div`,`cot-set-note`,l);u.textContent=i(`settings.interface.armorNote`);let d=p(`div`,`cot-set-note`,l);d.textContent=i(`settings.interface.hitValueNote`);let f=p(`div`,`cot-set-note`,l);f.textContent=i(`settings.interface.debugNote`);let m=W(C,i(`settings.pad.title`));U(m,i(`settings.gameplay.aimPad`),`padSensitivity`,.2,3);let ee=p(`div`,`cot-set-note`,m);ee.textContent=_.isPadConnected()?i(`settings.pad.detected`):i(`settings.pad.absent`);let h=p(`div`,`cot-set-note`,C);h.textContent=i(e?`settings.aim.sniper.touch`:`settings.aim.sniper.mouse`)}let Fe=[[`volMaster`,i(`settings.sound.master`)],[`volEngine`,i(`settings.sound.engine`)],[`volCombat`,i(`settings.sound.combat`)],[`volAmbience`,i(`settings.sound.ambience`)],[`volUi`,i(`settings.sound.ui`)],[`volVoice`,i(`settings.sound.voice`)]];function Ie(){x(`ui:perfMeter`,{on:!!_.getSettings().showPerfMeter})}function Le(){x(`ui:debugHud`,{on:!!_.getSettings().showDebugHud})}function Re(){x(`ui:directionalHitValues`,{on:!!_.getSettings().showDirectionalHitValues})}function K(){let e=_.getSettings();x(`ui:volumes`,{master:e.volMaster,engine:e.volEngine,combat:e.volCombat,ambience:e.volAmbience,ui:e.volUi,voice:e.volVoice,alarmHeartbeat:!!e.alarmHeartbeat})}function ze(){C.textContent=``;let e=W(C,i(`settings.sound.title`));for(let[t,n]of Fe)U(e,n,t,0,1,{step:`0.01`,dispStep:`1`,unit:`%`,digits:0,toDisp:e=>e*100,fromDisp:e=>e/100,onChange:K,blipOnCommit:!0});G(W(C,i(`settings.alarms.title`)),i(`settings.alarms.heartbeat`),`alarmHeartbeat`,K);let t=p(`div`,`cot-set-note`,C);t.textContent=i(`settings.sound.note`)}function Be(){C.textContent=``;let e=W(C,i(`settings.graphics.title`)),t=p(`div`,`cot-set-row`,e);E(t,i(`settings.graphics.label`),g.graphicsQuality);let n=p(`div`,`cot-set-seg`,t),r=[],f=o()===`mobile`,m=f?d:[`auto`,...u];for(let e of m){let t=p(`button`,``,n);t.type=`button`,t.textContent=e===`auto`?i(`settings.preset.auto`):i(ae[e]||`settings.preset.ultra`).toLowerCase(),t.dataset.name=e,t.addEventListener(`click`,()=>{f?c(e):a(e);for(let t of r)t.classList.toggle(`sel`,t.dataset.name===e);x(`ui:click`,{})}),r.push(t)}let ee=f?l():s();for(let e of r)e.classList.toggle(`sel`,e.dataset.name===ee);let h=p(`div`,`cot-set-note`,e);h.textContent=i(f?`settings.graphics.note.mobile`:`settings.graphics.note.desktop`)}function Ve(){C.textContent=``;let a=W(C,i(`settings.language.title`)),o=p(`div`,`cot-set-row`,a);E(o,i(`settings.language.label`),g.graphicsQuality);let s=p(`div`,`cot-set-seg`,o),c=[],l=r();for(let a of t()){let t=p(`button`,``,s);t.type=`button`,t.dataset.locale=a,t.textContent=i(`settings.language.`+(a===`zh-CN`?`zh`:`en`)),t.addEventListener(`click`,()=>{a!==r()&&(n(a),x(`ui:click`,{}),window.location.assign(e(window.location,a)))}),c.push(t)}for(let e of c)e.classList.toggle(`sel`,e.dataset.locale===l);let u=p(`div`,`cot-set-note`,a);u.textContent=i(`settings.language.note`)}function q(){J(),X();for(let e of S.querySelectorAll(`.cot-set-tab`))e.classList.toggle(`sel`,e.dataset.tab===N);ve.style.visibility=N===`controls`||N===`graphics`||N===`sound`?`visible`:`hidden`,N===`controls`?Me():N===`graphics`?Be():N===`sound`?ze():N===`language`?Ve():Pe(),xe(),T()}function He(e,t,n){J(),X(),P={actionId:e,slot:t,chip:n},n.classList.add(`listening`),t===`pad`?n.textContent=i(`settings.bind.pressPad`):(n.textContent=i(`settings.bind.press`),window.addEventListener(`mousedown`,We,!0),window.addEventListener(`wheel`,Ge,{capture:!0,passive:!1}))}function J(){F&&=(clearTimeout(F),null),P&&(P.chip.classList.remove(`listening`),P=null,window.removeEventListener(`mousedown`,We,!0),window.removeEventListener(`wheel`,Ge,{capture:!0}),Ne())}function Y(e){if(!P||P.slot===`pad`)return;let{actionId:t,slot:n}=P;if(J(),e===_.getBinding(t,n))return;let r=_.findConflict(e,t,n);if(r&&r.actionId===t){_.setBinding(t,null,r.slot),_.setBinding(t,e,n),V();return}if(r){Ke({actionId:t,slot:n,otherId:r.actionId,otherSlot:r.slot,code:e,pad:!1});return}_.setBinding(t,e,n),V()}function Ue(e){if(!P||P.slot!==`pad`)return;let{actionId:t}=P;if(J(),e===_.getPadBinding(t))return;let n=_.findPadConflict(e,t);if(n){Ke({actionId:t,slot:`pad`,otherId:n.actionId,otherSlot:`pad`,code:e,pad:!0});return}_.setPadBinding(t,e),V()}function We(e){!P||P.slot===`pad`||(e.preventDefault(),e.stopPropagation(),Y(`Mouse${e.button}`))}function Ge(e){!P||P.slot===`pad`||e.deltaY===0||(e.preventDefault(),e.stopPropagation(),Y(e.deltaY<0?`WheelUp`:`WheelDown`))}function Ke(e){I=e;let t=_.actionDefs.find(t=>t.id===e.actionId),n=_.actionDefs.find(t=>t.id===e.otherId),r=e.pad?(()=>{let t=_.padLabelFor(e.code);return t===`—`?i(`settings.bind.empty`):t})():(()=>{let t=_.labelFor(e.code);return t===`—`?i(`settings.bind.empty`):t})(),a=e.pad?``:` (${Oe[e.otherSlot]})`;_e.innerHTML=i(`settings.conflict.message`,{codeLabel:r,otherLabel:n?i(n.label):e.otherId,slotTag:a,thisLabel:t?i(t.label):e.actionId}),w.classList.add(`show`);for(let t of[e.actionId,e.otherId]){let e=H.get(t);e&&e.row.classList.add(`conflict`)}}function X(){if(I){I=null,w.classList.remove(`show`);for(let{row:e}of H.values())e.classList.remove(`conflict`)}}v(w,`.swap`).addEventListener(`click`,()=>{I&&(I.pad?_.swapPadBindings(I.actionId,I.otherId,I.code):_.swapBindings(I.actionId,I.slot,I.otherId,I.otherSlot,I.code),X(),V())}),v(w,`.dismiss`).addEventListener(`click`,()=>{X(),x(`ui:click`,{})});function qe(e){if(j){if(P){if(e.preventDefault(),e.stopPropagation(),e.code===`Escape`){if(P.slot===`pad`){J();return}!F&&!e.repeat&&(P.chip.textContent=i(`settings.bind.holdForEsc`),F=setTimeout(()=>{F=null,P&&Y(`Escape`)},ce));return}if(P.slot===`pad`)return;e.repeat||Y(e.code);return}e.stopPropagation(),ne(e,S,v(S,`.cot-set-close`)),e.code===`Escape`&&(e.preventDefault(),I?X():$.close())}}function Je(e){j&&P&&e.code===`Escape`&&F&&(clearTimeout(F),F=null,J(),e.preventDefault(),e.stopPropagation())}function Ye(){z.fill(!0);let e=navigator.getGamepads&&navigator.getGamepads()||[];for(let t of e){if(!t||!t.connected)continue;let e=Math.min(t.buttons.length,ue);for(let n=0;n<e;n++)z[n]=t.buttons[n].pressed||t.buttons[n].value>.5;break}}function Xe(){if(!j){R=0;return}let e=navigator.getGamepads&&navigator.getGamepads()||[],t=null;for(let n of e)if(n&&n.connected){t=n;break}if(t){let e=Math.min(t.buttons.length,ue);for(let n=0;n<e;n++){let e=t.buttons[n].pressed||t.buttons[n].value>.5,r=z[n];if(z[n]=e,!(!e||r)){if(P&&P.slot===`pad`)Ue(n);else if(n===le){$.close();return}}}}R=requestAnimationFrame(Xe)}function Ze(){S.classList.toggle(`paused`,j&&ge())}function Z(){if(j)return;j=!0,A(),L=b(),_.setEnabled(!1),_.releaseLock(),Ze(),tt(),q();let e=!!(pe()&&me);ye.style.display=e?`block`:`none`,be.textContent=i(e?`settings.resume`:`settings.close.title`),S.classList.add(`open`),v(S,`.cot-set-close`).focus({preventScroll:!0}),T(),window.addEventListener(`keydown`,qe,!0),window.addEventListener(`keyup`,Je,!0),Ye(),R||=requestAnimationFrame(Xe),Q(),x(`ui:click`,{})}function Qe(e={}){j&&(e&&e.noRelock&&(L=!1),J(),X(),j=!1,S.classList.remove(`open`),S.classList.remove(`paused`),window.removeEventListener(`keydown`,qe,!0),window.removeEventListener(`keyup`,Je,!0),R&&=(cancelAnimationFrame(R),0),_.setEnabled(!0),L&&b()&&_.requestLock(),Q(),x(`ui:click`,{}))}S.addEventListener(`mousedown`,e=>e.stopPropagation()),v(S,`.cot-set-close`).addEventListener(`click`,()=>$.close()),be.addEventListener(`click`,()=>$.close()),ye.addEventListener(`click`,()=>{!me||!pe()||(L=!1,Qe(),me())}),ve.addEventListener(`click`,()=>{if(J(),X(),N===`graphics`){o()===`mobile`?c(`mobile`):a(`auto`),q();return}if(N===`sound`){_.setSetting(`volMaster`,.8);for(let e of[`volEngine`,`volCombat`,`volAmbience`,`volUi`,`volVoice`])_.setSetting(e,1);_.setSetting(`alarmHeartbeat`,!0),K(),q(),x(`ui:click`,{});return}_.resetBindings(),V()});for(let e of S.querySelectorAll(`.cot-set-tab`))e.addEventListener(`click`,()=>{let t=e.dataset.tab;(t===`controls`||t===`gameplay`||t===`sound`||t===`graphics`||t===`language`)&&(N=t),q(),x(`ui:click`,{})});m.registerMenuAction!==!1&&_.onAction(`settingsMenu`,()=>{!j&&!Te()&&!te()&&Z()});let $e=()=>ie({pointerLocked:!!document.pointerLockElement,settingsOpen:j,battleActive:b(),replayActive:Te(),activeElement:document.activeElement});document.addEventListener(`pointerlockchange`,()=>{$e()&&setTimeout(()=>{$e()&&(document.hasFocus()&&!document.hidden?Z():Se())},0)}),window.addEventListener(`focus`,()=>{!j&&b()&&!_.isLocked()&&!Te()&&ie({battleActive:!0,activeElement:document.activeElement})&&Se()});function Q(){D.style.display=!j&&he()?`flex`:`none`,b()||A(),Ze()}D.addEventListener(`click`,()=>{j||Z()}),y&&(y.on(`phase:change`,e=>{Q(),(typeof e==`object`&&e&&`phase`in e?Reflect.get(e,`phase`):void 0)!==`battle`&&A(),M=!1}),y.on(`ui:battleStart`,Q),y.on(`killcam:begin`,()=>{M=!0,A(),j&&(L=!1,Qe())}),y.on(`killcam:done`,()=>{M=!1,Ce=we()})),setInterval(Q,150),Q();function et(e,t){return`<span class="hg">${t.map(e=>`<kbd>${B(e)}</kbd>`).join(``)}<span>${e}</span></span>`}function tt(){Ee&&=(clearTimeout(Ee),null),De&&=(clearTimeout(De),null),O.style.display=`none`}function nt(){tt(),O.innerHTML=fe(_.getSettings().rmbMode).map(([e,t])=>et(e,t)).join(``),O.style.display=`flex`,O.style.opacity=`1`,Ee=setTimeout(()=>{O.style.opacity=`0`,De=setTimeout(()=>{O.style.display=`none`},1300)},8e3)}let $={root:S,gear:D,open:Z,close:Qe,toggle(){j?Qe():Z()},isOpen:()=>j,showHints:nt};return ke(),K(),Ie(),Re(),$}export{fe as battleControlHintGroups,y as createSettings};