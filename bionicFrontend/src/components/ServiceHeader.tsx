import { useState, useEffect } from 'react';
import '../components/styles/header.css';
import LoginButton from '../components/LoginButton';
import LoginModal from './LoginModal';
import LogoutButton from '../components/LogoutButton';
import '../components/styles/serviceHeader.css';

function ServiceHeader(): JSX.Element {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const token: string | null = sessionStorage.getItem('authToken');
        const storedUserName: string | null = sessionStorage.getItem('userName');
        setIsLoggedIn(!!token);

        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogout = (): void => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userName');
        setIsLoggedIn(false);
        setUserName('');
    };

    useEffect(() => {
        const getCurrentSwedishTime = (): string => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Europe/Stockholm',
            };
            return new Intl.DateTimeFormat('sv-SE', options).format(now);
        };

        setCurrentTime(getCurrentSwedishTime());

        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentSwedishTime());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className='serviceHeader-container'>
                <section className='serviceHeader-left'>
                    <article className='serviceHeader-text'>
                        {isLoggedIn ? `Inloggad som: ${userName}` : 'Inte inloggad'}
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
                            onClick={handleLogout}
                        />
                    ) : (
                        <LoginButton
                            text="logga in"
                            onClick={() => setIsLoginModalOpen(true)}
                        />
                    )}
                </section>
            </div>

            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                />
            )}
        </>
    );
}

export default ServiceHeader;



/* 
Alistair
*/