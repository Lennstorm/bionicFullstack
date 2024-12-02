import { useState, useEffect } from 'react';
import '../components/styles/header.css';
import LoginButton from '../components/LoginButton';
import LoginModal from './LoginModal';
import LogoutButton from '../components/LogoutButton';
import '../components/styles/serviceHeader.css'

function ServiceHeader() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        const getCurrentSwedishTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/Stockholm'
            };
            return new Intl.DateTimeFormat('sv-SE', options).format(now);
        };
        setCurrentTime(getCurrentSwedishTime());

        const interval = setInterval(() => {
            setCurrentTime(getCurrentSwedishTime());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='serviceHeader-container'>
                <section className='serviceHeader-left'>
                    <article className='serviceHeader-text'>
                        inloggad som:
                    </article>
                    <article className='serviceHeader-text'>
                        {currentTime}
                    </article>
                </section>

                <section>
                    <h1 className='service-h1'>Service</h1>
                </section>

                <section>
                    {isLoggedIn ? (
                        <LogoutButton
                            text="Logga ut"
                            onClick={handleLogout} />
                    ) : (
                        <LoginButton
                            text="logga in"
                            onClick={() => setIsLoginModalOpen(true)} />
                    )}
                </section>

            </div>

            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                />
            )}
        </>
    )
}

export default ServiceHeader

