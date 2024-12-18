import './styles/button.css';
import { ButtonProps } from '../../interface/interface'

// flyttat till interface.tsx
// 11
/*interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}*/

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
