import React from 'react';
import HeadModel from './HeadModel';
import CV from './CV';
import throttle from 'underscore';

import Stars from '../images/svg/stars.svg';
import Stars2 from '../images/svg/stars_bigger.svg';
import BgShape from '../images/background/bgshape_yellow.png';

class Hero extends React.Component {
   constructor() {
      super();

      this.state = { cvCategory: 'work' }; 
      this.heroRef = React.createRef();
   }
/* 
   componentDidMount() {
      window.addEventListener('scroll', throttle(this.getBoundingTop(this.heroRef.current), 100));
   }

   componentWillUnmount() {
      window.removeEventListener('scroll', throttle(this.getBoundingTop(this.heroRef.current), 100))
   }

   getBoundingTop = (elem) => {
      console.log(elem);
      var bounding = elem.getBoundingClientRect();
      console.log(bounding.top);
      return (
         //bounding.top < (window.innerHeight || document.documentElement.clientHeight) && bounding.bottom > 0
         bounding.top < (window.innerHeight || document.documentElement.clientHeight)
      )
   } */
   
   renderBgDivs = (numOfDivs) => {
      let bgDivs = []
      
      for(let i = 0; i < numOfDivs; i++) {
         bgDivs.push(<div className={`bgBar ${i % 2 === 0 ? 'blue' : 'white'}`} key={i}/>);
      }
      
      return bgDivs;
   }

   setCvCategory = (category) => {
      this.setState({cvCategory: category})
   }

   renderLogo = () => {
      return <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.3 51.74"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline className="cls-1" points="0 9.36 17.86 9.36 31.17 36.48 39.22 18.62 47.63 36.13 60.94 9.01 161.3 9.01" /><rect className="cls-1" x="65.14" y="18.81" width="30.92" height="16.81" rx="8.4" /><rect className="cls-1" x="103.76" y="18.81" width="30.92" height="16.81" rx="8.4" /><path className="cls-1" d="M134.68,14.53v27.1a9.11,9.11,0,0,1-9.11,9.11" /><line className="cls-1" x1="145.39" y1="35.62" x2="145.39" /></g></g></svg>
   }
   
   render() {
      return(
         <main className="hero" ref={this.heroRef}>
            {this.renderLogo()}
            <HeadModel hero={this.heroRef}/>
            <div className="hero__content">
               <div className="hero__content__title">
                  <div className="text">
                     <h1>{this.props.firstName}</h1>
                     <h1>{this.props.lastName}</h1>
                     <p>arendaja / disainer</p>
                  </div>
                  <button className="contactButton">KIRJUTA MULLE</button>
                  <img src={Stars} alt="starry background" className="bgStars"/>
                  <img src={Stars2} alt="starry background layer 2" className="bgStars bigger"/>
               </div>
               <div className="hero__content__cv">
                  <div className="cvButtons">
                     <button class={`cvButton ${this.state.cvCategory !== 'work' ? 'inactive' : ''}`} type="button" tabindex="0" onClick={() => this.setCvCategory('work')}>
                        <span class="cvButton__content" tabindex="-1">
                          TÖÖ
                        </span>
                     </button>
                     <div className="divider">/</div>
                     <button class={`cvButton ${this.state.cvCategory !== 'education' ? 'inactive' : ''}`} type="button" tabindex="0" onClick={() => this.setCvCategory('education')}>
                        <span class="cvButton__content" tabindex="-1">
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
            <div className="bgHalf"></div>
         </main>
      )
   }
}

export default Hero;