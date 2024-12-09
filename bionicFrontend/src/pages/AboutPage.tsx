import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/aboutPage.css';
import companyLogo from '../assets/logo.svg';


const AboutPage = () => {
    return (
        <div className='page aboutPage--wrapper'>
            <Header />
            <main className='aboutPage--main'>
                <article className='aboutPage--infoArticle'>
                    <img src={companyLogo} alt="company logo" />
                    <span className='aboutPage--infoArticle-aboutText'>
                        <h1> Välkommen till Hemkocken!</h1>
                        
                        <p>Snabbt och enkelt, med bara några klick, levererar vi förstklassig husmanskost.</p>
                        
                        <p>Hemkocken är den nya spännande take away-restaurangen som sätter svensk husmanskost i centrum. Med vårt motto "så gott som hemlagat" vill vi bjuda in dig till en värld av klassiska smaker, tillagade med kärlek och omtanke. Här hittar du allt från de robusta köttbullarna och det lena potatismoset till fläskpannkakor som påminner om barndomens trygghet. Vår filosofi är enkel: äkta smaker som smakar som hemma, men utan stressen att stå vid spisen själv.
                        </p>
                        <p>Det som verkligen gör Hemkocken unikt är vår moderna och användarvänliga web-app, som just nu utvecklas av ett hängivet team. Här kommer du snabbt och enkelt kunna bläddra igenom menyn, välja dina favoriträtter och lägga din beställning med några få klick. Vi vet att tid är dyrbart, och därför har vi satsat på att göra hela processen så smidig som möjligt. Från beställning till leverans är vårt mål att ge dig en förstklassig upplevelse som sparar tid, men aldrig kompromissar med kvaliteten.
                        </p>
                        <p>På Hemkocken värdesätter vi de svenska grundsmakerna och hyser stor kärlek till de enkla, robusta rätterna. Husmanskost är mer än bara mat; det är en del av vår kultur, fylld med traditioner och minnen. Våra rätter är noggrant tillagade med de bästa råvarorna och kryddade med omsorg. Vi tror att matlagning är en konst, och med varje rätt vi serverar vill vi förmedla den känslan av omtanke och värme.
                        </p>
                        <p>Hemkocken är inte bara en restaurang - det är en lösning för den moderna familjen, den upptagna yrkesmänniskan eller studenterna som längtar efter något gott och rejält. Vi vill göra det enkelt att njuta av en riktig måltid, oavsett hur hektisk din vardag är. Vår meny är noggrant utformad för att ge något för alla – från klassiker som raggmunk och ärtsoppa till moderna tolkningar av traditionella rätter.
                        </p>
                        <p>Att skapa en stark koppling till våra kunder är centralt för oss. Vi tror att äkta matupplevelser förenar människor, och vi vill vara en del av din vardag – oavsett om det handlar om en snabb lunch, en familjemiddag eller bara något extra gott en fredagkväll.
                        </p>
                        <p>Hemkocken handlar om att förena det bästa av två världar: tradition och innovation. Genom att kombinera klassisk svensk husmanskost med modern teknologi skapar vi en unik upplevelse som hyllar det förflutna samtidigt som vi blickar mot framtiden. Vi är stolta över att kunna erbjuda dig något som är både enkelt och utsökt, med en personlig touch som gör att du alltid känner dig som hemma. Välkommen till Hemkocken – där varje måltid är en hyllning till det svenska köket! </p>



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