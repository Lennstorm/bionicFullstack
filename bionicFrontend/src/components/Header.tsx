//bioonicFrontend/src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/header.css';
import headerImg from '../assets/headerImg.png';
import companyLogo from '../assets/logo.svg';
import textLogo from '../assets/hemkocken_text.svg'
import basketLogo from '../assets/kundkorg.svg';
import LoginButton from '../components/LoginButton';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LogoutButton from '../components/LogoutButton';

function Header() {
    const [isMini, setIsMini] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
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

    const handleOpenRegisterModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    }

    return (
        <>
            <div style={{
                background: `linear-gradient(to right, white 20%, rgba(255, 255, 255, 0) 70%), url(${headerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} className={`header-container ${isMini ? 'mini' : ''}`}>

                <Link to="/">
                <img className='header-logo' src={isMini ? textLogo : companyLogo} alt="company logo" />
                </Link>

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
                <Link to="/basket">
                <img src={basketLogo} alt="basket symbol" className="kundkorg" />
                </Link>
            </div>
            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                    onRegisterClick={handleOpenRegisterModal}
                />
            )}
            {isRegisterModalOpen && (
                <RegisterModal
                    onClose={() => setIsRegisterModalOpen(false)}
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
