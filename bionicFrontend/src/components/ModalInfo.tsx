
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
  if (count <= 0) {
    alert('Välj antal varor att lägga till');
    return;
  }
  
  try{
   const basketItemID = `basket-${userID}`
   console.log('full item object', item)
   
   const basketItem = {
    basketItemID: basketItemID, 
    userID,                 
    menuItem: item.MenuItemID, 
    count: count || 1,
    item: {
      price: item.price || 0,
      quantity: item.quantity ||1,
      image: item.image || '',
      articleName: item.articleName || '',
    },
   specialRequests:'',
   orderStatus: '',
  };
  console.log('det här är basketitem', basketItem)
  await axios.post('https://zzpn054sg0.execute-api.eu-north-1.amazonaws.com/api/basket',
    {
      userID,
      basketItems: [basketItem]
    }
  
  );
  
  
  navigate('/basket')
 }catch(error){
  
  console.log('Full error:', error);
  console.log('det blev fel när varorna skall läggas i varukorgen');
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
          <p>{item.fullDescription}</p>

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
                // setBtnDisabled(true);
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