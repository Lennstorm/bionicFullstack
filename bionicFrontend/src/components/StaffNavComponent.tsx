import './styles/staffNavComponent.css'
import { Link } from 'react-router-dom';

const StaffNavComponent = () => {
    return (
        <nav className='staff-nav'>
            <Link to= "/orders/new" className='staff-nav-btn'>Nya ordrar</Link>
            <Link to= "/orders/locked" className='staff-nav-btn'>Låsta ordrar</Link>
            <Link to= "/orders/history" className='staff-nav-btn'>Orderhistorik</Link>
            <Link to= "/menu" className='staff-nav-btn'>Meny</Link>
            <Link to= "/inventory" className='staff-nav-btn'>Lager</Link>            
        </nav>
    )
}




export default StaffNavComponent;