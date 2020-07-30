import React from 'react';

//COMPONENTS
import Hero from './Hero';
import ImageWithText from './ImageWithText';
import Portfolio from './Portfolio'
import Contacts from './Contacts'
import AboutMe from './AboutMe'

//IMAGES

//HELPERS


class Main extends React.Component {
   state = {
      refs: [],
      appearStates: []
   }

   componentDidMount() {
      //window.addEventListener('scroll', this.handleScroll);

      let newState = this.state;
      for (let i = 0; i < this.state.refs.length; i++) {
         i !== 0 ? newState.appearStates.push(false) : newState.appearStates.push(true);
      }
      this.setState(newState);

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
      const cvItems = {
         'work': [
            {
               years: '2010',
               enterprise: 'Haljala Gümnaasium',
               position: 'Inglise keele <br> asendusõpetaja'
            },
            {
               years: '2012 – 2014',
               enterprise: 'BrandCreator',
               position: 'Disainer'
            },
            {
               years: '2014 – 2017',
               enterprise: 'Ekspress Meedia',
               position: 'Disainer'
            },
            {
               years: '2017 – 2018',
               enterprise: 'Eesti Meedia',
               position: 'Disainer'
            },
            {
               years: '2019',
               enterprise: 'Velvet',
               position: 'Arendaja praktikant'
            }
         ],
         'education': [
            {
               years: '1997 – 2009',
               school: 'Haljala Gümnaasium'
            },
            {
               years: '2010 – 2012',
               school: 'Tallinna Polütehnikum',
               specialty: 'Trükiettevalmistus'
            },
            {
               years: '2018 – ...',
               school: 'Tallinna Ülikool',
               specialty: 'Informaatika'
            }
         ]
      }

      return(
         <div className="wrapper" >
            <Hero
             firstName="Vahur"
             lastName="Vogt"
             cvItems={cvItems}
            />

            <Portfolio/>

            <AboutMe/>

            <Contacts
               eMail="vahur@vvogt.ee"
               linkedIn="www.linkedin.com/in/vahurvogt"
               github="github.com/vvogt"
            />
         </div>
      )
   }

}

export default Main;