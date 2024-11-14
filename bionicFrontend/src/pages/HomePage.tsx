import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/homePage.css';

const HomePage = () => {
    return <div className='homepage--wrapper'>
        <Header />
        <main>
            <h1>Hemkocken MAT!</h1>
            <h1>This is HomePage</h1>
        </main>

        <Footer />
    </div>;
};

export default HomePage;