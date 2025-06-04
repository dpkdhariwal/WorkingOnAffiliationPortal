
//apps
import apppng1 from '../assets/images/apps/calender.png';
import apppng2 from '../assets/images/apps/figma.png';
import apppng3 from '../assets/images/apps/google-docs.png';
import apppng4 from '../assets/images/apps/google-sheets.png';
import apppng5 from '../assets/images/apps/google.png';
import apppng6 from '../assets/images/apps/microsoft-powerpoint.png';
import apppng7 from '../assets/images/apps/microsoft-word.png';
import apppng8 from '../assets/images/apps/sketch.png';
import apppng9 from '../assets/images/apps/translate.png';

//logos

import logo1 from '../assets/images/brand-logos/desktop-dark.png';
import logo2 from '../assets/images/brand-logos/desktop-logo.png';
import logo3 from '../assets/images/brand-logos/desktop-white.png';
import logo4 from '../assets/images/brand-logos/toggle-dark.png';
import logo5 from '../assets/images/brand-logos/toggle-logo.png';
import logo6 from '../assets/images/brand-logos/toggle-white.png';
import logo7 from '../assets/images/brand-logos/favicon.ico';
import logo8 from '../assets/images/brand-logos/1.png';
import logo9 from '../assets/images/brand-logos/2.png';
import dgt_logo from '../assets/images/brand-logos/dgt_logo.png';




//ecommerce

import ecommerce1 from '../assets/images/ecommerce/jpg/1.jpg';
import ecommerce3 from '../assets/images/ecommerce/jpg/3.jpg';
import ecommerce4 from '../assets/images/ecommerce/jpg/4.jpg';
import ecommerce5 from '../assets/images/ecommerce/jpg/5.jpg';
import ecommerce6 from '../assets/images/ecommerce/jpg/6.jpg';

//faces


import face1 from '../assets/images/faces/1.jpg';
import face2 from '../assets/images/faces/2.jpg';
import face3 from '../assets/images/faces/3.jpg';
import face4 from '../assets/images/faces/4.jpg';
import face5 from '../assets/images/faces/5.jpg';
import face6 from '../assets/images/faces/6.jpg';
import face7 from '../assets/images/faces/7.jpg';
import face10 from '../assets/images/faces/10.jpg';
import face11 from '../assets/images/faces/11.jpg';
import face12 from '../assets/images/faces/12.jpg';


//flags
import flag1 from '../assets/images/flags/1.jpg';
import flag2 from '../assets/images/flags/2.jpg';
import flag3 from '../assets/images/flags/3.jpg';
import flag4 from '../assets/images/flags/4.jpg';
import flag5 from '../assets/images/flags/5.jpg';
import flag6 from '../assets/images/flags/6.jpg';


//pngs

import png29 from "../assets/images/pngs/29.png"

const ALLImages = (img) => {
    const i = {
        apppng1, apppng2, apppng3, apppng4, apppng5, apppng6, apppng7, apppng8, apppng9, 
        logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, 

        ecommerce1,  ecommerce3, ecommerce4, ecommerce5, ecommerce6,
       
        face1, face2, face3, face4, face5, face6, face7, face10, face11, face12,
        flag1, flag2, flag3, flag4, flag5, flag6, png29,

        dgt_logo
    };
    return i[img];
};

export default ALLImages;