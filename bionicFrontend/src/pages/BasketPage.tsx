import BasketItem from "../components/BasketItem"
import BigButton from "../components/BigButton"
import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/basketPage.css'


const handleClick = () => {};


function BasketPage() {
    return (
        <div className="basketPage--wrapper">
            <Header />
            <main className='content-container'>
                <h2 className="">Din Kundkorg</h2>
                <BasketItem />
                <section className="totalPrice-section">
                    TotalPris: 
                </section>
                <BigButton
                text='Till Kassan'
                onClick={handleClick}
                disabled={false}
                className="tillKassan-btn"
                />

            </main>
            <Footer />
        </div>
    )
}

export default BasketPage

/*
Alistair
*/
