import React, {useEffect, useRef} from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Arrow from '../images/svg/arrow_right.svg'
import CloseIcon from '../images/svg/close_icon.svg'

export default function LightBox(props) {
   const lightBoxRef = useRef(null);

   useEffect(() => {
      window.addEventListener('keydown', handlePress);
      const currentLightBox = lightBoxRef.current;
      disableBodyScroll(currentLightBox);
      
      return () => {
         window.removeEventListener('keydown', handlePress);
         clearAllBodyScrollLocks();
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

   const renderImages = (item) => {
      //style={setBgImage(item.images[index], 'scroll', '250px')}
      return item.images.map((image, index) => {
         return <img src={item.images[index]} alt="" key={index}/>
      })
   }

   return (
      <div className={`lightBox ${props.activeItem ? 'visible' : ''} ${props.activeItem}`} ref={lightBoxRef}>
         <div className="lightBox__bg" onClick={() => props.setItem(false)}/>
         <img src={CloseIcon} className="closeBtn" alt="close" onClick={() => props.setItem(false)}/>
         <img src={Arrow} className="arrow left" alt="left gallery arrow" onClick={() => swapImage(props.items.length, props.activeItem, -1)} />
         <div className="lightBox__content">
            <div className="lightBox__content__text">
               <h2>{props.items[props.activeItem].title}</h2>
               {props.items[props.activeItem].year && <p className="year">{props.items[props.activeItem].year}</p>}
               <p className="description">{props.items[props.activeItem].description}</p>
            </div>
            <div className={`lightBox__content__images id${props.activeItem}`}>
               {renderImages(props.items[props.activeItem])}
            </div>
         </div>
         <img src={Arrow} className="arrow right" alt="right gallery arrow" onClick={() => swapImage(props.items.length, props.activeItem, 1)} />
      </div>
   )
}