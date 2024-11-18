import { useState } from 'react';
import './styles/counter.css';

const Counter = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(count + 1);

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }


    return (

        <div className='counter-container'>
            <button className='counter-button' onClick={decrement}>
                -
            </button>

            <section className='count' id='count'>
                {count}
            </section>

            <button className='counter-button' onClick={increment}>
                +
            </button>
        </div>
    )
}

export default Counter

/*
Alistair
*/

