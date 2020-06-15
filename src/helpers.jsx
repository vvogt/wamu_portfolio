import React from 'react';

export const insertBreak = text => {
   let lines = text.split("<br>");
   return (
      <span key={lines[0]}>
         {lines[0]} <br key={lines[0]} /> {lines[1]}
      </span>
   );
};

export function setBgImage(imageUrl, fixedOrScroll, orientation) {
   let imageWidth = orientation === 'vertical' ? '350px' : '100%';
   let imageHeight = orientation === 'vertical' ? '700px' : '400px';

   let bgImageStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: imageWidth,
      height: imageHeight,
      backgroundAttachment: fixedOrScroll
   };

   return bgImageStyle;
};