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
import EMpostcard from '../images/portfolio/EM_joulukaart-c-2016_210x192.jpg';
import PMIllustration from '../images/portfolio/FB-aju.jpg';


class Main extends React.Component {
   state = {
      refs: [],
      appearStates: []
   }

   componentDidMount() {
      this.rellax = new Rellax('.rellax');
      //window.addEventListener('scroll', this.handleScroll)
   }

   componentWillUnmount() {
      //window.removeEventListener('scroll', this.handleScroll)
   }
   
   handleScroll = () => {
      let appearArray = [];

      this.state.refs.map((element) => {
         appearArray.push(this.scrollFromBottom(element))
      })

      this.setAppearAnimations(appearArray);
   }

   setAppearAnimations = (appearArray) => {
      /* this.state.appearStates.map((element, index) => {
         //element !== appearArray[index] && break;
         if (element !== appearArray[index]) {
            break;
         }
      
      }) */

      /* let hasValueLessThanTen = this.some(function (val) {
         
      }); */

      let newState = this.state;
      newState.appearStates = appearArray;

      this.setState(newState);
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
      console.log(portfolioArray);

      return portfolioArray.map((element, index) => {
         console.log(element.title)
         return <ImageWithText
             title={element.title}
             description={element.description}
             imageOrientation={element.imageOrientation}
             setRefs={this.setRefs}
             key={index}
         />
      })
   }

   render() {
      const portfolio = [
         {
            title: 'Illustratsioon artiklile Postimehes',
            description: '2018',
            image: PMIllustration,
            imageOrientation: 'horizontal'
         },
         {
            title: 'Ekspress Meedia <br> jõulukaart',
            description: '2016',
            image: EMpostcard,
            imageOrientation: 'vertical',
         }
      ]

      return(
         <div className="wrapper" >
            <Hero
             firstName="VAHUR"
             lastName="VOGT"
            />

            {this.renderPortfolioElements(portfolio)}

{/*             <ImageWithText
               title="Illustratsioon artiklile Postimehes"
               description="2018"
               image={PMIllustration}
               imageOrientation="horizontal"
               setRefs={this.setRefs}
            />

            <ImageWithText
               title="Ekspress Meedia <br> jõulukaart"
               description="2016"
               image={EMpostcard}
               imageOrientation="vertical"
               setRefs={this.setRefs}
            /> */}

            <div className="topLayer">
               <img src={Ball} className="ball rellax" data-rellax-speed="10" alt="abstract illustration"/>
               <img src={Bucket} className="bucket rellax" data-rellax-speed="12" alt="illustrated bucket"/>
               <img src={Strawberry} className="strawberry rellax" data-rellax-speed="12" alt="illustrated strawberry"/>
               <div className="okul rellax" data-rellax-speed="14"><img src={Okul} alt="illustrated owl" /></div>
            </div>
         </div>
      )
   }

}

export default Main;