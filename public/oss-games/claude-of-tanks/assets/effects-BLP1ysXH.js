import{$ as e,B as t,Bt as n,Cr as r,Ct as i,I as a,P as o,Pt as s,Q as c,Qn as l,Sr as u,St as d,T as f,Ut as p,Vn as m,Vt as h,Wn as g,X as _,Z as v,bt as y,c as b,h as x,jn as S,m as ee,p as te,pr as ne,q as re,s as C,u as w,yt as T}from"./three.core-3Slefer1.js";import{r as ie}from"./three.module-Zfngt2Oc.js";import{i as ae,o as oe,r as se}from"./destructibles-CaFf1vJ4.js";import{t as ce}from"./vehicleMarkings-C1BPXVni.js";import{a as le,c as ue,i as de,r as fe}from"./clock-CVaw8fHY.js";import{t as pe}from"./eraActivation-63f6XdOD.js";function me(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var E={smoke:2048,fire:1024,billow:256,psmoke:384,dust:1024,sparks:512,debris:256,flash:128,jet:64},he=Object.freeze({smoke:`/fx/particles-smoke.png`,fire:`/fx/particles-fire.png`,prop:`/fx/particles-prop.png`,dust:`/fx/particles-dust.png`,flash:`/fx/particles-flash.png`,jet:`/fx/particles-jet.png`}),D=`
#ifdef USE_FOG
  varying float vFogDepth;
#endif
`,O=`
#ifdef USE_FOG
  vFogDepth = -mvPosition.z;
#endif
`,k=`
#ifdef USE_FOG
  uniform vec3 fogColor;
  #ifdef FOG_EXP2
    uniform float fogDensity;
  #else
    uniform float fogNear;
    uniform float fogFar;
  #endif
  varying float vFogDepth;
#endif
`,A=`
#ifdef USE_FOG
  #ifdef FOG_EXP2
    float fogFactor = 1.0 - exp( -fogDensity * fogDensity * vFogDepth * vFogDepth );
  #else
    float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
  #endif
#else
  float fogFactor = 0.0;
#endif
`,j=`
vec3 particleDisplace( vec3 vel, float grav, float age, float drag ) {
  float k = max( drag, 1e-4 );
  float s = ( 1.0 - exp( -k * age ) ) / k;
  return vel * s + vec3( 0.0, 0.5 * grav * age * age, 0.0 );
}
`,M=`
uniform vec2 uNearFade;
float nearFade( vec3 wpos ) {
  return smoothstep( uNearFade.x, uNearFade.y, distance( wpos, cameraPosition ) );
}
`,N=`
uniform sampler2D uSceneDepth;
uniform vec2 uSoftViewport;
uniform float uCameraNear;
uniform float uCameraFar;
varying float vParticleDepth;
float perspectiveDepthToViewZSoft( float depth, float nearV, float farV ) {
  return ( nearV * farV ) / ( ( farV - nearV ) * depth - farV );
}
float softDepthFade() {
  vec2 suv = gl_FragCoord.xy / max( uSoftViewport, vec2( 1.0 ) );
  float rawDepth = texture2D( uSceneDepth, suv ).x;
  float sceneDepthM = -perspectiveDepthToViewZSoft( rawDepth, uCameraNear, uCameraFar );
  float gapM = sceneDepthM - vParticleDepth;
  float featherM = clamp( vParticleDepth * 0.005, 0.65, 3.5 );
  return smoothstep( 0.0, featherM, gapM );
}
`,ge=`
vec3 toneCap( vec3 c ) {
  float m = max( c.r, max( c.g, c.b ) );
  return c / ( 1.0 + 0.30 * m );
}
`,_e=`
attribute vec4 aPB;   // origin.xyz, birth
attribute vec4 aVL;   // vel.xyz, life
attribute vec4 aSR;   // size0, size1, rot0, rotVel
attribute vec4 aC0;   // color0.rgb, gravity (+up)
attribute vec4 aC1;   // color1.rgb, peakAlpha
uniform float uTime;
uniform float uDrag;
uniform float uTiles;
uniform vec3 uSunDirW;
varying vec2 vUv;
varying vec2 vUvA;
varying vec2 vUvB;
varying float vFMix;
varying vec4 vColor;
varying float vT;
varying vec2 vShade;
varying float vParticleDepth;
${D}
${j}
${M}
void main() {
  float life = aVL.w;
  float age = uTime - aPB.w;
  if ( life <= 0.0 || age < 0.0 || age > life ) {
    vUv = uv; vUvA = uv; vUvB = uv; vFMix = 0.0;
    vColor = vec4( 0.0 ); vT = 0.0; vShade = vec2( 0.0 );
    vParticleDepth = 1e9;
    gl_Position = vec4( 0.0, 0.0, 2.0, 1.0 );
    ${O.replace(`-mvPosition.z`,`1.0`)}
    return;
  }
  float t = age / life;
  vT = t;
  vec3 wpos = aPB.xyz + particleDisplace( aVL.xyz, aC0.w, age, uDrag );
  float size = mix( aSR.x, aSR.y, t );
  float ang = aSR.z + aSR.w * age;
  float ca = cos( ang ), sa = sin( ang );
  vec2 corner = vec2( position.x * ca - position.y * sa,
                      position.x * sa + position.y * ca ) * size;
  vec3 camRight = vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] );
  vec3 camUp    = vec3( viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1] );
  wpos += camRight * corner.x + camUp * corner.y;
  // sun direction projected into the billboard plane (fake lit-smoke normal)
  vShade = vec2( dot( uSunDirW, camRight ), dot( uSunDirW, camUp ) );
  // flipbook: cycle the uTiles x uTiles atlas over the particle life, with
  // cross-fade between adjacent frames — media rolls/combusts instead of a
  // static sprite scaling up (uTiles = 1 degrades to a plain single sample)
  float frames = uTiles * uTiles;
  float ff = t * ( frames - 1.0 );
  float f0 = floor( ff );
  float f1 = min( f0 + 1.0, frames - 1.0 );
  vFMix = ff - f0;
  vUvA = ( vec2( mod( f0, uTiles ), floor( f0 / uTiles ) ) + uv ) / uTiles;
  vUvB = ( vec2( mod( f1, uTiles ), floor( f1 / uTiles ) ) + uv ) / uTiles;
  // tier-1 soft handling: alpha-in at birth, long fade-out (+ lens fade)
  float alpha = aC1.w * smoothstep( 0.0, 0.12, t ) * ( 1.0 - smoothstep( 0.5, 1.0, t ) )
    * nearFade( wpos );
  vColor = vec4( mix( aC0.rgb, aC1.rgb, smoothstep( 0.0, 1.0, t ) ), alpha );
  vUv = uv;
  vec4 mvPosition = viewMatrix * vec4( wpos, 1.0 );
  vParticleDepth = -mvPosition.z;
  ${O}
  gl_Position = projectionMatrix * mvPosition;
}
`,ve=`
uniform sampler2D uMap;
varying vec2 vUv;
varying vec2 vUvA;
varying vec2 vUvB;
varying float vFMix;
varying vec4 vColor;
varying float vT;
varying vec2 vShade;
${k}
${N}
void main() {
  float tex = mix( texture2D( uMap, vUvA ).a, texture2D( uMap, vUvB ).a, vFMix );
  // edges thin out with age so old puffs wisp away instead of popping
  float a = pow( tex, 1.0 + vT * 1.2 ) * vColor.a * softDepthFade();
  if ( a < 0.004 ) discard;
  // fake directional lighting: sun-facing side of the billboard brightens,
  // opposite side falls into shadow — smoke reads volumetric, not flat.
  // Density-weighted: thick texels shade deeper, thin rim texels catch a
  // sun-side rim light so even near-black columns keep internal structure.
  vec2 p = vUv * 2.0 - 1.0;
  float sun = clamp( 0.5 + 0.8 * dot( p, vShade ), 0.0, 1.0 );
  float light = 0.52 + 0.72 * sun + 0.35 * sun * ( 1.0 - tex );
  vec3 col = vColor.rgb * light;
  ${A}
  #ifdef USE_FOG
    col = mix( col, fogColor, fogFactor );
  #endif
  gl_FragColor = vec4( col, a );
}
`,ye=`
uniform sampler2D uMap;
uniform float uIntensity;
varying vec2 vUv;
varying vec2 vUvA;
varying vec2 vUvB;
varying float vFMix;
varying vec4 vColor;
varying float vT;
varying vec2 vShade;
${k}
${ge}
${N}
void main() {
  float tex = mix( texture2D( uMap, vUvA ).a, texture2D( uMap, vUvB ).a, vFMix );
  // erosion-style dissolve: the alpha threshold rises with age so the noisy
  // texture breaks apart from its thin texels inward — edges churn and burn
  // away instead of the whole card fading uniformly. Band widened 0.24 ->
  // 0.42 (r6): the narrow band binarized the noise into hard-edged speckle
  // by mid-life — coarse GIF-dither confetti over the trees instead of
  // half-transparent churn.
  // r5 anti-stipple: the erosion band now WIDENS with age (0.40 -> 0.92).
  // The fixed 0.42 band binarized the flipbook's high-frequency octaves by
  // mid-life — at 100% zoom the fireball boundary resolved to discrete
  // alpha-dither speckle instead of soft billowing lobes. A widening band
  // keeps the front torn early yet dissolves late edges as translucent
  // gradients, so lobes billow away instead of pixel-popping.
  // r2 anti-static: the per-pixel gl_FragCoord hash jitter is GONE. It was
  // screen-pinned white noise on the erosion threshold — under a moving
  // texture every near-threshold texel flickered per pixel, and with no TAA
  // the whole eroding footprint sizzled as TV static (the r2 critical
  // "hash-dither alpha" kill read). The widening smoothstep band alone keeps
  // the dissolve soft; the flipbook supplies all the ragged structure.
  // lighting_post r3 (round 3): base band 0.40 -> 0.60 (~1.5x) — fire edges
  // still stippled at 2x crops; wider gate dissolves them as gradients.
  // r5 anti-stipple: erosion runs through an ultra-wide band (0.72 -> 1.2)
  // so the flipbook's high-frequency octaves resolve as translucent
  // gradients, never binarized speckle (r4 "dither-speckled additive cards
  // chewing every edge, hundreds of dark stipple dots").
  float er = vT * 0.30;
  float a = smoothstep( er, er + 0.72 + 0.48 * vT, tex ) * vColor.a * softDepthFade();
  if ( a < 0.004 ) discard;
  ${A}
  // blackbody interior: texels well above the erosion front read white-hot,
  // the dissolving rim cools through orange to deep red as vT -> 1
  float heat = clamp( ( tex - er ) * 2.6, 0.0, 1.0 );
  float hot = 0.45 + heat * heat * ( 2.2 - vT * 1.6 );
  vec3 col = vColor.rgb * hot * ( 1.0 - vT * vT * 0.45 );
  // rim tint — r5: the hard 0.0-0.55 gate stamped a saturated RED BAND onto
  // the rim (r4 "hard red banding"). The ramp now walks white -> yellow ->
  // orange -> sooty umber across a wide gate so no single hue bands.
  col = mix( vec3( 0.86, 0.34, 0.10 ) * ( 0.4 + 0.6 * vColor.r ), col, smoothstep( 0.0, 0.80, heat ) );
  // r5 combustion chemistry: saturation must fall BEFORE value. The old ramp
  // held saturated deep red through the whole back half of a fire card's
  // life, so 1.5-2.9 s post-blast the dying flare rendered as a floating
  // maroon/dried-blood fog puff mid-column. Real fire desaturates to sooty
  // grey-orange fast once it stops burning — pull the late-life color toward
  // its own luma (grey) and dim it, so flame hands off to the smoke pool's
  // grey-black instead of holding red.
  // r2: soot onset 0.42 -> 0.30 — the fire pool must go dark-first so the
  // paint-to-char beat never passes through a bright desaturated stage.
  float soot = smoothstep( 0.30, 0.85, vT );
  float luma = dot( col, vec3( 0.299, 0.587, 0.114 ) );
  col = mix( col, vec3( luma * 0.5 ), soot );
  a *= 1.0 - soot * 0.45;
  // HDR push so UnrealBloom catches fire/flash pixels — per-card soft knee
  // keeps a deep additive stack from clipping to a white sheet
  gl_FragColor = vec4( toneCap( col * uIntensity ) * ( 1.0 - fogFactor ), a );
}
`,be=`
uniform sampler2D uMap;
uniform float uIntensity;
varying vec2 vUv;
varying vec2 vUvA;
varying vec2 vUvB;
varying float vFMix;
varying vec4 vColor;
varying float vT;
varying vec2 vShade;
${k}
${N}
void main() {
  float tex = mix( texture2D( uMap, vUvA ).a, texture2D( uMap, vUvB ).a, vFMix );
  // r2 anti-static: screen-space hash jitter removed (see PUFF_FRAG_ADDITIVE
  // note) — the jitter binarized the erosion front into per-pixel sizzle over
  // the wreck and the ground for the fireball's whole life. Band widened a
  // touch to keep the front torn without it.
  // r5 anti-stipple: band 0.34 -> 0.46 base — the billow rim was the other
  // stipple source at 2x crops (r4 "screen-door dither chewing every edge");
  // 0.52 over-thinned the whole fireball body, 0.46 keeps the mass.
  float er = vT * 0.30;
  float a = smoothstep( er, er + 0.46 + 0.45 * vT, tex ) * vColor.a * softDepthFade();
  if ( a < 0.004 ) discard;
  // blackbody interior: dense texels above the erosion front burn white-hot,
  // cooling through orange -> deep ember red -> soot as the card ages and
  // its rim dissolves. vColor supplies the SOOT base (col0 -> col1 over life)
  // so the burnt-out card hands off seamlessly to the smoke pool's greys.
  // r1 tune: white reserved for the very densest texels (the first pass sent
  // most of the crown into the white band — cotton-ball read); the body of
  // the lobe lives in ember-red/orange with sooty shoulders.
  float heat = clamp( ( tex - er ) * ( 2.0 - 0.9 * vT ), 0.0, 1.0 );
  // r2 dark-first dissolve: h2 collapses harder with age and the white band
  // shrank to the very densest texels — the old ramp held a bright
  // desaturated "noisy white plaster" stage over the hull for ~2 s (r2
  // major). paint -> ember orange -> charcoal, never through ash white.
  // r5: ramp stops widened + the deep-red band lifted toward burnt orange —
  // the tight 0.30-0.72 orange gate left a hard red ring where it met the
  // 0.06-0.32 band (r4 "hard red banding at the rim"). The overlapping
  // gates now walk soot -> ember -> orange -> near-white as one gradient.
  float h2 = heat * ( 1.0 - vT * 0.95 );
  vec3 col = mix( vColor.rgb, vec3( 0.46, 0.10, 0.03 ), smoothstep( 0.04, 0.40, h2 ) );
  col = mix( col, vec3( 1.0, 0.44, 0.07 ), smoothstep( 0.25, 0.85, h2 ) );
  col = mix( col, vec3( 1.28, 1.08, 0.80 ), smoothstep( 0.80, 0.99, h2 ) );
  // combustion chemistry: saturation falls BEFORE value — past mid-life the
  // card desaturates to sooty grey and dims, handing off to the smoke pool
  // (without this the aged billow mass froze as a translucent MAROON wall
  // over the trees at 1.6 s — the exact r5 dried-blood-fog regression)
  // r2: onset 0.35 -> 0.26 (dark-first, see h2 note)
  float sootF = smoothstep( 0.26, 0.72, vT );
  float luma = dot( col, vec3( 0.299, 0.587, 0.114 ) );
  col = mix( col, vec3( luma ), sootF * 0.9 );
  col *= 1.0 - 0.3 * sootF;
  // sooty outer shell catches sun-side shading so the crown reads volumetric;
  // burning pockets stay self-lit
  vec2 p = vUv * 2.0 - 1.0;
  float sun = clamp( 0.5 + 0.8 * dot( p, vShade ), 0.0, 1.0 );
  col *= mix( 0.58 + 0.62 * sun, 1.0, smoothstep( 0.12, 0.5, h2 ) );
  ${A}
  #ifdef USE_FOG
    col = mix( col, fogColor, fogFactor );
  #endif
  gl_FragColor = vec4( col * uIntensity, a );
}
`,xe=`
uniform sampler2D uMap;
varying vec2 vUv;
varying vec2 vUvA;
varying vec2 vUvB;
varying float vFMix;
varying vec4 vColor;
varying float vT;
varying vec2 vShade;
${k}
${N}
void main() {
  float tex = mix( texture2D( uMap, vUvA ).a, texture2D( uMap, vUvB ).a, vFMix );
  // erosion dissolve: threshold rises with age, band widens so late edges go
  // translucent instead of binarizing (see PUFF_FRAG_ADDITIVE anti-stipple)
  float er = vT * 0.36;
  float a = smoothstep( er, er + 0.44 + 0.50 * vT, tex ) * vColor.a * softDepthFade();
  if ( a < 0.004 ) discard;
  // density-weighted sun shading (same model as the normal smoke pool,
  // response toned down — the propellant mass must stay a grey-brown cloud,
  // never a bright cream fog bank)
  vec2 p = vUv * 2.0 - 1.0;
  float sun = clamp( 0.5 + 0.8 * dot( p, vShade ), 0.0, 1.0 );
  float light = 0.46 + 0.60 * sun + 0.28 * sun * ( 1.0 - tex );
  vec3 col = vColor.rgb * light;
  ${A}
  #ifdef USE_FOG
    col = mix( col, fogColor, fogFactor );
  #endif
  gl_FragColor = vec4( col, a );
}
`,Se=`
attribute vec4 aPB;   // origin.xyz, birth
attribute vec4 aVL;   // vel.xyz, life
attribute vec4 aWS;   // width, stretch (s of length per m/s), gravity, seed
attribute vec4 aC;    // color.rgb, peakAlpha
uniform float uTime;
uniform float uDrag;
varying vec2 vUv;
varying vec4 vColor;
varying float vT;
${D}
${j}
${M}
void main() {
  float life = aVL.w;
  float age = uTime - aPB.w;
  if ( life <= 0.0 || age < 0.0 || age > life ) {
    vUv = uv; vColor = vec4( 0.0 ); vT = 0.0;
    gl_Position = vec4( 0.0, 0.0, 2.0, 1.0 );
    ${O.replace(`-mvPosition.z`,`1.0`)}
    return;
  }
  float t = age / life;
  vT = t;
  vec3 grav = vec3( 0.0, aWS.z, 0.0 );
  vec3 wpos = aPB.xyz + particleDisplace( aVL.xyz, aWS.z, age, uDrag );
  vec3 vcur = aVL.xyz * exp( -uDrag * age ) + grav * age;
  float speed = max( length( vcur ), 0.01 );
  vec3 axis = vcur / speed;
  float halfLen = max( aWS.x, speed * aWS.y * 0.5 );
  vec3 viewDir = normalize( cameraPosition - wpos );
  vec3 side = cross( axis, viewDir );
  float sl = length( side );
  side = sl > 1e-4 ? side / sl : vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] );
  wpos += axis * ( position.x * 2.0 * halfLen ) + side * ( position.y * 2.0 * aWS.x );
  float alpha = aC.w * ( 1.0 - smoothstep( 0.55, 1.0, t ) ) * nearFade( wpos );
  vColor = vec4( aC.rgb, alpha );
  vUv = uv;
  vec4 mvPosition = viewMatrix * vec4( wpos, 1.0 );
  ${O}
  gl_Position = projectionMatrix * mvPosition;
}
`,P=`
uniform float uIntensity;
varying vec2 vUv;
varying vec4 vColor;
varying float vT;
${k}
${ge}
void main() {
  float dy = abs( vUv.y * 2.0 - 1.0 );
  float dx = abs( vUv.x * 2.0 - 1.0 );
  float profile = ( 1.0 - dy * dy ) * ( 1.0 - dx * dx * dx );
  float core = smoothstep( 0.55, 0.0, dy );
  // r5 (critic: "dead-straight hairline streaks that read as vector lines"):
  // a soft bright GLOW HEAD at the leading end + a tail that thins to
  // nothing makes each streak read as a falling ember with a motion smear,
  // not a uniform-width rod.
  float head = smoothstep( 0.30, 0.92, vUv.x );
  float a = profile * vColor.a * ( 0.38 + 0.62 * head );
  if ( a < 0.004 ) discard;
  ${A}
  // incandescent cooling ramp: white-hot core -> orange -> deep red over life
  vec3 base = mix( vColor.rgb, vec3( 1.0, 0.30, 0.04 ), clamp( vT * 1.5, 0.0, 0.92 ) );
  vec3 col = toneCap( ( base * ( 0.55 + 0.45 * head )
    + vec3( core ) * ( 0.35 + 0.55 * head ) * ( 1.0 - vT * 0.85 ) ) * uIntensity );
  gl_FragColor = vec4( col * ( 1.0 - fogFactor ), a );
}
`,Ce=`
attribute vec4 aPB;   // origin.xyz, birth
attribute vec4 aAL;   // axis.xyz (unit), life
attribute vec4 aWL;   // width, len0, len1, seed
attribute vec4 aC;    // color.rgb, peakAlpha
uniform float uTime;
varying vec2 vUv;
varying vec4 vColor;
varying float vT;
varying float vSeed;
${D}
${M}
void main() {
  float life = aAL.w;
  float age = uTime - aPB.w;
  if ( life <= 0.0 || age < 0.0 || age > life ) {
    vUv = uv; vColor = vec4( 0.0 ); vT = 0.0; vSeed = 0.0;
    gl_Position = vec4( 0.0, 0.0, 2.0, 1.0 );
    ${O.replace(`-mvPosition.z`,`1.0`)}
    return;
  }
  float t = age / life;
  vT = t;
  vSeed = aWL.w;
  vec3 axis = aAL.xyz;
  // fast initial expansion, then hold while alpha decays (sub-100ms flash)
  float len = mix( aWL.y, aWL.z, pow( t, 0.3 ) );
  float u = position.x + 0.5;               // 0 at muzzle -> 1 at tip
  vec3 tipPos = aPB.xyz + axis * ( u * len );
  vec3 viewDir = normalize( cameraPosition - tipPos );
  vec3 side = cross( axis, viewDir );
  float sl = length( side );
  side = sl > 1e-4 ? side / sl : vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] );
  // cone envelope: narrow at the brake, widening toward the tip
  float env = 0.30 + 1.05 * u;
  vec3 wpos = tipPos + side * ( position.y * 2.0 * aWL.x * env );
  float alpha = aC.w * pow( 1.0 - t, 1.3 ) * nearFade( wpos );
  vColor = vec4( aC.rgb, alpha );
  vUv = uv;
  vec4 mvPosition = viewMatrix * vec4( wpos, 1.0 );
  ${O}
  gl_Position = projectionMatrix * mvPosition;
}
`,we=`
uniform sampler2D uMap;
uniform float uIntensity;
varying vec2 vUv;
varying vec4 vColor;
varying float vT;
varying float vSeed;
${k}
${ge}
void main() {
  // seeded UV jitter so no two jets sample the identical noise
  vec2 uv = vec2( vUv.x * ( 0.82 + 0.18 * fract( vSeed * 7.31 ) ),
                  clamp( vUv.y + ( fract( vSeed * 13.7 ) - 0.5 ) * 0.16, 0.0, 1.0 ) );
  float tex = texture2D( uMap, uv ).a;
  // r1 detached-bolt fix: erosion is biased DOWNRANGE (vUv.x) so a dying jet
  // burns off from the tip back toward the bore — the surviving bright mass
  // stays welded to the muzzle instead of freezing as a detached mid-cone
  // blob 1.5-2 m downrange while the bore is already dark.
  // r2 anti-static: screen-space hash jitter removed (see PUFF_FRAG_ADDITIVE)
  float er = 0.06 + vT * ( 0.45 + 0.75 * vUv.x );
  // 0.28 -> 0.46 band (r5): jet tips dissolved into hard noise speckle at
  // the flash frame edges — wider band keeps the cone ragged but soft
  float a = smoothstep( er, er + 0.46, tex ) * vColor.a;
  if ( a < 0.004 ) discard;
  ${A}
  // incandescent core near the muzzle end, cooling toward the ragged tip
  float heat = clamp( ( tex - er ) * 2.4, 0.0, 1.0 );
  float hot = 0.6 + heat * heat * ( 1.0 - vUv.x * 0.55 ) * 2.2;
  vec3 col = vColor.rgb * hot * ( 1.0 - vT * 0.35 );
  col = mix( vec3( 1.0, 0.30, 0.05 ) * ( 0.5 + 0.5 * vColor.r ), col, smoothstep( 0.0, 0.5, heat ) );
  gl_FragColor = vec4( toneCap( col * uIntensity ) * ( 1.0 - fogFactor ), a );
}
`,Te=`
attribute vec4 aPB;   // origin.xyz, birth
attribute vec4 aVL;   // vel.xyz, life
attribute vec4 aAR;   // spinAxis.xyz, spinRate
attribute vec4 aSG;   // scale, groundY, hot(0|1), seed
uniform float uTime;
varying vec3 vNormalW;
varying vec3 vTint;
varying float vHot;
varying float vFade;
varying vec3 vLocal;
varying float vSeed;
varying vec3 vWorldPos;
${D}
${j}
mat3 axisAngle( vec3 axis, float ang ) {
  float c = cos( ang ), s = sin( ang ), ic = 1.0 - c;
  vec3 a = axis;
  return mat3(
    ic*a.x*a.x + c,     ic*a.x*a.y + a.z*s, ic*a.x*a.z - a.y*s,
    ic*a.x*a.y - a.z*s, ic*a.y*a.y + c,     ic*a.y*a.z + a.x*s,
    ic*a.x*a.z + a.y*s, ic*a.y*a.z - a.x*s, ic*a.z*a.z + c );
}
void main() {
  float life = aVL.w;
  float age = uTime - aPB.w;
  if ( life <= 0.0 || age < 0.0 || age > life ) {
    vNormalW = vec3( 0.0, 1.0, 0.0 ); vTint = vec3( 0.0 ); vHot = 0.0; vFade = 0.0;
    vLocal = vec3( 0.0 ); vSeed = 0.0; vWorldPos = vec3( 0.0 );
    gl_Position = vec4( 0.0, 0.0, 2.0, 1.0 );
    ${O.replace(`-mvPosition.z`,`1.0`)}
    return;
  }
  float t = age / life;
  vec3 center = aPB.xyz + particleDisplace( aVL.xyz, -21.6, age, 0.12 );
  float grounded = step( center.y, aSG.y + aSG.x * 0.45 );
  center.y = max( center.y, aSG.y + aSG.x * 0.45 );
  float spin = aAR.w * age * mix( 1.0, 0.06, grounded );
  mat3 rot = axisAngle( normalize( aAR.xyz ), spin );
  float fade = 1.0 - smoothstep( 0.82, 1.0, t );
  // per-instance irregular chunk: seeded nonuniform scale + mild shear so no
  // two fragments read alike. Minimum thickness kept high — a chunk squashed
  // below ~0.6 of its width reads as a flat paper cutout in flight.
  float h1 = fract( aSG.w * 37.719 );
  float h2 = fract( aSG.w * 61.113 );
  float h3 = fract( aSG.w * 91.537 );
  // wider anisotropy than r6 (plates vs lumps) + stronger shear: with the
  // torn-plate composite base this yields shard/scrap silhouettes, never the
  // r7 "flat orange boxes"
  vec3 lp = position * vec3( 0.62 + h1 * 0.85, 0.42 + h2 * 0.95, 0.62 + h3 * 0.85 );
  lp.x += lp.y * ( h2 - 0.5 ) * 0.7;
  lp.z += lp.y * ( h1 - 0.5 ) * 0.55;
  vec3 off = rot * ( lp * aSG.x * fade );
  // r5 motion cue: velocity-aligned stretch on fast airborne chunks — a
  // tumbling slab frozen against the sky read as a static 2D card; smearing
  // the silhouette along the flight path reads as speed in every still.
  vec3 vcur = aVL.xyz * exp( -0.12 * age ) + vec3( 0.0, -21.6 * age, 0.0 );
  float spd = length( vcur );
  if ( spd > 1.0 && grounded < 0.5 ) {
    vec3 vdir = vcur / spd;
    off += vdir * dot( off, vdir ) * clamp( spd * 0.045, 0.0, 0.85 );
  }
  vec3 wpos = center + off;
  vNormalW = rot * normal;
  vLocal = lp;
  vSeed = aSG.w;
  vWorldPos = wpos;
  // charred-metal albedo — r5 (critic: "pale salmon-PINK flat chips"): the
  // 0.185/0.140/0.105 warm-brown top of the range, lit by the warm sun +
  // blast light, tone-mapped to salmon confetti on the grass. The range now
  // tops out at dark gunmetal-brown so lit chunks stay wreckage-dark; the
  // ember pockets supply all the orange.
  vTint = mix( vec3( 0.055, 0.052, 0.048 ), vec3( 0.115, 0.092, 0.070 ), h3 );
  // ember glow: airborne wreckage leaves the fireball HOT — near-full glow
  // through the first ~0.5 s (the r5 "flat matte-black slabs against sky"
  // window), then cools fast so grounded chunks never read orange popcorn.
  // r2: hold full glow 0.55 s and cool over ~1 s more (was gone by ~0.75 s)
  // so airborne wreckage visibly cools ember-orange -> dark in flight.
  // r6 (critic: "embers read as confetti ... static orange flecks pasted
  // flat on the grass, holding constant brightness"): per-chunk FLICKER
  // (seeded rate/phase — frozen frames catch a spread of phases, live
  // frames breathe) + a hard glow cut once grounded so landed chips read
  // as dying embers, never painted-on orange dots.
  float flick = 0.70 + 0.30 * sin( uTime * ( 12.0 + h1 * 11.0 ) + aSG.w * 61.0 );
  vHot = aSG.z * exp( -max( age - 0.55, 0.0 ) * ( 2.6 + grounded * 2.4 ) )
    * ( 0.40 + h2 * 0.60 ) * flick * mix( 1.0, 0.45, grounded );
  vFade = fade;
  vec4 mvPosition = viewMatrix * vec4( wpos, 1.0 );
  ${O}
  gl_Position = projectionMatrix * mvPosition;
}
`,Ee=`
uniform vec3 uSunDir;
// NOTE (hud_ui r5 build fix): no cameraPosition redeclaration here — three's
// ShaderMaterial prefixes 'uniform vec3 cameraPosition;' into FRAGMENT
// shaders too, so an explicit declaration is a GLSL redefinition error.
varying vec3 vNormalW;
varying vec3 vTint;
varying float vHot;
varying float vFade;
varying vec3 vLocal;
varying float vSeed;
varying vec3 vWorldPos;
${k}
void main() {
  if ( vFade <= 0.001 ) discard;
  vec3 n = normalize( vNormalW );
  float nl = max( dot( n, uSunDir ), 0.0 );
  // r5: hemisphere ambient raised + a view-dependent sky rim so a chunk
  // tumbling against the bright sky reads as a LIT 3D object with a cool
  // rim-lit edge, never an unlit matte-black 2D card.
  // r2: ambient floor + rim raised again — the r1 values still froze the
  // shard cloud as flat black polygon confetti against the fireball
  // (kill0 crop major). A wreck chunk in daylight reads mid-grey scorched
  // steel with a clear sky rim, never a light-swallowing cutout.
  float hemi = 0.46 + 0.38 * ( n.y * 0.5 + 0.5 );
  vec3 col = vTint * ( hemi + nl * 1.35 ) + vec3( 0.028, 0.026, 0.024 ) * hemi;
  vec3 viewDir = normalize( cameraPosition - vWorldPos );
  float rim = pow( 1.0 - abs( dot( n, viewDir ) ), 2.0 );
  // r5 (critic: "pale salmon-PINK flat chips scatter around the kill"): the
  // cool blue-grey rim ADDED onto the warm ember glow + blast light mixed to
  // salmon on any chip catching both. Rim is now a dim neutral grey and it
  // FADES OUT while the chunk is ember-hot, so hot chips stay gunmetal with
  // orange pockets and cold chips keep only a whisper of sky rim.
  col += vec3( 0.30, 0.32, 0.35 ) * rim * ( 0.10 + 0.16 * ( n.y * 0.5 + 0.5 ) )
    * ( 1.0 - clamp( vHot * 2.0, 0.0, 0.85 ) );
  // cooling ember glow (bloom feed): NOT a flat face tint — SMOOTH seeded
  // noise blotches so irregular PATCHES of the scorched chunk glow orange
  // while the rest stays charred black. r1: the old floor()-cell hash read as
  // a hard checkerboard-dither texture on chunks near the camera — value
  // noise (hashed lattice corners, smoothstep-interpolated) keeps the pockets
  // irregular but CONTINUOUS.
  // r5: sun-side ember floor 0.40 -> 0.28 + tighter pocket gate below — a
  // fully-lit landed chip used to glow across its whole top face, reading
  // as a pastel salmon petal on the grass instead of a cooling ember core.
  float edge = 0.28 + 0.72 * ( 1.0 - nl );
  vec3 lp3 = vLocal * 3.6 + vSeed * 29.0;
  vec3 c0 = floor( lp3 );
  vec3 f3 = lp3 - c0;
  f3 = f3 * f3 * ( 3.0 - 2.0 * f3 );
  #define DHASH(o) fract( sin( dot( c0 + o, vec3( 12.9898, 78.233, 37.719 ) ) ) * 43758.5453 )
  float n00 = mix( DHASH(vec3(0.,0.,0.)), DHASH(vec3(1.,0.,0.)), f3.x );
  float n10 = mix( DHASH(vec3(0.,1.,0.)), DHASH(vec3(1.,1.,0.)), f3.x );
  float n01 = mix( DHASH(vec3(0.,0.,1.)), DHASH(vec3(1.,0.,1.)), f3.x );
  float n11 = mix( DHASH(vec3(0.,1.,1.)), DHASH(vec3(1.,1.,1.)), f3.x );
  float pat = smoothstep( 0.60, 0.92, mix( mix( n00, n10, f3.y ), mix( n01, n11, f3.y ), f3.z ) );
  col += vec3( 1.35, 0.30, 0.04 ) * vHot * edge * ( 0.05 + 0.95 * pat );
  ${A}
  #ifdef USE_FOG
    col = mix( col, fogColor, fogFactor );
  #endif
  gl_FragColor = vec4( col, 1.0 );
}
`;function F(e,t){let n=new Float32Array(t*t);for(let t=0;t<n.length;t++)n[t]=e();return(e,r)=>{let i=(e-Math.floor(e))*t,a=(r-Math.floor(r))*t,o=Math.floor(i)%t,s=Math.floor(a)%t,c=(o+1)%t,l=(s+1)%t,u=i-Math.floor(i),d=a-Math.floor(a);u=u*u*(3-2*u),d=d*d*(3-2*d);let f=n[s*t+o],p=n[s*t+c],m=n[l*t+o],h=n[l*t+c];return f+(p-f)*u+(m-f)*d+(f-p-m+h)*u*d}}function De(e,t=4){let n=F(e,4),r=F(e,8),i=F(e,16),a=F(e,32),o=t>=5?F(e,64):null;return o?(e,t)=>(n(e,t)*.5+r(e,t)*.25+i(e,t)*.125+a(e,t)*.0625+o(e,t)*.03125)/.96875:(e,t)=>(n(e,t)*.5+r(e,t)*.25+i(e,t)*.125+a(e,t)*.0625)/.9375}function Oe(e,t,n,r=1){let i=De(t),a=e.getContext(`2d`,{willReadFrequently:!0}),o=a.getImageData(0,0,e.width,e.height),s=o.data,c=e.width,l=e.height,u=null;if(r!==1){u=new Uint8Array(256);for(let e=0;e<256;e++)u[e]=Math.round(255*(e/255)**r)}for(let e=0;e<l;e++)for(let t=0;t<c;t++){let r=i(t/c,e/l),a=1-n+n*Math.min(1,r*1.7),o=(e*c+t)*4+3,d=u?u[s[o]]:s[o];s[o]=Math.min(255,d*a)}a.putImageData(o,0,0)}function ke(e){return e===`fire`?{tileSize:256,octaves:5,churnLo:.55,churnHi:.55,gamma:.88}:e===`prop`?{tileSize:192,octaves:5,churnLo:.36,churnHi:.88,gamma:.98}:e===`dust`?{tileSize:128,octaves:4,churnLo:.58,churnHi:.62,gamma:1.06}:{tileSize:128,octaves:4,churnLo:.52,churnHi:.62,gamma:1.06}}function Ae(e,t,n,r,i){let a=t.tileSize,o=4*a,s=e/15,c=e%4*a,l=Math.floor(e/4)*a,u=s*1.35,d=Math.cos(u),f=Math.sin(u),p=1/(1+.5*s);for(let e=0;e<a;e++)je(e,c,l,o,s,d,f,p,t,n,r,i)}function je(e,t,n,r,i,a,o,s,c,l,u,d){let f=c.tileSize;for(let p=0;p<f;p++){let m=(p+.5)/f-.5,h=(e+.5)/f-.5,g=Math.sqrt(m*m+h*h)*2,_=(m*a-h*o)*s+.5+i*.23,v=(m*o+h*a)*s+.5,y=1-(g+(l(_,v)-.5)*(.4+.42*i)-.14)/(.76-.14*i);y=Math.max(0,Math.min(1,y)),y*=c.churnLo+c.churnHi*u(_*1.9+3.7,v*1.9+1.3),y=Math.max(0,(y-.2*i)/(1-.2*i)),y=Math.min(1,y)**+c.gamma;let b=Math.max(0,Math.min(1,(g-.84)/.15));y*=1-b*b*(3-2*b);let x=((n+e)*r+t+p)*4;d[x]=d[x+1]=d[x+2]=255,d[x+3]=Math.round(y*255)}}function*Me(e,t){let n=ke(t),r=4*n.tileSize,i=document.createElement(`canvas`);i.width=i.height=r;let a=i.getContext(`2d`),o=De(e,n.octaves),s=De(e,n.octaves),c=a.createImageData(r,r);for(let e=0;e<16;e++)Ae(e,n,o,s,c.data),yield;a.putImageData(c,0,0);let l=new w(i);return l.wrapS=l.wrapT=ee,l}function Ne(e){let t=document.createElement(`canvas`);t.width=256,t.height=96;let n=t.getContext(`2d`),r=De(e),i=n.createImageData(256,96),a=i.data;for(let e=0;e<96;e++)for(let t=0;t<256;t++){let n=t/256,i=e/96*2-1,o=r(n*1.6,e/96),s=.2+.72*n,c=Math.abs(i)/s+(o-.5)*.55,l=1-Math.max(0,Math.min(1,(c-.25)/.75));l*=1-Math.max(0,Math.min(1,(n+(o-.5)*.4-.55)/.42)),l*=Math.min(1,n/.05),l*=.45+.75*r(n*3.2+7.1,e/96*1.3+3.3),l=Math.max(0,Math.min(1,l))**.95;let u=(e*256+t)*4;a[u]=a[u+1]=a[u+2]=255,a[u+3]=Math.round(l*255)}n.putImageData(i,0,0);let o=new w(t);return o.wrapS=o.wrapT=ee,o}function Pe(e){let t=document.createElement(`canvas`);t.width=t.height=128;let n=t.getContext(`2d`,{willReadFrequently:!0});n.clearRect(0,0,128,128),n.globalCompositeOperation=`lighter`;let r=n.createRadialGradient(64,64,0,64,64,128*.5);r.addColorStop(0,`rgba(255,255,255,0.62)`),r.addColorStop(.18,`rgba(255,255,255,0.30)`),r.addColorStop(.45,`rgba(255,255,255,0.07)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,128,128);for(let t=0;t<5;t++){let r=t/5*Math.PI*2+e()*1.2,i=128*(.18+e()*.14),a=128*(.07+e()*.06);n.save(),n.translate(64,64),n.rotate(r),n.scale(i,a);let o=n.createRadialGradient(.35,0,0,.35,0,1);o.addColorStop(0,`rgba(255,255,255,0.34)`),o.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=o,n.beginPath(),n.arc(0,0,1,0,Math.PI*2),n.fill(),n.restore()}r=n.createRadialGradient(64,64,0,64,64,128*.16),r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.45,`rgba(255,255,255,0.7)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,128,128),n.globalCompositeOperation=`source-over`,Oe(t,e,.32,1.8);let i=new w(t);return i.wrapS=i.wrapT=ee,i}function Fe(e){let n=new c;return n.setAttribute(`position`,new t([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),n.setAttribute(`uv`,new t([0,0,1,0,1,1,0,1],2)),n.setIndex([0,1,2,0,2,3]),n.instanceCount=0,n._capacity=e,n}function Ie(e,t){let n=new _(.52,0);{let e=n.getAttribute(`position`),r=new Map;for(let n=0;n<e.count;n++){let i=e.getX(n),a=e.getY(n),o=e.getZ(n),s=`${i.toFixed(3)}|${a.toFixed(3)}|${o.toFixed(3)}`,c=r.get(s);c===void 0&&(c=.38+t()*1.15,r.set(s,c)),e.setXYZ(n,i*c,a*c,o*c)}}let r=new _(.55,0);{let e=r.getAttribute(`position`),n=new Map;for(let r=0;r<e.count;r++){let i=e.getX(r),a=e.getY(r),o=e.getZ(r),s=`${i.toFixed(3)}|${a.toFixed(3)}|${o.toFixed(3)}`,c=n.get(s);c===void 0&&(c=.55+t()*.9,n.set(s,c)),e.setXYZ(r,i*c*1.25,a*c*.16,o*c*.95)}r.rotateZ(.55),r.rotateX(-.35),r.translate(.34,.18,-.12)}let i=Le([n,r]);i.computeVertexNormals();let a=new c;return a.setAttribute(`position`,i.getAttribute(`position`)),a.setAttribute(`normal`,i.getAttribute(`normal`)),a.setAttribute(`uv`,i.getAttribute(`uv`)),a.instanceCount=0,a._capacity=e,a}function Le(e){let n=0;for(let t of e)n+=t.getAttribute(`position`).count;let r=new Float32Array(n*3),i=new Float32Array(n*2),a=0,o=0;for(let t of e){r.set(t.getAttribute(`position`).array,a);let e=t.getAttribute(`uv`);e&&i.set(e.array,o),a+=t.getAttribute(`position`).count*3,o+=t.getAttribute(`position`).count*2}let s=new b;return s.setAttribute(`position`,new t(r,3)),s.setAttribute(`uv`,new t(i,2)),s}var Re=class{constructor(e,t,n,r,i,a,s){this.name=e,this.capacity=i,this.cursor=0,this.highWater=0,this.lifeAttr=a,this.lifeComp=s,this.dirtyStart=-1,this.dirtyEnd=-1,this.dirtyStart2=-1,this.dirtyEnd2=-1,this.attrs={},this.attrList=[];for(let e of Object.keys(r)){let n=r[e],a=new v(new Float32Array(i*n),n);a.setUsage(o),this.attrs[e]=a,this.attrList.push(a),t.setAttribute(e,a)}this.geometry=t,this.mesh=new d(t,n),this.mesh.frustumCulled=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.castShadow=!1,this.mesh.receiveShadow=!1}claim(){let e=this.cursor;return this.cursor=(this.cursor+1)%this.capacity,this.highWater=Math.max(this.highWater,e+1),this.geometry.instanceCount=this.highWater,e}dirty(e){this.dirtyStart<0?(this.dirtyStart=e,this.dirtyEnd=e+1):e===this.dirtyEnd?this.dirtyEnd=e+1:e+1===this.dirtyStart?this.dirtyStart=e:e<this.dirtyStart?this.dirtyStart2<0?(this.dirtyStart2=e,this.dirtyEnd2=e+1):(this.dirtyStart2=Math.min(this.dirtyStart2,e),this.dirtyEnd2=Math.max(this.dirtyEnd2,e+1)):this.dirtyEnd=Math.max(this.dirtyEnd,e+1)}flush(){if(!(this.dirtyStart<0)){for(let e of this.attrList)e.addUpdateRange(this.dirtyStart*e.itemSize,(this.dirtyEnd-this.dirtyStart)*e.itemSize),this.dirtyStart2>=0&&e.addUpdateRange(this.dirtyStart2*e.itemSize,(this.dirtyEnd2-this.dirtyStart2)*e.itemSize),e.needsUpdate=!0;this.dirtyStart=this.dirtyEnd=this.dirtyStart2=this.dirtyEnd2=-1}}killAll(){let e=this.attrs[this.lifeAttr],t=e.array,n=e.itemSize;for(let e=0;e<this.capacity;e++)t[e*n+this.lifeComp]=0;e.clearUpdateRanges(),e.needsUpdate=!0,this.dirtyStart=this.dirtyEnd=this.dirtyStart2=this.dirtyEnd2=-1,this.cursor=0,this.highWater=0,this.geometry.instanceCount=0}};function ze(e,{seed:t=5e3}={}){let n=me(t),i=new re;i.name=`fx-particles`,i.matrixAutoUpdate=!1;let a={value:0},o={value:null},s={value:new u(1,1)},c={value:.5},l={value:4e3},d=-1/0,f=!1,p={layer:30,uSceneDepth:o,uSoftViewport:s,uCameraNear:c,uCameraFar:l,isActive:()=>a.value<=d};i.userData.softParticles=p;let m=()=>{let e=document.createElement(`canvas`);e.width=e.height=4;let t=new w(e);return t.wrapS=t.wrapT=ee,t},h=m(),_=m(),v=m(),y=m(),b=m(),x=m(),S=!1,te=null,C=null,T=null;function ae(e,t){e.dispose(),e.image=t.image,e.needsUpdate=!0,t.dispose()}function oe(e,t){e.dispose(),e.image=t,e.needsUpdate=!0}function se(e){return new Promise((t,n)=>{let r=new Image;r.decoding=`async`,r.onload=async()=>{try{await r.decode?.()}catch{}t(r)},r.onerror=()=>n(Error(`Particle atlas failed to load: ${e}`)),r.src=e})}function ce(){return S||C?Promise.resolve(!0):(T||=Promise.all(Object.entries(he).map(async([e,t])=>[e,await se(t)])).then(e=>(C=Object.fromEntries(e),!0)).catch(()=>!1),T)}function le(){return S||!C?S:te?!1:(oe(h,C.smoke),oe(_,C.fire),oe(v,C.prop),oe(y,C.dust),oe(b,C.flash),oe(x,C.jet),S=!0,!0)}function*ue(){let e=[[h,`smoke`],[_,`fire`],[v,`prop`],[y,`dust`]];for(let[t,r]of e){let e=Me(n,r),i=e.next();for(;!i.done;)yield,i=e.next();ae(t,i.value),yield}ae(b,Pe(n)),yield,ae(x,Ne(n))}function de(e){te===e&&(te=null,S=!0)}function fe(){if(S||le())return;let e=te||=ue();try{for(;;){if(te!==e)return;if(e.next().done){de(e);return}}}catch(t){throw te===e&&(te=null),t}}async function pe(e,{assets:t=`preload`}={}){if(S||(t===`preload`&&await ce(),le()))return;let n=te||=ue();for(;;){if(te!==n)return;try{if(n.next().done){de(n);return}}catch(e){throw te===n&&(te=null),e}await e()}}let D=()=>ne.clone(ie.fog),O=new r(.527,.574,-.627).normalize();function k(e,t,n,r,i=1,d=[.5,2.2]){return new g({vertexShader:_e,fragmentShader:t?ye:ve,uniforms:Object.assign(D(),{uTime:a,uMap:{value:e},uDrag:{value:n},uIntensity:{value:r},uTiles:{value:i},uSunDirW:{value:O},uNearFade:{value:new u(d[0],d[1])},uSceneDepth:o,uSoftViewport:s,uCameraNear:c,uCameraFar:l}),transparent:!0,depthWrite:!1,depthTest:!0,blending:t?2:1,fog:!0})}let A={aPB:4,aVL:4,aSR:4,aC0:4,aC1:4},j={smoke:new Re(`smoke`,Fe(E.smoke),k(h,!1,.9,1,4),A,E.smoke,`aVL`,3),fire:new Re(`fire`,Fe(E.fire),k(_,!0,1.6,.66,4,[1.2,4.6]),A,E.fire,`aVL`,3),billow:new Re(`billow`,Fe(E.billow),(()=>{let e=k(_,!1,1.4,1,4,[1.2,4.6]);return e.fragmentShader=be,e})(),A,E.billow,`aVL`,3),psmoke:new Re(`psmoke`,Fe(E.psmoke),(()=>{let e=k(v,!1,.9,1,4,[.8,3]);return e.fragmentShader=xe,e})(),A,E.psmoke,`aVL`,3),dust:new Re(`dust`,Fe(E.dust),k(y,!1,1.4,1,4),A,E.dust,`aVL`,3),flash:new Re(`flash`,Fe(E.flash),k(b,!0,.6,1.7,1,[1.2,4.6]),A,E.flash,`aVL`,3),jet:new Re(`jet`,Fe(E.jet),new g({vertexShader:Ce,fragmentShader:we,uniforms:Object.assign(D(),{uTime:a,uMap:{value:x},uIntensity:{value:1.6},uNearFade:{value:new u(1.2,4.6)}}),transparent:!0,depthWrite:!1,blending:2,side:2,fog:!0}),{aPB:4,aAL:4,aWL:4,aC:4},E.jet,`aAL`,3),sparks:new Re(`sparks`,Fe(E.sparks),new g({vertexShader:Se,fragmentShader:P,uniforms:Object.assign(D(),{uTime:a,uDrag:{value:1.1},uIntensity:{value:1.45},uNearFade:{value:new u(.9,3.4)}}),transparent:!0,depthWrite:!1,blending:2,side:2,fog:!0}),{aPB:4,aVL:4,aWS:4,aC:4},E.sparks,`aVL`,3),debris:new Re(`debris`,Ie(E.debris,me(t^20973|0)),new g({vertexShader:Te,fragmentShader:Ee,uniforms:Object.assign(D(),{uTime:a,uSunDir:{value:O}}),fog:!0}),{aPB:4,aVL:4,aAR:4,aSG:4},E.debris,`aVL`,3)},M=Object.values(j);j.debris.mesh.renderOrder=0,j.dust.mesh.renderOrder=20,j.smoke.mesh.renderOrder=21,j.psmoke.mesh.renderOrder=21.2,j.billow.mesh.renderOrder=21.5,j.fire.mesh.renderOrder=22,j.jet.mesh.renderOrder=23,j.flash.mesh.renderOrder=23,j.sparks.mesh.renderOrder=23;for(let[e,t]of Object.entries(j))e!==`debris`&&t.mesh.layers.set(30);for(let e of M)i.add(e.mesh);function N(e,t){let n=e.claim(),r=a.value+(t.birthOffset||0),i=e.attrs,o=i.aPB.array,s=i.aVL.array,c=i.aSR.array,l=i.aC0.array,u=i.aC1.array,f=n*4;o[f]=t.pos[0],o[f+1]=t.pos[1],o[f+2]=t.pos[2],o[f+3]=r,s[f]=t.vel[0],s[f+1]=t.vel[1],s[f+2]=t.vel[2],s[f+3]=t.life,c[f]=t.size0,c[f+1]=t.size1,c[f+2]=t.rot||0,c[f+3]=t.rotVel||0,l[f]=t.col0[0],l[f+1]=t.col0[1],l[f+2]=t.col0[2],l[f+3]=t.grav||0,u[f]=t.col1[0],u[f+1]=t.col1[1],u[f+2]=t.col1[2],u[f+3]=t.alpha,d=Math.max(d,r+Math.max(0,t.life||0)),e.dirty(n)}function ge(e,t){let n=e.claim(),r=a.value+(t.birthOffset||0),i=e.attrs,o=i.aPB.array,s=i.aVL.array,c=i.aWS.array,l=i.aC.array,u=n*4;o[u]=t.pos[0],o[u+1]=t.pos[1],o[u+2]=t.pos[2],o[u+3]=r,s[u]=t.vel[0],s[u+1]=t.vel[1],s[u+2]=t.vel[2],s[u+3]=t.life,c[u]=t.width,c[u+1]=t.stretch,c[u+2]=t.grav===void 0?-21.6:t.grav,c[u+3]=t.seed||0,l[u]=t.col[0],l[u+1]=t.col[1],l[u+2]=t.col[2],l[u+3]=t.alpha,d=Math.max(d,r+Math.max(0,t.life||0)),e.dirty(n)}function F(e,t){let n=e.claim(),r=a.value+(t.birthOffset||0),i=e.attrs,o=i.aPB.array,s=i.aVL.array,c=i.aAR.array,l=i.aSG.array,u=n*4;o[u]=t.pos[0],o[u+1]=t.pos[1],o[u+2]=t.pos[2],o[u+3]=r,s[u]=t.vel[0],s[u+1]=t.vel[1],s[u+2]=t.vel[2],s[u+3]=t.life,c[u]=t.axis[0],c[u+1]=t.axis[1],c[u+2]=t.axis[2],c[u+3]=t.spin,l[u]=t.scale,l[u+1]=t.groundY,l[u+2]=typeof t.hot==`number`?t.hot:+!!t.hot,l[u+3]=t.seed||0,e.dirty(n)}function De(e,t){let n=e.claim(),r=a.value+(t.birthOffset||0),i=e.attrs,o=i.aPB.array,s=i.aAL.array,c=i.aWL.array,l=i.aC.array,u=n*4;o[u]=t.pos[0],o[u+1]=t.pos[1],o[u+2]=t.pos[2],o[u+3]=r,s[u]=t.axis[0],s[u+1]=t.axis[1],s[u+2]=t.axis[2],s[u+3]=t.life,c[u]=t.width,c[u+1]=t.len0,c[u+2]=t.len1,c[u+3]=t.seed||0,l[u]=t.col[0],l[u+1]=t.col[1],l[u+2]=t.col[2],l[u+3]=t.alpha,d=Math.max(d,r+Math.max(0,t.life||0)),e.dirty(n)}let Oe={smoke:e=>N(j.smoke,e),fire:e=>N(j.fire,e),billow:e=>N(j.billow,e),psmoke:e=>N(j.psmoke,e),dust:e=>N(j.dust,e),flash:e=>N(j.flash,e),jet:e=>De(j.jet,e),sparks:e=>ge(j.sparks,e),debris:e=>F(j.debris,e)};return{group:i,pools:j,softParticles:p,warmTextures:fe,warmTexturesChunked:pe,preloadTextures:ce,getTime(){return a.value},update(t){f||(a.value+=t);let n=e?.scene?.userData?.sunDirWorld;n&&n.lengthSq()>1e-8&&O.copy(n).normalize();for(let e of M)e.flush()},setFrozen(e,t=null){f=e,t!=null&&(a.value=t)},emit(e,t){let n=Oe[e];if(!n)throw Error(`particles: unknown pool '${e}'`);n(t)},shiftTime(e){for(let t of M){let n=t.attrs.aPB,r=t.attrs[t.lifeAttr],i=t.highWater;for(let a=0;a<i;a++)r.array[a*4+t.lifeComp]<=0||(n.array[a*4+3]+=e);n.clearUpdateRanges(),n.addUpdateRange(0,i*4),n.needsUpdate=!0}Number.isFinite(d)&&(d+=e)},resetAll(){for(let e of M)e.killAll();d=-1/0}}}var Be=ce.surfaceLiftM,Ve=1024,He=4,I=Ve/He,Ue=4,L={pen:[0,1,2,3],crit:[4,5],scuff:[6,7,15],gouge:[8,9,10,11],scorch:[12,13,14]};function We(e,t=!1){let n,r=1,i=!1;if(e===`pen`||e===`he_pen`)n=t?`crit`:`pen`,r=e===`he_pen`?1.3:1,i=!0;else if(e===`ricochet`)n=`gouge`;else if(e===`nonpen`)n=`scuff`;else if(e===`spaced_absorb`)n=`scuff`,r=1.12;else if(e===`era`)n=`scorch`,r=.55;else if(e===`he_splash`)n=`scorch`;else return null;return{family:n,sizeK:r,hasHole:i,variants:L[n].length}}function Ge(e,t){let n=t%He*I,r=Math.floor(t/He)*I;return e.save(),e.beginPath(),e.rect(n,r,I,I),e.clip(),e.translate(n,r),[n,r]}function Ke(e,t,n,r,i,a=3.1){let o=e.getImageData(n,r,I,I),s=o.data;for(let e=0;e<I;e++)for(let n=0;n<I;n++){let r=(e*I+n)*4+3;if(s[r]===0)continue;let o=t(n/I*a,e/I*a),c=Math.max(0,Math.min(1,o*2-.35));s[r]=s[r]*(1-i+i*c)}e.putImageData(o,n,r)}function qe(e,t,n,r,i,a){for(let o=0;o<3;o++){let o=(t()-.5)*i*.22,s=(t()-.5)*i*.22,c=i*(.72+t()*.34),l=e.createRadialGradient(n+o,r+s,0,n+o,r+s,c);l.addColorStop(0,`rgba(16,13,11,${(a*(.55+t()*.2)).toFixed(3)})`),l.addColorStop(.55,`rgba(21,17,14,${(a*.34).toFixed(3)})`),l.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=l,e.fillRect(0,0,I,I)}}function Je(e,t,n){let r=I/2,i=r;qe(e,t,r,r,i*(n?.95:.8),n?.75:.6);let a=e.createRadialGradient(r,r,0,r,r,i*.62);a.addColorStop(.32,`rgba(0,0,0,0)`),a.addColorStop(.52,`rgba(142,134,120,0.15)`),a.addColorStop(.78,`rgba(120,112,100,0.05)`),a.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=a,e.fillRect(0,0,I,I);let o=4+Math.floor(t()*4);for(let n=0;n<o;n++){let n=t()*Math.PI*2,a=i*(.3+t()*.36),o=i*(.03+t()*.045),s=i*.17;e.save(),e.translate(r,r),e.rotate(n);let c=e.createLinearGradient(s,0,s+a,0);c.addColorStop(0,`rgba(12,10,8,${.55+t()*.25})`),c.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=c,e.beginPath(),e.ellipse(s+a*.45,0,a*.62,o,0,0,Math.PI*2),e.fill(),e.restore()}let s=i*(n?.225:.2),c=e.createRadialGradient(r,r,0,r,r,s*2.6);c.addColorStop(.3,`rgba(0,0,0,0)`),c.addColorStop(.52,`rgba(96,62,50,0.34)`),c.addColorStop(.74,`rgba(74,56,64,0.22)`),c.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=c,e.fillRect(0,0,I,I);let l=e.createRadialGradient(r,r,0,r,r,s*1.9);l.addColorStop(0,`rgba(0,0,0,0)`),l.addColorStop(.5,`rgba(255,224,170,${n?.9:.85})`),l.addColorStop(.66,n?`rgba(250,120,48,0.66)`:`rgba(250,146,62,0.6)`),l.addColorStop(.85,`rgba(160,62,26,0.26)`),l.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=l,e.fillRect(0,0,I,I);let u=3+Math.floor(t()*3);for(let n=0;n<u;n++){let n=t()*Math.PI*2,i=s*(.9+t()*.5),a=1.4+t()*2.2,o=e.createRadialGradient(r+Math.cos(n)*i,r+Math.sin(n)*i,0,r+Math.cos(n)*i,r+Math.sin(n)*i,a*2);o.addColorStop(0,`rgba(255,214,150,0.85)`),o.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=o,e.fillRect(0,0,I,I)}let d=i*(n?.155:.14),f=e.createRadialGradient(r,r,0,r,r,d*1.2);f.addColorStop(0,`rgba(3,2,2,0.985)`),f.addColorStop(.78,`rgba(6,5,4,0.97)`),f.addColorStop(1,`rgba(10,8,6,0)`),e.fillStyle=f,e.fillRect(0,0,I,I);let p=2+Math.floor(t()*2);for(let n=0;n<p;n++){let n=t()*Math.PI*2,a=i*(.18+t()*.22),o=s*(1+t()*.4);e.save(),e.translate(r,r),e.rotate(n);let c=e.createLinearGradient(o,0,o+a,0);c.addColorStop(0,`rgba(214,220,228,${.5+t()*.3})`),c.addColorStop(1,`rgba(214,220,228,0)`),e.fillStyle=c,e.fillRect(o,-(.6+t()*.9),a,1.2+t()*1.8),e.restore()}}function Ye(e,t){let n=I/2+(t()-.5)*10,r=I*.08,i=16+Math.floor(t()*6);for(let a=0;a<i;a++){let i=n+(t()-.5)*I*.17,a=r+t()*I*.2,o=I*(.3+t()*.52),s=1+t()*2.6,c=150+t()*92,l=.28+t()*.45,u=e.createLinearGradient(a,0,a+o,0);u.addColorStop(0,`rgba(${c*.92|0},${c*.95|0},${c|0},0)`),u.addColorStop(.22,`rgba(${c*.92|0},${c*.95|0},${c|0},${l})`),u.addColorStop(1,`rgba(${c*.92|0},${c*.95|0},${c|0},0)`),e.fillStyle=u,e.fillRect(a,i-s/2,o,s)}for(let r=0;r<3;r++){let r=n+(t()-.5)*I*.05,i=I*(.14+t()*.08),a=I*(.26+t()*.2),o=e.createLinearGradient(i,0,i+a,0);o.addColorStop(0,`rgba(232,238,246,0)`),o.addColorStop(.3,`rgba(232,238,246,${.55+t()*.3})`),o.addColorStop(1,`rgba(232,238,246,0)`),e.fillStyle=o,e.fillRect(i,r-1.1,a,2.2)}for(let i of[-1,1]){let a=n+i*I*(.085+t()*.03),o=r+t()*I*.1,s=I*(.4+t()*.3),c=e.createLinearGradient(o,0,o+s,0);c.addColorStop(0,`rgba(24,21,18,0)`),c.addColorStop(.3,`rgba(24,21,18,${.3+t()*.2})`),c.addColorStop(1,`rgba(24,21,18,0)`),e.fillStyle=c,e.fillRect(o,a-2,s,4)}let a=e.createRadialGradient(I*.2,n,0,I*.2,n,I*.17);a.addColorStop(0,`rgba(255,172,92,0.34)`),a.addColorStop(1,`rgba(255,140,70,0)`),e.fillStyle=a,e.fillRect(0,0,I,I),e.globalCompositeOperation=`destination-in`,e.save(),e.translate(I*.4,n),e.scale(2.7,1);let o=e.createRadialGradient(0,0,0,0,0,I*.235);o.addColorStop(0,`rgba(255,255,255,1)`),o.addColorStop(.62,`rgba(255,255,255,0.92)`),o.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=o,e.fillRect(-256,-256,I*2.5,I*2),e.restore(),e.globalCompositeOperation=`source-over`}function Xe(e,t){let n=I/2,r=n,i=5+Math.floor(t()*3);for(let a=0;a<i;a++){let i=t()*Math.PI*2,a=t()*r*.34,o=n+Math.cos(i)*a,s=n+Math.sin(i)*a,c=r*(.3+t()*.34),l=e.createRadialGradient(o,s,0,o,s,c);l.addColorStop(0,`rgba(14,11,9,${.38+t()*.2})`),l.addColorStop(.6,`rgba(18,14,11,${.2+t()*.12})`),l.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=l,e.fillRect(0,0,I,I)}for(let i=0;i<10;i++){let i=t()*Math.PI*2,a=r*(.38+t()*.5),o=r*(.02+t()*.05);e.save(),e.translate(n,n),e.rotate(i);let s=e.createLinearGradient(r*.1,0,r*.1+a,0);s.addColorStop(0,`rgba(13,10,8,${.24+t()*.16})`),s.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=s,e.beginPath(),e.ellipse(r*.1+a*.5,0,a*.62,o,0,0,Math.PI*2),e.fill(),e.restore()}}function Ze(e,t){let n=I/2,r=n,i=e.createRadialGradient(n,n,0,n,n,r*.34);i.addColorStop(0,`rgba(26,22,19,0.4)`),i.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=i,e.fillRect(0,0,I,I);let a=r*(.3+t()*.05),o=5+Math.floor(t()*4);for(let r=0;r<o;r++){let r=t()*Math.PI*2,i=.4+t()*.9;e.strokeStyle=`rgba(168,173,180,${.35+t()*.3})`,e.lineWidth=2+t()*4,e.beginPath(),e.arc(n,n,a*(.9+t()*.25),r,r+i),e.stroke()}for(let i=0;i<4;i++){let i=t()*Math.PI*2,o=a*(.9+t()*.3),s=r*(.1+t()*.16);e.save(),e.translate(n,n),e.rotate(i);let c=e.createLinearGradient(o,0,o+s,0);c.addColorStop(0,`rgba(180,184,190,${.4+t()*.3})`),c.addColorStop(1,`rgba(180,184,190,0)`),e.fillStyle=c,e.fillRect(o,-.9,s,1.8),e.restore()}}function*Qe(e,t){let n=document.createElement(`canvas`);n.width=n.height=Ve;let r=n.getContext(`2d`,{willReadFrequently:!0});if(!r)throw Error(`Impact decal atlas requires a 2D canvas context.`);r.clearRect(0,0,Ve,Ve);let i=De(e),a=(e,t,n,a)=>{let[o,s]=Ge(r,e);t(),r.restore(),Ke(r,i,o,s,n,a)};for(let t of L.pen)a(t,()=>Je(r,e,!1),.3,3.4),yield;for(let t of L.crit)a(t,()=>Je(r,e,!0),.3,3.4),yield;for(let t of L.scuff)a(t,()=>Ze(r,e),.34,4),yield;for(let t of L.gouge)a(t,()=>Ye(r,e),.26,5.2),yield;for(let t of L.scorch)a(t,()=>Xe(r,e),.62,2.6),yield;let o=new w(n);return o.colorSpace=m,o.wrapS=o.wrapT=ee,o.anisotropy=Math.max(1,t|0),o}var $e=new r,R=new r,et=new r,tt=new r,nt=new r,rt=new p,it=new a,at=new r,z=new r,ot=new S,st=new r,ct=new r,lt=new p,ut=new p,dt=new r,ft=new y;function pt(e,t,n){e.updateWorldMatrix(!0,!0),st.copy(t),e.localToWorld(st),e.getWorldQuaternion(lt),ct.copy(n).applyQuaternion(lt).normalize(),ot.ray.origin.copy(st).addScaledVector(ct,.9),ot.ray.direction.copy(ct).negate(),ot.near=0,ot.far=1.45;let r=ot.intersectObject(e,!0);for(let i of r)if(mt(e,i.object))return ht(e,i,t,n),!0;return!1}function mt(t,n){if(!n.visible||n.name===`fx_impactDecals`||!(n instanceof d)||n instanceof e)return!1;for(let e=n.parent;e&&e!==t;e=e.parent)if(!e.visible)return!1;let r=Array.isArray(n.material)?n.material[0]:n.material;return!!r&&r.colorWrite!==!1&&r.transparent!==!0}function ht(e,t,n,r){e.worldToLocal(n.copy(t.point)),t.face&&(ft.getNormalMatrix(t.object.matrixWorld),dt.copy(t.face.normal).applyMatrix3(ft).normalize(),ut.copy(lt).invert(),dt.applyQuaternion(ut),dt.dot(r)>.45&&r.copy(dt).normalize())}function gt(e){if(!e?.length)return null;let t={mn:[1/0,1/0,1/0],mx:[-1/0,-1/0,-1/0]};for(let n of e)if(Array.isArray(n.verts))for(let e of n.verts)_t(t,e);return t.mn[0]<t.mx[0]?t:null}function _t(e,t){e.mn[0]=Math.min(e.mn[0],t[0]),e.mn[1]=Math.min(e.mn[1],t[1]),e.mn[2]=Math.min(e.mn[2],t[2]),e.mx[0]=Math.max(e.mx[0],t[0]),e.mx[1]=Math.max(e.mx[1],t[1]),e.mx[2]=Math.max(e.mx[2],t[2])}function B(e){let t=e%He,n=Math.floor(e/He);return{u0:(t*I+Ue)/Ve,u1:((t+1)*I-Ue)/Ve,v0:1-((n+1)*I-Ue)/Ve,v1:1-(n*I+Ue)/Ve}}function*vt({anisotropy:e=4,seed:n=5371811}={}){let r=me(n>>>0),a=new i({map:yield*Qe(me((n^ce.wearSeedSalt)>>>0),e),transparent:!0,vertexColors:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});function c(){let e=new b,n=new t(new Float32Array(288),3),r=new t(new Float32Array(192),2),i=new t(new Float32Array(384),4);n.setUsage(o),r.setUsage(o),i.setUsage(o);let s=[];for(let e=0;e<24;e++){let t=e*4;s.push(t,t+1,t+2,t,t+2,t+3)}e.setAttribute(`position`,n),e.setAttribute(`uv`,r),e.setAttribute(`color`,i),e.setIndex(s);let c=new d(e,a);return c.name=`fx_impactDecals`,c.userData.surfaceMarkingLayer=`impact`,c.renderOrder=3,c.castShadow=c.receiveShadow=!1,c.frustumCulled=!1,{mesh:c,geo:e,pos:n,uv:r,col:i,used:0,free:[]}}let l=[];function u(){let e=l.pop()||c();return e.mesh.material=a,e.used=0,e.free.length=0,e.pos.array.fill(0),e.pos.needsUpdate=!0,e}function f(e){e.mesh.parent&&e.mesh.parent.remove(e.mesh),l.length<24?l.push(e):e.geo.dispose()}let p=new Map,m=new WeakMap,h=0,g=new Map;function _(e,t){let n=p.get(e);if(n&&n.visual!==t&&(v(n),n=void 0),!n){if(p.size>=20){let e=null,t=1/0;for(let[n,r]of p)r.lastStampT<t&&(t=r.lastStampT,e=n);if(e!==null){let t=p.get(e);t&&v(t)}}n={key:e,visual:t,hull:null,turret:null,gun:null,turretNode:null,gunNode:null,ring:Array(24),head:0,count:0,lastStampT:0},p.set(e,n)}return n}function v(e){e.hull&&f(e.hull),e.turret&&f(e.turret),e.gun&&f(e.gun),p.delete(e.key)}function y(e){if(!e||!e.armor)return null;let t=g.get(e.id);return t===void 0?(t=gt(e.armor.turretPlates),g.set(e.id,t),t):t}let x=.22;function S(e){let t=e.kind;if(t===`he_splash`&&(!e.zone||!e.localPos))return null;let n=We(t,!!(e.modulesHit&&e.modulesHit.length>0||e.crewHit&&e.crewHit.length>0||e.ammoRacked||e.fireStarted));return n?{fam:n.family,sizeK:n.sizeK}:null}function ee(e,t,n){let i=T.clamp((t||90)/100,.5,1.7);switch(e){case`crit`:return{w:.4*i*(.85+r()*.35)*n,h:0};case`pen`:return{w:.34*i*(.85+r()*.35)*n,h:0};case`gouge`:{let e=.74*i*(.85+r()*.45)*n;return{w:e,h:e*(.3+r()*.1)}}case`scorch`:return{w:.95*i*(.75+r()*.5)*n,h:0};case`scuff`:return{w:.26*i*(.8+r()*.4)*n,h:0};default:return{w:.3*i,h:0}}}function te(e){let t=.9+r()*.1;switch(e){case`crit`:return{r:.82*t,g:.82*t,b:.82*t,a:1};case`pen`:return{r:t,g:t,b:t,a:1};case`gouge`:return{r:t,g:t,b:t,a:.95};case`scorch`:return{r:.95*t,g:.95*t,b:.95*t,a:.82+r()*.13};case`scuff`:return{r:t,g:t,b:t,a:.82};default:return{r:1,g:1,b:1,a:1}}}function ne(e,t,n,i,a,o,s,c,l){let u=e.pos.array,d=e.uv.array,f=e.col.array,p=B(c),m=r()<.5,h=m?p.v1:p.v0,g=m?p.v0:p.v1,_=t*12;u[_++]=n.x-i.x*o-a.x*s,u[_++]=n.y-i.y*o-a.y*s,u[_++]=n.z-i.z*o-a.z*s,u[_++]=n.x+i.x*o-a.x*s,u[_++]=n.y+i.y*o-a.y*s,u[_++]=n.z+i.z*o-a.z*s,u[_++]=n.x+i.x*o+a.x*s,u[_++]=n.y+i.y*o+a.y*s,u[_++]=n.z+i.z*o+a.z*s,u[_++]=n.x-i.x*o+a.x*s,u[_++]=n.y-i.y*o+a.y*s,u[_++]=n.z-i.z*o+a.z*s;let v=t*8;d[v++]=p.u0,d[v++]=h,d[v++]=p.u1,d[v++]=h,d[v++]=p.u1,d[v++]=g,d[v++]=p.u0,d[v++]=g;let y=t*16;for(let e=0;e<4;e++)f[y++]=l.r,f[y++]=l.g,f[y++]=l.b,f[y++]=l.a;e.pos.needsUpdate=!0,e.uv.needsUpdate=!0,e.col.needsUpdate=!0}function re(e,t){e.pos.array.fill(0,t*12,t*12+12),e.col.array.fill(0,t*16,t*16+16),e.pos.needsUpdate=!0,e.col.needsUpdate=!0}function C(e,t,n){let r=e[t];if(r?r.mesh.parent!==n&&(r.mesh.parent&&r.mesh.parent.remove(r.mesh),n.add(r.mesh)):(r=u(),e[t]=r,n.add(r.mesh)),e.count>=24){let t=e.ring[e.head];e.head=(e.head+1)%24,e.count--;let n=t?e[t.nodeKey]:null;t&&n&&(re(n,t.slot),n.free.push(t.slot))}let i=r.free.length?r.free.pop():r.used++,a=(e.head+e.count)%24;return e.ring[a]={nodeKey:t,slot:i},e.count++,{nm:r,slot:i}}let w={nodeKey:`hull`,node:new s};function ie(e,t,n){let r=n===`gun`,i=r?`gunNode`:`turretNode`,a=r?`rig_gun`:`rig_turret`;return e[i]||(e[i]=t.root.getObjectByName(a)??null)}function ae(e,t,n,r,i){let a=ie(e,t,n);return a?(w.nodeKey=n,w.node=a,n===`gun`&&r&&(i.x-=r[0],i.y-=r[1],i.z-=r[2]),!0):!1}function oe(e,t,n,r){return e>r.mn[0]-x&&e<r.mx[0]+x&&t>r.mn[1]-x&&t<r.mx[1]+x&&n>r.mn[2]-x&&n<r.mx[2]+x}function se(e,t,n,r,i,a,o,s){z.copy(n),z.x-=o[0],z.y-=o[1],z.z-=o[2];let c=Math.cos(-a||0),l=Math.sin(-a||0),u=z.x*c+z.z*l,d=-z.x*l+z.z*c;if(!oe(u,z.y,d,s))return;let f=ie(e,t,`turret`);f&&(w.nodeKey=`turret`,w.node=f,n.set(u,z.y,d),pe(r,c,l),i&&pe(i,c,l))}function le(e,t,n,r,i,a,o,s,c,l){return w.nodeKey=`hull`,w.node=t.root,n===`turret`||n===`gun`?ae(e,t,n,r,i):(!n&&l&&c&&se(e,t,i,a,o,s,c,l),!0)}function ue(e,t,n){if(R.copy(t).normalize(),R.lengthSq()<.5&&R.set(0,1,0),e===`gouge`&&n&&(tt.copy(n).addScaledVector(R,-n.dot(R)),tt.lengthSq()>.02)){tt.normalize(),nt.crossVectors(R,tt).normalize();return}tt.set(.31,.65,.69).cross(R),tt.lengthSq()<1e-4&&tt.set(1,0,0).cross(R),tt.normalize();let i=r()*Math.PI*2;nt.crossVectors(R,tt),tt.multiplyScalar(Math.cos(i)).addScaledVector(nt,Math.sin(i)).normalize(),nt.crossVectors(R,tt).normalize()}function de(e,t,n,i,a){let{w:o,h:s}=ee(t,i,n),c=Be+r()*.002;at.copy(a).addScaledVector(R,c);let l=L[t],u=l[r()*l.length|0],{nm:d,slot:f}=C(e,w.nodeKey,w.node);ne(d,f,at,tt,nt,o/2,(s||o)/2,u,te(t))}function fe(e,t,n,r,i,a,o,s,c,l,u,d=null,f=null){let p=_(e,t);return p.lastStampT=typeof performance<`u`?performance.now():Date.now(),le(p,t,d,f,a,o,s,c,l,u)?(pt(w.node,a,o),ue(n,o,s),de(p,n,r,i,a),!0):!1}function pe(e,t,n){let r=e.x*t+e.z*n,i=-e.x*n+e.z*t;e.x=r,e.z=i}function E(e){return typeof e.impactFrame==`string`&&Array.isArray(e.impactLocalPos)?e.impactFrame:null}function he(e){it.set(-(e.visualPitch||0),e.yaw||0,e.visualRoll||0,`YXZ`),rt.setFromEuler(it).invert()}function D(e,t,n){return n&&e.impactLocalPos?($e.fromArray(e.impactLocalPos),!0):e.localPos?($e.fromArray(e.localPos),!0):!e.pos||!t.pos?!1:(he(t),$e.fromArray(e.pos).sub(t.pos).applyQuaternion(rt),!0)}function O(e,t,n){if(n&&e.impactLocalNormal){R.fromArray(e.impactLocalNormal);return}if(n&&e.impactLocalDir){R.fromArray(e.impactLocalDir).negate();return}he(t),R.set(e.normal?.[0]??0,e.normal?.[1]??1,e.normal?.[2]??0).applyQuaternion(rt)}function k(e,t){let n=t&&e.impactLocalDir?e.impactLocalDir:e.localDir;return n?et.fromArray(n):null}return{material:a,stampFromEvent(e,t){if(!e||!t||!t.visual||!t.visual.root)return!1;let n=t.visual;if(n.isDestroyed&&n.isDestroyed()||e.zone===`gun_barrel`)return!1;let r=S(e);if(!r)return!1;let i=t.state,a=E(e);if(a===`barrel`||!D(e,i,a))return!1;O(e,i,a);let o=k(e,a),s=t.spec&&t.spec.armor;return fe(String(e.targetId),n,r.fam,r.sizeK,e.caliberMm,$e,R,o,i.turretYaw||0,s?.turretPivot??null,y(t.spec),a,s?.gunPivot??null)},stampDirect(e,t,n,r,i=`pen`){if(!e||!e.root||e.isDestroyed&&e.isDestroyed())return!1;let a=S({kind:i,zone:`x`,localPos:[0,0,0]})||{fam:`pen`,sizeK:1},o=m.get(e);return o||(o=`v${h++}`,m.set(e,o)),e.root.updateMatrixWorld(!0),$e.copy(t),e.root.worldToLocal($e),e.root.getWorldQuaternion(rt).invert(),R.copy(n).applyQuaternion(rt),fe(o,e,a.fam,a.sizeK,r,$e,R,null,0,null,null)},clearVehicle(e){if(e==null)return;let t=p.get(String(e));if(t){v(t);return}for(let t of[...p.values()])t.visual===e&&v(t)},clearAll(){for(let e of[...p.values()])v(e)},sweep(){for(let e of[...p.values()]){let t=e.visual;(!t||!t.root||!t.root.parent||t.isDestroyed&&t.isDestroyed())&&v(e)}},stats(){let e=0,t=0;for(let n of p.values())e+=n.count,n.hull&&t++,n.turret&&t++;return{vehicles:p.size,decals:e,meshes:t,pooled:l.length}}}}Object.freeze({burningColumn:`subject-local-emitter`,impactDecal:`subject-local-mesh`,trackDust:`caller-refreshed-emitter`,engineExhaust:`caller-refreshed-emitter`,guidedMissileBody:`live-shell-position`,guidedMissileTrail:`world-space-history`,turretPopTrail:`caller-refreshed-emitter`,muzzleFlash:`world-space-burst`,muzzleRing:`world-space-burst`,impactParticles:`world-space-burst`,destructionParticles:`world-space-burst`,destroyedTankColumn:`world-fixed-wreck-emitter`,terrainScorch:`world-fixed-decal`,trackPrint:`world-fixed-decal`,propBreak:`world-space-burst`,propCrush:`world-space-burst`,loosePropHit:`world-space-burst`});function yt(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.worldToLocal==`function`&&typeof t.localToWorld==`function`}function bt(e){return!!e&&Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.z)}function xt(e){return e.localPos||=[0,0,0]}function St(e,t,n){if(!e||!e.pos||!t||!n)return!1;let r=t.visual&&t.visual.root;if(yt(r)){typeof r.updateWorldMatrix==`function`&&r.updateWorldMatrix(!0,!1);let t=xt(e);return(e.anchorMode!==`visual-root`||e.anchorSpace!==r)&&(n.set(e.pos[0],e.pos[1],e.pos[2]),r.worldToLocal(n),t[0]=n.x,t[1]=n.y,t[2]=n.z,e.anchorMode=`visual-root`,e.anchorSpace=r),n.set(t[0],t[1],t[2]),r.localToWorld(n),e.pos[0]=n.x,e.pos[1]=n.y,e.pos[2]=n.z,!0}let i=t.state,a=i&&i.pos;if(!bt(a))return!1;let o=i?.yaw,s=typeof o==`number`&&Number.isFinite(o)?o:0,c=Math.cos(s),l=Math.sin(s),u=xt(e);if(e.anchorMode!==`state-yaw`||e.anchorSpace!==t){let n=e.pos[0]-a.x,r=e.pos[2]-a.z;u[0]=c*n-l*r,u[1]=e.pos[1]-a.y,u[2]=l*n+c*r,e.anchorMode=`state-yaw`,e.anchorSpace=t}return e.pos[0]=a.x+c*u[0]+l*u[2],e.pos[1]=a.y+u[1],e.pos[2]=a.z-l*u[0]+c*u[2],!0}function Ct(e,t,n){return e.on(t,e=>n(e))}function wt(e){return e.mesh.visible}function Tt(e,t){let n=e.getContext(`2d`,t);if(!n)throw Error(`fx/effects: Canvas2D context unavailable`);return n}function Et(e,t){let n=e.getAttribute(t);if(!(n instanceof C))throw Error(`fx/effects: ${t} is not a BufferAttribute`);return n}var Dt={ATGM:{core:16777090,glow:16765471,width:.16},AP:{core:16765562,glow:16748592,width:.16},APCR:{core:15267071,glow:10275071,width:.11},HEAT:{core:16738876,glow:16724e3,width:.19},HE:{core:16756782,glow:16769152,width:.26},HESH:{core:16761963,glow:16752704,width:.24},APFSDS:{core:16773824,glow:16756832,width:.1}},Ot=.28,kt=.48,At=24,jt=.55,Mt=12,Nt={AP:800,APCR:1050,HEAT:780,HE:750,HESH:780,APFSDS:1700},Pt=256,Ft=.14,It=460,Lt=12,Rt=1.9,zt=520,Bt=40,Vt=35,Ht=.05,V=.82,H=.28,Ut=4,Wt=`
attribute vec4 aA;     // tail.xyz, width
attribute vec4 aB;     // head.xyz, brightness
attribute vec3 aCore;
attribute vec3 aGlow;
attribute float aTint;
varying vec2 vUv;
varying vec3 vCore;
varying vec3 vGlow;
varying float vBright;
varying float vSeed;
varying float vTint;
#ifdef USE_FOG
  varying float vFogDepth;
#endif
uniform vec2 uNearFade;
void main() {
  vUv = uv; vCore = aCore; vGlow = aGlow; vBright = aB.w; vTint = aTint;
  vSeed = fract( dot( aA.xyz, vec3( 0.1031, 0.11369, 0.13787 ) ) );
  if ( aB.w <= 0.0 ) {
    gl_Position = vec4( 0.0, 0.0, 2.0, 1.0 );
    #ifdef USE_FOG
      vFogDepth = 1.0;
    #endif
    return;
  }
  vec3 axisRaw = aB.xyz - aA.xyz;
  float len = max( length( axisRaw ), 1e-4 );
  vec3 axis = axisRaw / len;
  vec3 wpos = mix( aA.xyz, aB.xyz, position.x + 0.5 );
  // lens fade: a ribbon segment right at the eye (own shot leaving the scope)
  // must not flood the frame — fade the vertex's brightness in close
  vBright *= smoothstep( uNearFade.x, uNearFade.y, distance( wpos, cameraPosition ) );
  vec3 viewDir = normalize( cameraPosition - wpos );
  vec3 side = cross( axis, viewDir );
  float sl = length( side );
  side = sl > 1e-4 ? side / sl : vec3( viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0] );
  // The incandescent wake starts needle-thin and blooms only around the
  // projectile head. This silhouette reads as a shell in flight instead of
  // a constant-width billboard/laser, while retaining combat readability.
  float along = position.x + 0.5;
  float widthProfile = mix( 0.38, 1.0, smoothstep( 0.08, 0.78, along ) );
  wpos += side * position.y * aA.w * 3.2 * widthProfile;
  vec4 mvPosition = viewMatrix * vec4( wpos, 1.0 );
  #ifdef USE_FOG
    vFogDepth = -mvPosition.z;
  #endif
  gl_Position = projectionMatrix * mvPosition;
}
`,Gt=`
varying vec2 vUv;
varying vec3 vCore;
varying vec3 vGlow;
varying float vBright;
varying float vSeed;
varying float vTint;
#ifdef USE_FOG
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  varying float vFogDepth;
#endif
void main() {
  float x = clamp( vUv.x, 0.0, 1.0 );
  float d = abs( vUv.y * 2.0 - 1.0 );
  float core = exp( -d * d * 48.0 );
  float corona = exp( -d * d * 7.5 );
  // Bright projectile bead plus a turbulent incandescent wake. The wake is
  // tapered at birth and energy rises toward the round, white-hot head.
  float tailGate = smoothstep( 0.0, 0.12, x );
  float tailEnergy = pow( x, 0.78 ) * tailGate;
  float shimmer = 0.91 + 0.09 * sin( x * 58.0 + vSeed * 31.0 );
  vec2 hp = vec2( ( x - 0.955 ) * 1.75, ( vUv.y - 0.5 ) * 2.0 );
  float bead = exp( -dot( hp, hp ) * 15.0 );
  float a = ((core * 0.92 + corona * 0.28) * tailEnergy * shimmer
    + bead * 1.15) * vBright;
  if ( a < 0.004 ) discard;
  #ifdef USE_FOG
    float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
  #else
    float fogFactor = 0.0;
  #endif
  // A neutral hot core preserves the physical incandescent read; the shell
  // preset lives in the close corona, so AP/APCR/HE remain distinguishable.
  vec3 neutralHot = mix( vCore, vec3( 1.0, 0.97, 0.88 ), 0.72 );
  vec3 hot = mix( neutralHot, vCore, vTint );
  vec3 col = ( hot * core * 3.6 + vGlow * corona * 0.95 )
    * tailEnergy * shimmer * vBright;
  vec3 beadColor = mix( vec3( 1.0, 0.985, 0.92 ), vCore, vTint );
  col += beadColor * bead * vBright * 3.0;
  gl_FragColor = vec4( col * ( 1.0 - fogFactor ), a );
}
`,U=new r,W=new r,G=new r,Kt=new r,qt=new r,Jt=new r,Yt=new r,Xt=new r,Zt=new r,K=new r,Qt=new r,$t=new r(0,1,0),en=new x;function tn(e,t,n){Math.abs(e.y)<.94?t.set(0,1,0):t.set(1,0,0),t.crossVectors(t,e).normalize(),n.crossVectors(e,t).normalize()}function q(e,t){return en.setHex(e),t[0]=en.r,t[1]=en.g,t[2]=en.b,t}function nn(e){let t=document.createElement(`canvas`);t.width=t.height=256;let n=Tt(t);n.clearRect(0,0,256,256);let r=n.createRadialGradient(128,128,0,128,128,128);r.addColorStop(0,`rgba(4,3,3,0.94)`),r.addColorStop(.3,`rgba(9,7,6,0.84)`),r.addColorStop(.62,`rgba(14,11,9,0.52)`),r.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=r,n.fillRect(0,0,256,256);for(let t=0;t<24;t++){let t=e()*Math.PI*2,r=(.34+e()*.5)*128,i=(.03+e()*.05)*128;n.save(),n.translate(128,128),n.rotate(t);let a=n.createRadialGradient(r*.9,0,0,r*.9,0,r);a.addColorStop(0,`rgba(6,5,4,0.5)`),a.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=a,n.beginPath(),n.ellipse(r*.9,0,r,i,0,0,Math.PI*2),n.fill(),n.restore()}n.globalCompositeOperation=`destination-out`;for(let t=0;t<16;t++){let t=e()*Math.PI*2,r=(.55+e()*.45)*128,i=128+Math.cos(t)*r,a=128+Math.sin(t)*r,o=(.07+e()*.15)*128,s=n.createRadialGradient(i,a,0,i,a,o);s.addColorStop(0,`rgba(0,0,0,0.85)`),s.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=s,n.fillRect(0,0,256,256)}n.globalCompositeOperation=`source-over`;let i=new w(t);return i.wrapS=i.wrapT=ee,i}function rn(e){let t=document.createElement(`canvas`);t.width=t.height=256;let n=Tt(t,{willReadFrequently:!0});n.clearRect(0,0,256,256);let r=n.createRadialGradient(128,128,0,128,128,128);r.addColorStop(.4,`rgba(255,255,255,0)`),r.addColorStop(.62,`rgba(255,255,255,0.30)`),r.addColorStop(.8,`rgba(255,255,255,0.72)`),r.addColorStop(.92,`rgba(255,255,255,0.34)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,256,256),n.globalCompositeOperation=`lighter`;for(let t=0;t<42;t++){let t=e()*Math.PI*2,r=(.42+e()*.26)*128,i=(.26+e()*.34)*128,a=(.014+e()*.035)*128;n.save(),n.translate(128,128),n.rotate(t);let o=n.createLinearGradient(r,0,r+i,0);o.addColorStop(0,`rgba(255,255,255,0)`),o.addColorStop(.55,`rgba(255,255,255,${.22+e()*.25})`),o.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=o,n.fillRect(r,-a,i,a*2),n.restore()}n.globalCompositeOperation=`source-over`;let i=De(e),a=n.getImageData(0,0,256,256),o=a.data;for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=i(t/256*2.3,e/256*2.3),r=Math.max(0,Math.min(1,n*2-.35));o[(e*256+t)*4+3]=Math.min(255,o[(e*256+t)*4+3]*r)}n.putImageData(a,0,0);let s=new w(t);return s.wrapS=s.wrapT=ee,s}var J={pos:[0,0,0],vel:[0,0,0],life:1,size0:1,size1:2,rot:0,rotVel:0,col0:[0,0,0],col1:[0,0,0],alpha:1,grav:0,birthOffset:0},Y={pos:[0,0,0],vel:[0,0,0],life:1,width:.03,stretch:.02,grav:-21.6,col:[0,0,0],alpha:1,seed:0,birthOffset:0},X={pos:[0,0,0],vel:[0,0,0],life:4,axis:[0,1,0],spin:5,scale:.2,groundY:0,hot:!1,seed:0,birthOffset:0},Z={pos:[0,0,0],axis:[0,0,1],life:.1,width:.4,len0:.4,len1:2.5,seed:0,col:[0,0,0],alpha:1,birthOffset:0};function an(e,t,n={}){let r=Q(e,t,n),i=r.next();for(;!i.done;)i=r.next();return i.value}async function on(e,t,n,r){let i=Q(e,t,n);try{let e=i.next();for(;!e.done;)await r(),e=i.next();return e.value}catch(e){throw i.throw(e),e}}function*Q(a,p,{seed:m=5e3,resolveEntity:_}={}){let y=yield*vt({anisotropy:a&&a.anisotropy,seed:(m^5371811)>>>0}),x=ze(a,{seed:m});de(()=>x.getTime()),le((e,t,n,r,i=0)=>{J.pos[0]=e,J.pos[1]=t,J.pos[2]=n,J.vel[0]=(C()-.5)*.7+V*.4,J.vel[1]=.4+C()*.7,J.vel[2]=(C()-.5)*.7+H*.4,J.life=1+C()*.8,J.size0=.5+C()*.3,J.size1=1.6+C()*.8,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.5,q(3814703,J.col0),q(6972764,J.col1),J.alpha=.42+.2*r,J.grav=.5,J.birthOffset=i,x.emit(`smoke`,J),r>.15&&C()<.55&&(Y.pos[0]=e,Y.pos[1]=t,Y.pos[2]=n,Y.vel[0]=(C()-.5)*2.2,Y.vel[1]=-.5-C()*1.5,Y.vel[2]=(C()-.5)*2.2,Y.life=.4+C()*.35,Y.width=.025+C()*.02,Y.stretch=.028,Y.grav=-12,q(16758370,Y.col),Y.alpha=.5+.4*r,Y.seed=C(),Y.birthOffset=i,x.emit(`sparks`,Y))});let S=new re;S.name=`fx`,S.matrixAutoUpdate=!1,S.add(x.group);let C=me(m),ce=!1,E=!1,he=new h(16770244,0,Lt,2),D=new h(16744248,0,13,2);he.castShadow=!1,D.castShadow=!1,S.add(he,D);let O=[{light:he,bornAt:-1e9,dur:Ft,peak:It,pow:2},{light:D,bornAt:-1e9,dur:Rt,peak:zt,pow:2.6}];function k(e){return x.getTime()-e.bornAt}function A(e){if(E){e.light.intensity=0;return}let t=k(e),n=Math.max(0,1-t/e.dur),r=e.peak*n**+(e.pow||2);if(e.light===he&&(r*=T.smoothstep(t,0,.042)),e.light===D&&n>0&&n<.92){let e=x.getTime();r*=.8+.13*Math.sin(e*15.3)+.07*Math.sin(e*7.7+1.3)}e.light.intensity=r}function j(e,t,n,r=0){e.light.position.copy(t),e.bornAt=x.getTime()-r,e.peak=n,A(e)}let M=new c;M.setAttribute(`position`,new t([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),M.setAttribute(`uv`,new t([0,0,1,0,1,1,0,1],2)),M.setIndex([0,1,2,0,2,3]);let N=new v(new Float32Array(Pt*4),4),ge=new v(new Float32Array(Pt*4),4),_e=new v(new Float32Array(Pt*3),3),ve=new v(new Float32Array(Pt*3),3),ye=new v(new Float32Array(Pt),1),be=[N,ge,_e,ve,ye];for(let e of be)e.setUsage(o);M.setAttribute(`aA`,N),M.setAttribute(`aB`,ge),M.setAttribute(`aCore`,_e),M.setAttribute(`aGlow`,ve),M.setAttribute(`aTint`,ye),M.instanceCount=0;let xe=new d(M,new g({vertexShader:Wt,fragmentShader:Gt,uniforms:Object.assign(ne.clone(ie.fog),{uNearFade:{value:new u(1,3.8)}}),transparent:!0,depthWrite:!1,blending:2,side:2,fog:!0}));xe.frustumCulled=!1,xe.matrixAutoUpdate=!1,xe.renderOrder=24,xe.layers.set(30),S.add(xe);let Se=new f(.15,.18,1.25,8,1,!1);Se.rotateX(Math.PI/2);let P=new e(Se,new i({color:16769370}),Mt);P.count=0,P.frustumCulled=!1,P.renderOrder=25,P.layers.set(30),P.instanceMatrix.setUsage(o);let Ce=new e(new l(.25,8,6),new i({color:16765471,transparent:!0,opacity:.92,depthWrite:!1,blending:2}),Mt);Ce.count=0,Ce.frustumCulled=!1,Ce.renderOrder=26,Ce.layers.set(30),Ce.instanceMatrix.setUsage(o),S.add(P,Ce);let we=[],Te=new Map,Ee=new Map,F=[0,0,0],Oe=[0,0,0],ke=[1,.64,.015],Ae=[1,.36,0],je=new s,Me=new s,Ne=0,Pe=0,Fe=new i({map:nn(me((m^10368889)>>>0)),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});function Ie(){let e=[0,0,0],n=[.5,.5],r=[];for(let t=1;t<=4;t++){let r=t/4;for(let t=0;t<24;t++){let i=t/24*Math.PI*2;e.push(Math.cos(i)*r,0,Math.sin(i)*r),n.push(Math.cos(i)*r*.5+.5,Math.sin(i)*r*.5+.5)}}let i=e=>1+(e-1)*24;for(let e=0;e<24;e++)r.push(0,i(1)+e,i(1)+(e+1)%24);for(let e=1;e<4;e++){let t=i(e),n=i(e+1);for(let e=0;e<24;e++){let i=(e+1)%24;r.push(t+e,n+e,n+i,t+e,n+i,t+i)}}let a=new b;return a.setAttribute(`position`,new t(e,3)),a.setAttribute(`uv`,new t(n,2)),a.setIndex(r),a}let Le=Ie(),Re=Et(Le,`position`).array,Be=[],Ve=0;for(let e=0;e<8;e++){let e=Le.clone();Et(e,`position`).setUsage(o);let t=new d(e,Fe);t.visible=!1,t.frustumCulled=!1,t.matrixAutoUpdate=!1,t.renderOrder=2,S.add(t),Be.push(t)}function He(e,t,n){let r=Be[Ve];Ve=(Ve+1)%8;let i=Et(r.geometry,`position`),a=i.array,o=C()*Math.PI*2,s=Math.cos(o),c=Math.sin(o);for(let r=0;r<a.length;r+=3){let i=Re[r],o=Re[r+2],l=e+(i*s-o*c)*n,u=t+(i*c+o*s)*n;a[r]=l,a[r+1]=Q(l,u)+.08,a[r+2]=u}i.needsUpdate=!0,r.visible=!0}let I=rn(me((m^3960563)>>>0)),Ue=new te(1,48);Ue.rotateX(-Math.PI/2);let L=[];for(let e=0;e<2;e++){let e=new i({map:I,color:9472122,transparent:!0,opacity:0,depthWrite:!1}),t=new d(Ue,e);t.visible=!1,t.renderOrder=20,t.layers.set(30),S.add(t),L.push({mesh:t,mat:e,bornAt:-1e9})}let We=0;function Ge(e){if(E){e.mesh.visible=!1,e.mat.opacity=0;return}let t=(x.getTime()-e.bornAt)/.4;if(t>=1||t<0){e.mesh.visible=!1,e.mat.opacity=0;return}let n=1-(1-t)**2.4;e.mesh.scale.setScalar((1.6+14.5*n)*(e.scaleK||1)),e.mat.opacity=.45*(e.alphaK||1)*(1-t)**1.5,e.mesh.visible=!0}function Ke(e,t,n=0,r=1,i=1){let a=L[We];We=(We+1)%L.length,a.mesh.position.set(e,Q(e,t)+.35,t),a.scaleK=r,a.alphaK=i,a.bornAt=x.getTime()-n,Ge(a)}let qe=new n(2,2),Je=[];for(let e=0;e<2;e++){let e=new i({map:I,color:16774109,transparent:!0,opacity:0,depthWrite:!1,blending:2,side:2}),t=new d(qe,e);t.visible=!1,t.renderOrder=23,t.layers.set(30),S.add(t),Je.push({mesh:t,mat:e,bornAt:-1e9,att:1,dir:new r(0,0,1),origin:new r})}let Ye=0;S.userData.softParticles={...x.softParticles,isActive:()=>x.softParticles.isActive()||M.instanceCount>0||P.count>0||L.some(wt)||Je.some(wt)};let Xe=new r(0,0,1);function Ze(e){if(E){e.mesh.visible=!1,e.mat.opacity=0;return}let t=(x.getTime()-e.bornAt)/.2;if(t>=1||t<0){e.mesh.visible=!1,e.mat.opacity=0;return}let n=1-(1-t)**2.2;e.mesh.position.copy(e.origin).addScaledVector(e.dir,.25+1.7*n),e.mesh.scale.setScalar(.35+1.5*n);let r=1,i=a&&a.camera;if(i){Yt.copy(i.position).sub(e.mesh.position);let t=Yt.length();t>1e-4&&(r=Math.abs(Yt.dot(e.dir))/t)}let o=T.smoothstep(r,.62,.9);if(o<=.001){e.mesh.visible=!1,e.mat.opacity=0;return}e.mat.opacity=.3*e.att*(1-t)**1.7*o,e.mesh.visible=!0}function Qe(e,t,n,r=0,i=1){let a=Je[Ye];Ye=(Ye+1)%Je.length,a.origin.copy(e),a.dir.copy(t),a.att=i,a.mesh.quaternion.setFromUnitVectors(Xe,t),a.mesh.scale.setScalar(n),a.bornAt=x.getTime()-r,Ze(a)}function $e(e){if(!e)return!1;let t=e;return!!t.visual?.root&&!!t.state}function R(e){if(e==null)return null;let t=_?.(e);if($e(t))return t;if(typeof window>`u`)return null;let n=window.__DEBUG,r=n&&n.game,i=r&&r.tankById?r.tankById.get(e):null;return $e(i)?i:null}let et=0,tt=6.2,nt=(()=>{let e=me((m^7852517)>>>0),t=document.createElement(`canvas`);t.width=64,t.height=128;let n=Tt(t,{willReadFrequently:!0});n.clearRect(0,0,64,128);for(let t=4;t<124;t+=11)n.fillStyle=`rgba(255,255,255,${.45+e()*.35})`,n.fillRect(6+e()*4,t+e()*2,50,6);let r=De(e),i=n.getImageData(0,0,64,128),a=i.data;for(let e=0;e<128;e++)for(let t=0;t<64;t++){let n=r(t/64*1.8,e/128*3.4);a[(e*64+t)*4+3]*=Math.max(0,Math.min(1,n*1.9-.25))}n.putImageData(i,0,0);let o=new w(t);return o.wrapS=o.wrapT=ee,o})(),rt=new b,it=new t(new Float32Array(384*3),3),at=new t(new Float32Array(384*2),2),z=new t(new Float32Array(384).fill(-1e9),1),ot=new t(new Float32Array(384),1);it.setUsage(o),z.setUsage(o),ot.setUsage(o);{let e=[],t=at.array;for(let n=0;n<96;n++){let r=n*4;e.push(r,r+1,r+2,r,r+2,r+3),t[r*2]=0,t[r*2+1]=0,t[r*2+2]=1,t[r*2+3]=0,t[r*2+4]=1,t[r*2+5]=1,t[r*2+6]=0,t[r*2+7]=1}rt.setAttribute(`position`,it),rt.setAttribute(`uv`,at),rt.setAttribute(`aBirth`,z),rt.setAttribute(`aSurface`,ot),rt.setIndex(e)}let st={uTime:{value:0},uMap:{value:nt}},ct=new d(rt,new g({uniforms:st,vertexShader:`
      attribute float aBirth;
      attribute float aSurface;
      varying vec2 vUv;
      varying float vFade;
      varying float vWater;
      varying float vSurface;
      uniform float uTime;
      void main() {
        vUv = uv;
        vWater = aSurface == 1.0 ? 1.0 : 0.0;
        vSurface = aSurface;
        float age = uTime - aBirth;
        float duration = mix(${12 .toFixed(1)}, ${tt.toFixed(1)}, vWater);
        vFade = ( age >= 0.0 && age < duration )
          ? 1.0 - age / duration : 0.0;
        gl_Position = vFade <= 0.0 ? vec4( 0.0, 0.0, 2.0, 1.0 )
          : projectionMatrix * viewMatrix * vec4( position, 1.0 );
      }`,fragmentShader:`
      uniform sampler2D uMap;
      varying vec2 vUv;
      varying float vFade;
      varying float vWater;
      varying float vSurface;
      void main() {
        float strength = mix(0.34, 0.60, vWater);
        float coverage;
        if (vWater > 0.5) {
          vec2 p = vUv * 2.0 - 1.0;
          float radius = length(p);
          float ring = 0.28 + (1.0 - vFade) * 0.66;
          coverage = (1.0 - smoothstep(0.07, 0.21, abs(radius - ring)))
            * (1.0 - smoothstep(0.80, 1.0, radius));
        } else {
          coverage = texture2D(uMap, vUv).a;
        }
        float a = coverage * vFade * strength;
        if ( a < 0.01 ) discard;
        vec3 color = mix(vec3(0.055, 0.05, 0.042), vec3(0.74, 0.84, 0.84), vWater);
        if (vSurface > 1.5) color = vSurface > 2.5
          ? vec3(0.37, 0.43, 0.49) : vec3(0.16, 0.12, 0.075);
        gl_FragColor = vec4(color, a);
      }`,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));ct.frustumCulled=!1,ct.matrixAutoUpdate=!1,ct.renderOrder=3,S.add(ct);let lt=new Float32Array(192).fill(1e9),ut=0;function dt(e,t,n=!1,r=0){for(let t=0;t<96;t++){if(x.getTime()-z.array[t*4]>=(ot.array[t*4]===1?tt:12))continue;let n=e.x-lt[t*2],r=e.z-lt[t*2+1];if(n*n+r*r<.85)return}let i=ut;ut=(ut+1)%96,lt[i*2]=e.x,lt[i*2+1]=e.z;let a=t.x,o=t.z,s=Math.hypot(a,o)||1;a/=s,o/=s;let c=o,l=-a,u=n?.52:.3,d=n?1.1:.62,f=it.array,m=i*4*3;for(let t=0;t<4;t++){let r=t===1||t===2?1:-1,i=t<2?-1:1,s=e.x+r*c*u+i*a*d,h=e.z+r*l*u+i*o*d,g=n?p?.getWaterSurfaceHeightAt?.(s,h)??Q(s,h)+(p?.getWaterDepthAt?.(s,h)??0):Q(s,h);f[m+t*3]=s,f[m+t*3+1]=g+(n?.065:.035),f[m+t*3+2]=h}let h=z.array;h[i*4]=h[i*4+1]=h[i*4+2]=h[i*4+3]=x.getTime();let g=ot.array;g[i*4]=g[i*4+1]=g[i*4+2]=g[i*4+3]=n?1:r,it.addUpdateRange(m,12),z.addUpdateRange(i*4,4),ot.addUpdateRange(i*4,4),it.needsUpdate=!0,z.needsUpdate=!0,ot.needsUpdate=!0}let ft=[0,0,0],pt=[0,0,0];function mt(e,t,n,r,i,a,o,s,c,l,u,d=0){let f=e*4;N.array[f]=t,N.array[f+1]=n,N.array[f+2]=r,N.array[f+3]=s,ge.array[f]=i,ge.array[f+1]=a,ge.array[f+2]=o,ge.array[f+3]=c,f=e*3,_e.array[f]=l[0],_e.array[f+1]=l[1],_e.array[f+2]=l[2],ve.array[f]=u[0],ve.array[f+1]=u[1],ve.array[f+2]=u[2],ye.array[e]=d}function ht(e,t,n,r){let i=e.points,a=e.count;if(a>0){let e=(a-1)*3,o=t-i[e],s=n-i[e+1],c=r-i[e+2];if(o*o+s*s+c*c<jt*jt){i[e]=t,i[e+1]=n,i[e+2]=r;return}}e.count>=At&&(i.copyWithin(0,3,At*3),e.count=At-1);let o=e.count*3;i[o]=t,i[o+1]=n,i[o+2]=r,e.count++}function gt(e,t,n=1){let r=t,i=e.points,a=Math.max(1,e.count-1);for(let t=1;t<e.count&&r<Pt;t++){let e=(t-1)*3,o=t*3,s=t/a;mt(r++,i[e],i[e+1],i[e+2],i[o],i[o+1],i[o+2],.08+.09*s,(.55+1.05*s)*n,ke,Ae,1),Pe++}return r}let _t=[],B=[],yt=new Map,bt=new Map,xt=new Map,en=new Set,an=0,on=999;function Q(e,t){return p&&p.getHeightAt?p.getHeightAt(e,t):0}function sn(e){return T.clamp(e/100,.5,1.7)}function cn(e){let t=a&&a.camera;return!!(t&&t.userData&&t.userData.scoped&&t.position.distanceToSquared(e)<100)}let ln={pos:Xt,dir:Zt,caliberMm:0,birthOffset:0,reach:1,s:1,scoped:!1,nearAtt:1,dkF:1,axSize:1,axSizeC:1,axAtt:1,lightK:1};function un(e){let{pos:t,dir:n,s:r,caliberMm:i,birthOffset:a,axSize:o,axSizeC:s,axAtt:c}=e;J.pos[0]=t.x+n.x*.12,J.pos[1]=t.y+n.y*.12,J.pos[2]=t.z+n.z*.12,J.vel[0]=n.x*1.5,J.vel[1]=n.y*1.5,J.vel[2]=n.z*1.5,J.life=Math.max(.105,-a*2.6);let l=.8+i/120*.5;J.size0=.66*r*s*l,J.size1=1.62*r*s*l,J.rot=C()*Math.PI*2,J.rotVel=0,q(16777215,J.col0),q(16777215,J.col1),J.alpha=.32+.42*c,J.grav=0,J.birthOffset=a,x.emit(`flash`,J),J.life=Math.max(.17,-a*3),J.size0=.55*r*s*l,J.size1=1.38*r*s*l,J.rotVel=(C()-.5)*2,q(16777215,J.col0),q(16762200,J.col1),x.emit(`flash`,J);for(let e=0;e<4;e++){let i=e/4*Math.PI*2+.4+C()*.6,s=1.02+C()*.3,l=Math.sin(s),u=Math.cos(s);K.set(n.x*u+(U.x*Math.cos(i)+W.x*Math.sin(i))*l,n.y*u+(U.y*Math.cos(i)+W.y*Math.sin(i))*l,n.z*u+(U.z*Math.cos(i)+W.z*Math.sin(i))*l).normalize(),Z.pos[0]=t.x+n.x*.14,Z.pos[1]=t.y+n.y*.14,Z.pos[2]=t.z+n.z*.14,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=Math.max(.07+C()*.03,-a*1.5),Z.width=.2*r*o,Z.len0=.42*r,Z.len1=(1+C()*.4)*r,Z.seed=C(),q(16773316,Z.col),Z.alpha=.92*c,Z.birthOffset=a,x.emit(`jet`,Z)}a>=0&&Qe(K.set(t.x+n.x*.3,t.y+n.y*.3,t.z+n.z*.3),n,r*o,0,c)}function dn(e){let{pos:t,dir:n,s:r,birthOffset:i,reach:a,dkF:o,axSize:s,axAtt:c}=e;for(let e=0;e<3;e++){let l=e===0?0:.1+C()*.08,u=C()*Math.PI*2;K.set(n.x+(U.x*Math.cos(u)+W.x*Math.sin(u))*l,n.y+(U.y*Math.cos(u)+W.y*Math.sin(u))*l,n.z+(U.z*Math.cos(u)+W.z*Math.sin(u))*l).normalize(),Z.pos[0]=t.x+n.x*.1,Z.pos[1]=t.y+n.y*.1,Z.pos[2]=t.z+n.z*.1,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=Math.max(e===0?.135:.105,-i*2.2),Z.width=(e===0?.38:.28)*r*s,Z.len0=.4*r,Z.len1=(e===0?1.6+C()*.4:1.1+C()*.35)*r*a*(.7+.3*o),Z.seed=C(),q(e===0?16770736:16764798,Z.col),Z.alpha=(e===0?.7:.45)*c,Z.birthOffset=i,x.emit(`jet`,Z)}for(let e=0;e<2;e++){let e=C()*Math.PI*2;K.set(-n.x*.6+(U.x*Math.cos(e)+W.x*Math.sin(e)),-n.y*.6+(U.y*Math.cos(e)+W.y*Math.sin(e)),-n.z*.6+(U.z*Math.cos(e)+W.z*Math.sin(e))).normalize(),Z.pos[0]=t.x+n.x*.06,Z.pos[1]=t.y+n.y*.06,Z.pos[2]=t.z+n.z*.06,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=.07+C()*.02,Z.width=.2*r*s,Z.len0=.2*r,Z.len1=(.55+C()*.2)*r,Z.seed=C(),q(16767114,Z.col),Z.alpha=.5*c,Z.birthOffset=i,x.emit(`jet`,Z)}J.pos[0]=t.x-n.x*.22,J.pos[1]=t.y-n.y*.22,J.pos[2]=t.z-n.z*.22,J.vel[0]=-n.x*1.2,J.vel[1]=-n.y*1.2+.3,J.vel[2]=-n.z*1.2,J.life=.07,J.size0=.5*r*s,J.size1=.72*r*s,J.rot=C()*Math.PI*2,J.rotVel=0,q(16773580,J.col0),q(16756816,J.col1),J.alpha=.55*c,J.grav=0,J.birthOffset=i,x.emit(`flash`,J);for(let e=0;e<2;e++){let o=e*Math.PI+.5+C()*.9;K.set((U.x*Math.cos(o)+W.x*Math.sin(o))*.55+n.x*.65,(U.y*Math.cos(o)+W.y*Math.sin(o))*.55+n.y*.65,(U.z*Math.cos(o)+W.z*Math.sin(o))*.55+n.z*.65).normalize(),Z.pos[0]=t.x+n.x*.22,Z.pos[1]=t.y+n.y*.22,Z.pos[2]=t.z+n.z*.22,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=.06+C()*.02,Z.width=.17*r*s,Z.len0=.22*r,Z.len1=(.45+C()*.2)*r*Math.max(a,.7),Z.seed=C(),q(16762990,Z.col),Z.alpha=.4*c,Z.birthOffset=i,x.emit(`jet`,Z)}}function fn(e){let{pos:t,dir:n,s:r,birthOffset:i,axSize:a,axAtt:o}=e;for(let e=0;e<4;e++){let s=e/4*Math.PI*2+C()*1.1,c=.22+C()*.15,l=Math.sin(c),u=Math.cos(c);K.set(n.x*u+(U.x*Math.cos(s)+W.x*Math.sin(s))*l,n.y*u+(U.y*Math.cos(s)+W.y*Math.sin(s))*l,n.z*u+(U.z*Math.cos(s)+W.z*Math.sin(s))*l).normalize(),Z.pos[0]=t.x+n.x*.16,Z.pos[1]=t.y+n.y*.16,Z.pos[2]=t.z+n.z*.16,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=.07+C()*.04,Z.width=(.19+C()*.05)*r*a,Z.len0=.16*r,Z.len1=(.55+C()*.35)*r,Z.seed=C(),q(16768922,Z.col),Z.alpha=.32*o,Z.birthOffset=i,x.emit(`jet`,Z)}for(let a=0;a<2;a++){let s=a<1?0:.22,c=(U.x*(C()-.5)+W.x*(C()-.5))*s,l=(U.y*(C()-.5)+W.y*(C()-.5))*s,u=(U.z*(C()-.5)+W.z*(C()-.5))*s,d=((a<1?14:11)+C()*4)*e.reach;Y.pos[0]=t.x+n.x*.2,Y.pos[1]=t.y+n.y*.2,Y.pos[2]=t.z+n.z*.2,Y.vel[0]=n.x*d+c,Y.vel[1]=n.y*d+l,Y.vel[2]=n.z*d+u,Y.life=.06+C()*.04,Y.width=(.06+C()*.05)*r,Y.stretch=.05,Y.grav=0,q(16761438,Y.col),Y.alpha=.7*o,Y.seed=C(),Y.birthOffset=i,x.emit(`sparks`,Y)}for(let e=0;e<3;e++){let e=.3+C()*.55*r;J.pos[0]=t.x+n.x*e+(U.x*(C()-.5)+W.x*(C()-.5))*.16*r,J.pos[1]=t.y+n.y*e+(U.y*(C()-.5)+W.y*(C()-.5))*.16*r,J.pos[2]=t.z+n.z*e+(U.z*(C()-.5)+W.z*(C()-.5))*.16*r;let a=4+C()*4;J.vel[0]=n.x*a,J.vel[1]=n.y*a,J.vel[2]=n.z*a,J.life=.05+C()*.05,J.size0=.26*r,J.size1=.62*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*8,q(16771488,J.col0),q(16738836,J.col1),J.alpha=.38*o,J.grav=0,J.birthOffset=i,x.emit(`fire`,J)}for(let e=0;e<6;e++){let e=(.22+C()*.7)*r;J.pos[0]=t.x+n.x*e+(U.x*(C()-.5)+W.x*(C()-.5))*.14*r,J.pos[1]=t.y+n.y*e+(U.y*(C()-.5)+W.y*(C()-.5))*.14*r,J.pos[2]=t.z+n.z*e+(U.z*(C()-.5)+W.z*(C()-.5))*.14*r;let a=2.2+C()*2.8;J.vel[0]=n.x*a+(C()-.5)*.6,J.vel[1]=n.y*a+.35+C()*.4,J.vel[2]=n.z*a+(C()-.5)*.6,J.life=.08+C()*.08,J.size0=.34*r,J.size1=(.85+C()*.55)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*6,q(16757854,J.col0),q(11749658,J.col1),J.alpha=.4*(.4+.6*o),J.grav=.6,J.birthOffset=i,x.emit(`fire`,J)}}function pn(e){let{pos:t,dir:n,s:r,birthOffset:i}=e;for(let e=0;e<7;e++){let a=.3+e/6*1.9+C()*.35,o=C()*Math.PI*2,s=C()*.3*r;J.pos[0]=t.x+n.x*a+(U.x*Math.cos(o)+W.x*Math.sin(o))*s,J.pos[1]=t.y+n.y*a+(U.y*Math.cos(o)+W.y*Math.sin(o))*s,J.pos[2]=t.z+n.z*a+(U.z*Math.cos(o)+W.z*Math.sin(o))*s,J.vel[0]=n.x*(1.8+C()*1.6)+(C()-.5)*.8+.3,J.vel[1]=n.y*(1.8+C()*1.6)+.5+C()*.5,J.vel[2]=n.z*(1.8+C()*1.6)+(C()-.5)*.8,J.life=1.5+C()*1.3,J.size0=(1.6+C()*.7)*r,J.size1=(3+C()*1.4)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.2,q(11249567,J.col0),q(9407622,J.col1),J.alpha=.16+C()*.07,J.grav=.4,J.birthOffset=i-.09-C()*.06,x.emit(`psmoke`,J)}for(let e=0;e<3;e++){let e=C()*Math.PI*2;J.pos[0]=t.x-n.x*.25+(U.x*Math.cos(e)+W.x*Math.sin(e))*.2,J.pos[1]=t.y-n.y*.25+(U.y*Math.cos(e)+W.y*Math.sin(e))*.2,J.pos[2]=t.z-n.z*.25+(U.z*Math.cos(e)+W.z*Math.sin(e))*.2,J.vel[0]=-n.x*(.9+C()*.7)+(C()-.5)*.7+.3,J.vel[1]=.7+C()*.6,J.vel[2]=-n.z*(.9+C()*.7)+(C()-.5)*.7,J.life=1.4+C()*.9,J.size0=.9*r,J.size1=(2.1+C()*1)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(11446687,J.col0),q(9605e3,J.col1),J.alpha=.18+C()*.07,J.grav=.4,J.birthOffset=i-.08,x.emit(`psmoke`,J)}}function mn(e){let{pos:t,dir:n,s:r,birthOffset:i,scoped:a}=e,o=i-.2,s=a?.3:.62,c=a?.45:1,l=a?4:9;for(let e=0;e<l;e++){let e=C()*Math.PI*2,i=(.15+C()*.24)*r,a=U.x*Math.cos(e)+W.x*Math.sin(e),l=U.y*Math.cos(e)+W.y*Math.sin(e),u=U.z*Math.cos(e)+W.z*Math.sin(e),d=.4+C()*.5;J.pos[0]=t.x+n.x*d+a*i,J.pos[1]=t.y+n.y*d+l*i,J.pos[2]=t.z+n.z*d+u*i;let f=2.4+C()*2.6,p=2.2+C()*2.4;J.vel[0]=a*f+n.x*p,J.vel[1]=l*f+n.y*p,J.vel[2]=u*f+n.z*p,J.life=(1.6+C()*1.2)*c,J.size0=(.9+C()*.45)*r,J.size1=(2.3+C()*1.7)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(11644324,J.col0),q(9736587,J.col1),J.alpha=(.19+C()*.13)*s,J.grav=.6,J.birthOffset=o-C()*.3,x.emit(`psmoke`,J)}let u=a?4:10;for(let e=0;e<u;e++){let e=.8+C()*3.2*r,i=e*.24*(C()-.5)*2,a=C()*Math.PI*2,l=U.x*Math.cos(a)+W.x*Math.sin(a),u=U.y*Math.cos(a)+W.y*Math.sin(a),d=U.z*Math.cos(a)+W.z*Math.sin(a);J.pos[0]=t.x+n.x*e+l*i,J.pos[1]=t.y+n.y*e+u*i,J.pos[2]=t.z+n.z*e+d*i;let f=4+C()*5;J.vel[0]=n.x*f+l*1.1+.4+(C()-.5)*.6,J.vel[1]=n.y*f+u*1.1+.7+C()*.7,J.vel[2]=n.z*f+d*1.1+(C()-.5)*.6,J.life=(1.7+C()*1.5)*c,J.size0=(.6+C()*.35)*r,J.size1=(1.7+C()*1.5)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(12433841,J.col0),q(9736844,J.col1),J.alpha=(.1+C()*.11)*s,J.grav=.5,J.birthOffset=o-C()*.35-e/(3.2*r+.8)*.25,x.emit(`psmoke`,J)}}function hn(e){let{pos:t,dir:n,s:r,birthOffset:i,reach:a,axAtt:o}=e,s=i-.2;for(let e=0;e<8;e++){let e=.15+C()*.45;J.pos[0]=t.x+n.x*e,J.pos[1]=t.y+n.y*e,J.pos[2]=t.z+n.z*e,J.vel[0]=n.x*.3+(C()-.5)*.4+.35,J.vel[1]=.55+C()*.55,J.vel[2]=n.z*.3+(C()-.5)*.4+.12,J.life=2.3+C()*1.4,J.size0=.5*r,J.size1=(2+C()*.9)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,q(13025978,J.col0),q(10131345,J.col1),J.alpha=.2+C()*.1,J.grav=.4,J.birthOffset=s-C()*.4,x.emit(`psmoke`,J)}K.set(t.x+n.x*.6,t.y+n.y*.6,t.z+n.z*.6),$(K,n,Math.round(9*(.4+.6*o)),14*r*a,.22,16766346,.11,.018,.03,i)}function gn(e){let{pos:t,dir:n,caliberMm:r,birthOffset:i,nearAtt:a,dkF:o}=e,s=Q(t.x,t.z),c=T.clamp(1-(t.y-s-1.2)/3.4,0,1);if(c<=.05)return;Ke(t.x+n.x*1.2,t.z+n.z*1.2,Math.max(0,-i),.42+.22*c,.7*(.5+.5*c));for(let e=0;e<8;e++){let r=e/8*Math.PI*2+C()*.6;J.pos[0]=t.x+n.x*.9+Math.cos(r)*.8,J.pos[1]=s+.75,J.pos[2]=t.z+n.z*.9+Math.sin(r)*.8,J.vel[0]=Math.cos(r)*(9+C()*4)+n.x*2,J.vel[1]=.8+C()*.8,J.vel[2]=Math.sin(r)*(9+C()*4)+n.z*2,J.life=.38+C()*.22,J.size0=.55,J.size1=(2.3+C()*.9)*(.75+.25*c),J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.5,q(10065034,J.col0),q(8683382,J.col1),J.alpha=(.26+.1*c)*(.7+.3*a),J.grav=-.6,J.birthOffset=i,x.emit(`dust`,J)}let l=Math.round(12+6*c)*(r>=100?1:.7)|0;for(let e=0;e<l;e++){let r=e/l*Math.PI*2+C()*.5,a=.6+C()*.7,u=e%2==0;J.pos[0]=t.x+n.x*.8+Math.cos(r)*a,J.pos[1]=s+.85,J.pos[2]=t.z+n.z*.8+Math.sin(r)*a,J.vel[0]=Math.cos(r)*(5+C()*3.6)+n.x*1.5,J.vel[1]=1.1+C()*1.3,J.vel[2]=Math.sin(r)*(5+C()*3.6)+n.z*1.5,J.life=(u?.85+C()*.45:1.4+C()*.8)*(.85+.15*o),J.size0=.45,J.size1=(2.2+C()*1.2)*(.7+.3*c)*(.75+.3*o),J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.8,q(9867396,J.col0),q(8551538,J.col1),J.alpha=(u?.26+.09*c:.2+.07*c)*(.85+.13*Math.min(o,1.8)),J.grav=-.4,J.birthOffset=i-.03,x.emit(`dust`,J)}let u=Math.round(3+3*c);for(let e=0;e<u;e++){let e=C()*Math.PI*2;X.pos[0]=t.x+n.x*.9+Math.cos(e)*.5,X.pos[1]=s+.4,X.pos[2]=t.z+n.z*.9+Math.sin(e)*.5,X.vel[0]=Math.cos(e)*(3.5+C()*3)+n.x*2.5,X.vel[1]=3+C()*3*(.5+.5*c),X.vel[2]=Math.sin(e)*(3.5+C()*3)+n.z*2.5,X.life=.9,X.scale=.04+C()*.05,X.spin=14+C()*16,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=s,X.hot=!1,X.seed=C(),X.birthOffset=i,x.emit(`debris`,X)}for(let e=0;e<9;e++){let e=C()*Math.PI*2,r=2.2+C()*2.2;J.pos[0]=t.x+n.x*r+Math.cos(e)*1.2,J.pos[1]=s+.95,J.pos[2]=t.z+n.z*r+Math.sin(e)*1.2,J.vel[0]=Math.cos(e)*(2.5+C()*2.5)+n.x*4.5,J.vel[1]=.9+C()*1.1,J.vel[2]=Math.sin(e)*(2.5+C()*2.5)+n.z*4.5,J.life=(1.2+C()*1)*(.85+.15*o),J.size0=.5,J.size1=(2.1+C()*1)*(.7+.3*c)*(.75+.3*o),J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,q(9867396,J.col0),q(8551538,J.col1),J.alpha=.19+.06*c,J.grav=-.4,J.birthOffset=i-.03,x.emit(`dust`,J)}}function _n(e,t,n,r=0,i=1){e=Xt.copy(e),t=Zt.copy(t);let o=sn(n),s=cn(e),c=0,l=30,u=a&&a.camera;if(u){Yt.copy(e).sub(u.position);let n=Yt.length();l=n,n>1e-4&&(c=Math.abs(Yt.dot(t))/n)}let d=T.clamp((l-3)/11,0,1),f=.4+.6*d,p=.68+.32*d,m=T.clamp(l/12,1,2.4),h=m**.6,g=(1-.32*c*c)*p*m,_=(1-.32*c*c)*p*h,v=(1-.48*c*c)*f,y=(1-.5*c*c)*(.55+.45*d),b=ln;return b.pos.copy(e),b.dir.copy(t),b.caliberMm=n,b.birthOffset=r,b.reach=i,b.s=o,b.scoped=s,b.nearAtt=d,b.dkF=m,b.axSize=g,b.axSizeC=_,b.axAtt=v,b.lightK=y,tn(t,U,W),s||(un(b),dn(b),fn(b),pn(b)),mn(b),s?y*.2:(hn(b),gn(b),y)}function vn(e,t,n=0){tn(t,U,W);for(let r=0;r<3;r++){let i=r/3*Math.PI*2+C(),a=U.x*Math.cos(i)+W.x*Math.sin(i),o=U.y*Math.cos(i)+W.y*Math.sin(i),s=U.z*Math.cos(i)+W.z*Math.sin(i);X.pos[0]=e.x+t.x*1.5,X.pos[1]=e.y+t.y*1.5,X.pos[2]=e.z+t.z*1.5,X.vel[0]=t.x*60+a*14,X.vel[1]=t.y*60+o*14+2,X.vel[2]=t.z*60+s*14,X.life=.55,X.scale=.09,X.spin=20+C()*20,X.axis[0]=a,X.axis[1]=o,X.axis[2]=s,X.groundY=Q(e.x,e.z),X.hot=!1,X.seed=C(),X.birthOffset=n,x.emit(`debris`,X)}}function $(e,t,n,r,i,a,o,s,c,l=0,u=0){tn(t,U,W),q(a,Y.col);for(let a=0;a<n;a++){let n=C()*Math.PI*2,a=C()*i,d=Math.sin(a),f=Math.cos(n)*d,p=Math.sin(n)*d,m=Math.cos(a),h=r*(.4+C()*.9);Y.pos[0]=e.x+t.x*.05,Y.pos[1]=e.y+t.y*.05,Y.pos[2]=e.z+t.z*.05,Y.vel[0]=(t.x*m+U.x*f+W.x*p)*h,Y.vel[1]=(t.y*m+U.y*f+W.y*p)*h,Y.vel[2]=(t.z*m+U.z*f+W.z*p)*h,Y.life=o*(.5+C()*.8),Y.width=s*(.6+C()*.9),Y.stretch=c*(.7+C()*.7),Y.grav=-21.6,Y.alpha=.5+C()*.5,Y.seed=C(),Y.birthOffset=l-C()*u,x.emit(`sparks`,Y)}}function yn(e,t,n,r,i,a,o,s=0){for(let c=0;c<n;c++)J.pos[0]=e.x+t.x*.2+(C()-.5)*.3,J.pos[1]=e.y+t.y*.2+(C()-.5)*.3,J.pos[2]=e.z+t.z*.2+(C()-.5)*.3,J.vel[0]=t.x*(1.5+C()*2)+(C()-.5),J.vel[1]=t.y*(1.5+C()*2)+.8+C()*.5,J.vel[2]=t.z*(1.5+C()*2)+(C()-.5),J.life=.9+C()*1,J.size0=r*.4,J.size1=r*(1.4+C()*.6),J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(i,J.col0),q(a,J.col1),J.alpha=o,J.grav=.9,J.birthOffset=s,x.emit(`smoke`,J)}function bn(e,t,n,r,i,a=0){for(let o=0;o<3;o++)J.pos[0]=e.x+t.x*.15,J.pos[1]=e.y+t.y*.15,J.pos[2]=e.z+t.z*.15,J.vel[0]=t.x*2,J.vel[1]=t.y*2,J.vel[2]=t.z*2,J.life=.06+C()*.05,J.size0=.5*n,J.size1=1.6*n,J.rot=C()*Math.PI*2,J.rotVel=0,q(r,J.col0),q(i,J.col1),J.alpha=1,J.grav=0,J.birthOffset=a,x.emit(`fire`,J)}function xn(e,t,n,r,i,a){let o=n?9:6,s=n?7:5;for(let n=0;n<o;n++){let o=C()*Math.PI*2,c=C()*.7,l=Math.cos(o)*Math.sin(c)*14*t,u=(9+C()*9)*t,d=Math.sin(o)*Math.sin(c)*14*t;if(X.pos[0]=e.x,X.pos[1]=a,X.pos[2]=e.z,X.vel[0]=l,X.vel[1]=u,X.vel[2]=d,X.life=2.2,X.scale=.1+C()*.12*t,X.spin=6+C()*14,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=i,X.hot=!1,X.seed=C(),X.birthOffset=r,x.emit(`debris`,X),!(n>=s))for(let n=.06;n<1;n+=.1){let o=(1-Math.exp(-.12*n))/.12,s=a+u*o-10.8*n*n;if(s<i+.25)break;J.pos[0]=e.x+l*o+(C()-.5)*.12,J.pos[1]=s,J.pos[2]=e.z+d*o+(C()-.5)*.12,J.vel[0]=(C()-.5)*.3,J.vel[1]=-.4-C()*.5,J.vel[2]=(C()-.5)*.3,J.life=.5+C()*.4,J.size0=.15*t,J.size1=.5*t,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(4864809,J.col0),q(6115392,J.col1),J.alpha=.7,J.grav=-1.5,J.birthOffset=r+n*.9,x.emit(`smoke`,J)}}}function Sn(e,t,n,r=0){let i=sn(t)*(n?1.7:1.15),a=Q(e.x,e.z),o=Math.max(e.y,a)+.5;for(let t=0;t<(n?6:4);t++)J.pos[0]=e.x+(C()-.5)*.4*i,J.pos[1]=o+C()*.3,J.pos[2]=e.z+(C()-.5)*.4*i,J.vel[0]=(C()-.5)*1.6,J.vel[1]=(9+C()*6)*i,J.vel[2]=(C()-.5)*1.6,J.life=.9+C()*.7,J.size0=.5*i,J.size1=(1.9+C()*.9)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(3549982,J.col0),q(4931116,J.col1),J.alpha=.9,J.grav=-7,J.birthOffset=r,x.emit(`smoke`,J);let s=n?14:8;for(let t=0;t<s;t++)J.pos[0]=e.x+(C()-.5)*.8*i,J.pos[1]=o+C()*.6,J.pos[2]=e.z+(C()-.5)*.8*i,J.vel[0]=(C()-.5)*2.5,J.vel[1]=(7+C()*7)*i,J.vel[2]=(C()-.5)*2.5,J.life=1.3+C()*1.2,J.size0=.7*i,J.size1=(2.8+C()*1.4)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(6048307,J.col0),q(7824973,J.col1),J.alpha=.85,J.grav=-6,J.birthOffset=r,x.emit(`smoke`,J);let c=n?12:7;for(let t=0;t<c;t++){let n=t/c*Math.PI*2+C()*.5;J.pos[0]=e.x+Math.cos(n)*.5*i,J.pos[1]=o,J.pos[2]=e.z+Math.sin(n)*.5*i,J.vel[0]=Math.cos(n)*(5+C()*3)*i,J.vel[1]=2.5+C()*2,J.vel[2]=Math.sin(n)*(5+C()*3)*i,J.life=1+C()*.8,J.size0=.6*i,J.size1=2.2*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(7035200,J.col0),q(8746326,J.col1),J.alpha=.6,J.grav=-3,J.birthOffset=r,x.emit(`smoke`,J)}for(let t=0;t<(n?10:7);t++){let t=C()*Math.PI*2,n=C()*2.4*i;J.pos[0]=e.x+Math.cos(t)*n,J.pos[1]=o+.2,J.pos[2]=e.z+Math.sin(t)*n,J.vel[0]=Math.cos(t)*(1+C())+.3,J.vel[1]=.6+C()*.6,J.vel[2]=Math.sin(t)*(1+C()),J.life=3.2+C()*1.8,J.size0=1*i,J.size1=(4.4+C()*1.4)*i,J.rot=C()*Math.PI*2,J.rotVel=C()-.5,q(9406066,J.col0),q(8222314,J.col1),J.alpha=.3+C()*.1,J.grav=-.25,J.birthOffset=r+C()*.5,x.emit(`dust`,J)}xn(e,i,n,r,a,o)}function Cn(e){return(p?.getWaterMaskAt?.(e.x,e.z)??0)>.5}function wn(e,t,n,r=0){let i=sn(t)*(n?1.6:1.1),a=p?.getWaterSurfaceHeightAt?.(e.x,e.z)??Q(e.x,e.z)+(p?.getWaterDepthAt?.(e.x,e.z)??0),o=a+.25;for(let t=0;t<(n?5:3);t++)J.pos[0]=e.x+(C()-.5)*.4*i,J.pos[1]=o+C()*.3,J.pos[2]=e.z+(C()-.5)*.4*i,J.vel[0]=(C()-.5)*1.4,J.vel[1]=(11+C()*6)*i,J.vel[2]=(C()-.5)*1.4,J.life=.7+C()*.4,J.size0=.45*i,J.size1=(1.5+C()*.6)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(4020834,J.col0),q(7178896,J.col1),J.alpha=.85,J.grav=-11,J.birthOffset=r,x.emit(`smoke`,J);let s=n?14:9;for(let t=0;t<s;t++)J.pos[0]=e.x+(C()-.5)*.6*i,J.pos[1]=o+C()*.5,J.pos[2]=e.z+(C()-.5)*.6*i,J.vel[0]=(C()-.5)*2.2,J.vel[1]=(9+C()*9)*i,J.vel[2]=(C()-.5)*2.2,J.life=.9+C()*.6,J.size0=.6*i,J.size1=(2.2+C()*1)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(14674410,J.col0),q(12176336,J.col1),J.alpha=.9,J.grav=-10,J.birthOffset=r,x.emit(`smoke`,J);let c=n?14:9;for(let t=0;t<c;t++){let n=t/c*Math.PI*2+C()*.4;J.pos[0]=e.x+Math.cos(n)*.6*i,J.pos[1]=a+.12,J.pos[2]=e.z+Math.sin(n)*.6*i,J.vel[0]=Math.cos(n)*(6+C()*3)*i,J.vel[1]=.6+C()*.8,J.vel[2]=Math.sin(n)*(6+C()*3)*i,J.life=1.2+C()*.8,J.size0=.5*i,J.size1=2.6*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,q(15266032,J.col0),q(12833493,J.col1),J.alpha=.55,J.grav=-1.2,J.birthOffset=r,x.emit(`dust`,J)}for(let t=0;t<(n?8:5);t++){let t=C()*Math.PI*2,n=C()*1.6*i;J.pos[0]=e.x+Math.cos(t)*n,J.pos[1]=a+.6,J.pos[2]=e.z+Math.sin(t)*n,J.vel[0]=Math.cos(t)*(.6+C()*.6)+.3,J.vel[1]=.5+C()*.5,J.vel[2]=Math.sin(t)*(.6+C()*.6),J.life=1.8+C()*1.2,J.size0=.9*i,J.size1=(3.2+C()*1.2)*i,J.rot=C()*Math.PI*2,J.rotVel=C()-.5,q(14082790,J.col0),q(12636116,J.col1),J.alpha=.22+C()*.08,J.grav=-.15,J.birthOffset=r+C()*.4,x.emit(`dust`,J)}$(e,$t,n?26:16,13*i,.9,15398136,.55,.03,.05,r),Kt.set(C()-.5,0,C()-.5).normalize(),dt(e,Kt,!0)}function Tn(e,t,n=0){let r=sn(t)*1.3;for(let t=0;t<10;t++){let t=C()*Math.PI*2,i=C()*Math.PI,a=(3+C()*5)*r;J.pos[0]=e.x,J.pos[1]=e.y+.2,J.pos[2]=e.z,J.vel[0]=Math.cos(t)*Math.sin(i)*a,J.vel[1]=Math.abs(Math.cos(i))*a+1.5,J.vel[2]=Math.sin(t)*Math.sin(i)*a,J.life=.25+C()*.25,J.size0=.8*r,J.size1=2.6*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*5,q(16773296,J.col0),q(15096852,J.col1),J.alpha=1,J.grav=2,J.birthOffset=n,x.emit(`fire`,J)}yn(K.set(e.x,e.y+.4,e.z),$t,8,1.6*r,2894376,5657680,.7,n)}function En(e,t,n,r,i){let a=n?1:3;for(let n=0;n<a;n++){let n=C()*Math.PI*2,a=C()*Math.PI,o=2+C()*4;J.pos[0]=e.x+(C()-.5)*.6,J.pos[1]=t+(C()-.5)*.6,J.pos[2]=e.z+(C()-.5)*.6,J.vel[0]=Math.cos(n)*Math.sin(a)*o,J.vel[1]=Math.abs(Math.cos(a))*o+2,J.vel[2]=Math.sin(n)*Math.sin(a)*o,J.life=.1+C()*.1,J.size0=(1.4+C())*r,J.size1=(3.2+C()*1.2)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(16777215,J.col0),q(16756800,J.col1),J.alpha=1,J.grav=0,J.birthOffset=i,x.emit(`flash`,J)}}function Dn(e,t,n,r,i,a,o){let s=n?12:r?6:9;for(let n=0;n<s;n++){let c=C()*Math.PI*2,l=C()*Math.PI,u=n<3&&!r,d=(2.6+C()*3.6)*i;J.pos[0]=e.x+(C()-.5)*1.1*i,J.pos[1]=t+(u?.8+C()*1.2:(C()-.4)*1.1),J.pos[2]=e.z+(C()-.5)*1.1*i,J.vel[0]=Math.cos(c)*Math.sin(l)*d,J.vel[1]=Math.abs(Math.cos(l))*d*.5+(u?2.4:1.1),J.vel[2]=Math.sin(c)*Math.sin(l)*d,J.life=u?1.25+C()*.6:.85+C()*.75,J.size0=(u?2.8+C()*1:2+C()*1)*i*a,J.size1=(u?7+C()*2.2:4.8+C()*1.8)*i*a,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(4866618,J.col0),q(2828067,J.col1),J.alpha=.88+C()*.1,J.grav=1.1,J.birthOffset=n<s/3?o-C()*.25:o+C()*.35,x.emit(`billow`,J)}}function On(e,t,n,r,i,a,o){let s=n?12:r?6:9;for(let n=0;n<s;n++){let r=C()*Math.PI*2,c=C()*Math.PI,l=(3+C()*4.2)*i;J.pos[0]=e.x+(C()-.5)*1*i,J.pos[1]=t+(C()-.55)*1,J.pos[2]=e.z+(C()-.5)*1*i,J.vel[0]=Math.cos(r)*Math.sin(c)*l,J.vel[1]=Math.abs(Math.cos(c))*l*.45+.9,J.vel[2]=Math.sin(r)*Math.sin(c)*l,J.life=.7+C()*1,J.size0=(1.8+C()*1)*i*a,J.size1=(4.2+C()*2)*i*a,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(16767077,J.col0),q(15094287,J.col1),J.alpha=.34+C()*.18,J.grav=1,J.birthOffset=n<s/3?o-C()*.25:o+C()*.35,x.emit(`fire`,J)}}function kn(e,t,n,r,i,a){let o=r?.7:1,s=r?2:4;for(let n=0;n<s;n++){let r=n/4*Math.PI*2+C()*.9;J.pos[0]=e.x+Math.cos(r)*(.5+C()*.5),J.pos[1]=t-.85+C()*.35,J.pos[2]=e.z+Math.sin(r)*(.5+C()*.5),J.vel[0]=Math.cos(r)*(1+C()*.8),J.vel[1]=.8+C()*.6,J.vel[2]=Math.sin(r)*(1+C()*.8),J.life=.9+C()*.5,J.size0=(2.1+C()*.7)*o*i,J.size1=(4.2+C()*1.2)*o*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.5,q(4866618,J.col0),q(2828067,J.col1),J.alpha=.9,J.grav=1,J.birthOffset=a-.1-C()*.15,x.emit(`billow`,J)}let c=r?1:3;for(let n=0;n<c;n++)J.pos[0]=e.x+(C()-.5)*.5,J.pos[1]=t+(C()-.6)*.9,J.pos[2]=e.z+(C()-.5)*.5,J.vel[0]=(C()-.5)*.8,J.vel[1]=1.3+C()*.7,J.vel[2]=(C()-.5)*.8,J.life=1.15+C()*.55,J.size0=(2.9+C()*.9)*o*i,J.size1=(6+C()*1.5)*o*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(4866618,J.col0),q(2828067,J.col1),J.alpha=.96,J.grav=.9,J.birthOffset=a-.06-C()*.12,x.emit(`billow`,J);return Dn(e,t,n,r,o,i,a),On(e,t,n,r,o,i,a),o}function An(e,t,n){e<0||ce?n():_t.push({t,fn:n})}function jn(e,t,n,r,i,a){An(a,.03,()=>{for(let o=0;o<14;o++){let o=C()*Math.PI*2,s=(.6+C()*1.5)*r;J.pos[0]=e+Math.cos(o)*s,J.pos[1]=n+C()*2.2,J.pos[2]=t+Math.sin(o)*s,J.vel[0]=Math.cos(o)*(1.2+C()*1.8),J.vel[1]=2.2+C()*2.6,J.vel[2]=Math.sin(o)*(1.2+C()*1.8),J.life=2.4+C()*2.2,J.size0=(1.4+C()*.8)*i,J.size1=(4.6+C()*2.2)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(3091238,J.col0),q(6315347,J.col1),J.alpha=.62+C()*.14,J.grav=1.1,J.birthOffset=a+.4+C()*1,x.emit(`smoke`,J)}})}function Mn(e,t,n){for(let r=0;r<12;r++){let r=C()*Math.PI*2,i=.5+C()*1.1;J.pos[0]=e.x+Math.cos(r)*i,J.pos[1]=t+(C()-.3)*1.4,J.pos[2]=e.z+Math.sin(r)*i,J.vel[0]=Math.cos(r)*(1.5+C()*2),J.vel[1]=1.8+C()*2.2,J.vel[2]=Math.sin(r)*(1.5+C()*2),J.life=1.1+C()*.9,J.size0=1+C()*.6,J.size1=3+C()*1.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(2170138,J.col0),q(4012083,J.col1),J.alpha=.5+C()*.2,J.grav=1.2,J.birthOffset=n-C()*.15,x.emit(`smoke`,J)}}function Nn(e,t,n,r,i,a){let o=i?4:10;for(let n=0;n<o;n++){let n=C()*Math.PI*2,r=1.2+C()*1;J.pos[0]=e.x+Math.cos(n)*r,J.pos[1]=t+.9+C()*.4,J.pos[2]=e.z+Math.sin(n)*r,J.vel[0]=Math.cos(n)*(3.5+C()*3),J.vel[1]=1.2+C()*1.2,J.vel[2]=Math.sin(n)*(3.5+C()*3),J.life=.55+C()*.5,J.size0=.8+C()*.4,J.size1=2.2+C()*.8,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(16760896,J.col0),q(16730632,J.col1),J.alpha=.55,J.grav=1.5,J.birthOffset=a-C()*.15,x.emit(`fire`,J)}let s=r?4:0;for(let t=0;t<s;t++)J.pos[0]=e.x+(C()-.5)*.7,J.pos[1]=n+.15+C()*.3,J.pos[2]=e.z+(C()-.5)*.7,J.vel[0]=(C()-.5)*.4,J.vel[1]=.8+C()*.6,J.vel[2]=(C()-.5)*.4,J.life=1.5+C()*1.3,J.size0=.9+C()*.4,J.size1=1.6+C()*.7,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(16765040,J.col0),q(16734736,J.col1),J.alpha=.75,J.grav=1.2,J.birthOffset=a-C()*.4+t*.45,x.emit(`fire`,J);let c=r?9:0;for(let t=0;t<c;t++)J.pos[0]=e.x+(C()-.5)*.5,J.pos[1]=n+.4+C()*.6,J.pos[2]=e.z+(C()-.5)*.5,J.vel[0]=(C()-.5)*2.2,J.vel[1]=9+C()*7,J.vel[2]=(C()-.5)*2.2,J.life=.55+C()*.55,J.size0=.8+C()*.5,J.size1=2+C()*1,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*5,q(16771488,J.col0),q(16730630,J.col1),J.alpha=.7,J.grav=-2,J.birthOffset=a-C()*.12,x.emit(`fire`,J);let l=r?3:i?0:2;for(let t=0;t<l;t++){let t=C()*Math.PI*2,r=.25+C()*.45;K.set(Math.cos(t)*Math.sin(r),Math.cos(r),Math.sin(t)*Math.sin(r)).normalize(),Z.pos[0]=e.x+(C()-.5)*1,Z.pos[1]=n+.3,Z.pos[2]=e.z+(C()-.5)*1,Z.axis[0]=K.x,Z.axis[1]=K.y,Z.axis[2]=K.z,Z.life=.14+C()*.08,Z.width=.3+C()*.12,Z.len0=.5,Z.len1=2.6+C()*1.4,Z.seed=C(),q(16767372,Z.col),Z.alpha=.85,Z.birthOffset=a-C()*.05,x.emit(`jet`,Z)}for(let t=0;t<8;t++){let t=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.2,J.pos[1]=n+C()*.6,J.pos[2]=e.z+(C()-.5)*1.2,J.vel[0]=Math.cos(t)*(.5+C()),J.vel[1]=4+C()*4,J.vel[2]=Math.sin(t)*(.5+C()),J.life=.6+C()*.6,J.size0=.9+C()*.5,J.size1=2.4+C(),J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(16760896,J.col0),q(16730632,J.col1),J.alpha=.6,J.grav=3,J.birthOffset=a-C()*.2,x.emit(`fire`,J)}}function Pn(e,t,n,r){for(let i=0;i<30;i++){let a=C()*Math.PI*2,o=1+C()*2.5,s=i<12;J.pos[0]=e.x+(C()-.5)*1.2,J.pos[1]=t+(s?1.2+C()*2:C()*1.2),J.pos[2]=e.z+(C()-.5)*1.2,J.vel[0]=Math.cos(a)*o+V*.7,J.vel[1]=3.2+C()*4,J.vel[2]=Math.sin(a)*o+H*.7,J.life=3.2+C()*2,J.size0=(2.5+C()*.8)*n,J.size1=(5.8+C()*2.4)*n,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,i%3==2?(q(4867647,J.col0),q(8486261,J.col1)):(q(3551273,J.col0),q(6643542,J.col1)),J.alpha=.6+C()*.14,J.grav=1.3,J.birthOffset=r-.55,x.emit(`smoke`,J)}}function Fn(e,t,n,r,i,a){let o=i?10:30;for(let n=0;n<o;n++){if(C()<.3)continue;let r=n/o*Math.PI*2+(C()-.5)*.85,i=1.4+C()*1.7,s=.7+C()*.9;J.pos[0]=e.x+Math.cos(r)*i,J.pos[1]=t+1.1,J.pos[2]=e.z+Math.sin(r)*i,J.vel[0]=Math.cos(r)*(7+C()*8),J.vel[1]=1.1+C(),J.vel[2]=Math.sin(r)*(7+C()*8),J.life=1+C()*.9,J.size0=1*s,J.size1=(4+C()*2.4)*s,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(9076841,J.col0),q(7827295,J.col1),J.alpha=.2+C()*.13,J.grav=-.5,J.birthOffset=a-C()*.1,x.emit(`dust`,J)}He(e.x,e.z,(i?3.6:5.4)+C()*1.4),i||Ke(e.x,e.z,Math.max(0,-a)),$(K.set(e.x,n,e.z),$t,r?16:i?5:10,18,.85,16761968,.55,.05,.034,a,.35),$(K.set(e.x,n+.4,e.z),$t,r?12:i?3:8,9,1.45,16758880,.8,.04,.04,a,.5)}function In(e,t,n,r,i,a,o){Y.pos[0]=e.x,Y.pos[1]=t,Y.pos[2]=e.z,Y.vel[0]=r,Y.vel[1]=i,Y.vel[2]=a,Y.life=.5+C()*.35,Y.width=.035+C()*.03,Y.stretch=.034,Y.grav=-21.6,q(16761460,Y.col),Y.alpha=.8,Y.seed=C(),Y.birthOffset=o,x.emit(`sparks`,Y);for(let s=.1;s<.6;s+=.16){let c=(1-Math.exp(-.12*s))/.12,l=t+i*c-10.8*s*s;if(l<n+.3)break;J.pos[0]=e.x+r*c,J.pos[1]=l,J.pos[2]=e.z+a*c,J.vel[0]=(C()-.5)*.4,J.vel[1]=.5+C()*.4,J.vel[2]=(C()-.5)*.4,J.life=.7+C()*.4,J.size0=.22,J.size1=.9+C()*.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(3551790,J.col0),q(6315093,J.col1),J.alpha=.5,J.grav=.5,J.birthOffset=o+s,x.emit(`smoke`,J)}}function Ln(e,t,n){J.pos[1]=Q(e,t)+.35,J.vel[0]=0,J.vel[1]=.25,J.vel[2]=0,J.life=.55+C()*.3,J.size0=.55,J.size1=.22,J.rot=C()*Math.PI*2,J.rotVel=0,q(16752974,J.col0),q(10037514,J.col1),J.alpha=.55,J.grav=0,J.birthOffset=n,x.emit(`fire`,J),J.pos[1]=Q(e,t)+.7,J.vel[1]=.8+C()*.5,J.life=1.1+C()*.6,J.size0=.25,J.size1=1+C()*.5,J.rotVel=(C()-.5)*2,q(4538426,J.col0),q(7236193,J.col1),J.alpha=.4,J.grav=.5,J.birthOffset=n+.1,x.emit(`smoke`,J)}function Rn(e,t,n,r,i,a,o,s,c,l){for(let u=.14;u<s;u+=.07){let s=(1-Math.exp(-.12*u))/.12;if(t+i*s-10.8*u*u>n+c*.5)continue;let d=e.x+r*s,f=e.z+a*s;J.pos[0]=d,J.pos[1]=Q(d,f)+.8,J.pos[2]=f,J.vel[0]=r*.06+(C()-.5)*.6,J.vel[1]=.9+C()*.7,J.vel[2]=a*.06+(C()-.5)*.6,J.life=.9+C()*.5,J.size0=.45,J.size1=1.5+C()*.7,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,q(9076841,J.col0),q(7827295,J.col1),J.alpha=.34,J.grav=-.5,J.birthOffset=o+u,x.emit(`dust`,J),l&&Ln(d,f,o+u);break}}function zn(e,t,n,r,i,a){let o=r?30:i?5:14;for(let r=0;r<o;r++){let r=C()*Math.PI*2,i=.25+C()*.85,o=a-C()*.15;X.pos[0]=e.x,X.pos[1]=n,X.pos[2]=e.z,X.vel[0]=Math.cos(r)*Math.sin(i)*(13+C()*11),X.vel[1]=4+C()*6,X.vel[2]=Math.sin(r)*Math.sin(i)*(13+C()*11),X.life=1.4+C()*.7,X.scale=.1+C()*.15,X.spin=8+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5;let s=C()<.55;X.groundY=t,X.hot=s?1:.45,X.seed=C(),X.birthOffset=o;let c=X.vel[0],l=X.vel[1],u=X.vel[2],d=X.life,f=X.scale;x.emit(`debris`,X),s&&In(e,n,t,c,l,u,o),Rn(e,n,t,c,l,u,o,d,f,s)}}function Bn(e,t,n,r,i,a){let o=r?5:i?0:2;for(let r=0;r<o;r++){let r=C()*Math.PI*2,i=.25+C()*.5,o=Math.cos(r)*Math.sin(i)*14,s=12+C()*8,c=Math.sin(r)*Math.sin(i)*14;X.pos[0]=e.x,X.pos[1]=n,X.pos[2]=e.z,X.vel[0]=o,X.vel[1]=s,X.vel[2]=c,X.life=3,X.scale=.23+C()*.1,X.spin=5+C()*8,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=t,X.hot=!0,X.seed=C(),X.birthOffset=a,x.emit(`debris`,X);for(let r=.08;r<1.5;r+=.11){let i=(1-Math.exp(-.12*r))/.12,l=e.x+o*i,u=n+s*i-10.8*r*r,d=e.z+c*i;if(u<t+.3)break;J.pos[0]=l+(C()-.5)*.15,J.pos[1]=u,J.pos[2]=d+(C()-.5)*.15,J.vel[0]=(C()-.5)*.4,J.vel[1]=.5+C()*.4,J.vel[2]=(C()-.5)*.4,J.life=.9+C()*.6,J.size0=.35,J.size1=1.3+C()*.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(2762790,J.col0),q(5591888,J.col1),J.alpha=.55,J.grav=.6,J.birthOffset=a+r,x.emit(`smoke`,J)}}}function Vn(e,t,n,r){X.pos[0]=e.x,X.pos[1]=n+.6,X.pos[2]=e.z,X.vel[0]=(C()-.5)*6,X.vel[1]=9+C()*4,X.vel[2]=(C()-.5)*6,X.life=2.6,X.scale=.45+C()*.2,X.spin=5+C()*6,X.axis[0]=C()-.5,X.axis[1]=.2,X.axis[2]=C()-.5,X.groundY=t,X.hot=!0,X.seed=C(),X.birthOffset=r,x.emit(`debris`,X)}function Hn(e,t,n,r){An(r,.06,()=>{for(let i=0;i<12;i++){let i=C()*Math.PI*2,a=1.5+C()*3.5;J.pos[0]=e+Math.cos(i)*a,J.pos[1]=n+1,J.pos[2]=t+Math.sin(i)*a,J.vel[0]=Math.cos(i)*(.5+C()*.6),J.vel[1]=.25+C()*.3,J.vel[2]=Math.sin(i)*(.5+C()*.6),J.life=3.5+C()*2.5,J.size0=1.5,J.size1=5.2+C()*1.8,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*.6,q(8814190,J.col0),q(7630432,J.col1),J.alpha=.15+C()*.06,J.grav=-.2,J.birthOffset=r+1.2+C()*1.2,x.emit(`dust`,J)}})}function Un(e,t,n,r,i){let a=n?6:14;for(let n=0;n<a;n++){let a=n/12*12+C()*2;J.pos[0]=e.x+V*a*.3+(C()-.5)*(1.3+a*.18),J.pos[1]=t+1.5+a,J.pos[2]=e.z+H*a*.3+(C()-.5)*(1.3+a*.18),J.vel[0]=V*(.3+a*.09)+(C()-.5)*.9,J.vel[1]=3+C()*2,J.vel[2]=H*(.3+a*.09)+(C()-.5)*.9,J.life=3+C()*1.8,J.size0=(2+C()*1+a*.1)*r,J.size1=(6+C()*2.5+a*.22)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1,n%3==2?(q(4341304,J.col0),q(7565160,J.col1)):(q(3354153,J.col0),q(6249042,J.col1)),J.alpha=.55+C()*.15,J.grav=1,J.birthOffset=i-1.1+a/14*.8,x.emit(`smoke`,J)}}function Wn(e,t,n,r,i){let a=n?5:10;for(let n=0;n<a;n++){let a=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.4,J.pos[1]=t+.6+C()*1.6,J.pos[2]=e.z+(C()-.5)*1.4,J.vel[0]=Math.cos(a)*(.5+C()*.7)+V*.5,J.vel[1]=2.6+C()*2,J.vel[2]=Math.sin(a)*(.5+C()*.7)+H*.5,J.life=4+C()*2.5,J.size0=(1.8+C()*.8)*r,J.size1=(5.4+C()*2.2)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.4,n%3==2?(q(4012340,J.col0),q(7236195,J.col1)):(q(3551273,J.col0),q(6380370,J.col1)),J.alpha=.6+C()*.14,J.grav=1,J.birthOffset=i-.35+n/9*2.85+C()*.25,x.emit(`smoke`,J)}}function Gn(e,t,n,r,i){let a=n?4:8;for(let n=0;n<a;n++){let a=n/8*Math.PI*2+C()*.7,o=1.3+C()*1.3;J.pos[0]=e.x+Math.cos(a)*o,J.pos[1]=t+.4+C()*1.2,J.pos[2]=e.z+Math.sin(a)*o,J.vel[0]=Math.cos(a)*(.9+C()*.8)+V*.4,J.vel[1]=2+C()*1.6,J.vel[2]=Math.sin(a)*(.9+C()*.8)+H*.4,J.life=3.5+C()*1.5,J.size0=(2+C()*.8)*r,J.size1=(5+C()*1.8)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.8,n%3==2?(q(4209718,J.col0),q(7433574,J.col1)):(q(3354151,J.col0),q(6051919,J.col1)),J.alpha=.68+C()*.12,J.grav=1.1,J.birthOffset=i+.05+C()*.3,x.emit(`smoke`,J)}}function Kn(e,t,n){if(!e)return;y.clearVehicle(e);let r=.15+n;r<=0?e.setDestroyed({pop:t,ageS:-r}):_t.push({t:r,fn:()=>e.setDestroyed({pop:t})})}function qn(e,t,n=0,r=`ammorack`){let i=r===`ammorack`,a=r===`fire`,o=Q(e.x,e.z),s=Math.max(e.y,o)+1.2,c=Jn(e.x,s,e.z);En(e,s,a,c,n);let l=kn(e,s,i,a,c,n);jn(e.x,e.z,s,l,c,n),Mn(e,s,n),Nn(e,o,s,i,a,n),Pn(e,s,c,n),Fn(e,o,s,i,a,n),zn(e,o,s,i,a,n),Bn(e,o,s,i,a,n),i&&Vn(e,o,s,n),Hn(e.x,e.z,o,n),j(O[1],K.set(e.x,s+3.6,e.z),zt*(a?.5:1),Math.max(0,-n)),Un(e,s,a,c,n),Wn(e,s,a,c,n),Gn(e,s,a,c,n),B.push({key:null,pos:[e.x,Math.max(e.y,o),e.z],acc:0,ttl:Bt,scale:a?1.45:1.3}),Zn(),Kn(t,i,n)}function Jn(e,t,n){let r=a&&a.camera;if(!r)return 1;Yt.set(e,t,n);let i=r.position.distanceTo(Yt);return T.clamp(i/90,1,2.4)**.75}function Yn(e,t=0){let n=Math.min(1,Math.max(0,e.ttl/Bt)),r=Jn(e.pos[0],e.pos[1],e.pos[2]),i=e.scale*(.62+.38*n)*r,a=Bt-Math.max(0,e.ttl),o=Math.min(3.5+a*2,15),s=n>.85?4:3;for(let r=0;r<s;r++){let r=C()**1.35,a=r*o,s=V*a*.28,c=H*a*.28;J.pos[0]=e.pos[0]+s+(C()-.5)*(.7+a*.16)*i,J.pos[1]=e.pos[1]+.9+a+C()*.8,J.pos[2]=e.pos[2]+c+(C()-.5)*(.7+a*.16)*i;let l=.35+a*.2+C()*.4;J.vel[0]=V*l+(C()-.5)*.9,J.vel[1]=2.4+1.2*n+C()*1.6,J.vel[2]=H*l+(C()-.5)*.9,J.life=2.8+C()*1.4+r*1.2,J.size0=(1+C()*.6+a*.09)*i,J.size1=(3.6+C()*2+a*.3)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.9;let u=C()*.5+r*.5;u<.45?(q(3814705,J.col0),q(7236195,J.col1)):u<.8?(q(4867649,J.col0),q(8420468,J.col1)):(q(5920335,J.col0),q(9736330,J.col1)),J.alpha=.2+C()*.12+.2*n,J.grav=.45,J.birthOffset=t-C()*Ht,x.emit(`smoke`,J)}{let r=C()*3.5;J.pos[0]=e.pos[0]+V*r*.28+(C()-.5)*.6*i,J.pos[1]=e.pos[1]+1.1+r,J.pos[2]=e.pos[2]+H*r*.28+(C()-.5)*.6*i,J.vel[0]=V*(.4+r*.18)+(C()-.5)*.5,J.vel[1]=2.2+C()*1.4,J.vel[2]=H*(.4+r*.18)+(C()-.5)*.5,J.life=2.6+C()*1.4,J.size0=(1.4+C()*.7+r*.12)*i,J.size1=(3.4+C()*1.6+r*.25)*i,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.6,q(2893860,J.col0),q(5130820,J.col1),J.alpha=.3+.22*n,J.grav=.5,J.birthOffset=t-C()*Ht,x.emit(`smoke`,J)}if(C()<.7+.3*n){let n=C()<.35?2:1;for(let i=0;i<n;i++)J.pos[0]=e.pos[0]+(C()-.5)*1.2,J.pos[1]=e.pos[1]+.95+C()*.55,J.pos[2]=e.pos[2]+(C()-.5)*1.2,J.vel[0]=(C()-.5)*.6,J.vel[1]=1+C()*.9,J.vel[2]=(C()-.5)*.6,J.life=.3+C()*.28,J.size0=(1.15+C()*.4)*e.scale*r,J.size1=(.75+C()*.3)*e.scale*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(16764784,J.col0),q(16734736,J.col1),J.alpha=.95,J.grav=1.4,J.birthOffset=t-C()*.15,x.emit(`fire`,J)}}function Xn(e,t=0){let n=Math.max(0,(e.smolder??0)/Vt),r=Jn(e.pos[0],e.pos[1],e.pos[2]);J.pos[0]=e.pos[0]+(C()-.5)*1.4,J.pos[1]=e.pos[1]+1.2+C()*1,J.pos[2]=e.pos[2]+(C()-.5)*1.4,J.vel[0]=(C()-.5)*.8+V*.55,J.vel[1]=1.2+C()*1.2,J.vel[2]=(C()-.5)*.8+H*.55,J.life=5+C()*3,J.size0=(.9+C()*.5)*r,J.size1=(4+C()*2)*r,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*.6,q(4867650,J.col0),q(8288883,J.col1),J.alpha=.14+.2*n,J.grav=.3,J.birthOffset=t,x.emit(`smoke`,J),C()<.25+.3*n&&(Y.pos[0]=e.pos[0]+(C()-.5)*1.2,Y.pos[1]=e.pos[1]+1.4,Y.pos[2]=e.pos[2]+(C()-.5)*1.2,Y.vel[0]=(C()-.5)*1.5,Y.vel[1]=2+C()*2.5,Y.vel[2]=(C()-.5)*1.5,Y.life=.5+C()*.5,Y.width=.02+C()*.015,Y.stretch=.03,Y.grav=-9,q(16756832,Y.col),Y.alpha=.7,Y.seed=C(),Y.birthOffset=t,x.emit(`sparks`,Y))}function Zn(){for(;B.length>Ut;){let e=0;for(let t=1;t<B.length;t++)B[t].ttl<B[e].ttl&&(e=t);B.splice(e,1)}}function Qn(e){let t=0;for(let n of B)n.key!==e&&(B[t++]=n);B.length=t}let $n=[];function er(){let e=x.getTime(),t=e-an;return an=e,t>0?Math.min(t,8):0}function tr(e){if(!(!B.length||!e))for(let t of B)t.key!=null&&(t.attachmentResolved=St(t,e(t.key),Qt))}function nr(){for(let e of O)A(e);for(let e of L)Ge(e);for(let e of Je)Ze(e)}function rr(e){et+=e,!(et<=1.4)&&(et=0,y.sweep())}function ir(){if(E)return;let e=O[1];if(k(e)>=e.dur&&B.length){let e=B[B.length-1];D.position.set(e.pos[0],e.pos[1]+2.6,e.pos[2]),D.distance=12;let t=x.getTime();D.intensity=(9.5+3.2*Math.sin(t*13.7)+2.2*Math.sin(t*7.1+1.9))*e.scale;return}k(e)<e.dur&&D.distance!==13&&(D.distance=13)}function ar(e){if(!_t.length)return;$n.length=0;for(let t of _t)t.t-=e,t.t<=0&&$n.push(t);if(!$n.length)return;let t=0;for(let e of _t)e.t>0&&(_t[t++]=e);if(_t.length=t,!E)for(let e of $n)e.fn();$n.length=0}function or(e,t){if(e.ttl-=t,e.ttl<=0){e.ttl=0,e.smolder=Vt,e.acc=0;return}if(E){e.acc=0;return}for(e.acc+=t;e.acc>=Ht;)e.acc-=Ht,Yn(e,-e.acc)}function sr(e,t){if(e.smolder=(e.smolder===void 0?Vt:e.smolder)-t,e.smolder<=0)return!1;if(E)return e.acc=0,!0;for(e.acc+=t;e.acc>=.45;)e.acc-=.45,Xn(e,-e.acc);return!0}function cr(){let e=0;for(let t of B)(t.ttl>0||(t.smolder??0)>0)&&(B[e++]=t);B.length=e}function lr(e){if(!B.length)return;let t=!1;for(let n of B)n.ttl>0?or(n,e):sr(n,e)||(t=!0);t&&cr()}function ur(e){e>0&&(ar(e),lr(e))}function dr(e){let t=e.prevPos??e.pos;return[t.x,t.y,t.z]}function fr(e){if(!ce){en.clear();for(let t=0;t<e.length;t++){let n=e[t];if(!n.pos||n.id==null||(en.add(n.id),n.dead))continue;let r=xt.get(n.id);r||(r=dr(n),xt.set(n.id,r));let i=n.pos.x-r[0],a=n.pos.y-r[1],o=n.pos.z-r[2];i*i+a*a+o*o>1e-6&&ae(r[0],r[1],r[2],n.pos.x,n.pos.y,n.pos.z),r[0]=n.pos.x,r[1]=n.pos.y,r[2]=n.pos.z}for(let e of xt.keys())en.has(e)||xt.delete(e)}}let pr=0;function mr(e,t){pr<Mt&&(je.position.copy(e).addScaledVector(t,-.65),je.quaternion.setFromUnitVectors(Xe,t),je.scale.set(1,1,1),je.updateMatrix(),P.setMatrixAt(pr,je.matrix),Me.position.copy(e).addScaledVector(t,-1.35),Me.quaternion.identity(),Me.scale.setScalar(1.15),Me.updateMatrix(),Ce.setMatrixAt(pr,Me.matrix),pr++)}function hr(e,t){let n=e.pos;mr(n,U);let r=Ee.get(e.id);return r||(r={points:new Float32Array(At*3),count:0,age:0,seen:!0},Ee.set(e.id,r),e.prevPos&&ht(r,e.prevPos.x,e.prevPos.y,e.prevPos.z)),r.age=0,r.seen=!0,ht(r,n.x,n.y,n.z),gt(r,t)}function gr(e,t,n,r,i){let a=e.pos;q(n.core,ft),q(n.glow,pt);let o=e.isPlayer?1:1.7,s=e.isPlayer?1.15:1.5;Yt.copy(a).sub(t.position);let c=Yt.length();if(c>1e-4){let e=T.smoothstep(Math.abs(Yt.dot(U))/c,.9,.995);o*=1+2.6*e,s*=1+.9*e}let l=Math.min(n.width*o,.15);return mt(i,W.x,W.y,W.z,a.x,a.y,a.z,l,s,r?ke:ft,r?Ae:pt,+!!r),r||_r(e,l,s),i+1}function _r(e,t,n){let r=Te.get(e.id);r||(r={d:new Float32Array(14),age:0,seen:!0},Te.set(e.id,r)),r.age=0,r.seen=!0;let i=r.d;i[0]=W.x,i[1]=W.y,i[2]=W.z,i[3]=e.pos.x,i[4]=e.pos.y,i[5]=e.pos.z,i[6]=t*1.3,i[7]=n*.16,i[8]=.45+ft[0]*.25,i[9]=.44+ft[1]*.25,i[10]=.43+ft[2]*.25,i[11]=.3+pt[0]*.25,i[12]=.3+pt[1]*.25,i[13]=.3+pt[2]*.25}function vr(e,t){let n=0;pr=0,Pe=0;for(let e of Ee.values())e.seen=!1;for(let r=0;r<e.length&&n<Pt;r++){let i=e[r];if(i.dead)continue;let a=!!i.spec?.guided,o=Dt[(a?`ATGM`:i.spec?.tracer)??`AP`],s=i.vel.length(),c=Math.min(T.clamp(s*.0035,3,6),Math.max(i.distM||0,.08));U.copy(i.vel).normalize(),W.copy(i.pos).addScaledVector(U,-c),!(a&&(n=hr(i,n),n>=Pt))&&(n=gr(i,t,o,a,n))}return n}function yr(){P.count=pr,Ce.count=pr,Ne=pr,(pr>0||P.userData.lastCount>0)&&(P.instanceMatrix.needsUpdate=!0,Ce.instanceMatrix.needsUpdate=!0),P.userData.lastCount=pr}function br(e,t){for(let[n,r]of Ee){if(r.seen)continue;if(r.age+=t,r.age>=kt){Ee.delete(n);continue}let i=1-r.age/kt;e=gt(r,e,i*i)}return e}function xr(e,t){for(let[n,r]of Te){if(r.seen){r.seen=!1;continue}if(r.age+=t,r.age>=Ot){Te.delete(n);continue}if(e>=Pt)continue;let i=1-r.age/Ot,a=r.d;F[0]=a[8],F[1]=a[9],F[2]=a[10],Oe[0]=a[11],Oe[1]=a[12],Oe[2]=a[13],mt(e++,a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]*i*i,F,Oe)}return e}function Sr(e){let t=x.getTime();for(let n=0;n<we.length&&e<Pt;n++){let r=we[n],i=r.length>14?t-r[14]:0,a=1-T.smoothstep(i,.3,.9);a<=.001||(F[0]=r[8],F[1]=r[9],F[2]=r[10],Oe[0]=r[11],Oe[1]=r[12],Oe[2]=r[13],mt(e++,r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7]*a,F,Oe))}return e}function Cr(e){if(M.instanceCount=e,e>0||M._lastCount!==0)for(let e of be)e.needsUpdate=!0;M._lastCount=e}function wr(e,t,n,r){if(n>.06&&!ce&&dt(e,t,!0),ce||C()>n*(.72+r*.36))return;let i=p?.getWaterSurfaceHeightAt?.(e.x,e.z)??Q(e.x,e.z)+(p?.getWaterDepthAt?.(e.x,e.z)??0);if(J.pos[0]=e.x+(C()-.5)*.45,J.pos[1]=Math.max(e.y,i)+.2+r*.16,J.pos[2]=e.z+(C()-.5)*.45,J.vel[0]=-t.x*(1.8+n*2.6)+(C()-.5)*1.2,J.vel[1]=1.15+n*1.55+C()*.65,J.vel[2]=-t.z*(1.8+n*2.6)+(C()-.5)*1.2,J.life=.34+C()*.3,J.size0=.1+n*.1,J.size1=.42+n*.54,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.2,q(14213852,J.col0),q(9218474,J.col1),J.alpha=(.12+n*.17)*(.55+r*.45),J.grav=-.85,J.birthOffset=0,x.emit(`dust`,J),r>.35&&n>.45&&C()<.7){let r=2.6+n*3.4;J.pos[0]=e.x+t.x*1.3+(C()-.5)*.5,J.pos[1]=i+.12,J.pos[2]=e.z+t.z*1.3+(C()-.5)*.5,J.vel[0]=t.x*r+(C()-.5)*1.4,J.vel[1]=2.3+n*1.6+C()*.8,J.vel[2]=t.z*r+(C()-.5)*1.4,J.life=.42+C()*.26,J.size0=.35+n*.25,J.size1=1.3+n*.9,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.6,q(15134444,J.col0),q(11125186,J.col1),J.alpha=.26+n*.18,J.grav=-6.5,J.birthOffset=0,x.emit(`dust`,J)}C()>=.82||(Y.pos[0]=e.x+(C()-.5)*.35,Y.pos[1]=Math.max(e.y,i)+.22,Y.pos[2]=e.z+(C()-.5)*.35,Y.vel[0]=(C()-.5)*2.4-t.x*n,Y.vel[1]=2.1+C()*2.2,Y.vel[2]=(C()-.5)*2.4-t.z*n,Y.life=.25+C()*.24,Y.width=.018+C()*.012,Y.stretch=.022,Y.grav=-13.5,q(12046543,Y.col),Y.alpha=.34+C()*.2,Y.seed=C(),Y.birthOffset=0,x.emit(`sparks`,Y))}function Tr(e){return e===`hard`?1.5:e===`soft`?1.2:1.9}let Er=1,Dr=1,Or=11051401,kr=9341548;function Ar(e){let t=1,n=a.camera;n&&(Yt.set(e.x,e.y,e.z).sub(n.position),t=T.clamp((Yt.length()-6)/12,0,1)),Er=.62+.38*t,Dr=.55+.45*t}function jr(e){if(e===`hard`){Or=10984844,kr=9406587;return}if(e===`soft`){Or=7169882,kr=6051660;return}Or=11051401,kr=9341548}function Mr(e,t,n,r,i){let a=r===`hard`?.5:.45;C()>=a||(J.pos[0]=e.x+(C()-.5)*.5,J.pos[1]=Math.max(e.y,i)+(r===`hard`?.35:.7),J.pos[2]=e.z+(C()-.5)*.5,J.vel[0]=-t.x*(3.5+C()*3)+(C()-.5)*1.2,J.vel[1]=1.6+C()*1.6*n,J.vel[2]=-t.z*(3.5+C()*3)+(C()-.5)*1.2,J.life=.8+C()*.5,J.size0=.35,J.size1=1.3+n*1.1,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,r===`hard`?(q(Or,J.col0),q(kr,J.col1)):(q(5722431,J.col0),q(6643276,J.col1)),J.alpha=(.28+.28*n)*Dr,J.grav=-1.2,J.birthOffset=0,x.emit(`dust`,J),!(r===`hard`||C()>=.55)&&(X.pos[0]=e.x,X.pos[1]=Math.max(e.y,i)+.5,X.pos[2]=e.z,X.vel[0]=-t.x*(4+C()*4)+(C()-.5)*2,X.vel[1]=2.5+C()*3*n,X.vel[2]=-t.z*(4+C()*4)+(C()-.5)*2,X.life=.9,X.scale=.05+C()*.05,X.spin=12+C()*14,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=i,X.hot=!1,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)))}function Nr(e,t,n,r,i,a,o,s){J.pos[0]=e.x+(C()-.5)*.6,J.pos[1]=Math.max(e.y,i)+(r===`hard`?.55:.95)+C()*.35,J.pos[2]=e.z+(C()-.5)*.6;let c=n*2.4;J.vel[0]=t.x*c-t.x*(1.5+C()*1.8)+(C()-.5)*1.3+V*.55,J.vel[1]=.9+(1.4+C()*1.3)*n,J.vel[2]=t.z*c-t.z*(1.5+C()*1.8)+(C()-.5)*1.3+H*.55,J.life=3+C()*2.6,J.size0=(.4+n*.7)*o,J.size1=Math.min(5.2,(2.4+n*3.4+C()*1.2)*o*Math.min(a,1.25))*Er,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.4,q(Or,J.col0),q(kr,J.col1);let l=r===`hard`?.42:.58,u=r===`hard`?.14+.32*n:.26+.36*n;J.alpha=Math.min(l,u*s*1.18)*Dr,J.grav=-.1,J.birthOffset=0,x.emit(`dust`,J)}function Pr(e,t,n,r,i){let a=i===3;J.pos[0]=e.x+(C()-.5)*.4,J.pos[1]=r+.12,J.pos[2]=e.z+(C()-.5)*.4,J.vel[0]=-t.x*(.8+n*1.4)+(C()-.5)*.8,J.vel[1]=.25+n*.7+C()*.2,J.vel[2]=-t.z*(.8+n*1.4)+(C()-.5)*.8,J.life=a?.46+C()*.28:.28+C()*.25,J.size0=(.12+n*.1)*Er,J.size1=(a?.68+n*.58:.42+n*.44)*Er,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.2,q(a?14542056:13087629,J.col0),q(a?11715021:10653549,J.col1),J.alpha=(.1+n*.12)*Dr,J.grav=a?-.65:-1.8,J.birthOffset=0,x.emit(`dust`,J)}function Fr(e,t,n,r){J.pos[0]=e.x-t.x*1.2+(C()-.5)*.5,J.pos[1]=Math.max(e.y,r)+1.15+C()*.4,J.pos[2]=e.z-t.z*1.2+(C()-.5)*.5,J.vel[0]=t.x*n*1.6+(C()-.5)+V*.6,J.vel[1]=1.5+C()*1.2*n,J.vel[2]=t.z*n*1.6+(C()-.5)+H*.6,J.life=2.6+C()*1.6,J.size0=.8+n*.5,J.size1=Math.min(5.6,3+n*2.6+C()*1.2)*Er,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(11051401,J.col0),q(9078639,J.col1),J.alpha=Math.min(.56,.34+.34*n)*Dr,J.grav=-.06,J.birthOffset=0,x.emit(`dust`,J)}function Ir(e){let t=e-x.getTime();if(Math.abs(t)<=20)return;x.shiftTime(t);for(let e of we)e.length>14&&(e[14]+=t);for(let e of O)e.bornAt+=t;for(let e of L)e.bornAt+=t;for(let e of Je)e.bornAt+=t;let n=z.array;for(let e=0;e<n.length;e++)n[e]>-1e8&&(n[e]+=t);z.clearUpdateRanges(),z.addUpdateRange(0,n.length),z.needsUpdate=!0,an+=t,fe(t)}function Lr(e){return e===`drumblast`?`drumblast`:/fieldhut|leanto|huntingblind|fishershack|saunahut|alpinerefuge|stilthouse|longhouse/.test(e)?`woodbuilding`:/deserttent|commandtent|fieldhospital/.test(e)?`canvasbuilding`:/guardpost|motorpool|quonsethut|transformershed|checkpointhut/.test(e)?`metalbuilding`:/^wall/.test(e)?`masonry`:/^sandbag/.test(e)?`sandbag`:/truck|jeep/.test(e)?`vehicle`:e===`tent`?`canvas`:e===`ammobox`?`ammo`:/^fence|^gate|crate|pallet|cart|stall|bench|trough|firewood|sled|rugframe/.test(e)?`wood`:/bale|stook|hay/.test(e)?`hay`:e===`barrel`?`barrel`:e===`pot`?`pot`:/lamp|drum|churn/.test(e)?`metal`:`wood`}function Rr(e,t,n,r,i){let a=e===`canvasbuilding`,o=e===`metalbuilding`;o&&(G.set(t.x,i+Math.min(1.8,r*.42),t.z),$(G,$t,12,9,1.3,16763264,.5,.035,.045,0,.14));let s=a?8:o?13:17;for(let e=0;e<s;e++){let e=C()*Math.PI*2;X.pos[0]=t.x+(C()-.5)*2.8,X.pos[1]=i+.35+C()*Math.min(2.4,r*.55),X.pos[2]=t.z+(C()-.5)*2.8,X.vel[0]=n.x*(2.2+C()*3.4)+Math.cos(e)*(1.2+C()*3.5),X.vel[1]=2+C()*4.2,X.vel[2]=n.z*(2.2+C()*3.4)+Math.sin(e)*(1.2+C()*3.5),X.life=1.5+C()*.6,X.scale=(a?.06:.09)+C()*(a?.07:.13),X.spin=8+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=i,X.hot=o&&C()<.12?.35:0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}let c=a?11049853:o?7829881:9073758,l=a?8550239:o?5593434:6771780;for(let e=0;e<12;e++){let e=C()*Math.PI*2;J.pos[0]=t.x+(C()-.5)*3.6,J.pos[1]=i+.18+C()*.9,J.pos[2]=t.z+(C()-.5)*3.6,J.vel[0]=Math.cos(e)*(1.8+C()*3)+n.x*2,J.vel[1]=.8+C()*1.5,J.vel[2]=Math.sin(e)*(1.8+C()*3)+n.z*2,J.life=1.6+C()*1.2,J.size0=.75+C()*.5,J.size1=3.2+C()*2.2,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.7,q(c,J.col0),q(l,J.col1),J.alpha=.42+C()*.15,J.grav=-.38,J.birthOffset=0,x.emit(`dust`,J)}}function zr(e,t,n,r,i){let a=/adobe/.test(e),o=a?10848868:9275259,s=a?8810575:7301470;for(let e=0;e<15;e++)X.pos[0]=t.x+(C()-.5)*1.6,X.pos[1]=i+.25+C()*Math.min(1,r*.8),X.pos[2]=t.z+(C()-.5)*1.6,X.vel[0]=n.x*(2.2+C()*2.6)+(C()-.5)*3.6,X.vel[1]=1.8+C()*3.4,X.vel[2]=n.z*(2.2+C()*2.6)+(C()-.5)*3.6,X.life=1.5+C()*.5,X.scale=.1+C()*.12,X.spin=8+C()*14,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=i,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X);for(let e=0;e<11;e++){let e=C()*Math.PI*2;J.pos[0]=t.x+(C()-.5)*1.8,J.pos[1]=i+.3+C()*.7,J.pos[2]=t.z+(C()-.5)*1.8,J.vel[0]=Math.cos(e)*(1.8+C()*2.4)+n.x*2.2,J.vel[1]=1+C()*1.5,J.vel[2]=Math.sin(e)*(1.8+C()*2.4)+n.z*2.2,J.life=1.6+C()*1.1,J.size0=.7+C()*.4,J.size1=2.8+C()*1.5,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.8,q(o,J.col0),q(s,J.col1),J.alpha=.46+C()*.16,J.grav=-.42,J.birthOffset=0,x.emit(`dust`,J)}}function Br(e,t,n){for(let r=0;r<13;r++){let r=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.8,J.pos[1]=n+.2+C()*.5,J.pos[2]=e.z+(C()-.5)*1.8,J.vel[0]=Math.cos(r)*(1.5+C()*2.2)+t.x*2.6,J.vel[1]=.7+C()*1,J.vel[2]=Math.sin(r)*(1.5+C()*2.2)+t.z*2.6,J.life=1.5+C()*1,J.size0=.6+C()*.4,J.size1=2.6+C()*1.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(11048818,J.col0),q(9075548,J.col1),J.alpha=.48+C()*.14,J.grav=-.55,J.birthOffset=0,x.emit(`dust`,J)}for(let r=0;r<4;r++)X.pos[0]=e.x,X.pos[1]=n+.4,X.pos[2]=e.z,X.vel[0]=t.x*(2+C()*2.5)+(C()-.5)*3,X.vel[1]=1.6+C()*2,X.vel[2]=t.z*(2+C()*2.5)+(C()-.5)*3,X.life=1.1,X.scale=.06+C()*.05,X.spin=10+C()*12,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=n,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}function Vr(e,t,n,r){G.set(e.x,r+Math.min(1.2,n*.5),e.z),$(G,$t,14,11,1.2,16764554,.5,.04,.04,0,.12);for(let i=0;i<10;i++)X.pos[0]=e.x+(C()-.5)*1.4,X.pos[1]=r+.4+C()*Math.min(1.4,n*.6),X.pos[2]=e.z+(C()-.5)*1.4,X.vel[0]=t.x*(2.6+C()*3.2)+(C()-.5)*4.5,X.vel[1]=2.4+C()*3.6,X.vel[2]=t.z*(2.6+C()*3.2)+(C()-.5)*4.5,X.life=1.5,X.scale=.08+C()*.09,X.spin=10+C()*16,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=r,X.hot=C()<.2?.45:0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X);for(let t=0;t<5;t++)J.pos[0]=e.x+(C()-.5)*1.2,J.pos[1]=r+.7+C()*.8,J.pos[2]=e.z+(C()-.5)*1.2,J.vel[0]=(C()-.5)*1.2,J.vel[1]=1.8+C()*1.6,J.vel[2]=(C()-.5)*1.2,J.life=.5+C()*.3,J.size0=.5+C()*.3,J.size1=1.1+C()*.5,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*3,q(16756820,J.col0),q(14248482,J.col1),J.alpha=.85,J.grav=.6,J.birthOffset=0,x.emit(`fire`,J);for(let n=0;n<8;n++){let n=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.2,J.pos[1]=r+.8+C()*.8,J.pos[2]=e.z+(C()-.5)*1.2,J.vel[0]=Math.cos(n)*(.8+C()*1.2)+t.x*1.4,J.vel[1]=1.6+C()*1.6,J.vel[2]=Math.sin(n)*(.8+C()*1.2)+t.z*1.4,J.life=1.8+C()*1.2,J.size0=.7+C()*.4,J.size1=3+C()*1.6,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.6,q(3025704,J.col0),q(4867650,J.col1),J.alpha=.5+C()*.15,J.grav=.25,J.birthOffset=0,x.emit(`smoke`,J)}}function Hr(e,t,n){for(let r=0;r<9;r++){let r=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.4,J.pos[1]=n+.3+C()*.9,J.pos[2]=e.z+(C()-.5)*1.4,J.vel[0]=Math.cos(r)*(1.4+C()*1.8)+t.x*2,J.vel[1]=.9+C()*1.2,J.vel[2]=Math.sin(r)*(1.4+C()*1.8)+t.z*2,J.life=1.3+C()*.8,J.size0=.5+C()*.3,J.size1=2+C()*1,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(10720886,J.col0),q(8747614,J.col1),J.alpha=.4+C()*.14,J.grav=-.35,J.birthOffset=0,x.emit(`dust`,J)}for(let r=0;r<4;r++)X.pos[0]=e.x,X.pos[1]=n+.5,X.pos[2]=e.z,X.vel[0]=t.x*(2+C()*2.5)+(C()-.5)*3.2,X.vel[1]=2+C()*2.4,X.vel[2]=t.z*(2+C()*2.5)+(C()-.5)*3.2,X.life=1.2,X.scale=.05+C()*.05,X.spin=12+C()*14,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=n,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}function Ur(e,t,n){G.set(e.x,n+.4,e.z),$(G,$t,8,8,1,16766346,.4,.03,.035,0,.14);for(let r=0;r<9;r++)X.pos[0]=e.x+(C()-.5)*.6,X.pos[1]=n+.3+C()*.4,X.pos[2]=e.z+(C()-.5)*.6,X.vel[0]=t.x*(2.4+C()*3)+(C()-.5)*4,X.vel[1]=2.2+C()*3,X.vel[2]=t.z*(2.4+C()*3)+(C()-.5)*4,X.life=1.3,X.scale=.05+C()*.06,X.spin=12+C()*16,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=n,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}function Wr(e,t){let n=t+.7;He(e.x,e.z,2.4+C()*.7),J.pos[0]=e.x,J.pos[1]=n+.4,J.pos[2]=e.z,J.vel[0]=0,J.vel[1]=.6,J.vel[2]=0,J.life=.22,J.size0=1.6,J.size1=3.6,J.rot=C()*Math.PI*2,J.rotVel=0,q(16771512,J.col0),q(16757854,J.col1),J.alpha=.95,J.grav=0,J.birthOffset=0,x.emit(`flash`,J);for(let t=0;t<12;t++){let t=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*.7,J.pos[1]=n+C()*.7,J.pos[2]=e.z+(C()-.5)*.7,J.vel[0]=Math.cos(t)*(1.6+C()*2.4),J.vel[1]=2.6+C()*3,J.vel[2]=Math.sin(t)*(1.6+C()*2.4),J.life=.5+C()*.35,J.size0=.8+C()*.5,J.size1=2+C()*.9,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(16761442,J.col0),q(14707230,J.col1),J.alpha=.9,J.grav=1.1,J.birthOffset=0,x.emit(`fire`,J)}for(let t=0;t<7;t++)J.pos[0]=e.x+(C()-.5)*.9,J.pos[1]=n+.4+C()*.9,J.pos[2]=e.z+(C()-.5)*.9,J.vel[0]=(C()-.5)*1.6,J.vel[1]=2.2+C()*2.2,J.vel[2]=(C()-.5)*1.6,J.life=1.9+C()*1.3,J.size0=1+C()*.6,J.size1=3.6+C()*1.8,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.4,q(2367259,J.col0),q(4538426,J.col1),J.alpha=.62,J.grav=.35,J.birthOffset=0,x.emit(`billow`,J);G.set(e.x,n,e.z),$(G,$t,16,15,1.15,16761460,.55,.045,.05,0,.1);for(let r=0;r<10;r++){let r=C()*Math.PI*2;X.pos[0]=e.x,X.pos[1]=n,X.pos[2]=e.z,X.vel[0]=Math.cos(r)*(6+C()*7),X.vel[1]=3.5+C()*5,X.vel[2]=Math.sin(r)*(6+C()*7),X.life=1.3+C()*.5,X.scale=.07+C()*.09,X.spin=12+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=t,X.hot=C()<.5?1:.45,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}}function Gr(e,t,n,r){for(let i=0;i<12;i++){let i=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*.8,J.pos[1]=r+.3+C()*Math.min(1.6,n*.7),J.pos[2]=e.z+(C()-.5)*.8,J.vel[0]=Math.cos(i)*(1.2+C()*1.8)+t.x*2,J.vel[1]=.8+C()*1.4,J.vel[2]=Math.sin(i)*(1.2+C()*1.8)+t.z*2,J.life=1.6+C()*1.2,J.size0=.5+C()*.4,J.size1=2+C()*1.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.6,q(11902814,J.col0),q(9666634,J.col1),J.alpha=.42+C()*.14,J.grav=-.25,J.birthOffset=0,x.emit(`dust`,J)}for(let n=0;n<5;n++)X.pos[0]=e.x,X.pos[1]=r+.5+C()*.6,X.pos[2]=e.z,X.vel[0]=t.x*(1.5+C()*2)+(C()-.5)*3,X.vel[1]=1.8+C()*2.2,X.vel[2]=t.z*(1.5+C()*2)+(C()-.5)*3,X.life=1.2,X.scale=.035+C()*.04,X.spin=8+C()*10,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=r,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}function Kr(e,t,n,r){G.set(e.x,r+Math.min(1,n*.4),e.z),$(G,$t,10,9,1.1,16764554,.45,.035,.035,0,.1);for(let n=0;n<6;n++){let n=C()*Math.PI*2;J.pos[0]=e.x,J.pos[1]=r+.3,J.pos[2]=e.z,J.vel[0]=Math.cos(n)*(1.4+C()*1.6)+t.x*2.2,J.vel[1]=.8+C()*1,J.vel[2]=Math.sin(n)*(1.4+C()*1.6)+t.z*2.2,J.life=1.1+C()*.7,J.size0=.4+C()*.3,J.size1=1.6+C()*.9,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(7301728,J.col0),q(5722955,J.col1),J.alpha=.36+C()*.14,J.grav=-.35,J.birthOffset=0,x.emit(`dust`,J)}}function qr(e,t,n,r,i){let a=e===`barrel`?10:e===`pot`?9:12,o=e===`barrel`?.08:e===`pot`?.04:.05,s=e===`barrel`?.09:e===`pot`?.05:.07;for(let e=0;e<a;e++)X.pos[0]=t.x+(C()-.5)*.5,X.pos[1]=i+.3+C()*Math.min(1.1,r*.5),X.pos[2]=t.z+(C()-.5)*.5,X.vel[0]=n.x*(2.5+C()*3.5)+(C()-.5)*4.5,X.vel[1]=2.2+C()*3.6,X.vel[2]=n.z*(2.5+C()*3.5)+(C()-.5)*4.5,X.life=1.4,X.scale=o+C()*s,X.spin=12+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=i,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X);for(let r=0;r<7;r++){let r=C()*Math.PI*2;J.pos[0]=t.x+(C()-.5)*.5,J.pos[1]=i+.25+C()*.4,J.pos[2]=t.z+(C()-.5)*.5,J.vel[0]=Math.cos(r)*(1.5+C()*2)+n.x*2.4,J.vel[1]=.9+C()*1.2,J.vel[2]=Math.sin(r)*(1.5+C()*2)+n.z*2.4,J.life=1.3+C()*.9,J.size0=.45+C()*.3,J.size1=1.9+C()*1.1,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,e===`pot`?(q(10119754,J.col0),q(8147512,J.col1)):(q(9077361,J.col0),q(7827296,J.col1)),J.alpha=.4+C()*.15,J.grav=-.4,J.birthOffset=0,x.emit(`dust`,J)}}let Jr={group:S,setReplaySuppressed(e){if(E=!!e,E){for(let e of O)e.light.intensity=0;for(let e of L)e.mesh.visible=!1,e.mat.opacity=0;for(let e of Je)e.mesh.visible=!1,e.mat.opacity=0}},getReplaySuppressionDebug(){return{suppressed:E,lightIntensities:[he.intensity,D.intensity],worldFixedColumns:B.reduce((e,t)=>e+ +(t.key==null),0)}},getGuidedMissileDebug(){return{bodies:Ne,trailSegments:Pe}},getAttachmentDebug(){let e=0,t=0,n=[];for(let r of B)r.key!=null&&(e++,r.attachmentResolved&&t++,n.push({id:r.key,resolved:!!r.attachmentResolved,pos:[r.pos[0],r.pos[1],r.pos[2]],localPos:r.localPos?[r.localPos[0],r.localPos[1],r.localPos[2]]:null}));return{keyedColumns:e,resolvedKeyedColumns:t,unresolvedKeyedColumns:e-t,worldFixedColumns:B.length-e,subjects:n}},warmTextures(){x.warmTextures()},preloadTextures(){return x.preloadTextures()},warmTexturesChunked(e,t){return x.warmTexturesChunked(e,t)},warmOpeningEffects(e,t,n,r=120){Jr.muzzleFlash(e,t,r),vn(e,t),Jr.impact(`pen`,e,n,r),Jr.impact(`terrain`,e,n,r),Sn(e,76,!1);for(let n of[`fence`,`wall`,`sandbag`,`truck`,`drumblast`])Jr.propBreak(n,e,t,1.5);Jr.propCrush(e,t,7)},warmProjectilePresentation(e,t){pr=0,mr(e,t),yr()},update(e,t,n,r=null){x.update(e),st.uTime.value=x.getTime();let i=er();on+=i,tr(r),nr(),rr(e),ir(),ur(i),fr(t);let a=vr(t,n);yr(),a=br(a,i),a=xr(a,i),a=Sr(a),Cr(a)},bindBus(e){Ct(e,`shell:fired`,e=>{G.set(e.muzzlePos[0],e.muzzlePos[1],e.muzzlePos[2]),Kt.set(e.dir[0],e.dir[1],e.dir[2]),e.feedbackPredicted||Jr.muzzleFlash(G,Kt,e.caliberMm),e.shellType===`APFSDS`&&vn(G,Kt),bt.size>96&&(bt.clear(),xt.clear()),bt.set(e.shellId,e.shellType),xt.set(e.shellId,[e.muzzlePos[0],e.muzzlePos[1],e.muzzlePos[2]])}),Ct(e,`weapon:predicted`,e=>{e.isPlayer&&(G.set(e.muzzlePos[0],e.muzzlePos[1],e.muzzlePos[2]),Kt.set(e.dir[0],e.dir[1],e.dir[2]),Jr.muzzleFlash(G,Kt,e.caliberMm))}),Ct(e,`shell:hit`,e=>{if(G.set(e.pos[0],e.pos[1],e.pos[2]),Kt.set(e.normal[0],e.normal[1],e.normal[2]),e.targetId&&yt.set(e.targetId,[e.pos[0],e.pos[1],e.pos[2]]),e.shellId!=null){let t=xt.get(e.shellId);t&&(xt.delete(e.shellId),ae(t[0],t[1],t[2],e.pos[0],e.pos[1],e.pos[2])),bt.delete(e.shellId)}let t=R(e.targetId);t&&(y.stampFromEvent(e,t),t.visual.applyEquipmentDamage?.(e));let n=(e.eraActivations||[]).filter(e=>e?.pos?.length===3);if(n.length)for(let t of n)qt.fromArray(t.pos),Jt.fromArray(t.normal?.length===3?t.normal:e.normal),Jr.impact(`era`,qt,Jt,e.caliberMm);else pe(e)&&e.kind!==`era`&&Jr.impact(`era`,G,Kt,e.caliberMm);(e.kind!==`era`||!n.length)&&Jr.impact(e.kind,G,Kt,e.caliberMm)}),Ct(e,`shell:expired`,e=>{{let t=bt.get(e.shellId);bt.delete(e.shellId);let n=xt.get(e.shellId);n&&(xt.delete(e.shellId),ae(n[0],n[1],n[2],e.pos[0],e.pos[1],e.pos[2]));let r=t===`HE`||t===`HESH`;se(e.pos[0],e.pos[1],e.pos[2],{he:r,r:r?4.6:1})}if(G.set(e.pos[0],e.pos[1],e.pos[2]),e.hitKind===`prop`){Array.isArray(e.normal)?Kt.set(e.normal[0],e.normal[1],e.normal[2]).normalize():Kt.copy($t),Jr.impact(`structure`,G,Kt,e.caliberMm||90);return}e.hitTerrain&&(e.hitWater||Cn(G)?wn(G,e.caliberMm||76,!1):Sn(G,e.caliberMm||76,!1))}),Ct(e,`tank:destroyed`,e=>{Qn(e.id),yt.set(e.id,[e.pos[0],e.pos[1],e.pos[2]]),y.clearVehicle(e.id);let t=R(e.id);t&&y.clearVehicle(t.visual),G.set(e.pos[0],e.pos[1],e.pos[2]),Jr.destruction(G,null,e.cause||`shot`)}),Ct(e,`module:state`,e=>{if((e.module===`trackL`||e.module===`trackR`)&&e.state===`red`){let t=yt.get(e.id);if(!t)return;G.set(t[0],t[1]+.55,t[2]),He(t[0],t[2],2.4+C()*.8),$(G,$t,26,16,1.25,16764554,.7,.05,.045,0,.16);for(let e=0;e<12;e++){let e=C()*Math.PI*2;X.pos[0]=t[0],X.pos[1]=t[1]+.55,X.pos[2]=t[2],X.vel[0]=Math.cos(e)*(4.5+C()*6),X.vel[1]=4.5+C()*6,X.vel[2]=Math.sin(e)*(4.5+C()*6),X.life=1.6,X.scale=.09+C()*.1,X.spin=14+C()*16,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=Q(t[0],t[2]),X.hot=!1,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}for(let e=0;e<18;e++){let e=C()*Math.PI*2;J.pos[0]=t[0]+(C()-.5)*1.8,J.pos[1]=t[1]+.5+C()*.5,J.pos[2]=t[2]+(C()-.5)*1.8,J.vel[0]=Math.cos(e)*(2.2+C()*3.2),J.vel[1]=1.6+C()*1.6,J.vel[2]=Math.sin(e)*(2.2+C()*3.2),J.life=1.6+C()*1.2,J.size0=.7,J.size1=3.4+C()*1.6,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(9274737,J.col0),q(8024675,J.col1),J.alpha=.5,J.grav=-.4,J.birthOffset=-C()*.15,x.emit(`dust`,J)}}}),Ct(e,`tank:fire`,e=>{if(e.burning){let t=yt.get(e.id);if(!t)return;let n=B.find(t=>t.key===e.id);if(n)n.ttl=Bt;else{let n={key:e.id,pos:[t[0],t[1],t[2]],acc:0,ttl:Bt,scale:.8};B.push(n),Yn(n),Zn()}}else Qn(e.id)})},muzzleFlash(e,t,n){let r=_n(e,t,n,0);K.copy(e).addScaledVector(t,-.15),K.y+=.1,j(O[0],K,It*r,0)},vehicleCollision(e,t,n=0){let r=T.clamp((Number(n)||0)/12,.35,1.4);U.copy(t),U.lengthSq()<1e-6?U.set(0,0,1):U.normalize(),U.y=Math.max(.12,U.y),U.normalize(),$(e,U,Math.round(20+18*r),12+8*r,1.2,16765082,.55+.2*r,.045,.04,0,.22),$(e,W.copy(U).multiplyScalar(-1),Math.round(12+12*r),8+6*r,1.5,16752469,.45,.035,.032,0,.16);for(let t=0;t<10+Math.round(8*r);t++){let t=C()*Math.PI*2;X.pos[0]=e.x,X.pos[1]=e.y+.28,X.pos[2]=e.z,X.vel[0]=Math.cos(t)*(2.5+C()*5.5)*r,X.vel[1]=2.2+C()*4.8,X.vel[2]=Math.sin(t)*(2.5+C()*5.5)*r,X.life=1.2+C()*.8,X.scale=.08+C()*.11,X.spin=10+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=Q(e.x,e.z),X.hot=!1,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}for(let t=0;t<12;t++){let t=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*1.6,J.pos[1]=e.y+.12+C()*.35,J.pos[2]=e.z+(C()-.5)*1.6,J.vel[0]=Math.cos(t)*(1.2+C()*2.8)*r,J.vel[1]=.8+C()*1.5,J.vel[2]=Math.sin(t)*(1.2+C()*2.8)*r,J.life=.8+C()*.8,J.size0=.45,J.size1=2+C()*1.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*1.5,q(7432540,J.col0),q(5065026,J.col1),J.alpha=.42,J.grav=-.25,J.birthOffset=0,x.emit(`dust`,J)}K.copy(e),K.y+=.45,j(O[1],K,zt*.08*r,0)},impact(e,t,n,r){let i=Jn(t.x,t.y,t.z),a=sn(r)*i;switch(e){case`pen`:bn(t,n,a,16777215,16752688),J.pos[0]=t.x+n.x*.14,J.pos[1]=t.y+n.y*.14,J.pos[2]=t.z+n.z*.14,J.vel[0]=n.x*2.5,J.vel[1]=n.y*2.5+.5,J.vel[2]=n.z*2.5,J.life=.09,J.size0=.55*a,J.size1=1.05*a,J.rot=C()*Math.PI*2,J.rotVel=0,q(16777215,J.col0),q(16773840,J.col1),J.alpha=1,J.grav=0,J.birthOffset=0,x.emit(`flash`,J),tn(n,U,W);for(let e=0;e<8;e++){let e=C()*Math.PI*2,r=C()*.24,i=Math.sin(r),o=Math.cos(r),s=n.x*o+(U.x*Math.cos(e)+W.x*Math.sin(e))*i,c=n.y*o+(U.y*Math.cos(e)+W.y*Math.sin(e))*i,l=n.z*o+(U.z*Math.cos(e)+W.z*Math.sin(e))*i,u=10+C()*9;J.pos[0]=t.x+n.x*.15,J.pos[1]=t.y+n.y*.15,J.pos[2]=t.z+n.z*.15,J.vel[0]=s*u,J.vel[1]=c*u,J.vel[2]=l*u,J.life=.45+C()*.4,J.size0=.2*a,J.size1=(.95+C()*.55)*a,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*4,q(3683117,J.col0),q(6051405,J.col1),J.alpha=.8,J.grav=-2,J.birthOffset=-C()*.03,x.emit(`smoke`,J)}for(let e=0;e<5;e++){let r=C()*Math.PI*2,i=C()*.45,a=Math.sin(i),o=Math.cos(i);X.pos[0]=t.x,X.pos[1]=t.y,X.pos[2]=t.z,X.vel[0]=(n.x*o+(U.x*Math.cos(r)+W.x*Math.sin(r))*a)*(9+C()*9),X.vel[1]=(n.y*o+(U.y*Math.cos(r)+W.y*Math.sin(r))*a)*(9+C()*9)+2.5,X.vel[2]=(n.z*o+(U.z*Math.cos(r)+W.z*Math.sin(r))*a)*(9+C()*9),X.life=1.3,X.scale=.05+C()*.06,X.spin=14+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=Q(t.x,t.z),X.hot=e<2?1:.45,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}for(let e=0;e<8;e++){let r=e/8*Math.PI*2+C()*.6,i=U.x*Math.cos(r)+W.x*Math.sin(r),o=U.y*Math.cos(r)+W.y*Math.sin(r),s=U.z*Math.cos(r)+W.z*Math.sin(r);J.pos[0]=t.x+i*.3+n.x*.1,J.pos[1]=t.y+o*.3+n.y*.1,J.pos[2]=t.z+s*.3+n.z*.1,J.vel[0]=i*(3+C()*2.5)+n.x*.8,J.vel[1]=o*(3+C()*2.5)+n.y*.8+.5,J.vel[2]=s*(3+C()*2.5)+n.z*.8,J.life=.7+C()*.5,J.size0=.3*a,J.size1=(1.2+C()*.6)*a,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(9405042,J.col0),q(7300956,J.col1),J.alpha=.4,J.grav=.3,J.birthOffset=0,x.emit(`dust`,J)}J.pos[0]=t.x+n.x*.08,J.pos[1]=t.y+n.y*.08,J.pos[2]=t.z+n.z*.08,J.vel[0]=0,J.vel[1]=0,J.vel[2]=0,J.life=.5,J.size0=.42*a,J.size1=.3*a,J.rot=C()*Math.PI*2,J.rotVel=0,q(16756816,J.col0),q(10629130,J.col1),J.alpha=.85,J.grav=0,J.birthOffset=0,x.emit(`fire`,J),$(t,n,22,26*a,.45,16765566,.55,.032*i,.03,0,.1),$(t,n,14,14*a,1.05,16758880,.75,.024*i,.022,0,.15),yn(t,n,5,1.1*a,3025962,5920852,.65);break;case`he_pen`:bn(t,n,a*1.3,16777215,16740376),Tn(t,r),$(t,n,22,18*a,1.1,16760928,.8,.035,.028);break;case`nonpen`:$(t,n,22,20*a,.9,16767108,.55,.025*i,.022),yn(t,n,4,.8*a,9078398,10986652,.45);break;case`ricochet`:tn(n,U,W);for(let e=0;e<8;e++){let e=C()*Math.PI*2,r=30+C()*25;Y.pos[0]=t.x,Y.pos[1]=t.y,Y.pos[2]=t.z,Y.vel[0]=(n.x*.35+U.x*Math.cos(e)+W.x*Math.sin(e))*r,Y.vel[1]=(n.y*.35+U.y*Math.cos(e)+W.y*Math.sin(e))*r,Y.vel[2]=(n.z*.35+U.z*Math.cos(e)+W.z*Math.sin(e))*r,Y.life=.28+C()*.25,Y.width=.03*i,Y.stretch=.05,Y.grav=-21.6,q(16769184,Y.col),Y.alpha=1,Y.seed=C(),Y.birthOffset=0,x.emit(`sparks`,Y)}$(t,n,8,12*a,1.1,16764800,.4,.02,.02);break;case`spaced_absorb`:bn(t,n,a*.7,16771504,16748608),$(t,n,10,12*a,1,16764538,.45,.022,.02),yn(t,n,3,.7*a,7828590,9670794,.4);break;case`era`:bn(t,n,a*1.4,16777215,16738832),$(t,n,26,24*a,.8,16762976,.6,.03,.026),yn(t,n,6,1.3*a,3486255,6315352,.7);for(let e=0;e<4;e++)X.pos[0]=t.x,X.pos[1]=t.y,X.pos[2]=t.z,X.vel[0]=n.x*(10+C()*8)+(C()-.5)*6,X.vel[1]=n.y*(10+C()*8)+4+C()*4,X.vel[2]=n.z*(10+C()*8)+(C()-.5)*6,X.life=1.8,X.scale=.12+C()*.08,X.spin=10+C()*15,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=Q(t.x,t.z),X.hot=!0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X);break;case`he_splash`:Tn(t,r),t.y-Q(t.x,t.z)<2.5&&(Cn(t)?wn(t,r,!0):Sn(t,r,!0));break;case`structure`:bn(t,n,a*.65,16772551,13998677),$(t,n,12,13*a,.85,16764803,.38,.022*i,.018),yn(t,n,5,.72*a,7827561,10656398,.5),tn(n,U,W);for(let e=0;e<6;e++){let e=C()*Math.PI*2,r=1.5+C()*3;X.pos[0]=t.x+n.x*.04,X.pos[1]=t.y+n.y*.04,X.pos[2]=t.z+n.z*.04,X.vel[0]=n.x*(3+C()*5)+(U.x*Math.cos(e)+W.x*Math.sin(e))*r,X.vel[1]=n.y*(3+C()*5)+(U.y*Math.cos(e)+W.y*Math.sin(e))*r+1.5,X.vel[2]=n.z*(3+C()*5)+(U.z*Math.cos(e)+W.z*Math.sin(e))*r,X.life=.75+C()*.45,X.scale=.045+C()*.055,X.spin=10+C()*18,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=Q(t.x,t.z),X.hot=!1,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)}break;case`terrain`:Cn(t)?wn(t,r,r>=105):Sn(t,r,r>=105);break;default:$(t,n,10,12*a,1,16767108,.5,.025,.022);break}},armorScar(e,t,n,r){!e||!e.root||y.stampDirect(e,t,n,r,`pen`)},impactDecalStats(){return y.stats()},clearVehicleDecals(e){y.clearVehicle(e)},destruction(e,t,n=`ammorack`){qn(e,t,0,n)},dust(e,t,n){if(n<=.02)return;let r=p?.getWaterMaskAt?.(e.x,e.z)??0;if(r>.02){wr(e,t,n,r);return}let i=p?.getTrackSurfaceAt?.(e.x,e.z)??0;n>.08&&!ce&&dt(e,t,!1,i);let a=p?.getGroundType?.(e.x,e.z)??`medium`,o=Tr(a);if(C()>n*.85*o)return;let s=Q(e.x,e.z);if(Ar(e),i!==0){ce||Pr(e,t,n,s,i);return}jr(a);let c=.6+C()*.8,l=.55+C()*.65;Mr(e,t,n,a,s),Nr(e,t,n,a,s,o,c,l),a!==`hard`&&n>.28&&Fr(e,t,n,s)},exhaust(e,t,n=!1){let r=on<2.2;if(r&&C()<.35)for(let t=0;t<3;t++)J.pos[0]=e.x+(C()-.5)*.15,J.pos[1]=e.y+.4+t*.24,J.pos[2]=e.z+(C()-.5)*.15,J.vel[0]=(C()-.5)*.5+V*.3,J.vel[1]=2+C()*1.1,J.vel[2]=(C()-.5)*.5+H*.3,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2.5,n?(J.life=1.5+C()*.7,J.size0=.22,J.size1=2.2+C()*.8,q(3025704,J.col0),q(6249560,J.col1),J.alpha=.46):(J.life=1+C()*.5,J.size0=.2,J.size1=1.7+C()*.6,q(9276294,J.col0),q(10131604,J.col1),J.alpha=.24),J.grav=.6,J.birthOffset=-t*.09-C()*.05,x.emit(`smoke`,J);C()>(r?.7:.3+t*.5)||(J.pos[0]=e.x,J.pos[1]=e.y+.25,J.pos[2]=e.z,J.vel[0]=(C()-.5)*.5+V*.4,J.vel[1]=1.4+C()*1.3+t*1.2,J.vel[2]=(C()-.5)*.5+H*.4,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,n?(J.life=1.1+C()*.9,J.size0=.26+t*.2,J.size1=1.4+t*1.2,q(3881013,J.col0),q(7236712,J.col1),J.alpha=.3+.22*t):(J.life=.7+C()*.6,J.size0=.22+t*.18,J.size1=1.1+t*.9,q(9276294,J.col0),q(10131604,J.col1),J.alpha=.14+.14*t),J.grav=.5,J.birthOffset=0,x.emit(`smoke`,J))},loosePropHit(e,t,n=.8){let r=Q(e.x,e.z);G.set(e.x,r+Math.min(.48,n*.45),e.z),$(G,$t,4,4.5,.45,16765600,.34,.018,.026,0,.08);for(let n=0;n<4;n++){let n=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*.28,J.pos[1]=r+.1+C()*.18,J.pos[2]=e.z+(C()-.5)*.28,J.vel[0]=Math.cos(n)*(.5+C())+t.x*.8,J.vel[1]=.35+C()*.6,J.vel[2]=Math.sin(n)*(.5+C())+t.z*.8,J.life=.55+C()*.35,J.size0=.16+C()*.1,J.size1=.7+C()*.35,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(9275260,J.col0),q(7433315,J.col1),J.alpha=.28+C()*.1,J.grav=-.4,J.birthOffset=0,x.emit(`dust`,J)}},propCrush(e,t,n=6){let r=Q(e.x,e.z);for(let n=0;n<10;n++){let n=C()*Math.PI*2;J.pos[0]=e.x+(C()-.5)*.5,J.pos[1]=r+.3+C()*.4,J.pos[2]=e.z+(C()-.5)*.5,J.vel[0]=Math.cos(n)*(1.6+C()*2.2)+t.x*2.5,J.vel[1]=1+C()*1.4,J.vel[2]=Math.sin(n)*(1.6+C()*2.2)+t.z*2.5,J.life=1.4+C()*1,J.size0=.5+C()*.3,J.size1=2.2+C()*1.2,J.rot=C()*Math.PI*2,J.rotVel=(C()-.5)*2,q(9077361,J.col0),q(7827296,J.col1),J.alpha=.42+C()*.15,J.grav=-.4,J.birthOffset=0,x.emit(`dust`,J)}for(let i=0;i<8;i++)X.pos[0]=e.x,X.pos[1]=r+.4+C()*Math.min(1.2,n*.2),X.pos[2]=e.z,X.vel[0]=t.x*(3+C()*4)+(C()-.5)*4,X.vel[1]=2.5+C()*4,X.vel[2]=t.z*(3+C()*4)+(C()-.5)*4,X.life=1.3,X.scale=.05+C()*.06,X.spin=12+C()*16,X.axis[0]=C()-.5,X.axis[1]=C()-.5,X.axis[2]=C()-.5,X.groundY=r,X.hot=0,X.seed=C(),X.birthOffset=0,x.emit(`debris`,X)},propBreak(e,t,n,r=1.2){let i=Q(t.x,t.z),a=Lr(e);if(a===`woodbuilding`||a===`canvasbuilding`||a===`metalbuilding`){Rr(a,t,n,r,i);return}if(a===`masonry`){zr(e,t,n,r,i);return}if(a===`sandbag`){Br(t,n,i);return}if(a===`vehicle`){Vr(t,n,r,i);return}if(a===`canvas`){Hr(t,n,i);return}if(a===`ammo`){Ur(t,n,i);return}if(a===`drumblast`){Wr(t,i);return}if(a===`hay`){Gr(t,n,r,i);return}if(a===`metal`){Kr(t,n,r,i);return}qr(a,t,n,r,i)},setFrozen(e,t=null){t!=null&&Ir(t),ce=e,x.setFrozen(e,t)},resetSeed(e){C=me(e)},resetAll(){E=!1,x.resetAll(),an=x.getTime(),on=0,we.length=0,Te.clear(),Ee.clear(),M.instanceCount=0,pr=0,P.count=0,Ce.count=0,Ne=0,Pe=0,_t.length=0,B.length=0,yt.clear(),bt.clear(),xt.clear();for(let e of Be)e.visible=!1;Ve=0,z.array.fill(-1e9),ot.array.fill(0),z.needsUpdate=!0,ot.needsUpdate=!0,lt.fill(1e9),ut=0;for(let e of L)e.bornAt=-1e9,e.mesh.visible=!1,e.mat.opacity=0;We=0;for(let e of Je)e.bornAt=-1e9,e.mesh.visible=!1,e.mat.opacity=0;Ye=0,y.clearAll(),ue();for(let e of O)e.bornAt=-1e9,e.light.intensity=0},composeFiringMoment({muzzlePos:e,dir:t,caliberMm:n,tracerType:r,ageS:i}){let a=Dt[r]||Dt.AP,o=Nt[r]||800;_n(e,t,n,-i,.55),r===`APFSDS`&&vn(e,t,-i);let s=Math.min(o*i,3.4),c=Math.min(T.clamp(o*.02,2,12),s-.55);U.copy(e).addScaledVector(t,s),W.copy(e).addScaledVector(t,Math.max(s-c,.3)),q(a.core,ft),q(a.glow,pt),we.push([W.x,W.y,W.z,U.x,U.y,U.z,a.width*1.05,.85,ft[0],ft[1],ft[2],pt[0],pt[1],pt[2],x.getTime()]),K.copy(e).addScaledVector(t,-.18),K.y+=.1,j(O[0],K,It,i)},composeExplosionMoment({pos:e,ageS:t}){window.__FX_SKIP_DESTRUCTION||qn(e,null,-t);let n=B[B.length-1];if(n){let e=Math.floor(t/Ht);for(let r=0;r<e;r++)Yn(n,-(t-(r+1)*Ht));n.ttl=Bt-t}j(O[1],K.set(e.x,e.y+3.8,e.z),zt,t)}};{let e=new r,t=new r;oe((n,r,i,a,o,s,c)=>{ce||(e.set(r,i,a),t.set(o,0,s),Jr.propBreak(n,e,t,c))})}return Jr}export{an as createFx,on as createFxChunked};