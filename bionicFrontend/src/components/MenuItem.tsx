import './styles/menu-item.css'
import { MenuItems } from '../interfaces.ts';
import { useState, useEffect} from 'react';
import ModalInfo from './ModalInfo.tsx';
import { userInfo } from 'os';

interface MenuItemProps {
  item: MenuItems
 }


function MenuItem({ item }: MenuItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   
  
  return (
    <>
      <section className="menu-container">
        <section className="menu-image">
          <img src={item.image} />
        </section>
        <article className="menu-header-text">
          <h1>{item.articleName}</h1>
          <h2>Pris : {item.price} Sek</h2>
        </article>
        <article className="menu-description">
          <h3>{item.description}</h3>

        </article>
        <section className='menu-information-btn'>
          <button onClick={showInfo}>Information</button>
        </section>
        <section className='menu-order-buttons'>
          <button className="menu-option-button"> V    G     Ä</button>
          <button className="menu-order-button">Beställ</button>
        </section>
      </section>
      {isModalOpen && (
         <ModalInfo item={item} closeModal={closeModal} userID={'AB123'} />
      )}
    </>
  )
}

export default MenuItem

// *********koden skriven av Peter**********