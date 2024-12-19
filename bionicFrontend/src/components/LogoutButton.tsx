import './styles/button.css';
import { ButtonProps } from '../../interface/interface'


const LogoutButton = ({ text, onClick, disabled = false, className }: ButtonProps) => {
    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('userID');
        localStorage.setItem('isLoggedIn', 'false');

        localStorage.removeItem('basket');

        onClick();
    };

    return (
        <button
            className={`logout-btn button button--green ${className || ''}`.trim()}
            onClick={handleLogout}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default LogoutButton;



/*import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const LogoutButton = ({ text, onClick, disabled = false, className }: ButtonProps ) => {
    return (
    <button
    className={`logout-btn button button--green ${className || ''}`.trim()}
    onClick={onClick}
    disabled={disabled}
    >
        {text}
    </button>
);
};

export default LogoutButton;*/


/* Författare: Andreas
*
* Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn
* 
* 
* 
*/