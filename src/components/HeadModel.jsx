import React, { Suspense, useRef } from "react";
import {
   Canvas,
   useLoader,
   useFrame,
   useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Throttle, throttle } from "../helpers"

import MyHead from '../models/vahur_v2_beardTest5.glb'
import Glasses from '../models/vv_glasses.glb'
import { TextureLoader, Clock } from "three";

import EyeTexture from '../images/background/eye_texture5.png'


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




export default function HeadModel() {
   const canvasRef = useRef(null);

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
      const eyeTexture = useLoader(TextureLoader, EyeTexture);
      let {newRotX, newRotY} = 0;
      
      let clock = new Clock();
      let delta = 0;
      // 30 fps
      let interval = 1 / 30;


   
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
   
      //const clock = new Clock();
      //clock.start();

      console.log(canvasRef);
   
/*       canvasRef.addEventListener('mouseMove', event => {
         console.log('liigub');
         rotateHead(event);
      }) */
   
      useFrame((event) => {
         delta += clock.getDelta();

         if (delta  > interval) {
            // The draw or time dependent code are here
            rotateHead(event);
            console.log('sec')
            delta = delta % interval;
         }
      });
   
      const rotateHead = (event) => {
         newRotY = event.mouse.x/5;
         newRotX = -event.mouse.y/5;
   
         //TO MAKE SURE THE ROTATION CAN NOT BE TOO HIGH
         if (newRotX > 0.2) {newRotX = 0.2}
         else if (newRotX < -0.2) {newRotX = -0.2}
         
         if (newRotY > 0.2) {newRotY = 0.2}
         else if (newRotY < -0.2) {newRotY = -0.2} 
   
         group.current.rotation.x = newRotX;
         group.current.rotation.y = newRotY;

         //ROTATE EYES
         eyeL.current.rotation.y = -1.55 + newRotY * 1.6;
         eyeL.current.rotation.x = -0.05 + newRotX * 1.6;
         eyeR.current.rotation.y = -1.53 + newRotY * 1.6;
         eyeR.current.rotation.x = -0.05 + newRotX * 1.6;

         /* if (group.current.rotation.x < -0.22|| group.current.rotation.x > 0.22 || group.current.rotation.y < -0.22 || group.current.rotation.y > 0.22 ) {
            alert('x: ' + group.current.rotation.x + ' y: ' + group.current.rotation.y);
         } */
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

   return (
      <Canvas className="canvas3D" resize={{ scroll: false }} >
         {console.log(canvasRef)}
         <directionalLight intensity={0.5} position={[0, 0, 10]}/>
         <Suspense fallback={<Loading />}>
            <pointLight position={[10, 10, 10]} />
            <Head />
         </Suspense>
      </Canvas>
   );
}