import './styles/button.css';
import { ButtonProps } from '../../interface/interface'


const OrderButton = ({ text, onClick, disabled = false, className }: ButtonProps ) => {
    return (
    <button
    className={`button order-button button--green ${className || ''}`.trim()}
    onClick={onClick}
    disabled={disabled}
    >
        {text}
    </button>
);
};

export default OrderButton;


/* Författare: Andreas
*
* 18/12 Ally flyttat interface till interface.tsx
* 
* 
* 
*/