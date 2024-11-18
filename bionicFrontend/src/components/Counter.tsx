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
            <section >
                <button className='counter-button' onClick={decrement}>
                    -
                </button>
            </section>
            <section className='count'>
                {count}
            </section>
            <section >
                <button className='counter-button' onClick={increment}>
                    +
                </button>
            </section>
        </div>
    )
}

export default Counter

/*
Alistair
*/

