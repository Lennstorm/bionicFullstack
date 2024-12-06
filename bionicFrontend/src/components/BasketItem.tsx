import { useEffect, useState } from 'react';
import Counter from './Counter';
import './styles/basketItem.css';
import Bin from '../assets/bin.svg';

interface BasketItem {
    basketItemID: string;
    menuItem: string;
    articleName?: string;
    price?: number;
    image?: string;
    count: number;
    specialRequest: string;
    addedAt?: string;
    item: {
        price: number;
        quantity: number;
        image: string;
        articleName: string;
    };
}

interface BasketItemProps {
    onTotalPriceChange: (total: number) => void;
    onBasketItemsChange: (items: BasketItem[]) => void;
}

const BasketItemComponent = ({ onTotalPriceChange }: BasketItemProps) => {
    const [items, setItems] = useState<BasketItem[]>([]);
//---------------------
    useEffect(() => {
        const basketItems = localStorage.getItem('basket');
        if (basketItems) {
            setItems(JSON.parse(basketItems));
        }
    }, []);
//--------------------
    const calculateTotalPrice = (items: BasketItem[]): number => {
        return items.reduce((acc, item) => acc + item.item.price * item.count, 0);
    };
//--------------
    const updateItemCount = (id: string, newCount: number): void => {
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.menuItem === id ? { ...item, count: newCount } : item
            );
            localStorage.setItem('basket', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };
//--------------

//-------------
    const updateSpecialRequest = (id: string, request: string): void => {
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.menuItem === id ? { ...item, specialRequest: request } : item
            );
            localStorage.setItem('basket', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };
//--------------------

    const handleRemoveItem = (id: string): void => {
        const itemToDelete = items.find((item) => item.menuItem === id);
        if (!itemToDelete) return;

        const confirmDelete = window.confirm(
            `Är du säker på att du vill ta bort "${itemToDelete.item.articleName}" från korgen?`
        );
//------------
        if (confirmDelete) {
            const updatedItems = items.filter((item) => item.menuItem !== id);
            setItems(updatedItems);
            localStorage.setItem('basket', JSON.stringify(updatedItems));
            console.log(`Item with id ${id} removed.`);
            //--------------
        }
    };

    useEffect(() => {
        const total = calculateTotalPrice(items);
        onTotalPriceChange(total);
    }, [items, onTotalPriceChange]);

    if (items.length === 0)
        return <div className="cartEmpty-message">Din kundkorg är tom.</div>;

    return (
        <div className="basketItems-container">
            {items.map((item) => (
                <div key={item.basketItemID} className="basketItem-container">
                    <img className="item-img" src={item.item.image} alt="menu item image" />

                    <section className="mainContent-container">
                        <section className="top-section">
                            <article className="item-article basketItem-text">
                                {item.item.articleName}
                            </article>
                            <article className="counter-article basketItem-text">
                                <p>Antal</p>
                                <Counter
                                    count={item.count}
                                    onIncrement={() => updateItemCount(item.menuItem, item.count + 1)}
                                    onDecrement={() => updateItemCount(item.menuItem, Math.max(1, item.count - 1))}
                                />
                            </article>
                            <article className="price-article basketItem-text">
                                Pris: {item.item.price * item.count} SEK
                            </article>
                        </section>

                        <input
                            className="bottom-section"
                            type="text"
                            placeholder="Särskilt önskemål/ anpassning av rätten. skriv här...."
                            onChange={(e) => updateSpecialRequest(item.menuItem, e.target.value)}
                            value={item.specialRequest}
                        />
                    </section>

                    <img
                        className="bin"
                        src={Bin}
                        alt="bin image"
                        onClick={() => handleRemoveItem(item.menuItem)}
                    />
                </div>
            ))}
        </div>
    );
};

export default BasketItemComponent;



/*
Alistair
Peter
*/
