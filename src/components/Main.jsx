import React from 'react';

//COMPONENTS
import Hero from './Hero';
import ImageWithText from './ImageWithText';
import Rellax from 'rellax';

//IMAGES
import Ball from '../images/top_layer/ball.png';
import Bucket from '../images/top_layer/2mber_transparent.png';
import Strawberry from '../images/top_layer/maasikas.png';
import Okul from '../images/top_layer/okul.png';

//PORTFOLIO IMAGES
import EMpostcard from '../images/portfolio/EM-joulukaart-c-2016_551x936.jpg';
import PMIllustration from '../images/portfolio/FB-aju_1511x850.jpg';
import DogIllustration1 from '../images/portfolio/koer_636x900.jpg';
import DogIllustration2 from '../images/portfolio/Koer2_636x900.png';
import Ekspress26 from '../images/portfolio/EE-syntar2015_697x900.jpg';
import EPL110 from '../images/portfolio/EPL-synnip2ev_717x900.jpg';

//HELPERS


class Main extends React.Component {
   state = {
      refs: [],
      appearStates: []
   }

   componentDidMount() {
      this.rellax = new Rellax('.rellax');
      window.addEventListener('scroll', this.handleScroll);

      let newState = this.state;
      for (let i = 0; i < this.state.refs.length; i++) {
         i !== 0 ? newState.appearStates.push(false) : newState.appearStates.push(true);
      }
      this.setState(newState);

   }

   componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
   }
   
   handleScroll = () => {
      let appearArray = [];

      this.state.refs.map((element) => {
         appearArray.push(this.scrollFromBottom(element))
      })

      this.setAppearAnimations(appearArray);
   }

   setAppearAnimations = (appearArray) => {
      for (let i = 0; i < appearArray.length; i++) {
         if (this.state.appearStates[i] !== appearArray[i]) {
            let newState = this.state;
            newState.appearStates[i] = !this.state.appearStates[i] 

            this.setState(newState);
            break;
         }
      }
   }

   setRefs = (componentRef) => {
      let newRefs = this.state.refs;
      newRefs.push(componentRef)
      let newState = this.state;
      newState.refs = newRefs;

      this.setState(newState);
   }

   scrollFromBottom = (elem) => {
      var bounding = elem.getBoundingClientRect();
      return (
         //bounding.top < (window.innerHeight || document.documentElement.clientHeight) && bounding.bottom > 0
         bounding.top < (window.innerHeight || document.documentElement.clientHeight)
      );
   };

   renderPortfolioElements = (portfolioArray) => {
      return portfolioArray.map((element, index) => {
         return <ImageWithText
             title={element.title}
             description={element.description}
             images={element.images}
             imageOrientation={element.imageOrientation}
             setRefs={this.setRefs}
             key={index}
             visible={this.state.appearStates[index]}
         />
      })
   }

   render() {
      const portfolio = [
         {
            title: 'Illustratsioon artiklile Postimehes',
            description: '2018',
            images: [PMIllustration],
            imageOrientation: 'horizontal'
         },
         {
            title: 'Ekspress Meedia jõulukaart',
            description: '2016',
            images: [EMpostcard],
            imageOrientation: 'vertical',
         },
         {
            title: 'Eesti Ekspressi kampaania',
            description: 'Printreklaam, 2015',
            images: [Ekspress26],
            imageOrientation: 'vertical'
         },
         {
            title: 'Koerte illustratsioonid',
            images: [DogIllustration1, DogIllustration2],
            imageOrientation: 'vertical',
         },
         {
            title: 'Eesti Päevaleht 110',
            description: 'Logo + Kampaania 2015',
            images: [EPL110],
            imageOrientation: 'vertical'
         },
      ]

      return(
         <div className="wrapper" >
            <Hero
             firstName="VAHUR"
             lastName="VOGT"
            />

            <div className="portfolio">
               {this.renderPortfolioElements(portfolio)}
            </div>

            <div className="topLayer">
               <img src={Ball} className="ball rellax" data-rellax-speed="10" alt="abstract illustration"/>
               <img src={Bucket} className="bucket rellax" data-rellax-speed="12" alt="illustrated bucket"/>
               <img src={Strawberry} className="strawberry rellax" data-rellax-speed="12" alt="illustrated strawberry"/>
               <div className="okul rellax" data-rellax-speed="14"><img src={Okul} alt="illustrated owl" /></div>
            </div>

{/*             <Footer
               eMail="vvogt@gmail.com"

            /> */}
         </div>
      )
   }

}

export default Main;