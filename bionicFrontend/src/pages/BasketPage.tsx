import BasketItem from "../components/BasketItem";
import BigButton from "../components/BigButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import './styles/basketPage.css';
import { useState } from "react";

const BasketPage = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const updateTotalPrice = (newTotalPrice: number) => {
        setTotalPrice(newTotalPrice);
    };

    const handleClick = () => {
    };

    return (
        <div className="basketPage--wrapper">
            <Header />
            <main className="content-container">
                <h2>Din Kundkorg</h2>
                <BasketItem onTotalPriceChange={updateTotalPrice} />

                {totalPrice > 0 && (
                    <section className="totalPrice-section">
                        <p>Totalpris: {totalPrice} SEK</p>
                    </section>
                )}

                <BigButton
                    text="Till Kassan"
                    onClick={handleClick}
                    disabled={false}
                    className="tillKassan-btn"
                />
            </main>
            <Footer />
        </div>
    );
};

export default BasketPage;








/*import BasketItem from "../components/BasketItem"
import BigButton from "../components/BigButton"
import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/basketPage.css'


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
