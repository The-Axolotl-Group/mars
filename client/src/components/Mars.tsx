// src/components/MarsGlobe.tsx
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

type MarsModelProps = ThreeElements['group'] & {
  scrollTop: number;
};

function MarsModel({ scrollTop, ...props }: MarsModelProps) {
  // console.log(props);
  const { scene: originalScene } = useGLTF('/Planet_Mars.glb');
  const clonedScene = originalScene.clone(true);
  clonedScene.scale.setScalar(0.045 + scrollTop / 50000);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // console.log(groupRef.current);
    if (groupRef.current) groupRef.current.rotation.y += 0.001;
  });

  clonedScene.rotation.y = Math.PI;
  return (
    <group ref={groupRef} {...props}>
      <primitive object={clonedScene} />
    </group>
  );
}
useGLTF.preload('/Planet_Mars.glb');

export default function MarsGlobe({ scrollTop }: MarsModelProps) {
  return (
    <Canvas
      className='canvas'
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 80], fov: 45 }}
    >
      <color attach='background' args={['#000']} /> {/* black bg looks nicer */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <MarsModel scrollTop={scrollTop} />
      </Suspense>
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
}
