import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

const MODEL_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261115_071021_742152ba-5554-4270-9dc5-286bcff36a1a.glb';

const DOT_COUNT = 66000;
const CANDIDATES = 330000;
const VISOR_COUNT = 950 + 380 + 70 * 2 + 1500 + 70 * 2;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const COLORS = {
  night: new THREE.Color('#0f110d'),
  paper: new THREE.Color('#f0e5c8'),
  dots: new THREE.Color('#c9d4b8'),
  tech: new THREE.Color('#7fa8a3'),
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const key3 = (x, y, z, s) =>
  `${Math.floor(x / s)},${Math.floor(y / s)},${Math.floor(z / s)}`;

async function waitForPage() {
  while (!document.querySelector('.page .stage')) {
    await new Promise((r) => requestAnimationFrame(r));
  }
}

await waitForPage();

const page = document.querySelector('.page');
const stage = document.querySelector('.stage');
const loader = document.querySelector('.loader');
const counter = document.querySelector('.counter');
const label = document.querySelector('.label');
const ringDots = [...document.querySelectorAll('.ring circle')];

function setProgress(p) {
  const value = clamp(p, 0, 1);
  const pct = Math.round(value * 100);
  counter.textContent = String(pct).padStart(3, '0');
  loader.setAttribute('aria-valuenow', String(pct));
  for (let i = 0; i < ringDots.length; i++) {
    if (i / ringDots.length < value) ringDots[i].setAttribute('data-on', '');
    else ringDots[i].removeAttribute('data-on');
  }
}

async function download(onProgress) {
  const response = await fetch(MODEL_URL);
  if (!response.ok) throw new Error(`Model ${response.status}`);
  const total = Number(response.headers.get('content-length')) || 0;
  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    onProgress(total ? received / total : Math.min(0.95, received / (1.48 * 1024 * 1024)));
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return buffer.buffer;
}

function shuffled(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

function buildVisor(candidates) {
  const cell = 0.01;
  const heightMap = new Map();
  const put = (x, y, z) => {
    const k = `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
    const old = heightMap.get(k);
    if (old === undefined || z > old) heightMap.set(k, z);
  };
  for (const c of candidates) {
    if (c.nz < 0.2) continue;
    if (c.x < -0.32 || c.x > 0.32 || c.y < 0.2 || c.y > 0.45) continue;
    put(c.x, c.y, c.z);
  }
  const faceAt = (x, y) => {
    const ix = Math.floor(x / cell);
    const iy = Math.floor(y / cell);
    let best = -Infinity;
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        const v = heightMap.get(`${ix + a},${iy + b}`);
        if (v !== undefined && v > best) best = v;
      }
    }
    return best === -Infinity ? 0 : best;
  };

  const W = 0.215;
  const clearance = 0.028;
  const top = (x) => 0.378 - 0.022 * (x / W) ** 2;
  const lower = (x) =>
    0.282 + 0.032 * Math.exp(-((x / 0.034) ** 2)) + 0.026 * (x / W) ** 4;

  let front = -Infinity;
  for (let x = -0.06; x <= 0.06; x += 0.01) {
    for (let y = 0.3; y <= 0.36; y += 0.01) front = Math.max(front, faceAt(x, y));
  }
  front = (front === -Infinity ? 0.25 : front) + clearance;

  let wrap = Infinity;
  for (let x = -W; x <= W; x += 0.01) {
    if (Math.abs(x) < 0.05) continue;
    let need = -Infinity;
    for (let y = lower(x); y <= top(x); y += 0.01) need = Math.max(need, faceAt(x, y));
    if (need === -Infinity) continue;
    const w = (front - need - 0.7 * clearance) / (x * x);
    if (w < wrap) wrap = w;
  }
  if (!Number.isFinite(wrap)) wrap = 2.4;

  const dots = [];
  const jitter = () => (Math.random() - 0.5) * 0.002;
  const add = (x, y, z, kind) => {
    const nx = 2 * wrap * x;
    const len = Math.hypot(nx, 0, 1);
    dots.push({
      x: x + jitter(),
      y: y + jitter(),
      z: z + jitter(),
      nx: nx / len,
      ny: 0,
      nz: 1 / len,
      kind,
    });
  };
  const depth = (x) => front - wrap * x * x;

  for (let i = 0; i < 950; i++) {
    const x = -W + Math.random() * 2 * W;
    const drop = Math.pow(Math.random(), 2) * 0.016;
    add(x, top(x) - drop, depth(x) + 0.004, 3);
  }
  for (let i = 0; i < 380; i++) {
    const x = -W + Math.random() * 2 * W;
    add(x, lower(x), depth(x) + 0.002, 3);
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 70; i++) {
      const x = side * W;
      const y = lower(x) + (top(x) - lower(x)) * Math.random();
      add(x, y, depth(x), 3);
    }
  }
  for (let i = 0; i < 1500; i++) {
    const x = -W + Math.random() * 2 * W;
    const y = lower(x) + (top(x) - lower(x)) * Math.random();
    add(x, y, depth(x), 4);
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 70; i++) {
      const u = Math.random();
      const x = side * (W + 0.03 * u);
      const y = top(side * W) - 0.008;
      const z = depth(side * W) - 0.15 * u;
      add(x, y, z, 3);
    }
  }
  return dots;
}

function computeShades(finalDots, candidates) {
  const R = 0.03;
  const half = candidates.slice(0, candidates.length >> 1);
  const grid = new Map();
  for (const c of half) {
    const k = key3(c.x, c.y, c.z, R);
    let a = grid.get(k);
    if (!a) grid.set(k, (a = []));
    a.push(c);
  }

  const ridges = new Float32Array(finalDots.length);
  const thins = new Float32Array(finalDots.length);
  const counts = new Uint32Array(finalDots.length);

  for (let d = 0; d < finalDots.length; d++) {
    const p = finalDots[d];
    const gx = Math.floor(p.x / R);
    const gy = Math.floor(p.y / R);
    const gz = Math.floor(p.z / R);
    let count = 0;
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        for (let c = -1; c <= 1; c++) {
          const bucket = grid.get(`${gx + a},${gy + b},${gz + c}`);
          if (!bucket) continue;
          for (const q of bucket) {
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const dz = q.z - p.z;
            if (dx * dx + dy * dy + dz * dz > R * R) continue;
            count++;
            sx += dx;
            sy += dy;
            sz += dz;
          }
        }
      }
    }
    counts[d] = count;
    if (count) {
      const along = (sx * p.nx + sy * p.ny + sz * p.nz) / count;
      ridges[d] = -along / R;
    }
  }

  const sortedCounts = Array.from(counts).sort((a, b) => a - b);
  const median = sortedCounts[(sortedCounts.length / 2) | 0] || 1;
  const absRidges = Array.from(ridges, Math.abs).sort((a, b) => a - b);
  const p90 = absRidges[(absRidges.length * 0.9) | 0] || 1;

  const shades = new Float32Array(finalDots.length * 2);
  for (let d = 0; d < finalDots.length; d++) {
    shades[d * 2] = clamp(ridges[d] / p90, -1, 1);
    shades[d * 2 + 1] = clamp(1 - counts[d] / (0.55 * median), 0, 1);
  }
  return shades;
}

function buildGeometry(buffer) {
  const loader = new GLTFLoader();
  // GLTFLoader.parse is callback based; wrap it.
  const parsed = new Promise((resolve, reject) => loader.parse(buffer, '', resolve, reject));

  return parsed.then((sceneData) => {
    const root = sceneData.scene;
    root.updateMatrixWorld(true);
    let mesh = null;
    root.traverse((o) => {
      if (!mesh && o.isMesh) mesh = o;
    });
    if (!mesh) throw new Error('No mesh in model');

    const geometry = mesh.geometry.clone();
    geometry.applyMatrix4(mesh.matrixWorld);
    if (!geometry.attributes.normal) geometry.computeVertexNormals();

    const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).build();
    const candidates = new Array(CANDIDATES);
    const p = new THREE.Vector3();
    const n = new THREE.Vector3();
    for (let i = 0; i < CANDIDATES; i++) {
      sampler.sample(p, n);
      candidates[i] = { x: p.x, y: p.y, z: p.z, nx: n.x, ny: n.y, nz: n.z, part: 1 };
    }

    const leaves = [];
    for (const c of candidates) {
      if (
        c.x > 0.13 &&
        c.y > 0.6 &&
        (c.x - 0.02) ** 2 + (c.z + 0.06) ** 2 > 0.035
      ) {
        c.part = 2;
        leaves.push(c);
      }
    }
    const leafKeep = leaves.slice(0, Math.floor(leaves.length * 0.6));

    const visor = buildVisor(candidates);
    const bustNeeded = Math.max(0, DOT_COUNT - leafKeep.length - visor.length);

    const cell = 0.022;
    const grid = new Map();
    for (const c of candidates) {
      if (c.part === 2) continue;
      const k = key3(c.x, c.y, c.z, cell);
      let a = grid.get(k);
      if (!a) grid.set(k, (a = []));
      a.push(c);
    }
    const counts = [...grid.values()].map((a) => a.length);
    let lo = 1;
    let hi = Math.max(1, ...counts);
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      let sum = 0;
      for (const c of counts) sum += Math.min(c, mid);
      if (sum >= bustNeeded * 1.8) hi = mid;
      else lo = mid + 1;
    }
    const cap = lo;
    const pool = [];
    for (const bucket of grid.values()) {
      for (let i = 0; i < Math.min(bucket.length, cap); i++) pool.push(bucket[i]);
    }
    shuffled(pool);
    const bustDots = pool.slice(0, bustNeeded);

    const finalDots = [];
    for (const c of bustDots) finalDots.push({ ...c, kind: 1 });
    for (const c of leafKeep) finalDots.push({ ...c, kind: 2 });
    for (const c of visor) finalDots.push({ ...c, kind: c.kind });

    const shades = computeShades(finalDots, candidates);

    const positions = new Float32Array(DOT_COUNT * 3);
    const normals = new Float32Array(DOT_COUNT * 3);
    const rands = new Float32Array(DOT_COUNT);
    const kinds = new Float32Array(DOT_COUNT);
    let minX = Infinity;
    let maxX = -Infinity;

    for (let i = 0; i < finalDots.length && i < DOT_COUNT; i++) {
      const c = finalDots[i];
      const x = c.x * 2.8;
      const y = c.y * 2.8 - 0.68;
      const z = c.z * 2.8;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      normals[i * 3] = c.nx;
      normals[i * 3 + 1] = c.ny;
      normals[i * 3 + 2] = c.nz;
      rands[i] = Math.random();
      kinds[i] = c.kind;
      if (c.kind > 1) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }

    return {
      positions,
      normals,
      shades,
      rands,
      kinds,
      count: Math.min(finalDots.length, DOT_COUNT),
      minX: Number.isFinite(minX) ? minX : -1,
      maxX: Number.isFinite(maxX) ? maxX : 1,
    };
  });
}

const bustVertex = `
  attribute float aRand;
  attribute float aKind;
  attribute vec2 aShade;
  uniform float uTime;
  uniform float uAssemble;
  uniform float uSize;
  uniform float uGlint;
  uniform float uShine;
  uniform vec2 uHead;
  uniform vec3 uLight;
  uniform vec2 uRingCenter;
  uniform float uRingRadius;
  varying float vB;
  varying float vAlpha;
  varying float vShine;
  varying float vGlint;
  varying float vKind;

  mat3 rotateX(float a){ float s=sin(a), c=cos(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
  mat3 rotateY(float a){ float s=sin(a), c=cos(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }

  void main(){
    vec3 p = position;
    vec3 n = normalize(normal);
    float head = smoothstep(-1.3, -0.6, p.y);
    mat3 rot = rotateX(uHead.y * head) * rotateY(uHead.x * (0.25 + 0.75 * head));
    vec3 pivot = vec3(0., -1., 0.);
    vec3 turned = pivot + rot * (p - pivot);
    n = normalize(rot * n);
    p = turned;

    p += n * sin(uTime * 1.4 + aRand * 60.) * 0.006;

    float r2 = fract(sin(aRand * 91.7) * 43758.5453);
    float t = clamp((uAssemble - aRand * 0.45) / 0.55, 0., 1.);
    float e = t < 0.5 ? 4.*t*t*t : 1. - pow(-2.*t + 2., 3.) / 2.;
    float ang = aRand * 6.2831853;
    float rr = uRingRadius * (1. + (r2 - 0.5) * 0.06);
    vec3 start = vec3(uRingCenter.x + rr * cos(ang), uRingCenter.y + rr * sin(ang), 0.);
    p = mix(start, p, e);
    p += vec3(sin(aRand * 40. + uTime * 0.3), cos(aRand * 31.), 0.9 + r2 * 1.4) * sin(e * 3.14159265) * 0.45;

    vec3 toLight = uLight - p;
    float d = length(toLight);
    float lit = max(dot(n, toLight / max(d, 0.001)), 0.) / (1. + d * d * 0.32);
    float key = max(dot(n, normalize(vec3(-0.5, 0.6, 0.7))), 0.);
    vec3 nv = normalize((modelViewMatrix * vec4(n, 0.)).xyz);
    float facing = nv.z;
    float rim = pow(1. - abs(facing), 3.);

    float b = 0.3 + key * 0.22 + lit * 1.5 + rim * 0.14;
    b *= mix(0.55, 1., smoothstep(-0.3, 0.25, facing));
    b *= aShade.x > 0. ? 1. + aShade.x * 0.7 : 1. + aShade.x * 0.5;
    b += aShade.y * (0.26 + key * 0.3);

    if (aKind > 1.5) b *= 0.9;
    if (aKind > 2.5) {
      b *= 0.78;
      if (aKind > 3.5) b *= 0.7;
    }
    b *= 0.7 + r2 * 0.5;

    float glint = 0.;
    if (aKind > 1.5) {
      glint = smoothstep(0.09, 0., abs(turned.x - uGlint));
      b += glint * 1.2;
    }
    float band = turned.y - turned.x * 0.5 - uShine;
    float shine = exp(-band * band * 4.);
    b += shine * 1.3;

    vB = b;
    vAlpha = mix(0.75, 1., e);
    vShine = shine;
    vGlint = glint;
    vKind = aKind;

    vec4 mv = modelViewMatrix * vec4(p, 1.);
    float depth = max(0.1, -mv.z);
    gl_PointSize = uSize * (0.45 + r2 * r2 * 1.3) * (1. + shine * 0.6) / depth;
    gl_Position = projectionMatrix * mv;
  }
`;

const bustFragment = `
  precision highp float;
  uniform vec3 uInk;
  uniform vec3 uBlue;
  uniform vec3 uCream;
  varying float vB;
  varying float vAlpha;
  varying float vShine;
  varying float vGlint;
  varying float vKind;

  void main(){
    vec2 q = gl_PointCoord - 0.5;
    float r = length(q);
    if (r > 0.5) discard;
    float alpha = exp(-16. * r * r) * vAlpha;
    vec3 ink = mix(uInk, uCream, clamp(vShine * 0.6, 0., 1.));
    if (vKind > 3.5) ink = mix(ink, uBlue, 0.6);
    ink = mix(ink, uBlue, vGlint * 0.7);
    gl_FragColor = vec4(ink * vB, alpha);
  }
`;

const lightVertex = `
  uniform vec3 uLight;
  uniform float uOn;
  uniform float uDpr;
  void main(){
    vec4 mv = viewMatrix * vec4(uLight, 1.);
    float depth = max(0.1, -mv.z);
    gl_PointSize = 240. * uDpr * uOn / depth;
    gl_Position = projectionMatrix * mv;
  }
`;

const lightFragment = `
  precision highp float;
  uniform float uOn;
  void main(){
    vec2 q = gl_PointCoord - 0.5;
    float r = length(q) * 2.;
    if (r > 1.) discard;
    float a = smoothstep(0.14, 0.08, r) + exp(-4. * r) * 0.45 + exp(-12. * r) * 0.7;
    gl_FragColor = vec4(vec3(1.), clamp(a * uOn, 0., 1.));
  }
`;

const dustVertex = `
  attribute float aRand;
  uniform float uTime;
  uniform float uOn;
  uniform float uDpr;
  varying float vAlpha;
  void main(){
    float y = mod(position.y + uTime * (0.03 + aRand * 0.05) + 6., 12.) - 6.;
    float x = position.x + sin(uTime * 0.2 + aRand * 40.) * 0.15;
    vec4 mv = modelViewMatrix * vec4(x, y, position.z, 1.);
    float depth = max(0.1, -mv.z);
    gl_PointSize = 22. * uDpr * (0.5 + aRand) * uOn / depth;
    vAlpha = (0.1 + aRand * 0.18) * uOn;
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFragment = `
  precision highp float;
  uniform vec3 uInk;
  varying float vAlpha;
  void main(){
    vec2 q = gl_PointCoord - 0.5;
    float r = length(q) * 2.;
    if (r > 1.) discard;
    float falloff = exp(-16. * r * r * 0.25);
    gl_FragColor = vec4(uInk * vAlpha * falloff, vAlpha * falloff);
  }
`;

function startEngine(data) {
  window.__dotCount = data.count;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(COLORS.night, 1);
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  const target = new THREE.Vector3(0, -0.15, 0);

  const uniforms = {
    uTime: { value: 0 },
    uAssemble: { value: REDUCED ? 1 : 0 },
    uSize: { value: 26 * dpr },
    uGlint: { value: -9 },
    uShine: { value: 99 },
    uHead: { value: new THREE.Vector2(0, 0) },
    uLight: { value: new THREE.Vector3(-1.4, 1.2, 1.6) },
    uRingCenter: { value: new THREE.Vector2(0, -0.15) },
    uRingRadius: { value: 1 },
    uInk: { value: COLORS.dots.clone() },
    uBlue: { value: COLORS.tech.clone() },
    uCream: { value: COLORS.paper.clone() },
    uOn: { value: REDUCED ? 1 : 0 },
    uDpr: { value: dpr },
  };

  const bustGeo = new THREE.BufferGeometry();
  bustGeo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
  bustGeo.setAttribute('normal', new THREE.BufferAttribute(data.normals, 3));
  bustGeo.setAttribute('aShade', new THREE.BufferAttribute(data.shades, 2));
  bustGeo.setAttribute('aRand', new THREE.BufferAttribute(data.rands, 1));
  bustGeo.setAttribute('aKind', new THREE.BufferAttribute(data.kinds, 1));
  const bust = new THREE.Points(
    bustGeo,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: bustVertex,
      fragmentShader: bustFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  bust.frustumCulled = false;
  scene.add(bust);

  const lightGeo = new THREE.BufferGeometry();
  lightGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
  const light = new THREE.Points(
    lightGeo,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: lightVertex,
      fragmentShader: lightFragment,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
  );
  light.frustumCulled = false;
  scene.add(light);

  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(900 * 3);
  const dustRand = new Float32Array(900);
  for (let i = 0; i < 900; i++) {
    dustPos[i * 3] = (Math.random() * 2 - 1) * 9;
    dustPos[i * 3 + 1] = (Math.random() * 2 - 1) * 6;
    dustPos[i * 3 + 2] = -6 + Math.random() * 8;
    dustRand[i] = Math.random();
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('aRand', new THREE.BufferAttribute(dustRand, 1));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  dust.frustumCulled = false;
  scene.add(dust);

  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2.6);
  const ndc = new THREE.Vector2(0, 0);
  const pointerTarget = new THREE.Vector3(1.9, 0.5, 2.6);
  const lightPos = new THREE.Vector3(-1.4, 1.2, 1.6);
  const headNow = new THREE.Vector2(0, 0);
  const headTarget = new THREE.Vector2(0, 0);
  let lastPointer = -Infinity;
  let pointerLeft = true;
  let lightOn = REDUCED ? 1 : 0;
  let dustOn = REDUCED ? 1 : 0;
  let phaseReady = REDUCED;
  if (REDUCED) page.setAttribute('data-phase', 'ready');
  let t = 0;
  let last = performance.now();

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const aspect = w / h;
    camera.aspect = aspect;
    const tan15 = Math.tan((15 * Math.PI) / 180);
    const distance = Math.max(2.35 / tan15, 1.7 / (tan15 * aspect));
    camera.position.set(0, -0.15, distance);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    const worldPerPixel = (2 * distance * tan15) / h;
    uniforms.uRingRadius.value = 92 * worldPerPixel;
    renderer.setSize(w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  function onPointer(x, y) {
    ndc.set((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) pointerTarget.copy(hit);
    headTarget.set(ndc.x * 0.5, ndc.y * 0.18);
    lastPointer = performance.now();
    pointerLeft = false;
  }
  window.addEventListener('pointermove', (e) => onPointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerdown', (e) => onPointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointerleave', () => {
    pointerLeft = true;
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) onPointer(e.touches[0].clientX, e.touches[0].clientY);
    lastPointer = performance.now();
    setTimeout(() => {
      if (performance.now() - lastPointer >= 1500) pointerLeft = true;
    }, 1600);
  }, { passive: true });

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!REDUCED) t += dt;
    const ease = (rate) => (REDUCED ? 1 : 1 - Math.exp(-dt * rate));

    uniforms.uTime.value = REDUCED ? 0 : t;
    uniforms.uAssemble.value = REDUCED ? 1 : Math.min(1, t / 2.6);

    if (!phaseReady && uniforms.uAssemble.value > 0.55) {
      phaseReady = true;
      page.setAttribute('data-phase', 'ready');
    }

    if (!REDUCED && t >= 2.34 && t <= 4.54) {
      const s = (t - 2.34) / 2.2;
      uniforms.uShine.value = 2.8 - (1 - (1 - s) ** 2) * 7.4;
    } else {
      uniforms.uShine.value = 99;
    }

    if (!REDUCED && t >= 4.6) {
      const cycle = (t - 4.6) % 4.2;
      if (cycle < 0.9) {
        const from = data.minX - 0.15;
        const to = data.maxX + 0.15;
        uniforms.uGlint.value = from + (cycle / 0.9) * (to - from);
      } else {
        uniforms.uGlint.value = -9;
      }
    }

    const idle = REDUCED || pointerLeft || now - lastPointer > 1500;
    if (idle && !REDUCED) {
      pointerTarget.set(1.9 * Math.sin(0.45 * t), 0.5 + 0.8 * Math.cos(0.33 * t), 2.6);
      headTarget.set(0.35 * Math.sin(0.45 * t), 0.12 * Math.cos(0.33 * t));
    }
    lightPos.lerp(pointerTarget, ease(5));
    headNow.lerp(headTarget, ease(idle ? 1.5 : 3));
    uniforms.uLight.value.copy(lightPos);
    uniforms.uHead.value.set(headNow.x, -headNow.y);

    const lightGoal = Math.min(1, 1.6 * uniforms.uAssemble.value);
    lightOn += (lightGoal - lightOn) * (REDUCED ? 1 : 1 - Math.exp(-dt * 4));
    dustOn += (1 - dustOn) * (REDUCED ? 1 : 1 - Math.exp(-dt * 0.8));
    uniforms.uOn.value = lightOn;

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
}

(async () => {
  try {
    const buffer = await download(setProgress);
    const data = await buildGeometry(buffer);
    setProgress(1);
    if (!REDUCED) await new Promise((r) => setTimeout(r, 380));
    startEngine(data);
  } catch (error) {
    console.error(error);
    counter.textContent = 'Could not load';
    label.textContent = 'Refresh to try again';
  }
})();
