import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./styles/checkoutPage.css";
import { v4 as uuidv4 } from 'uuid';
import BigButton from "../components/BigButton";
import axios from "axios";
import config from "../config";
import { BasketItem } from '../../interface/interface'


const CheckoutPage = () => {
    const navigate = useNavigate();
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderID, setOrderID] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching basket data from localStorage");
        setIsLoading(true);
        try {
            const storedBasket = localStorage.getItem('basket');
            if (storedBasket) {
                const basketItems: BasketItem[] = JSON.parse(storedBasket);
                setBasketItems(basketItems);
                console.log("Basket data retrieved successfully from localStorage:", basketItems);
            } else {
                console.warn("No basket found in localStorage.");
                setBasketItems([]);
            }
        } catch (error) {
            console.error("Error fetching basket data from localStorage:", error);
            setError("An error occurred while retrieving basket data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const totalPrice = basketItems.reduce(
        (acc, item) => acc + item.item.price * item.count,
        0
    );
    console.log("Current total price:", totalPrice);

    const handleConfirmOrder = async () => {
        basketItems.forEach((item, index) => {
            console.log(`Basket Item ${index + 1}:`, item);
        });

        const orderItemID = uuidv4().substring(0, 5).toUpperCase();
        const userID = localStorage.getItem('userID') || 'guest';

        const orderDetails = {
            userID,
            basketItems: basketItems.map(item => ({
                menuItem: item.menuItem,
                articleName: item.item.articleName,
                count: item.count,
                specialRequest: item.specialRequest || '',
            })),
            orderStatus: 'väntande',
            orderLocked: false,
            createdAt: new Date().toISOString(),
            editedAt: new Date().toISOString(),
        };

        console.log('Order confirmation initiated.');
        console.log('Order details:', JSON.stringify(orderDetails, null, 2));

        try {
            const response = await axios.post(
                config.endpoints.orders.create,
                orderDetails,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Order confirmed successfully:', response.data);

            setOrderID(orderItemID);
            setOrderConfirmed(true);
            localStorage.removeItem('basket');
        } catch (error: any) {
            console.error('Error sending order to server:', error.response?.data || error.message);
            setError('An error occurred while sending the order to the server.');
        }
    };

    const handleGoBackToBasket = () => {
        console.log("Navigating back to basket page.");
        navigate("/basket");
    };

    const handleCloseConfirmation = () => {
        console.log("Closing confirmation modal and navigating to home.");
        navigate("/");
    };

    if (isLoading) {
        console.log("Loading basket items...");
        return <div>Laddar...</div>;
    }
    if (error) {
        console.error("An error occurred:", error);
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page checkoutPage--wrapper">
            <Header />
            <main className="checkout-main">
                <h2>Din Beställning</h2>

                <section className="order-summary">
                    {basketItems.length ? (
                        <ul>
                            {basketItems.map((item) => (
                                <li key={item.basketItemID} className="basket-item">
                                    <div className="basketItem-container">
                                        <img
                                            className="item-img"
                                            src={item.item.image}
                                            alt="menu item image"
                                        />
                                        <section className="mainContent-container">
                                            <section className="top-section">
                                                <article className="item-article basketItem-text">
                                                    {item.item.articleName}
                                                </article>
                                                <article className="price-article basketItem-text">
                                                    Pris: {item.item.price * item.count} SEK
                                                </article>
                                                <article className="counter-article basketItem-text">
                                                    <p>Antal: {item.count}</p>
                                                </article>
                                            </section>
                                            {item.specialRequest && (
                                                <p className="bottom-section">
                                                    Önskemål: {item.specialRequest}
                                                </p>
                                            )}
                                        </section>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Din kundkorg är tom.</p>
                    )}
                </section>

                <section className="totalPrice-section">
                    <p>
                        <strong>Totalpris:</strong> {totalPrice} SEK
                    </p>
                </section>

                <section className="checkout-actions">
                    <BigButton
                        text="Tillbaka till Varukorgen"
                        onClick={handleGoBackToBasket}
                        className="goBack-btn"
                    />
                </section>

                <BigButton
                    text="Bekräfta & Betala"
                    onClick={handleConfirmOrder}
                    disabled={!basketItems.length}
                    className="confirmOrder-btn"
                />

                {orderConfirmed && (
                    <div className="confirmation-modal">
                        <div className="modal-content">
                            <h2 className="confirmation-h2">Beställning Bekräftad!</h2>
                            <p>
                                Tack för din beställning. Din order är nu <strong>"väntande"</strong>.
                            </p>
                            {orderID && (
                                <p className="confirmation-text">
                                    Din beställningsnr: <strong>{orderID}</strong>
                                </p>
                            )}
                            <BigButton
                                text="Stäng"
                                onClick={handleCloseConfirmation}
                                className="close-btn"
                            />
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;




/*
Alistair
- Samling av functioner som hanterar sista steget för kunden med localstorage data som sen görs om till en order i orders-db-v4.
- Flyttat ut interface till interface.tsx
*/
