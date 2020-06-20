import React from 'react';

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
               <p>
                  Olen pea kümme aastat töötanud graafilise disainerina ja nüüd olen lisaks ka üsna värskelt alustanud arendaja.
                  Disainerina olen töötanud erinevates ettevõtetes, näiteks Ekspress Meedia ja Eesti Meedia, kus tegin peamiselt trükidisaini.
                  Olen õppinud Tallinna Polütehnikumis trükiettevalmistust ja hetkel õpin Tallinna Ülikoolis Informaatikat.
               </p>
               <p>
                  Töötada soovin veebiarendajana ja soovin ennast selles valdkonnas kõvasti arendada. Tulevikus tahaksin teha nii disaini kui ka arendust.
                  Hetkel on mul veidi kogemust Reactiga, WordPressi theme-ide kirjutamisega, sass-iga, javascriptiga ja veidi olen kokku puutunud ka php programmeerimisega.
               </p>
               <p>
                  Kui oskad pakkuda mulle tööd veebiarendajana või soovitada mõnda ettevõtet kuhu kandideerida, siis anna julgelt teada.
               </p>
               <button className="rellax" data-rellax-speed="1.5">KIRJUTA MULLE</button>
            </div>
            <div className="hero__bg">
               <div className="bgHalf_back"/>
               <div className="bgBars_back">
                  {this.renderBgDivs(21)}
               </div>
               <div className="bgHalf"/>
               <div className="bgBars">
                  {this.renderBgDivs(35)}
               </div>
            </div>
         </main>
      )
   }
}

export default Hero;