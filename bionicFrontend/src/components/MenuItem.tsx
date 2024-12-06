import './styles/menu-item.css'
import { MenuItems } from '../interfaces.ts';
import { useState, useEffect } from 'react';
import ModalInfo from './ModalInfo.tsx';
import { useNavigate } from 'react-router-dom';

interface BasketItem {
  basketItemID: string;
  userID: string | null;
  menuItem: string;
  count: number;
  item: {
    price: number;
    quantity: number;
    image: string;
    articleName: string;
  };
  specialRequests: string;
  orderStatus: string;
}

interface MenuItemProps {
  item: MenuItems
}

function MenuItem({ item }: MenuItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const showInfo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToBasket = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userID = localStorage.getItem('userID') || 'guest';

    if (!isLoggedIn) {
      alert('You need to be logged in to place an order.');
      navigate('/');
      return;
    }

    const basketItemID = `basket-${userID}`;
    console.log('Adding to basket:', item);

    const basketItem: BasketItem = {
      basketItemID,
      userID,
      menuItem: item.MenuItemID,
      count: 1,
      item: {
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || '',
        articleName: item.articleName || '',
      },
      specialRequests: '',
      orderStatus: '',
    };

    const existingBasket = localStorage.getItem('basket');
    const basketItems: BasketItem[] = existingBasket ? JSON.parse(existingBasket) : [];

    const existingItemIndex = basketItems.findIndex(
      (bi) => bi.menuItem === basketItem.menuItem
    );

    if (existingItemIndex !== -1) {
      basketItems[existingItemIndex].count += 1;
    } else {
      basketItems.push(basketItem);
    }

    localStorage.setItem('basket', JSON.stringify(basketItems));
    alert('Item has been added to your basket.');
  };

  return (
    <>
      <section className="menu-container">
        <section className="menu-image">
          <img src={item.image} alt={item.articleName} />
        </section>
        <article className="menu-header-text">
          <h1>{item.articleName}</h1>
          <h2>Pris: {item.price} kr</h2>
        </article>
        <article className="menu-description">
          <h3>{item.description}</h3>
        </article>
        <section className='menu-information-btn'>
          <button onClick={showInfo}>Information</button>
        </section>
        <section className='menu-order-buttons'>
          <button className="menu-option-button"> V    G     Ä</button>
          <button onClick={addToBasket} className="menu-order-button">Beställ</button>
        </section>
      </section>
      {isModalOpen && (
        <ModalInfo item={item} closeModal={closeModal} userID={localStorage.getItem('userID') || 'guest'} />
      )}
    </>
  );
}

export default MenuItem;


/* Författare Peter
*
* ändringar av Andreas: Justerat h2 för utseende.
*
*Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn
*
*/