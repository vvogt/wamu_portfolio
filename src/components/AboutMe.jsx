import React from 'react';

import Okul from '../images/background/okul.png';

export default function AboutMe() {
   return (
      <section className="about">
         <div className="about__left">
            <h2>Kes ma olen?</h2>
            <p>
               Olen 30-aastane värske arendaja, kellel on pea 9 aastat kogemust graafilise disainerina.
               Disainerina olen teinud suuremalt jaolt trükidisaini, brandingut ja illustratsioone.
            </p>
            <p>
               Veidi aega tagasi otsustasin võtta vastu uue väljakutse ja õppida lisaks ka veebiarendust.
               Praeguseks olengi kaks aastat õppinud ülikoolis informaatikat ning töötanud vabakutselise disainerina ja
               lisaks õpin vabal ajal omal käel tehnoloogiaid, milles näen tulevikupotensiaali.
               Tulevikus kavatsen oma elukutses ühendada nii front-end arenduse, kui ka UI / UX disaini.
            </p>
            <img className="owlImage" src={Okul} alt="A weird owl illustration"/>
         </div>
         <div className="about__right">
            <h2>Milles ma olen väga hea?</h2>
            <ul className="bestSkills">
               <li><a href="https://www.adobe.com/creativecloud.html" >Illustrator</a></li>
               <li><a href="https://www.adobe.com/creativecloud.html" >Photoshop</a></li>
               <li><a href="https://www.adobe.com/creativecloud.html" >InDesign</a></li>
               <li><a href="https://www.adobe.com/creativecloud.html" >Adobe XD</a></li>
            </ul>
            <h2>Mida ma oskan?</h2>
            <p>Arendan enda oskusi nendes tehnoloogiates pidevalt.</p>
            <ul className="interests">
               <li><a href="https://reactjs.org/">React</a></li>
               <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a></li>
               <li><a href="https://sass-lang.com/">SASS / SCSS</a></li>
               <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a></li>
               <li><a href="https://wordpress.com/">WordPress</a></li>
               <li><a href="https://jquery.com/">jQuery</a></li>
               <li><a href="https://www.php.net/">PHP</a></li>
               <li><a href="https://webpack.js.org/">webpack</a></li>
               <li><a href="https://www.adobe.com/creativecloud.html">AfterEffects</a></li>
               <li><a href="https://www.figma.com/">Figma</a></li>
               <li><a href="https://www.sketch.com/">Sketch</a></li>
            </ul>
            <h2>Mida ma mõne aja pärast oskan?</h2>
            <ul>
               <li><a href="https://vuejs.org/">Vue.js</a></li>
               <li><a href="https://threejs.org/">Three.js</a></li>
               <li><a href="https://phaser.io/">Phaser</a></li>
               <li><a href="https://godotengine.org/">Godot Engine</a></li>
            </ul>
         </div>
         <div className="bgHalf"/>
      </section>
   )
}