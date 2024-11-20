import BasketItem from '../components/BasketItem';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/homePage.css';

const HomePage = () => {
    return (
        <div className='homePage--wrapper'>
            <Header />
            <main className='content-container'>
                <BasketItem />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;






/* Författare: Andreas
* Alistair
* 
* 
* 
* 
*/