//bioonicFrontend/src/components/LoginModal.tsx
import { useState } from "react";
import './styles/loginModal.css';
import LoginButton from "./LoginButton";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            console.log('Response data:', data)

            if (response.ok) {
                const token = data.token;
                console.log('token:', data.token);
                sessionStorage.setItem('authToken', token);
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
        onClose();
    };

    const handleCreateAccount = () => {
        console.log('Redirecting to Create Account');
    };
    return (
        <div className="login-modal-overlay">
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
                <div className="login-modal-buttons">
                    <button onClick={handleGuestLogin}>Logga in som gäst</button>
                    <button onClick={handleCreateAccount}>Skapa konto</button>
                    <LoginButton text="logga in" onClick={handleLogin} />
                </div>

            </div>
        </div>
    );
};

export default LoginModal;