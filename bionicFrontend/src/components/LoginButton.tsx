import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const LoginButton = ({ text, onClick, disabled = false, className }: ButtonProps ) => {
    return (
    <button
    className={`button login-button button--green ${className || ''}`.trim()}
    onClick={onClick}
    disabled={disabled}
    >
        {text}
    </button>
);
};

export default LoginButton;


/* Författare: Andreas
*
* 
* 
* 
* 
*/