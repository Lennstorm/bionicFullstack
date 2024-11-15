import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/aboutPage.css';
import companyLogo from '../assets/logo.svg';


const AboutPage = () => {
    return (
        <div className='aboutPage--wrapper'>
            <Header />
            <main className='aboutPage--main'>
                <article className='aboutPage--infoArticle'>
                    <img src={companyLogo} alt="company logo" />
                        <span>
                        <h1> Ursäkta röran!</h1>
                        <h3> (Vi bygger upp.)</h3>
                        <p>Här öppnar snart det senaste inom modern gammaldags husmanskost - Hemkocken!</p>
                        <p>Från och med fredag 6/12 kommer du kunna beställa stans bästa hemburna käk.</p>
                        <p>Snabbt och enkelt, med bara några klick, levererar vi förstklassig husmanskost.</p>
                        </span>

                </article>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;



/* Författare: Andreas
*
* 
* 
* 
* 
*/