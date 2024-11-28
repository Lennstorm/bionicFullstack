import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasketItem from "../components/BasketItem";
import BigButton from "../components/BigButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import './styles/basketPage.css';

const BasketPage = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [basketItems, setBasketItems] = useState<any[]>([]);
    const userID = 'AB123';
    const navigate = useNavigate();

    const updateTotalPrice = (newTotalPrice: number) => {
        setTotalPrice(newTotalPrice);
    };

    const handleClick = () => {
        navigate("/checkout", {
            state: {
                userID,
                basketItems,
                totalPrice,
            },
        });
    };

    return (
        <div className="page basketPage--wrapper">
            <Header />
            <main className="basket-main">
                <h2 className="h2-basketPage">Din Varukorg</h2>

                <BasketItem
                    onTotalPriceChange={updateTotalPrice}
                    onBasketItemsChange={setBasketItems}
                />

                {totalPrice > 0 && (
                    <section className="totalPrice-section">
                        <p>Totalpris: {totalPrice} SEK</p>
                    </section>
                )}

                {totalPrice > 0 && (
                    <BigButton
                        text="Till Kassan"
                        onClick={handleClick}
                        disabled={false}
                        className="tillKassan-btn"
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default BasketPage;


/*
Alistair
*/
