// bionicFrontend/src/components/LoginModal.tsx

import { useEffect, useState } from "react";
import './styles/loginModal.css';
import LoginButton from "./LoginButton";
import { useNavigate } from 'react-router-dom';
import config from "../config";
import { jwtDecode } from 'jwt-decode';
import { LoginModalProps, DecodedToken } from '../../interface/interface'


const LoginModal = ({ onClose, onRegisterClick }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
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

    //jwt_decode
//    const decodeJWT = (token: string): DecodedToken | null => {
//        try {
//            const payload = token.split('.')[1];
//            const decoded = JSON.parse(atob(payload));
//            return decoded;
//        } catch (error) {
//            console.error("Failed to decode JWT", error);
//            return null;
//        }
//    };

    const handleLogin = async () => {
        setErrorMessage('');
        console.log("Attempting to login...");
        try {
            const response = await fetch(config.endpoints.auth.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Raw response:', response);
            const data = await response.json();
            console.log('Parsed response data:', data);

            if (response.ok) {
                const token = data.token;
                console.log('token:', token);

                //------decode----
//                const decodedToken = decodeJWT(token);
                const decodedToken: DecodedToken = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                if (!decodedToken || !decodedToken.userid) {
                    throw new Error("User ID is missing in the decoded token");
                }

                const userID = decodedToken.userid;
                const userRole = decodedToken.role;
                console.log('userID:', userID);
                console.log('userRole:', userRole);
                
                
                //---------localst.
                sessionStorage.setItem('authToken', token);
                localStorage.setItem('userID', userID);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', userRole)

                onClose();
                if (userRole !== 'kund') {
                    navigate('/staff');
                } else {
                navigate('/');
                }
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
        localStorage.setItem('userID', 'guest');
        localStorage.setItem('isLoggedIn', 'true');
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
*Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn och fick installera jwt_decode och lägga till funktionalitet för det.
* Andreas har redigerat för att hämta role och skicka icke-kunder till personalsidan. Ändrade till annan variant av jwt decode.
* 18/12 Ally flyttat interface till interface.tsx
 */