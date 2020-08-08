import React from 'react';
import HeadModel from './HeadModel';
import CV from './CV';

import Stars from '../images/svg/stars.svg';
import Stars2 from '../images/svg/stars_bigger.svg';

class Hero extends React.Component {
   constructor() {
      super();
      this.state = { cvCategory: 'work', logoPurple: false}; 
      this.heroRef = React.createRef();
      this.logoRef = React.createRef();
      
      this.lastTime = null;
   }

   myThrottle = (div1, div2) => {
      if (!this.lastTime) {
         let dateNow = new Date()
         this.lastTime = dateNow.getTime();
      }

      let dateNow2 = new Date();
      let timeNow = dateNow2.getTime();

      if(timeNow - this.lastTime > 300) {
         this.isColliding(div1, div2);
         this.lastTime = timeNow; 
      }
   }

   isColliding = ( div1, div2 ) => {
      

	   let bounding1 = div1.getBoundingClientRect();
      let bounding2 = div2.getBoundingClientRect();
      
      if (bounding1.bottom < bounding2.bottom) {
         if(!div2.classList.contains("purple")) {
            div2.classList.add("purple");
         }
      } else {
         if(div2.classList.contains("purple")) {
            div2.classList.remove("purple");
         }
      }
   };

   componentDidMount() {
      if (window.innerWidth > 1625) {
         window.addEventListener("scroll", () => this.myThrottle(this.heroRef.current, this.logoRef.current))
      }
   }


   componentWillUnmount() {
      if (window.DeviceOrientationEvent) {
         // Our browser supports DeviceOrientation
         //window.removeEventListener("deviceorientation", () => {console.log('uuu')});
      } else {
        console.log("Sorry, your browser doesn't support Device Orientation");
      }
   }

   renderBgDivs = (numOfDivs) => {
      let bgDivs = []
      
      for(let i = 0; i < numOfDivs; i++) {
         bgDivs.push(<div className={`bgBar ${i % 2 === 0 ? 'blue' : 'white'}`} key={i}/>);
      }
      
      return bgDivs;
   }

   setCvCategory = (category) => {
      let newState = this.state;
      newState.cvCategory = category;

      this.setState(newState);
   }

   renderLogo = () => {
      return <svg className={`logo ${this.state.logoPurple ? 'purple' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 49.14" ref={this.logoRef}><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline className="cls-1" points="132 13.53 49.9 13.53 37.83 38.13 29.43 20.62 21.37 38.48 9.07 13.41 0 13.41"/><rect className="cls-1" x="85.97" y="18.81" width="28.92" height="16.81" rx="8.4"/><path className="cls-1" d="M114.88,17.53v21.1a9.1,9.1,0,0,1-9.1,9.11"/><rect className="cls-1" x="51.97" y="18.81" width="28.92" height="16.81" rx="8.4"/><line className="cls-1" x1="121.59" y1="35.62" x2="121.59"/></g></g></svg>

/*       return <svg className={`logo ${this.state.logoPurple ? 'purple' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.3 51.74" ref={this.logoRef}><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline className="cls-1" points="0 9.36 17.86 9.36 31.17 36.48 39.22 18.62 47.63 36.13 60.94 9.01 161.3 9.01" /><rect className="cls-1" x="65.14" y="18.81" width="30.92" height="16.81" rx="8.4" /><rect className="cls-1" x="103.76" y="18.81" width="30.92" height="16.81" rx="8.4" /><path className="cls-1" d="M134.68,14.53v27.1a9.11,9.11,0,0,1-9.11,9.11" /><line className="cls-1" x1="145.39" y1="35.62" x2="145.39" /></g></g></svg> */
   }

   grantPermission = () => {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', (event) => this.handleOrientation(event));
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
   }

   render() {
      return(
         <main className="hero" ref={this.heroRef}>
            {this.renderLogo()}
            <HeadModel/>
            <div className="hero__content">
               <div className="hero__content__title">
                  {/* <div className="deviceOrientation">
                     <p>absolute: {this.state.orientation[0]}</p>
                     <p>alpha: {this.state.orientation[1]}</p>
                     <p>beta: {this.state.orientation[2]}</p>
                     <p>gamma: {this.state.orientation[3]}</p>
                     <button onClick={() => this.grantPermission()}>OK</button>
                  </div> */}
                  <div className="text">
                     <h1>{this.props.firstName}</h1>
                     <h1>{this.props.lastName}</h1>
                     <p>arendaja / disainer</p>
                  </div>
                  <a href="mailto:info@vvogt.ee" className="contactButton">KIRJUTA MULLE</a>
                  <img src={Stars} alt="starry background" className="bgStars"/>
                  <img src={Stars2} alt="starry background layer 2" className="bgStars bigger"/>
               </div>
               <div className="hero__content__cv">
                  <div className="cvButtons">
                     <button className={`cvButton ${this.state.cvCategory !== 'work' ? 'inactive' : ''}`} type="button" tabIndex="0" onClick={() => this.setCvCategory('work')}>
                        <span className="cvButton__content" tabIndex="-1">
                          TÖÖ
                        </span>
                     </button>
                     <div className="divider">/</div>
                     <button className={`cvButton ${this.state.cvCategory !== 'education' ? 'inactive' : ''}`} type="button" tabIndex="0" onClick={() => this.setCvCategory('education')}>
                        <span className="cvButton__content" tabIndex="-1">
                          HARIDUS
                        </span>
                     </button>
                  </div>        
                  <CV
                     activeCategory={this.state.cvCategory}
                     cvItems={this.props.cvItems}
                  />
{/*                   <div className="bgShape"/> */}
               </div>
            </div>
         </main>
      )
   }
}

export default Hero;