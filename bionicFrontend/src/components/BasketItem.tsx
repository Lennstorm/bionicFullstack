import { useEffect, useState } from 'react';
import axios from 'axios';
import Counter from './Counter';
import './styles/basketItem.css';
import Bin from '../assets/bin.svg';





interface BasketItem {
    basketItemID: string;
    menuItem: string;
    articleName: string;
    price: number;
    image: string;
    count: number;
    specialRequest: string;
    addedAt?: string;
}

interface BasketProps {
    userID: string;
    basketItemID: string;
    createdAt: string;
    basketItems: BasketItem[];
}

interface ApiResponse {
    success: boolean;
    data: BasketProps[];
}

interface BasketItemProps {
    onTotalPriceChange: (total: number) => void;
    onBasketItemsChange: (items: BasketItem[]) => void;
}

const BasketItem = ({ onTotalPriceChange }: BasketItemProps) => {
    const [items, setItems] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    

    const userID = 'AB123'; // userID's: AB123, AB124, AB125

    useEffect(() => {
        const fetchBasketItems = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/basket');
                const{data: apiResponse} = response
                console.log('API Response:',apiResponse)

                const { success, data: baskets } = apiResponse as ApiResponse;

                if (!success) {
                    console.error('API call unsuccessful');
                    return;
                }

                if(!Array.isArray(baskets)){
                   console.log('Expected baskets to be an array, but got:', typeof baskets)
                   return
                }

                const userBasket = baskets.find((basket: BasketProps) => basket.userID === userID);
                if (userBasket) {
                    setItems(userBasket.basketItems);
                } else {
                    console.error('No basket found for user:', userID);
                }
            } catch (error) {
                console.error('Error fetching cart items', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBasketItems();
    }, [userID]);

    const calculateTotalPrice = (items: BasketItem[]): number => {
        return items.reduce((acc, item) => acc + item.price * item.count, 0);
    };

    const updateItemCount = async (id: string, newCount: number): Promise<void> => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.menuItem === id ? { ...item, count: newCount } : item
            )
        );
    };

    const updateSpecialRequest = (id: string, request: string): void => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.menuItem === id ? { ...item, specialRequest: request } : item
            )
        );
    };

    const handleRemoveItem = async (id: string): Promise<void> => {
        const itemToDelete = items.find((item) => item.menuItem === id);
        if (!itemToDelete) return;

        const confirmDelete = window.confirm(
            `Är du säker på att du vill ta bort "${itemToDelete.articleName}" från korgen?`
        );

        if (confirmDelete) {
            setItems((prevItems) => prevItems.filter((item) => item.menuItem !== id));
            console.log(`Item with id ${id} removed.`);
        }
    };

    useEffect(() => {
        const total = calculateTotalPrice(items);
        onTotalPriceChange(total);
    }, [items, onTotalPriceChange]);
    if (isLoading) return <div>Laddar....</div>;
    if (items.length === 0) return <div className="cartEmpty-message">Din kundkorg är tom.</div>;

    return (
        <div className="basketItems-container">
            {items.map((item) => {
         const {item:menuItem} = item
        return (
       
                <div key={item.basketItemID} className="basketItem-container">
                    <img className="item-img" src={menuItem.image} alt="menu item image" />

                    <section className="mainContent-container">
                        <section className="top-section">
                            <article className="item-article basketItem-text">
                                {menuItem.articleName}
                            </article>
                            <article className="counter-article basketItem-text">
                                <p>antal</p>
                                <Counter
                                    count={item.count}
                                    onIncrement={() => updateItemCount(item.menuItem, item.count + 1)}
                                    onDecrement={() => updateItemCount(item.menuItem, Math.max(0, item.count - 1))}
                                />
                            </article>
                            <article className="price-article basketItem-text">
                                Pris: {menuItem.price * item.count} SEK
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
            )
})}
        </div>
    );
};

export default BasketItem;


/*
Alistair
Peter
*/
