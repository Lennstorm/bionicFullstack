import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const BigButton = ({ text, onClick, disabled = false, className }: ButtonProps) => {
    return (
        <button
        className={`button big-button button--blue ${className || ''}`.trim()}
        onClick={onClick}
        disabled={disabled}
        >
            {text}
        </button>
    );
};

export default BigButton;


/* Författare: Andreas
*
* 
* 
* 
* 
*/
