import React, {useEffect} from 'react'
import {throttle} from '../helpers'

import Arrow from '../images/svg/arrow_right.svg'

export default function LightBox(props) {
   useEffect(() => {
      console.log('adding');
      window.addEventListener('keydown', handlePress);
      
      return () => {
         console.log('removing');
         window.removeEventListener('keydown', handlePress)
      }
   });

   const handlePress = (event) => {
      if (event.key === "ArrowLeft") {
         swapImage(props.items.length, props.activeItem, -1)
      } else if (event.key === "ArrowRight") {
         swapImage(props.items.length, props.activeItem, 1)
      }
   }

   const swapImage = (numOfItems, currentIndex, direction) => {
      let nextIndex = currentIndex + direction;
      
      if (nextIndex < 0) {
         nextIndex = numOfItems-1;
      } else if (nextIndex > numOfItems-1) {
         nextIndex = 0;
      }
      props.setItem(nextIndex);
   }

   const swapImageKey = (event) => {
      console.log(event);
   }

   return (
      <div className={`lightBox ${props.activeItem ? 'visible' : ''}`} >
         <div className="lightBox__bg" onClick={() => props.setItem(false)}/>
         <img src={Arrow} className="arrow left" alt="left gallery arrow" onClick={() => swapImage(props.items.length, props.activeItem, -1)} onKeyPress={() => swapImageKey()} />
         <img src={props.items[props.activeItem].image} className={`${props.items[props.activeItem].imageOrientation}`} alt={props.items[props.activeItem].title} onClick={() => props.setItem(false)}/>
      <img src={Arrow} className="arrow right" alt="right gallery arrow" onClick={() => swapImage(props.items.length, props.activeItem, 1)} onKeyPress={() => swapImageKey()} />
      </div>
   )
}