import '../pagesStaff/styles/waiterPage.css'
import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from '../componentsStaff/StaffNavComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WaiterPageFallback from './waiterPageFallback';
//import axios from 'axios';
//import config from '../config';


interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}

interface Order {    
    orderItemID: string;
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}

function WaiterPage() {
    const location = useLocation();
    const order = location.state?.order as Order | undefined;
    console.log('har vi hämtat order???: ', order);
    const [selectedDish, setSelectedDish] = useState<OrderItem | null>(null);
    const navigate = useNavigate();

    const handleLockClick = () => {
        console.log('Ordern låses. Skickas till köket')
        // LOGIK FÖR ATT LÅSA ORDER!!
        navigate("/staff");
    };


    if (!order) {
        return (
            <div className='waiter-container-wrapper'>
            <section className='staff-header'>
                <StaffHeader />
                <StaffNavComponent />
            </section>
                <WaiterPageFallback onBackToStaff = {() => navigate('/staff')} />
            </div>
        );
    }

    return (
        <div className='waiter-container-wrapper'>
            <section className='staff-header'>
                <StaffHeader />
                <StaffNavComponent />
            </section>
            <section className='waiter-container'>

                <section className='form-container'>
                    <section className='form-row-one'>
                        <section className='left-input'>
                            <label>
                                Maträtt
                            </label>
                            <input 
                                type="text" 
                                className='edit-dish'
                                value={selectedDish ? selectedDish.articleName : ''} 
                                id="edit-dish" 
                                ></input>
                        </section>
                        <section className='right-input'>
                            <label>
                                ordernummer
                            </label>
                            <input 
                                type="text" 
                                value={order.orderItemID} 
                                className='order-number'
                                id="order-number" 
                                ></input>
                        </section>
                    </section>
                    <section className='form-row-two'>
                        <section className='left-column'>
                            <label>
                                Antal
                            </label>
                            <input
                                type="text"
                                value={selectedDish ? String(selectedDish.count) : ''} 
                                className='edit-quantity'></input>
                                id="edit-quantity" 
                        </section>
                        <section className='middle-column'>
                            <label>
                                Orderstatus
                            </label>
                            <input 
                                type="text" 
                                value={order.orderStatus}
                                className='edit-price'
                                id="edit-price" 
                                ></input>
                        </section>

                        <section className='right-column'>
                            
                        </section>
                    </section>


                    <section className='form-row-three'>
                        <section className='comment-from-chef'>
                            <label>
                                Kommentar till kocken
                            </label>
                            <input 
                                type="text" 
                                className='comment-chef'
                                value={selectedDish ? (selectedDish.specialRequest || ''): ''}
                                onChange={(e) => {
                                    if (selectedDish) {
                                        setSelectedDish({ ...selectedDish, specialRequest: e.target.value})
                                    }
                                }}
                                id="comment-chef" 
                                ></input>
                        </section>
                    </section>
                    <section className='button-container'>
                        <button 
/* 
                        onClick={() => {
                            if (!selectedDish) return;

                            axios.put(`${config.endpoints.orders.updateDish}/${order.orderItemID}`, {
                                menuItem: selectedDish.specialRequest
                            }).then(response => {
                                console.log('Uppdatering lyckades!' , response);
                            }).catch(err => {
                                console.error('Ordern uppdaderades inte!', err);
                            });
                        }}
                         */
                        >Spara Ändringarna</button>
                    </section>
                </section>

                <section className='order-container'>
                    <h4>Order #{order.orderItemID}</h4>
                    <section className='order-window'>

                        <ul className="items-list">
                            {order.orderContent.map((item, index) => (
                                <li 
                                key={index} 
                                className="order-item"
                                onClick={() => setSelectedDish(item)} //LÄGGA TILL EN CSS-EFFEKT OM DET FINNS SPECIAL REQUEST!!!!
                                >                                    
                                    <span className="item-name">{item.articleName }</span>
                                    <span className="item-quantity">{item.count}</span>                                    
                                </li>
                            ))}
                        </ul>

                    </section>
                    <section className='send-to-kitchen-btn'>
                        <button
                        onClick={handleLockClick}
                        >Skicka till köket</button>
                    </section>
                </section>
            </section>
        </div>

    )
}

export default WaiterPage

// koden skriven av peter