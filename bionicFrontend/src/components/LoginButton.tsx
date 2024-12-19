import './styles/button.css';
import { ButtonProps } from '../../interface/interface'


const LoginButton = ({ text, onClick, disabled = false, className }: ButtonProps ) => {
    return (
    <button
    className={`login-btn button button--green ${className || ''}`.trim()}
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
* 18/12 Ally flyttat interface till interface.tsx
* 
* 
* 
*/