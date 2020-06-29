import React from 'react';
import HeadModel from './HeadModel';

class Hero extends React.Component {

   renderBgDivs = (numOfDivs) => {
      let bgDivs = []

      for(let i = 0; i < numOfDivs; i++) {
         bgDivs.push(<div className={`bgBar ${i % 2 === 0 ? 'blue' : 'white'}`} key={i}/>);
      }

      return bgDivs;
   }

   render() {
      return(
         <main className="hero">
            <div className="hero__left">
               <h1>{this.props.firstName}</h1>
               <h1>{this.props.lastName}</h1>
               <p className="rellax" data-rellax-speed="0.25">disainer / arendaja</p>
            </div>
            <div className="hero__right">
               <HeadModel/>
               
               {/* <button className="rellax" data-rellax-speed="1.5">KIRJUTA MULLE</button> */}
            </div>
            <div className="hero__bg">
               <div className="bgHalf_back"/>
            </div>
         </main>
      )
   }
}

export default Hero;