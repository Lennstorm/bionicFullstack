import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

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
* 
* 
* 
* 
*/