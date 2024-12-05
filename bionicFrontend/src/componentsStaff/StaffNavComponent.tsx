import './styles/staffNavComponent.css';
import { Link } from 'react-router-dom';

const StaffNavComponent = () => {
    return (
        <nav className='staff-nav'>
            <Link to="/staff" className='staff-nav-btn'>Staff Home</Link>
            <Link to="/waiterpage" className='staff-nav-btn'>Servitörssidan</Link>
            <Link to="lockedorders" className='staff-nav-btn'>Låsta ordrar</Link>
            <Link to="orderhistory" className='staff-nav-btn'>Orderhistorik</Link>
            <Link to="cook" className='staff-nav-btn'>Meny</Link>
            <Link to="stock" className='staff-nav-btn'>Lager</Link>
        </nav>
    );
}

export default StaffNavComponent;



/*
Andreas

modified by Alistair to match the nested routes in Routers.
*/