import '../components/styles/header.css';
import headerImg from '../assets/headerImg.png';
import basketLogo from '../assets/kundkorg.svg';
import LoginButton from '../components/LoginButton';
import companyTextLogo from '../assets/hemkocken_text.svg'

function HeaderMini() {
    return (
        <div style={{
            background: `linear-gradient(to right, white 20%, rgba(255, 255, 255, 0) 70%), url(${headerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className='headerMini-container'>

            <img className='headerMini-logo' src={companyTextLogo} alt="company logo" />

            <h1 className="headerMini-h1">TakeAway</h1>

            <img src={basketLogo} alt="basket symbol" className="kundkorg" />
            <LoginButton                 
                text="logga in" 
                onClick={() => console.log('Login Button!')} />



        </div>
    )
}

export default HeaderMini

/* Författare: Andreas
*
* 
* 
* 
* 
*/