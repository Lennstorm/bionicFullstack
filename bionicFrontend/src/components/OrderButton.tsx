import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const OrderButton = ({ text, onClick, disabled = false }: ButtonProps ) => {
    return (
    <button
    className='button order-button button--green'
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