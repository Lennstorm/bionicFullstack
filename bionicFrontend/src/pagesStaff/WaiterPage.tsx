import '../pagesStaff/styles/waiterPage.css';
import StaffHeader from "../componentsStaff/StaffHeader";
import { useState, useEffect } from 'react';
import { OrderItem, MenuItems } from '../interfaces';
import getOrder from "../utils/getOrder";
import getMenu from '../utils/getMenu';

function WaiterPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [menu,setMenu] = useState<MenuItems[]>([])
  const [error, setError] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string[]>([])
  const [matchedDishes, setMatchedDishes] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrder(); // Använd utils-funktionen
        console.log('Det här är data hämtat från getOrder i WaiterPage', data);
        setOrders(data); // Uppdatera tillståndet med hämtad data
        const menuIds = data.flatMap(order => order.orderContent.map(item => item.menuItemID));
        console.log('det här är menuIds',menuIds) 
        setMenuId(menuIds) 
    } catch (err) {
        setError("Kunde inte hämta beställningar");
        console.error(err);
      } 
    };

    fetchOrders();
  }, []);

  console.log('det här är matched dishes !!!!!',matchedDishes)

  useEffect(() => {
 const fetchMenu = async () =>{
  try{
  const data = await getMenu()
  console.log('det här är data från getMenu',data)
  setMenu(data)

  }catch (err){
  setError("kunde inte hämta menyn")
  console.error(err)
}

 }
fetchMenu()

  },[])
  
  useEffect(() => {
    if (menu.length > 0 && menuId.length > 0) {
      // Iterera över alla menuItemIds och hitta motsvarande maträtt i menu-data
      const matched = menuId.map(menuId => {
        const matchingMenuItem = menu.find(menuItem => menuItem.MenuItemID === menuId);
        if (matchingMenuItem) {
          return matchingMenuItem.articleName; // Returnera rättens namn om matchning hittas
        }
        return null;
      }).filter(dishName => dishName !== null) as string[];
      

      setMatchedDishes(matched); // Uppdatera state med alla matchade maträtter
      console.log('det här är matched dishes',matched)
    }
  }, [menu, menuId]);
 
 
 
  return (
    <div className='waiter-container-wrapper'>
      <section className='staff-header'>
        <StaffHeader />
      </section>
      <section className='waiter-container'>
        <section className='form-container'>
          {orders.map((order, orderIndex) => (
            <div key={order.orderItemID}>
              <section className='form-row-one'>
                <section className='left-input'>
                  <label>
                    <h5>Redigera Maträtt</h5>
                  </label>
                  {order.orderContent.map((item, itemIndex) => (
                    <input
                      key={`edit-dish-${orderIndex}-${itemIndex}`}
                      type="text"
                      id={`edit-dish-${orderIndex}-${itemIndex}`}
                      value={item.menuItemID}
                      className='edit-dish'
                      onChange={() => {}}
                    />
                  ))}
                </section>
                <section className='right-input'>
                  <label>
                    <h5>Ordernummer</h5>
                  </label>
                  <input
                    type="text"
                    id={`order-number-${orderIndex}`}
                    value={order.orderItemID}
                    className='order-number'
                    onChange={() => {}}
                  />
                </section>
              </section>
              <section className='form-row-two'>
                <section className='left-column'>
                  <label>
                    <h5>Redigera antal</h5>
                  </label>
                  {order.orderContent.map((item, itemIndex) => (
                    <input
                      key={`edit-quantity-${orderIndex}-${itemIndex}`}
                      type="text"
                      id={`edit-quantity-${orderIndex}-${itemIndex}`}
                      value={item.count}
                      className='edit-quantity'
                      onChange={() => {}}
                    />
                  ))}
                </section>
                <section className='middle-column'>
                  <label>
                    <h5>Redigera pris</h5>
                  </label>
                  <input
                    type="text"
                    id={`edit-price-${orderIndex}`}
                    value='120' // Här kan du uppdatera med rätt värde om det finns
                    className='edit-price'
                    onChange={() => {}}
                  />
                </section>
                <section className='right-column'>
                  <label>
                    <h5>Beställning Klar</h5>
                  </label>
                  <input
                    type="text"
                    id={`order-ready-${orderIndex}`}
                    className='order-ready'
                    onChange={() => {}}
                  />
                </section>
              </section>
              <section className='form-row-three'>
                <section className='comment-from-chef'>
                  <label>
                    <h5>Kommentar till kocken</h5>
                  </label>
                  {order.orderContent.map((item, itemIndex) => (
                    <input
                      key={`comment-chef-${orderIndex}-${itemIndex}`}
                      type="text"
                      id={`comment-chef-${orderIndex}-${itemIndex}`}
                      value={item.specialRequest} // Dynamiskt värde från specialRequest
                      className='comment-chef'
                      onChange={() => {}}
                    />
                  ))}
                </section>
              </section>
              <section className='button-container'>
                <button>Spara Ändringarna</button>
              </section>
            </div>
          ))}
        </section>
        <section className='order-container'>
          <h4>Order #65497</h4>
          <section className='order-window'>
            <section className='order-dishes'>
              <h1># Maträtt</h1>
              <p>1 Fisk med löksås</p>
              <p>2 Pannkakor</p>
              <p>3 Rårakor med lingon</p>
              <p>4 Pannbiff med lök och potatis</p>
              <p>5 Korv och Mos</p>
              <p>6 Fisk med löksås</p>
            </section>
            <section className='order-quantity'>
              <h1>Antal</h1>
              <p>2</p>
              <p>1</p>
              <p>4</p>
              <p>1</p>
              <p>1</p>
            </section>
          </section>
          <section className='send-to-kitchen-btn'>
            <button>Skicka till köket</button>
          </section>
        </section>
      </section>
    </div>
  );
}

export default WaiterPage;
