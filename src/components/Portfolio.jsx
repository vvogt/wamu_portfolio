import React, {useState} from 'react'
import LightBox from './LightBox'

import {setBgImage} from '../helpers'

import bgCables from '../images/background/bg_cables.jpg'
import bgCablesTop from '../images/background/bg_cables_top.png'

export default function Portfolio(props) {
   const [lightBoxItem, setLightBoxItem] = useState(false);
   
   const renderPortfolioPreviews = (items) => {
      return items.map((item, index) => {
         return <li className="preview" style={setBgImage(item.image, 'scroll', '250px')} key={index} onClick={() => setLightBoxItem(index)}/>
      })
   }

   return(
      <div className="portfolio">
         {
            lightBoxItem !== false && 
            <LightBox
             activeItem={lightBoxItem}
             items={props.portfolioItems}
             setItem={setLightBoxItem}
            />
         }
         {/* <img src={bgCablesTop} alt="cable" className="bgItemTop"/>
         <div 
          className="bgShape"
          style={{
             backgroundImage: `url(${bgCables})`,
             backgroundAttachment: 'fixed',
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'auto 120vh',
             backgroundPosition: 'right bottom'
          }}/> */}
         <h2>TÖÖD</h2>
         <ul className="portfolio__gallery">
            {renderPortfolioPreviews(props.portfolioItems)}
         </ul>
      </div>
   )
}