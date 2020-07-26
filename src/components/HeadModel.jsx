import React, { Suspense, useRef } from "react";
import {
   Canvas,
   useLoader,
   useFrame,
   extend,
   useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Throttle, throttle } from "../helpers"

import MyHead from '../models/vahur_v2_beardTest5.glb'
import Glasses from '../models/vv_glasses.glb'
import { Object3D, Clock, TextureLoader } from "three";
import Effects from './Effects'

import EyeTexture from '../images/background/eye_texture5.png'
import Environment from '../images/background/Free-Panorama-in-Park.jpg'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const Controls = () => {
   const { camera, gl } = useThree();
   const orbitRef = useRef();

   useFrame( state => orbitRef.current.update() );

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

function degToEuler(array) {
   let newArray = [];
   for (let i = 0; i < 3; i++) {
      newArray.push(array[i] * Math.PI / 180);
   }
   return newArray
}

function Head() {
   const group = useRef();
   const eyeL = useRef();
   const eyeR = useRef();
   const { nodes } = useLoader(GLTFLoader, MyHead);
   const glasses = useLoader(GLTFLoader, Glasses);
   const eyeTexture = useLoader(TextureLoader, EyeTexture)
   const environment = useLoader(TextureLoader, Environment)

   const glassesColor = '#752ceb'

   console.log(6000 / window.innerWidth);

   let cameraDistance;

   if (window.innerWidth < 950) {
      cameraDistance = 4;
   } else if (window.innerWidth < 1300) {
      cameraDistance = 6000 / window.innerWidth;
   } else {
      cameraDistance = 4;
   }

   const { camera } = useThree();
   camera.position.set(0, 0, cameraDistance);

   console.log(nodes);

   //const clock = new Clock();
   //clock.start();

   useFrame((event) => {
      rotateHead(event);
   });

   const scaleOnResize = () => {
      
   }
   
   const rotateHead = (event) => {
      group.current.rotation.y = event.mouse.x/5;
      group.current.rotation.x = -event.mouse.y/5;
      console.log("x: " + group.current.rotation.x + " y: " + group.current.rotation.y);


      eyeL.current.rotation.y = -1.55 + event.mouse.x/3.5;
      eyeL.current.rotation.x = -0.05 + -event.mouse.y/3.5;
      eyeR.current.rotation.y = -1.53 + event.mouse.x/3.5;
      eyeR.current.rotation.x = -0.05 -event.mouse.y/3.5;
   }

   return (
      // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
      <group ref={group}>
         {/* HEAD */}
         <mesh visible position={[0, 0, 0]} geometry={nodes.FaceBuilderHead.geometry}>
            <meshStandardMaterial
               attach="material"
               color="#fcba03"
               roughness={0.45}
               metalness={0}
               transparent
               opacity={1}
            />
         </mesh>
         {/* GLASS FRAMES */}
         <mesh visible position={[-0.63, 0.47, 1.15]} rotation={[1.6, 0, 0]} geometry={glasses.nodes.Curve.geometry} scale={[4.4, 4.4, 4.4]}>
            <meshStandardMaterial
               attach="material"
               color={glassesColor}
               roughness={0.4}
               metalness={0.1}
            />
         </mesh>
         {/* GlASSES */}
         <mesh visible position={[0.06, 0.447, 1.14]} rotation={degToEuler([90, 0, 0])} geometry={glasses.nodes.Curve003.geometry} scale={[4.4, 4.4, 4.4]}>
            <meshStandardMaterial
               attach="material"
               color="white"
               roughness={0}
               metalness={1}
               transparent
               opacity={0.1}
            />
         </mesh>
         <mesh visible position={[-0.06, 0.446, 1.14]} rotation={[270 * Math.PI / 180, 180 * Math.PI / 180, 0 * Math.PI / 180]} geometry={glasses.nodes.Curve003.geometry} scale={[4.4, 4.4, 4.4]}>
            <meshStandardMaterial
               attach="material"
               color="#d4e4ff"
               roughness={0}
               metalness={1}
               transparent
               opacity={0.1}
            />
         </mesh>
         {/* LEFT HANDLE */}
         <mesh visible position={[-0.6, 0.32, 1.1]} rotation={[95 * Math.PI / 180, -5 * Math.PI / 180, -100 * Math.PI / 180]} geometry={glasses.nodes.Curve001.geometry} scale={[4.4, 4.4, 4.4]}>
            <meshStandardMaterial
               attach="material"
               color={glassesColor}
               roughness={0.4}
               metalness={0.1}
            />
         </mesh>
         {/* RIGHT HANDLE */}
         <mesh visible position={[0.64, 0.32, 1.1]} rotation={[95 * Math.PI / 180, -5 * Math.PI / 180, -82 * Math.PI / 180]} geometry={glasses.nodes.Curve001.geometry} scale={[4.4, 4.4, 4.4]}>
            <meshStandardMaterial
               attach="material"
               color={glassesColor}
               roughness={0.4}
               metalness={0.1}
            />
         </mesh>
         <mesh ref={eyeL} visible position={[0.3, .33, 0.76]} rotation={[0, -1.55, 0.1]}>
            <sphereGeometry attach="geometry" args={[0.15, 16, 16]} />
            <meshPhongMaterial 
               attach="material"
               map={eyeTexture}
            />
         </mesh>
         <mesh ref={eyeR} visible position={[-0.3, .33, 0.76]} rotation={[0, -1.52, 0.05]}>
            <sphereGeometry attach="geometry" args={[0.15, 16, 16]} />
            <meshPhongMaterial
               attach="material" 
               map={eyeTexture}
               />
         </mesh>
      </group>
   );
}

export default function HeadModel() {
   return (
      <Canvas className="canvas3D" resize={{ scroll: false }}>
         {/* <ambientLight intensity={0.25}/> */}
         <directionalLight intensity={0.5} position={[0, 0, 10]}/>
         {/* <pointLight position={[150, 150, 150]} intensity={0.55} /> */}
         <Suspense fallback={<Loading />}>
            <pointLight position={[10, 10, 10]} />
            <Head/>
         </Suspense>
      </Canvas>
   );
}