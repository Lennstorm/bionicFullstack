import './styles/button.css';
import { ButtonProps } from '../../interface/interface'


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
* 18/12 Ally flyttat interface till interface.tsx
* 
* 
* 
*/
