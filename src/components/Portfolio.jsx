import React, {useState} from 'react'
import LightBox from './LightBox'

import {setBgImage} from '../helpers'

//PORTFOLIO IMAGES

//Vee all kuu peal 2
import VAKP2Poster from '../images/portfolio/veeallkuupeal_plakat_A3.jpg';
import VAKP2Windows from '../images/portfolio/veeallkuupeal_aknad_kavand2.jpg';
import VAKP2Mock from '../images/portfolio/VAKP2_mock.jpg';

//MeGusto
import MGCups from '../images/portfolio/megusto_cups.jpg';
import MGSign from '../images/portfolio/megusto_sign.jpg';
import MGLogo from '../images/portfolio/Megusto_logo-a.png';
import MGWindows from '../images/portfolio/Megusto_aknad-6b.jpg';
import MGChocolate from '../images/portfolio/14102921_1765856460319902_624481842267866810_o.jpg';

//EPL 110
import EPLPrint from '../images/portfolio/EPL-synnip2ev_717x900.jpg';
import EPLMock from '../images/portfolio/EPL_mock.jpg';
import EPLLogo from '../images/portfolio/EPL_110_final.jpg';

//Carefab
import CarefabMock1 from '../images/portfolio/carefab_fabricMock1.jpg';
import CarefabTags from '../images/portfolio/carefab_mocktags.jpg';
import CarefabBedding from '../images/portfolio/carefab_voodipesu.jpg';
import CarefabBox from '../images/portfolio/carefab_box.jpg';


//Iga Eestlane Loeb
import IELMock from '../images/portfolio/IEL_mock2.jpg';
import IEL1 from '../images/portfolio/IEL1.jpg';
import IEL2 from '../images/portfolio/IEL2.jpg';

//Jive Turkey
import JT1 from '../images/portfolio/JiveTurkey1.jpg';
import JT2 from '../images/portfolio/JiveTurkey2.jpg';
import JT3 from '../images/portfolio/JiveTurkey3.jpg';


export default function Portfolio(props) {
   const [lightBoxItem, setLightBoxItem] = useState(false);
   
   const portfolio = [
      {
         title: 'Vee all kuu peal 2',
         year: '2020',
         description: 'Plakati ja akende kujundus Maarja Mäemetsa ja Rait lõhmuse fotonäitusele "Vee all / kuu peal 2".',
         images: [VAKP2Poster, VAKP2Mock, VAKP2Windows],
      },
      {
         title: 'Megusto',
         description: 'Šokolaadi ja maiustuste kohvik Megusto logo ja kujundused.',
         images: [MGCups, MGChocolate, MGLogo, MGSign, MGWindows],
      },
      {
         title: 'Eesti Päevaleht 110',
         year: '2015',
         description: 'Eesti Päevalehe 110 juubeli logo ja printreklaami kujundus.',
         images: [EPLMock, EPLLogo, EPLPrint],
      },
      {
         title: 'Jive Turkey',
         description: 'Tugevalt blacksploitation filmidest ja funkist inspireeritud plakatid ürituste sarjale "Jive Turkey"',
         images: [JT1, JT2, JT3],
      },
      {
         title: 'Iga Eestlane Loeb',
         year: '2016',
         description: 'Kampaania printreklaamide loovidee ja kujundus. Eesti Päevalehe ja Delfi kampaania, uppumis- ja liiklussurmade vähendamiseks. Kampaania jooksis läbi terve suve ja reklaamil loendasime selle aasta hetkelist liiklus- ja uppumissurmade arvu Eestis. Kampaania mõjus lugejale läbi korduste – iga järgmise korraga, kus lugeja reklaami nägi, oli ohvrite arv kasvanud.',
         images: [IELMock, IEL2, IEL1],
      },
      {
         title: 'Carefab',
         year: '2020',
         description: 'Logo ja branding tekstiiliga tegelevale ettevõttele Carefab',
         images: [CarefabMock1, CarefabTags, CarefabBedding, CarefabBox, /* CarefabLogo */ ],
      }
   ]

   const renderPortfolioPreviews = (items) => {
      return items.map((item, index) => {
         return <li className="preview" style={setBgImage(item.images[0], 'scroll', '250px')} key={index} onClick={() => setLightBoxItem(index)}/>
      })
   }

   return(
      <div className="portfolio">
         {
            lightBoxItem !== false && 
            <LightBox
             activeItem={lightBoxItem}
             items={portfolio}
             setItem={setLightBoxItem}
            />
         }
         <h2>TÖÖD</h2>
         <ul className="portfolio__gallery">
            {renderPortfolioPreviews(portfolio)}
         </ul>
      </div>
   )
}