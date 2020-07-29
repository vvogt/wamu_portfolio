import React from 'react';

import FbLogo from '../images/svg/fb_logo_100x100.svg'
import InstaLogo from '../images/svg/instagram_logo_100x100.svg'
import GithubLogo from '../images/svg/github_logo.svg'
import LinkedInLogo from '../images/svg/linkedin_logo.svg'

export default function Contacts() {
   return (
      <footer className="contacts">
         <h2>Kontakt</h2>
         <div className="contacts__content">
            <div className="contacts__content__left">
               <p>Kui sul on pakkuda mulle tööd või midagi muud huvitavat, siis võta minuga ühendust:</p>
               <a href="mailto:vahur@vvogt.ee">vahur@vvogt.ee</a>
            </div>
            <div className="contacts__content__right">
               <a href="http://facebook.com/spacekakez"><img src={FbLogo} alt="Facebook page" /></a>
               <a href="http://www.instagram.com/spacekakez2.0/"><img src={InstaLogo} alt="Instagram page" /></a>
               <a href="http://www.github.com/vvogt/"><img src={GithubLogo} alt="Github page" /></a>
               <a href="http://www.github.com/vvogt/"><img src={LinkedInLogo} alt="LinkedIn page" /></a>
            </div>
            <div className="contacts__content__bottomRow">
               <p>© 2020 Vahur Vogt</p>
            </div>
         </div>
      </footer>
   )
}