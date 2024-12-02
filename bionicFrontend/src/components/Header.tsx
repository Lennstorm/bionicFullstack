//bioonicFrontend/src/components/Header.tsx
import { useState, useEffect } from 'react';
import '../components/styles/header.css';
import headerImg from '../assets/headerImg.png';
import companyLogo from '../assets/logo.svg';
import textLogo from '../assets/hemkocken_text.svg'
import basketLogo from '../assets/kundkorg.svg';
import LoginButton from '../components/LoginButton';
import LoginModal from './LoginModal';
import LogoutButton from '../components/LogoutButton';

function Header() {
    const [isMini, setIsMini] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsMini(true);
            } else {
                setIsMini(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <>
            <div style={{
                background: `linear-gradient(to right, white 20%, rgba(255, 255, 255, 0) 70%), url(${headerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} className={`header-container ${isMini ? 'mini' : ''}`}>

                <img className='header-logo' src={isMini ? textLogo : companyLogo} alt="company logo" />

                <h1 className="header-h1">TakeAway</h1>

                {isLoggedIn ? (
                    <LogoutButton
                        text="Logga ut"
                        onClick={handleLogout} />
                ) : (
                    <LoginButton
                        text="logga in"
                        onClick={() => setIsLoginModalOpen(true)} />
                )}
                <img src={basketLogo} alt="basket symbol" className="kundkorg" />
            </div>
            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                />
            )}
        </>
    );
}

export default Header





/* Författare: Ally
*
* Ändrad av Andreas för implementering av knapp-komponent, lagt till mini-header vid scroll nedåt. 
* 
* 
* 
*/
