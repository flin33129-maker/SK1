import{B as e,Cr as t,Ct as n,O as r,Pn as i,Sr as a,St as o,Vn as s,Xn as c,Xt as l,c as u,ft as d,h as f,kt as p,m,pt as h,q as g,s as _,u as v,wr as y,yt as b}from"./three.core-3Slefer1.js";import{i as x}from"./frameScheduler-C8z9S5wp.js";import{y as S}from"./quality-DkBoKjcL.js";import{n as C}from"./resourceLifetime-B74VSV-8.js";import{a as w,i as T,r as E}from"./assaultLines-7Y_hBW6J.js";import{a as D,i as O,n as k,o as A,r as ee,t as j}from"./shoreline-Dv_l_pkP.js";var M=new WeakMap;function N(e,t){M.set(e,t)}function P(e,t,n){let r=M.get(e),i=e.geometry,a=i.index;if(!r||!a||Array.isArray(e.material)||i.groups.length)throw Error(`Expected private unbound Autumn horizon`);let o=2*287*6;if(i.attributes.position.count!==2880||a.count!==15498)throw Error(`Expected original Autumn horizon topology`);for(let e=0;e<o;e+=3){let t=a.getX(e+1);a.setX(e+1,a.getX(e+2)),a.setX(e+2,t)}a.needsUpdate=!0,i.addGroup(0,o,1),i.addGroup(o,a.count-o,0),e.material=[e.material,t],e.receiveShadow=!0;for(let e of n)r.includes(e)||r.push(e);M.delete(e)}var F=Object.freeze([200,430]);function I(e,t=2){let n=F[0]*(t===0?1.1:.9),r=F[1]*(t<=1?1.1:.9);return e<n?0:e<r?1:2}function L(e){return e<F[0]?[0]:e<F[1]?[1]:[2]}function te(e,t,n,r,i){if(i){if(e.index>=0&&e.urgent&&r>=e.distanceM)return e}else if(e.urgent||e.index>=0&&r>=e.distanceM)return e;return{index:t,level:n,distanceM:r,urgent:i}}function ne(e,t,n){return e===2&&t<F[1]+125?1:e===1&&t<F[0]+125?0:e<2&&!n[2]?2:null}function re(e,t,n,r=null){let i={index:-1,level:2,distanceM:1/0,urgent:!1};for(let r=0;r<e.length;r++){let a=e[r],o=Math.hypot(t-a.cx,n-a.cz),s=I(o,a.level),c=a.present||a.lods;if(!c)continue;if(!c[s]){i=te(i,r,s,o,!0);continue}if(i.urgent)continue;let l=ne(s,o,c);l!==null&&!c[l]&&(i=te(i,r,l,o,!1))}if(i.index<0)return null;let a=r||{};return a.index=i.index,a.level=i.level,a.distanceM=i.distanceM,a.urgent=i.urgent,a}var ie=.5*(Math.sqrt(3)-1),R=(3-Math.sqrt(3))/6,ae=1/3,z=1/6,B=(Math.sqrt(5)-1)/4,V=(5-Math.sqrt(5))/20,H=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),oe=new Float64Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),se=new Uint8Array([0,1,2,3,0,1,3,2,0,0,0,0,0,2,3,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,0,2,1,3,0,0,0,0,0,3,1,2,0,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,3,0,0,0,0,1,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,1,2,3,1,0,1,0,2,3,1,0,3,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,3,1,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1,2,3,0,2,1,0,0,0,0,3,1,2,0,2,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,3,1,0,2,0,0,0,0,3,2,0,1,3,2,1,0]);function ce(e,t,n){return e>t?n:0}function le(e,t){return+(e>=t)}function ue(e,t,n,r,i){let a=.6-e*e-t*t-n*n-r*r;return a<0?0:(a*=a,a*a*(oe[i]*e+oe[i+1]*t+oe[i+2]*n+oe[i+3]*r))}var de=class{_perm;_pm12;_pm32;constructor(e=Math){let t=new Int32Array(256);for(let n=0;n<256;n++)t[n]=Math.floor(e.random()*256);let n=new Int32Array(512),r=new Int32Array(512),i=new Int32Array(512);for(let e=0;e<512;e++){let a=t[e&255];n[e]=a,r[e]=a%12,i[e]=a%32}this._perm=n,this._pm12=r,this._pm32=i}noise(e,t){let n=this._perm,r=this._pm12,i,a,o,s=(e+t)*ie,c=Math.floor(e+s),l=Math.floor(t+s),u=(c+l)*R,d=c-u,f=l-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+R,v=m-g+R,y=p-1+2*R,b=m-1+2*R,x=c&255,S=l&255,C=r[x+n[S]]*3,w=r[x+h+n[S+g]]*3,T=r[x+1+n[S+1]]*3,E=.5-p*p-m*m;E<0?i=0:(E*=E,i=E*E*(H[C]*p+H[C+1]*m));let D=.5-_*_-v*v;D<0?a=0:(D*=D,a=D*D*(H[w]*_+H[w+1]*v));let O=.5-y*y-b*b;return O<0?o=0:(O*=O,o=O*O*(H[T]*y+H[T+1]*b)),70*(i+a+o)}noise3d(e,t,n){let r=this._perm,i=this._pm12,a,o,s,c,l=(e+t+n)*ae,u=Math.floor(e+l),d=Math.floor(t+l),f=Math.floor(n+l),p=(u+d+f)*z,m=u-p,h=d-p,g=f-p,_=e-m,v=t-h,y=n-g,b,x,S,C,w,T;_>=v?v>=y?(b=1,x=0,S=0,C=1,w=1,T=0):_>=y?(b=1,x=0,S=0,C=1,w=0,T=1):(b=0,x=0,S=1,C=1,w=0,T=1):v<y?(b=0,x=0,S=1,C=0,w=1,T=1):_<y?(b=0,x=1,S=0,C=0,w=1,T=1):(b=0,x=1,S=0,C=1,w=1,T=0);let E=_-b+z,D=v-x+z,O=y-S+z,k=_-C+2*z,A=v-w+2*z,ee=y-T+2*z,j=_-1+3*z,M=v-1+3*z,N=y-1+3*z,P=u&255,F=d&255,I=f&255,L=i[P+r[F+r[I]]]*3,te=i[P+b+r[F+x+r[I+S]]]*3,ne=i[P+C+r[F+w+r[I+T]]]*3,re=i[P+1+r[F+1+r[I+1]]]*3,ie=.6-_*_-v*v-y*y;ie<0?a=0:(ie*=ie,a=ie*ie*(H[L]*_+H[L+1]*v+H[L+2]*y));let R=.6-E*E-D*D-O*O;R<0?o=0:(R*=R,o=R*R*(H[te]*E+H[te+1]*D+H[te+2]*O));let B=.6-k*k-A*A-ee*ee;B<0?s=0:(B*=B,s=B*B*(H[ne]*k+H[ne+1]*A+H[ne+2]*ee));let V=.6-j*j-M*M-N*N;return V<0?c=0:(V*=V,c=V*V*(H[re]*j+H[re+1]*M+H[re+2]*N)),32*(a+o+s+c)}noise4d(e,t,n,r){let i=this._perm,a=this._pm32,o,s,c,l,u,d=(e+t+n+r)*B,f=Math.floor(e+d),p=Math.floor(t+d),m=Math.floor(n+d),h=Math.floor(r+d),g=(f+p+m+h)*V,_=f-g,v=p-g,y=m-g,b=h-g,x=e-_,S=t-v,C=n-y,w=r-b,T=(ce(x,S,32)+ce(x,C,16)+ce(S,C,8)+ce(x,w,4)+ce(S,w,2)+ce(C,w,1))*4,E=se[T],D=se[T+1],O=se[T+2],k=se[T+3],A=le(E,3),ee=le(D,3),j=le(O,3),M=le(k,3),N=le(E,2),P=le(D,2),F=le(O,2),I=le(k,2),L=le(E,1),te=le(D,1),ne=le(O,1),re=le(k,1),ie=x-A+V,R=S-ee+V,ae=C-j+V,z=w-M+V,H=x-N+2*V,oe=S-P+2*V,de=C-F+2*V,fe=w-I+2*V,pe=x-L+3*V,me=S-te+3*V,he=C-ne+3*V,ge=w-re+3*V,_e=x-1+4*V,ve=S-1+4*V,ye=C-1+4*V,be=w-1+4*V,xe=f&255,Se=p&255,Ce=m&255,we=h&255,Te=a[xe+i[Se+i[Ce+i[we]]]]*4,Ee=a[xe+A+i[Se+ee+i[Ce+j+i[we+M]]]]*4,De=a[xe+N+i[Se+P+i[Ce+F+i[we+I]]]]*4,Oe=a[xe+L+i[Se+te+i[Ce+ne+i[we+re]]]]*4,ke=a[xe+1+i[Se+1+i[Ce+1+i[we+1]]]]*4;return o=ue(x,S,C,w,Te),s=ue(ie,R,ae,z,Ee),c=ue(H,oe,de,fe,De),l=ue(pe,me,he,ge,Oe),u=ue(_e,ve,ye,be,ke),27*(o+s+c+l+u)}};function fe(e,t,n,{roughInAlpha:r=!1,roughMul:i=1,tint:a=null,desat:o=0,lift:s=0}={}){let c=e,l=t,u=r?n:null,d=a?a[0]:1,f=a?a[1]:1,p=a?a[2]:1;for(let e=0;e<c.length;e+=4){let t=l?l[e]/255:1,n=c[e]*t*d,a=c[e+1]*t*f,m=c[e+2]*t*p;if(o>0){let e=n*.299+a*.587+m*.114;n+=(e-n)*o,a+=(e-a)*o,m+=(e-m)*o}s>0&&(n+=s*255,a+=s*255,m+=s*255),c[e]=Math.min(255,n),c[e+1]=Math.min(255,a),c[e+2]=Math.min(255,m),c[e+3]=r?Math.max(8,Math.min(255,(u?u[e]:230)*i)):255}}function pe(e,t,n,r=1){let i=e,a=t,o=n;for(let e=0;e<i.length;e+=4)i[e]=a?a[e]:255,i[e+1]=Math.max(8,Math.min(255,(o?o[e]:230)*r)),i[e+2]=0,i[e+3]=255}var me=`sourced-texture-composition-v1`,he=1024;function ge(e){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Expected protocol object`);return e}function _e(e,t,n=t){if(Object.keys(e).some(e=>!t.includes(e))||n.some(t=>!Object.hasOwn(e,t)))throw Error(`Unexpected protocol fields`)}function ve(e){if(e.protocol!==`sourced-texture-composition-v1`)throw Error(`Wrong composition protocol`);if(typeof e.requestId!=`number`||!Number.isSafeInteger(e.requestId)||e.requestId<=0)throw Error(`Invalid composition requestId`);if(typeof e.key!=`string`||e.key.length===0||e.key.length>1024)throw Error(`Invalid composition key`)}function ye(e){if(typeof e!=`number`||!Number.isInteger(e)||e<=0||e>he)throw Error(`Invalid composition size`)}function be(e,t){let n=t*t*4;if(!(e instanceof Uint8ClampedArray)||!(e.buffer instanceof ArrayBuffer)||e.byteOffset!==0||e.byteLength!==n||e.buffer.byteLength!==n)throw Error(`Invalid composition RGBA buffer`)}function xe(e,t){let n=ge(e);if(ve(n),n.requestId!==t.requestId||n.key!==t.key)throw Error(`Wrong composition reply identity`);if(n.type===`error`){if(_e(n,[`type`,`protocol`,`requestId`,`key`,`error`]),typeof n.error!=`string`||n.error.length===0||n.error.length>2048)throw Error(`Invalid worker error`);return n}if(_e(n,[`type`,`protocol`,`requestId`,`key`,`size`,`albedo`,`surface`,`closedBitmaps`]),n.type!==`complete`||n.size!==t.size)throw Error(`Wrong composition output contract`);if(ye(n.size),be(n.albedo,n.size),t.includeSurface){if(be(n.surface,n.size),n.surface.buffer===n.albedo.buffer)throw Error(`Aliased composition outputs`)}else if(n.surface!==null)throw Error(`Unexpected surface output`);if(!Number.isInteger(n.closedBitmaps)||n.closedBitmaps!==t.closedBitmaps||t.closedBitmaps<1||t.closedBitmaps>3)throw Error(`Incomplete bitmap cleanup`);return n}function Se(e){if(!e||typeof e!=`object`)return!1;let t=e;return t.type===`ready`&&t.protocol===`sourced-texture-composition-v1`&&Object.keys(t).length===2}function Ce(e){return{roughInAlpha:e.roughInAlpha??!1,separateSurface:e.separateSurface??!1,roughMul:e.roughMul??1,tint:e.tint?[e.tint[0],e.tint[1],e.tint[2]]:null,desat:e.desat??0,lift:e.lift??0}}function we(e){return{color:e.images.color,ao:!e.options.separateSurface||e.includeSurface?e.images.ao:null,rough:e.options.roughInAlpha||e.includeSurface?e.images.rough:null}}function Te(e,{timeoutMs:t=5e3,idleMs:n=5e3,maxPending:r=8}={}){if(![t,n,r].every(e=>Number.isFinite(e)&&e>0)||!Number.isInteger(r))throw Error(`Invalid sourced composition limits`);let i=[],a=new Map,o=new WeakMap,s=0,c=0,l=null,u=!1,d=!1,f=null,p=null,m=0;function h(){m++,p?.(),p=null}function g(){h();let e=l;if(l=null,u=!1,e){e.onmessage=e.onerror=e.onmessageerror=null;try{e.terminate()}catch{}}}function _(e){for(let t of e.bitmaps)try{t.close()}catch{}e.bitmaps.clear()}function v(e,t){if(!e.finished){e.finished=!0,e.cancelTimer(),_(e),a.get(e.key)===e&&a.delete(e.key);for(let n of e.consumers)n.detach(),n.resolve(t);e.consumers.clear()}}function y(){d=!0,g();let e=f;f=null,e&&v(e,null);for(let e of i.splice(0))v(e,null)}function b(e,t){f!==e||e.finished||(f=null,v(e,t),D())}function x(e,t){if(l!==e||d)return;if(Se(t)){if(u){y();return}u=!0,D();return}let n=f;if(!n?.posted){y();return}try{let e=xe(t,{requestId:n.requestId,key:n.key,size:n.input.size,includeSurface:n.input.includeSurface,closedBitmaps:Object.values(we(n.input)).filter(Boolean).length});e.type===`error`&&g(),b(n,e.type===`complete`?e:null)}catch{y()}}function S(){if(l)return!0;let t=e.createWorker();return t?(l=t,t.onmessage=e=>x(t,e.data),t.onerror=t.onmessageerror=()=>{l===t&&y()},!0):!1}async function C(t,n){if(!n)return null;try{let r=await e.createBitmap(n);return t.finished?(r.close(),null):(t.bitmaps.add(r),r)}catch{return null}}function w(e){return e.finished||f!==e?!1:e.consumers.size?!0:(b(e,null),!1)}async function T(t){t.preparing=!0;let n=we(t.input),r={color:null,ao:null,rough:null};for(let i of[`color`,`ao`,`rough`])if(n[i]){if(!w(t)||(await e.yieldPreparation?.(),!w(t)))return;r[i]=await C(t,n[i])}if(t.finished||f!==t)return;let{color:i,ao:a,rough:o}=r;if(!i||n.ao&&!a||n.rough&&!o||!t.consumers.size){b(t,null);return}let s=[...t.bitmaps],c={type:`compose`,protocol:me,requestId:t.requestId,key:t.key,size:t.input.size,options:t.input.options,includeSurface:t.input.includeSurface,bitmaps:{color:i,ao:a,rough:o}};try{t.posted=!0,l.postMessage(c,s),t.bitmaps.clear()}catch{y()}}function E(){let t=l,r=++m;p=e.schedule(()=>{r===m&&l===t&&!f&&g()},n)}function D(){if(!d)try{if(!f){if(!i.length){E();return}f=i.shift()}if(!S()){y();return}u&&!f.preparing&&T(f).catch(y)}catch{y()}}function O(e){if(!e||typeof e.key!=`string`||!e.key.length||e.key.length>512||!Number.isInteger(e.size)||e.size<1||e.size>1024||typeof e.includeSurface!=`boolean`||!e.images?.color||typeof e.images.color!=`object`)throw Error(`Invalid sourced composition input`);let t={...e,options:Ce(e.options),images:{...e.images}},n=Object.values(we(t)).map(e=>e?(o.has(e)||o.set(e,++s),o.get(e)):null);return{input:t,key:JSON.stringify([e.key,e.size,t.options,e.includeSurface,n])}}function k(e,t){return new Promise(n=>{let r=()=>{if(e.consumers.delete(o),o.detach(),n(null),e.consumers.size)return;if(a.get(e.key)===e&&a.delete(e.key),f===e){e.preparing||b(e,null);return}let t=i.indexOf(e);t>=0&&i.splice(t,1),v(e,null)},o={resolve:n,detach:()=>t?.removeEventListener(`abort`,r)};e.consumers.add(o),t?.addEventListener(`abort`,r,{once:!0}),t?.aborted&&r()})}function A(n,o){if(d||o?.aborted)return Promise.resolve(null);let s;try{s=O(n)}catch{return Promise.resolve(null)}let l=a.get(s.key);if(l)return k(l,o);if(i.length+Number(!!f)>=r)return Promise.resolve(null);h();let u={requestId:++c,key:s.key,input:s.input,consumers:new Set,cancelTimer:()=>{},bitmaps:new Set,preparing:!1,posted:!1,finished:!1},p=k(u,o);if(u.finished)return p;try{u.cancelTimer=e.schedule(y,t)}catch{return v(u,null),y(),p}return a.set(u.key,u),i.push(u),D(),p}return{compose:A,available:()=>!d,dispose:y}}var Ee=null;function De(){let e=new Worker(new URL(``+new URL(`sourcedTextureCompositionWorker-B2oIpsXn.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),t={onmessage:null,onerror:null,onmessageerror:null,postMessage:(t,n)=>e.postMessage(t,n),terminate(){e.onmessage=e.onerror=e.onmessageerror=null,e.terminate()}};return e.onmessage=e=>t.onmessage?.({data:e.data}),e.onerror=()=>t.onerror?.(),e.onmessageerror=()=>t.onmessageerror?.(),t}function Oe(){return typeof Worker==`function`&&typeof OffscreenCanvas==`function`&&typeof createImageBitmap==`function`&&typeof ImageData==`function`&&typeof document<`u`&&(!Ee||Ee.available())}function ke(e,t){return Oe()?(Ee??=Te({createWorker:De,createBitmap:e=>createImageBitmap(e),yieldPreparation:x,schedule:(e,t)=>{let n=setTimeout(e,t);return()=>clearTimeout(n)}}),Ee.compose(e,t)):Promise.resolve(null)}var Ae=new WeakMap;function je(e,t){e.dispose();let n=Ae.get(t);n||(n=new c(t),Ae.set(t,n)),e.source=n,e.needsUpdate=!0}function Me(e){return Array.isArray(e)}var Ne=`/textures/terrain`,Pe=`/textures/buildings`,Fe=(e,t)=>({color:`${e}/${t}_1K-JPG_Color.jpg`,normal:`${e}/${t}_1K-JPG_NormalGL.jpg`,rough:`${e}/${t}_1K-JPG_Roughness.jpg`,ao:`${e}/${t}_1K-JPG_AmbientOcclusion.jpg`}),Ie={grass:Fe(Ne,`Grass004`),dryGrass:((e,t)=>({color:`${e}/${t}_diff_1k.jpg`,normal:`${e}/${t}_nor_gl_1k.jpg`,rough:`${e}/${t}_rough_1k.jpg`,ao:`${e}/${t}_ao_1k.jpg`}))(Ne,`withered_grass`),dirt:Fe(Ne,`Ground071`),sand:Fe(Ne,`Ground093C`),snow:Fe(Ne,`Snow010A`),rock:Fe(Ne,`Rock058`),rockWarm:Fe(Ne,`Rock063`),cobble:Fe(Ne,`PavingStones046`),plaster:Fe(Pe,`Plaster007`),roof:Fe(Pe,`RoofingTiles012A`),wood:Fe(Pe,`Planks023A`),brick:Fe(Pe,`Bricks097`)},Le={verdant:{G:{set:`grass`,tint:[.86,.91,.8],roughMul:1.25},D:{set:`dirt`,tint:[.82,.8,.76],roughMul:1.3},R:`rock`,M:null},desert:{G:{set:`sand`,tint:[.88,.845,.78],roughMul:1.2},D:{set:`sand`,tint:[.74,.675,.58],roughMul:1.25},R:null,M:null},winter:{G:{set:`snow`,roughMul:1.15},D:{set:`dirt`,tint:[.74,.73,.72],roughMul:1.3},R:{set:`rock`,tint:[1.52,1.55,1.62],roughMul:1.1},M:null},urban:{G:{set:`grass`,tint:[.92,.92,.88],roughMul:1.25},D:{set:`dirt`,tint:[.78,.77,.75],roughMul:1.3},R:{set:`cobble`,tint:[1,.94,.84],roughMul:1.45},M:null},coastal:{G:{set:`grass`,tint:[.9,.92,.76],roughMul:1.25},D:{set:`sand`,tint:[.92,.87,.76],roughMul:1.25},R:{set:`rock`,tint:[1.06,1.05,1.02],roughMul:1.15},M:null},autumn:{G:{set:`grass`,tint:[1.22,1.04,.68],roughMul:1.25},D:{set:`dirt`,tint:[.84,.78,.7],roughMul:1.3},R:{set:`rock`,tint:[1.02,1,.94],roughMul:1.15},M:null},steppe:{G:{set:`dryGrass`,tint:[.8,.82,.58],roughMul:1.25},D:{set:`dirt`,tint:[.84,.78,.62],roughMul:1.3},R:{set:`rock`,tint:[1.26,1.12,.9],roughMul:1.15},M:null},railyard:{G:{set:`grass`,tint:[.8,.78,.66],roughMul:1.3},D:{set:`dirt`,tint:[.66,.64,.6],roughMul:1.35},R:{set:`cobble`,tint:[.88,.88,.86],roughMul:1.5},M:null},frontier:{G:{set:`grass`,tint:[.96,.94,.76],roughMul:1.28},D:{set:`dirt`,tint:[.8,.75,.64],roughMul:1.3},R:{set:`rock`,tint:[1.02,1,.92],roughMul:1.15},M:null},fjord:{G:{set:`grass`,tint:[.76,.86,.8],roughMul:1.28},D:{set:`dirt`,tint:[.68,.7,.68],roughMul:1.35},R:{set:`rock`,tint:[1.12,1.17,1.22],roughMul:1.15},M:null},delta:{G:{set:`grass`,tint:[.68,.94,.6],roughMul:1.22},D:{set:`dirt`,tint:[.67,.59,.43],roughMul:1.28},R:{set:`rock`,tint:[.88,.94,.78],roughMul:1.18},M:null},badlands:{G:{set:`sand`,tint:[.9,.68,.52],roughMul:1.24},D:{set:`sand`,tint:[.7,.46,.36],roughMul:1.28},R:null,M:null},monsoon:{G:{set:`grass`,tint:[.57,.82,.58],roughMul:1.22},D:{set:`dirt`,tint:[.59,.55,.44],roughMul:1.3},R:{set:`dirt`,tint:[.62,.63,.54],desat:.65,roughMul:1.3},M:null},alpine:{G:{set:`snow`,roughMul:1.15},D:{set:`dirt`,tint:[.7,.7,.71],roughMul:1.32},R:{set:`rock`,tint:[1.48,1.53,1.62],roughMul:1.1},M:null},caldera:{G:{set:`dirt`,tint:[.5,.47,.42],lift:.04,roughMul:1.34},D:{set:`dirt`,tint:[.4,.38,.37],lift:.04,roughMul:1.4},R:{set:`rock`,tint:[.52,.5,.49],lift:.04,roughMul:1.2},M:null},foundry:{G:{set:`grass`,tint:[.66,.65,.56],roughMul:1.32},D:{set:`dirt`,tint:[.52,.51,.48],roughMul:1.38},R:{set:`cobble`,tint:[.76,.77,.76],roughMul:1.52},M:null}};function Re(e,t={}){return t.sourcedPalette?t.sourcedPalette:Object.hasOwn(Le,e)?e:`verdant`}var ze=new Map;function Be(e){return ze.has(e)||ze.set(e,new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`sourced texture missing: ${e}`)),r.src=e})),ze.get(e)}var Ve=null,He=null,Ue=0;function We(e,t){let n=e.getContext(`2d`,t);if(!n)throw Error(`Canvas2D is unavailable for sourced texture composition`);return n}function Ge(e,t){if(!e)return null;if(Ve||(Ve=document.createElement(`canvas`),He=We(Ve,{willReadFrequently:!0})),Ue!==t&&(Ve.width=t,Ve.height=t,Ue=t),!He)throw Error(`Canvas2D readback context was not initialized`);return He.drawImage(e,0,0,t,t),He.getImageData(0,0,t,t).data}function Ke(e,t,n,r){for(e.delete(t),e.set(t,n);e.size>r;){let t=e.keys().next().value;if(t===void 0)break;e.delete(t)}return n}var qe=new Map,Je=new Map,Ye=8,Xe=4;function Ze(e,t={}){let{roughInAlpha:n=!1,separateSurface:r=!1,roughMul:i=1,tint:a=null,desat:o=0,lift:s=0}=t;return`${e}|${+!!n}|${+!!r}|${i}|${a?a.join(`,`):`-`}|${o}|${s}`}function Qe(e,t,n,r={}){let i=Math.min(e.width,S(1024)),a=document.createElement(`canvas`);a.width=a.height=i;let o=We(a,{willReadFrequently:!0});o.drawImage(e,0,0,i,i);let s=o.getImageData(0,0,i,i),c=Ge(t,i),l=r.roughInAlpha?Ge(n,i):null;return fe(s.data,c,l,r),o.putImageData(s,0,0),a}function $e(e,t,n,r=1){let i=Ge(e,n),a=Ge(t,n),o=document.createElement(`canvas`);o.width=o.height=n;let s=We(o),c=s.createImageData(n,n);return pe(c.data,i,a,r),s.putImageData(c,0,0),o}function et(e,t,n){for(let r of qe.values())if(r.surface&&r.setKey===e&&r.size===t&&r.roughMul===n)return r.surface;return null}function tt(e,t,n,r,i){return et(e,r,i)??$e(t,n,r,i)}function nt(e){let t=Math.min(e.width,S(1024)),n=document.createElement(`canvas`);return n.width=n.height=t,We(n).drawImage(e,0,0,t,t),n}function rt(e,t){e.dispose(),e.image=t,e.needsUpdate=!0}async function it(e){let t=Ie[e],n=[],r=e=>Be(e).catch(e=>(n.push(e instanceof Error?e.message:String(e)),null)),[i,a,o,s]=await Promise.all([r(t.color),r(t.normal),t.rough?r(t.rough):null,t.ao?r(t.ao):null]);return{color:i,normal:a,rough:o,ao:s,failures:n}}function at(e,t,n){let{color:r,normal:i,rough:a,ao:o}=t;if(!r||!i)return null;let s=Math.min(r.width,S(1024)),c=!!n.separateSurface,l=Ze(e,{...n,separateSurface:c}),u=qe.get(l);if(!u||u.size!==s){let t=n.roughMul??1;u={setKey:e,roughMul:t,size:s,canvas:Qe(r,c?null:o,a,n),surface:c?tt(e,o,a,s,t):null}}Ke(qe,l,u,Ye);let d=Je.get(e);return(!d||d.size!==s)&&(d={size:s,canvas:nt(i)}),Ke(Je,e,d,Xe),{albedo:u.canvas,normal:d.canvas,surface:u.surface}}function ot(e,t,n){let r=document.createElement(`canvas`);return r.width=r.height=t,We(r,n?{willReadFrequently:!0}:void 0).putImageData(new ImageData(e,t,t),0,0),r}async function st(e,t,n,r){let{color:i,normal:a,ao:o,rough:s}=t;if(r?.aborted||!i||!a)return null;let c=Math.min(i.width,S(1024)),l=n.tint?[n.tint[0],n.tint[1],n.tint[2]]:null,u={...n,tint:l},d=Ze(e,u);if(qe.get(d)?.size===c||!Oe())return at(e,t,u);let f=u.roughMul??1,p=u.separateSurface?et(e,c,f):null;try{let n=await ke({key:e,size:c,options:u,includeSurface:!!u.separateSurface&&!p,images:{color:i,ao:o,rough:s}},r);if(r?.aborted)return null;if(qe.get(d)?.size===c||c!==Math.min(i.width,S(1024)))return at(e,t,u);n&&Ke(qe,d,{setKey:e,roughMul:f,size:c,canvas:ot(n.albedo,c,!0),surface:p??(n.surface?ot(n.surface,c,!1):null)},Ye)}catch{}return r?.aborted?null:at(e,t,u)}async function ct(e,t,n,r={},i=rt){if(r.signal?.aborted)return{applied:!1,failures:[`Source composition canceled`]};let a=await it(e);if(r.signal?.aborted)return{applied:!1,failures:[...a.failures,`Source composition canceled`]};let o={...n,separateSurface:!!t.surface},s=r.worker?await st(e,a,o,r.signal):at(e,a,o);return r.signal?.aborted?{applied:!1,failures:[...a.failures,`Source composition canceled`]}:s?(rt(t.albedo,s.albedo),t.surface&&s.surface&&i(t.surface,s.surface),i(t.normal,s.normal),{applied:!0,failures:a.failures}):{applied:!1,failures:a.failures}}async function lt(e,t,n,r,i={},a=rt){try{let o=await ct(t,n,r,i,a);return o.failures.length&&console.warn(`[sourcedTextures] ${e}: ${o.failures.join(`; `)}`),{target:e,...o}}catch(t){let n=t instanceof Error?t.message:String(t);return console.warn(`[sourcedTextures] ${e}: ${n}`),{target:e,applied:!1,failures:[n]}}}function ut(e,t,n={},r={}){let i=Le[Re(e,n)],a=[];for(let o of[`G`,`D`,`R`,`M`]){let s=i[o],c=t[o];if(!s||!c)continue;let l=typeof s==`string`?{set:s}:s,u=(o===`M`?n.mudRough??1:1)*(l.roughMul??1);a.push(lt(`terrain ${e}/${o}`,l.set,c,{roughInAlpha:!0,roughMul:u,tint:l.tint||null,desat:l.desat??0,lift:l.lift??0},r))}return Promise.all(a)}function dt(e,t,n){let r=new v(e);return r.wrapS=r.wrapT=i,r.anisotropy=t,n&&(r.colorSpace=s),r}function ft(e,t={},{worker:n=!1}={}){let r=Le[Re(e,t)],i=new Map,a=[],o=new AbortController,s={worker:n,signal:o.signal};for(let e of[`G`,`D`,`R`,`M`]){let n=r[e];if(!n)continue;let o=typeof n==`string`?{set:n}:n,s={set:o.set,opts:{roughInAlpha:!0,roughMul:(o.roughMul??1)*(e===`M`?t.mudRough??1:1),tint:o.tint||null,desat:o.desat??0,lift:o.lift??0},images:null,composed:null,created:new WeakSet};i.set(e,s),a.push(it(o.set).then(e=>{s.images=e},()=>{}))}return{ready:Promise.all(a).then(()=>{}),...n?{async prepareLayer(e){let t=i.get(e);if(!(!t?.images||o.signal.aborted))try{let e=await st(t.set,t.images,t.opts,o.signal);o.signal.aborted||(t.composed=e)}catch{}}}:{},tryCreateLayer(e,t){let r=i.get(e);if(!r?.images||o.signal.aborted)return null;let a;try{a=n?r.composed:at(r.set,r.images,r.opts)}catch{return null}if(!a||n&&a.albedo.width!==Math.min(r.images.color.width,S(1024)))return null;let s={albedo:dt(a.albedo,t,!0),normal:dt(a.normal,t,!1)};return r.created.add(s),s},apply(n){let r={},a=[];for(let t of[`G`,`D`,`R`,`M`]){let s=n[t],c=i.get(t);if(!o.signal.aborted&&s&&c?.images&&c.created.has(s)){let n=`terrain ${e}/${t}`,r=c.images.failures;r.length&&console.warn(`[sourcedTextures] ${n}: ${r.join(`; `)}`),a.push({target:n,applied:!0,failures:r})}else s&&(r[t]=s)}return ut(e,r,t,s).then(e=>[...a,...e].sort((e,t)=>`GDRM`.indexOf(e.target.slice(-1))-`GDRM`.indexOf(t.target.slice(-1))))},cancel(){o.abort();for(let e of i.values())e.composed=null}}}var pt={plaster:{tint:[.82,.71,.59],desat:.2},roof:{tint:[.62,.55,.52],desat:.44,lift:.018},wood:{tint:[.64,.54,.43],desat:.18},stone:{tint:[.94,.76,.62],desat:.18}},mt={urban:{plaster:{tint:[.94,.86,.74],desat:.16}},ruinspires:{plaster:{tint:[.72,.62,.52],desat:.22},wood:{tint:[.62,.54,.44],desat:.24}},blackglass:{plaster:{tint:[.67,.59,.5],desat:.24},roof:{tint:[.56,.5,.47],desat:.36},wood:{tint:[.57,.5,.42],desat:.24},stone:{tint:[.72,.58,.47],desat:.16}},skybridge:{plaster:{tint:[.91,.75,.59],desat:.12},roof:{tint:[.72,.58,.5],desat:.22},wood:[.73,.61,.46],stone:[.94,.73,.54]},desert:{plaster:[1.08,.92,.7],wood:[1.05,.95,.8]},winter:{roof:{tint:[.96,1.02,1.14],desat:.62,lift:.1}},coastal:{plaster:[1.04,1.02,.96],wood:{tint:[.82,.83,.84],desat:.3}},autumn:{plaster:[1.02,.97,.88],wood:[.94,.86,.74]},orchard:{plaster:[1.02,.97,.88],wood:[.94,.86,.74],roof:{tint:[.48,.53,.57],desat:.9,lift:.015}},steppe:{plaster:[1.06,1,.86],wood:[1,.92,.78]},railyard:{plaster:{tint:[.84,.83,.8],desat:.25},roof:{tint:[.88,.9,.94],desat:.6,lift:.05},wood:{tint:[.78,.76,.72],desat:.2},stone:{tint:[1.1,.98,.88],desat:.1}},frontier:{plaster:[1,.96,.86],wood:[.92,.84,.7]},fjord:{plaster:[1.03,1.04,1.02],roof:{tint:[.77,.84,.91],desat:.48,lift:.02},wood:{tint:[.72,.76,.78],desat:.38}},delta:{plaster:[1.04,.96,.78],wood:[.8,.7,.53]},badlands:{plaster:[1.08,.79,.58],wood:[.83,.69,.52]},monsoon:{plaster:[.78,.81,.72],wood:[.67,.66,.54]},alpine:{roof:{tint:[.94,1.01,1.14],desat:.68,lift:.11}},caldera:{plaster:{tint:[.65,.53,.42],desat:.26},roof:{tint:[.52,.43,.4],desat:.42},wood:[.57,.47,.36],stone:[.71,.55,.42]},foundry:pt,ironworks:{...pt,stone:{tint:[.8,.75,.7],desat:.34}}};function ht(e,t={}){return t.sourcedPalette??e}function gt(e,t){return Object.hasOwn(mt,e)?mt[e][t]??null:null}function _t(e,t,n={},r={}){let i=ht(t,n),a={plaster:`plaster`,roof:`roof`,wood:`wood`};(t===`urban`||t===`railyard`||t===`foundry`||t===`caldera`||t===`ruinspires`||t===`blackglass`||t===`skybridge`)&&e.stone&&(a.stone=`brick`),(t===`urban`||t===`ruinspires`)&&delete a.roof;let o=[];for(let[n,s]of Object.entries(a)){let a=n,c=e[a];if(!c||!s)continue;let l=gt(i,a),u=l===null?{tint:null}:Me(l)?{tint:l}:l;o.push(lt(`building ${t}/${n}`,s,c,{roughInAlpha:!1,...u},r,je))}return Promise.all(o)}var vt=`
float horizonSurfaceGain = 1.0 + (dA * 0.28 + dB * 0.30) * (1.0 - fixW * 0.8);
{
  // Supported mesa shoulders use smooth normals around y=0.78..0.81 in
  // the captured Titan walls. A steep-cliff-only mask silently excluded them.
  // Keep near-horizontal tops untouched; the existing cap repair also fades us.
  float mesaWallWeight = smoothstep(0.06, 0.18, 1.0 - clamp(hnW0.y, 0.0, 1.0))
    * clamp(uCapFix, 0.0, 1.0) * (1.0 - clamp(horizonMarine, 0.0, 1.0))
    * (1.0 - clamp(fixW, 0.0, 1.0));

  // Approximately 17 m beds, warped and interrupted by the already-sampled
  // surface fields. Never draw a continuous constant-altitude contour line.
  float mesaBedPhase = vHPos.y * 0.37 + dB * 4.6 + dA * 1.7;
  float mesaBedFade = 1.0 - smoothstep(0.35, 1.15, fwidth(mesaBedPhase));
  float mesaBedBreak = smoothstep(0.35, 0.75, 0.5 + dA + dB * 0.45);
  float mesaBedShadow = smoothstep(0.60, 0.96, sin(mesaBedPhase));
  float mesaBedLip = smoothstep(0.68, 0.98, sin(mesaBedPhase + 0.55));

  // Sparse fractured patches, not another periodic axis or a grid. Fade
  // unresolved patch edges as well as beds; the original texture still mips.
  float mesaPatchField = dA - dB * 0.45;
  float mesaPatchFade = 1.0 - smoothstep(0.06, 0.22, fwidth(mesaPatchField));
  float mesaFracture = smoothstep(0.12, 0.29, mesaPatchField)
    * (1.0 - smoothstep(0.12, 0.38, dB));
  float mesaWallGain = 1.0 + dA * 0.08 + dB * 0.10
    + (mesaBedLip * 0.055 - mesaBedShadow * 0.17) * mesaBedBreak * mesaBedFade
    - mesaFracture * 0.10 * mesaPatchFade;
  mesaWallGain = clamp(mesaWallGain, 0.74, 1.14);
  horizonSurfaceGain = mix(horizonSurfaceGain, mesaWallGain, mesaWallWeight);
}
`,yt=Object.freeze({centerX:8,axisSlope:.16,floorHalfWidth:210,mouthHalfWidth:330,flareStart:230,flareEnd:430,floorY:4,floorGrade:.004,westHeight:64,eastHeight:86});function bt(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function xt(e){return yt.centerX+yt.axisSlope*e}function St(e){return yt.floorHalfWidth+(yt.mouthHalfWidth-yt.floorHalfWidth)*bt(yt.flareStart,yt.flareEnd,Math.abs(e))}function Ct(e,t){let n=1-bt(8,82,Math.abs(t-(-207+e*.035))),r=1-bt(8,86,Math.abs(t-(110+Math.abs(e)*.24)));return Math.max(n,r)}function wt(e,t,n){let r=e<0,i=1-bt(180,300,Math.abs(t)),a=n-(i>0?i*(18+12*Math.sin(t*.029+(r?.8:2.5))+6*Math.sin(t*.071+(r?2.1:.3))):0),o=r?bt(0,72-50*i,a)*.28:bt(0,55-37*i,a)*.36,s=r?bt(105-43*i,180-90*i,a)*.72:bt(88-33*i,175-91*i,a)*.64,c=r?yt.westHeight+6*bt(-380,-40,t)-12*bt(170,360,t):yt.eastHeight-2*bt(-280,-40,t)+6*bt(100,380,t),l=1+i*(.035*Math.sin(t*.031)+.018*Math.sin(t*.067));return(o+s)*c*l*(1-Ct(e,t))}function Tt(e,t){let n=yt.floorY+yt.floorGrade*Math.max(-600,Math.min(600,t)),r=e-xt(t),i=Math.abs(r)-St(t);return i<=0?n:n+wt(r,t,i)}function Et(e,t){let n=Math.cos(e),r=Math.sin(e),i=511.5/Math.max(Math.abs(n),Math.abs(r)),a=n*i,o=r*i;return{angle:e,x:a,z:o,height:t.getHeightAt(a,o)}}function Dt(e,t,n){let r=0;for(let i=1;i<8;i++){let a=i/8,o=Et(e.angle+(t.angle-e.angle)*a,n),s=t.x-e.x,c=t.z-e.z,l=((o.x-e.x)*s+(o.z-e.z)*c)/(s*s+c*c);r=Math.max(r,Math.abs(o.height-(e.height+(t.height-e.height)*l)))}return r}function Ot(e,t,n,r=!1){let i=Math.PI*2/t,a=Array.from({length:t},(e,t)=>Et(t*i,n)),o=new Set;if(r)for(let e=0;e<4;e++){let t=Math.PI/4+e*Math.PI/2,r=Math.round(t/i);a[r]=Et(t,n),o.add(r)}for(let e=0;e<3;e++)for(let e=0;e<t;e++){if(o.has(e))continue;let r=a[(e+t-1)%t],s=a[(e+1)%t],c=e===0?{...r,angle:r.angle-Math.PI*2}:r,l=e===t-1?{...s,angle:s.angle+Math.PI*2}:s,u=a[e],d=Math.max(Dt(c,u,n),Dt(u,l,n));if(!(d<=2)){for(let t=-4;t<=4;t++){let r=Et((e+t*.1)*i,n),a=Math.max(Dt(c,r,n),Dt(r,l,n));a<d-1e-6&&(d=a,u=r)}a[e]=u}}for(let r=0;r<t;r++){let i=t+r,o=i*3,s=a[r];e.positions[o]=s.x,e.positions[o+2]=s.z;let c=n.getHeightAt(e.positions[o],e.positions[o+2]);e.positions[o+1]=c,e.heights[i]=c}}function kt(e,t){Ot(e,e.heights.length/e.rows.length,t,!0),e.maxHeight=Math.max(1,...e.heights)}function At(e,t){let n=e.heights.length/e.rows.length;t&&Ot(e,n,t,!0),e.maxHeight=1;for(let r=n;r<e.heights.length;r++){let i=r*3,a=r<n*2;if(a){let t=511.5/Math.max(Math.abs(e.positions[i]),Math.abs(e.positions[i+2]));e.positions[i]*=t,e.positions[i+2]*=t}let o=e.positions[i],s=e.positions[i+2],c=a&&t?t.getHeightAt(o,s):Tt(o,s);e.heights[r]=c,e.positions[i+1]=c,e.maxHeight=Math.max(e.maxHeight,e.heights[r])}}function jt(e,t,n){if(t<0)return;let r=Math.max(0,Math.min(1,(t-10)/32)),i=Math.max(0,Math.min(1,(n-.12)/.48)),a=(1-r*r*(3-2*r))*(1-i*i*(3-2*i));a!==0&&(e.r+=(.74-e.r)*a,e.g+=(.38-e.g)*a,e.b+=(.14-e.b)*a)}function Mt(e,t){let n=e.getContext(`2d`,t);if(!n)throw Error(`Horizon texture canvas requires a 2D context`);return n}function Nt(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function U(e,t,n){return e<t?t:e>n?n:e}function W(e,t,n){let r=U((n-e)/(t-e),0,1);return r*r*(3-2*r)}function Pt(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function Ft(e=null){let t=e?.treelineLayers;return U(typeof t==`number`&&Number.isFinite(t)?Math.round(t):1,1,3)}function It({seed:e=24301,variant:t=0,samples:n=192}={}){let r=Math.max(24,n|0),i=Nt((e^Math.imul((t|0)+1,2654435761))>>>0),a=i()*Math.PI*2,o=i()*Math.PI*2,s=i()*Math.PI*2,c=2+(t+(i()*2|0))%3,l=5+(t*2+(i()*3|0))%4,u=9+(t*3+(i()*4|0))%5,d=new Float32Array(r),f=new Float32Array(r);for(let e=0;e<r;e++){let t=e/r*Math.PI*2;d[e]=U(.61+Math.sin(t*c+a)*.095+Math.sin(t*l+o)*.05+Math.sin(t*u+s)*.022,.44,.77)}for(let e=0;e<2;e++){for(let e=0;e<r;e++)f[e]=d[(e-1+r)%r]*.2+d[e]*.6+d[(e+1)%r]*.2;d.set(f)}return d}var Lt={verdant:`rolling`,desert:`mesa`,winter:`alpine`,urban:`escarpment`},Rt={rolling(e,t,n){let r=t.noise(Math.cos(e)*n.f0+11,Math.sin(e)*n.f0-7)*.5+.5,i=t.noise(Math.cos(e)*n.f1-3,Math.sin(e)*n.f1+9)*.5+.5,a=r**1.4;return n.base+(a*.75+i*.25)*n.amp},alpine(e,t,n){let r=e+t.noise(Math.cos(e)*1.15+55,Math.sin(e)*1.15-41)*.13,i=t.noise(Math.cos(r)*n.f0*.52+21,Math.sin(r)*n.f0*.52-14)*.5+.5,a=t.noise(Math.cos(r)*n.f0*1.18-37,Math.sin(r)*n.f0*1.18+28)*.5+.5,o=t.noise(Math.cos(e)*n.f0*2.65+83,Math.sin(e)*n.f0*2.65-61)*.5+.5,s=.58+W(.18,.86,t.noise(Math.cos(e)*.58+3.1,Math.sin(e)*.58-8.7)*.5+.5)*.5,c=W(.12,.92,i)*.68+W(.18,.88,a)*.24+(o-.5)*.08;return n.base+U(c,.12,1)*s*n.amp},mesa(e,t,n){let r=t.noise(Math.cos(e)*n.f0+41,Math.sin(e)*n.f0-27)*.5+.5,i=t.noise(Math.cos(e)*n.f1*2.3-13,Math.sin(e)*n.f1*2.3+33)*.5+.5,a=r+(t.noise(Math.cos(e)*n.f0*4.6-71,Math.sin(e)*n.f0*4.6+15)*.042+t.noise(Math.cos(e)*n.f0*9.7+133,Math.sin(e)*n.f0*9.7-55)*.018),o=W(.36,.45,a),s=W(.62,.7,a),c=W(.8,.86,i)*(1-s),l=W(.14,.52,a)*.17,u=1+.05*t.noise(Math.cos(e)*9+3,Math.sin(e)*9-8)+.028*t.noise(Math.cos(e)*23-17,Math.sin(e)*23+41);return n.base+(l+o*.45+s*.34+c*.3)*n.amp*u},escarpment(e,t,n){let r=t.noise(Math.cos(e)*n.f0*.7+61,Math.sin(e)*n.f0*.7-47)*.5+.5,i=t.noise(Math.cos(e)*n.f1-9,Math.sin(e)*n.f1+19)*.5+.5,a=W(.3,.62,r);return n.base+(a*.62+i**2.2*.38)*n.amp*.72}};function zt(e,t,n,r,i){let a=new Float32Array(n);for(let r=0;r<8;r++){for(let r=0;r<n;r++){let i=(r-1+n)%n,o=(r+1)%n;a[r]=e[t+i]*.24+e[t+r]*.52+e[t+o]*.24}for(let r=0;r<n;r++)e[t+r]=a[r]}let o=1.35+r.amp*i*.035;for(let r=0;r<3;r++){for(let r=0;r<n;r++){let i=(r-1+n)%n;e[t+r]=U(e[t+r],e[t+i]-o,e[t+i]+o)}for(let r=n-1;r>=0;r--){let i=(r+1)%n;e[t+r]=U(e[t+r],e[t+i]-o,e[t+i]+o)}}}function Bt(e){let t=Math.PI*2,n=NaN,r=NaN,i=NaN;return(a,o,s,c,l)=>(Object.is(a,n)||(n=a,r=Math.cos(a*t),i=Math.sin(a*t)),e.noise3d(r*s*.5+l,i*s*.5-l*.7,o*c+l*1.31))}function Vt(e,t,n,r,i){if(i<=.003)return e;let a=t(n,r,2.2,.6,23)*.45,o=Math.sin(r*46+a)*.5+Math.sin(r*13.5+a*.6+1.7)*.5,s=.55+.45*(t(n,r,1.5,9,311)*.5+.5),c=e*(1+o*i*1.35*s),l=W(.75,.95,Math.sin(r*6.2+a*.4+.6));return c*=1-l*i*.65,c*(1+W(.72,.95,r)*.07-(1-W(.05,.4,r))*.08)}function Ht(e,t,n,r){let{banding:i,treeline:a,grainAmp:o,gullyAmp:s=1}=t,c=a>0?1-W(a*.85,a*1.08,r):0,l=t.mesaSurface?1-c:a>0?0:1,u=1;l!==0&&o!==0&&(u+=(e(n,r,90,100,17)*.05+e(n,r,34,38,5)*.06)*o*l);let d=W(.25,.75,e(n,r*.25,9,1.1,77)*.5+.5),f=1-Math.abs(e(n,r,46,2.6,9)),p=.45+.55*W(.3,.72,e(n,r,31,9.5,118)*.5+.5),m=W(.86,.985,f)*s*(.35+.65*d)*p,h=W(.72,.92,f)*(1-m)*s*d*p;if(u*=1-m*.13+h*.04,l!==0){let t=e(n,r,64,46,205);u*=1+t*.045*(.5+.5*s)*l}return u*=a>0?1+e(n,r,7,3.6,41)*.05:1+e(n,r,7,11,41)*.06,u=Vt(u,e,n,r,i),{luminance:u,belowTree:c,ridge:f,segment:p,gully:m}}function Ut(e,t,n,r){let i=t(n,r,2.6,.7,143)*.35,a=Math.sin(r*34+i)*.55+Math.sin(r*11.5+i*.7+2.1)*.45,o=.55+.45*(t(n,r,1.7,8,517)*.5+.5),s=t(n,r,30,11,653),c=t(n,r,12,4.6,719),l=W(.82,.97,1-Math.abs(t(n,r,40,3.4,787))),u=(1+a*.115*o)*(1+s*.075+c*.1)*(1-l*.16),d=W(.55,.95,a)*o*.5*W(.06,.16,r),f=e.r*u,p=e.g*u,m=e.b*u*.995;return{r:f+(1.06-f)*d,g:p+(1.08-p)*d,b:m+(1.12-m)*d}}function Wt(e,t,n,r,i,a){let o=t.belowTree,s=o*.4,c=e.r*(1-s*1.05),l=e.g*(1-s*.42),u=e.b*(1-s*.95),d=n(r,i,48,40,631),f=n(r,i,20,16,733),p=n(r,i+.01,48,40,631)-n(r,i-.01,48,40,631),m=U(1+(d*.055+f*.08+p*.1)*o,.6,1.5);c*=m,l*=m,u*=m;let h=n(r,i,9,5.5,217)*.5+.5,g=n(r,i,3.4,2.1,305)*.5+.5,_=n(r,i,1.3,.9,419)*.5+.5,v=W(.48,.78,g)*o;c*=1+v*.16,l*=1+v*.1,u*=1-v*.1;let y=W(.53,.82,1-h)*o;c*=1-y*.22,l*=1-y*.12,u*=1-y*.08;let b=(_-.5)*.14*o;c*=1+b,l*=1+b,u*=1+b;let x=W(.53,.82,n(r,i,8,4.6,841)*.5+.5)*o;c*=1+x*.22,l*=1+x*.2,u*=1+x*.06;let S=W(.8,.94,n(r,i,16,4.5,947)*.5+.5)*o*W(a*.35,a*.75,i);return{r:c+(.72-c)*S*.6,g:l+(.72-l)*S*.6,b:u+(.7-u)*S*.6}}function Gt(e,t,n,r,i,a){let o=W(a-.02,a+.09,i+n(r,i,24,24,51)*.05),s=n(r,i,30,17,361)*.5+n(r,i,14,7,409)*.5,c=n(r,i,5.5,3.2,477),l=W(.9,.99,t.ridge),u=W(.5,.8,n(r,i*.4,13,2,533)*.5+.5),d=W(.7,.92,n(r,i,26,6.5,601)*.5+.5)*W(.3,.55,i)*(1-W(.8,.95,i)),f=n(r,i,11,4.8,861),p=W(.3,.62,n(r,i,12,26,997)*.5+.5),m=1.03+s*.26+c*.34+f*.18-t.gully*.1-l*u*t.segment*p*.18,h=m*.98,g=m,_=m*1.04;return h+=(.6-h)*d*.85,g+=(.63-g)*d*.85,_+=(.7-_)*d*.85,{r:e.r+(h-e.r)*o*.94,g:e.g+(g-e.g)*o*.94,b:e.b+(_-e.b)*o*.94}}function Kt(e,t,n,r){let i=Ht(e,t,n,r),a={r:i.luminance*(t.coolRock?.978:1),g:i.luminance*(t.coolRock?.998:.995),b:i.luminance*(t.coolRock?1.022:.975)};return t.coolRock&&(a=Ut(a,e,n,r)),t.treeline>0&&r<t.treeline*1.08&&(a=Wt(a,i,e,n,r,t.treeline)),t.snowline<=1&&(a=Gt(a,i,e,n,r,t.snowline)),a}function qt(e,t,n){let r=0,i=0,a=0;for(let o=0;o<16;o++){let s=Kt(e,t,(o+.5)/16,n);r+=s.r,i+=s.g,a+=s.b}return{r:r/16,g:i/16,b:a/16}}function*Jt(e,t){let{banding:n,treeline:r}=t,a=S(512),o=S(192),s=document.createElement(`canvas`);s.width=a,s.height=o;let c=Mt(s),l=c.createImageData(a,o),u=l.data,d=Bt(e),f=t.coolRock?{...t,coolRock:!1,banding:0}:null;for(let e=0;e<o;e++){let n=1-e/(o-1),r=f?qt(d,f,n):null;for(let i=0;i<a;i++){let o=r??Kt(d,t,i/a,n),s=(e*a+i)*4;u[s]=U(o.r*159,0,255),u[s+1]=U(o.g*159,0,255),u[s+2]=U(o.b*159,0,255),u[s+3]=255}(e&15)==15&&(yield)}c.putImageData(l,0,0);let p=new v(s);return p.wrapS=i,p.wrapT=m,p.anisotropy=r>0?2:n>.003?16:2,p}function*Yt(e){let t=document.createElement(`canvas`);t.width=256,t.height=256;let n=Mt(t),r=n.createImageData(256,256),a=r.data,o=[[8,.5],[24,.32],[64,.18]],s=o.map(([t])=>{let n=new Float32Array(t*t);for(let t=0;t<n.length;t++)n[t]=e();return n}),c=e=>e*e*(3-2*e);for(let e=0;e<256;e++){for(let t=0;t<256;t++){let n=0;for(let r=0;r<o.length;r++){let i=o[r][0],a=o[r][1],l=s[r],u=t/256*i,d=e/256*i,f=Math.floor(u)%i,p=Math.floor(d)%i,m=(f+1)%i,h=(p+1)%i,g=c(u-Math.floor(u)),_=c(d-Math.floor(d)),v=l[p*i+f],y=l[p*i+m],b=l[h*i+f],x=l[h*i+m];n+=(v+(y-v)*g+(b+(x-b)*g-(v+(y-v)*g))*_-.5)*a}let r=U(128+n*255,0,255),i=(e*256+t)*4;a[i]=r,a[i+1]=r,a[i+2]=r,a[i+3]=255}(e&31)==31&&(yield)}n.putImageData(r,0,0);let l=new v(t);return l.wrapS=i,l.wrapT=i,l.anisotropy=2,l}function Xt(e){let t=S(768),n=S(128),r=document.createElement(`canvas`);r.width=t,r.height=n;let a=Mt(r,{willReadFrequently:!0});a.clearRect(0,0,t,n);let o=Math.floor(n/4);for(let n=0;n<4;n++){let r=(3-n)*o,i=r+o-2,s=Math.max(8,o-5),c=It({seed:e,variant:n,samples:192});a.save(),a.beginPath(),a.rect(0,r+1,t,o-2),a.clip(),a.beginPath(),a.moveTo(0,i-c[0]*s);for(let e=1;e<=c.length;e++){let n=e%c.length;a.lineTo(e/c.length*t,i-c[n]*s)}a.lineTo(t,i),a.lineTo(0,i),a.closePath();let l=a.createLinearGradient(0,r+2,0,i);l.addColorStop(0,`rgb(148,164,110)`),l.addColorStop(.52,`rgb(139,156,100)`),l.addColorStop(1,`rgb(112,130,84)`),a.fillStyle=l,a.fill(),a.clip(),a.restore()}let s=a.getImageData(0,0,t,n),c=s.data;for(let e=0;e<c.length;e+=4)c[e+3]<40&&(c[e]=138,c[e+1]=152,c[e+2]=100);a.putImageData(s,0,0);let l=new v(r);return l.wrapS=i,l.wrapT=m,l.anisotropy=2,l}var Zt={default:[{r:428,base:-22,amp:0,f0:6,f1:11,aer:.1,skirt:!0},{r:470,base:26,amp:14,f0:6,f1:11,aer:.1,skirt:!0},{r:585,base:50,amp:52,f0:3.1,f1:6.2,aer:.12},{r:760,base:62,amp:96,f0:2.1,f1:4.6,aer:.24},{r:990,base:84,amp:128,f0:1.5,f1:3.3,aer:.42},{r:1240,base:88,amp:96,f0:1.1,f1:2.4,aer:.6}],rolling:[{r:428,base:-22,amp:0,f0:6,f1:11,aer:.1,skirt:!0},{r:470,base:22,amp:12,f0:6,f1:11,aer:.1,skirt:!0},{r:600,base:32,amp:38,f0:3,f1:6.4,aer:.12},{r:800,base:45,amp:72,f0:2,f1:4.4,aer:.32},{r:1050,base:60,amp:112,f0:1.4,f1:3.1,aer:.54},{r:1330,base:72,amp:120,f0:1,f1:2.2,aer:.72}],escarpment:[{r:428,base:-22,amp:0,f0:6,f1:11,aer:.1,skirt:!0},{r:470,base:24,amp:12,f0:6,f1:11,aer:.1,skirt:!0},{r:600,base:36,amp:44,f0:2.8,f1:6,aer:.14},{r:800,base:50,amp:82,f0:2,f1:4.4,aer:.34},{r:1050,base:66,amp:116,f0:1.4,f1:3.1,aer:.54},{r:1330,base:76,amp:106,f0:1,f1:2.2,aer:.7}],mesa:[{r:428,base:-22,amp:0,f0:6,f1:11,aer:.1,skirt:!0},{r:470,base:26,amp:14,f0:6,f1:11,aer:.1,skirt:!0},{r:585,base:50,amp:52,f0:3.1,f1:6.2,aer:.12},{r:760,base:62,amp:96,f0:2.1,f1:4.6,aer:.24},{r:990,base:84,amp:128,f0:1.5,f1:3.3,aer:.42},{r:1240,base:88,amp:96,f0:1.1,f1:2.4,aer:.6}],alpine:[{r:428,base:-22,amp:0,f0:6,f1:11,aer:.1,skirt:!0},{r:470,base:26,amp:14,f0:6,f1:11,aer:.1,skirt:!0},{r:585,base:50,amp:52,f0:3.1,f1:6.2,aer:.1},{r:650,base:52,amp:64,f0:2.8,f1:5.7,aer:.14},{r:720,base:56,amp:76,f0:2.6,f1:5.2,aer:.18},{r:870,base:66,amp:102,f0:1.9,f1:4,aer:.3},{r:940,base:74,amp:114,f0:1.7,f1:3.6,aer:.36},{r:1040,base:82,amp:128,f0:1.5,f1:3.3,aer:.44},{r:1240,base:88,amp:100,f0:1.1,f1:2.4,aer:.6}]};function Qt(e,t){return Zt[e]||Zt.default}var G=287,$t=512;function en(e,t){if(!t)return 0;let n=Math.PI/2-t.azimuthDeg*Math.PI/180,r=Math.abs(Math.atan2(Math.sin(e-n),Math.cos(e-n))),i=U(t.widthDeg,10,175)*Math.PI/360;return 1-W(i*.58,i,r)}function tn(e,t){if(t)for(let n=0;n<e.heights.length;n++){let r=en(n%G/G*Math.PI*2,t),i=e.heights[n]+(t.level-.04-e.heights[n])*r;e.heights[n]=i,e.positions[n*3+1]=i;let a=Math.floor(n/G)/(e.rows.length-1),o=1+r*a*a*1.6;e.positions[n*3]*=o,e.positions[n*3+2]*=o}}function nn(e,t){return e===9?[-34,22,95,150,200,340,430,540,800]:e===7?[-34,22,95,200,340,540,800]:[-34,22,95,280,520,800]}function rn(e,t,n,r){return e.skirt?e.base+(n.noise(Math.cos(t)*e.f0,Math.sin(t)*e.f0)*.5+.5)*e.amp:r(t,n,e)}function an(e,t,n,r,i){let a=new Float32Array(G*e.length*3),o=new Float32Array(G*e.length),s=nn(e.length,t),c=1;for(let l=0;l<e.length;l++){let u=e[l];for(let e=0;e<G;e++){let t=e/G*Math.PI*2,d=$t/Math.max(Math.abs(Math.cos(t)),Math.abs(Math.sin(t))),f=Math.max(u.r,d+(s[l]??300)),p=Math.cos(t),m=Math.sin(t),h=(l-1)*G+e,g=l>0?a[h*3]*p+a[h*3+2]*m:0,_=r.noise(p*4+l*13,m*4-l*7),v=rn(u,t,r,n)*i,y=Math.max(g+12,f*(1+.03*_)),b=l*G+e;o[b]=v,!u.skirt&&v>c&&(c=v),a[b*3]=Math.cos(t)*y,a[b*3+1]=v,a[b*3+2]=Math.sin(t)*y}if(t===`alpine`&&!u.skirt){let e=l*G;zt(o,e,G,u,i);for(let t=0;t<G;t++)a[(e+t)*3+1]=o[e+t]}}return{rows:e,positions:a,heights:o,maxHeight:c}}function on(e,t,n,r,i){e.push(r.rows[i]);let a=i*G;for(let e=0;e<G;e++){let i=a+e;t.push(r.positions[i*3],r.positions[i*3+1],r.positions[i*3+2]),n.push(r.heights[i])}}function sn(e,t,n){return{r:e.r+(t.r-e.r)*n,base:e.base+(t.base-e.base)*n,amp:e.amp+(t.amp-e.amp)*n,f0:e.f0,f1:e.f1,aer:e.aer+(t.aer-e.aer)*n,interpolated:!0}}function cn(e,t,n,r,i){if(t===0||t===e.rows.length-1)return 0;let a=t*G+n,o=a-G,s=a+G,c=e.positions[a*3]*r+e.positions[a*3+2]*i,l=e.positions[o*3]*r+e.positions[o*3+2]*i,u=e.positions[s*3]*r+e.positions[s*3+2]*i,d=(e.heights[a]-e.heights[o])/(c-l),f=(e.heights[s]-e.heights[a])/(u-c);return d*f>0?2*d*f/(d+f):0}function ln(e,t,n,r,i,a,o,s){let c=a/o,l=Math.sin(c*Math.PI);for(let a=0;a<G;a++){let o=a/G*Math.PI*2,u=Math.cos(o),d=Math.sin(o),f=i*G+a,p=(i+1)*G+a,m=n.heights[f],h=n.heights[p],g=n.positions[f*3]*u+n.positions[f*3+2]*d,_=n.positions[p*3]*u+n.positions[p*3+2]*d-g,v=r.noise(u*9+i*5,d*9),y=g+_*c+v*Math.min(8,_*.08)*l,b=u*y,x=d*y,S=(r.noise(b*.0045+17.1,x*.0045-11.3)*.72+r.noise(b*.012-41,x*.012+23)*.28)*Math.min(_*.06,Math.abs(h-m)*.14+(s===`alpine`?7:s===`mesa`?3:4))*l,C=(y-g)/_,w=m+(h-m)*C;if(s===`alpine`){let e=C*C,t=e*C,r=cn(n,i,a,u,d),o=cn(n,i+1,a,u,d);w=m+(h-m)*(3*e-2*t)+_*(r*(t-2*e+C)+o*(t-e))}w+=S,e.push(b,w,x),t.push(w)}}function un(e,t,n){let r=[],i=[],a=[];for(let o=0;o<e.rows.length;o++){on(r,i,a,e,o);let s=e.rows[o+1];if(!s||s.skirt||e.rows[o].skirt&&t!==`alpine`)continue;let c=t===`alpine`?o===1||o===e.rows.length-2?3:5:o===2?3:2;for(let l=1;l<c;l++)r.push(sn(e.rows[o],s,l/c)),ln(i,a,e,n,o,l,c,t)}return{rows:r,positions:new Float32Array(i),heights:new Float32Array(a),maxHeight:e.maxHeight}}function dn(e,t,n=.64,r=1/0){let{positions:i,heights:a}=e,o=G;for(let s=0;s<2;s++){let c=s===0?2:7,l=s===0?5:9,u=l-1,d=e.rows[l],f=(d.base+d.amp*n)*t,p=d.amp*t*.14,m=s===0?80:90;for(let e=0;e<o;e++){let t=c*o+e,n=u*o+e,d=l*o+e,h=Math.hypot(i[t*3],i[t*3+2]),g=Math.hypot(i[n*3],i[n*3+2]),_=Math.hypot(i[d*3],i[d*3+2]),v=a[d],y=W(f-p,f,v),b=_-m,x=Math.min(v,f,a[t]+(_-h)*r),S=Math.min(b,Math.max(g,h+(x-a[t])/1.2)),C=(S-h)/(_-h),w=a[t]+(x-a[t])*C,T=Math.max(Math.min(w+(x-w)*y,a[t]+(S-h)*1.2),x-(_-S)*r);if(s===0){let n=3*o+e,r=6*o+e,s=7*o+e,c=Math.hypot(i[n*3],i[n*3+2]),l=Math.hypot(i[r*3],i[r*3+2]),u=Math.hypot(i[s*3],i[s*3+2]),d=a[t]+(v-a[t])*(c-h)/(_-h);a[n]=U(a[t]+(T-a[t])*(c-h)/(S-h)+U(a[n]-d,-3,3),T-(S-c)*1.25,a[t]+(c-h)*1.25),i[n*3+1]=a[n];let f=(l-_)/(u-_),p=v+(a[s]-v)*f;a[r]=x+(a[s]-x)*f+U(a[r]-p,-3,3),i[r*3+1]=a[r]}let E=S/g;i[n*3]*=E,i[n*3+2]*=E,a[n]=T,i[n*3+1]=a[n],a[d]=x,i[d*3+1]=a[d]}}}function fn(e,t,n){return n===`mesa`&&e.finiteTableCaps!==!1&&(t===`skybridge`||t===`copper_mesa`||t===`titan_gorge`)}function pn(e,t,n){let r=new Float32Array(e.length*2);for(let i=0;i<e.length;i++){r[i*2]=i%G/G*10;let a=i%G/G*Math.PI*2,o=n?en(a,n)*(1-W(n.level+.04,n.level+1,e[i])):0;r[i*2+1]=o>0?-o:U(e[i]/t,0,1)}return r}function mn(e,t,n){let r=new Float32Array(e);for(let e=0;e<n;e++)for(let e=0;e<t;e++){let t=e*G,n=r.slice(t,t+G);for(let e=0;e<G;e++){let i=(e-1+G)%G,a=(e+1)%G;r[t+e]=n[i]*.27+n[e]*.46+n[a]*.27}}return r}function hn(e,t,n){let r=t.length,i=new Float32Array(r),a=new Float32Array(r),o=new Float32Array(r);for(let r=0;r<e.length;r++)for(let s=0;s<G;s++){let c=r*G+s,l=r*G+(s-1+G)%G,u=r*G+(s+1)%G,d=(t[u]-t[l])/Math.max(1,Math.hypot(n[u*3]-n[l*3],n[u*3+2]-n[l*3+2])),f=r>0?c-G:c,p=r<e.length-1?c+G:c,m=Math.hypot(n[f*3],n[f*3+2]),h=Math.hypot(n[p*3],n[p*3+2]),g=(t[p]-t[f])/(h-m||1);i[c]=U(Math.hypot(d,g)*1.6,0,1),a[c]=d,o[c]=g}return{slope:i,tangent:a,radial:o}}function gn(e,t,n){for(let r=0;r<n;r++)for(let n=0;n<t;n++){let t=n*G,r=e.slope.slice(t,t+G),i=e.tangent.slice(t,t+G),a=e.radial.slice(t,t+G);for(let n=0;n<G;n++){let o=(n-1+G)%G,s=(n+1)%G;e.slope[t+n]=r[o]*.27+r[n]*.46+r[s]*.27,e.tangent[t+n]=i[o]*.27+i[n]*.46+i[s]*.27,e.radial[t+n]=a[o]*.27+a[n]*.46+a[s]*.27}}}function _n(e,t,n){let r=hn(e,mn(t,e.length,3),n);return gn(r,e.length,5),r}function vn(e,t,n,r,i,a,o,s,c){let l=W(.34,.8,o)*(r.skirt?.25:n.rockAmp);if(e.lerp(n.rock,l),n.treeline>0){let t=n.noise.noise(Math.cos(i)*7+3+a*3.1,Math.sin(i)*7+s-a*2.4)*.5+.5,l=(1-W(n.treeline*.55,n.treeline,a))*(1-o*.4)*(.5+.5*t);if(e.lerp(n.forest,U(l,0,1)*(n.style===`alpine`?.32:.6)),!r.skirt){let t=n.noise.noise(Math.cos(i)*3.4+s*1.9+7.3,Math.sin(i)*3.4-s*2.6)*.5+.5,r=.12+a*.42,l=n.snowline<=1?1-W(n.snowline-.06,n.snowline+.02,a):1,u=W(r,r+.14,t)*(1-W(n.treeline*.8,n.treeline*1.02,a))*(1-W(.55,.85,o))*l;n.forestCover&&(n.forestCover[c]=u),e.lerp(n.forest,u*(n.style===`alpine`?.4:.45))}}if(n.banding>.001){let n=W(.3,.7,o);t.setRGB(e.r*1.08,e.g*.89,e.b*.75),e.lerp(t,n*.4)}if(n.snowline<=1){let t=W(n.snowline,n.snowline+.16,a+n.noise.noise(Math.cos(i)*6-9,Math.sin(i)*6+4)*.07),r=1-W(.38,.78,o),s=W(.52,.8,a),c=Math.min(1,r+s*.9),l=U(t*(n.style===`alpine`?.62:.95)+(1-t)*.38,0,1)*c;e.lerp(n.snow,l)}}function yn(e,t,n){let r=e.tangent[t]*Math.sin(n)-e.radial[t]*Math.cos(n),i=-e.tangent[t]*Math.cos(n)-e.radial[t]*Math.sin(n);return[r,i,1/Math.hypot(r,1,i)]}function bn(e,t,n,r,i,a){let[o,s,c]=yn(n.gradients,a,i),[l,u,d]=n.sun,f=(o*l+u+s*d)*c,p=r.skirt?.08:n.style===`alpine`?.1:n.style===`mesa`?.34:.26,m=Math.max(f,0),h=Math.max(-f,0);e.multiplyScalar(1-p*.85+p*1.6*m),e.lerp(t.setRGB(e.r*1.05,e.g,e.b*.92),m*.3),e.lerp(t.setRGB(e.r*.88,e.g*.93,e.b*1.08),h*.35)}function xn(e,t,n,r,i,a){let o=t.noise.noise(Math.cos(r)*5.5+a*.7+i*2.6,Math.sin(r)*5.5-a*.4-i*1.9);e.multiplyScalar(1+o*.045*t.grainAmp);let s=n.aer*t.haze,c=n.skirt?s:s+(1-i)*.07;e.lerp(t.fog,U(c,0,.94))}function Sn(e){let t=new Float32Array(e.heights.length*3),n=new f,r=new f;for(let i=0;i<e.rows.length;i++){let a=e.rows[i];for(let o=0;o<G;o++){let s=o/G*Math.PI*2,c=i*G+o,l=U(e.heights[c]/e.maxHeight,0,1),u=e.gradients.slope[c];if(n.copy(e.base).multiplyScalar(.82+l*.34),vn(n,r,e,a,s,l,u,i,c),e.redrockCanyon&&jt(n,e.heights[c],u),bn(n,r,e,a,s,c),xn(n,e,a,s,l,i),e.seaOpening){let t=en(s,e.seaOpening);if(t>0){let[i,,o]=e.sun,c=Math.max(0,(Math.cos(s)*i+Math.sin(s)*o)/Math.max(.001,Math.hypot(i,o)))**5,l=e.fog.r*.2126+e.fog.g*.7152+e.fog.b*.0722,u=.55+a.aer*.2;r.setHex(e.seaOpening.colorHex??9148309),r.r+=(l*(.92+c*.16)-r.r)*u,r.g+=(l*(.98+c*.04)-r.g)*u,r.b+=(l*(1.04-c*.14)-r.b)*u,r.multiplyScalar(1/(e.style===`alpine`?1.26:1.61)),n.lerp(r,t)}}t[c*3]=n.r,t[c*3+1]=n.g,t[c*3+2]=n.b}}return t}function Cn(e,t){let n=[[1,.4,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1]];for(let r=0;r<t;r++){let t=n[r%n.length];for(let n=0;n<G;n++){let i=r*G+n;e[i*3]=t[0],e[i*3+1]=t[1],e[i*3+2]=t[2]}}}function wn(e){let t=[];for(let n=0;n<e-1;n++)for(let e=0;e<G;e++){let r=n*288+e,i=r+1,a=r+288,o=a+1;t.push(r,a,i,i,a,o)}return t}function Tn(e,t,n){let r=new _(new Float32Array(288*t*3),3);for(let e=0;e<t;e++)for(let t=0;t<=G;t++){let i=t%G,[a,o,s]=yn(n,e*G+i,i/G*Math.PI*2);r.setXYZ(e*288+t,a*s,s,o*s)}e.setAttribute(`normal`,r)}function En(e,t,n){let r=new Float32Array(288*n*t);for(let i=0;i<n;i++){let n=i*G*t,a=i*288*t;r.set(e.subarray(n,n+G*t),a),r.set(e.subarray(n,n+t),a+G*t)}return r}function Dn(e,t,n,r){let i=e.rows.length,a=new u;a.setAttribute(`position`,new _(En(e.positions,3,i),3)),a.setAttribute(`color`,new _(En(t,3,i),3));let o=En(n,2,i);for(let e=0;e<i;e++)o[(e*288+G)*2]=10;return a.setAttribute(`uv`,new _(o,2)),a.setIndex(wn(i)),Tn(a,i,r),a}var On=`#include <map_fragment>
float horizonMarine = clamp(-vMapUv.y, 0.0, 1.0);
float horizonWaterVariation = 0.0;
{
  vec3 hn = normalize(vHNrm);
  vec3 awT = abs(hn);
  awT /= (awT.x + awT.y + awT.z);
  #define HTRIP(s, o) (texture2D(uDetail2, vHPos.xz * (s) + (o)).r * awT.y     + texture2D(uDetail2, vHPos.zy * (s) + (o) + vec2(0.41, 0.07)).r * awT.x     + texture2D(uDetail2, vHPos.xy * (s) + (o) + vec2(0.13, 0.61)).r * awT.z)
  float nB = HTRIP(0.0016, vec2(0.0)) - 0.5;
  float nC = HTRIP(0.0071, vec2(0.29, 0.53)) - 0.5;
  float nD = HTRIP(0.0230, vec2(0.71, 0.19)) - 0.5;
  #undef HTRIP
  float farAtt = 1.0 - smoothstep(700.0, 1400.0, length(vHPos.xz)) * 0.62;
  // Broad stands, crown-sized patches and fine rock share the existing
  // isotropic world fields. Even a horizontal saddle retains radial detail.
  diffuseColor.rgb *= 1.0 + (nB * 0.22 + nC * 0.40 + nD * 0.32)
    * (0.44 + farAtt * 0.56);
  horizonWaterVariation = nC * 0.008 + nB * 0.015;
  float slopeF = 1.0 - clamp(hn.y, 0.0, 1.0);
  float hT = clamp(vHPos.y / max(uMaxH, 1.0), 0.0, 1.0);
  float rockW = smoothstep(0.30, 0.58, slopeF + nB * 0.34 + nC * 0.20 + nD * 0.14)
    * (1.0 - smoothstep(0.55, 0.85, hT) * 0.70) * uSlopeSplat * farAtt;
  vec3 rockCol = diffuseColor.rgb * vec3(0.47, 0.50, 0.58);
  // Broken patches, not constant-altitude bars across successive ranges.
  rockCol *= 1.0 + nC * 0.16 + nD * 0.20;
  diffuseColor.rgb = mix(diffuseColor.rgb, rockCol, rockW * 0.85);
  // Per-fragment forest stands below the treeline: broad stand masses from the
  // 600 m field, opened by the 140 m field, thinning toward the treeline and
  // shed from steep rock, exactly the vertex bake's rules at fragment scale.
  // Per-fragment crest snow above the snowline: noise-broken band edge, held
  // off steep faces, always on the crests; the vertex bake keeps the flat ramp.
  float snowBand = smoothstep(uSnowline, uSnowline + 0.16, hT + nD * 0.07 + nC * 0.05);
  float snowHold = min(1.0, (1.0 - smoothstep(0.38, 0.78, slopeF)) + smoothstep(0.52, 0.80, hT) * 0.9);
  float snowW = snowBand * snowHold * (1.0 - rockW * 0.6) * uSnowFrag;
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * uSnowTint, snowW);
  float standF = smoothstep(0.12 + hT * 0.42, 0.26 + hT * 0.42, 0.5 + nB * 1.1 + nC * 0.7);
  float treeF = 1.0 - smoothstep(uTreeline * 0.80, uTreeline * 1.02, hT + nD * 0.06);
  float forestW = standF * treeF * (1.0 - smoothstep(0.55, 0.85, slopeF)) * (1.0 - rockW * 0.85) * (1.0 - snowW) * uForestFrag;
  diffuseColor.rgb *= mix(vec3(1.0), uForestTint * (0.92 + nD * 0.24), forestW);
  float ndl = dot(hn, uSunDirW);
  float rel = uFragRel * farAtt;
  diffuseColor.rgb *= 1.0 - rel * 0.85 + rel * 1.6 * max(ndl, 0.0);
  diffuseColor.rgb = mix(diffuseColor.rgb,
    diffuseColor.rgb * vec3(0.90, 0.94, 1.07), max(-ndl, 0.0) * 0.32 * farAtt);
}`;function*kn({noise:e,banding:r,snowline:i,treeline:a,grainAmp:o,style:s,seed:c,mapId:l,sun:u,maxHeight:d,retainedTextures:f,base:p,forest:m,snow:h}){let[g,_,v]=u,y=new n({vertexColors:!0,side:2,map:yield*Jt(e,{banding:r,snowline:i,treeline:a,grainAmp:o,gullyAmp:s===`alpine`?.06:s===`mesa`?.14:0,coolRock:s===`alpine`,mesaSurface:s===`mesa`})});y.color.setRGB(1.61,1.61,1.61),s===`alpine`&&y.color.setRGB(1.26,1.26,1.26);{let e=yield*Yt(Nt((c^3383^Pt(l))>>>0));f.push(e);let n=s===`alpine`?.4:0,r=+(s===`alpine`),o=+(s===`alpine`),u=+(s===`mesa`),x=new t(b.clamp(m.r/Math.max(p.r,.001),.25,1.2),b.clamp(m.g/Math.max(p.g,.001),.25,1.2),b.clamp(m.b/Math.max(p.b,.001),.25,1.2)),S=s===`alpine`&&a>0&&a<1.5?.62:0,C=new t(b.clamp(h.r/Math.max(p.r,.001),1,2.2),b.clamp(h.g/Math.max(p.g,.001),1,2.2),b.clamp(h.b/Math.max(p.b,.001),1,2.2)),w=s===`alpine`&&i<=1?.55:0;y.onBeforeCompile=c=>{c.uniforms.uTreeline={value:a},c.uniforms.uForestTint={value:x},c.uniforms.uForestFrag={value:S},c.uniforms.uSnowline={value:i},c.uniforms.uSnowTint={value:C},c.uniforms.uSnowFrag={value:w},c.uniforms.uDetail2={value:e},c.uniforms.uSunDirW={value:new t(g,_,v)},c.uniforms.uFragRel={value:n},c.uniforms.uSlopeSplat={value:r},c.uniforms.uMaxH={value:d*1},c.uniforms.uWallFix={value:o},c.uniforms.uCapFix={value:u},c.vertexShader=c.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vHNrm;
varying vec3 vHPos;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vHNrm = normal;
vHPos = position;`),c.fragmentShader=`uniform sampler2D uDetail2;
uniform float uTreeline;
uniform vec3 uForestTint;
uniform float uForestFrag;
uniform float uSnowline;
uniform vec3 uSnowTint;
uniform float uSnowFrag;
uniform vec3 uSunDirW;
uniform float uFragRel;
uniform float uSlopeSplat;
uniform float uMaxH;
uniform float uWallFix;
uniform float uCapFix;
varying vec3 vHNrm;
varying vec3 vHPos;
`+c.fragmentShader.replace(`#include <map_fragment>`,s===`alpine`?On:`#include <map_fragment>
        float horizonMarine = clamp(-vMapUv.y, 0.0, 1.0);
        float horizonWaterVariation = 0.0;
        {
          vec3 hnW0 = normalize(vHNrm);
          float steepF0 = smoothstep(0.30, 0.60, 1.0 - hnW0.y) * uWallFix;
          float capF0 = smoothstep(0.84, 0.96, hnW0.y) * uCapFix;
          float fixW = max(steepF0, capF0);
          if (fixW > 0.004) {
            // broad smear-free base tone: the same texel at a deep mip
            vec3 mapSmooth = texture2D(map, vMapUv, 4.0).rgb;
            // triplanar world-anchored mottle, two feature scales
            vec3 awF = abs(hnW0);
            awF /= (awF.x + awF.y + awF.z);
            float wA = texture2D(uDetail2, vHPos.zy * 0.0052 + vec2(0.11, 0.71)).r * awF.x
                     + texture2D(uDetail2, vHPos.xy * 0.0052 + vec2(0.53, 0.29)).r * awF.z
                     + texture2D(uDetail2, vHPos.xz * 0.0052).r * awF.y;
            float wB = texture2D(uDetail2, vHPos.zy * 0.0175 + vec2(0.67, 0.13)).r * awF.x
                     + texture2D(uDetail2, vHPos.xy * 0.0175 + vec2(0.23, 0.87)).r * awF.z
                     + texture2D(uDetail2, vHPos.xz * 0.0175 + vec2(0.37, 0.61)).r * awF.y;
            vec3 fixCol = mapSmooth * (1.0 + (wA - 0.5) * 0.46 + (wB - 0.5) * 0.34);
            diffuseColor.rgb = diffuseColor.rgb / max(sampledDiffuseColor.rgb, vec3(1e-3))
              * mix(sampledDiffuseColor.rgb, fixCol, fixW * 0.85);
          }
          // World-space oblique projection has vertical and both horizontal
          // components. It never collapses into the altitude-only streaks of
          // the old annular UV overlay along a grazing ridge flank.
          vec2 terrainUv = vec2(vHPos.x + vHPos.z * 0.37,
            vHPos.y + vHPos.z * 0.81 - vHPos.x * 0.23);
          terrainUv = mix(terrainUv, vHPos.zx * vec2(0.35, 3.0), horizonMarine);
          float dA = texture2D(uDetail2, terrainUv * 0.012).r - 0.5;
          float dB = texture2D(uDetail2, terrainUv * 0.0032 + vec2(0.37, 0.11)).r - 0.5;
          horizonWaterVariation = dA * 0.008 + dB * 0.015;
          // amplitudes sized to SURVIVE the baked haze lerp + scene fog: the
          // wall multiplies this onto an already fog-flattened vertex color,
          // so ±0.1 authored contrast reads as ~±0.04 on screen (still-flat
          // first cut). ±0.29 lands at the crown-mottle read real hills give.
          // r7: the vMapUv-based overlay is itself u-degenerate on grazed
          // walls — fade it where the triplanar fix takes over.
          ${s===`mesa`?vt+`
          diffuseColor.rgb *= horizonSurfaceGain;`:`diffuseColor.rgb *= 1.0 + (dA * 0.28 + dB * 0.30) * (1.0 - fixW * 0.8);`}
          if (uSlopeSplat > 0.001) {
            vec3 hn = normalize(vHNrm);
            float slopeF = 1.0 - clamp(hn.y, 0.0, 1.0);
            // aerial attenuation: the outer ranges stay fog-flattened
            float farAtt = 1.0 - smoothstep(700.0, 1400.0, length(vHPos.xz)) * 0.62;
            // r6 (content_breadth) TRIPLANAR boundary noise. The old fields
            // sampled vHPos.xz only — constant straight DOWN a steep face, so
            // the rock/snow mix varied laterally but never vertically and the
            // whole wall broke into full-height light/dark runnels (the
            // critique's "rain streaks" on the winter massif). Blend the
            // horizontal-plane sample with the two vertical-plane projections
            // by the smooth normal, exactly like the terrain-side steep-slope
            // splat: steep faces now sample laterally-AND-vertically and the
            // boundary breaks into patches down the face. A third ~45 m field
            // (nD) adds the within-face patch scale the two broad fields lack.
            vec3 awT = abs(hn);
            awT /= (awT.x + awT.y + awT.z);
            #define HTRIP(s, o) (texture2D(uDetail2, vHPos.xz * (s) + (o)).r * awT.y \
              + texture2D(uDetail2, vHPos.zy * (s) + (o) + vec2(0.41, 0.07)).r * awT.x \
              + texture2D(uDetail2, vHPos.xy * (s) + (o) + vec2(0.13, 0.61)).r * awT.z)
            float nB = HTRIP(0.0016, vec2(0.0)) - 0.5;
            float nC = HTRIP(0.0071, vec2(0.29, 0.53)) - 0.5;
            float nD = HTRIP(0.0230, vec2(0.71, 0.19)) - 0.5;
            float hT = clamp(vHPos.y / max(uMaxH, 1.0), 0.0, 1.0);
            // rock exposure on steep faces; the highest crests hold snow
            float rockW = smoothstep(0.30, 0.58, slopeF + nB * 0.34 + nC * 0.20 + nD * 0.14)
                        * (1.0 - smoothstep(0.55, 0.85, hT) * 0.70) * uSlopeSplat * farAtt;
            vec3 rockCol = diffuseColor.rgb * vec3(0.47, 0.50, 0.58);
            // constant-altitude strata relief on the exposed rock
            float bedR = sin(vHPos.y * 0.42 + nB * 9.0) * 0.6
                       + sin(vHPos.y * 0.13 + nC * 5.0) * 0.4;
            rockCol *= 1.0 + bedR * 0.16;
            diffuseColor.rgb = mix(diffuseColor.rgb, rockCol, rockW * 0.85);
            // per-fragment N·L relight (smooth normals -> no planar facets)
            float ndl = dot(hn, uSunDirW);
            float rel = uFragRel * farAtt;
            diffuseColor.rgb *= 1.0 - rel * 0.85 + rel * 1.6 * max(ndl, 0.0);
            diffuseColor.rgb = mix(diffuseColor.rgb,
              diffuseColor.rgb * vec3(0.90, 0.94, 1.07), max(-ndl, 0.0) * 0.32 * farAtt);
          }
        }`).replace(`#include <color_fragment>`,`#include <color_fragment>
        // Sea is a sky-reflecting continuation of the bay, not a zero-height
        // forest. Reuse the existing two detail samples as very quiet wave
        // breakup, replacing the degenerate altitude-clamped base texture.
        diffuseColor.rgb = mix(diffuseColor.rgb,
          diffuse * vColor.rgb * (1.0 + horizonWaterVariation), horizonMarine);`)},y.customProgramCacheKey=()=>s===`mesa`?`horizon-ring-mesa-surface-r2`:(s===`alpine`?`horizon-ring-world-surface-r3-`:`horizon-ring-relief-r2-`)+s}return y}function An(e){let t=[],n=-1;for(let r=0;r<=e.length;r++){let i=r<e.length&&e[r].interpolated===!0;if(i&&n<0&&(n=r),i||n<0)continue;let a=r-n+1,o=n>0&&e[n-1].skirt===!0?new Set:a>=5?new Set([1,a-1]):new Set([1,Math.ceil(a/2),a-1]);for(let e of[...o].sort((e,t)=>e-t))e>=1&&e<=a-1&&t.length<20&&t.push(n+e-1);n=-1}return t}function jn({mesh:e,treeline:t,seed:r,mapId:i,noise:a,rows:s,positions:c,maxHeight:l,snowline:d,fog:f,colors:p,layers:m,style:h,sun:g,forestCover:v,seaOpening:y,base:b,forest:x,faceBelts:S}){let C=G;if(t<.14)return;let w=(r^42865^Pt(i))>>>0,T=Xt(w),E=[];for(let e=0;e<s.length;e++)!s[e].skirt&&!s[e].interpolated&&E.push(e);let D=new Int16Array(C),O=0;for(let e=0;e<C;e++){let t=E[0]??0,n=-1/0;for(let r of E){let i=r*C+e,a=Math.hypot(c[i*3],c[i*3+2]),o=(c[i*3+1]-24)/Math.max(1,a);o>n&&(n=o,t=r)}D[e]=t,O+=s[t].r}O/=C;let k=t*l,A=[],ee=[],j=[],M=[],N=0,P=1.5/Math.max(1,T.image.height),F=e=>{let t=e/4+P,n=(e+1)/4-P;return[t,Math.max(t,n)]},I=Math.max(8,Math.round(Math.PI*2*O/96));for(let e=m-1;e>=0;e--){let t=(w+e*3)%4,n=I+e,[r,i]=F(t);for(let o=0;o<=C;o++){let u=o%C,m=D[u],h=s[m],g=m*C+u,_=c[g*3],v=c[g*3+1],b=c[g*3+2],x=v/Math.max(1,l),S=d<=1?1-W(d-.05,d+.02,x):1,w=(1-W(k*.8,k*1.12,v))*S,T=u/C*Math.PI*2,E=a.noise(Math.cos(T)*5.3+m*9+e*7.7,Math.sin(T)*5.3-m*5-e*4.1)*.5+.5,O=a.noise(Math.cos(T)*19.7+m*3.1-e*5.3,Math.sin(T)*19.7+m*11.9+e*8.9)*.5+.5,M=(9+E*7)*(.94+Math.min(h.r,1400)/7e3)*w*(.88+O*.24)*(1-e*.045)*(1-en(T,y)),N=1.001+e*.006,P=3.2+e*.72;A.push(_*N,v-P,b*N,_*N,v-P+M,b*N);let F=Math.min(.94,h.aer*.66+.16+e*.11),I=1.7-e*.08,L=Math.min(1.9,p[g*3]*I),te=Math.min(1.9,p[g*3+1]*I),ne=Math.min(1.9,p[g*3+2]*I);L+=(f.r-L)*F,te+=(f.g-te)*F,ne+=(f.b-ne)*F,ee.push(L,te,ne,L,te,ne);let re=o/C*n+t*.23+e*.41;j.push(re,r,re,i)}for(let e=0;e<C;e++){let t=N+e*2,n=t+1,r=t+2,i=r+1;D[e]===D[(e+1)%C]?M.push(t,r,n,n,r,i):M.push(t,t,t,r,r,r)}N+=288*2}let L=S?An(s):[],[te,ne,re]=g,ie=h===`alpine`?1.22:1.84,R=h===`alpine`?[x.r/Math.max(b.r,.001),x.g/Math.max(b.g,.001),x.b/Math.max(b.b,.001)].map(e=>.15000000000000002+.85*Math.min(1.2,Math.max(.25,e))):[1,1,1],ae=new Float32Array(288),z=new Float32Array(288*3),B=new Float32Array(288),V=0;for(let e=0;e<L.length;e++){let t=L[e],n=s[t],r=.4*(1-W(700,1400,n.r)*.62),i=0;for(let e=0;e<=C;e++){let o=e%C,s=t*C+o,u=(t-1)*C+o,d=(t+1)*C+o,f=t*C+(o-1+C)%C,p=t*C+(o+1)%C,m=o/C*Math.PI*2,h=c[d*3+1]-c[u*3+1],g=c[d*3]-c[u*3],_=c[d*3+2]-c[u*3+2],b=h/Math.max(1,Math.hypot(g,_)),x=W(.03,.14,b),S=1-W(.72,1.35,b),w=a.noise(Math.cos(m)*2.7+t*3.1,Math.sin(m)*2.7-t*1.3),T=w>0?d:u,E=Math.min(.5,Math.abs(w)*.7),D=c[s*3+1]+(c[T*3+1]-c[s*3+1])*E;z[e*3]=c[s*3]+(c[T*3]-c[s*3])*E,z[e*3+1]=D,z[e*3+2]=c[s*3+2]+(c[T*3+2]-c[s*3+2])*E;let O=D/Math.max(1,l),k=a.noise(Math.cos(m)*11.5-t*4.3,Math.sin(m)*11.5+t*6.1)*.5+.5,A=x*S*v[s]*(1-en(m,y)),ee=W(.12,.5,A),j=a.noise(Math.cos(m)*21+t*6.3+3.7,Math.sin(m)*21-t*2.9)*.5+.5,M=W(.42,.56,j),N=(13+k*9+j*4)*(.94+Math.min(n.r,1400)/7e3)*ee*M*(.75+A*.25);ae[e]=N,N>i&&(i=N);let P=c[p*3]-c[f*3],F=c[p*3+1]-c[f*3+1],I=c[p*3+2]-c[f*3+2],L=F*_-I*h,R=I*g-P*_,V=P*h-F*g;R<0&&(L=-L,R=-R,V=-V);let H=Math.hypot(L,R,V)||1,oe=(L*te+R*ne+V*re)/H;B[e]=ie*(.94+O*.42)*(1-r*.85+r*1.6*Math.max(oe,0))}if(i<.5)continue;let o=(w+1+V*5)%4,[u,d]=F(o),m=Math.max(8,Math.round(Math.PI*2*n.r/84))+V%3,h=1.0025+(V&1)*.0012,g=Math.min(.94,n.aer*.6+.08);for(let e=0;e<=C;e++){let n=t*C+e%C,r=z[e*3]*h,i=z[e*3+1],a=z[e*3+2]*h;A.push(r,i-2.2,a,r,i-2.2+ae[e],a);let s=B[e],c=Math.min(1.9,p[n*3]*s*.96*R[0]),l=Math.min(1.9,p[n*3+1]*s*1.04*R[1]),_=Math.min(1.9,p[n*3+2]*s*.9*R[2]);c+=(f.r-c)*g,l+=(f.g-l)*g,_+=(f.b-_)*g,ee.push(c,l,_,c,l,_);let v=e/C*m+o*.31+V*.57;j.push(v,u,v,d)}for(let e=0;e<C;e++){let t=N+e*2,n=t+1,r=t+2,i=r+1;M.push(t,r,n,n,r,i)}N+=288*2,V++}let H=new u;H.setAttribute(`position`,new _(new Float32Array(A),3)),H.setAttribute(`color`,new _(new Float32Array(ee),3)),H.setAttribute(`uv`,new _(new Float32Array(j),2)),H.setIndex(M);let oe=new o(H,new n({map:T,vertexColors:!0,alphaTest:.38,alphaToCoverage:!0,side:2}));oe.name=`horizon-treeline`,oe.castShadow=!1,oe.receiveShadow=!1,oe.matrixAutoUpdate=!1,oe.userData.aoExclude=!0,oe.userData.horizonTreeline={layers:m,faceBeltRows:L.length,faceBelts:V,role:`outer-skyline+face-belts`,vertices:A.length/3},e.add(oe)}function Mn(e,t){return e.style||Lt[t]||`rolling`}function Nn(e,t){let n=t===`rolling`?.9:t===`escarpment`?.88:0,r=t===`rolling`?.22:t===`escarpment`||t===`alpine`?.3:.78;return{amp:e.amp??1,haze:e.haze??1,grainAmp:e.grain??1,snowline:e.snowline??(t===`alpine`?.42:2),treeline:e.treeline??n,treelineLayers:Ft(e),banding:e.banding??(t===`mesa`?.16:0),rockAmp:r}}function Pn(e,t,n){let r=n===`mesa`?9067064:6709854;return{base:new f(e.baseHex??5991500),fog:new f(t?.fogTintHex??9413565),rock:new f(e.rockHex??r),snow:new f(e.snowHex??15659767),forest:new f(e.forestHex??4415290)}}function*Fn(e,t,n,r){let i=t?.horizon||{},a=t?.id||`verdant`,s=Mn(i,a),c=Rt[s],{amp:l,haze:u,grainAmp:d,snowline:f,treeline:p,treelineLayers:m,banding:h,rockAmp:g}=Nn(i,s),{base:_,fog:v,rock:y,snow:b,forest:x}=Pn(i,t?.sky,s),S=new de({random:Nt((n^31249^Pt(a))>>>0)}),w=new de({random:Nt((n^13255^Pt(a))>>>0)}),T=an(Qt(s,a),s,c,S,l);yield;let E=un(T,s,S);a===`badlands`&&i.redrockCanyon!==!1&&At(E,r),a===`autumn`&&r&&kt(E,r),fn(i,a,s)&&dn(E,l,a===`titan_gorge`?.6:.64,a===`titan_gorge`?1.25:1/0),tn(E,i.seaOpening);let{rows:D,positions:O,heights:k,maxHeight:A}=E,ee=pn(k,A,i.seaOpening);yield;let j=((t&&t.sky&&t.sky.sunAzimuthDeg)??115)*Math.PI/180,M=((t&&t.sky&&t.sky.sunElevationDeg)??32)*Math.PI/180,P=Math.sin(j)*Math.cos(M),F=Math.sin(M),I=Math.cos(j)*Math.cos(M),L=_n(D,k,O),te=new Float32Array(k.length),ne=Sn({style:s,rows:D,heights:k,maxHeight:A,forestCover:te,base:_,fog:v,rock:y,snow:b,forest:x,snowline:f,treeline:p,banding:h,rockAmp:g,haze:u,grainAmp:d,noise:w,gradients:L,sun:[P,F,I],seaOpening:i.seaOpening,redrockCanyon:a===`badlands`&&i.redrockCanyon!==!1});yield,globalThis.__HORIZON_DEBUG&&Cn(ne,D.length);let re=Dn(E,ne,ee,L);yield;let ie=[],R=new o(re,yield*kn({noise:w,banding:h,snowline:f,treeline:p,grainAmp:d,style:s,seed:n,mapId:a,sun:[P,F,I],maxHeight:A,retainedTextures:ie,base:_,forest:x,snow:b}));return R.name=`horizon-ring`,R.castShadow=!1,R.receiveShadow=!1,R.matrixAutoUpdate=!1,R.userData.aoExclude=!0,C(R,{textures:ie}),a===`autumn`&&N(R,ie),jn({mesh:R,treeline:p,seed:n,mapId:a,noise:w,rows:D,positions:O,maxHeight:A,snowline:f,fog:v,colors:ne,layers:m,style:s,sun:[P,F,I],forestCover:te,seaOpening:i.seaOpening,base:_,forest:x,faceBelts:i.faceBelts===!0}),R}var In=.94,Ln=.01,Rn=.45;function zn(e,t,n=In){let r=t.x-e.x,i=t.z-e.z,a=Math.hypot(r,i);if(a>(e.r+t.r)*n)return!1;let o=Math.atan2(i,r);return a<=(O(e,o)+O(t,o+Math.PI))*n}function Bn(e,t=1.5){let n=[],r=new Uint8Array(e.length);for(let i=0;i<e.length;i++){if(r[i])continue;let a=[i];r[i]=1;for(let n=0;n<a.length;n++)for(let i=0;i<e.length;i++)r[i]||!zn(e[a[n]],e[i],t)||(r[i]=1,a.push(i));n.push(a)}return n}function Vn(e,t){for(let n of Bn(e,1)){let r=1/0,i;for(let a of n){let n=e[a].level;if(!Number.isFinite(t[a]))throw RangeError(`Liquid lake levels must be finite`);if(r=Math.min(r,t[a]),n!==void 0){if(!Number.isFinite(n))throw RangeError(`Authored liquid lake levels must be finite`);if(i!==void 0&&Math.abs(i-n)>1e-9)throw RangeError(`Overlapping liquid lakes require one authored waterline`);i=n}}let a=i??r;for(let e of n)t[e]=a}}function Hn(e){e.sort((e,t)=>e-t);let t=e.length>>1;return e.length%2?e[t]:(e[t-1]+e[t])*.5}function Un(e,t,n,r){let i=0,a=0,o=0,s=[],c=[];for(let l of e){let e=t[l];i+=e.x,a+=e.z,o=Math.max(o,e.r),s.push(r(e.x,e.z)),e.level!==void 0&&c.push(e.level);for(let t of n)zn(e,t)&&c.push(t.level)}if(i/=e.length,a/=e.length,c.length)return[Hn(c),0,0];let l=0,u=0,d=0;for(let n of e){let e=t[n].x-i,r=t[n].z-a;l+=e*e,u+=e*r,d+=r*r}let f=.5*Math.atan2(2*u,l-d),p=Math.cos(f),m=Math.sin(f),h=1/0,g=-1/0,_=0,v=0,y=Hn(s.slice());for(let n=0;n<e.length;n++){let r=t[e[n]],o=(r.x-i)*p+(r.z-a)*m;h=Math.min(h,o),g=Math.max(g,o),_+=o*(s[n]-y),v+=o*o}let b=e.length>=3&&g-h>o*3?Math.max(-.01,Math.min(Ln,_/Math.max(1,v))):0,x=p*b,S=m*b;if(e.length>1)return[y-x*i-S*a,x,S];let C=t[e[0]],w=y;for(let e=0;e<12;e++){let t=e*Math.PI/6,n=O(C,t)*In;w=Math.min(w,r(C.x+Math.cos(t)*n,C.z+Math.sin(t)*n))}return[w-Math.min(.25,Math.max(.08,(C.dip??2.6)*.1)),0,0]}function Wn(e,t,n,r,i){let a=0;for(let o=0;o<12;o++){let s=o*Math.PI/6,c=O(e,s);for(let o of[In,1.32,1.8]){let l=e.x+Math.cos(s)*c*o,u=e.z+Math.sin(s)*c*o;a=Math.max(a,Math.abs(i(l,u)-(t+n*l+r*u)))}}let o=a*2/Rn;return Math.max(1.32,In+o/Math.max(1,j(e)))}function Gn(e,t){let n=new Float64Array(e.length);for(let r=0;r<e.length;r++)n[r]=Wn(e[r],e[r].level,0,0,t);return n}function Kn(e,t,n=[]){let r=new Float64Array(e.length*4);for(let i of Bn(e)){let[a,o,s]=Un(i,e,n,t);for(let n of i){let i=e[n],c=n*4;r[c]=a,r[c+1]=o,r[c+2]=s,r[c+3]=Wn(i,a,o,s,t)}}return r}function qn(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function Jn(e,t,n,r){let i=qn(t,.94,e);if(r&&n>0){let t=qn(1.32,.94,e);i+=(t-i)*n}return i}function Yn(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=0,f=0,p=r&&n!==null;c.wetness=0;for(let r=0;r<e.length;r++){let m=n?n[r]:1.32,h=ee(e[r],i,a,m);if(n&&c.wetness<1&&h<.96&&(c.wetness=Math.max(c.wetness,A(h,!0))),!(h<m))continue;let g=Jn(h,m,s,n!==null);if(!p){o+=(t[r]-o)*g;continue}if(g===1){d+=t[r],f++;continue}if(g===0)continue;let _=g/(1-g);l+=_,u+=t[r]*_}c.height=p?f>0?d/f:(o+u)/(1+l):o}function Xn(e,t,n,r){let i=16/n,a=n*.5,o=Math.max(0,Math.min(15,(e+a)*i|0));return(Math.max(0,Math.min(15,(t+a)*i|0))*16+o)*r}function Zn(e,t,n,r,i,a){let o=0;for(let s=0;s<r;s++){let r=t[n+s];for(;r;){let t=r&-r,n=s*32+31-Math.clz32(t);if(r^=t,o=Math.max(o,D(e[n],i,a,!1)),o===1)return 1}}return o}function Qn(e,t,n){if(e.length<=8)return null;let r=Math.ceil(e.length/32),i=new Uint32Array(256*r),a=n*.5,o=16/n,s=e=>Math.max(0,Math.min(15,Math.floor((e+a)*o)));for(let n=0;n<e.length;n++){let a=e[n],o=a.r*t[n*4+3],c=s(a.x-o),l=s(a.x+o),u=s(a.z-o),d=s(a.z+o);for(let e=u;e<=d;e++)for(let t=c;t<=l;t++)i[(e*16+t)*r+(n>>>5)]|=1<<(n&31)}return i}function $n(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function er(e,t){return e.map(e=>{let n=(e.yawDeg??0)*Math.PI/180,r=Math.cos(n),i=Math.sin(n),a=e.length*.5,o=e.grade??(t(e.x+i*a,e.z+r*a)-t(e.x-i*a,e.z-r*a))/Math.max(1,e.length);return{...e,c:r,s:i,level:e.level??t(e.x,e.z),grade:Math.max(-.01,Math.min(.01,o))}})}function tr(e,t,n){let r=t-e.x,i=n-e.z,a=Math.abs(r*e.c-i*e.s)-e.width*.5,o=Math.abs(r*e.s+i*e.c)-e.length*.5;return Math.hypot(Math.max(0,a),Math.max(0,o))+Math.min(0,Math.max(a,o))}function nr(e,t,n,r,i){let a=Math.abs(e.c)*e.width*.5+Math.abs(e.s)*e.length*.5+i,o=Math.abs(e.s)*e.width*.5+Math.abs(e.c)*e.length*.5+i;return[Math.max(0,Math.floor((e.x-a+r)/t)),Math.min(n-1,Math.ceil((e.x+a+r)/t)),Math.max(0,Math.floor((e.z-o+r)/t)),Math.min(n-1,Math.ceil((e.z+o+r)/t))]}function rr(e,t,n,r,i,a){let o=i/(r-1),s=i*.5,c=o*Math.SQRT2;for(let i of er(e,a)){let[e,a,l,u]=nr(i,o,r,s,14+c);for(let d=l;d<=u;d++)for(let l=e;l<=a;l++){let e=l*o-s,a=d*o-s,u=tr(i,e,a)-c;if(u>=14)continue;let f=d*r+l,p=(e-i.x)*i.s+(a-i.z)*i.c,m=i.level+p*i.grade;n[f]+=(m-n[f])*(1-$n(0,14,u)),t[f]=Math.min(t[f],Math.max(0,u+3.8))}}}function ir(e,t,n,r){let i=r/n,a=r*.5;for(let r of er(e,()=>0)){let[e,o,s,c]=nr(r,i,n,a,2);for(let l=s;l<=c;l++)for(let s=e;s<=o;s++){let e=1-$n(-.75,1.25,tr(r,(s+.5)*i-a,(l+.5)*i-a));if(e<=0)continue;let o=(l*n+s)*4;t[o]=Math.max(t[o],e*255),t[o+1]*=1-e}}}function ar(e){if(!e?.length)return null;let t=new Float64Array(e.length*6);for(let n=0;n<e.length;n++){let r=e[n],i=(r.yawDeg??0)*Math.PI/180;t.set([r.x,r.z,Math.cos(i),Math.sin(i),r.width*.5,r.length*.5],n*6)}return(e,n)=>{for(let r=0;r<t.length;r+=6){let i=e-t[r],a=n-t[r+1],o=Math.max(0,Math.abs(i*t[r+2]-a*t[r+3])-t[r+4]),s=Math.max(0,Math.abs(i*t[r+3]+a*t[r+2])-t[r+5]);if(o*o+s*s<=4)return!0}return!1}}function or(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function sr(e,t,n,r){let i=3.85+t+n,a=Math.max(.55,r),o=1-or(i-a,i+a,e),s=1-or(.25,.95,e+t*.12);return o*(1-.66*Math.min(1,.6/r)*s)}function cr(e,t=1024){return t/Math.max(1,e)<=2.5?2.4:0}function lr(e){return e===`desert`||e===`badlands`?`sand`:e===`winter`||e===`alpine`?`snow`:e===`coastal`?`shore`:`earth`}function ur(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function dr(e,t,n,r,i){if(e===`earth`||t<14)return 0;if(e===`snow`)return n>0?0:3;let a=ur(r,i,n);return a>.02?0:e===`sand`||ur(.02,r,n)*(1-a)>.5?2:0}function fr(e){if(e?.id!==`alpine`&&e?.id!==`reservoir`)return e;let t=e.terrain?.roads;if(!t||t===`country`||!t.paths)return e;let n=t.paths.slice();if(e.id===`alpine`)for(let e=0;e<3;e++)n[e]=n[e].slice(1,-1);else n[0]=n[0].slice(1),n[4]=n[4].slice(3,-2);return{...e,terrain:{...e.terrain,roads:{...t,paths:n}}}}var K=[`boundary`,`boundary`],q=(e,t)=>[{junction:e},{junction:t}],pr={verdant:[K,K],desert:[K,K],winter:[K,K],urban:Array.from({length:8},()=>K),coastal:[K,K,[`boundary`,`shore`],[`boundary`,`shore`]],autumn:[K,K],steppe:[K,K],railyard:Array.from({length:6},()=>K),frontier:[K,K,K,q(0,2)],fjord:[K,K,K,q(0,2),q(0,2)],delta:[[{junction:2,at:[-466.54,-404]},`boundary`],K,K,K,q(2,3)],badlands:[K,K,K,q(0,2),q(0,2)],monsoon:[K,K,K,q(0,2),q(0,2)],alpine:[K,K,K,q(0,2),q(0,2)],caldera:[[`loop`,`loop`],K,K,q(1,2),q(1,2)],foundry:[...Array.from({length:6},()=>K),q(0,2),q(0,2),q(0,2)],ruinspires:Array.from({length:12},()=>K),blackglass:Array.from({length:6},()=>K),titan_gorge:[K,K,K,q(0,2),q(0,1)],skybridge:[K,K,K,q(0,2),q(0,1)],polders:[q(1,3),K,K,K,q(1,3)],copper_mesa:[K,K,K,K,q(1,3)],airfield:[K,K,K,K,q(2,3),q(2,3)],oasis:[K,K,K,q(1,2),q(1,2)],whiteout:[q(1,3),K,K,K,q(1,3)],orchard:[K,K,K,q(1,2),q(1,2)],longleaf:[q(1,3),K,K,K,q(1,3)],mangrove:[K,K,K,q(0,2),q(0,2)],saltwind:[K,K,K,q(0,2),q(0,2)],reservoir:[[`boundary`,{junction:4}],q(0,4),q(0,1),q(0,1),K]};function mr(e,t,n,r){let i=t[0]-e[0],a=t[1]-e[1],o=r[0]-n[0],s=r[1]-n[1],c=n[0]-e[0],l=n[1]-e[1],u=i*s-a*o;if(Math.abs(u)>1e-9){let e=(c*s-l*o)/u,t=(c*a-l*i)/u;return e>=-1e-8&&e<=1.00000001&&t>=-1e-8&&t<=1.00000001?Math.max(0,Math.min(1,e)):null}if(Math.abs(c*a-l*i)>1e-7)return null;let d=i*i+a*a;if(d<1e-12)return null;let f=(c*i+l*a)/d,p=((r[0]-e[0])*i+(r[1]-e[1])*a)/d,m=Math.max(0,Math.min(f,p));return m<=Math.min(1,Math.max(f,p))+1e-8?Math.min(1,m):null}function hr(e,t){let n=Math.max(1,Math.ceil(Math.hypot(t[0]-e[0],t[1]-e[1])/32));return Array.from({length:n},(r,i)=>{let a=i/n;return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a]})}function gr(e,t){let n=e[0],r=e[1],i=n[0]-r[0],a=n[1]-r[1],o=i===0?1/0:((i>0?t:-t)-n[0])/i,s=a===0?1/0:((a>0?t:-t)-n[1])/a,c=Math.min(o,s);if(!Number.isFinite(c)||c<-1e-8)throw Error(`Road boundary bearing must point out of the map`);return[Math.max(-t,Math.min(t,n[0]+i*c)),Math.max(-t,Math.min(t,n[1]+a*c))]}function _r(e,t){for(let n=0;n<e.length-1;n++){let r=1/0;for(let i=0;i<t.length-1;i++){let a=mr(e[n],e[n+1],t[i],t[i+1]);a!==null&&(r=Math.min(r,a))}if(r===1/0)continue;let i=e[n],a=e[n+1],o=[i[0]+(a[0]-i[0])*r,i[1]+(a[1]-i[1])*r];return r===0&&Object.is(o[0],i[0])&&Object.is(o[1],i[1])?e.slice(n):r>.99999999?e.slice(n+1):[o,...e.slice(n+1)]}return null}function vr(e,t,n,r){if(t===`loop`||t===`shore`)return e;if(t===`boundary`)return Math.max(Math.abs(e[0][0]),Math.abs(e[0][1]))>=r-1e-8?e:[...hr(gr(e,r),e[0]),...e];let i=n[t.junction];if(!i)throw Error(`Road junction references a missing route`);if(t.at)return[...hr(t.at,e[0]),...e];let a=_r(e,i);if(a)return a;let o=_r([gr(e,r),...e],i);if(!o)throw Error(`Road bearing does not reach authored junction ${t.junction}`);return[...hr(o[0],e[0]),...e]}function yr(e,t,n=512){let r=pr[e];if(!r)return t;if(t.length!==r.length)throw Error(`${e}: road endpoint intent count does not match routes`);let i=t.map((e,i)=>{let a=r[i][0]===`boundary`?vr(e,`boundary`,t,n):e;return r[i][1]===`boundary`&&(a=vr(a.slice().reverse(),`boundary`,t,n).reverse()),a});return i.map((t,a)=>{let o=vr(t,r[a][0],i,n);if(o=vr(o.slice().reverse(),r[a][1],i,n).reverse(),o.length<2)throw Error(`${e}: road ${a} has no length after junction completion`);return o})}function br(e,t,n,r){let i=t.findIndex(e=>e[0]===n[0]&&e[1]===n[1]);if(i<0)return;let a=r?i+1:i-1;if(a<0||a>=t.length)return;let o=t[a],s=Math.hypot(o[0]-n[0],o[1]-n[1]),c=Math.max(-.12,Math.min(.12,(e[i]-e[a])/s)),l=r?-1:1;for(let r=i+l;r>=0&&r<t.length;r+=l)e[r]=e[i]+c*Math.hypot(t[r][0]-n[0],t[r][1]-n[1])}function xr(e,t,n,r,i){let a=pr[e];if(a)for(let e=0;e<r.length;e++){let o=e+i,s=r[e];a[o][0]!==`loop`&&a[o][0]!==`shore`&&br(n[o],t[o],s[0],!0),a[o][1]!==`loop`&&a[o][1]!==`shore`&&br(n[o],t[o],s[s.length-1],!1)}}function Sr(e){return e===`blackglass`||e===`titan_gorge`||e===`skybridge`}function Cr(e,t,n){let r=1/0,i=n[0];for(let a=1;a<t.length;a++){let o=t[a-1],s=t[a],c=s[0]-o[0],l=s[1]-o[1],u=Math.max(0,Math.min(1,((e[0]-o[0])*c+(e[1]-o[1])*l)/(c*c+l*l))),d=(e[0]-o[0]-u*c)**2+(e[1]-o[1]-u*l)**2;d<r&&(r=d,i=n[a-1]+(n[a]-n[a-1])*u)}return i}function wr(e,t,n){for(let r=0;r<t.length;r++){let i=n[r],a=e[r];n[r]=t[r].map(e=>{let t=a.indexOf(e);return t>=0?i[t]:Cr(e,a,i)})}}function Tr(e,t,n,r){let i=pr[e];if(i)for(let e=0;e<n.length;e++)for(let a=0;a<2;a++){let o=i[e][a],s=n[e],c=a?s.length-1:0;typeof o!=`object`||t[e].includes(s[c])||(r[e][c]=Cr(s[c],n[o.junction],r[o.junction]))}}function Er(e,t,n,r,i){let a=t.findIndex(e=>e[0]===r[0]&&e[1]===r[1]),o=i?a-1:a+1;if(a<0||o<0||o>=t.length)return;let s=t[o],c=Math.hypot(s[0]-r[0],s[1]-r[1]),l=(s[0]-r[0])/c,u=(s[1]-r[1])/c,d=e.sample(r[0],r[1]),f=Math.max(-.12,Math.min(.12,(d-e.sample(r[0]-l*8,r[1]-u*8))/8)),p=e.mapSize/(e.size-1),m=e.mapSize/2;for(let t=0;t<e.elevation.length;t++){if(e.route[t]!==n||(i?e.segment[t]>=a:e.segment[t]<a))continue;let o=t%e.size*p-m,s=Math.floor(t/e.size)*p-m;e.elevation[t]=d+f*((o-r[0])*l+(s-r[1])*u)}}function Dr(e,t,n,r){let i=n?t.length-1:0,a=n?-1:1,o=t[i];if(r(o[0],o[1]))return o;if(e!==`reservoir`)return null;let s=t[i+a];if(!s)return null;let c=s[0]-o[0],l=s[1]-o[1],u=0;for(let e=i+a;e>=0&&e<t.length;e+=a){let n=t[e],i=n[0]-o[0],a=n[1]-o[1],s=i*c+a*l;if(i*l!==a*c||s<=u)return null;if(r(n[0],n[1]))return n;u=s}return null}function Or(e,t,n,r,i,a){let o=pr[e];if(o)for(let s=0;s<n.length;s++){let c=s+r,l=n[s];for(let n=0;n<2;n++){if(o[c][n]!==`boundary`)continue;let r=Dr(e,l,n,a);r&&Er(i,t[c],c,r,!n)}}}function kr(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function Ar(e,t,n){if(e!==`fjord`)return;let r=t[1],i=t[2],a=r.length-1,o=i.length-1;if(r[a][1]!==512||i[o][1]!==512||Math.abs(r[a][0]-i[o][0])>=14)throw Error(`Fjord northern grade ownership changed`);Nr(t,n)}function jr(e,t,n){for(let r of e)if(r[0]===t&&r[1]===n)return!0;return!1}function Mr(e,t,n){if(e!==`copper_mesa`)return;let r=t[1],i=t[2],a=r?.[r.length-1],o=i?.[i.length-1];if(!a||!o||a[1]!==512||o[1]!==512||!jr(r,-72,462)||!jr(i,4,458)||Math.abs(a[0]- -44.47191011235955)>1e-9||Math.abs(o[0]-13.671641791044776)>1e-9)throw Error(`Copper northern grade ownership changed`);Nr(t,n)}function Nr(e,t){let n=e[1],r=e[2],i=t[1],a=t[2],o=n.length-1,s=r.length-1,c=(i[o]-i[o-1])/(n[o][1]-n[o-1][1]),l=(a[s]-a[s-1])/(r[s][1]-r[s-1][1]),u=Math.max(-.12,Math.min(.12,(c+l)*.5)),d=(i[o]+a[s])*.5;for(let n=1;n<=2;n++){let r=e[n],i=t[n];for(let e=0;e<r.length;e++){let t=r[e][1];if(t<=398)continue;let n=d+(t-512)*u;i[e]=t>=430?n:i[e]+(n-i[e])*kr(398,430,t)}}}function Pr(e){return e===`alpine`||e===`reservoir`||e===`monsoon`||e===`blackglass`||e===`titan_gorge`||e===`skybridge`||e===`badlands`}function Fr(e,t){let n=Math.min(Math.max(Math.abs(e[0]),Math.abs(e[1])),Math.max(Math.abs(t[0]),Math.abs(t[1]))),r=t[0]-e[0],i=t[1]-e[1];for(let t=-1;t<=1;t+=2){let a=(t*e[1]-e[0])/(r-t*i);a>0&&a<1&&(n=Math.min(n,Math.max(Math.abs(e[0]+r*a),Math.abs(e[1]+i*a))))}return n}function Ir(e,t,n){return(e[0]!==t[0]||e[1]!==t[1])&&Math.max(Math.abs(e[0]),Math.abs(e[1]))<n}function Lr(e,t,n){let r=e.findIndex(e=>e[0]===t[0]&&e[1]===t[1]);if(r<0)throw Error(`Added boundary approach lost its authored anchor`);let i=n?1:-1,a=1/0;for(let t=r;t+i>=0&&t+i<e.length;t+=i)a=Math.min(a,Fr(e[t],e[t+i]));return a}function Rr(e,t,n,r,i){let a=pr[e];if(!a)return null;let o=i/2,s=e===`alpine`||e===`reservoir`,c=null;for(let e=0;e<n.length;e++)for(let i=0;i<2;i++){if(a[e+r][i]!==`boundary`)continue;let l=n[e],u=t[e+r],d=i?l[l.length-1]:l[0];if(!Ir(d,i?u[u.length-1]:u[0],o))continue;let f=s?Lr(u,d,i)-32:o-82;c=Math.min(c??f,f)}return c}function zr(e,t,n,r,i,a,o,s){let c=n/2,l=n/(t-1),u=r[0]-i[0],d=r[1]-i[1],f=Math.hypot(u,d),p=u/f,m=d/f;if(!f)throw Error(`Degenerate road border corridor`);let h=s?0:6;for(let n=0;n<t;n++)for(let i=0;i<t;i++){let s=i*l-c,u=n*l-c,d=Math.max(Math.abs(s),Math.abs(u));if(d<=o+l)continue;let f=(s-r[0])*p+(u-r[1])*m,g=Math.abs((s-r[0])*m-(u-r[1])*p);if(f<=-32||g>=a)continue;let _=kr(o+l,o+32,d)*kr(-32,16,f)*(1-kr(h,a,g)),v=n*t+i;e[v]=Math.max(e[v],_)}}function Br(e,t,n,r,i,a,o,s){let c=pr[e],l=Rr(e,t,n,r,s);if(l===null)return null;let u=s/2,d=e===`skybridge`?68:64,f=e===`badlands`?64:Math.min(Pr(e)?d:1/0,Math.max(32,6+Math.abs(i)*2.4));for(let i=0;i<n.length;i++)for(let d=0;d<2;d++){if(c[i+r][d]!==`boundary`)continue;let p=n[i],m=t[i+r],h=d?p[p.length-1]:p[0];Ir(h,d?m[m.length-1]:m[0],u)&&zr(a,o,s,h,d?p[p.length-2]:p[1],f,l,e===`skybridge`)}return l}function Vr(e,t,n){let r=0,i=-1;for(;r<n&&(i=t.indexOf(e[r]),!(i>=0));r++);let a=r-1;for(;a+1<n&&t[i+a+1-r]===e[a+1];)a++;for(let r=a+1;r<n;r++)if(t.includes(e[r]))throw Error(`Noncontiguous authored road stations`);return r===0&&a===n-1&&i===0&&t.length===n?null:{count:n,first:r,last:a,offset:i-r}}function Hr(e,t,n=[]){let r=e.map((e,r)=>Vr(e,t[r],n[r]??e.length));return r.some(Boolean)?r:void 0}function Ur(e,t){return e.roadStations?.[t]?.count??e.roads[t].length}function Wr(e,t,n,r=0,i=1){let a=e.roadStations?.[t],o=a?.first??0,s=a?.last??e.roads[t].length-1;return n-r<o||n+i>s?-1:n+(a?.offset??0)}var Gr=3,Kr=10;function qr(e,t,n,r,i){if(!Number.isInteger(n)||n<1||e.length!==n*n*4||t.length!==n*n||e.buffer===t.buffer)throw Error(`Shore dirt requires separate, equally sized mask and scratch buffers`);if(!Number.isFinite(r)||r<=0||!Number.isFinite(i)||i<=0||i>1)throw Error(`Shore dirt requires finite metres and a positive normalized water onset`)}function Jr(e,t,n,r,i){let a=n-r,o=i*Math.SQRT2,s=r>0?0:t-1;for(let c=s;c>=0&&c<t;c+=r){let s=n*t+c,l=c-r,u=e[s];if(l>=0&&l<t&&(u=Math.min(u,e[s-r]+i)),a>=0&&a<t){let n=a*t+c;u=Math.min(u,e[n]+i),c>0&&(u=Math.min(u,e[n-1]+o)),c+1<t&&(u=Math.min(u,e[n+1]+o))}e[s]=u}}function Yr(e,t){for(let n=0;n<t.length;n++){let r=n*4;if(e[r]!==0)continue;let i=Math.max(0,Math.min(1,(t[n]-Gr)/(Kr-Gr))),a=1-i*i*(3-2*i);e[r+3]=Math.max(e[r+3],a*255)}}function Xr(e,t,n,r,i){qr(e,t,n,r,i);let a=Math.ceil(i*255),o=!1;for(let n=0;n<t.length;n++){let r=e[n*4+2]>=a;t[n]=r?0:1/0,o||=r}if(!o)return;let s=r/n;for(let e=0;e<n;e++)Jr(t,n,e,1,s);for(let e=n-1;e>=0;e--)Jr(t,n,e,-1,s);Yr(e,t)}function Zr(e){let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)}function Qr(e){if(e.boundary.length<3||e.boundary.length>24||!Number.isFinite(e.feather)||e.feather<4||e.feather>24||!Number.isFinite(e.strength)||e.strength<=0||e.strength>1)throw Error(`Worked ground requires 3–24 vertices, 4–24m feather and normalized strength`);for(let t=0;t<e.boundary.length;t++){let n=e.boundary[t],r=e.boundary[(t+1)%e.boundary.length];if(!n.every(Number.isFinite)||n[0]===r[0]&&n[1]===r[1])throw Error(`Worked ground boundary requires finite, distinct adjacent vertices`)}}function $r(e,t,n){let r=!1,i=1/0;for(let a=0;a<e.boundary.length;a++){let o=e.boundary[a],s=e.boundary[(a+1)%e.boundary.length],c=s[0]-o[0],l=s[1]-o[1],u=Math.max(0,Math.min(1,((t-o[0])*c+(n-o[1])*l)/(c*c+l*l))),d=t-o[0]-u*c,f=n-o[1]-u*l;i=Math.min(i,d*d+f*f),o[1]>n!=s[1]>n&&t<o[0]+(n-o[1])*c/l&&(r=!r)}return Math.sqrt(i)*(r?-1:1)}function ei(e,t,n,r,i){let a=n/2,o=n/t,s=1/0,c=-1/0,l=1/0,u=-1/0;for(let[e,t]of r.boundary)s=Math.min(s,e),c=Math.max(c,e),l=Math.min(l,t),u=Math.max(u,t);let d=r.feather+3,f=Math.max(0,Math.floor((s-d+a)/o)),p=Math.min(t-1,Math.ceil((c+d+a)/o)),m=Math.max(0,Math.floor((l-d+a)/o)),h=Math.min(t-1,Math.ceil((u+d+a)/o));for(let n=m;n<=h;n++)for(let s=f;s<=p;s++){let c=(n*t+s)*4;if(e[c]||e[c+2])continue;let l=(s+.5)*o-a,u=(n+.5)*o-a,f=$r(r,l,u);if(f>=d)continue;let p=1-Zr((f+i.noise(l*.047+12,u*.047-6)*3+r.feather*.25)/r.feather),m=Zr((i.noise(l*.028-41,u*.028+19)+.12)/.78),h=p*r.strength*(1-m*.38);e[c+3]=Math.max(e[c+3],h*255)}}function ti(e,t,n,r,i){if(!Number.isInteger(t)||t<=0||e.length!==t*t*4||!Number.isFinite(n)||n<=0||r.length>4)throw Error(`Worked ground requires a valid RGBA raster and at most four patches`);for(let e of r)Qr(e);for(let a of r)ei(e,t,n,a,i)}var ni=Object.freeze({x:-78,z:20,rx:178,rz:214,depth:11,maximumCut:8});function ri(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function ii(e,t){return e>-256&&e<40&&t>-194&&t<234}function ai(e){return ni.depth*(.34*ri(.28,.39,e)+.33*ri(.52,.63,e)+.33*ri(.76,.89,e))}function oi(e,t,n,r,i){if(!ii(e,t)||i<=24)return n;let a=Math.hypot((e-ni.x)/ni.rx,(t-ni.z)/ni.rz);if(a>=1)return n;let o=Math.hypot(e+66,t-32);if(o<=44)return n;let s=(1-ri(.84,1,a))*ri(24,44,i)*(1-ri(0,40,e))*ri(44,60,o),c=1-ri(.12,1,a),l=ni.depth*(1-c*c*(3-2*c)),u=Math.max(-.22,Math.min(.22,(n-r-l)*.08));return n+(Math.max(n-ni.maximumCut,Math.min(n,r+ai(a)+u))-n)*s}function si(e,t,n){return Number.isFinite(e)&&e>=t&&e<=n}function ci(e){if(![`spur`,`glacial`,`terrace`].includes(e.kind))throw Error(`Unknown playable relief profile`);for(let t of[e.startX,e.startZ,e.endX,e.endZ])if(!si(t,-480,480))throw Error(`Playable relief axis outside authored bounds`);let t=e.endX-e.startX,n=e.endZ-e.startZ,r=Math.hypot(t,n);if(!si(r,80,900))throw Error(`Playable relief axis length must be80–900m`);if(!si(e.leftWidthM,24,180)||!si(e.rightWidthM,24,180))throw Error(`Playable relief shoulder width must be24–180m`);if(!si(e.bendM,-r*.15,r*.15))throw Error(`Playable relief bend exceeds axis budget`);if(e.branchSide!==-1&&e.branchSide!==1)throw Error(`Playable relief branch side must be signed`);if(!si(e.notchAtFraction,.25,.75))throw Error(`Playable relief notch must remain inside its axis`);return{...e,axisX:t/r,axisZ:n/r,inverseLength:1/r,lengthM:r}}function li(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function ui(e,t,n){let r=1-t*.42,i=(n<0?e.leftWidthM:e.rightWidthM)*r,a=1-li(.06,1,Math.abs(n)/i),o=e.branchSide<0?e.leftWidthM:e.rightWidthM,s=t+.5-e.notchAtFraction,c=e.branchSide*o*.7*li(.18,.78,s),l=(1-li(.08,1,Math.abs(n-c)/(o*.28)))*li(.14,.38,s)*(1-li(.7,.94,s));return a+(1-a)*l*.64}function di(e,t,n){let r=n<0?e.leftWidthM:e.rightWidthM,i=1-li(.08,1,Math.abs(n)/r),a=(t-e.notchAtFraction)*e.lengthM-n*e.branchSide*.55,o=1-li(0,e.lengthM*.13,Math.abs(a));return i*i*(1-o*.46)}function fi(e,t,n){let r=n<0?e.leftWidthM:e.rightWidthM,i=Math.abs(n)/r,a=(1-li(.6,1,i))*.38+(1-li(.12,.32,i))*.62,o=(t-e.notchAtFraction)*e.lengthM-n*e.branchSide*.85;return a*(1-(1-li(0,e.lengthM*.12,Math.abs(o)))*li(.02,.64,n*e.branchSide/r)*.76)}function pi(e,t,n){let r=t-e.startX,i=n-e.startZ,a=(r*e.axisX+i*e.axisZ)*e.inverseLength;if(a<=0||a>=1)return 0;let o=-r*e.axisZ+i*e.axisX-e.bendM*4*a*(1-a),s=li(0,.16,a)*(1-li(.8,1,a));return e.kind===`spur`?s*ui(e,a,o):e.kind===`glacial`?s*di(e,a,o):s*fi(e,a,o)}var mi=Object.freeze({kind:`coast`,depthM:.72,color:1921638,opacity:.72,roughness:.24,shallowColor:4033158,foam:.85,flowX:.012,flowZ:.008,shoreColor:6322032,waveScale:.064,waveStrength:1.6}),hi=Object.freeze({kind:`lake`,depthM:.58,color:2049091,opacity:.7,roughness:.28,shallowColor:5212786,foam:.35,flowX:.004,flowZ:.003,shoreColor:6320220,waveScale:.052,waveStrength:.8}),gi=Object.freeze({kind:`river`,depthM:.64,color:2771520,opacity:.72,roughness:.34,shallowColor:7047768,foam:.45,flowX:.016,flowZ:.005,shoreColor:7104848,waveScale:.072,waveStrength:.9}),_i=Object.freeze({kind:`marsh`,depthM:.43,color:3619365,opacity:.74,roughness:.46,shallowColor:6975294,foam:.15,flowX:.002,flowZ:.003,shoreColor:6906692,waveScale:.043,waveStrength:.5}),vi=Object.freeze({..._i,color:2046005,opacity:.73,roughness:.4,shoreColor:6713693,waveScale:.048,waveStrength:.6}),yi=Object.freeze({...mi,color:1324360,opacity:.76,roughness:.22,shallowColor:4161414,foam:.7,shoreColor:6059132,flowX:.009,flowZ:.006,waveScale:.057,waveStrength:1}),bi=Object.freeze({...mi,color:2246735,opacity:.74,roughness:.34,shallowColor:5934984,foam:1,shoreColor:7566689,waveScale:.07,waveStrength:1.2}),xi=Object.freeze({...hi,color:1522253,opacity:.75,roughness:.22,shallowColor:4161666,foam:.3,shoreColor:5860973,waveScale:.046,waveStrength:.7}),Si=Object.freeze({...hi,color:1595982,opacity:.7,roughness:.26,shallowColor:6270872,foam:.25,shoreColor:8550232,waveScale:.058,waveStrength:.75}),Ci=Object.freeze({...gi,color:4276530,opacity:.75,roughness:.43,shoreColor:7562829,flowX:.013,flowZ:.007,waveScale:.063,waveStrength:.52}),wi=Object.freeze({...gi,color:3683616,opacity:.73,roughness:.42,shoreColor:6969661,flowX:.01,flowZ:.004,waveScale:.052,waveStrength:.44}),Ti=Object.freeze({...hi,color:2785166,opacity:.68,roughness:.2,shallowColor:9425616,foam:.3,shoreColor:9083539,waveScale:.046,waveStrength:.6}),Ei=Object.freeze({...hi,color:2836055,opacity:.74,roughness:.18,shallowColor:8232368,foam:.2,shoreColor:8358800,waveScale:.04,waveStrength:.45}),Di=Object.freeze({...hi,color:2312255,shallowColor:6263920,shoreColor:6254424}),Oi=Object.freeze({...gi,color:4147763,opacity:.74,roughness:.36,shallowColor:9080658,foam:.4,shoreColor:7827276,flowX:.018,flowZ:.006,waveScale:.068,waveStrength:.8}),ki=Object.freeze({..._i,color:2828826,opacity:.78,roughness:.4,shallowColor:5920561,foam:.12,shoreColor:6183486,waveScale:.04,waveStrength:.45}),Ai=Object.freeze({...vi,color:2375738,shallowColor:6261358,roughness:.36,waveScale:.044,waveStrength:.5}),ji=Object.freeze({...hi,color:2898492,opacity:.78,roughness:.3,shallowColor:5664876,foam:.15,shoreColor:6580838,waveScale:.05,waveStrength:.5}),Mi=Object.freeze({...hi,color:3816761,opacity:.8,roughness:.28,shallowColor:7303528,foam:.1,shoreColor:6118228,waveScale:.044,waveStrength:.4}),Ni=Object.freeze({...hi,color:1517107,opacity:.8,roughness:.16,shallowColor:4151915,foam:.2,shoreColor:4870232,waveScale:.042,waveStrength:.5}),Pi=Object.freeze({...hi,color:1985119,opacity:.72,roughness:.2,shallowColor:6266288,foam:.3,shoreColor:7175552,waveScale:.048,waveStrength:.65}),Fi=Object.freeze({..._i,color:4867637,opacity:.8,roughness:.48,shallowColor:8221776,foam:.1,shoreColor:8023117,waveScale:.04,waveStrength:.35}),Ii=Object.freeze({...Si,color:1994596,shallowColor:8376509,opacity:.66,roughness:.22}),Li=Object.freeze({...Ci,color:5065262,shallowColor:9405778,opacity:.78}),Ri=Object.freeze({...mi,color:1788515,shallowColor:4886688});function zi(e){switch(e){case`fjord`:return yi;case`saltwind`:return bi;case`coastal`:return Ri;case`reservoir`:return xi;case`oasis`:return Ii;case`monsoon`:return Li;case`autumn`:return wi;case`mangrove`:return ki;case`polders`:return Ai;case`delta`:return Oi;case`alpine`:return Ti;case`winter`:case`whiteout`:return Ei;case`verdant`:case`orchard`:case`longleaf`:case`frontier`:return Di;case`urban`:case`railyard`:case`foundry`:case`ruinspires`:case`airfield`:return ji;case`caldera`:return Mi;case`blackglass`:return Ni;case`skybridge`:case`titan_gorge`:return Pi;case`badlands`:case`copper_mesa`:return Fi;default:return hi}}function Bi(e,t){let n=Math.max(0,Math.min(1,e));return t*n*n*(3-2*n)}var Vi=8,Hi=.002;function Ui(e,t,n,r){let i=Math.min(r-1,Math.max(0,Math.floor((e+t)/n)));return i>0&&e<Math.fround(i*n-t)?i--:i<r-1&&e>=Math.fround((i+1)*n-t)&&i++,i}function Wi(e,t,n,r){let i=r+1,a=n.size/r,o=n.size/2,s=Math.fround(o);return(c,l)=>{if(!Number.isFinite(c)||!Number.isFinite(l)||c<-s||c>s||l<-s||l>s)return n.getHeightAt(c,l);let u=Ui(c,o,a,r),d=Ui(l,o,a,r),f=d*r+u;if(!(t[f>>3]&1<<(f&7)))return n.getHeightAt(c,l);let p=Math.fround(u*a-o),m=Math.fround((u+1)*a-o),h=Math.fround(d*a-o),g=Math.fround((d+1)*a-o),_=(c-p)/(m-p),v=(l-h)/(g-h),y=d*i+u,b=e[y],x=e[y+1],S=e[y+i],C=e[y+i+1];return _+v<=1?b*(1-_-v)+x*_+S*v:x*(1-v)+S*(1-_)+C*(_+v-1)}}function*Gi(t){let n=Math.ceil(t.size/Vi),r=n+1,i=t.size/n,a=t.size/2,o=new Float32Array(r*r);for(let e=0;e<r;e++){for(let n=0;n<r;n++)o[e*r+n]=t.getWaterMaskAt(n*i-a,e*i-a);yield}let s=new Int32Array(r*r).fill(-1),c=new Uint8Array(Math.ceil(n*n/8)),l=[],d=[],f=[];function p(e,n){let o=n*r+e;if(s[o]>=0)return s[o];let c=e*i-a,u=n*i-a,f=l.length/3;return s[o]=f,l.push(c,t.getHeightAt(c,u)+(t.getWaterDepthAt?.(c,u)??0),u),d.push(0,1,0),f}for(let e=0;e<n;e++){for(let s=0;s<n;s++){let l=e*r+s;if(Math.max(o[l],o[l+1],o[l+r],o[l+r+1])<=Hi&&t.getWaterMaskAt((s+.5)*i-a,(e+.5)*i-a)<=Hi)continue;let u=p(s,e),d=p(s+1,e),m=p(s,e+1),h=p(s+1,e+1);f.push(u,m,d,d,m,h);let g=e*n+s;c[g>>3]|=1<<(g&7)}yield}if(!f.length)return null;let m=new u;m.setAttribute(`position`,new e(l,3)),m.setAttribute(`normal`,new e(d,3)),m.setIndex(f),m.computeBoundingSphere();let h=m.getAttribute(`position`);for(let e=0;e<s.length;e++)o[e]=s[e]<0?NaN:h.getY(s[e]);return{geometry:m,heightAt:Wi(o,c,t,n)}}var Ki=8;function qi(e,t,n,r,i,s,c=null){let l=zi(i),u={value:0},d=Array.from({length:Ki},()=>new y(0,0,0,0)),m={value:0},h=new p({color:l.color,roughness:l.roughness,metalness:0,envMapIntensity:.9,transparent:!0,opacity:l.opacity,depthWrite:!1,side:2});h.forceSinglePass=!0,h.name=`water:${l.kind}`;let g=e=>{Object.assign(e.uniforms,{uWaterMask:{value:t},uWaterWave:{value:n},uWaterSize:{value:r},uWaterTime:u,uWaterRamp:{value:new a(...s)},uWaterFlow:{value:new a(l.flowX,l.flowZ)},uWaterShore:{value:new f(l.shoreColor)},uWaterShallow:{value:new f(l.shallowColor)},uWaterFoam:{value:l.foam},uWaterWaveScale:{value:l.waveScale},uWaterWaveStrength:{value:l.waveStrength},uWaterDebug:{value:0},uWaterRipples:{value:d},uWaterRippleCount:m}),h.userData.waterShader=e,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vWaterWorld;`),e.vertexShader=e.vertexShader.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vWaterWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
      varying vec3 vWaterWorld;
      uniform sampler2D uWaterMask;
      uniform sampler2D uWaterWave;
      uniform float uWaterSize;
      uniform float uWaterTime;
      uniform vec2 uWaterRamp;
      uniform vec2 uWaterFlow;
      uniform vec3 uWaterShore;
      uniform vec3 uWaterShallow;
      uniform float uWaterFoam;
      uniform float uWaterWaveScale;
      uniform float uWaterWaveStrength;
      uniform float uWaterDebug;
      uniform vec4 uWaterRipples[8];
      uniform int uWaterRippleCount;
      float waterHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float waterValueNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(waterHash(i), waterHash(i + vec2(1.0, 0.0)), u.x), mix(waterHash(i + vec2(0.0, 1.0)), waterHash(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      /** Water pass 5: sediment / weed-bed field, 0..1, ~45 m and ~17 m octaves. */
      float waterTurbidityField(vec2 world) {
        float n = waterValueNoise(world / 45.0) * 0.65 + waterValueNoise(world / 17.0 + vec2(3.7, 9.1)) * 0.35;
        return smoothstep(0.25, 0.85, n);
      }
      float waterDeep;
      float waterBank;
      float waterGrazing;
      float waterTurbidity;
    `),e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`
      vec2 waterUV = (vWaterWorld.xz + uWaterSize * 0.5) / uWaterSize;
      float wet = smoothstep(uWaterRamp.x, uWaterRamp.y, texture2D(uWaterMask, waterUV).b);
      if (wet < 0.015) discard;
      vec3 eye = normalize(cameraPosition - vWaterWorld);
      float grazing = pow(1.0 - abs(eye.y), 3.0);
      waterGrazing = grazing;
      waterDeep = smoothstep(0.18, 0.86, wet);
      waterBank = smoothstep(0.015, 0.20, wet) * (1.0 - smoothstep(0.32, 0.74, wet));
      // Water 2026-09-12: the bed shows through the shallows — the deep colour
      // rises out of a sunlit bank tint instead of one flat sheet.
      // Water pass 5 (2026-09-13): the bank colour reaches further into the body
      // (0.05..0.75 -> 0.02..0.90) so a lake is not one saturated sheet 20 m out.
      diffuseColor.rgb = mix(uWaterShallow, diffuseColor.rgb, smoothstep(0.02, 0.90, waterDeep));
      // Water pass 4 (2026-09-13, owner: "significantly better, more varied,
      // more like real life"): the deep body darkens harder and the surface
      // leans on what the SKY does — mirror-like at grazing angles, bed and
      // body colour when looked into — instead of one saturated sheet.
      diffuseColor.rgb *= mix(0.90, 0.58, waterDeep);
      diffuseColor.rgb *= 1.0 - 0.35 * grazing;
      diffuseColor.a = smoothstep(0.0, 0.55, wet) * mix(opacity, 0.86, grazing);
    `),e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_maps>`,`
      vec2 waveUV = vWaterWorld.xz * uWaterWaveScale;
      vec2 drift = uWaterFlow * uWaterTime;
      vec4 waveNear = texture2D(uWaterWave, waveUV + drift);
      vec4 waveBroad = texture2D(uWaterWave, waveUV * 0.61 - drift * 0.7);
      vec2 wave = waveNear.xy * 2.0 - 1.0;
      // water pass 3 (2026-09-12): the broad swell carries more of the relief so
      // the open sea keeps the 1049e4e bay's long wave bands, not just fine chop
      wave += (waveBroad.xy * 2.0 - 1.0) * 0.9;
      // Water pass 4: a fine, faster ripple layer breaks the two-scale pattern
      // into sun sparkle instead of a printed texture.
      vec4 waveFine = texture2D(uWaterWave, waveUV * 2.7 + drift * 1.9 + vec2(0.37, 0.11));
      wave += (waveFine.xy * 2.0 - 1.0) * 0.35;
      // Water pass 6 (2026-09-14, owner: "more interactive"): every vehicle in the
      // water pushes concentric rings outward and churns the surface white around
      // its hull; the rings ride on the normal so the sun and sky read them.
      float wakeFoam = 0.0;
      for (int i = 0; i < 8; i++) {
        if (i >= uWaterRippleCount) break;
        vec4 rp = uWaterRipples[i];
        vec2 dv = vWaterWorld.xz - rp.xy;
        float d = length(dv) + 1e-3;
        float env = exp(-d * 0.22) * rp.z;
        float ring = sin(d * 4.2 - uWaterTime * 6.5 + rp.w) * env;
        wave += (dv / d) * ring * 3.0;
        wakeFoam += smoothstep(0.2, 1.0, rp.z) * exp(-d * 0.42) * (0.55 + 0.45 * sin(d * 7.0 - uWaterTime * 10.0 + rp.w));
      }
      normal = normalize((viewMatrix * vec4(normalize(vec3(wave.x * uWaterWaveStrength, 1.0, wave.y * uWaterWaveStrength)), 0.0)).xyz);
      normal *= faceDirection;
      // Surface colour breakup reuses the same two wave fetches: moving
      // two-scale value variation, a shore tint band and sparse crests.
      // diffuseColor is consumed by the lighting pass after this point.
      float broadWave = waveBroad.x;
      float fineWave = waveNear.y;
      diffuseColor.rgb *= 0.96 + (broadWave - 0.5) * 0.22 + (fineWave - 0.5) * 0.06;
      // Water pass 5 (2026-09-13, owner: "more varied colours, more like real
      // life"): a very large-scale drift of the same wave texture stands in for
      // suspended sediment and weed beds — the body brightens and dulls in
      // 40-60 m patches (0.42 x the wave scale) and leans toward the bank colour
      // where it is thick.
      // (a normal-map fetch read as one flat sheet at this scale — a normal map
      // hugs 0.5 — so the field is two octaves of value noise on world position)
      float turbidity = waterTurbidityField(vWaterWorld.xz + drift * 6.0);
      waterTurbidity = turbidity;
      diffuseColor.rgb *= 0.80 + turbidity * 0.40;
      diffuseColor.rgb = mix(diffuseColor.rgb, uWaterShallow * 0.80, smoothstep(0.45, 0.90, turbidity) * 0.38 * waterDeep);
      diffuseColor.rgb = mix(diffuseColor.rgb, uWaterShore, waterBank * (0.24 + broadWave * 0.12));
      diffuseColor.rgb += vec3(0.018, 0.026, 0.028)
        * smoothstep(0.66, 0.90, broadWave) * (0.35 + fineWave * 0.65) * waterDeep;
      // Water 2026-09-12: shoreline foam — broken wave crests pile up on the
      // bank band and a few sparse crests whiten open water on the sea maps.
      float foamBank = smoothstep(0.52, 0.86, broadWave * 0.7 + fineWave * 0.5) * waterBank;
      float foamCrest = smoothstep(0.80, 0.96, broadWave) * smoothstep(0.55, 0.9, fineWave) * waterDeep * 0.6;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.80, 0.85, 0.84), (foamBank * 0.55 + foamCrest * 0.45) * uWaterFoam);
      // Water pass 6: churned water around a vehicle whitens regardless of the map's foam profile.
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.90, 0.90), clamp(wakeFoam, 0.0, 0.85) * 0.85);
    `),e.fragmentShader=e.fragmentShader.replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>
material.specularColor *= 0.85;
material.specularF90 = 0.9;`),e.fragmentShader=e.fragmentShader.replace(`#include <lights_fragment_maps>`,`#include <lights_fragment_maps>
radiance *= mix(0.45, 1.75, waterGrazing);
radiance *= 1.15 - 0.55 * smoothstep(0.35, 0.85, waterTurbidity);`),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight -= max(vec3(0.0), totalSpecular - vec3(1.15));
if (uWaterDebug > 0.5) { outgoingLight = vec3(waterTurbidity); diffuseColor.a = 1.0; }
#include <opaque_fragment>`)};c?c(h,g):h.onBeforeCompile=g,h.customProgramCacheKey=()=>`shallow-water-v9`;let _=new o(e,h);return _.name=`shallow_water_${i}`,_.matrixAutoUpdate=!1,_.updateMatrix(),_.renderOrder=2,{mesh:_,update(e){Number.isFinite(e)&&e>0&&(u.value+=Math.min(e,.1))},setTime(e){Number.isFinite(e)&&(u.value=Math.max(0,e))},setDisturbances(e){let t=Math.min(Ki,e.length);for(let n=0;n<t;n++){let t=e[n];d[n].set(t.x,t.z,Math.min(1,Math.max(0,t.strength)),n*1.7)}m.value=t}}}function Ji(e,t,{srgb:n=!1,anisotropy:r=4,repeat:a=!0}={}){let o=document.createElement(`canvas`);o.width=o.height=t;let c=o.getContext(`2d`);if(!c)throw Error(`world procedural texture: Canvas2D context unavailable`);c.putImageData(new ImageData(e,t,t),0,0);let l=new v(o);return l.wrapS=l.wrapT=a?i:m,l.anisotropy=r,n&&(l.colorSpace=s),l}function Yi(e,n,r,i){let a=new Uint8ClampedArray(n*n*4),o=(t,r)=>e[(r+n)%n*n+(t+n)%n],s=new t;for(let e=0;e<n;e++)for(let t=0;t<n;t++){let i=o(t+1,e-1)+2*o(t+1,e)+o(t+1,e+1)-(o(t-1,e-1)+2*o(t-1,e)+o(t-1,e+1)),c=o(t-1,e+1)+2*o(t,e+1)+o(t+1,e+1)-(o(t-1,e-1)+2*o(t,e-1)+o(t+1,e-1));s.set(-i*r,-c*r,1).normalize();let l=(e*n+t)*4;a[l]=s.x*127.5+127.5,a[l+1]=s.y*127.5+127.5,a[l+2]=s.z*127.5+127.5,a[l+3]=255}return Ji(a,n,{anisotropy:i})}function J(e,t,n,r,i,a){let o=t*Math.PI*2*r,s=n*Math.PI*2*i,c=r*.55,l=i*.55;return e.noise4d(Math.cos(o)*c+a,Math.sin(o)*c-a*.7,Math.cos(s)*l+a*1.3,Math.sin(s)*l+a*.35)}function Xi(e,t){let n=e.getContext(`2d`,t);if(!n)throw Error(`Terrain texture canvas requires a 2D context`);return n}function Zi(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Y=512,X=1024;function Z(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function Q(e,t,n){return e<t?t:e>n?n:e}function Qi(e,t,n,r,i){let a=e[n]+(e[n+1]-e[n])*r;return a+(e[n+t]+(e[n+t+1]-e[n+t])*r-a)*i}function $i(e,t,n,r,i,a,o){return e||t?Qi(n,r,i,a,o):1/0}function ea(e,t,n){return e&&t>0?1-Z(18,64,n):1}function ta(e,t,n,r,i){return e===null||t&&n?1:1-r*i}function na(e,t,n,r,i,a){if(e===null||i<=0)return 0;let o=Z(e,e+32,r);return(t===`alpine`||t===`blackglass`||t===`titan_gorge`||t===`skybridge`||t===`badlands`)&&n?Math.min(o,i,a):o*i*a}function ra(){let e=[];for(let t=-512;t<=Y;t+=32)e.push([10+26*Math.sin(t*.0062)+8*Math.sin(t*.017+2.1),t]);let t=[];for(let e=-512;e<=Y;e+=32)t.push([e,46+34*Math.sin(e*.0043+1)+7*Math.sin(e*.013-.6)]);return[e,t]}function ia(e,t,n=!0){let r=[],i=e.jitter??2.5,a=e=>typeof e==`number`?{at:e,lo:-512,hi:Y}:{at:e.at,lo:e.lo??-512,hi:e.hi??Y};for(let o=0;o<e.xs.length;o++){let{at:s,lo:c,hi:l}=a(e.xs[o]),u=[];for(let e=c;e<=l;e+=32)u.push([s+Math.sin(e*.011+o*2.3)*i,e]);t.push(u.length),n&&u.length&&u[u.length-1][1]<l&&u.push([s+Math.sin(l*.011+o*2.3)*i,l]),r.push(u)}for(let o=0;o<e.zs.length;o++){let{at:s,lo:c,hi:l}=a(e.zs[o]),u=[];for(let e=c;e<=l;e+=32)u.push([e,s+Math.sin(e*.011+o*1.7)*i]);t.push(u.length),n&&u.length&&u[u.length-1][0]<l&&u.push([l,s+Math.sin(l*.011+o*1.7)*i]),r.push(u)}return r}function aa(e){let t=[];for(let n of e||[]){if(!Array.isArray(n)||n.length<2)continue;let e=[];for(let t=0;t<n.length-1;t++){let[r,i]=n[t],[a,o]=n[t+1],s=Math.max(1,Math.ceil(Math.hypot(a-r,o-i)/32));for(let t=0;t<s;t++){let n=t/s;e.push([r+(a-r)*n,i+(o-i)*n])}}let r=n[n.length-1];e.push([r[0],r[1]]),t.push(e)}return t}var oa={hillScale:1,microScale:1,rimH:24,village:{x0:-60,x1:80,z0:-40,z1:120,cx:10,cz:40,feather:42,flatten:.85},marshes:[{x:220,z:-140,r:38},{x:-190,z:-210,r:48},{x:-330,z:330,r:30}],lakes:[],frozenMarshes:!1,dunes:null,mesas:null,landforms:[],roads:`country`},sa={player:{x:14,z:-78},enemies:[{x:-30,z:320},{x:140,z:350},{x:265,z:235},{x:-215,z:270},{x:-330,z:140},{x:330,z:130},{x:15,z:430}]};function ca(e=null,t=!0){let n={...oa,...e?.terrain??{}};n.landforms=(n.landforms||[]).map(e=>{let t=b.degToRad(e.yawDeg||0);return e.relief?{...e,_c:Math.cos(t),_s:Math.sin(t),_relief:ci(e.relief)}:{...e,_c:Math.cos(t),_s:Math.sin(t)}});let r={...oa.village,...n.village||{}},i=e&&e.spawns||sa,a={...i.player},o=i.enemies.map(e=>({...e})),s=0,c=0;for(let e of o)s+=e.x,c+=e.z;s/=o.length||1,c/=o.length||1,a.yaw=Math.atan2(s-a.x,c-a.z);for(let e of o)e.yaw=Math.atan2(a.x-e.x,a.z-e.z);let l,u=[];n.roads===`country`||!n.roads?l=ra():(l=[],n.roads.grid&&l.push(...ia(n.roads.grid,u,t)),n.roads.paths&&l.push(...aa(n.roads.paths))),l.length===0&&(l=ra());let d=t?yr(e?.id,l):l,f=Hr(l,d,u);return{village:r,marshes:(n.marshes||[]).map(e=>Object.assign({dip:2.6},e)),lakes:(n.lakes||[]).map(e=>({...e})),spawns:{player:a,enemies:o},roads:d,...f?{roadStations:f}:{},terrain:n}}function la(e,t){if(!Sr(t))return null;let n=e.roads,r=yr(t,n);if(r===n)return null;e.roads=r;let i=Hr(n,r);return i&&(e.roadStations=i),n}function ua(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?((e-n)*o+(t-r)*s)/c:0;l=Q(l,0,1);let u=n+o*l-e,d=r+s*l-t;return{d:Math.sqrt(u*u+d*d),t:l}}function da(e,t,n,r=`authored-relief`){if(r===`authored-relief`&&e._relief)return(e.height||0)*pi(e._relief,t,n);let i=t-e.x,a=n-e.z,o=e._c??Math.cos(b.degToRad(e.yawDeg||0)),s=e._s??Math.sin(b.degToRad(e.yawDeg||0)),c=i*o+a*s,l=-i*s+a*o,u=e.height||0;if(e.kind===`ridge`){let t=Math.max(1,(e.length||100)*.5),n=Math.max(1,e.width||45),r=1-Z(t*.72,t,Math.abs(c)),i=1-Z(n*.22,n,Math.abs(l)),a=i*i*(3-2*i);return u*r*a}let d=Math.max(1,e.rx||e.r||70),f=Math.max(1,e.rz||e.r||d),p=1-Z(.12,1,Math.sqrt(c*c/(d*d)+l*l/(f*f)));return u*p*p*(3-2*p)}function fa(e=1337,t=null){let n=ma(e,t),r=n.next();for(;!r.done;)r=n.next();if(!(`size`in r.value))throw Error(`Incomplete live terrain field`);return r.value}async function pa(e=1337,t=null,n=null){let r=ma(e,t),i=!1;try{let e=r.next();for(;!e.done;)n&&await n(e.value),e=r.next();if(i=!0,!(`size`in e.value))throw Error(`Incomplete live terrain field`);return e.value}finally{if(!i)try{r.return?.()}catch{}}}function*ma(e=1337,n=null,r=!1){let i=ca(n,!r&&!Sr(n?.id)),a=r?null:la(i,n?.id),o=i.terrain,s=n?.id===`badlands`&&o.redrockCanyon===!0,c=ar(o.hardstands),l=i.village,u=i.marshes,d=i.lakes,f=i.spawns.player,p=i.spawns.enemies,m,h=()=>{if(m!==void 0)return m;if(!n?.assaultTrenches)return m=null;let{alpha:e,bravo:t}=E({x:f.x,z:f.z},p.map(e=>({x:e.x,z:e.z}))),r=w(e,t),i=r.lines.map(e=>ae(e.x,e.z)<.4),a=r.lines.filter((e,t)=>i[t]),o=r.lines.map((e,t)=>i[t]?{x:e.x,z:e.z}:null);return m=a.length?{lines:a,connector:r.connector,sectors:o}:null,m},g=new de({random:Zi((e^2654435769)>>>0)});function _(e,t){let n=g.noise(e*.0016+13.7,t*.0016-4.2)*80,r=g.noise(e*.0016-27.1,t*.0016+9.3)*80,i=1-Math.abs(g.noise((e+n)*.0026+51,(t+r)*.0026-33)),a=i*i*6.5,o=g.noise(e*.0038+101,t*.0038-71)*8.5,s=g.noise(e*.0079-11,t*.0079+177)*4.1,c=a+o+s;c+=g.noise(e*.0152+301,t*.0152+41)*1.9,c+=g.noise(e*.0313-222,t*.0313-97)*.85,c+=g.noise(e*.064+77,t*.064+13)*.35,c+=g.noise(e*.131-8,t*.131+259)*.14;let l=a*.5+o+s*.45;return{d:c,s:l}}let v=X/256,y=new Float32Array(257*257).fill(1e9),b=new Float32Array(257*257),x=new Int16Array(257*257),S=new Int16Array(257*257),C=new Float32Array(257*257),A=new Float32Array(257*257),j=i.roads,M=j.reduce((e,t)=>e+Math.max(0,t.length-1),0)+257+1+129,N=0,P=[f,...p].map(e=>[e.x,e.z,l.cx,l.cz]);function F(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s;for(let i=0;i<257;i++){let a=i*v-Y;for(let l=0;l<257;l++){let u=l*v-Y,d=i*257+l,f=c>0?((u-n)*o+(a-r)*s)/c:0;f=Q(f,0,1);let p=n+o*f-u,m=r+s*f-a,h=Math.sqrt(p*p+m*m);h<y[d]&&(y[d]=h,x[d]=e,S[d]=t,C[d]=f)}}}function*I(){for(let e=0;e<j.length;e++){let t=j[e];for(let n=0;n<t.length-1;n++)F(e,n,t[n][0],t[n][1],t[n+1][0],t[n+1][1]),yield++N/M}for(let e=0;e<257;e++){let t=e*v-Y;for(let n=0;n<257;n++){let r=n*v-Y,i=e*257+n,a=0;for(let e of P){let{d:n}=ua(r,t,e[0],e[1],e[2],e[3]);a=Math.max(a,1-Z(8,30,n))}A[i]=a}yield++N/M}}yield*I();function L(){return r||o.roads===`country`||!o.roads.paths?null:Br(n?.id,j,o.roads.paths,o.roads.grid?o.roads.grid.xs.length+o.roads.grid.zs.length:0,o.rimH,A,257,X)}let te=a?null:L(),ne=te!==null&&Pr(n?.id);function re(e,t,n){let r=Q((t+Y)/v,0,255.9999),i=Q((n+Y)/v,0,255.9999),a=r|0,o=i|0,s=r-a,c=i-o,l=o*257+a,u=e[l]+(e[l+1]-e[l])*s;return u+(e[l+257]+(e[l+257+1]-e[l+257])*s-u)*c}function ie(e,t){let n=g.noise(e*9e-4+77,t*9e-4-31)*95;return g.noise((e+n)*.0014-310,(t-n*.8)*.0014+208)*.5+.5}let R=_(l.cx,l.cz).s;function ae(e,t){let n=Math.max(l.x0-e,e-l.x1,0),r=Math.max(l.z0-t,t-l.z1,0);return(1-Z(0,l.feather,Math.hypot(n,r)))*(l.flatten??.85)}let z=new Float64Array(8),B=[f,...p],V=new Float64Array(Math.max(1,d.length)),H=!!n?.splat?.seaLake&&!o.frozenMarshes,oe=H?zi(n?.id||``).depthM:0,se=n?.splat?.seaRamp?.[0]??.4,ce=n?.splat?.seaRamp?.[1]??.78,le=null,ue=null,fe=d.some(e=>e.radii!==void 0),pe={height:0,wetness:0},me=null,he=null,ge=`legacy-support`,_e=Math.ceil(u.length/32);function ve(e,t,n,r,i,a){let c=1;if(s&&(n+=Tt(e,t)),o.dunes||o.mesas||o.landforms.length)for(let n=0;n<B.length;n++){let r=e-B[n].x,i=t-B[n].z;if(r*r+i*i>=8100)continue;let a=Math.hypot(r,i);a<90&&(c=Math.min(c,Z(36,90,a)))}if(o.dunes){let a=1-Math.abs(g.noise(e*.0021+402,t*.0046+91)),s=1-Math.abs(g.noise((e-12.8)*.0021+402,(t-9.6)*.0046+91)),l=g.noise(e*.0064-55,t*.0064+233)*.5+.5,u=a*.62+s*.38,d=s*.65+a*.35,f=u*u*(3-2*u),p=Q((f-d*d*(3-2*d))*2,-.28,.28),m=f*o.dunes.amp*(.7+l*.5)*(1+p*.55);m+=Z(.55,.95,f)*g.noise(e*.041+17,t*.041-63)*.45*o.dunes.amp*.08,n+=m*(1-r*.7)*(1-i)*c}if(o.mesas){let s=ie(e,t),l=o.mesas.thr1-o.mesas.thr0,u=o.mesas.wallWidth??.42,d=o.mesas.tierWidth??.045,f=Z(o.mesas.thr0,o.mesas.thr0+l*u,s),p=Z(o.mesas.thr1+.04,o.mesas.thr1+.04+d,s),m=o.mesas.tierScale??.45,h=.97+.03*g.noise(e*.012+31,t*.012-74),_=1-r*(1-(o.mesas.corridorFloor??0));n+=(f+p*m)*o.mesas.amp*h*_*(1-i)*(1-a)*c}for(let s=0;s<o.landforms.length;s++){let l=o.landforms[s],u=l.corridorScale??.62,d=l.settlementScale??.45,f=l.wetScale??.3,p=(1-r*(1-u))*(1-i*(1-d))*(1-a*(1-f));n+=da(l,e,t,ge)*c*p}return n}function ye(e,t,n,r,i,a,o,s,c,l,u,f,p){let m=0,h=!1;s&&f>0&&r<1&&(m=Qi(b,257,c,l,u),h=!0,n+=(m-n)*f*(1-r));let g=0;a&&(Yn(d,V,ue,fe,e,t,n,i,pe),n=pe.height,g=pe.wetness);let _=1;if(o){let r=g>0?676:484;for(let i=0;i<B.length;i++){let a=e-B[i].x,o=t-B[i].z;if(a*a+o*o>=r)continue;let s=Math.hypot(a,o);s<22&&(n+=(z[i]-n)*(1-Z(9,22,s))),g>0&&(_*=Z(22,26,s))}}return s?(p<14&&(h||(m=Qi(b,257,c,l,u)),n+=(m-n)*(1-Z(3.8,14,p))),be(e,t,n,p,i,r,g,_)):n}function be(e,t,n,r,i,a,o,s){if(r>4&&r<22){let c=o>0?1-Z(se,ce,o*Z(14,18,r)*s):1;if(c===0||a===1)return n;let l=.5+.5*g.noise(e*.031+71,t*.031-44),u=Math.exp(-(((r-7)/1.9)**2))*.26*l,d=-Math.exp(-(((r-11.5)/2.4)**2))*.2*(1-l*.5);n+=(u+d)*(1-i)*(1-a)*c}return n}function xe(e,t,r,i,a=!0){e=Q(e,-512,Y),t=Q(t,-512,Y);let s=Q((e+Y)/v,0,255.9999),c=Q((t+Y)/v,0,255.9999),l=s|0,d=c|0,f=s-l,p=c-d,m=d*257+l,_=Qi(A,257,m,f,p),b=$i(i,ne,y,257,m,f,p),x=ae(e,t),S=a?le:null,C=S?me:null,w=C?Xn(e,t,X,_e):0,E=0,D=C?C[w]:0,O=S?0:Se(e,t,_,x),k=0,j=0,M=0,N=0,P=0,F=0,I=0;for(let n=0;n<u.length;n++){if(C){for(;!D&&++E<_e;)D=C[w+E];if(!D)break;let e=D&-D;n=E*32+31-Math.clz32(e),D^=e}let r=u[n],i=n*4,a=S?S[i+3]:1,o=ee(r,e,t,a);if(o<1){let e=1-o,t=r.dip*e*e*(3-2*e);S?k+=t:O-=t,j=Math.max(j,e)}if(S&&o<a){let n=Z(a,In,o),r=S[i]+S[i+1]*e+S[i+2]*t;M=Math.max(M,n);let s=n/Math.max(1e-9,1-n);P+=s,N+=r*s,o<=.94&&(F+=r,I++)}}if(I)return ye(e,t,F/I,1,x,a,r,i,m,f,p,0,b);S&&(O=Se(e,t,_,x)-k),O=ve(e,t,O,_,x,j);{let n=g.noise(e*.0104+610,t*.0104-320),r=g.noise(e*.0233-105,t*.0233+77),i=1-Math.abs(n);i*=i;let a=Z(.42,.92,i)*(2.1+r*.8)-Z(.55,.92,r)*1.5;a*=(1-_*.55)*(1-x)*(1-j)*o.microScale,O+=a}{let n=g.noise(e*.143+88,t*.143-141),r=g.noise(e*.317-260,t*.317+33);O+=(n*.16+r*.07)*(1-x)*(1-j*.7)*o.microScale}let L=Math.max(Math.abs(e),Math.abs(t)),ie=Z(430,Y,L),R=ea(ne,_,b);if(O+=ie*ie*o.rimH*ta(te,i,ne,_,R),M>0){let e=N/P;O+=(e-O)*M,j=Math.max(j,M)}let z=na(te,n?.id,i,L,_,R);O=ye(e,t,O,j,x,a,r,i,m,f,p,z,b),he!==null&&ii(e,t)&&(O=oi(e,t,O,he,re(y,e,t)));let B=h();if(B){let n=T(e,t,B);n>0&&(O-=n*(1-x)*(1-j))}return O}function Se(e,t,n,r){let{d:i,s:a}=_(e,t),s=(i+(a-i)*(n*.72))*o.hillScale;return r>0&&(s+=(R*o.hillScale+(a-R)*(l.relief??.1)-s)*r),s}function Ce(e){for(let t of e)for(let e=0;e<4;e++){let e=t.slice();for(let n=1;n<t.length-1;n++)t[n]=e[n-1]*.25+e[n]*.5+e[n+1]*.25}}let we=[0,0,1e9];function Te(e,t,n=j){let r=0,i=0,a=1e9;for(let o=0;o<n[e].length;o++)for(let s=0;s<n[t].length;s++){let c=Math.hypot(n[e][o][0]-n[t][s][0],n[e][o][1]-n[t][s][1]);c<a&&(a=c,r=o,i=s)}return we[0]=r,we[1]=i,we[2]=a,we}function Ee(e,t=j){for(let n=0;n<t.length;n++)for(let r=n+1;r<t.length;r++){let[i,a,o]=Te(n,r,t);if(o>40)continue;let s=(e[n][i]+e[r][a])*.5;for(let t=-3;t<=3;t++){let o=(1-Math.abs(t)/4)*.85;e[n][i+t]!==void 0&&(e[n][i+t]+=(s-e[n][i+t])*o),e[r][a+t]!==void 0&&(e[r][a+t]+=(s-e[r][a+t])*o)}}}function De(){let e=a??j,t=e.map(e=>e.map(([e,t])=>xe(e,t,!1,!1)));if(!r&&!a&&o.roads!==`country`&&o.roads.paths){let e=o.roads.grid?o.roads.grid.xs.length+o.roads.grid.zs.length:0;xr(n?.id,j,t,o.roads.paths,e)}if(Ce(t),Ee(t,e),a){if(te=L(),ne=te!==null&&Pr(n?.id),wr(a,j,t),o.roads!==`country`&&o.roads.paths){let e=o.roads.grid?o.roads.grid.xs.length+o.roads.grid.zs.length:0;xr(n?.id,j,t,o.roads.paths,e)}Tr(n?.id,a,j,t)}r||(Ar(n?.id,j,t),Mr(n?.id,j,t));for(let e=0;e<257*257;e++){let n=t[x[e]],r=S[e];b[e]=n[r]+(n[r+1]-n[r])*C[e]}}De(),a=null;function Oe(){if(o.hardstands?.length&&(rr(o.hardstands,y,b,257,X,(e,t)=>re(b,e,t)),!r&&o.roads!==`country`&&o.roads.paths&&c)){let e=o.roads.grid?o.roads.grid.xs.length+o.roads.grid.zs.length:0;Or(n?.id,j,o.roads.paths,e,{size:257,mapSize:X,route:x,segment:S,elevation:b,sample:(e,t)=>re(b,e,t)},c)}}Oe(),x=null,S=null,C=null;function ke(){for(let e=0;e<d.length;e++){let t=d[e],n=1/0;for(let e=0;e<12;e++){let r=e*Math.PI/6,i=O(t,r)*.95,a=xe(t.x+Math.cos(r)*i,t.z+Math.sin(r)*i,!1,!1,!1);a<n&&(n=a)}V[e]=t.level??Math.min(n,xe(t.x,t.z,!1,!1,!1))-(t.depth??1.4)}}function Ae(){for(let e=0;e<B.length;e++)z[e]=xe(B[e].x,B[e].z,!1,!0)}ke(),Ae(),H&&d.length&&Vn(d,V);let je=H?d.map((e,t)=>({...e,level:V[t]})):[];H&&u.length&&(le=Kn(u,(e,t)=>xe(e,t,!1,!1,!1),je),me=Qn(u,le,X)),je.length&&(ue=Gn(je,(e,t)=>xe(e,t,!1,!1,!1))),n?.id===`copper_mesa`&&o.quarryBenches&&(he=xe(ni.x,ni.z,!0,!0)),ge=`authored-relief`;let Me=(e,t)=>xe(e,t,!0,!0),Ne=new t,Pe=1.2;if(r)return{getHeightAt:Me,getNormalAt:Ke,getGroundType:Ye,_roadDist:(e,t)=>re(y,e,t)};let Fe=1025,Ie=Math.ceil(X/16),Le=new Float32Array(Fe*Fe),ze=new Uint8Array(Ie*Ie),Be=new Uint8Array(131329);function Ve(e,t){let n=t*Fe+e,r=n>>>3,i=1<<(n&7);Be[r]&i||(Le[n]=xe(e-Y,t-Y,!0,!0),Be[r]|=i)}function He(e,t){let n=e*16,r=t*16,i=Math.min(X,n+16),a=Math.min(X,r+16);for(let e=r;e<=a;e++)for(let t=n;t<=i;t++)Ve(t,e);ze[t*Ie+e]=1}function Ue(e,t){let n=Q(e+Y,0,X-1e-4),r=Q(t+Y,0,X-1e-4),i=n|0,a=r|0,o=i/16|0,s=a/16|0;ze[s*Ie+o]||(Ve(i,a),Ve(i+1,a),Ve(i,a+1),Ve(i+1,a+1));let c=n-i,l=r-a,u=a*Fe+i,d=Le[u]+(Le[u+1]-Le[u])*c;return d+(Le[u+Fe]+(Le[u+Fe+1]-Le[u+Fe])*c-d)*l}function*We(e){let t=new Set;for(let n of e||[]){if(!n)continue;let e=Math.max(0,Number(n.radiusM)||0),r=Q(Ge(n.x)+Y-e,0,X-1e-4),i=Q(Ge(n.z)+Y-e,0,X-1e-4),a=Q(Ge(n.x)+Y+e,0,X-1e-4),o=Q(Ge(n.z)+Y+e,0,X-1e-4),s=(r|0)/16|0,c=(i|0)/16|0,l=(a|0)/16|0,u=(o|0)/16|0;for(let e=c;e<=u;e++)for(let n=s;n<=l;n++)t.add(e*Ie+n)}for(let e of t){let t=e%Ie,n=e/Ie|0;ze[e]||(He(t,n),yield e)}}function Ge(e){return Number.isFinite(e)?e:0}function Ke(e,t){let n=Me(e-Pe,t),r=Me(e+Pe,t),i=Me(e,t-Pe),a=Me(e,t+Pe);return Ne.set(n-r,2*Pe,i-a).normalize()}let qe=lr(Re(n?.id??`verdant`,n?.splat));function Je(e,t){if(qe===`earth`)return 0;let n=re(y,e,t);if(n<14)return 0;let r=H?Qe(e,t):k(u,d,e,t);return dr(qe,n,r,se,ce)}function Ye(e,t){if(re(y,e,t)<4.3)return`hard`;for(let n of d)if(ee(n,e,t,.95)<.95)return o.softLakes?`soft`:`hard`;for(let n of u)if(ee(n,e,t,.65)<.65)return o.frozenMarshes?`hard`:`soft`;return`medium`}function Xe(e,t){if(!H)return 0;let n=Qe(e,t);return Z(se,ce,n)}function Ze(e,t){return oe?Bi(Xe(e,t),oe):0}function Qe(e,t){let n=me?Zn(u,me,Xn(e,t,X,_e),_e,e,t):k(u,d,e,t);if(me&&n<1){for(let r of d)if(n=Math.max(n,D(r,e,t,!0)),n===1)break}if(n<=0||(n*=Z(14,18,re(y,e,t)),n<=0))return 0;for(let r of B){let i=e-r.x,a=t-r.z;if(i*i+a*a>=676)continue;let o=Math.hypot(i,a);o<26&&(n*=Z(22,26,o))}return n}function $e(e,t){for(let n of d){if(n.radii){if(ee(n,e,t,1.04)<1.04)return!0;continue}let r=e-n.x,i=t-n.z;if(r*r+i*i<(n.r*1.04)**2)return!0}for(let n of u){let r=e-n.x,i=t-n.z,a=r*r+i*i;if(o.frozenMarshes&&a<n.r*n.r)return!0;let s=n.r*(H?1:.55);if((o.clearMarshVeg||H)&&a<s*s)return!0}return!1}function*et(){let e=1/0,t=-1/0;for(let n=0;n<=128;n++){for(let r=0;r<=128;r++){let i=Me(r*8-Y,n*8-Y);i<e&&(e=i),i>t&&(t=i)}yield++N/M}return[e,t]}yield++N/M;let[tt,nt]=yield*et(),rt=o.mesas;function it(){return rt?(e,t)=>{let n=ie(e,t),r=rt.thr1-rt.thr0,i=Z(rt.thr0-r*.55,rt.thr0+r*(rt.wallWidth??.42),n),a=Z(408,468,Math.max(Math.abs(e),Math.abs(t)));return Math.max(i,a)}:null}let at=it();return{getHeightAt:Me,getHeightAtFast:Ue,warmFastTilesAround:We,getNormalAt:Ke,getGroundType:Ye,getWaterMaskAt:Xe,getWaterDepthAt:Ze,getTrackSurfaceAt:Je,...n?.navigationWaterPolicy?{navigationWaterPolicy:n.navigationWaterPolicy}:{},size:X,minY:tt,maxY:nt,_roadDist:(e,t)=>re(y,e,t),_villageMask:ae,assaultTrenchLines:h(),_noVeg:c?(e,t)=>c(e,t)||$e(e,t):$e,_layout:i,...i.roadStations?{_createRoadPlacementSampler:function*(){return yield*ma(e,fr(n),!0)}}:{},_mesaW:at,...H?{_waterWetnessAt:Qe}:{}}}var ha=new f,ga={h:0,s:0,l:0};function _a(e,t){if(!t)return e;for(let n=0;n<e.length;n+=4){ha.setRGB(e[n]/255,e[n+1]/255,e[n+2]/255),ha.getHSL(ga);let[r,i,a]=t(ga.h,ga.s,ga.l);ha.setHSL((r%1+1)%1,Q(i,0,1),Q(a,0,1)),e[n]=ha.r*255,e[n+1]=ha.g*255,e[n+2]=ha.b*255}return e}var va=null,ya=256;function ba(){if(va)return va;let e=xa(),t=e.next();for(;!t.done;)t=e.next();return t.value}function*xa(){if(va)return va;let e=ya,t=new de({random:Zi(3011)}),n=new Float32Array(e*e),r=new Float32Array(e*e);for(let i=0;i<e;i++){for(let a=0;a<e;a++){let o=a/e,s=i/e,c=i*e+a;n[c]=J(t,o,s,4,4,3)*.6+J(t,o,s,9,9,27)*.4,r[c]=J(t,o,s,2,2,55)*.7+J(t,o,s,5,5,91)*.3}if(yield,va)return va}return va={a:n,b:r},va}function Sa(e,t,n){let r=ya,i=t*r-.5,a=n*r-.5,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=r-1;o&=u,s&=u;let d=o+1&u,f=s+1&u,p=e[s*r+o],m=e[s*r+d],h=e[f*r+o],g=e[f*r+d];return p+(m-p)*c+(h-p)*l+(p-m-h+g)*c*l}function Ca(e){return e-Math.floor(e)}function wa(e,t,n=null){let r=ba(),i=Ca(e*9e-4+.53),a=Ca(t*9e-4+.17),o=Sa(r.a,i,a),s=Sa(r.b,i,a),c=e+o*.5*48,l=t+s*.5*48,u=Sa(r.a,Ca(c*.0117),Ca(l*.0117)),d=Sa(r.b,Ca(c*.0031+.41),Ca(l*.0031+.13)),f=Sa(r.a,Ca(c*.0121+.63),Ca(l*.0121+.29))*.62+Sa(r.b,Ca(c*.00779+.19),Ca(l*.00779+.71))*.38,p=n||{n1:0,n2:0,mA:0};return p.n1=u*.5+.5,p.n2=d*.5+.5,p.mA=f*.5+.5,p}var $=new f;function Ta(e,t,n){return $.setHSL(e,t,n),$.getStyle()}function Ea(e,t,n){for(let r of[-t,0,t])for(let i of[-t,0,t])e.save(),e.translate(r,i),n(),e.restore()}function Da(e,t,n=null){let r=S(256),i=new de({random:Zi(e)}),a=Zi(e^32586),o=document.createElement(`canvas`);o.width=o.height=r;let s=Xi(o,{willReadFrequently:!0}),c=s.createImageData(r,r);for(let e=0;e<r;e++){let t=e/r;for(let n=0;n<r;n++){let a=n/r,o=(e*r+n)*4,s=J(i,a,t,3,3,11)*.6+J(i,a,t,7,7,23)*.4,l=J(i,a,t,43,43,61)*.5+.5,u=s*.5+.5,d=Z(.54,.88,u),f=Z(.34,.1,u);$.setHSL(.192+s*.03-d*.075-f*.085,.245-d*.075-f*.1,.16+u*.07+l*.05-f*.015),c.data[o]=$.r*255,c.data[o+1]=$.g*255,c.data[o+2]=$.b*255,c.data[o+3]=255}}s.putImageData(c,0,0),s.lineCap=`round`;for(let e=0;e<3400;e++){let e=a()*r,t=a()*r,n=a()<.24,i=.16+a()*.17+(n?.12:0);s.strokeStyle=n?Ta(.1+a()*.035,.26+a()*.08,i):Ta(.175+a()*.075,.26+a()*.13,i),s.lineWidth=1.1+a()*1.4;let o=7+a()*12,c=a()*Math.PI*2,l=(a()-.5)*8;Ea(s,r,()=>{s.beginPath(),s.moveTo(e,t),s.quadraticCurveTo(e+Math.cos(c)*o*.5-Math.sin(c)*l,t+Math.sin(c)*o*.5+Math.cos(c)*l,e+Math.cos(c)*o,t+Math.sin(c)*o),s.stroke()})}for(let e=0;e<420;e++){let e=a()*r,t=a()*r,n=1+a()*2;s.fillStyle=Ta(.26+a()*.05,.4,.2+a()*.16),Ea(s,r,()=>{s.beginPath(),s.arc(e,t,n,0,Math.PI*2),s.fill()})}let l=s.getImageData(0,0,r,r),u=new Uint8ClampedArray(l.data),d=new Float32Array(r*r);for(let e=0;e<r*r;e++){let t=u[e*4+1]/255;d[e]=t,u[e*4+3]=Q(.9-t*.1,.03,1)*255}return _a(u,n),{albedo:Ji(u,r,{srgb:!0,anisotropy:t}),normal:Yi(d,r,2.4,t)}}function Oa(e,t,n=null){let r=S(256),i=new de({random:Zi(e)}),a=Zi(e^11921),o=document.createElement(`canvas`);o.width=o.height=r;let s=Xi(o,{willReadFrequently:!0}),c=s.createImageData(r,r);for(let e=0;e<r;e++){let t=e/r;for(let n=0;n<r;n++){let a=n/r,o=(e*r+n)*4,s=J(i,a,t,4,4,7)*.65+J(i,a,t,9,9,31)*.35,l=J(i,a,t,47,47,3)*.5+.5,u=s*.5+.5;$.setHSL(.077+s*.014,.25-l*.05,.16+u*.1+l*.045),c.data[o]=$.r*255,c.data[o+1]=$.g*255,c.data[o+2]=$.b*255,c.data[o+3]=255}}s.putImageData(c,0,0);for(let e=0;e<110;e++){let e=a()*r,t=a()*r,n=8+a()*22,i=n*(.5+a()*.7),o=a()*Math.PI,c=a()<.5;s.globalAlpha=.14+a()*.14,s.fillStyle=Ta(.075+a()*.015,.24,c?.12:.3),Ea(s,r,()=>{s.beginPath(),s.ellipse(e,t,n,i,o,0,Math.PI*2),s.fill()})}s.globalAlpha=1,s.lineCap=`round`;for(let e=0;e<26;e++){let e=a()*r,t=a()*r,n=a()*Math.PI*2;s.strokeStyle=Ta(.07,.25,.075+a()*.035),s.lineWidth=.9+a()*1.2;let i=4+a()*5|0,o=[e],c=[t];for(let r=0;r<i;r++)n+=(a()-.5)*1.2,e+=Math.cos(n)*(7+a()*12),t+=Math.sin(n)*(7+a()*12),o.push(e),c.push(t);Ea(s,r,()=>{s.beginPath(),s.moveTo(o[0],c[0]);for(let e=1;e<o.length;e++)s.lineTo(o[e],c[e]);s.stroke()})}for(let e=0;e<640;e++){let e=a()*r,t=a()*r,n=.8+a()**1.8*3.2,i=.2+a()*.2,o=Ta(.075,.2,.08),c=Ta(.075+a()*.02,.1+a()*.12,i);Ea(s,r,()=>{s.beginPath(),s.arc(e+n*.4,t+n*.5,n,0,Math.PI*2),s.fillStyle=o,s.fill(),s.beginPath(),s.arc(e,t,n,0,Math.PI*2),s.fillStyle=c,s.fill()})}let l=s.getImageData(0,0,r,r),u=new Uint8ClampedArray(l.data),d=new Float32Array(r*r);for(let e=0;e<r*r;e++){let t=(u[e*4]*.45+u[e*4+1]*.4+u[e*4+2]*.15)/255;d[e]=t,u[e*4+3]=Q(.98-t*.09,.03,1)*255}return _a(u,n),{albedo:Ji(u,r,{srgb:!0,anisotropy:t}),normal:Yi(d,r,3,t)}}function ka(e,t){let n=S(256),r=new de({random:Zi(e)}),i=Zi(e^7397),a=document.createElement(`canvas`);a.width=a.height=n;let o=Xi(a,{willReadFrequently:!0}),s=o.createImageData(n,n),c=new Float32Array(n*n);for(let e=0;e<n;e++){let t=e/n;for(let i=0;i<n;i++){let a=i/n,o=(e*n+i)*4,l=J(r,a,t,1,1,9)*.6+J(r,a,t,2,2,41)*.4,u=J(r,a,t,3,3,77)*.5+.5,d=Z(.45,.88,1-(l*.5+.5));c[e*n+i]=.5+l*.12,$.setHSL(.535+l*.015,.055+d*.06,.37-d*.27+u*.03),s.data[o]=$.r*255,s.data[o+1]=$.g*255,s.data[o+2]=$.b*255,s.data[o+3]=255}}o.putImageData(s,0,0);let l=n/256;for(let e=0;e<10;e++){let e=i()*n,t=i()*n,r=(38+i()*38)*l,a=(10+i()*14)*l;o.globalAlpha=.22+i()*.2,Ea(o,n,()=>{o.translate(e,t),o.rotate(.6),o.scale(r,a);let n=o.createRadialGradient(0,0,0,0,0,1);n.addColorStop(0,`rgba(232,238,242,1)`),n.addColorStop(1,`rgba(232,238,242,0)`),o.fillStyle=n,o.beginPath(),o.arc(0,0,1,0,Math.PI*2),o.fill()})}o.lineCap=`round`;function u(e,t,r,a,s){let c=[e],d=[t];for(let n=0;n<a;n++){r+=(i()-.5)*.65;let n=(22+i()*14)*l;e+=Math.cos(r)*n,t+=Math.sin(r)*n,c.push(e),d.push(t)}if(Ea(o,n,()=>{o.strokeStyle=Ta(.58,.1,.36),o.lineWidth=s+1.8*l,o.globalAlpha=.3,o.beginPath(),o.moveTo(c[0],d[0]);for(let e=1;e<c.length;e++)o.lineTo(c[e],d[e]);o.stroke(),o.strokeStyle=Ta(.575,.05,.9),o.lineWidth=s,o.globalAlpha=.86,o.beginPath(),o.moveTo(c[0],d[0]);for(let e=1;e<c.length;e++)o.lineTo(c[e],d[e]);o.stroke(),o.globalAlpha=1}),a>3&&i()<.35){let e=Math.atan2(d[2]-d[1],c[2]-c[1]);u(c[2],d[2],e+(i()<.5?.8:-.8),2,s*.45)}}for(let e=0;e<3;e++)u((e+.2+i()*.5)/3*n,i()*n,e*2.1+i()*.6,6,(2.6+i()*.8)*l);o.globalAlpha=1;let d=o.getImageData(0,0,n,n),f=new Uint8ClampedArray(d.data);for(let e=0;e<n*n;e++){let t=Z(.72,.9,(f[e*4]*.3+f[e*4+1]*.45+f[e*4+2]*.25)/255);f[e*4+3]=Q(.1+t*.72,.05,1)*255}return{albedo:Ji(f,n,{srgb:!0,anisotropy:t}),normal:Yi(c,n,.8,t)}}function Aa(e,t,n=null){let r=S(256),i=new de({random:Zi(e)}),a=new Uint8ClampedArray(r*r*4),o=new Float32Array(r*r);for(let e=0;e<r;e++){let t=e/r;for(let n=0;n<r;n++){let s=n/r,c=(e*r+n)*4,l=J(i,s,t,2,3,19)*.6+J(i,s,t,5,7,47)*.4,u=J(i,s,t,23,23,83)*.5+.5,d=l*.5+.5,f=Z(.6,.9,1-d);$.setHSL(.545-d*.035,.3+f*.1-u*.05,.135+d*.075-f*.05+u*.025),a[c]=$.r*255,a[c+1]=$.g*255,a[c+2]=$.b*255,a[c+3]=(.1+u*.035)*255,o[e*r+n]=l*.075+(u-.5)*.003}}return _a(a,n),{albedo:Ji(a,r,{srgb:!0,anisotropy:t}),normal:Yi(o,r,1,t)}}function ja(e,t,n=null){let r=S(256),i=new de({random:Zi(e)}),a=Zi(e^23117),o=[];{let e=0;for(;e<r;){let t=a()<.16,n=t?4+a()*6:34+a()*76;o.push({y0:e,y1:e+n,marker:t,tone:a(),hueJ:a(),hard:a()}),e+=n}}function s(e){for(let t of o)if(e>=t.y0&&e<t.y1)return t;return o[o.length-1]}let c=new Uint8ClampedArray(r*r*4),l=new Float32Array(r*r);for(let e=0;e<r;e++)for(let t=0;t<r;t++){let n=t/r,a=e/r,o=e*r+t,u=o*4,d=J(i,n,a,2,2,7)*2.2+J(i,n,a,6,6,33)*.8,f=((e+d)%r+r)%r,p=s(f),m=(f-p.y0)/Math.max(1,p.y1-p.y0),h=1-Q(Math.min(f-p.y0,p.y1-f)/3.2,0,1),g=J(i,n,a,38,38,61)*.5+.5,_=J(i,n,a,13,13,99)*.5+.5,v=J(i,n,a*.15,3,1,145)*.5+.5,y=.062+p.hueJ*.022-.006*_,b=.33+p.hueJ*.08-g*.06,x=p.marker?.185+p.tone*.05:.315+p.tone*.2+(m-.5)*.03+g*.05+(v-.5)*.07;x*=1-h*.38,$.setHSL(y,Q(b,0,1),Q(x,.04,.75)),c[u]=$.r*255,c[u+1]=$.g*255,c[u+2]=$.b*255;let S=.4+p.hard*.42+g*.1-(p.marker?.26:0);S-=h*.3,l[o]=Q(S,0,1),c[u+3]=Q(.86-g*.06,.45,1)*255}return _a(c,n),{albedo:Ji(c,r,{srgb:!0,anisotropy:t}),normal:Yi(l,r,2.6,t)}}function Ma(e,t,n,r=null,i=1){let a=Na(e,t,n,r,i),o=a.next();for(;!o.done;)o=a.next();return o.value}function*Na(e,t,n,r=null,i=1){let a=S(256),o=new de({random:Zi(e)}),s=new Uint8ClampedArray(a*a*4),c=new Float32Array(a*a),l=2;for(let e=0;e<a;e++){let n=e/a;for(let r=0;r<a;r++){let u=r/a,d=e*a+r,f=d*4,p=.9,m=.5;if(t===`rock`){let e=J(o,u,n,3,3,17)*.5+.5,t=1-Math.abs(J(o,u,n,6,6,41)),r=1-Math.abs(J(o,u,n,15,15,8)),i=Z(.86,.985,t*.62+r*.38);m=.72-i*.62+(e-.5)*.34,$.setHSL(.082,.055+e*.035,(.4+e*.14)*(1-i*.45)),p=.76+i*.12-e*.06,l=3}else{let e=J(o,u,n,3,3,29)*.5+.5,t=J(o,u,n,42,42,13)*.5+.5,r=Z(.56,.76,e);m=e*.55+t*.18-r*.28+.25,$.setHSL(.068,.27-r*.12,.145+(1-r)*.075+t*.028),p=.84-r*.1,l=1.5}m=Q(m,0,1),c[d]=m;let h=.72+.28*m;s[f]=$.r*h*255,s[f+1]=$.g*h*255,s[f+2]=$.b*h*255,s[f+3]=Q(p*i,.45,1)*255}(e&7)==7&&(yield)}return _a(s,r),{albedo:Ji(s,a,{srgb:!0,anisotropy:n}),normal:Yi(c,a,l,n)}}function Pa(e,t,n=null,i=null,a=null){let o=t.village,s=t.terrain.villageWear===`activity-patches`,c=S(512),u=c/X,f=X/256;function p(){if(!n)return null;let e=new Float32Array(257*257);for(let t=0;t<257;t++)for(let r=0;r<257;r++)e[t*257+r]=Q(n(r*f-Y,t*f-Y),0,1);return e}let g=p();function _(e,t){let n=g;if(!n)return 0;let r=Q((e+Y)/f,0,255.9999),i=Q((t+Y)/f,0,255.9999),a=r|0,o=i|0,s=r-a,c=i-o,l=o*257+a,u=n[l]+(n[l+1]-n[l])*s;return u+(n[l+257]+(n[l+257+1]-n[l+257])*s-u)*c}let v=new Float32Array(c*c).fill(1e9);function y(){for(let e of t.roads)for(let t=0;t<e.length-1;t++){let[n,r]=e[t],[i,a]=e[t+1],o=Q(Math.floor((Math.min(n,i)-14+Y)*u),0,c-1),s=Q(Math.ceil((Math.max(n,i)+14+Y)*u),0,c-1),l=Q(Math.floor((Math.min(r,a)-14+Y)*u),0,c-1),d=Q(Math.ceil((Math.max(r,a)+14+Y)*u),0,c-1);for(let e=l;e<=d;e++)for(let t=o;t<=s;t++){let{d:o}=ua((t+.5)/u-Y,(e+.5)/u-Y,n,r,i,a),s=e*c+t;o<v[s]&&(v[s]=o)}}}y();let b=new Uint8ClampedArray(c*c*4);function x(t,n,r,i){let a=v[r];if(a>=13)return;let o=sr(a,e.noise(t*.055,n*.055)*.8+e.noise(t*.21,n*.21)*.35,e.noise(t*.011+41,n*.011-17)*1.5,1/u);b[i]=o*255,b[i+1]=Math.max(0,1-a/12)*255}function C(e,n){return i?i(e,n):k(t.marshes,t.lakes,e,n)}function w(t,n,r){let i=Math.max(o.x0-t,t-o.x1,0),a=Math.max(o.z0-n,n-o.z1,0),s=1-Z(0,26,Math.hypot(i,a));if(s<=0)return;let c=.45+.55*(e.noise(t*.045-19,n*.045+8)*.5+.5);b[r+3]=s*c*.8*255}function T(){for(let e=0;e<c;e++){let t=(e+.5)/u-Y;for(let n=0;n<c;n++){let r=(n+.5)/u-Y,i=e*c+n,a=i*4;x(r,t,i,a),b[a+2]=(g?_(r,t):C(r,t))*255,(!s||b[a]||b[a+2])&&w(r,t,a)}}}T(),t.terrain.hardstands?.length&&ir(t.terrain.hardstands,b,c,X),a!==null&&Xr(b,v,c,X,a),t.terrain.workedGround?.length&&ti(b,c,X,t.terrain.workedGround,e);let E=new r(new Uint8Array(b.buffer),c,c,l);return E.flipY=!1,E.wrapS=E.wrapT=m,E.minFilter=h,E.magFilter=d,E.generateMipmaps=!0,E.anisotropy=4,E.needsUpdate=!0,E}function Fa(e){let t=ya,{a:n,b:r}=ba(),i=new Uint8ClampedArray(t*t*4);for(let e=0;e<t*t;e++)i[e*4]=(n[e]*.5+.5)*255,i[e*4+1]=(r[e]*.5+.5)*255,i[e*4+2]=128,i[e*4+3]=255;return Ji(i,t,{anisotropy:16})}function Ia(e,t,n){let r=e.replace(t,n);if(r===e)throw Error(`world/terrain: shader anchor missing: ${t}`);return r}var La=`
varying vec3 vWPos;
varying vec3 vWNormal;
uniform sampler2D uAlbG, uAlbD, uAlbR, uAlbM;
uniform sampler2D uNrmG, uNrmD, uNrmR, uNrmM;
uniform sampler2D uMask, uNoise;
uniform vec3 uTintA, uTintB, uTintC, uRoadTint;
uniform float uMarshGloss;
uniform float uMicroAmp, uStrata, uRoadTex, uTownWear, uWornDirtStrength, uShoulderDirt, uLaneK, uIceDrift, uMidRelief, uFieldPatch;
uniform vec4 uRipple; // xy = wind dir, z = ripple amplitude, w = shore-only
uniform float uSandMacro; // r3: desert macro variation (gravel basins / scour sheets)
uniform vec3 uIceSky;     // r3: fresnel sky tint reflected by clear lake ice
uniform float uMidFar;    // r3: far edge of the mid-relief dapple band (m)
uniform float uRockGate;  // r6: 1 = slope-rock takeover keyed to the mask-B landform weight (desert mesas)
uniform float uSea;       // maps r1: 1 = M layer is OPEN WATER (sea/river), 0 = legacy mud/ice
uniform float uSeaFoam;   // maps r1: surf/whitecap strength (0 disables)
uniform vec2 uSeaRamp;    // maps r1: fM band that ramps to open water (sea wide, river tight)
vec3 gSplatAlbedo; float gSplatRough; vec3 gSplatNrm; float gSplatFar; float gSplatSteepAtt;
float gSeaFoam; // maps r1: foam coverage this fragment (mattes the water gloss)
// r7 axis-triplanar wall basis (set in splatCompute): two FIXED world-axis
// projections + a pow-sharpened blend weight. The r6 tangent projection built
// its U axis from the interpolated normal — on undulating cliff walls that
// frame rotated per-fragment, dragging the sample coordinate back and forth
// across the face (the melted-taffy smear on the desert mesas).
vec2 gWallUVx; vec2 gWallUVz; vec2 gWallSigns; float gWallW;
float gTileMix; // r8 anti-tiling: stochastic rotation-blend weight (set in splatCompute)
float gCliffJ;  // r8: per-cliff jitter field (set with the wall basis)
vec4 splatSamp(sampler2D t, vec2 uv, float df, float mb) {
  vec4 nearS = texture2D(t, uv, mb);
  if (df < 0.004) return nearS;
  // r5 terrain_environment: the far variant re-samples the SAME hand-painted
  // blade-stroke sheet at 0.2317x scale — its 7-12 px curved strokes became
  // half-meter Van Gogh brush swirls across the whole 45-160 m band (the
  // "painterly swirl" critique on the player_view midfield). A constant
  // +1.6 mip bias melts the stroke shapes into isotropic tonal breakup while
  // the macro clump variation the far variant exists for survives.
  // Keep resolved mid-range albedo grains; retain the former horizon blur.
  // This reuses the same fetch rather than adding another detail octave.
  vec4 farS = texture2D(t, uv * 0.2317 + vec2(0.5), mb + mix(0.85, 1.6, min(mb * 0.5, 1.0)));
  // r8: past the mid ring, ease the far variant toward its tile MEAN (deep
  // mip). The 16x anisotropic sampler otherwise keeps the ~18 m repeat's
  // blade/clod features crisp to the horizon, where they resolve as periodic
  // stipple rows on bright sand/snow albedo (mb tracks farM: 0 inside 90 m,
  // 2 by 330 m -> mean weight 0..0.66).
  // r6: mean weight floor 0.18 -> 0.30 — the far variant's 2-6 m macro blobs
  // repeated on the 18 m tile grid as a visible mottled-blotch print across
  // the 50-150 m midground (critique); softer far contrast + the uncorrelated
  // octave in splatCompute carry that band instead
  farS = mix(farS, texture2D(t, uv * 0.2317 + vec2(0.5), 6.0), min(0.24 + mb * 0.30, 0.64));
  return mix(nearS, farS, df);
}
// r8 anti-tiling ground samplers: every ground layer tiles at ONE fixed world
// period (4.2 m near / 18 m far variant) — from the establishing camera the
// repeats compress into periodic stipple ROWS and the far variant's macro
// blobs stamp a hard-edged patchwork grid (worst on the winter snow set).
// Blend a second sampling of the SAME texture, rotated ~42 deg and rescaled
// x1.16 with an offset, masked by the warped ~10-20 m noise patches (n1w):
// no world-periodic feature survives more than ~one tile in any direction.
const mat2 TILEROT = mat2(0.7431, 0.6691, -0.6691, 0.7431);
// Fixed heightfield chart. Camera/normal-derived axes move pigment across a
// stationary surface. Its sampled normal must return to the world-XZ frame
// used by the existing terrain normal accumulator, via this chart's transpose.
vec2 groundChartUv(vec2 xz) {
  return vec2(TILEROT[0].x * xz.x + TILEROT[1].x * xz.y,
              TILEROT[0].y * xz.x + TILEROT[1].y * xz.y);
}
vec2 groundChartNormalXZ(vec2 encoded) {
  float u = encoded.x * 2.0 - 1.0;
  float v = encoded.y * 2.0 - 1.0;
  return vec2(TILEROT[0].x * u + TILEROT[0].y * v,
              TILEROT[1].x * u + TILEROT[1].y * v);
}
vec4 groundSamp(sampler2D t, vec2 uv, float df, float mb) {
  vec4 sA = splatSamp(t, uv, df, mb);
  vec4 sB = splatSamp(t, TILEROT * uv * 1.16 + vec2(0.37, 0.61), df, mb);
  return mix(sA, sB, gTileMix);
}
// normal-map variant: the rotated sample's tangent-space xy must be counter-
// rotated back into the world frame or its bump lighting points 42 deg off
vec4 groundNrm(sampler2D t, vec2 uv, float df, float mb) {
  vec4 sA = splatSamp(t, uv, df, mb);
  vec4 sB = splatSamp(t, TILEROT * uv * 1.16 + vec2(0.37, 0.61), df, mb);
  vec2 nB = sB.xy * 2.0 - 1.0;
  sB.xy = vec2(0.7431 * nB.x + 0.6691 * nB.y, -0.6691 * nB.x + 0.7431 * nB.y) * 0.5 + 0.5;
  // Packed detail uses world X,Z,Y, not the normal texture's unused blue.
  // A horizontal projection has no vertical perturbation.
  sA.z = 0.5; sB.z = 0.5;
  return mix(sA, sB, gTileMix);
}
// Each wall projection has a different horizontal tangent, but both V axes
// point down world Y. Transform before blending: mixing encoded texture
// normals first incorrectly sends vertical wall relief along world Z.
vec3 wallNormalDelta(vec2 xNormal, vec2 zNormal) {
  vec2 nx = xNormal * 2.0 - 1.0;
  vec2 nz = zNormal * 2.0 - 1.0;
  return vec3(-gWallSigns.y * nz.x * gWallW,
    gWallSigns.x * nx.x * (1.0 - gWallW), -mix(nx.y, nz.y, gWallW));
}
vec4 wallNrm(sampler2D t, float sc, float df, float mb) {
  vec4 sx = splatSamp(t, gWallUVx * sc, df, mb);
  vec4 sz = splatSamp(t, gWallUVz * sc, df, mb);
  return vec4(wallNormalDelta(sx.xy, sz.xy) * 0.5 + 0.5, mix(sx.a, sz.a, gWallW));
}
vec4 wallSamp(sampler2D t, float sc, float df, float mb) {
  return mix(splatSamp(t, gWallUVx * sc, df, mb), splatSamp(t, gWallUVz * sc, df, mb), gWallW);
}
vec3 wallTex(sampler2D t, float sc) {
  return mix(texture2D(t, gWallUVx * sc).xyz, texture2D(t, gWallUVz * sc).xyz, gWallW);
}
float wallNoiseG(float sc, vec2 off) {
  return mix(texture2D(uNoise, gWallUVx * sc + off).g, texture2D(uNoise, gWallUVz * sc + off).g, gWallW);
}
void splatCompute() {
  vec3 wp = vWPos;
  vec3 wn = normalize(vWNormal);
  vec2 mUV = (wp.xz + 512.0) * (1.0 / 1024.0);
  vec4 mk = texture2D(uMask, mUV);
  // r6 terrain_environment: on landform-gated maps (desert) the mask B
  // channel carries the MESA/RIM weight instead of marsh/ice — decode it and
  // zero the marsh weight so none of the wet/ice paths fire on sand.
  float mkB = mk.b;
  float rockGate = 1.0;
  if (uRockGate > 0.5) {
    rockGate = smoothstep(0.10, 0.45, mkB);
    mkB = 0.0;
  }
  float camDist = distance(wp, cameraPosition);
  // FOV-aware detail distance: meters-per-pixel footprint normalized to the
  // 60-deg/1080p arcade view, so x8 sniper zoom re-resolves near-scale
  // detail instead of magnifying the blurred far variant (hud_ui r2).
  // min() keeps wide establishing shots byte-identical (footprint >= camDist
  // there); only narrow-FOV (zoomed) frames take the shorter effective
  // distance.
  float effDist = min(camDist, length(fwidth(wp.xz)) * 935.0);
  float df = smoothstep(45.0, 160.0, effDist);
  float farM = smoothstep(90.0, 330.0, effDist);
  // detail fade: positive mip bias at range kills the single-frequency
  // speckle shimmer that anisotropic filtering keeps resolving
  float mipB = farM * 2.0;
  vec2 uv = wp.xz;
  float n1 = texture2D(uNoise, uv * 0.0117).r;
  float n1h = texture2D(uNoise, uv * 0.047).r; // high-freq edge breaker
  float n2 = texture2D(uNoise, uv * 0.0031 + vec2(0.41, 0.13)).g;
  // r6 DOMAIN WARP for every macro-variation threshold below: thresholding
  // the bilinear-filtered 256px noise texture directly bakes axis-aligned
  // staircase borders into the dirt/meadow patches (the checkerboard blotch
  // artifact at 10-40 m). Warping the sample coordinates by a smooth low-
  // frequency vector field makes every patch border organic. CPU twin:
  // sampleSplatNoise in this file MUST keep the same warp so vegetation
  // thinning stays aligned with the visible dirt.
  vec2 wOff = (texture2D(uNoise, uv * 0.0009 + vec2(0.53, 0.17)).rg - 0.5) * 48.0;
  vec2 uvW = uv + wOff;
  float n1w = texture2D(uNoise, uvW * 0.0117).r;
  float n2w = texture2D(uNoise, uvW * 0.0031 + vec2(0.41, 0.13)).g;
  // r8: rotation-blend mask for the anti-tiling ground samplers — the warped
  // ~10-20 m n1w patches are aperiodic at exactly the scale the detail tiles
  // repeat, so neither sampling's period can line up across more than a tile
  gTileMix = smoothstep(0.36, 0.64, n1w);
  float slope = 1.0 - clamp(wn.y, 0.0, 1.0);
  // distance-attenuated edge breaker: full crispness near the camera, eased
  // toward its mean at range so the road blend never shows dither stipple
  // at 50-100 m
  float n1hs = mix(n1h, 0.5, farM * 0.85);
  // road masks: crisp noise-broken compacted core + wider soft dirt shoulder
  // road pass 2026-09-12: G decodes to metres from the road centreline. The
  // compacted core ends on an analytic, noise-wobbled gauge; the twin wheel
  // lanes sit 1.55 m either side of the centre; the crown is the dusty strip
  // between them. Everything below that used to read the 2 m-texel Gaussian
  // lane bytes now reads these continuous profiles instead.
  float dRoad = (1.0 - mk.g) * 12.0;
  float roadHalf = 3.85 + (n1hs - 0.5) * 1.1 + (n2 - 0.5) * 1.5;
  float roadCore = 1.0 - smoothstep(roadHalf - 0.55, roadHalf + 0.55, dRoad);
  float shoulder = smoothstep(0.04, 0.60, mk.r + (n1hs - 0.5) * 0.20);
  float laneD = (dRoad - 1.55) * uLaneK;
  // uLaneK == 0 marks a coarse (4 m) mask: one bead-free compaction plateau.
  float lane = uLaneK > 0.0 ? exp(-laneD * laneD) : 1.0 - smoothstep(2.6, 3.6, dRoad);
  float rutAmp = (0.62 + 0.38 * n1hs) * (0.62 + 0.38 * n1);
  float rut = lane * roadCore * rutAmp;
  float crown = (1.0 - smoothstep(0.0, 1.25, dRoad)) * roadCore;
  // r7: the road mask is an XZ projection — where a road runs along a mesa
  // rim it painted its compacted-earth tint DOWN the cliff face below as a
  // vertical light streak; no road holds on a >30-deg face
  {
    float notCliff = 1.0 - smoothstep(0.28, 0.45, slope);
    roadCore *= notCliff; shoulder *= notCliff; rut *= notCliff;
  }
  // dirt patches: noise-broken threshold => small worn patches with ragged
  // edges instead of giant airbrushed smears. r6: warped samples + slightly
  // softer band — the hard 0.62-0.78 step on unwarped texels was the
  // axis-aligned checkerboard tell beside the player tank
  // r4 terrain_environment: worn band widened (0.60-0.82 -> 0.55-0.80) and
  // weight 0.62 -> 0.74 — the gameplay-camera near field read as one uniform
  // green noise carpet with "no macro albedo variation" (critique); more
  // visible dirt/dry-patch breakup is the cheapest macro signal at 5-60 m
  // r7: 0.74 -> 0.84 — bare-dirt splats must read as real ground breakup
  // between the road decals (ground-cover critique), not a faint stain
  float worn = smoothstep(0.55, 0.80, n2w + (n1w - 0.5) * 0.45);
  // Coastal D doubles as pale beach sand: inland worn turf uses less of it.
  // Keep road/town coverage independent and raw worn aligned with grass scatter.
  // map pass 2026-09-12: uShoulderDirt scales the bare shoulder so snow passes
  // keep white verges beside a packed road instead of a 10 m mud slash.
  float fD = clamp(max(worn * uWornDirtStrength, max(shoulder * uShoulderDirt, mk.a * uTownWear * (0.35 + 0.65 * n1))), 0.0, 1.0);
  float fM = mkB;
  // marsh/ice sheets only live on near-flat ground: without this the graded
  // banks around a frozen lake inherit the sheet's glossy blue ice response
  // and read as icy walls — anything steeper than ~10 deg is snow bank
  fM *= 1.0 - smoothstep(0.03, 0.08, slope);
  // >>> maps r1 (ADDITIVE, uSea-gated — uSea is 0 on every pre-existing map,
  // so fMs == fM and everything below is bit-identical there). Open-water
  // mode splits fM's wide shore ramp into: a bare sand/mud apron (seaSand,
  // fed from the D layer), a surf waterline, and the open-water weight fMs.
  gSeaFoam = 0.0;
  float fMs = fM;
  float seaSand = 0.0;
  if (uSea > 0.5) {
    fMs = smoothstep(uSeaRamp.x, uSeaRamp.y, fM);
    seaSand = smoothstep(0.02, uSeaRamp.x, fM) * (1.0 - fMs);
  }
  // <<< maps r1 ---------------------------------------------------------------
  // r6 terrain_environment LANDFORM ROCK GATE (rockGate, decoded above): with
  // uRockGate on (desert), the slope-driven rock/sandstone takeover only
  // fires where the mask-B landform weight says the terrain IS mesa/rim rock.
  // Slope alone cannot tell a mesa wall from a dune slip face, so every steep
  // DUNE face used to inherit the BEDDED sandstone layer and print horizontal
  // terracing — the critique's "heightmap quantization" bands on the dunes.
  // Dunes now stay sand at any slope (the steep-sand ripple/grain pass below
  // carries their detail).
  // r5: breakup widened 0.07 -> 0.16 — the moderate-slope band used to hold
  // 30-60% rock alpha EVERYWHERE, dusting whole hill flanks with uniform
  // speckle fur; with stronger noise the same band resolves into distinct
  // rock outcrop patches separated by clean ground
  float fR = smoothstep(0.095, 0.235, slope + (n1 - 0.5) * 0.16) * rockGate;
  // rock takeover on steep faces: cliff walls and cut banks always read as
  // rock. r3: WIDE, noise-dithered band — the old razor 0.32-0.50 threshold
  // cut giant hard-edged maroon swaths diagonally across the dunes; the low-
  // freq n1 term wanders the boundary while n1hs keeps near-field raggedness
  fR = max(fR, smoothstep(0.28, 0.58, slope + (n1 - 0.5) * 0.10 + (n1hs - 0.5) * 0.08) * rockGate);
  // ...except inside marsh/ice sheet margins: lake banks are snow/soil
  // slumps, and the pale winter rock on them read as a glassy blue cliff
  // wall ringing the frozen lake
  fR *= 1.0 - mkB * 0.85;
  // r6: any face steep enough for the wall-plane projection below is FULLY
  // rock — partial-fR bands left the planar-projected sand layer showing
  // through mid-flank, and its UV stretch was the residual melted-wax smear
  // r8: 0.18-0.40 -> 0.14-0.34 (with the matching steepW change below) — the
  // 15-30 deg mesa flank band still held planar XZ sand UVs and its texture
  // stretched downslope as taffy; wall projection now owns faces from ~28 deg
  // r4 terrain_environment: 0.14-0.34 -> 0.20-0.42 — at 0.14 every moderate
  // DUNE flank flipped to the banded sandstone layer and carried its beds as
  // "pink contour marbling on sand" (desert critique). Rock now takes over
  // from ~37 deg; the 30-37 deg band stays sand (ripples own it).
  fR = max(fR, smoothstep(0.20, 0.42, slope) * (1.0 - mkB * 0.85) * 0.95 * rockGate);
  // triplanar side projection on steep faces: planar XZ UVs smear vertically
  // down cliff walls (the classic heightmap-stretch tell on the mesa cliffs)
  // — resample the rock layer in the wall's own plane and take it over as
  // the slope rises, so cliffs read as stratified rock instead of dragged
  // paint
  float steepW = smoothstep(0.20, 0.42, slope) * (1.0 - mkB * 0.85) * rockGate; // r4: tracks the fR band (marbling fix); r6: landform-gated
  // r7: SHARPENED AXIS TRIPLANAR replaces the r6 tangent projection. The
  // tangent frame was derived from the interpolated normal, so on undulating
  // walls it rotated per-fragment and the sample coordinate wandered — the
  // melted-taffy smear. Two fixed world-axis projections keep every texel
  // anchored in world space; pow(|n|,6) weights keep the crossover band on
  // diagonal faces narrow enough to be invisible on self-similar rock.
  {
    float wSx = pow(abs(wn.x) + 1e-5, 6.0);
    float wSz = pow(abs(wn.z) + 1e-5, 6.0);
    gWallW = wSz / (wSx + wSz);
    gWallSigns = sign(wn.xz);
    gWallUVx = vec2(wp.z * sign(wn.x), -wp.y);
    gWallUVz = vec2(-wp.x * sign(wn.z), -wp.y);
    // r8 per-cliff bed de-sync: the sandstone layer's bed sequence repeats
    // every ~6.5 m of altitude and every face at the same world height showed
    // the SAME stripes ("uniform synthetic strata on every cliff"). A slow
    // world-XZ field (constant down a vertical column, drifting along the
    // wall run) offsets the V coordinate and stretches bed thickness ±13%
    // per cliff, so bed sequences undulate and never sync between faces.
    float cliffJ = texture2D(uNoise, wp.xz * 0.0013 + vec2(0.57, 0.23)).g;
    float cliffJ2 = texture2D(uNoise, wp.xz * 0.0047 + vec2(0.91, 0.13)).r;
    float wallVScale = 0.87 + cliffJ * 0.26;
    float wallVOff = cliffJ * 9.7 + cliffJ2 * 2.3;
    gWallUVx.y = gWallUVx.y * wallVScale + wallVOff;
    gWallUVz.y = gWallUVz.y * wallVScale + wallVOff;
    gCliffJ = cliffJ;
  }
  // r5 terrain_environment: TRUE TRIPLANAR for the GROUND layers, decoupled
  // from the rock takeover. The 24-45 deg dune/mesa-flank band stayed sand
  // (fR/steepW only start at ~37 deg) but kept PLANAR XZ UVs — the 16x aniso
  // sampler dutifully resolved the 1/cos-stretched texels into long downslope
  // strands: the "vertical corduroy" striations on every desert dune face
  // (top critique item). From ~28 deg the base layer re-samples in the two
  // fixed wall planes (same texture, world-anchored), so steep sand reads as
  // bedded sand instead of dragged paint. MATERIAL choice keeps its own
  // thresholds; only the PROJECTION switches early.
  float triW = smoothstep(0.12, 0.30, slope);
  float projW = max(steepW, triW); // gate for every planar-projected extra
  vec4 a = groundSamp(uAlbG, uv * 0.240, df, mipB);
  vec4 n = groundNrm(uNrmG, uv * 0.240, df, mipB);
  // r5 anti-tiling: the ground texture's clump pattern repeats at ONE fixed
  // world scale, so every distance ring shows same-size dark blobs — the
  // "camo carpet" read. Re-sample the same layer at a ~2.3x coarser scale and
  // blend it in over ~35 m noise patches: the characteristic pattern scale
  // now wanders across the map instead of stamping uniformly.
  {
    float scMix = smoothstep(0.40, 0.78, texture2D(uNoise, uvW * 0.0071 + vec2(0.23, 0.51)).g);
    if (scMix > 0.003) {
      a = mix(a, groundSamp(uAlbG, uv * 0.1043, df, mipB), scMix * 0.7);
      n = mix(n, groundNrm(uNrmG, uv * 0.1043, df, mipB), scMix * 0.7);
    }
  }
  if (triW > 0.003) {
    a = mix(a, wallSamp(uAlbG, 0.240, df, mipB), triW);
    n = mix(n, wallNrm(uNrmG, 0.240, df, mipB), triW);
  }
  // dirt patches are an XZ-projected field — on slopes they compressed into
  // downslope smears ("dirt/grime streaks" critique); steep faces run clean
  fD *= 1.0 - triW * 0.7;
  a = mix(a, groundSamp(uAlbD, uv * 0.210, df, mipB), fD); n = mix(n, groundNrm(uNrmD, uv * 0.210, df, mipB), fD);
  if (seaSand > 0.003) { // maps r1: bare shoreline apron under the surf line
    a = mix(a, groundSamp(uAlbD, uv * 0.210, df, mipB), seaSand);
    n = mix(n, groundNrm(uNrmD, uv * 0.210, df, mipB), seaSand);
  }
  a = mix(a, groundSamp(uAlbM, uv * 0.190, df, mipB), fMs); n = mix(n, groundNrm(uNrmM, uv * 0.190, df, mipB), fMs);
  // rock layer: pre-blend planar/wall by triW so the partial-fR band (24-45
  // deg) never lays stretched planar rock over the triplanar sand
  {
    vec4 aR = groundSamp(uAlbR, uv * 0.155, df, mipB);
    vec4 nR = groundNrm(uNrmR, uv * 0.155, df, mipB);
    if (triW > 0.003) {
      aR = mix(aR, wallSamp(uAlbR, 0.155, df, mipB), triW);
      nR = mix(nR, wallNrm(uNrmR, 0.155, df, mipB), triW);
    }
    a = mix(a, aR, fR); n = mix(n, nR, fR);
  }
  // wall-coherent low-freq noise: the planar n2 field is near-degenerate down
  // a vertical face (grazing-angle gradient = wavy banding along cliff tops)
  float n2Wall = wallNoiseG(0.0031, vec2(0.41, 0.13));
  if (steepW > 0.001) {
    vec4 aS = wallSamp(uAlbR, 0.155, df, mipB);
    vec4 nS = wallNrm(uNrmR, 0.155, df, mipB);
    a = mix(a, aS, steepW);
    n = mix(n, nS, steepW);
  }
  // meadow macro variation, three scales (~80 m, ~230 m, ~600 m): dry-straw
  // patches, dark clover, and broad field-to-field tone shifts so open ground
  // never reads as one continuous green wash at any distance
  // r7 terrain_environment: meadowA is a TWO-SCALE composite. The single
  // 0.0121 sample of the 256-texel noise repeats every ~83 m and the dry-
  // straw patchwork visibly restamped on that period (critique: "mottle
  // pattern visibly repeats, ~50-70 m period"). A second incommensurate
  // scale (~128 m, other channel) breaks the period; CPU twin
  // (sampleSplatNoise) mirrors this exactly for grass/dirt correlation.
  float meadowA = texture2D(uNoise, uvW * 0.0121 + vec2(0.63, 0.29)).r * 0.62
                + texture2D(uNoise, uvW * 0.00779 + vec2(0.19, 0.71)).g * 0.38;
  float meadowB = texture2D(uNoise, uvW * 0.0043 + vec2(0.11, 0.87)).g;
  float meadowC = texture2D(uNoise, uvW * 0.0016 + vec2(0.37, 0.55)).r;
  // strength capped ~0.30-0.35 with n1 edge breakup so patch borders are
  // ragged at the ~10 m scale — full-strength smoothstep bands read as a
  // broken cloud-shadow projector in wide shots. DARK-CLOVER (uTintB, the
  // only darkening tint) capped at ~0.22 (lighting_post r1): stacked with
  // canopy shadows + grade contrast the old 0.34 max read as amorphous
  // dark masses / a broken cloud-shadow projector in battlefield.png.
  // r7: meadow tints are planar-projected — on cliff walls they stretched
  // into full-height tint stripes (a big taffy-smear contributor); gate them
  // off steep faces and let the wall macro octave below carry the variation
  float meadowG = (1.0 - fD) * (1.0 - projW) * (1.0 - fMs);
  // r4: tint strengths raised ~30% (A 0.22+0.18 -> 0.28+0.20, B 0.14+0.08 ->
  // 0.17+0.09, C 0.16+0.14 -> 0.21+0.16) — the macro dry-straw/clover fields
  // were too subtle to register from the chase camera and the ground read as
  // one continuous green wash (critique: "no macro albedo variation")
  // r7: band recentred for the two-scale composite's lower variance + one
  // more strength step — the dry-straw fields must read from the chase cam
  a.rgb = mix(a.rgb, a.rgb * uTintA, smoothstep(0.52, 0.80, meadowA) * (0.33 + 0.20 * n1) * meadowG);
  a.rgb = mix(a.rgb, a.rgb * uTintB, smoothstep(0.58, 0.85, 1.0 - meadowB) * (0.17 + 0.09 * n1) * meadowG);
  a.rgb = mix(a.rgb, a.rgb * uTintC, smoothstep(0.52, 0.9, meadowC) * (0.21 + 0.16 * n1) * meadowG);
  a.rgb *= mix(0.93 + meadowC * 0.14, 1.0, projW);
  // mid-frequency relief + mottle (25-450 m): stroke-free bump from the
  // SMOOTH noise field gradient (texture normals reused at giant scales read
  // as scratch marks), so the midground never collapses into smooth felt
  {
    // r3: far edge is per-map (uMidFar; desert extends it to ~820 m so the
    // dapple carries the open erg past the old 480 m cutoff)
    float dMid = smoothstep(20.0, 55.0, effDist) * (1.0 - smoothstep(uMidFar * 0.46, uMidFar, effDist));
    vec2 uvA = uv * 0.017;
    float ha = texture2D(uNoise, uvA).r;
    vec2 ga = vec2(texture2D(uNoise, uvA + vec2(0.006, 0.0)).r - ha,
                   texture2D(uNoise, uvA + vec2(0.0, 0.006)).r - ha);
    vec2 uvB = uv * 0.0052;
    float hb = texture2D(uNoise, uvB).g;
    vec2 gb = vec2(texture2D(uNoise, uvB + vec2(0.005, 0.0)).g - hb,
                   texture2D(uNoise, uvB + vec2(0.0, 0.005)).g - hb);
    // uMidRelief: per-map scale — bright low-sun sand turns this dapple into
    // a leopard-spot shadow field, so the desert runs it well under 1.0 and
    // leans on the anisotropic wind ripples for mid-frequency character.
    // This is landform relief, not road relief. Applying it to the compacted
    // carriageway made the smooth noise gradients behave like oversized
    // normal-map dents: black circular splotches remained even with CSM,
    // GTAO, tree shadows, and decals all disabled.
    // r5 terrain_environment: planar-noise dapple gated off slopes — its
    // gradient is meaningless down a face and printed streaks (corduroy kin)
    float dapG = (1.0 - triW * 0.85) * (1.0 - roadCore * 0.5); // 2026-09-12: half the landform dapple stays on the carriageway
    // These signed gradients are added before the final normal decode (x2).
    // Large gains made shallow turf look like crumpled metal. Soil relief
    // must also stop at the waterline: water owns its own wave normals.
    // terrain relief pass 2 (2026-09-12, owner: "flat, undetailed, less
    // textured than 1049e4e"): the 1049e4e midground ran this landform dapple
    // at 1.4 / 2.0; the later cut to 0.40 / 0.58 is what flattened the
    // 25-450 m band. Back to ~80 % of the reference, keeping the slope and
    // carriageway gates and the waterline stop the reference did not have.
    n.xy -= (ga * 1.1 + gb * 1.55) * dMid * uMidRelief * dapG * (1.0 - fMs);
    float midN2 = texture2D(uNoise, uv * 0.0089 + vec2(0.71, 0.23)).g;
    a.rgb *= 1.0 + ((ha - 0.5) * 0.09 * dMid
                 + (midN2 - 0.5) * 0.12 * smoothstep(30.0, 90.0, camDist)) * uMidRelief * dapG * (1.0 - fMs);
    // rock gets its own coarse relief so cliff faces stay craggy at range —
    // wall-plane sample takes over on steep faces (r5). Mix the SAMPLES, not
    // the coordinates: coordinate blending smeared diagonal fur across every
    // partially-steep slope.
    vec3 dnRa = vec3(texture2D(uNrmR, uv * 0.041).xy * 2.0 - 1.0, 0.0);
    vec3 dnRb = wallNormalDelta(texture2D(uNrmR, gWallUVx * 0.041).xy,
                              texture2D(uNrmR, gWallUVz * 0.041).xy);
    vec3 dnR = mix(dnRa, dnRb, steepW);
    n.xyz += dnR * fR * 0.6 * dMid * (1.0 - fMs); // relief pass 2: 0.24 -> 0.6 (1049e4e ran 0.9), craggy rock at range
  }
  // horizontal strata banding on steep faces (mesa cliff walls), world-Y driven
  // r4 terrain_environment: band start 0.24 -> 0.36 slope (~31 deg -> ~40 deg)
  // — moderate DUNE flanks fell inside the old band and carried the sin-bed
  // stripes as "pink contour-band marbling over the sand" (desert critique);
  // strata now live only on genuine cliff faces
  if (uStrata > 0.001) {
    float steep = smoothstep(0.36, 0.58, slope) * rockGate; // r6: beds only on real mesa rock
    // r7: bed phase warped by the WALL-plane noise, not planar n2 — planar
    // n2 is sampled at grazing angles down a vertical face, so its rapid
    // horizontal gradient sheared the beds into wavy taffy along cliff tops.
    // n2Wall drifts slowly ALONG the wall: beds wander gently, stay bedded.
    // r8: per-cliff frequency/phase modulation — the fixed 1.9/0.57 wp.y
    // frequencies printed the SAME band ladder on every face at equal
    // altitude ("uniform synthetic strata"); gCliffJ wanders the frequency
    // ±30% and slides the phase several radians per cliff, and the band
    // amplitude itself breathes so some faces are strongly bedded, others
    // nearly massive rock.
    float bedF = 0.76 + gCliffJ * 0.60;
    float band = sin(wp.y * 1.9 * bedF + n2Wall * 2.2 + gCliffJ * 9.3) * 0.55
               + sin(wp.y * 0.57 * bedF + n2Wall * 1.9 + gCliffJ * 5.1) * 0.45;
    a.rgb *= 1.0 + band * uStrata * steep * (0.65 + gCliffJ * 0.7);
    // pale caprock marker beds: wide constant-altitude stripes that survive
    // distance where the fine beds mip away
    float bed = smoothstep(0.55, 0.9, sin(wp.y * 0.23 * bedF + n2Wall * 1.1 + 0.8 + gCliffJ * 3.7));
    a.rgb = mix(a.rgb, a.rgb * vec3(1.16, 1.12, 1.04), bed * steep * 0.4);
    // r8 per-cliff color drift: warm iron-stained faces vs paler washed faces
    // r4: 0.5 -> 0.30 and flush 0.22 -> 0.12 — the stacked warm shifts were
    // the residual PINK cast in the marbled-cliff read
    a.rgb = mix(a.rgb, a.rgb * vec3(1.07, 0.985, 0.91), steep * gCliffJ * 0.30);
    a.rgb = mix(a.rgb, a.rgb * vec3(1.03, 0.95, 0.88), steep * 0.12); // baked iron-oxide faces
    // r7 macro-variation octave (wall-space): breaks the uniform band print
    // into distinct rock masses / weathered faces along the wall run
    float wallMac = wallNoiseG(0.011, vec2(0.19, 0.67));
    a.rgb *= 1.0 + (wallMac - 0.5) * 0.30 * steep;
  }
  // far-cliff detail rescue: the mip-biased macro fade flattens steep rock
  // faces past ~300 m into featureless sheets — re-project the rock layer at
  // a coarse world scale + its normals so distant mesa/cut walls stay craggy
  {
    float farRock = fR * farM;
    if (farRock > 0.003) {
      // wall-plane sample takes over on steep faces (r5). Mix SAMPLES, not
      // coordinates — coordinate blending smeared diagonal fur streaks across
      // every partially-steep slope (the gold "furry" mesa flanks).
      vec4 rr = vec4(mix(texture2D(uAlbR, uv * 0.031).rgb, wallTex(uAlbR, 0.031), steepW), 1.0);
      // LUMINANCE-only modulation at reduced strength (r3): the rgb multiply
      // compounded the rock tint with itself and saturated far walls toward
      // maroon; value-only variation keeps the crag without the color drift
      float rrL = dot(rr.rgb, vec3(0.36, 0.42, 0.22));
      a.rgb = mix(a.rgb, a.rgb * (0.80 + rrL * 0.40), farRock * 0.45);
      vec3 rnGround = vec3(texture2D(uNrmR, uv * 0.019).xy * 2.0 - 1.0, 0.0);
      vec3 rnWall = wallNormalDelta(texture2D(uNrmR, gWallUVx * 0.019).xy,
                                    texture2D(uNrmR, gWallUVz * 0.019).xy);
      vec3 rn = mix(rnGround, rnWall, steepW);
      // 0.55 (r5, was 0.9): under a low sun the full-strength coarse normals
      // rendered far flanks as glittery fur instead of crag
      n.xyz += rn * farRock * 0.22;
    }
  }
  // wind-aligned sand ripples: anisotropic normal waves instead of dot noise.
  // Two wavelengths: ~2 m gameplay-range ripples + ~11 m dune-face waves that
  // still resolve in establishing shots.
  // Coastal maps use grass as G and beach sand as D. Their wind ripples
  // belong only to the existing shore apron, not inland pasture/road dust.
  // Dry dune maps retain full coverage and their exact existing response.
  float sandCoverage = uRipple.w > 0.5 ? seaSand : 1.0;
  if (uRipple.z * sandCoverage > 0.001) {
    float rphase = dot(uv, uRipple.xy);
    // r8: the ~11 m dune-face wave now fades by 300 m (was 420) and its
    // amplitude is modulated by a ~150 m noise field — past ~300 m the sin
    // rows compressed to a few px apart and aliased into uniform horizontal
    // moire stripe rows across the whole midground (part of the desert
    // "stipple row" artifact); the modulation stops the surviving band from
    // printing one continuous corduroy field
    float rMod = 0.55 + 0.9 * texture2D(uNoise, uv * 0.0064 + vec2(0.83, 0.41)).g;
    float rw = (sin(rphase * 2.9 + texture2D(uNoise, uv * 0.019).r * 7.0)
                  * (1.0 - smoothstep(40.0, 150.0, camDist))
              + sin(rphase * 0.55 + texture2D(uNoise, uv * 0.006).g * 4.0) * 1.1
                  * (1.0 - smoothstep(110.0, 300.0, camDist)) * rMod)
              * uRipple.z * (1.0 - fR) * (1.0 - triW * 0.9) * (1.0 - fMs) * sandCoverage;
    n.xy += uRipple.xy * rw;
    // r3 terrain_environment: DUNE BEDFORMS that survive the establishing
    // shot. Both ripple octaves above die by 300 m, so the whole central
    // bowl rendered as one blown cream sheet from the wide camera. A ~26 m
    // wind-transverse wave carried in ALBEDO (normals mip away out there):
    // shadowed slip faces vs lit crests, amplitude wandering on a ~150-300 m
    // field so the waves read as dune trains, not corduroy. Ramps IN past
    // 60 m (the fine ripples own the near field) and never fades out.
    float bedPhase = rphase * 0.24 + texture2D(uNoise, uv * 0.0021 + vec2(0.19, 0.57)).g * 5.0;
    float bedMod = smoothstep(0.30, 0.72, texture2D(uNoise, uvW * 0.0035 + vec2(0.67, 0.23)).r);
    float bed = sin(bedPhase);
    float bedW = min(uRipple.z * 2.2, 1.0) * bedMod * (1.0 - fR) * (1.0 - roadCore)
               * (1.0 - triW) * smoothstep(60.0, 170.0, effDist) * (1.0 - fMs) * sandCoverage;
    // r4: 0.105 -> 0.15 — the dune trains must survive the establishing shot
    // (the mid-map otherwise reads as one blown "whipped cream" sheet)
    a.rgb *= 1.0 + bed * 0.15 * bedW;
    n.xy += uRipple.xy * bed * 0.55 * bedW;
    // r6 terrain_environment STEEP-SAND DETAIL: both planar ripple octaves
    // above are gated OFF steep faces (their planar UVs stretch), and with
    // the landform rock gate the dunes no longer borrow the sandstone layer
    // — so steep slip faces would render as bare smooth sand (the critique's
    // "near-textureless bright faces"). Re-project sand grain + avalanche
    // flow in the two fixed WALL planes (samples mixed, never coordinates):
    // fine granular normal, down-slope flow streak, and a gentle slip-face
    // albedo darkening so lit faces keep surface definition.
    float sandFaceW = triW * (1.0 - fR) * (1.0 - fMs) * sandCoverage;
    if (sandFaceW > 0.01) {
      vec3 wg1 = texture2D(uNrmG, gWallUVx * 0.55).xyz;
      vec3 wg2 = texture2D(uNrmG, gWallUVz * 0.55).xyz;
      vec3 wgn = wallNormalDelta(wg1.xy, wg2.xy);
      // r7: fade 320 -> 560 m — the 300-500 m dune flanks lost every detail
      // pass at once and any residual shading isoline printed bare (part of
      // the "terracing" read); the wall-plane grain now carries those faces
      n.xyz += wgn * 0.65 * sandFaceW * (1.0 - smoothstep(160.0, 560.0, effDist));
      // slope-aligned ripple detail on the same faces: anisotropic waves in
      // the wall frame (V = world height, so crests run along the contour —
      // real wind ripples on a slip face) mask any residual banding
      {
        float wRip = mix(sin(gWallUVx.y * 7.3 + texture2D(uNoise, gWallUVx * 0.05).r * 4.0),
                         sin(gWallUVz.y * 7.3 + texture2D(uNoise, gWallUVz * 0.05).r * 4.0), gWallW);
        float wRipW = sandFaceW * (1.0 - smoothstep(200.0, 620.0, effDist)) * 0.30;
        vec2 hDir = wn.xz / max(length(wn.xz), 1e-4); // fall-line in the map plane
        a.rgb *= 1.0 + wRip * 0.12 * wRipW;
        n.xy += hDir * wRip * wRipW;
      }
      // avalanche flow tongues: value streaks running down the fall line
      // (variation ALONG the wall run = vertical flow structure)
      float flow = mix(
        sin(gWallUVx.x * 1.7 + texture2D(uNoise, gWallUVx * 0.06).r * 5.0),
        sin(gWallUVz.x * 1.7 + texture2D(uNoise, gWallUVz * 0.06).r * 5.0), gWallW);
      float wgA = mix(texture2D(uAlbG, gWallUVx * 0.10, 1.0).g,
                      texture2D(uAlbG, gWallUVz * 0.10, 1.0).g, gWallW);
      a.rgb *= (1.0 + flow * 0.05 * sandFaceW) * (0.88 + wgA * 0.24 * sandFaceW + (1.0 - sandFaceW) * 0.12);
      a.rgb *= 1.0 - sandFaceW * 0.07; // slip-face definition vs the blown flats
    }
  }
  // r3 terrain_environment: desert macro sheet variation — the bowl between
  // the mesas was near-uniform pale cream at establishing range. Broad
  // (~120-400 m) warped fields: darker granular gravel-lag basins and pale
  // wind-scoured sheets, gated off rock/road so the landforms keep their own
  // material response.
  if (uSandMacro > 0.001) {
    float smA = texture2D(uNoise, uvW * 0.0024 + vec2(0.13, 0.83)).r;
    float smB = texture2D(uNoise, uvW * 0.0009 + vec2(0.77, 0.31)).g;
    float openW = (1.0 - fR) * (1.0 - roadCore) * (1.0 - projW) * uSandMacro * (1.0 - fMs);
    float gravelW = smoothstep(0.56, 0.82, smA + (n1 - 0.5) * 0.24) * openW;
    float grainG = texture2D(uNoise, uv * 0.11 + vec2(0.41, 0.09)).r;
    vec3 gravelCol = a.rgb * vec3(0.80, 0.755, 0.70) * (0.90 + grainG * 0.20);
    a.rgb = mix(a.rgb, gravelCol, gravelW * 0.8);
    a.a = mix(a.a, max(a.a, 0.92), gravelW * 0.5); // lag surfaces run matte
    float scourW = smoothstep(0.60, 0.90, smB) * openW * (1.0 - gravelW);
    a.rgb = mix(a.rgb, a.rgb * vec3(1.055, 1.035, 1.0), scourW * 0.55);
    // r6: brightest-texel shoulder — open sand at ~1.2+ linear tonemapped to
    // blown paper (critique: "bright sand faces partially blown out"); trim
    // only the top of the albedo range so texture survives the ACES shoulder
    float sandLum = dot(a.rgb, vec3(0.34, 0.42, 0.24));
    a.rgb *= 1.0 - smoothstep(0.60, 0.95, sandLum) * 0.10 * uSandMacro;
  }
  // r6 terrain_environment: UNCORRELATED mid-band octave. Every macro term
  // above keys off the SAME two noise fields (n1/n2 and their warps), and the
  // far-variant tile repeats at ~18 m — together the 50-150 m midground read
  // as one repeating mottled-blotch print (critique). A third pair of fields
  // at fresh offsets/scales (~34 m and ~13 m), band-limited to 35-260 m,
  // decorrelates the repeat without touching the near field.
  {
    float decoW = smoothstep(35.0, 90.0, effDist) * (1.0 - smoothstep(160.0, 260.0, effDist))
      * (1.0 - fM) * (1.0 - roadCore);
    if (decoW > 0.004) {
      float dcA = texture2D(uNoise, uv * 0.0293 + vec2(0.83, 0.07)).r;
      float dcB = texture2D(uNoise, uv * 0.0741 + vec2(0.29, 0.63)).g;
      a.rgb *= 1.0 + ((dcA - 0.5) * 0.11 + (dcB - 0.5) * 0.07) * decoW;
    }
  }
  // 0-48 m detail pass: layered micro normals + albedo speckle + road gravel
  float dNear = 1.0 - smoothstep(18.0, 48.0, camDist);
  if (dNear > 0.001) {
    vec3 dn = texture2D(uNrmD, uv * 1.07).xyz * 2.0 - 1.0;
    // Open soil benefits from clod-scale relief, but the same normal contains
    // isolated cavities that read as black potholes on a compacted road.
    // Keep every near-detail octave off the carriageway; the dedicated road
    // pass below supplies its own shallow, continuous surface response.
    float openNear = dNear * (1.0 - roadCore);
    // 2026-09-12 owner verdict ("everything looks flat"): open ground runs the
    // 1049e4e clod relief again (0.85 there, 0.70 here); the carriageway keeps
    // its own shallow packed-earth response below, so no source cavity is ever
    // decoded as a pothole on a road.
    n.xy += dn.xy * 0.85 * openNear * (1.0 - fMs); // relief pass 2 (2026-09-12): the full 1049e4e clod relief
    float micro = texture2D(uNoise, uv * 0.171).r;
    a.rgb *= 1.0 + (micro - 0.5) * 0.40 * openNear * uMicroAmp * (1.0 - fMs);
    // Compacted gravel grain on the carriageway: a CLAMPED zero-mean luminance
    // high-pass of the rock tile, so grit resolves under the hull while the
    // tile's dark cavities cannot return as repeated black marks.
    float gvL = dot(texture2D(uAlbR, uv * 0.83).rgb, vec3(0.34, 0.45, 0.21));
    float gvM = dot(texture2D(uAlbR, uv * 0.83, 6.0).rgb, vec3(0.34, 0.45, 0.21));
    a.rgb *= 1.0 + clamp((gvL - gvM) * 1.4, -0.16, 0.20) * roadCore * dNear * (1.0 - uRoadTex);
    // sub-10 m second octave: clod/blade relief right under the camera
    // r6 terrain_environment: band widened (5-15 -> 6-26 m) and the octave
    // now carries ALBEDO as well as normal — the 5-20 m meadow read as one
    // smeared macro-noise wash with "no visible detail" (critique). The
    // ~0.9 m re-projection of the ground layer is the blade/clod-scale
    // signal that resolves right in front of the hull.
    float dNear2 = 1.0 - smoothstep(6.0, 26.0, camDist);
    if (dNear2 > 0.001) {
      vec3 dn2 = texture2D(uNrmG, uv * 2.71).xyz * 2.0 - 1.0;
      float openNear2 = dNear2 * (1.0 - roadCore);
      // Detail belongs to the remaining base layer. Reapplying turf after
      // the dirt/rock blend made worked yards inherit the meadow's grain.
      // The same coverage also keeps base snow/sand off exposed soil/rock.
      float nearG = openNear2 * meadowG * (1.0 - fR);
      n.xy += dn2.xy * 0.75 * nearG; // relief pass 2 (2026-09-12): the full 1049e4e blade/clod relief
      // zero-mean albedo octave: deep-mip sample = local tile mean, so the
      // modulation is exposure-neutral on every map palette (sand vs turf)
      float gl2 = dot(texture2D(uAlbG, uv * 2.71).rgb, vec3(0.36, 0.42, 0.22));
      float glM = dot(texture2D(uAlbG, uv * 2.71, 6.0).rgb, vec3(0.36, 0.42, 0.22));
      a.rgb *= 1.0 + clamp((gl2 - glM) * 1.9, -0.28, 0.32) * nearG;
    }
  }
  {
    // compacted earth road: two-track profile — lightened compacted core,
    // dark wheel ruts, damp borders. uRoadTex (0..1) cross-fades to PAVED
    // town streets: the rock layer (cobble/sett) laid across the full
    // carriageway at every distance, ruts nearly gone.
    float dW = roadCore * 0.9 * (1.0 - uRoadTex);
    // Build the compacted core from a deliberately low-frequency dirt
    // sample. Keeping only a quarter of the underlying terrain preserves
    // local variation without baking the source texture's AO/cavity blobs
    // into what should read as one continuous, traffic-smoothed surface.
    // A deep mip provides the dirt palette without preserving any individual
    // source clod. Very-low-frequency noise restores gentle soil variation
    // without stamping round marks repeatedly down the road.
    vec3 packedRoad = groundSamp(uAlbD, uv * 0.210, df, mipB + 4.0).rgb;
    packedRoad *= 0.985 + (n2w - 0.5) * 0.035;
    vec3 roadCol = mix(packedRoad, a.rgb, 0.30) * uRoadTint
      + vec3(0.014, 0.010, 0.006);
    roadCol = mix(roadCol, vec3(dot(roadCol, vec3(0.34, 0.45, 0.21))), 0.26);
    a.rgb = mix(a.rgb, roadCol, dW);
    // The sourced dirt normal contains deep clod/pothole forms intended for
    // open ground. Repeating it at full strength down a road produced the
    // alternating chain of black ovals visible in Verdant. Use a strongly
    // mip-smoothed, shallow packed-earth normal for the road core; the mask
    // gradient below adds the authored wheel-rut relief afterwards.
    vec2 packedRoadN = groundNrm(uNrmD, uv * 0.210, df, mipB + 4.0).xy;
    packedRoadN = mix(vec2(0.5), packedRoadN, 0.30);
    n.xy = mix(n.xy, packedRoadN, dW);
    // Keep compacted wheel lanes legible without painting near-black marks
    // into the road albedo. The previous 55% dirt-road multiplier turned the
    // low-resolution rut mask into a repeating chain of oval stains on every
    // country-road map. Dirt now relies primarily on shallow normal relief;
    // paved roads retain a little more tonal wear.
    // road pass 2026-09-12: the two-track read is back (1049e4e ran 0.55/0.30)
    // now that the lanes are analytic and continuous: dark damp compacted
    // lanes that run slightly less rough, a paler dusty crown between them,
    // and the far boost that keeps the lanes legible once the tiles mip away.
    a.rgb *= 1.0 - min(rut * (1.0 + farM * 0.9), 1.0) * mix(0.34, 0.26, uRoadTex);
    a.a = mix(a.a, a.a * 0.86, rut * (1.0 - uRoadTex));
    a.rgb *= 1.0 + crown * 0.05 * (1.0 - uRoadTex);
    if (uRoadTex > 0.01) {
      // r5: HARDER pavement edge (0.10-0.26 with less noise wobble) — paved
      // town streets end at a kerb line, they do not alpha-fade into lawn.
      // Patch/repair tone variation breaks the uniform sett sheet.
      // r6: harder pavement edge (0.15-0.24, noise wobble halved) — the wide
      // noise-feathered 0.10-0.26 ramp read as water-eroded banks; a paved
      // street must end on a near-kerb line
      float paveCore = smoothstep(0.15, 0.24, mk.r + (n1hs - 0.5) * 0.025) * uRoadTex;
      vec4 pav = splatSamp(uAlbR, uv * 0.31, df, mipB);
      vec4 pnn = splatSamp(uNrmR, uv * 0.31, df, mipB);
      pnn.z = 0.5;
      float pvar = texture2D(uNoise, uv * 0.037 + vec2(0.77, 0.19)).r; // NB: "patch" is a reserved word in GLSL ES
      // r6: 0.86+0.26 -> 0.72+0.22 — the near-white sett sheet under a blue
      // sky ambient read as a frozen canal; darker worn stone keeps the
      // street below the facade value range
      pav.rgb *= 0.72 + smoothstep(0.35, 0.75, pvar) * 0.22;
      a.rgb = mix(a.rgb, pav.rgb * uRoadTint, paveCore * 0.94);
      a.a = mix(a.a, pav.a, paveCore * 0.85);
      n = mix(n, pnn, paveCore * 0.85);
      // gutter shading: a darkened seam just inside the pavement edge gives
      // the street a built profile even before the kerb geometry resolves
      float gutter = smoothstep(0.06, 0.20, mk.r) * (1.0 - smoothstep(0.22, 0.42, mk.r));
      a.rgb *= 1.0 - gutter * 0.18 * uRoadTex;
    }
  }
  // r4: 0.09 -> 0.16 + a dusty desaturation pull — road shoulders must read
  // as worn verge (tracked dirt spilling off the carriageway), not clean lawn
  // running flush to the wheel ruts (critique: "no decals along road edges")
  // r7: NOISE-RAGGED edge band + gravel spill — the road met the grass as
  // one uniform soft feather (decal-ecosystem critique); the worn verge now
  // breaks up on the ~6 m noise and scatters gravel speckle off the
  // carriageway shoulder
  float edgeBand = shoulder * (1.0 - roadCore) * (0.55 + 0.90 * n1hs);
  a.rgb *= 1.0 - edgeBand * 0.16;
  a.rgb = mix(a.rgb, vec3(dot(a.rgb, vec3(0.34, 0.45, 0.21))) * vec3(1.06, 1.0, 0.88), edgeBand * 0.22);
  {
    float gravSpill = shoulder * (1.0 - roadCore) * smoothstep(0.58, 0.9, n1h)
      * (1.0 - smoothstep(30.0, 90.0, effDist));
    if (gravSpill > 0.004) {
      vec4 gravE = texture2D(uAlbR, uv * 0.83);
      a.rgb = mix(a.rgb, gravE.rgb * vec3(1.02, 0.97, 0.88), gravSpill * 0.5);
    }
  }
  // wheel-lane relief and tyre streaks from the distance field: its gradient
  // is the across-road direction and the lane profile's analytic slope shapes
  // two smooth grooves, so a straight road carries no per-texel bumps.
  if (roadCore > 0.002) {
    float texel = 1.0 / 1024.0;
    vec2 gradD;
    gradD.x = texture2D(uMask, mUV - vec2(texel, 0.0)).g - texture2D(uMask, mUV + vec2(texel, 0.0)).g;
    gradD.y = texture2D(uMask, mUV - vec2(0.0, texel)).g - texture2D(uMask, mUV + vec2(0.0, texel)).g;
    gradD *= 6.0; // byte ramp over a 2 m baseline -> metres per metre, ~unit across the road
    float laneSlope = -2.0 * laneD * uLaneK * lane;
    n.xy += gradD * laneSlope * 0.14 * roadCore * rutAmp * (1.0 - df * 0.72);
    vec2 along = vec2(-gradD.y, gradD.x);
    float streak = texture2D(uNoise, vec2(dot(uv, along) * 0.31, dot(uv, gradD) * 2.7)).r;
    a.rgb *= 1.0 + (streak - 0.5) * 0.16 * max(lane, 0.35 * crown) * roadCore * (1.0 - df);
  }
  // wind-blown snow drifts across the ice sheet + snowbank shoreline blend
  // (maps r1: the whole sheet block reads fMs — identical to fM everywhere
  // uSea is 0, i.e. on every pre-existing map)
  float driftW = 0.0;
  if (uIceDrift > 0.001 && fMs > 0.02) {
    // macro ice re-projection: the detail ice layer tiles every ~5 m, so its
    // cracks/depth blotches average away by 150 m and the whole sheet read
    // as snowfield in establishing shots — overlay the same texture at a
    // ~75 m tile so pressure cracks and dark clear-ice patches survive at
    // range and the lake reads as ICE from the wide camera
    // LUMINANCE-only macro modulation (r5): multiplying the sheet by its own
    // RGB squared the blue saturation — the garish swimming-pool ellipse.
    // Value variation alone keeps the gray-white ice albedo authored in the
    // layer while the cracks/depth blotches still read at range.
    vec4 iceMacro = texture2D(uAlbM, uv * 0.0134);
    float iceLum = dot(iceMacro.rgb, vec3(0.30, 0.45, 0.25));
    // r6: macro contrast up (0.55+0.80 -> 0.45+1.00) so the 75 m-scale
    // pressure cracks and clear-ice fields dominate at range...
    // r4: 0.45+1.00 -> 0.36+1.18 — one more contrast step (see makeIceLayer)
    a.rgb = mix(a.rgb, a.rgb * (0.36 + iceLum * 1.18), fMs * 0.9 * (1.0 - uSea));
    // ...and DESATURATE the sheet with distance: the 5 m detail tile can only
    // resolve as blue salt-speckle from the establishing camera — pull the
    // far sheet toward a cool gray so it reads as one ice surface with crack
    // veins, not a blue static field
    float iceGrey = dot(a.rgb, vec3(0.30, 0.45, 0.25));
    a.rgb = mix(a.rgb, vec3(iceGrey) * vec3(0.965, 1.0, 1.05), fMs * farM * 0.6 * (1.0 - uSea));
    float drift = smoothstep(0.52, 0.78,
      texture2D(uNoise, uv * 0.021 + vec2(0.31, 0.77)).r + (n1h - 0.5) * 0.30);
    float bank = 1.0 - smoothstep(0.25, 0.75, fMs); // shoreline band drifts hardest
    driftW = clamp(drift * uIceDrift * (0.48 + bank * 0.52), 0.0, 1.0) * fMs;
    // maps r1: sand/mud shoals belong in the SHALLOWS — deep-water "drift"
    // read as pale mottling across the whole sheet (uSea=0: multiplier 1)
    driftW *= mix(1.0, 0.30 + bank * 0.70, uSea);
    if (uSea > 0.5) { // maps r1: open water "drifts" are sand shoals, not snow
      a = mix(a, groundSamp(uAlbD, uv * 0.210, df, mipB), driftW * 0.85);
      n = mix(n, groundNrm(uNrmD, uv * 0.210, df, mipB), driftW * 0.85);
    } else {
      a = mix(a, groundSamp(uAlbG, uv * 0.240, df, mipB), driftW);
      n = mix(n, groundNrm(uNrmG, uv * 0.240, df, mipB), driftW);
    }
    // r6: pressure ridges — concentric normal waves + a bright refrozen crest
    // following the shoreline contour (fM isolines via the mask-B gradient).
    // Real lake ice buckles against its banks; the flat noise disc was the
    // last tell. Ridges fade where snow drifts bury the sheet.
    float ridgeBand = smoothstep(0.08, 0.38, fMs) * (1.0 - smoothstep(0.55, 0.88, fMs))
      * (1.0 - uSea); // maps r1: pressure ridges are an ICE feature
    if (ridgeBand > 0.004) {
      float texelR = 2.0 / 1024.0;
      vec2 gM;
      gM.x = texture2D(uMask, mUV + vec2(texelR, 0.0)).b - texture2D(uMask, mUV - vec2(texelR, 0.0)).b;
      gM.y = texture2D(uMask, mUV + vec2(0.0, texelR)).b - texture2D(uMask, mUV - vec2(0.0, texelR)).b;
      float gl = length(gM);
      if (gl > 1e-5) {
        vec2 gd = gM / gl;
        // ~14 cycles across the shore ramp (the first 44 aliased into a
        // moire groove pattern from the establishing camera); n1 breaks the
        // ring phase so buckle lines wander instead of tracing isolines
        float ridge = sin(fMs * 14.0 + n1h * 2.2 + n1 * 4.0) * ridgeBand * (1.0 - driftW);
        n.xy += gd * ridge * 0.45;
        a.rgb *= 1.0 + max(ridge, 0.0) * 0.07;
      }
    }
    // r3 terrain_environment: FRESNEL sky sheen on clear ice — the sheet had
    // no view-dependent response at all and read as a flat blue stain. At the
    // near-grazing establishing camera the clear-ice fields now pick up the
    // cold sky tint (drifted snow stays matte), which together with the
    // lowered roughness floor below gives the lake a real ice identity.
    // (first cut at 0.55 toward a bright tint WASHED the sheet whiter than
    // the snow — the sheen must stay a cool mid-tone glaze over DARK ice)
    // r6 terrain_environment: BLUE DEPTH GRADIENT — the sheet read as one
    // flat single-tone disc (critique). Deep water under the interior ice
    // darkens and cools it; the drifted shore band stays snow-toned. Plus a
    // macro normal waviness from the ice layer's own normal map so the
    // fresnel/sun response breaks into streaks instead of one flat sheen.
    {
      float deepW = smoothstep(0.45, 0.95, fMs) * (1.0 - driftW);
      // maps r1: open water deepens toward a darker blue-green (uSea-gated);
      // ice keeps its pale blue depth cue
      vec3 deepTint = mix(vec3(0.74, 0.86, 1.05), vec3(0.34, 0.56, 0.66), uSea);
      a.rgb *= mix(vec3(1.0), deepTint, deepW * mix(0.5, 0.72, uSea));
      vec3 iceN = texture2D(uNrmM, uv * 0.0134).xyz * 2.0 - 1.0;
      n.xy += iceN.xy * mix(0.5, 0.04, uSea) * fMs * (1.0 - driftW);
    }
    {
      vec3 vDirIce = normalize(cameraPosition - wp);
      float fresI = pow(1.0 - clamp(dot(vDirIce, wn), 0.0, 1.0), 3.0);
      float clearIce = fMs * (1.0 - driftW);
      // r4: 0.30 -> 0.48 — the sheet still read as a matte pale splat from
      // the establishing camera; a stronger grazing sky sheen (plus the 0.14
      // roughness floor below) finally gives it a specular ice identity
      // lighting_post r4: 0.48 -> 0.62 — winter.js envIntensity dropped
      // 0.60 -> 0.32 to kill the albedo-independent pale wash on props; the
      // ice sheet keeps its DIRECTIONAL sheen by leaning harder on its own
      // fresnel term instead of the scene-wide env (ice vs snow separation).
      // maps r1: open water runs the sheen a step weaker than clear ice —
      // at establishing grazing angles the full 0.62 painted the whole
      // sea/river pale sky-grey (uSea=0 keeps the winter value exactly)
      // Liquid water should reflect the sky without becoming a white sheet.
      // The sea keeps the same draw path as ice, but uses a lower-energy
      // grazing glaze so the authored depth and chop remain visible.
      a.rgb = mix(a.rgb, uIceSky, fresI * clearIce * mix(0.62, 0.16, uSea));
    }
    // >>> maps r1 (uSea-gated): surf line + sparse whitecaps. The surf band
    // rides the RAW fM ramp (it peaks just shoreward of where fMs starts),
    // broken by two noise octaves so the foam edge is ragged, never a ring.
    if (uSea > 0.5 && uSeaFoam > 0.001) {
      // the surf band hugs the fMs waterline whatever ramp the map runs
      float surfBand = smoothstep(0.012, 0.10, fMs) * (1.0 - smoothstep(0.30, 0.62, fMs));
      float fno = texture2D(uNoise, uv * 0.045 + vec2(0.63, 0.17)).r * 0.55
                + texture2D(uNoise, uv * 0.17 + vec2(0.29, 0.83)).g * 0.45;
      float foam = surfBand * smoothstep(0.42, 0.78, fno + (n1h - 0.5) * 0.20) * uSeaFoam;
      float caps = fMs * smoothstep(0.87, 0.97, texture2D(uNoise, uvW * 0.031 + vec2(0.51, 0.07)).r)
                 * 0.45 * uSeaFoam * (1.0 - farM * 0.6);
      gSeaFoam = clamp(foam + caps, 0.0, 1.0);
      a.rgb = mix(a.rgb, vec3(0.68, 0.80, 0.84), gSeaFoam * 0.72);
    }
    // <<< maps r1 -------------------------------------------------------------
  }
  // r7: the unconditional macro term reads the PLANAR n2 field — degenerate
  // down vertical faces, it printed full-height value stripes (taffy smear);
  // steep faces take the wall-coherent sample instead
  a.rgb *= 0.90 + mix(n2, n2Wall, projW) * 0.20;
  // wet/dark shoreline band where ground meets a marsh or ice sheet: the
  // sheet blends into darkened damp banks instead of ending on a hard seam
  // maps r1: in open-water mode the damp band hugs the waterline instead of
  // spanning the whole beach apron (which would read as one wet smear)
  float shoreW = uSea > 0.5
    ? smoothstep(0.16, 0.36, fM) * (1.0 - smoothstep(0.48, 0.78, fM))
    : smoothstep(0.04, 0.30, fM) * (1.0 - smoothstep(0.55, 0.95, fM));
  a.rgb *= 1.0 - shoreW * 0.30 * (1.0 - driftW);
  // >>> terrain_environment r2: agrarian field patchwork + far turf relief. --
  // The 150-800 m band used to collapse into one smooth green wash (the bald
  // "gumdrop" midground hills behind the village): by 330 m every detail
  // layer is mip-faded flat and the soft meadow tints carry no structure.
  // (a) per-plot crop-tone variation on a ~92 m warped grid with darker
  //     field-margin lines (hedgerow/verge read from the air),
  // (b) straight mowing/crop strips inside each plot (~20 m pitch),
  // (c) a coarse re-projection of the grass layer's normal+albedo (same trick
  //     as the far-cliff rescue) so distant hills shade like turf-covered
  //     terrain instead of smooth clay.
  {
    // r4: band pulled in 70-150 -> 40-110 m — plowed/mowed field patches must
    // be visible from the gameplay camera, not only in establishing shots
    float fieldW = uFieldPatch * smoothstep(40.0, 110.0, effDist)
      * (1.0 - fD) * (1.0 - fM) * (1.0 - shoulder) * (1.0 - fR) * (1.0 - projW)
      * (1.0 - mk.a);
    if (fieldW > 0.004) {
      vec2 plotUv = uvW * (1.0 / 92.0);
      vec2 pid = floor(plotUv);
      float pr = texture2D(uNoise, pid * 0.1371 + vec2(0.29, 0.71)).r;
      float pg = texture2D(uNoise, pid * 0.2117 + vec2(0.61, 0.37)).g;
      // per-plot crop tone: hay-gold / dark clover / neutral pasture
      float cropSel = smoothstep(0.40, 0.72, pr);
      vec3 cropTint = mix(vec3(1.0),
        pg > 0.5 ? vec3(1.10, 1.04, 0.80) : vec3(0.84, 0.94, 0.82),
        cropSel * 0.55);
      a.rgb *= mix(vec3(1.0), cropTint, fieldW);
      // straight mowing strips: direction + pitch vary per plot
      float mAng = pr * 6.2832 + pg * 2.1;
      vec2 mdir = vec2(cos(mAng), sin(mAng));
      float strip = sin(dot(uv, mdir) * (0.24 + pg * 0.22));
      a.rgb *= 1.0 + strip * 0.05 * fieldW * (0.35 + cropSel);
      // darker margin line along plot borders
      vec2 fr2 = abs(fract(plotUv) - 0.5);
      float margin = smoothstep(0.44, 0.492, max(fr2.x, fr2.y));
      a.rgb *= 1.0 - margin * 0.10 * fieldW;
    }
    // coarse turf relief at range (all maps): the far band keeps macro
    // normal structure where the per-texel detail normals have faded out
    float farG = farM * (1.0 - fR) * meadowG * (1.0 - roadCore);
    if (farG > 0.003) {
      // Coarse turf is low relief, not another giant clod normal. Albedo
      // retains the source detail while the actual hills own broad shading.
      vec3 gnF = texture2D(uNrmG, uv * 0.021).xyz * 2.0 - 1.0;
      // 2026-09-12 visual restoration: 0.24 -> 0.45. The 1049e4e meadow ran
      // this coarse relief at 1.5 and read as turf to the horizon; 0.24 left
      // every far field a flat sheet. 0.45 keeps the relief without the
      // clod-normal shimmer the cut was made for.
      // relief pass 2 (2026-09-12): 0.45 -> 0.9 — halfway back to the
      // reference; the far fields still read as felt at 0.45.
      n.xy += gnF.xy * farG * 0.9;
      float gLum = dot(texture2D(uAlbG, uv * 0.0137).rgb, vec3(0.36, 0.42, 0.22));
      a.rgb *= mix(1.0, 0.86 + gLum * 0.30, farG * 0.55);
    }
  }
  // <<< terrain_environment r2 ------------------------------------------------
  // distant mottling: forest-floor/heather patches keep far hills from reading
  // as one flat green wash
  float mot = texture2D(uNoise, uv * 0.0022 + vec2(0.17, 0.71)).g;
  // r7: planar-projected far mottling gated off steep faces (vertical stripes)
  float motG = farM * (1.0 - projW);
  // r8: darkening 0.20 -> 0.13 with a wider, later ramp — at 0.20 the term
  // stamped muddy cloud-shadow blotches across mid-distance sand/meadow
  a.rgb *= 1.0 - motG * 0.17 * smoothstep(0.55, 0.95, mot);
  a.rgb *= 1.0 + motG * 0.17 * smoothstep(0.55, 0.85, n1) * (1.0 - smoothstep(0.48, 0.82, mot));
  // >>> grazing-view meadow detail. -----------------------------------------
  // The activation/LOD weights remain view-dependent; the sampled chart does
  // not. This fixed world-XZ chart is intended for heightfield meadow, not a
  // replacement for vertical-rock triplanar mapping. Hardware filtering owns
  // the grazing footprint instead of a moving counter-stretched texture axis.
  {
    vec3 vDirN = normalize(cameraPosition - wp);
    float dNV = saturate(dot(vDirN, wn));
    // r6 terrain_environment: band tightened 0.16-0.40 -> 0.07-0.22. The
    // rescue exists for NEAR-TANGENT chase views (dNV < ~0.1, where the 16x
    // aniso sampler genuinely runs out); at 0.40 it was still partially
    // active for the ~30-70 deg establishing camera and its counter-
    // stretched resample printed the directional "combed fabric" weave
    // across the 80-150 m midground (the mottled-blotch critique).
    float grazeW = (1.0 - smoothstep(0.07, 0.22, dNV))
                 * smoothstep(30.0, 70.0, camDist)
                 * (1.0 - smoothstep(320.0, 480.0, camDist))
                 * (1.0 - projW)
                 * (1.0 - fD) * (1.0 - fM) * (1.0 - roadCore) * (1.0 - fR);
    if (grazeW > 0.004) {
      vec2 uvG = groundChartUv(wp.xz);
      vec4 aG = splatSamp(uAlbG, uvG * 0.240, df, 0.0);
      vec4 nG = splatSamp(uNrmG, uvG * 0.240, df, 0.0);
      nG.z = 0.5;
      nG.xy = groundChartNormalXZ(nG.xy) * 0.5 + 0.5;
      // Pigment breakup shares the same stationary chart.
      float n1G = texture2D(uNoise, uvG * 0.0117).r;
      float n2G = texture2D(uNoise, uvG * 0.0031 + vec2(0.41, 0.13)).g;
      aG.rgb *= (0.88 + n1G * 0.18) * (0.94 + n2G * 0.12);
      // isotropic planar patch tone re-applied over the stretched sample so
      // the band cannot read as one combed direction
      aG.rgb *= 0.92 + n1w * 0.16;
      // r2: 0.80 -> 0.62 — full-strength replacement stamped its own combed
      // texture band; a partial blend keeps the planar patchwork visible
      // r3: 0.62 -> 0.48, same reasoning one more step
      float gMix = grazeW * 0.38;
      a = mix(a, aG, gMix);
      n = mix(n, nG, gMix);
    }
    // Near climb faces retain their bounded relief in the same fixed chart;
    // an interpolated-normal-derived UV basis would fold across the slope.
    float faceW = smoothstep(0.02, 0.085, slope) * (1.0 - steepW)
                * (1.0 - smoothstep(20.0, 60.0, camDist))
                * (1.0 - fD) * (1.0 - fM) * (1.0 - roadCore) * (1.0 - fR);
    if (faceW > 0.004) {
      vec2 uvFace = groundChartUv(wp.xz);
      vec2 dnF = groundChartNormalXZ(texture2D(uNrmD, uvFace * 1.07).xy);
      n.xy += dnF * 0.5 * faceW; // relief pass 2 (2026-09-12): 0.22 -> 0.5 (1049e4e ran 0.85 on climb faces)
    }
  }
  // <<< gameplay_feel r4 -----------------------------------------------------
  gSplatAlbedo = a.rgb;
  float iceW = clamp(fMs * uMarshGloss * 1.3, 0.0, 1.0) * (1.0 - driftW);
  float rough0 = clamp(a.a * (1.0 - roadCore * 0.12) * (1.0 + rut * 0.1)
    * (1.0 - fMs * uMarshGloss * (1.0 - driftW)), 0.05, 1.0);
  // ice roughness floor: at 0.05 the grazing-angle Fresnel term mirrors the
  // bright sky across the whole sheet and buries the crack/depth albedo —
  // ~0.45 keeps a satin sheen while the ice texture stays legible from the
  // near-grazing establishing camera
  // r6: 0.45 -> 0.30 — under the overcast winter sky the 0.45 floor killed
  // the sheet's specular response entirely (flat noise disc critique); 0.30
  // gives a believable satin ice sheen while the macro cracks stay legible
  // r9: 0.30 -> 0.20 — with the raised winter envIntensity the sheet still
  // read matte from the establishing camera; 0.20 picks up a real sky sheen
  // on the clear-ice fields while drifted snow (driftW) stays matte
  // terrain_environment r3: 0.20 -> 0.17 — pairs with the fresnel sky tint
  // above; the clear-ice fields need a genuine specular identity (0.13 let
  // the bright overcast env reflection blow the sheet out to snow-white)
  // r4: 0.17 -> 0.14 — one step glossier with the stronger fresnel term
  // Liquid keeps a tighter reflected-sun lobe than the old 0.54 satin floor,
  // which spread a pale leather-like sheen across an entire calm river.
  // Wind chop is carried by the shallow normal field; clear ice is unchanged.
  rough0 = max(rough0, iceW * mix(0.14, 0.22, uSea));
  rough0 = max(rough0, gSeaFoam * 0.88); // maps r1: foam is matte (0 off sea maps)
  // Dry terrain stays truly matte. The previous 0.78 floor left a broad GGX
  // sun lobe on dirt/snow at grazing angles, making the ground look wet even
  // when its albedo and normal detail were correct. Ice and open water keep
  // their authored response through iceW; every dry texel is >= 0.92.
  gSplatRough = max(rough0, 0.92 * (1.0 - iceW) + shoreW * -0.04);
  // Liquid's actual sheen now belongs to the translucent surface above this
  // bed. Two reflective layers washed the whole bay white at grazing angles.
  // Retain the authored pigment/detail below the water, but make it matte and
  // dimmer; dry ground and the complete legacy ice response remain unchanged.
  gSplatRough = mix(gSplatRough, 0.95, fMs * uSea);
  gSplatAlbedo *= 1.0 - fMs * uSea * 0.42;
  gSplatNrm = n.xyz * 2.0 - 1.0;
  gSplatFar = farM;
  // steep faces beyond gameplay range: their per-texel normal shading is the
  // strand-noise generator under a low sun — hand the shading to the
  // geometric normal early (from ~50 m out) on cliffs specifically
  gSplatSteepAtt = smoothstep(0.20, 0.45, slope) * smoothstep(50.0, 160.0, camDist) * 0.62;
}
`,Ra=`
{
  vec3 dN = gSplatNrm;
  vec3 gN = normalize(vWNormal);
  // r5: detail-normal strength falls off with distance (0.9 -> ~0.30 by the
  // far band). Past ~300 m per-texel normal shading cannot resolve — on
  // steep faces under a low sun it rendered as high-contrast bright/dark
  // strand noise ("furry" mesa flanks); the geometric normal carries the
  // far shading instead.
  float dk = 1.0 * (1.0 - max(gSplatFar * 0.62, gSplatSteepAtt));
  vec3 wN = normalize(vec3(gN.x + dN.x * dk, max(gN.y, 0.02) + dN.z * dk, gN.z + dN.y * dk));
  normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);
}
`;function za(e,t){return e?.seaLake||e?.iceLake?null:t}function Ba(e,t){return e.iceLake?ka(3003,t):e.seaLake?Aa(3003,t,e.mudTone||null):Ma(3003,`mud`,t,e.mudTone||null,e.mudRough??1)}function*Va(e,t){return e.iceLake||e.seaLake?Ba(e,t):yield*Na(3003,`mud`,t,e.mudTone||null,e.mudRough??1)}function*Ha(e,n,r,i=`verdant`,o=null,s=null,c=null){let l=r||{},u=za(l,o),d=Math.max(16,e.anisotropy??4);function*f(e){c?.prepareLayer&&(yield()=>c.prepareLayer(e))}yield*f(`G`);let m=c?.tryCreateLayer(`G`,d)??Da(3e3,d,l.grassTone||null);yield,yield*f(`D`);let h=c?.tryCreateLayer(`D`,d)??Oa(3001,d,l.dirtTone||null);yield,yield*f(`R`);let g=c?.tryCreateLayer(`R`,d)??(l.sandstone?ja(3002,d,l.rockTone||null):Ma(3002,`rock`,d,l.rockTone||null));yield;let _=yield*Va(l,d);yield;let v={G:m,D:h,R:g,M:_},b=c?c.apply(v):ut(i,v,l),x=Pa(new de({random:Zi(3010)}),n,u,s,l.shoreDirt?l.seaRamp?.[0]??.4:null);yield,va||(yield*xa());let S=Fa(3011);yield;let C=l.tintA||[1.16,1.08,.76],w=l.tintB||[.78,.9,.72],T=l.tintC||[1.1,1.04,.84],E=l.roadTint||[1.08,1.04,.96],D=new p({color:16777215,roughness:1,metalness:0});D.side=2;function O(e){e.uniforms.uAlbG={value:v.G.albedo},e.uniforms.uAlbD={value:v.D.albedo},e.uniforms.uAlbR={value:v.R.albedo},e.uniforms.uAlbM={value:v.M.albedo},e.uniforms.uNrmG={value:v.G.normal},e.uniforms.uNrmD={value:v.D.normal},e.uniforms.uNrmR={value:v.R.normal},e.uniforms.uNrmM={value:v.M.normal},e.uniforms.uMask={value:x},e.uniforms.uNoise={value:S}}function k(e){e.uniforms.uTintA={value:new t(...C)},e.uniforms.uTintB={value:new t(...w)},e.uniforms.uTintC={value:new t(...T)},e.uniforms.uRoadTint={value:new t(...E)},e.uniforms.uMarshGloss={value:l.marshGloss??0},e.uniforms.uMicroAmp={value:l.microAmp??1},e.uniforms.uStrata={value:l.strata??0},e.uniforms.uRoadTex={value:l.pavedRoads?1:Q(l.roadTexMix??0,0,1)},e.uniforms.uTownWear={value:l.townWear??1},e.uniforms.uWornDirtStrength={value:Q(l.wornDirtStrength??.84,0,1)},e.uniforms.uShoulderDirt={value:Q(l.shoulderDirt??1,0,1)},e.uniforms.uLaneK={value:cr(x.image.width)},e.uniforms.uIceDrift={value:l.iceLake||l.seaLake?l.iceDrift??.85:0}}function A(e){e.uniforms.uSea={value:+!!l.seaLake},e.uniforms.uSeaFoam={value:l.seaLake?l.seaFoam??.8:0},e.uniforms.uSeaRamp={value:new a(...l.seaRamp||[.4,.78])},e.uniforms.uMidRelief={value:l.midRelief??1},e.uniforms.uFieldPatch={value:l.fieldPatch??0},e.uniforms.uSandMacro={value:l.sandMacro??0},e.uniforms.uIceSky={value:new t(...l.iceSky||[.66,.72,.82])},e.uniforms.uMidFar={value:l.midReliefFar??480},e.uniforms.uRockGate={value:+!!u};let n=l.rippleDir||[.8,.6],r=Math.hypot(n[0],n[1])||1;e.uniforms.uRipple={value:new y(n[0]/r,n[1]/r,l.rippleAmp??0,+!!l.rippleShoreOnly)}}return e.setupShadowMaterial(D,e=>{O(e),k(e),A(e),e.vertexShader=Ia(e.vertexShader,`#include <common>`,`#include <common>
varying vec3 vWPos;
varying vec3 vWNormal;`),e.vertexShader=Ia(e.vertexShader,`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
vWNormal = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=Ia(e.fragmentShader,`#include <common>`,`#include <common>
`+La),e.fragmentShader=Ia(e.fragmentShader,`#include <map_fragment>`,`splatCompute();
diffuseColor.rgb *= gSplatAlbedo;`),e.fragmentShader=Ia(e.fragmentShader,`#include <roughnessmap_fragment>`,`float roughnessFactor = roughness * gSplatRough;`),e.fragmentShader=Ia(e.fragmentShader,`#include <normal_fragment_maps>`,Ra)}),D.customProgramCacheKey=()=>`world-terrain-splat-v31`,D.userData.sourcedTexturesReady=b,{material:D,waterMask:x,waterNormal:_.normal,textures:[m.albedo,m.normal,h.albedo,h.normal,g.albedo,g.normal,_.albedo,_.normal,x,S]}}var Ua=8,Wa=X/Ua,Ga=[96,48,24],Ka=6.5,qa=96,Ja=[0,0,!1];function*Ya(e,t,n,r=null,i=8){let a=Wa/qa,o=new Float64Array(9801);for(let s=0;s<99;s++){for(let r=0;r<99;r++)o[s*99+r]=e.getHeightAt(t+(r-1)*a,n+(s-1)*a);(s+1)%i===0&&(r||i===1)&&(yield r?[r.done+.3*(s+1)/99,r.total,!1]:Ja)}return{hgrid:o,pn:99,stepF:a}}function Xa(e,t){let n=e.get(t);if(n)return n.references++,n.attribute;let r=t+1,i=4*t,a=[];for(let e=0;e<t;e++)a.push(e);for(let e=0;e<t;e++)a.push(e*r+(r-1));for(let e=t;e>0;e--)a.push((r-1)*r+e);for(let e=t;e>0;e--)a.push(e*r);let o=new Uint16Array(t*t*6+i*6),s=0;for(let e=0;e<t;e++)for(let n=0;n<t;n++){let t=e*r+n,i=t+1,a=t+r,c=a+1;o[s++]=t,o[s++]=a,o[s++]=i,o[s++]=i,o[s++]=a,o[s++]=c}for(let e=0;e<i;e++){let t=a[e],n=a[(e+1)%i],c=r*r+e,l=r*r+(e+1)%i;o[s++]=t,o[s++]=c,o[s++]=n,o[s++]=n,o[s++]=c,o[s++]=l}let c=new _(o,1);return e.set(t,{attribute:c,references:1}),c}function Za(e){let t=0,n=0,r=0;for(let i of e.values()){let e=i.attribute.array.byteLength;t+=i.references,n+=e,r+=e*i.references}return{attributes:e.size,references:t,uniqueBytes:n,logicalUint16Bytes:r,avoidedBytes:r-n,previousUint32Bytes:r*2,totalBytesAvoided:r*2-n}}function*Qa(e,t,n,r,i,a=null,o=null,s=8){let c=r+1,l=Wa/r,d=qa/r,f=i?.hgrid||null,p=i?.pn||0,m=i?.stepF||Wa/qa,h=4*r,g=c*c+h,v=new Float32Array(g*3),y=new Float32Array(g*3),b=1/(2*m);function x(r,i){let a=i;for(let i=0;i<c;i++){let o=t+i*l,s=n+r*l,c=f?(r*d+1)*p+(i*d+1):0,u=f?f[c]:e.getHeightAt(o,s);v[a*3]=o,v[a*3+1]=u,v[a*3+2]=s;let h=f?f[c-1]:e.getHeightAt(o-m,s),g=f?f[c+1]:e.getHeightAt(o+m,s),_=f?f[c-p]:e.getHeightAt(o,s-m),x=f?f[c+p]:e.getHeightAt(o,s+m),S=(h-g)*b,C=(_-x)*b,w=1/Math.sqrt(S*S+1+C*C);y[a*3]=S*w,y[a*3+1]=w,y[a*3+2]=C*w,a++}return a}function*S(){let e=0;for(let t=0;t<c;t++)e=x(t,e),(t+1)%s===0&&(a||s===1)&&(yield a?[a.done+.8,a.total,!1]:Ja)}yield*S();let C=[];for(let e=0;e<r;e++)C.push(e);for(let e=0;e<r;e++)C.push(e*c+(c-1));for(let e=r;e>0;e--)C.push((c-1)*c+e);for(let e=r;e>0;e--)C.push(e*c);let w=t+Wa/2,T=n+Wa/2;for(let e=0;e<h;e++){let t=C[e],n=c*c+e;v[n*3]=v[t*3],v[n*3+1]=v[t*3+1]-Ka,v[n*3+2]=v[t*3+2];let r=v[t*3]-w,i=v[t*3+2]-T,a=Math.hypot(r,i)||1;r/=a,i/=a;let o=-.55,s=1/Math.hypot(r,o,i);y[n*3]=r*s,y[n*3+1]=o*s,y[n*3+2]=i*s}let E=new u;return E.setAttribute(`position`,new _(v,3)),E.setAttribute(`normal`,new _(y,3)),E.setIndex(Xa(o||new Map,r)),E.computeBoundingSphere(),E}function $a(e,t,n=null){let r=to(e,t,n),i=r.next();for(;!i.done;)i=r.next();return i.value}async function eo(e,t,n=null,r=null,i=!1,a=null,o=ft(n?.id||`verdant`,n?.splat||{},{worker:!0})){let s=to(e,t,n,a,o),c=!1;try{let e=s.next();for(;!e.done;)r&&(i||e.value[2]||e.value[3])&&await r(e.value[0],e.value[1]),e.value[3]&&(await e.value[3](),r&&await r(e.value[0],e.value[1])),e=s.next();return c=!0,e.value}finally{if(!c){try{o.cancel?.()}catch{}try{s.return?.()}catch{}}}}function*to(e,t,n,r=null,i=null){let a=new g;a.name=`terrain`;let s=Fn(t,n,1337,e),c=s.next();for(;!c.done;)yield[0,66,!1],c=s.next();a.add(c.value),yield[0,66,!0];let l=Ha(t,e._layout,n?n.splat:null,n&&n.id||`verdant`,e._mesaW||null,e._waterWetnessAt||null,i),u=l.next();try{for(;!u.done;)yield[1,66,!1,u.value||void 0],u=l.next()}finally{if(!u.done){let e=l;try{e.return?.()}catch{}}}let{material:d,textures:f}=u.value;n?.id===`autumn`&&P(c.value,d,f);let p=[],m=new Map,h=new Set;C(a,{geometries:h,textures:f});let _=r?.streamFarLods===!0,v=r?.focus||e._layout?.spawns?.player||{x:0,z:0},y=0,b=0;yield[1,66,!0];function*x(t){for(let n=0;n<Ua;n++){let r=-512+n*Wa,i=-512+t*Wa,s=r+Wa/2,c=i+Wa/2,l=Math.hypot(v.x-s,v.z-c),u=_?L(l):[0,1,2],f=!_||u.some(e=>e<2),g={done:2+t*Ua+n,total:66},x=f?yield*Ya(e,r,i,g):null;x&&b++;let S=[null,null,null];for(let t of u){let n=yield*Qa(e,r,i,Ga[t],x,g,m);S[t]=n,h.add(n),y++}let C=_?u[0]:2,w=new o(S[C],d);w.receiveShadow=!0,w.castShadow=!1,w.matrixAutoUpdate=!1,w.updateMatrix(),a.add(w),p.push({mesh:w,lods:S,fine:_&&u.length<Ga.length?x:null,level:C,cx:s,cz:c,cx0:r,cz0:i}),yield[2+t*Ua+n+1,66,n===Ua-1]}}for(let e=0;e<Ua;e++)yield*x(e);if(n?.splat?.seaLake&&!e._layout.terrain.frozenMarshes){let r=Gi(e),i=r.next();for(;!i.done;)yield[65,66,!1],i=r.next();if(i.value){e.getWaterSurfaceHeightAt=i.value.heightAt;let r=qi(i.value.geometry,u.value.waterMask,u.value.waterNormal,e.size,n.id||``,n.splat.seaRamp||[.4,.78],(e,n)=>t.setupShadowMaterial(e,n));a.add(r.mesh),a.userData.updateWater=r.update,a.userData.setWaterTime=r.setTime,a.userData.setWaterDisturbances=r.setDisturbances}}let S={enabled:_,totalGeometryCount:Ua*Ua*Ga.length,initialGeometryCount:y,initialFineGridCount:b,streamedGeometryCount:0},w=0,T=0,E=0,D={index:-1,level:2,distanceM:0,urgent:!1},O=null;function*k(t){let n=p[t.index];!n.fine&&t.level<2&&(n.fine=yield*Ya(e,n.cx0,n.cz0,null,1));let r=yield*Qa(e,n.cx0,n.cz0,Ga[t.level],n.fine,null,m,1);n.lods[t.level]=r,h.add(r),n.lods.every(Boolean)&&(n.fine=null),S.streamedGeometryCount++,S.indexPool=Za(m);let i=I(Math.hypot(T-n.cx,E-n.cz),n.level);i===t.level&&(n.level=i,n.mesh.geometry=r)}let A=()=>re(p,T,E,D)?(O=k(D),!0):!1,ee=()=>O?.next().done?(O=null,!0):!1,j=(e,t)=>{if(!_||!e)return 0;T=e.x,E=e.z;let n=Math.max(0,Math.floor(Number(t)||0)),r=0;for(;r<n&&!(!O&&!A());){for(;!ee(););r++}return r};return a.userData.updateLOD=e=>{for(let t of p){let n=I(Math.hypot(e.x-t.cx,e.z-t.cz),t.level);n!==t.level&&t.lods[n]&&(t.level=n,t.mesh.geometry=t.lods[n])}if(!_)return;T=e.x,E=e.z;let t=(++w&3)==0;if(!O&&(!t||!A()))return;let n=performance.now()+2;for(let e=0;e<32&&!(ee()||performance.now()>=n);e++);},a.userData.warmStreaming=j,a.userData.streamingStats=S,S.indexPool=Za(m),a.userData.sourcedTexturesReady=d.userData.sourcedTexturesReady,a.userData.cancelSourcedTextures=i?.cancel,a}export{pa as a,Yi as c,Ur as d,Wr as f,de as h,fa as i,Ji as l,ft as m,$a as n,ca as o,_t as p,eo as r,wa as s,_a as t,J as u};