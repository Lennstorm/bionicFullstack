import './styles/button.css';
import { ButtonProps } from '../../interface/interface'


const RoundedButton = ({
    text,
    onClick,
    disabled = false,
    color = 'blue',
    fontStyle = 'bold',
    className,
}: ButtonProps) => {
    return (
        <button
        className={`button rounded-button button--${color} rounded-button--${fontStyle} ${className || ''}`.trim()}
        onClick={onClick}
        disabled={disabled}
        >
            {text}
        </button>

    )
}

export default RoundedButton;


/* Författare: Andreas
*
* 18/12 Ally flyttat interface till interface.tsx
* 
* 
* 
*/