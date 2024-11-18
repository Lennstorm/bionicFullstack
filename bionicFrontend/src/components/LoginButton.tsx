import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const LoginButton = ({ text, onClick, disabled = false }: ButtonProps ) => {
    return (
    <button
    className='button login-button button--green'
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