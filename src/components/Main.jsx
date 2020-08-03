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
   heroRef = React.createRef();
   state = {
   }

   componentDidMount() {
      //window.addEventListener('scroll', this.handleScroll);
   }

   componentWillUnmount() {
      //window.removeEventListener('scroll', this.handleScroll)
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
             ref={this.heroRef}
             thisRef={this.heroRef}
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