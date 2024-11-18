/* Denna sida är skapad för att testa komponenter. Ska tas bort i slutlig version!! */

import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/testPage.css';
import BigButton from '../components/BigButton';
import RoundedButton from '../components/RoundedButton';
import OrderButton from '../components/OrderButton';
import LoginButton from '../components/LoginButton';

const TestPage = () => {
    return (
        <div className='testPage--wrapper'>
            <Header />
            <main className='content-container'>
            <div>
            <BigButton text="Big Button" onClick={() => console.log('Big Button!')} />
            <RoundedButton
                text="Rounded Button"
                onClick={() => console.log('Rounded Button!')}
                color="green"
                fontStyle="extra-bold"
            />
            <OrderButton text="Order Now" onClick={() => console.log('Order Button!')} />
            <LoginButton text="Log In" onClick={() => console.log('Login Button!')} />
        </div>
                

            </main>
            <Footer />
        </div>
    );
};

export default TestPage;






/* Författare: Andreas
*
* Denna är skapad för att testa komponenter. Ska tas bort i slutlig version!!
* 
* 
* 
*/