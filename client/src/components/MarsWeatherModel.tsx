// src/components/MarsGlobe.tsx
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

type MarsModelProps = ThreeElements['group'];

function MarsModel(props: MarsModelProps) {
  // console.log(props);
  const { scene: originalScene } = useGLTF('/Planet_Mars.glb');
  const clonedScene = originalScene.clone(true);
  clonedScene.scale.setScalar(0.06);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // console.log(groupRef.current);
    if (groupRef.current) groupRef.current.rotation.y += 0.001;
  });

  clonedScene.rotation.y = Math.PI;
  return (
    <group ref={groupRef} {...props} position={[-30, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}
useGLTF.preload('/Planet_Mars.glb');

export default function MarsGlobe() {
  return (
    <Canvas
      className='canvas'
      style={{ width: '550px', height: '1000px' }}
      camera={{ position: [0, 0, 80], fov: 45 }}
    >
      <color attach='background' args={['#000']} /> {/* black bg looks nicer */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <MarsModel />
      </Suspense>
      <OrbitControls enabled={false} />
    </Canvas>
  );
}
