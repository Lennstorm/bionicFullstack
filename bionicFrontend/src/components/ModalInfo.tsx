
// import MenuItem from './MenuItem'
import { MenuItems } from '../interfaces.ts';
import Counter from './Counter.tsx'
import OrderButton from './OrderButton.tsx';
import './styles/modal-info.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ModalInfoProps {
  item: MenuItems;
  closeModal: () => void;
  userID: string,
  count:number
}


function ModalInfo({item, closeModal, userID}: ModalInfoProps) {
 
  const [count, setCount] = useState(0);
  const [btndisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setCount(0);
    setBtnDisabled(false);
  }, [item]);

  const onIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const onDecrement = () => {
    setCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const orderFromModal = () =>{
    console.log('det här är order from modal',item)
    console.log('så här många har beställts',count)
  }

 const addToBasket = async () =>{

  try{
  const basketItem ={
    menuItem: item.MenuItemID,
    item:{

      ...item,
    },
    count: count
   }
  console.log('det här är menuItem', item.MenuItemID)
  await axios.post('https://xicc2u4jn5.execute-api.eu-north-1.amazonaws.com/api/basket',
  {userID,
   basketItems: [basketItem]
  })
  navigate('/basket')
 }catch(error){
    console.error('Error when adding item to the basket',error)
  }
 }
 
 
  return (
    <div className="modal-wrapper">
    <section className="modal-container">
     <section className='modal-container-inner'>
      <section className='modal-media'>
        <figure className='modal-image'>
          <img src={item.image} />
        </figure>
        <article className='modal-text'>
          <h3>Pris: {item.price}</h3>
          <p>innehåller:</p>
          <article className='modal-ingredience'>
          <p>{item.ingredience}</p>
          </article>
          <h4>Allergi information:</h4>
          <h4>{item.allergies}</h4>
        </article>
        <section className='modal-close'>
          <h5 onClick={closeModal}>X</h5>
        </section>

      </section>
      <section className='modal-description-container'>
        <article className='modal-description-text'>
          <p>{item.description}</p>

        </article>
        <figure className=' modal-buttons'>
          <h3 className='modal-order-quantity'>Antal beställda :{count}</h3>
          <section className='count-button'>
            <Counter
              count={count}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          </section>
          <section className='order-button'>
            <OrderButton
              onClick={() => {
                orderFromModal();
                setBtnDisabled(true);
                addToBasket()
              }}
              text="Lägg i Varukorgen"
              disabled={btndisabled}
              className='btn-order-button'
            />
          </section>
        </figure>
      </section>
   
    </section>
      
    </section>
    </div>
  )
}

export default ModalInfo

// koden skriven av Peter