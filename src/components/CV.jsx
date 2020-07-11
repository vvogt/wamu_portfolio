import React from "react";

import { insertBreak } from '../helpers'

const renderEduItems = (props) => {
   return props.cvItems[props.activeCategory].map((item, index) => {
      return (
         <li key={index} data-date={`${item.years}`}>
            {
               props.activeCategory === 'education' ?
                <p className="school">{item.school}</p> :
                <p className="enterprise">{item.enterprise}</p>
            }
            {
               props.activeCategory === 'education' ?
                item.specialty && <p className="smaller">{insertBreak(item.specialty)}</p> :
                item.position && <p className="smaller">{insertBreak(item.position)}</p>
            }
         </li>
      )
   })
}

export default function CV(props) {
   return (
      <ul className={`timeline ${props.activeCategory}`}>
         {renderEduItems(props)}
      </ul>
   );
}