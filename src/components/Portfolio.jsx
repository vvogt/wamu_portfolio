import React from 'react'

import {setBgImage} from '../helpers'

import bgCables from '../images/background/bg_cables.jpg'

const renderPortfolioPreviews = (items) => {
   console.log(items);
   return items.map((item, index) => {
      return <li className="preview" style={setBgImage(item.image, 'scroll', '250px')} key={index}/>
   })
}

export default function Portfolio(props) {
   return(
      <div className="portfolio">
         <div 
          className="bgShape"
          style={{
             backgroundImage: `url(${bgCables})`,
             backgroundAttachment: 'fixed',
             backgroundRepeat: 'no-repeat',
             backgroundSize: '25% auto',
             backgroundPosition: 'right bottom'
          }}/>
         <h2>TÖÖD</h2>
         <ul className="portfolio__gallery">
            {renderPortfolioPreviews(props.portfolioItems)}
         </ul>
      </div>
   )
}