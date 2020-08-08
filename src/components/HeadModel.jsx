import React, { Suspense, useRef, useState } from "react";
import {
   Canvas,
   useLoader,
   useFrame,
   useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { isMobile } from "react-device-detect";
import { getRandomNum } from "../helpers";

import MyHead from '../models/vahur_v2_beardTest5.glb'
import Glasses from '../models/vv_glasses.glb'
import { TextureLoader, Clock } from "three";

import EyeTexture from '../images/background/eye_texture5.png'

//DETECT IF USER IS ON IOS
function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export default function HeadModel(props) {
   const headRef = useRef(null);
   const eyeL = useRef();
   const eyeR = useRef();
   const originalOrientation = useRef();
   const rotationDirection = useRef([1, -1]);
   const [isPhone] = useState(isMobile);
   const [permissionGiven, setPermissionGiven] = useState(null);

   function Loading() {
      return (
         <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <pointLight position={[10, 10, 10]} />
            <meshStandardMaterial
               attach="material"
               color="#ffcd3e"
               transparent
               opacity={1}
               roughness={0.45}
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
      const { nodes } = useLoader(GLTFLoader, MyHead);
      const glasses = useLoader(GLTFLoader, Glasses);
      const eyeTexture = useLoader(TextureLoader, EyeTexture);
      let {newRotX, newRotY} = 0;
      
      let clock = new Clock();
      let delta = 0;
      // 30 fps
      let interval = 1 / 30;
   
      const glassesColor = '#752ceb'
      
      const { camera } = useThree();
      let headScale;
      
      if (window.innerWidth < 680) {
         headScale = 1.1;
      } else if (window.innerWidth < 1050) {
         headScale = 1;
      } else if (window.innerWidth < 1300) {
         headScale = window.innerWidth / 1200;
      } else {
         headScale = 1;
      }
      
      camera.position.set(0, 0, 4);

      useFrame((event) => {
         delta += clock.getDelta();

         if (delta  > interval) {
            // The draw or time dependent code are here
            if(!isPhone) {
               rotateHeadOnMouse(event);}
            else {
               rotateHeadAnim()
            }
            delta = delta % interval;
         }
      });

      

      const rotateHeadAnim = () => {
         let rotX = headRef.current.rotation.x;
         let rotY = headRef.current.rotation.y;

         console.log(rotX, rotationDirection)

         if ((rotationDirection.current[0] === 1 && rotX >= 0.2) || (rotationDirection.current[0] === -1 && rotX <= -0.2)) {
            console.log('suurem kui 0.25');
            rotationDirection.current[0] *= (-1);
         }
         
         if ((rotationDirection.current[1] === 1 && rotY >= 0.2) || (rotationDirection.current[1] === -1 && rotY <= -0.2)) {
            console.log('suurem kui 0.25');
            rotationDirection.current[1] *= (-1);
         }

         let xPlus = rotationDirection.current[0] * 0.01;
         let yPlus = rotationDirection.current[1] * 0.01;

         headRef.current.rotation.x += xPlus * 0.25;
         headRef.current.rotation.y += yPlus * 0.35;

         rotateEyes();
      }
   
      const rotateHeadOnMouse = (event) => {
         newRotY = event.mouse.x/5;
         newRotX = -event.mouse.y/5;
         
         if (newRotX < 0.25) {
            headRef.current.rotation.x = newRotX;
            headRef.current.rotation.y = newRotY;
            
            //ROTATE EYES

            rotateEyes();
         } else {
            // FORCE PAGE TO RELOAD WHEN MOUSE POSITION VALUE IS TOO LARGE (happens when page is refreshed while scrolled down)
            window.location.reload()
         }
      }

      const rotateEyes = () => {
         let headRotX = headRef.current.rotation.x
         let headRotY = headRef.current.rotation.y
         
         //ROTATE EYES
         eyeL.current.rotation.y = -1.55 + headRotY * 1.6;
         eyeL.current.rotation.x = -0.05 + headRotX * 1.6;
         eyeR.current.rotation.y = -1.53 + headRotY * 1.6;
         eyeR.current.rotation.x = -0.05 + headRotX * 1.6;
      }

      let headRotX = 0;
      let headRotY = 0;

      if (isPhone) {
         headRotX = getRandomNum(-25, 25) / 100;
         headRotY = getRandomNum(-25, 25) / 100;
      } 

      return (
         <group ref={headRef} position={[0, 0, 0]} scale={[headScale, headScale, headScale]} rotation={[headRotX, headRotY, 0]}>
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

   const grantPermission = (headRef) => {
      // feature detect
      if (isPhone && !permissionGiven) {
         //is iOS 13 or later
         if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
               if (permissionState === 'granted') {
                  window.addEventListener('deviceorientation', (event) => {
                     if (!originalOrientation.x) {
                        originalOrientation.z = event.alpha;
                        originalOrientation.x = event.beta;
                        originalOrientation.y = event.gamma;
                        console.log(originalOrientation);
                        console.log(event.alpha, event.beta, event.gamma);
                     }
                     handleOrientation(event, headRef)
                  });
                  setPermissionGiven(true);
               }
            })
            .catch(console.error);
         } else {
            //if not iphone
            window.addEventListener('deviceorientation', (event) => {
               if (!originalOrientation.x) {
                  originalOrientation.z = event.alpha;
                  originalOrientation.x = event.beta;
                  originalOrientation.y = event.gamma;
                  console.log(originalOrientation);
                  console.log(event.alpha, event.beta, event.gamma);
               }
               handleOrientation(event, headRef);
            });
         }
      }
   }

   
   const handleOrientation = (event, headRef) => {
      //let orientationZDelta =  event.alpha - originalOrientation.z;
      let orientationXDelta =  event.beta - originalOrientation.x;
      let orientationYDelta =  event.gamma - originalOrientation.y;

      //let newOrientationZ = convertToValueRange(orientationZDelta, 0, 360, -0.25, 0.25);
      let newOrientationX = convertToValueRange(orientationXDelta, -180, 180, -0.25, 0.25);
      let newOrientationY = convertToValueRange(orientationYDelta, -90, 90, -0.25, 0.25);
      
      let newRotX = newOrientationX*2;
      let newRotY = newOrientationY;

      //headRef.current.rotation.z = newOrientationZ;
      headRef.current.rotation.x = newRotX;
      headRef.current.rotation.y = newRotY

      //ROTATE EYES
      eyeL.current.rotation.y = -1.55 + newRotY * 1.6;
      eyeL.current.rotation.x = -0.05 + newRotX * 1.6;
      eyeR.current.rotation.y = -1.53 + newRotY * 1.6;
      eyeR.current.rotation.x = -0.05 + newRotX * 1.6;

      //console.log(originalOrientation);
      //let deltaX = originalOrientation[0] - orientationX;
      //console.log(deltaX);
   }

   const convertToValueRange = (oldValue, oldMin, oldMax, newMin, newMax) => {
      let oldRange = (oldMax - oldMin)  
      let newRange = (newMax - newMin)  
      let newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin
      return newValue;
   } 

   const handleTouch = event => {
      //iOS() && grantPermission(headRef);
   }

   return (
      <Canvas className="canvas3D" resize={{ scroll: false }} onClick={() => handleTouch()}>
         <directionalLight intensity={0.5} position={[0, 0, 10]}/>
         <Suspense fallback={<Loading />}>
            <pointLight position={[10, 10, 10]} />
            <Head />
         </Suspense>
      </Canvas>
   );
}