import Counter from './Counter';
import './styles/basketItem.css';
import Bin from '../assets/bin.svg';
import { useEffect, useState } from 'react';

interface BasketItemProps {
    id: number;
    name: string;
    price: number;
    image: string;
}


function BasketItem() {
    const [items, setItems] = useState<BasketItemProps[]>([]);

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();

                if(data.cartItems && Array.isArray(data.cartItems)) {
                    setItems(data.cartItems);
                }
            } catch (error) {
                console.error('Fel vid hämtning av korgartikel', error);               
            }
        }

        fetchItemsData();
    }, []);

    if (items.length === 0) {
        return <div>Laddar....</div>
    }

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
                                <Counter />
                            </article>
                            <article className="price-article basketItem-text">
                                Pris: {item.price} SEK
                            </article>
                        </section>

                        <input
                            className="bottom-section"
                            type="text"
                            placeholder="Särskilt önskemål/ anpassning av rätten. skriv här...."
                        />
                    </section>

                    <img className="bin" src={Bin} alt="bin image" />
                </div>
            ))}
        </div>
    )
}

export default BasketItem
