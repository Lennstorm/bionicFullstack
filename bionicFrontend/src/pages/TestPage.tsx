/* Denna sida är skapad för att testa komponenter. Ska tas bort i slutlig version!! */

import Footer from '../components/Footer';
/* import Header from '../components/Header'; */
import './styles/testPage.css';
import BigButton from '../components/BigButton';
import RoundedButton from '../components/RoundedButton';
import OrderButton from '../components/OrderButton';
import LoginButton from '../components/LoginButton';
import Header from '../components/Header';

// import MenuSortComponent from '../components/MenuSortComponent';

const TestPage = () => {
    return (
        <div className='page testPage--wrapper'>
            <Header />
            <main className='content-container'>
                <div className='test-wrapper'>
                    
                    <BigButton 
                        text="BigButton" 
                        onClick={() => console.log('Big Button!')}
                        disabled={true}
                        />
                    <BigButton text="Betala" onClick={() => console.log('Big Button!')} />
                    <BigButton text="BigButton" onClick={() => console.log('Big Button!')} />
                    <BigButton text="Till Kassan" onClick={() => console.log('Big Button!')} />
                    <RoundedButton

                        text="Ordern Tillagad!"
                        onClick={() => console.log('Rounded Button!')}
                        color="green"
                        fontStyle="extra-bold"
                    />
                    <RoundedButton
                        text="Läst!"
                        onClick={() => console.log('Rounded Button!')}
                        color="blue"
                        fontStyle="extra-bold"
                    />
                    <RoundedButton
                        text="Lägg i varukorgen!"
                        onClick={() => console.log('Rounded Button!')}
                        color="blue"
                        fontStyle="extra-bold"
                    />
                    <OrderButton text="Beställ" onClick={() => console.log('Order Button!')} />
                    <LoginButton text="logga in" onClick={() => console.log('Login Button!')} />
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