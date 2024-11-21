import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./styles/checkoutPage.css";

interface BasketItem {
    basketItemID: string;
    menuItem: string;
    menuItemName: string;
    price: number;
    image: string;
    count: number;
    specialRequest: string;
    addedAt: string;
}

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const userID = location.state?.userID || "AB123"; // Default userID for testing

    // Fetch basket data for the user
    useEffect(() => {
        const fetchBasketData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/data.json");
                const userBasket = response.data.baskets.find(
                    (basket: { userID: string }) => basket.userID === userID
                );

                if (userBasket) {
                    setBasketItems(userBasket.basketItems);
                } else {
                    throw new Error("No basket found for the specified user.");
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBasketData();
    }, [userID]);

    // Calculate total price
    const totalPrice = basketItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );

    // Confirm order logic
    const handleConfirmOrder = () => {
        const orderDetails = {
            orderItem: Math.random().toString(36).substring(2, 7).toUpperCase(),
            userID,
            orderContents: basketItems,
            totalPrice,
            orderStatus: "väntande",
            orderLocked: false,
            createdAt: new Date().toISOString(),
            editedAt: new Date().toISOString(),
        };

        console.log("Order Created:", orderDetails);

        setOrderConfirmed(true);
    };

    const handleGoBackToBasket = () => {
        navigate("/basket");
    };

    const handleCloseConfirmation = () => {
        navigate("/");
    };

    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="checkoutPage--wrapper">
            <Header />
            <main className="checkout-main">
                <h2>Orderöversikt</h2>

                <section className="order-summary">
                    <h3>Dina Varor</h3>
                    {basketItems.length ? (
                        <ul>
                        {basketItems.map((item) => (
                            <li key={item.basketItemID} className="order-item">
                                <div className="basketItem-container">
                                    <img
                                        className="item-img"
                                        src={item.image}
                                        alt="menu item image"
                                    />
                                    <section className="mainContent-container">
                                        <section className="top-section">
                                            <article className="item-article basketItem-text">
                                                {item.menuItemName}
                                            </article>
                                            <article className="price-article basketItem-text">
                                                Pris: {item.price * item.count} SEK
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

                <section className="total-price">
                    <p>
                        <strong>Totalpris:</strong> {totalPrice} SEK
                    </p>
                </section>

                <section className="checkout-actions">
                    <button
                        onClick={handleConfirmOrder}
                        disabled={!basketItems.length}
                        className="confirm-order-btn"
                    >
                        Bekräfta och betala
                    </button>
                    <button onClick={handleGoBackToBasket} className="go-back-btn">
                        Tillbaka till varukorgen
                    </button>
                </section>
                {orderConfirmed && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h2>Beställning Bekräftad!</h2>
                        <p>
                            Tack för din beställning. Din order är nu {`"väntande"`}.
                        </p>
                        <button onClick={handleCloseConfirmation}>Stäng</button>
                    </div>
                </div>
            )}
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
