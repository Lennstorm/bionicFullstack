import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./styles/checkoutPage.css";
import { v4 as uuidv4 } from 'uuid';
import BigButton from "../components/BigButton";

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

//--- OBS! funktionalitet för delete av basket när en order har skapat måste läggas till. ---//

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [orderID, setOrderID] = useState<string | null>(null); // Store the order ID

    const userID = location.state?.userID || "AB123";

    useEffect(() => {
        const fetchBasketData = async () => {
            console.log("Fetching basket data for userID:", userID);
            setIsLoading(true);
            try {
                const response = await axios.get("/data.json");
                console.log("Basket data fetched successfully:", response.data);

                const userBasket = response.data.baskets.find(
                    (basket: { userID: string }) => basket.userID === userID
                );

                if (userBasket) {
                    console.log("User basket found:", userBasket);
                    setBasketItems(userBasket.basketItems);
                } else {
                    console.warn("No basket found for the specified user:", userID);
                    throw new Error("No basket found for the specified user.");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error fetching basket data:", error.message);
                    setError(error.message);
                } else {
                    console.error("Unknown error occurred during fetch.");
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
                console.log("Finished fetching basket data.");
            }
        };

        fetchBasketData();
    }, [userID]);

    // Calculate total price of all items in the basket
    const totalPrice = basketItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );
    console.log("Current total price:", totalPrice);

    const handleConfirmOrder = () => {
        const orderItemID = uuidv4().substring(0, 5).toUpperCase(); // Generate a 5-character order ID
        
        const orderDetails = {
            orderItem: orderItemID,
            userID,
            orderContents: basketItems,
            totalPrice,
            orderStatus: "väntande",
            orderLocked: false,
            createdAt: new Date().toISOString(),
            editedAt: new Date().toISOString(),
        };

        console.log("Order confirmation initiated.");
        console.log("Order details:", orderDetails);

        // Store the generated order ID in the state
        setOrderID(orderItemID);

        console.log("Order confirmed successfully.");
        setOrderConfirmed(true); // Mark the order as confirmed
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

                <section className="totalPrice-section">
                    <p>
                        <strong>Totalpris:</strong> {totalPrice} SEK
                    </p>
                </section>

                <section className="checkout-actions">
                    <BigButton
                        text="Tillbaka till Varukorgen"
                        onClick={handleGoBackToBasket} className="goBack-btn" />
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
                                Tack för din beställning. Din order är nu <strong>{`"väntande"`}</strong>.
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
*/
