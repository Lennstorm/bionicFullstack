import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/basketItem.css';

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

interface CheckoutBasketProps {
    userID: string;
}

const CheckoutBasketItem = ({ userID }: CheckoutBasketProps) => {
    const [items, setItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBasketItems = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const response = await axios.get('/data.json');
                const data = response.data;

                const userBasket = data.baskets.find((basket: { userID: string }) => basket.userID === userID);
                if (userBasket) {
                    setItems(userBasket.basketItems);
                } else {
                    throw new Error('No basket found for the specified user.');
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBasketItems();
    }, [userID]);

    if (isLoading) return <div>Laddar....</div>;
    if (error) return <div>Error: {error}</div>;
    if (items.length === 0) return <div className="cartEmpty-message">Din kundkorg är tom.</div>;

    return (
        <div className="basketItems-container">
            {items.map((item) => (
                <div key={item.basketItemID} className="basketItem-container">
                    <img className="item-img" src={item.image} alt="menu item image" />

                    <section className="mainContent-container">
                        <section className="top-section">
                            <article className="item-article basketItem-text">
                                {item.menuItemName}
                            </article>
                            <article className="price-article basketItem-text">
                                Pris: {item.price} SEK
                            </article>
                            <article className="counter-article basketItem-text">
                                <p>Antal: {item.count}</p>
                            </article>
                        </section>
                        {item.specialRequest && (
                            <p className="bottom-section">Önskemål: {item.specialRequest}</p>
                        )}
                    </section>
                </div>
            ))}
        </div>
    );
};

export default CheckoutBasketItem;
