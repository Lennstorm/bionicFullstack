import '../components/styles/header.css';
import headerImg from '../assets/headerImg.png';
import companyLogo from '../assets/logo.svg';
import basketLogo from '../assets/kundkorg.svg';

function Header() {
    return (
        <div style={{
            background: `linear-gradient(to right, white 20%, rgba(255, 255, 255, 0) 70%), url(${headerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className='header-container'>

            <img className='header-logo' src={companyLogo} alt="company logo" />

            <h1 className="header-h1">TakeAway</h1>

            <img src={basketLogo} alt="basket symbol" className="kundkorg" />
            <button className='login-btn'>login btn</button>



        </div>
    )
}

export default Header





/* Författare: Ally
*
* 
* 
* 
* 
*/
