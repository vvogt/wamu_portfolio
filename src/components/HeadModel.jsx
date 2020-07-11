import React, { Suspense, useRef } from "react";
import {
   Canvas,
   useLoader,
   useFrame,
   extend,
   useThree, } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import MyHead from '../models/head_v2.glb'
import { Object3D } from "three";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Controls = () => {
   const { camera, gl } = useThree();
   const orbitRef = useRef();

   useFrame( state => orbitRef.current.update() );

   console.log(gl.domElement);

   return (
      <orbitControls
         args={[ camera, gl.domElement ]}
         ref={orbitRef}
         autoRotate
         autoRotateSpeed="0.2"
         enableZoom={false}
         maxAzimuthAngle={0.5}
         maxPolarAngle={1.5}
         minAzimuthAngle={-0.5}
         minPolarAngle={1.2}
         enableKeys={false}
         enablePan={false}
         enableDamp
      />
   )
}

function Loading() {
   return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
         <sphereGeometry attach="geometry" args={[1, 16, 16]} />
         <meshStandardMaterial
            attach="material"
            color="white"
            transparent
            opacity={0.6}
            roughness={1}
            metalness={0}
         />
      </mesh>
   );
}

function Head() {
   const group = useRef();
   const { nodes } = useLoader(GLTFLoader, MyHead);
   // useFrame will run outside of react in animation frames to optimize updates.
   /* useFrame(() => {
      group.current.rotation.y += 0.02;
   }); */

   const { camera } = useThree();
   camera.position.set(0, 0, 4);

   useFrame((event) => {
      group.current.rotation.y = event.mouse.x/5;
      group.current.rotation.x = -event.mouse.y/5;
   });

   return (
      // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
      <group ref={group}>
         <mesh visible position={[0, 0, 0]} geometry={nodes.FaceBuilderHead.geometry}>
            <meshStandardMaterial
               attach="material"
               color="#fcba03"
               roughness={0.45}
               metalness={0}
            />
         </mesh>
         <mesh visible position={[0.3, .33, 0.76]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[0.15, 16, 16]} />
            <meshStandardMaterial
               attach="material"
               color="white"
               roughness={0}
               metalness={0.2}
            />
         </mesh>
         <mesh visible position={[-0.3, .33, 0.76]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[0.15, 16, 16]} />
            <meshStandardMaterial
               attach="material"
               color="white"
               roughness={0}
               metalness={0.2}
            />
         </mesh>
      </group>
   );
}

const updatePosition = () => {
   console.log('update')
}

export default function HeadModel() {
   return (
      <Canvas className="3DCanvas">
         {/* <ambientLight intensity={0.25}/> */}
         {/* <Controls /> */}
         <directionalLight intensity={0.5} position={[0, 0, 10]}/>
         <Suspense fallback={<Loading />}>
            <pointLight position={[10, 10, 10]} />
            <Head onMouseMove={updatePosition} />
         </Suspense>
      </Canvas>
   );
}