import { useEffect, useState } from 'react';
import './styles/checkoutBasketItem.css';

interface BasketItem {
  basketItemID: string;
  menuItem: string;
  menuItemName?: string;
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

interface CheckoutBasketProps {
  userID: string;
}

const CheckoutBasketItem = ({ userID }: CheckoutBasketProps) => {
  const [items, setItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    // Fetch basket items from localStorage
    const basketItems = localStorage.getItem('basket');
    if (basketItems) {
      setItems(JSON.parse(basketItems));
    }
  }, [userID]);

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
              <article className="price-article basketItem-text">
                Pris: {item.item.price * item.count} SEK
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


/*
Alistair
*/
