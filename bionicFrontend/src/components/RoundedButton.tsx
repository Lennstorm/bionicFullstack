import './styles/button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'blue' | 'green';
    fontStyle?: 'bold' | 'extra-bold';
    className?: string;
}

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
* 
* 
* 
* 
*/