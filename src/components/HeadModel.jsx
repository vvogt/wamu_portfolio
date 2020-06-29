import React, { Suspense, useRef } from "react";
import {
   Canvas,
   useLoader,
   useFrame,
   extend,
   useThree, } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import MyHead from '../models/headModelNew.glb'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Controls = () => {
   const { camera, gl } = useThree();
   const orbitRef = useRef();

   useFrame( state => orbitRef.current.update() );

   console.log(camera);

   return (
      <orbitControls
         args={[ camera, gl.domElement ]}
         ref={orbitRef}
         autoRotate
         autoRotateSpeed="0.1"
         enableZoom={false}
         maxAzimuthAngle={Math.PI / 4}
         maxPolarAngle={Math.PI}
         minAzimuthAngle={-Math.PI / 4}
         minPolarAngle={0}
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
   camera.position.set(1, 0.5, 3);

   return (
      // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
      <group ref={group}>
         <mesh visible geometry={nodes.FaceBuilderHead.geometry}>
            <meshStandardMaterial
               attach="material"
               color="#fcba03"
               roughness={0.6}
               metalness={0}
            />
         </mesh>
      </group>
   );
}

export default function HeadModel() {
   return (
      <Canvas>
         {/* <ambientLight intensity={0.25}/> */}
         <Controls />
         <directionalLight intensity={0.5} position={[10, 500, 10]}/>
         <Suspense fallback={<Loading />}>
            <pointLight position={[10, 10, 10]} />
            <Head />
         </Suspense>
      </Canvas>
   );
}