import { MenuItems } from '../interfaces.ts';
import Counter from './Counter.tsx';
import OrderButton from './OrderButton.tsx';
import './styles/modal-info.css';
import { useState, useEffect } from 'react';

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

interface ModalInfoProps {
  item: MenuItems;
  closeModal: () => void;
  userID: string | null;
}

function ModalInfo({ item, closeModal, userID }: ModalInfoProps) {
  const [count, setCount] = useState<number>(0);
  const [btndisabled, setBtnDisabled] = useState<boolean>(false);

  useEffect(() => {
    setCount(0);
    setBtnDisabled(false);
  }, [item]);

  const onIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const onDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const orderFromModal = () => {
    console.log('Order from modal:', item);
    console.log('Quantity ordered:', count);
  };

  const addToBasket = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userID = localStorage.getItem('userID') || 'guest';

    if (!isLoggedIn) {
      alert('You need to be logged in to add items to the basket.');
      return;
    }

    if (count <= 0) {
      alert('Välj antal varor att lägga till');
      return;
    }

    const basketItemID = `basket-${userID}`;
    console.log('Full item object:', item);

    const basketItem: BasketItem = {
      basketItemID: basketItemID,
      userID,
      menuItem: item.MenuItemID,
      count: count,
      item: {
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || '',
        articleName: item.articleName || '',
      },
      specialRequests: '',
      orderStatus: '',
    };
    console.log('det här är basketitem', basketItem);

    //---------------------
    const existingBasket = localStorage.getItem('basket');
    const basketItems: BasketItem[] = existingBasket ? JSON.parse(existingBasket) : [];

    const existingItemIndex = basketItems.findIndex(
      (bi) => bi.menuItem === basketItem.menuItem
    );

    if (existingItemIndex !== -1) {
      basketItems[existingItemIndex].count += basketItem.count;
    } else {
      basketItems.push(basketItem);
    }

    localStorage.setItem('basket', JSON.stringify(basketItems));

    closeModal();
  };

  return (
    <div className="modal-wrapper">
      <section className="modal-container">
        <section className="modal-container-inner">
          <section className="modal-media">
            <figure className="modal-image">
              <img src={item.image} alt={item.articleName} />
            </figure>
            <article className="modal-text">
              <h3>Pris: {item.price} kr</h3>
              <p>Innehåll:</p>
              <article className="modal-ingredience">
                {item.ingredience && item.ingredience.length > 0 ? (
                  item.ingredience.map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                  ))
                ) : (
                  <p>Inga ingredienser tillgängliga</p>
                )}
              </article>
              <h4>Allergiinformation:</h4>
              <h4>{item.allergies}</h4>
            </article>
            <section className="modal-close">
              <h5 onClick={closeModal}>X</h5>
            </section>
          </section>
          <section className="modal-description-container">
            <article className="modal-description-text">
              <p>{item.fullDescription}</p>
            </article>
            <figure className="modal-buttons">
              <h3 className="modal-order-quantity">Antal beställda: {count}</h3>
              <section className="count-button">
                <Counter
                  count={count}
                  onDecrement={onDecrement}
                  onIncrement={onIncrement}
                />
              </section>
              <section className="order-button">
                <OrderButton
                  onClick={() => {
                    if (!userID) {
                      alert('You need to be logged in to add items to the basket.');
                      return;
                    }
                    orderFromModal();
                    addToBasket();
                  }}
                  text="Lägg i Varukorgen"
                  disabled={btndisabled}
                  className="btn-order-button"
                />
              </section>
            </figure>
          </section>
        </section>
      </section>
    </div>
  );
}

export default ModalInfo;

/* Författare Peter
*
* Andreas: Lagt till "kr" i pris
*
* Ally har lagt till funktionalitet för localstorage av userID och isLOggedIn
* Andreas: mappa ut ingredienser istället för att alla hamnar i samma p-tagg
* 
* Ally 18/12 har inte flyttat interface pga problem med structur interface som inte överensstämmer med BasketItem interface som finns.
*/