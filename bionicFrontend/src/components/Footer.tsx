import '../components/styles/footer.css'
import facebookLogo from '../assets/facebook.svg';
import instaLogo from '../assets/insta.svg';
import emailLogo from '../assets/e-post.svg';
import handset from '../assets/telefon.svg';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='left-section'>
                <h3 className="footer-text">
                    Södra Torggatan 16
                </h3>
            </section>
            <section className='socials-section'>
                <img className='footer-icon' src={facebookLogo} alt="Facebook logo" />
                <img className='footer-icon' src={instaLogo} alt="Instagram logo" />
                <img className='footer-icon' src={emailLogo} alt="E-mail logo" />
            </section>
            <section className='right-section'>
                <img className='footer-icon telefonAdjust-right' src={handset} alt="Phone-handset" />
                <h3 className="footer-text">
                    010-4983020
                </h3>
            </section>

        </div>
    )
}

export default Footer



/* Författare: Ally
*
* 
* 
* 
* 
*/
