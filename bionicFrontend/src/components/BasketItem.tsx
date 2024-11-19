import Counter from './Counter';
import './styles/basketItem.css';
import Bin from '../assets/bin.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { log } from 'console';

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
                const response = await axios.get('/data.json');
                const data = response.data;

                if (data.cartItems && Array.isArray(data.cartItems)) {
                    setItems(data.cartItems);
                }
            } catch (error) {
                console.error('Fel vid hämtning av korgartikel', error);
            }
        }

        fetchItemsData();
    }, []);

    const handleRemoveItem = (id: number) => {
        const itemToDelete = items.find((item) => item.id === id);
        if (!itemToDelete) return;

        const confirmDelete = window.confirm(
            `Är du säker på att du vill ta bort "${itemToDelete.name}" från korgen?`
        );

        if (confirmDelete) {
            setItems((prevItems) => prevItems.filter((item) => item.id !==id));
            console.log(`Item med id ${id} rederat från kundkorgen.`);
            
        }
    }

    if (items.length === 0) {
        return <div className='cartEmpty-message'>Din kundkorg är tom.</div>
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

                    <img
                        className="bin"
                        src={Bin}
                        alt="bin image"
                        onClick={() => handleRemoveItem(item.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default BasketItem
