import React from 'react'

import {setBgImage} from '../helpers'

import bgCables from '../images/background/bg_cables.jpg'
import bgCablesTop from '../images/background/bg_cables_top.png'

const renderPortfolioPreviews = (items) => {
   console.log(items);
   return items.map((item, index) => {
      return <li className="preview" style={setBgImage(item.image, 'scroll', '250px')} key={index}/>
   })
}

export default function Portfolio(props) {
   return(
      <div className="portfolio">
         <img src={bgCablesTop} alt="cable" className="bgItemTop"/>
         <div 
          className="bgShape"
          style={{
             backgroundImage: `url(${bgCables})`,
             backgroundAttachment: 'fixed',
             backgroundRepeat: 'no-repeat',
             backgroundSize: '30% auto',
             backgroundPosition: 'right bottom'
          }}/>
         <h2>TÖÖD</h2>
         <ul className="portfolio__gallery">
            {renderPortfolioPreviews(props.portfolioItems)}
         </ul>
      </div>
   )
}