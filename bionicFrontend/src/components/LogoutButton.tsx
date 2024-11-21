import './styles/button.css';

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

export default LogoutButton;


/* Författare: Andreas
*
* 
* 
* 
* 
*/