
import './styles/counter.css';
import { CounterProps } from '../../interface/interface'


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
Alistair: a counter

18/12 Ally flyttat interface till interface.tsx

*/

