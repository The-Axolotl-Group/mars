// src/components/MarsGlobe.tsx
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function MarsModel(props: ThreeElements['group']) {
  const { scene } = useGLTF('/Planet_Mars.glb');
  scene.scale.setScalar(0.045);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.001;
  });

  scene.rotation.y = Math.PI;
  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload('/Planet_Mars.glb');

export default function MarsGlobe() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 80], fov: 45 }}
    >
      <color attach='background' args={['#000']} /> {/* black bg looks nicer */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <MarsModel />
      </Suspense>
      <OrbitControls enableDamping />
    </Canvas>
  );
}
