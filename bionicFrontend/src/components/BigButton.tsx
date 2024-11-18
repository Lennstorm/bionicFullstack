import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const BigButton = ({ text, onClick, disabled = false }: ButtonProps) => {
    return (
        <button
        className='button big-button button--blue'
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
