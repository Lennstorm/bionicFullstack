import { useState, useEffect } from 'react';
import '../components/styles/header.css';
import LoginButton from '../components/LoginButton';
import LoginModal from '../components/LoginModal';
import LogoutButton from '../components/LogoutButton';
import '../componentsStaff/styles/staffHeader.css';
import RegisterModal from '../components/RegisterModal';
import { useNavigate } from 'react-router-dom';



function StaffHeader(): JSX.Element {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userRole, setUserRole] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token: string | null = sessionStorage.getItem('authToken');
        const storedUserName: string | null = sessionStorage.getItem('userName');
        const storedUserRole: string | null = localStorage.getItem('userRole');

        setIsLoggedIn(!!token);

        if (storedUserName) {
            setUserName(storedUserName);
        }

        if (storedUserRole) {
            setUserRole(storedUserRole);
        }
    }, []);

    const handleLogout = (): void => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userName');
        setIsLoggedIn(false);
        setUserName('');
        navigate("/");
    };

    const handleOpenRegisterModal = (): void => {
        setIsLoginModalOpen(false)
        setIsRegisterModalOpen(true)
    }

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
            <div className='staffHeader-container'>
                <section className='staffHeader-left'>
                    <article className='staffHeader-text'>
                        {isLoggedIn ? `Inloggad som: ${userName}` : 'Inte inloggad'}
                    </article>
                    <article className='staffHeader-text'>
                        {currentTime}
                    </article>
                </section>

                <section>
                    <h1 className='staff-h1'>
                        {userRole === 'cook' && 'Kock'}
                        {userRole === 'waiter' && 'Servitör'}
                        {userRole === 'admin' && 'Administratör '}
                        {userRole === 'kund' && 'Här får du inte vara!!! '}
                        {!userRole && 'Personal'}
                    </h1>

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

export default StaffHeader;



/* 
*Alistair
*
*Andreas lade in dynamisk h1 beroende på inloggad persons role
*
* 
*/