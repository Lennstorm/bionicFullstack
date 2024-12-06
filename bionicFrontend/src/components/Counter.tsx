
import './styles/counter.css';

interface CounterProps {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const Counter = ({ count, onIncrement, onDecrement }: CounterProps) => {


    return (

        <div className='counter-container'>
            <button className='counter-button' onClick={onDecrement}>
                -
            </button>

            <section className='count' id='count'>
                {count}
            </section>

            <button className='counter-button' onClick={onIncrement}>
                +
            </button>
        </div>
    )
}

export default Counter

/*
Alistair
*/

