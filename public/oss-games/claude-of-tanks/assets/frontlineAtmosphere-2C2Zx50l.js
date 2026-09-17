import{$ as e,B as t,Bt as n,Cr as r,Ct as i,I as a,O as o,P as s,St as c,Ut as l,Wn as u,Xt as d,Z as ee,c as f,ft as p,kt as te,o as m,pr as ne,q as re,xt as h,yt as g}from"./three.core-3Slefer1.js";import{r as ie}from"./three.module-Zfngt2Oc.js";import{a as ae,n as oe,t as se}from"./destructibles-CaFf1vJ4.js";import{o as ce}from"./catalog-DIeuKQk-.js";var le=Object.freeze({verdant:.45,desert:.5,winter:.5,urban:.8,coastal:.4,autumn:.45,steppe:.6,railyard:.7,frontier:.9,fjord:.4,delta:.45,badlands:.5,monsoon:.4,alpine:.35,caldera:.5,foundry:.7,ruinspires:.75,blackglass:.55,titan_gorge:.5,skybridge:.6,polders:.45,copper_mesa:.5,airfield:.85,oasis:.3,whiteout:.25,orchard:.3,longleaf:.4,mangrove:.35,saltwind:.4,reservoir:.4}),_=Object.freeze({columns:[8,14],columnRangeM:[650,950],spriteCap:48,aircraftCap:3,aircraftAltitudeM:[250,420],aircraftSpeedMps:[110,160],aircraftRadiusM:1300,artilleryIntervalS:[4,14],flakIntervalS:[9,30],flyoverIntervalS:[40,90],logCap:256,aaGuns:[3,4],aaBehindM:[60,140],aaLateralM:[40,130],aaRangeM:950,aaBurstIntervalS:[.9,1.7],aaShotsPerBurst:3,aaShotGapS:.13,aaHitRadiusM:1.9,aaHitHeightM:2.6,tracerCap:64,tracerSpeedMps:420,tracerLifeS:2.2});function ue(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function v(e,t,n){return e+(t-e)*n}function de(e,t){let n=e?.player?.pos,r=e?.enemies;if(!n||!r||r.length===0)return t;let i=0,a=0,o=0;for(let e of r)e?.pos&&(i+=e.pos[0],a+=e.pos[2],o++);if(!o)return t;let s=i/o-n[0],c=a/o-n[2];return Math.hypot(s,c)<1?t:g.radToDeg(Math.atan2(s,c))}function fe(){let e=new Uint8Array(4096*4),t=ue(61868),n=[];for(let e=0;e<7;e++){let e=t()*Math.PI*2;n.push([.5+Math.cos(e)*.18,.5+Math.sin(e)*.18,.22+t()*.12])}for(let t=0;t<64;t++)for(let r=0;r<64;r++){let i=(r+.5)/64,a=(t+.5)/64,o=Math.max(0,1-Math.hypot(i-.5,a-.5)/.42);for(let[e,t,r]of n)o=Math.max(o,Math.max(0,1-Math.hypot(i-e,a-t)/r)*.9);let s=o**1.4,c=(t*64+r)*4;e[c]=e[c+1]=e[c+2]=255,e[c+3]=Math.round(255*s)}let r=new o(e,64,64,d);return r.minFilter=p,r.magFilter=p,r.needsUpdate=!0,r}var pe=`
attribute vec4 aEvent; // birth, life, size, kind(0 flash, 1 flak)
attribute float aSeed;
varying vec2 vUv;
varying float vAge;
varying float vKind;
varying float vSeed;
uniform float uTime;
#include <common>
#include <fog_pars_vertex>
void main() {
  vUv = uv; vKind = aEvent.w; vSeed = aSeed;
  float age = (uTime - aEvent.x) / max(aEvent.y, 1e-3);
  vAge = age;
  vec4 base = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  float grow = aEvent.w > 0.5 ? (0.55 + age * 1.9) : (0.6 + smoothstep(0.0, 0.25, age) * 0.7);
  float size = aEvent.x < 0.0 || age < 0.0 || age > 1.0 ? 0.0 : aEvent.z * grow;
  vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 camUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  float rot = aSeed * 6.2831 + (aEvent.w > 0.5 ? age * 0.6 : 0.0);
  vec2 p = mat2(cos(rot), -sin(rot), sin(rot), cos(rot)) * position.xy;
  vec3 world = base.xyz + (camRight * p.x + camUp * p.y) * size;
  vec4 mvPosition = viewMatrix * vec4(world, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,me=`
uniform sampler2D uMap;
uniform float uOpacity;
varying vec2 vUv;
varying float vAge;
varying float vKind;
varying float vSeed;
#include <common>
#include <fog_pars_fragment>
void main() {
  if (vAge < 0.0 || vAge > 1.0) discard;
  float mask = texture2D(uMap, vUv).a;
  vec3 col; float a;
  if (vKind > 0.5) {
    // flak: dark oily puff that browns as it thins
    col = mix(vec3(0.16, 0.15, 0.14), vec3(0.34, 0.30, 0.26), vAge);
    a = mask * pow(1.0 - vAge, 1.5) * 0.85;
  } else {
    // artillery flash: white-hot heart, orange skirt, gone in a blink
    float pulse = 1.0 - smoothstep(0.0, 1.0, vAge);
    col = mix(vec3(1.0, 0.62, 0.28), vec3(1.0, 0.94, 0.78), pow(mask, 2.0)) * (1.2 + pulse);
    a = mask * pulse;
  }
  a *= uOpacity;
  if (a < 0.01) discard;
  gl_FragColor = vec4(col, a);
  #include <fog_fragment>
}`,he=`
attribute vec4 aTracer; // birth, life, length, seed
varying float vAge;
varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;
#include <common>
#include <fog_pars_vertex>
void main() {
  vUv = uv;
  float age = (uTime - aTracer.x) / max(aTracer.y, 1e-3);
  vAge = age;
  vec4 base = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  vec3 dir = normalize(vec3(instanceMatrix[2].xyz));
  float travelled = max(0.0, uTime - aTracer.x) * uSpeed;
  vec3 head = base.xyz + dir * travelled;
  vec3 toCam = normalize(cameraPosition - head);
  vec3 side = normalize(cross(dir, toCam) + vec3(1e-4));
  float alive = (aTracer.x < 0.0 || age < 0.0 || age > 1.0) ? 0.0 : 1.0;
  float len = aTracer.z * alive;
  float width = 0.22 * alive;
  vec3 world = head - dir * (uv.y * len) + side * (position.x * width);
  vec4 mvPosition = viewMatrix * vec4(world, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`,ge=`
varying float vAge;
varying vec2 vUv;
#include <common>
#include <fog_pars_fragment>
void main() {
  if (vAge < 0.0 || vAge > 1.0) discard;
  float core = 1.0 - abs(vUv.x - 0.5) * 2.0;
  float tail = 1.0 - vUv.y;
  vec3 col = mix(vec3(1.0, 0.45, 0.12), vec3(1.0, 0.9, 0.6), core * tail);
  float a = pow(core, 1.6) * tail * (1.0 - smoothstep(0.7, 1.0, vAge));
  if (a < 0.02) discard;
  gl_FragColor = vec4(col * 1.6, a);
  #include <fog_fragment>
}`;function y(t){let{parent:o,camera:d,bus:f=null,getHeightField:p,getSpawns:y}=t;if(!o||!d)throw TypeError(`frontline atmosphere requires a parent and a camera`);let b=new re;b.name=`frontline-atmosphere`,b.visible=!1,o.add(b);let ye=fe(),be=()=>{let e=ne.merge([ie.fog,{uMap:{value:null},uTime:{value:0},uOpacity:{value:1}}]);return e.uMap.value=ye,e},x=new u({uniforms:be(),vertexShader:pe,fragmentShader:me,transparent:!0,depthWrite:!1,fog:!0,blending:2}),S=new u({uniforms:be(),vertexShader:pe,fragmentShader:me,transparent:!0,depthWrite:!1,fog:!0}),xe=new i({color:2237995,fog:!0}),Se=new n(1,1),C=_.spriteCap,Ce=(t,n)=>{let r=Se.clone(),i=new ee(new Float32Array(C*4).fill(-1),4),a=new ee(new Float32Array(C),1);i.setUsage(s),r.setAttribute(`aEvent`,i),r.setAttribute(`aSeed`,a);let o=new e(r,t,C);o.name=n,o.frustumCulled=!1,o.renderOrder=5;let c=new h;for(let e=0;e<C;e++)o.setMatrixAt(e,c);return o.instanceMatrix.setUsage(s),b.add(o),{mesh:o,events:i,seeds:a,cursor:0}},w=Ce(x,`frontline-artillery-flashes`),we=Ce(S,`frontline-flak`),Te=(()=>{let e=[],t=(t,n,r,i)=>{t.translate(n,r,i),e.push(t)};t(new m(1.3,1.2,10.5),0,0,0),t(new m(15.5,.28,2.4),0,-.1,.9),t(new m(5.4,.22,1.5),0,.3,-4.6),t(new m(.22,2,1.7),0,1.2,-4.7),t(new m(.9,.9,2.2),-3.6,-.5,1.3),t(new m(.9,.9,2.2),3.6,-.5,1.3);let n=ve(e);for(let t of e)t.dispose();return n})(),T=[];for(let e=0;e<_.aircraftCap;e++){let t=new c(Te,xe);t.name=`frontline-aircraft-${e}`,t.frustumCulled=!1,t.visible=!1,b.add(t),T.push({root:t,p0:new r,v:new r,t0:0,durationS:0,active:!1})}let Ee=ve([new m(1.6,.35,1.6).translate(0,.17,0),new m(.7,.9,.7).translate(0,.8,0),new m(.5,.25,2.2).translate(0,.3,0),new m(2.2,.25,.5).translate(0,.3,0)]),De=ve([new m(.9,.5,.9),new m(1.7,1.1,.08).translate(0,.25,.35),new m(.12,.12,2.7).translate(-.22,.1,1.6),new m(.12,.12,2.7).translate(.22,.1,1.6),new m(.4,.3,.6).translate(.55,0,-.2)]),E=new te({color:4869956,roughness:.82,metalness:.18});t.setupMaterial?.(E);let Oe=_.aaGuns[1],D=new e(Ee,E,Oe);D.name=`frontline-aa-bases`,D.count=0,D.castShadow=!0,D.receiveShadow=!0;let O=new e(De,E,Oe);O.name=`frontline-aa-heads`,O.count=0,O.castShadow=!0,O.instanceMatrix.setUsage(s),b.add(D,O);let k=[],ke=Se.clone(),A=new ee(new Float32Array(_.tracerCap*4).fill(-1),4);A.setUsage(s),ke.setAttribute(`aTracer`,A);let Ae=new u({uniforms:ne.merge([ie.fog,{uTime:{value:0},uSpeed:{value:_.tracerSpeedMps}}]),vertexShader:he,fragmentShader:ge,transparent:!0,depthWrite:!1,fog:!0,blending:2,side:2}),j=new e(ke,Ae,_.tracerCap);j.name=`frontline-aa-tracers`,j.frustumCulled=!1,j.renderOrder=6,j.instanceMatrix.setUsage(s);{let e=new h;for(let t=0;t<_.tracerCap;t++)j.setMatrixAt(t,e)}b.add(j);let M=0,N=new r,P=new r,F=new r,I=new l,L=new a,R=new r(1,1,1),je=new r(0,0,0),z=[],B=0,V=0,Me=1,Ne=0,H=ue(1),U=0,W=0,G=0,Pe=0,K=!1,q=[],J=new h,Fe=new l,Ie=new r,Y=new r,Le=new r(0,1,0),X=(e,t)=>{let n=(p?.())?.getHeightAt?.(e,t);return typeof n==`number`&&Number.isFinite(n)?n:0},Z=()=>Math.min(1,Math.max(0,Ne*Me)),Re=e=>{let t=Math.max(.15,Z());return v(e[0],e[1],H())/t},Q=(e,t)=>{let n={kind:e,timeS:U,pos:[t.x,t.y,t.z]};return z.length>=_.logCap&&z.shift(),z.push(n),n},ze=(e,t,n,r,i)=>{let a=e.cursor;e.cursor=(e.cursor+1)%C,J.compose(t,Fe.identity(),Ie.set(1,1,1)),e.mesh.setMatrixAt(a,J),e.mesh.instanceMatrix.needsUpdate=!0,e.events.setXYZW(a,U,n,r,i),e.events.needsUpdate=!0,e.seeds.setX(a,H()),e.seeds.needsUpdate=!0};function Be(){q.length=0;let e=Math.round(v(_.columns[0],_.columns[1],Z())),t=g.degToRad(V);for(let n=0;n<e;n++){let e=t+(H()-.5)*g.degToRad(130),n=v(_.columnRangeM[0],_.columnRangeM[1],H()),i=Math.sin(e)*n,a=Math.cos(e)*n;H(),H(),H(),q.push(new r(i,X(i,a)-6,a))}}function Ve(){if(q.length===0)return;let e=q[Math.floor(H()*q.length)];Y.copy(e),Y.x+=(H()-.5)*90,Y.z+=(H()-.5)*90,Y.y=X(Y.x,Y.z)+6+H()*6;let t=26+H()*34;ze(w,Y,.14+H()*.06,t,0);let n=Q(`artillery`,Y);f?.emit(`atmosphere:artillery`,{pos:n.pos,size:t/60})}function He(){let e=T.find(e=>e.active),t=3+Math.floor(H()*5);for(let n=0;n<t;n++){if(e){let t=1.5+H()*3.5;Y.copy(e.p0).addScaledVector(e.v,U-e.t0+t),Y.x+=(H()-.5)*120,Y.y+=(H()-.5)*60,Y.z+=(H()-.5)*120}else{let e=g.degToRad(V+(H()-.5)*120),t=300+H()*500;Y.set(Math.sin(e)*t,0,Math.cos(e)*t),Y.y=X(Y.x,Y.z)+v(_.aircraftAltitudeM[0],_.aircraftAltitudeM[1],H())}ze(we,Y,1.8+H()*.9,4+H()*4,1);let t=Q(`flak`,Y);f?.emit(`atmosphere:flak`,{pos:t.pos,delayS:n*(.12+H()*.16)})}}function Ue(){let e=T.find(e=>!e.active);if(!e)return;let t=g.degToRad(V+90+(H()-.5)*70)+(H()<.5?Math.PI:0),n=g.degToRad(V)+(H()-.5)*.8,r=(H()-.5)*500,i=Math.sin(n)*150+Math.cos(n)*r,a=Math.cos(n)*150-Math.sin(n)*r,o=v(_.aircraftSpeedMps[0],_.aircraftSpeedMps[1],H()),s=v(_.aircraftAltitudeM[0],_.aircraftAltitudeM[1],H()),c=_.aircraftRadiusM;e.v.set(Math.sin(t)*o,0,Math.cos(t)*o),e.p0.set(i-Math.sin(t)*c,X(i,a)+s,a-Math.cos(t)*c),e.t0=U,e.durationS=2*c/o,e.active=!0,e.root.visible=!0,e.root.rotation.set(0,t,(H()-.5)*.24);let l=Q(`flyover`,e.p0);f?.emit(`atmosphere:flyover`,{p0:l.pos,v:[e.v.x,e.v.y,e.v.z],durationS:e.durationS})}function We(){for(let e of T){if(!e.active)continue;let t=U-e.t0;if(t>e.durationS){e.active=!1,e.root.visible=!1;continue}e.root.position.copy(e.p0).addScaledVector(e.v,t)}}function Ge(){k.length=0;let e=(y?.())?.player?.pos,t=Math.round(v(_.aaGuns[0],_.aaGuns[1],Z())),n=g.degToRad(V),i=Math.sin(n),a=Math.cos(n),o=e?e[0]:-i*300,s=e?e[2]:-a*300;for(let e=0;e<t;e++){let t=v(_.aaBehindM[0],_.aaBehindM[1],H()),c=v(_.aaLateralM[0],_.aaLateralM[1],H())*(e%2==0?1:-1),l=g.clamp(o-i*t+a*c,-470,470),u=g.clamp(s-a*t-i*c,-470,470),d=new r(l,X(l,u),u);k.push({pos:d,yaw:n,pitch:.35,nextBurstAt:0,shotsLeft:0,nextShotAt:0,destroyed:!1}),J.compose(d,Fe.setFromAxisAngle(Le,n+(H()-.5)*.4),R),D.setMatrixAt(e,J)}D.count=t,O.count=t,D.instanceMatrix.needsUpdate=!0,Ke()}function Ke(){for(let e=0;e<k.length;e++){let t=k[e];L.set(-t.pitch,t.yaw,0,`YXZ`),I.setFromEuler(L),J.compose(Y.copy(t.pos).setY(t.pos.y+1.45),I,R),O.setMatrixAt(e,J)}O.instanceMatrix.needsUpdate=!0}function qe(e){P.set(0,.1,2.9).applyQuaternion(I.setFromEuler(L.set(-e.pitch,e.yaw,0,`YXZ`))),P.add(e.pos).y+=1.45,N.set(0,0,1).applyQuaternion(I),N.x+=(H()-.5)*.03,N.y+=(H()-.5)*.03,N.z+=(H()-.5)*.03,N.normalize();let t=M;M=(M+1)%_.tracerCap,J.lookAt(N,je,Le),J.setPosition(P),j.setMatrixAt(t,J),j.instanceMatrix.needsUpdate=!0,A.setXYZW(t,U,_.tracerLifeS,9+H()*5,H()),A.needsUpdate=!0,ze(w,P,.07,2.4+H()*1.2,0)}function Je(e){if(!k.length)return;let t=T.find(e=>e.active),n=!1;for(let r of k)if(!r.destroyed){if(t){F.copy(t.p0).addScaledVector(t.v,U-t.t0);let i=F.distanceTo(r.pos);if(i<_.aaRangeM){F.addScaledVector(t.v,i/_.tracerSpeedMps);let a=F.x-r.pos.x,o=F.z-r.pos.z,s=F.y-(r.pos.y+1.45),c=Math.atan2(a,o),l=Math.atan2(s,Math.hypot(a,o)),u=c-r.yaw;if(u=Math.atan2(Math.sin(u),Math.cos(u)),r.yaw+=g.clamp(u,-2.2*e,2.2*e),r.pitch+=g.clamp(l-r.pitch,-1.4*e,1.4*e),n=!0,U>=r.nextBurstAt&&r.shotsLeft===0){r.shotsLeft=_.aaShotsPerBurst,r.nextShotAt=U,r.nextBurstAt=U+v(_.aaBurstIntervalS[0],_.aaBurstIntervalS[1],H());let e=Q(`aa`,r.pos);f?.emit(`atmosphere:aa`,{pos:e.pos,shots:_.aaShotsPerBurst,gapS:_.aaShotGapS})}}}else{let t=.35;r.pitch+=g.clamp(t-r.pitch,-.5*e,.5*e),n||=Math.abs(t-r.pitch)>.001}for(;r.shotsLeft>0&&U>=r.nextShotAt;)qe(r),r.shotsLeft--,r.nextShotAt+=_.aaShotGapS}n&&Ke()}let $=null,Ye=new r,Xe=new r,Ze=new r,Qe=new r;function $e(e,t,n,r){let i=Ye.subVectors(t,e),a=Xe.subVectors(r,n),o=Ze.subVectors(e,n),s=i.dot(i),c=a.dot(a),l=a.dot(o),u=0,d=0;if(s<=1e-9&&c<=1e-9)return o.lengthSq();if(s<=1e-9)d=g.clamp(l/c,0,1);else{let e=i.dot(o);if(c<=1e-9)u=g.clamp(-e/s,0,1);else{let t=i.dot(a),n=s*c-t*t;u=n===0?0:g.clamp((t*l-e*c)/n,0,1),d=(t*u+l)/c,d<0?(d=0,u=g.clamp(-e/s,0,1)):d>1&&(d=1,u=g.clamp((t-e)/s,0,1))}}return Qe.copy(e).addScaledVector(i,u).sub(Ze.copy(n).addScaledVector(a,d)),Qe.lengthSq()}function et(e,t,n,r){let i=k[e];if(!i||i.destroyed)return;i.destroyed=!0,i.shotsLeft=0,i.pitch=-.55,i.yaw+=(H()-.5)*.9;let a=Math.atan2(t,n);J.compose(i.pos,Fe.setFromEuler(L.set(.32,a,.18,`YXZ`)),R),D.setMatrixAt(e,J),D.instanceMatrix.needsUpdate=!0,Ke(),se(`drumblast`,i.pos.x,i.pos.y+.9,i.pos.z,t,n,2.4),oe({kind:`aaGun`,pos:[i.pos.x,i.pos.y,i.pos.z],cause:r});let o=Q(`aa-destroyed`,i.pos);f?.emit(`atmosphere:aa-destroyed`,{pos:o.pos,cause:r})}function tt(e,t,n,r,i,a){let o=_.aaHitRadiusM*_.aaHitRadiusM;for(let s=0;s<k.length;s++){let c=k[s];c.destroyed||(P.set(e,t,n),N.set(r,i,a),F.copy(c.pos),F.y+=_.aaHitHeightM,$e(P,N,c.pos,F)<=o&&et(s,r-e,a-n,`shell`))}}function nt(e,t,n,r){let i=r.r+_.aaHitRadiusM;for(let a=0;a<k.length;a++){let o=k[a];if(o.destroyed)continue;let s=e-o.pos.x,c=n-o.pos.z;s*s+c*c>i*i||t<o.pos.y-r.r||t>o.pos.y+_.aaHitHeightM+r.r||et(a,-s,-c,r.he?`blast`:`shell`)}}function rt(e){$?.(),$=ae({key:`frontline-aa:${e}`,isActive:()=>K&&b.visible&&!!b.parent,sweep:tt,impact:nt})}function it(e,t){ot(),Ne=ce(t)?le[t]:.45,B=Z(),H=ue((e??0)*7919+_e(t)|0),V=de(y?.(),H()*360),Be(),Ge(),rt(t),W=2+H()*4,G=6+H()*10,Pe=20+H()*40,K=B>.001,b.visible=K}function at(e){if(!K||!(e>0))return;let t=Math.min(.1,e);U+=t,x.uniforms.uTime.value=U,S.uniforms.uTime.value=U,Ae.uniforms.uTime.value=U,U>=W&&(Ve(),W=U+Re(_.artilleryIntervalS)),U>=G&&(He(),G=U+Re(_.flakIntervalS)),U>=Pe&&(Ue(),Pe=U+Re(_.flyoverIntervalS)),We(),Je(t)}function ot(){K=!1,b.visible=!1,U=0,z.length=0;for(let e of[w,we])e.events.array.fill(-1),e.events.needsUpdate=!0,e.cursor=0;for(let e of T)e.active=!1,e.root.visible=!1;k.length=0,D.count=0,O.count=0,A.array.fill(-1),A.needsUpdate=!0,M=0,$?.(),$=null}function st(){ot(),o.remove(b),Se.dispose(),w.mesh.geometry.dispose(),we.mesh.geometry.dispose(),Te.dispose(),Ee.dispose(),De.dispose(),ke.dispose(),x.dispose(),S.dispose(),xe.dispose(),t.releaseMaterial?.(E),E.dispose(),Ae.dispose(),ye.dispose()}return{get intensity(){return B},get aaGuns(){return k},get bearingDeg(){return V},group:b,prepare:it,update:at,setScale(e){Me=Math.min(2,Math.max(0,e)),B=Z()},reset:ot,dispose:st,log:z}}function _e(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t|0}function ve(e){let n=[],r=[];for(let t of e){let e=t.index?t.toNonIndexed():t;n.push(...Array.from(e.getAttribute(`position`).array)),r.push(...Array.from(e.getAttribute(`normal`).array)),e!==t&&e.dispose()}let i=new f;return i.setAttribute(`position`,new t(n,3)),i.setAttribute(`normal`,new t(r,3)),i.computeBoundingSphere(),i}export{le as FRONTLINE_INTENSITY,_ as FRONTLINE_LIMITS,y as createFrontlineAtmosphere,de as resolveFrontBearingDeg};