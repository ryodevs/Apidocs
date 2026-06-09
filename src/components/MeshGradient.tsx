import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uAccentColor;

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float noiseFreq = 0.003 + 0.002 * sin(uTime * 0.0005);
    float disturbance = snoise(vec2(pos.x * noiseFreq + uTime * 0.0002, pos.y * noiseFreq)) * 2.5;
    pos.z += disturbance;
    vec2 m = uMouse;
    m.x = (m.x / uResolution.x) * 2.0 - 1.0;
    m.y = -(m.y / uResolution.y) * 2.0 + 1.0;
    float dist = length(pos.xy - m * vec2(uResolution.x * 0.6, uResolution.y * 0.6));
    pos.z += exp(-dist * dist * 0.00008) * 50.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;

  void main() {
    vec3 color = uBaseColor;
    float flow = sin(vUv.y * 10.0 + uTime * 0.001 + vUv.x * 5.0) * 0.5 + 0.5;
    color = mix(color, uAccentColor, flow * 0.5);
    float highlight = sin(vUv.x * 20.0 - uTime * 0.002) * 0.5 + 0.5;
    color += vec3(1.0, 1.0, 1.0) * highlight * 0.15;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function MeshGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const w2 = w * 0.6;
    const h2 = h * 0.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    containerRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(70, w / h, 1, 1000);
    camera.position.z = 10;

    const scene = new THREE.Scene();
    const mouse = new THREE.Vector2(-10, -10);

    const geometry = new THREE.PlaneGeometry(w2, h2, 60, 60);
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: mouse },
        uResolution: { value: new THREE.Vector2(w, h) },
        uBaseColor: { value: new THREE.Color(0x14213d) },
        uAccentColor: { value: new THREE.Color(0xa0b6cd) },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let startTime = Date.now();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = Date.now() - startTime;
      renderer.render(scene, camera);
    }

    animate();

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      material.uniforms.uMouse.value = mouse;
    }

    function handleResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: '8px',
        pointerEvents: 'none',
      }}
    />
  );
}
