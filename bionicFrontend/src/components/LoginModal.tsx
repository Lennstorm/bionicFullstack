//bionicFrontend/src/components/LoginModal.tsx
import { useEffect, useState } from "react";
import './styles/loginModal.css';
import LoginButton from "./LoginButton";

interface LoginModalProps {
    onClose: () => void;
    onRegisterClick: () => void;
}

const LoginModal = ({ onClose, onRegisterClick }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth >0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await fetch('https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log('Response data:', data);
    
            if (response.ok) {
                const token = data.token;
                const userID = data.userID;
    
                console.log('token:', token);
                console.log('userID:', userID);
    
                sessionStorage.setItem('authToken', token);
                //----------localstorgae
                localStorage.setItem('userID', userID);
                localStorage.setItem('isLoggedIn', 'true');
    
                onClose();
                window.location.reload();
            } else {
                setErrorMessage(data.message || 'Inloggningen misslyckades');
            }
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Tekniskt fel. Försök senare!');
        }
    };
    

    const handleGuestLogin = () => {
        console.log('Logging in as guest.');
        //----------save guest as userID
        localStorage.setItem('userID', 'guest');
        localStorage.setItem('isLoggedIn', 'true');
        //---------
        onClose();
    };

    const handleCreateAccount = () => {
        onRegisterClick();
    };
    return (
        <div className="login-modal-overlay" onClick={handleOverlayClick}>
            <div className="login-modal">
                <button className="close-modal-btn" onClick={onClose}>X</button>
                <input
                    type="email"
                    placeholder="skriv e-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="skriv lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="login-modal-btns">
                    <button onClick={handleGuestLogin}>Logga in som gäst</button>
                    <button onClick={handleCreateAccount}>Skapa konto</button>
                </div>
                <div className="login-modal-loginbtn">
                    <LoginButton text="logga in" onClick={handleLogin} />
                </div>

            </div>
        </div>
    );
};

export default LoginModal;


/* 
*   Författare Andreas
*
*Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn
*
*
 */