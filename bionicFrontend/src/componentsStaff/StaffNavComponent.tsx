import './styles/staffNavComponent.css'; 
import { Link, useLocation } from 'react-router-dom';

const StaffNavComponent = () => {
    const location = useLocation();
    return (
        <nav className='staff-nav'>
            <Link to="/staff" 
            className={`staff-nav-btn ${location.pathname === '/staff' ? 'active' : ''}`}>Staff Home
            </Link>
            <Link to="/waiter"             
            className={`staff-nav-btn ${location.pathname === '/waiter' ? 'active' : ''}`}>Servitör
            </Link>
            <Link to="/cook" 
            className={`staff-nav-btn ${location.pathname === '/cook' ? 'active' : ''}`}>Kock  
            </Link>
            <Link to="/lockedorders" 
            className={`staff-nav-btn ${location.pathname === '/lockedorders' ? 'active' : ''}`}>Låsta ordrar
            </Link>
            <Link to="/orderhistory" 
            className={`staff-nav-btn ${location.pathname === '/orderhistory' ? 'active' : ''}`}>Orderhistorik
            </Link>
            <Link to="/meny" 
            className={`staff-nav-btn ${location.pathname === '/meny' ? 'active' : ''}`}>Meny  
            </Link>
            <Link to="/stock" 
            className={`staff-nav-btn ${location.pathname === '/stock' ? 'active' : ''}`}>Lager
            </Link>
        </nav>
    );
}

export default StaffNavComponent;




/*
*Andreas
*
*modified by Alistair to match the nested routes in Routers.
*
*Andreas ändrat för dynamiskt tillägg av classname beroende på url
*/