import React from 'react';
import HeadModel from './HeadModel';
import CV from './CV';

import Logo from '../images/svg/vvogt_logo.svg';
import Stars from '../images/svg/stars.svg';
import Stars2 from '../images/svg/stars_bigger.svg';

class Hero extends React.Component {
   constructor() {
      super();

      this.state = { cvCategory: 'education' }; 
      this.heroRef = React.createRef();
   }
   
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
   
   render() {
      return(
         <main className="hero" ref={this.heroRef}>
            <img src={Logo} alt="vvogt logo" className="logo" />
            <HeadModel hero={this.heroRef}/>
            <div className="hero__content">
               <div className="hero__content__title">
                  <div className="text">
                     <h1>{this.props.firstName}</h1>
                     <h1>{this.props.lastName}</h1>
                     <p className="rellax" data-rellax-speed="0.25">disainer / arendaja</p>
                  </div>
                  <img src={Stars} alt="starry background" className="bgStars"/>
                  <img src={Stars2} alt="starry background layer 2" className="bgStars bigger"/>
               </div>
               <div className="hero__content__cv">
                  <div className="cvButtons">
                     <button className={`work ${this.state.cvCategory !== 'work' ? 'inactive' : ''}`} onClick={() => this.setCvCategory('work')}>TÖÖ</button>
                     <div className="buttonDivider">/</div>
                     <button className={`education ${this.state.cvCategory !== 'education' ? 'inactive' : ''}`} onClick={() => this.setCvCategory('education')}>HARIDUS</button>
                  </div>        
                  <CV
                     activeCategory={this.state.cvCategory}
                     cvItems={this.props.cvItems}
                  />
               </div>
            </div>
            <div className="bgHalf"></div>
            {/* <button className="rellax" data-rellax-speed="1.5">KIRJUTA MULLE</button> */}
         </main>
      )
   }
}

export default Hero;