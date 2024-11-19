import Counter from './Counter';
import './styles/basketItem.css';
import Bin from '../assets/bin.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BasketItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
    count: number;
}

const BasketItem = () => {
    const [items, setItems] = useState<BasketItemProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const response = await axios.get('/data.json');
                const data = response.data;
                if (data.cartItems && Array.isArray(data.cartItems)) {
                    setItems(data.cartItems);
                }
            } catch (error) {
                console.error('Error fetching cart items', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = (id: number): void => {
        const itemToDelete = items.find((item) => item.id === id);
        if (!itemToDelete) return;

        const confirmDelete = window.confirm(
            `Är du säker på att du vill ta bort "${itemToDelete.name}" från korgen?`
        );

        if (confirmDelete) {
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            console.log(`Item with id ${id} removed.`);
        }
    };

    const updateItemCount = (id: number, newCount: number): void => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, count: newCount } : item
            )
        );
    };

    if (isLoading) return <div>Laddar....</div>;
    if (items.length === 0) return <div className="cartEmpty-message">Din kundkorg är tom.</div>;

    return (
        <div className="basketItems-container">
            {items.map((item) => (
                <div key={item.id} className="basketItem-container">
                    <img className="item-img" src={item.image} alt="menu item image" />

                    <section className="mainContent-container">
                        <section className="top-section">
                            <article className="item-article basketItem-text">
                                {item.name}
                            </article>
                            <article className="counter-article basketItem-text">
                                <p>antal</p>
                                <Counter
                                    count={item.count}
                                    onIncrement={() => updateItemCount(item.id, item.count + 1)}
                                    onDecrement={() => updateItemCount(item.id, Math.max(0, item.count - 1))}
                                />
                            </article>
                            <article className="price-article basketItem-text">
                                Totalpris: {item.price * item.count} SEK
                            </article>
                        </section>

                        <input
                            className="bottom-section"
                            type="text"
                            placeholder="Särskilt önskemål/ anpassning av rätten. skriv här...."
                        />
                    </section>

                    <img
                        className="bin"
                        src={Bin}
                        alt="bin image"
                        onClick={() => handleRemoveItem(item.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default BasketItem;

/*
Alistair
*/
