//bionicFrontend/src/components/RegisterModal.tsx
import { useEffect, useState } from "react";
import './styles/registerModal.css';
import LoginButton from "./LoginButton";
import config from "../config";
import { RegisterModalProps } from '../../interface/interface'


const RegisterModal = ({ onClose }: RegisterModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');    
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

    const handleRegister = async () => {
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Lösenorder matchar inte!');
            return;
        }
        try {
            const response = await fetch(config.endpoints.user.add, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            console.log('Response data:', data)

            if (response.ok) {
                console.log('Registreringen lyckades!') // här vill vi skriva ut ett meddelande på skärmen.
            } else {
                setErrorMessage(data.message || 'Registreringen misslyckades');
            }
        } catch (error) {
            console.error('Registration failed', error);
            setErrorMessage('Tekniskt fel. Försök igen!');
        }
    };

    return (
        <div className="register-modal-overlay" onClick={handleOverlayClick}>
            <div className="register-modal">
                <button className="close-modal-btn" onClick={onClose}>X</button>
                <input
                    type="name"
                    placeholder="för- och efternamn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Bekräfta lösenord"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="register-modal-loginbtn">
                    <LoginButton text="skapa konto!" onClick={handleRegister} />
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;


/* 
*   Författare Andreas
*
* 18/12 Ally flyttat interface till interface.tsx
*
*
 */