import { useState } from "react";
import './styles/loginModal.css';
import LoginButton from "./LoginButton";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.success) {
                console.log('token', data.token);
                onClose();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
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