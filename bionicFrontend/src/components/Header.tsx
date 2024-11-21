import React, { useState, useEffect } from 'react';
import '../components/styles/header.css';
import headerImg from '../assets/headerImg.png';
import companyLogo from '../assets/logo.svg';
import textLogo from '../assets/hemkocken_text.svg'
import basketLogo from '../assets/kundkorg.svg';
import LoginButton from '../components/LoginButton';

function Header() {
    const [isMini, setIsMini] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >50) {
                setIsMini(true);
            } else {
                setIsMini(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div style={{
            background: `linear-gradient(to right, white 20%, rgba(255, 255, 255, 0) 70%), url(${headerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className={`header-container ${isMini ? 'mini' : ''}`}>

            <img className='header-logo' src={isMini ? textLogo : companyLogo} alt="company logo" />

            <h1 className="header-h1">TakeAway</h1>

            <LoginButton                 
                text="logga in" 
                onClick={() => console.log('Login Button!')} />
                
            <img src={basketLogo} alt="basket symbol" className="kundkorg" />                
        </div>
    )
}

export default Header





/* Författare: Ally
*
* Små ändringar av Andreas för implementering av knapp-komponent 
* 
* 
* 
*/
