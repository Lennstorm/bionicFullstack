import './styles/menu-item.css'
import { MenuItems } from '../interfaces.ts';
import { useState, useEffect } from 'react';
import ModalInfo from './ModalInfo.tsx';
import { useNavigate } from 'react-router-dom';

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

  const showCart = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert('You need to be logged in to place an order.');
      navigate('/');
      return;
    }
    navigate('/basket');
  };

  return (
    <>
      <section className="menu-container">
        <section className="menu-image">
          <img src={item.image} />
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
          <button onClick={showCart} className="menu-order-button">Beställ</button>
        </section>
      </section>
      {isModalOpen && (
        <ModalInfo item={item} closeModal={closeModal} userID={localStorage.getItem('userID') || 'guest'} />
      )}
    </>
  );
}

export default MenuItem;


/*import './styles/menu-item.css'
import { MenuItems } from '../interfaces.ts';
import { useState, useEffect} from 'react';
import ModalInfo from './ModalInfo.tsx';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  item: MenuItems
 }


function MenuItem({ item }: MenuItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Förhindra skrollning
    } else {
      document.body.style.overflow = 'auto'; // Tillåt skrollning
    }

    // Rensa upp när komponenten avmonteras
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);


  const showInfo = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const showCart = () => {
   navigate('/basket')
  }
   
  
  return (
    <>
      <section className="menu-container">
        <section className="menu-image">
          <img src={item.image} />
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
          <button onClick ={showCart} className="menu-order-button">Beställ</button>
        </section>
      </section>
      {isModalOpen && (
         <ModalInfo item={item} closeModal={closeModal} userID={'AB123'} />
      )}
    </>
  )
}

export default MenuItem*/

/* Författare Peter
*
* ändringar av Andreas: Justerat h2 för utseende.
*
*Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn
*
*/