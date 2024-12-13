//bionicFrontend/src/pagessStaff/WaiterPage.tsx

import '../pagesStaff/styles/waiterPage.css'
import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from '../componentsStaff/StaffNavComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WaiterPageFallback from './waiterPageFallback';
import axios from 'axios';
import config from '../config';


interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}

interface Order {
    orderItemID: string;
    userID: string;
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
    const [error, setError] = useState<string | null>(null);


    if (!order) {
        return (
            <div className='waiterPage--wrapper'>
                <section className='waiterPage--header'>
                    <StaffHeader />
                    <StaffNavComponent />
                </section>
                <WaiterPageFallback onBackToStaff={() => navigate('/staff')} />
            </div>
        );
    }

    const handleLockClick = async () => {
        if (!order) return;
        try {
            await axios.put(`${config.endpoints.orders.update}/${order.orderItemID}`, {
                userID: order.userID,
                orderStatus: "under tillagning",
                orderLocked: true
            });
            console.log('Ordern låst och status uppdaterad!');
            navigate("/staff");
        } catch (error) {
            console.error('Misslyckades att uppdatera ordern', error);
        }
    };

    

    const handleSaveClick = async () => {
        console.log(order);
    
        if (!selectedDish) {
            console.warn("Ingen dish vald att spara.");
            return;
        }
    
        // Bygg payload direkt från selectedDish
        const payload = {
            userID: order.userID,
            menuItemID: selectedDish.menuItem, // Mappning till backend
            specialRequest: selectedDish.specialRequest, // Uppdaterat värde från input-fältet
        };
    
        console.log("Skickar data till backend", payload);
    
        try {
            const url = config.endpoints.orders.updateRequest.replace(
                "{orderItemID}",
                order.orderItemID
            );
    
            await axios.put(url, payload);
            console.log("Uppdateringen lyckades!");
        } catch (error) {
            console.error("Ordern uppdaterades inte!", setError("Kunde inte hämta beställningar"));
        }
    };
    
    return (
        <div className='waiterPage--wrapper'>
            <section className='waiterPage--header'>
                <StaffHeader />
                <StaffNavComponent />
            </section>

            {error && <div className="error-message">{error}</div>}

            <section className='waiterPage--main'>

                <section className='waiterPage--formContainer'>
                    <section className='waiterPage--form-rowOne'>
                        <section className='waiterPage--leftInput'>
                            <label>
                                Maträtt
                            </label>
                            <input
                                type="text"
                                className='waiterPage--leftInput-dish'
                                value={selectedDish ? selectedDish.articleName : ''}
                                id="waiterPage--editDish"
                                readOnly
                            ></input>
                        </section>
                        <section className='waiterPage--rightInput'>
                            <label>
                                ordernummer
                            </label>
                            <input
                                type="text"
                                value={order.orderItemID}
                                className='waiterPage--orderNumber'
                                id="order-number"
                                readOnly
                            ></input>
                        </section>
                    </section>
                    <section className='waiterPage--form-rowTwo'>
                        <section className='waiterPage--rowTwo-leftColumn'>
                            <label>Antal</label>
                            <input
                                type="text"
                                value={selectedDish ? String(selectedDish.count) : ''}
                                className='waiterPage--leftColumn-quantity'
                                id="edit-quantity"
                                readOnly
                            />
                        </section>
                        <section className='waiterPage--rowTwo-middleColumn'>
                            <label>
                                Orderstatus
                            </label>
                            <input
                                type="text"
                                value={order.orderStatus}
                                className='waiterPage--price'
                                id="edit-price"
                                readOnly
                            ></input>
                        </section>

                        <section className='waiterPage--rowTwo-rightColumn'>

                        </section>
                    </section>


                    <section className='waiterPage--form-rowThree'>
                        <section className='waiterPage--rowThree-comment'>
                            <label>
                                Kommentar till kocken
                            </label>
                            <input
                                type="text"
                                className='waiterPage--chefComment'
                                value={selectedDish ? (selectedDish.specialRequest || '') : ''}
                                onChange={(e) => {
                                    if (selectedDish) {
                                        setSelectedDish({ ...selectedDish, specialRequest: e.target.value })
                                    }
                                }}
                                id="comment-chef"
                            ></input>
                        </section>
                    </section>
                    <section className='button-container'>
                        <button className="waiterPage--saveButton" onClick={handleSaveClick}>
                            Spara Ändringarna
                        </button>
                    </section>
                </section>

                <section className='waiterPage--orderContainer'>
                    <h4>Order #{order.orderItemID}</h4>
                    <section className='waiterPage--orderWindow'>

                        <ul className="waiterPage--orderWindow-itemsList">
                            {order.orderContent.map((item, index) => (
                                <li
                                    key={index}
                                    className="waiterPage--itemsList-orderItem"
                                    onClick={() => setSelectedDish(item)}
                                >
                                    <span className="waiterPage--orderWindow-redCircle" style={{ backgroundColor: item.specialRequest ? 'red' : 'transparent' }}></span>
                                    <span className="waiterPage--orderItem-name">{item.articleName}</span>
                                    <span className="waiterPage--orderItem-quantity">{item.count}</span>
                                </li>
                            ))}
                        </ul>

                    </section>

                    <button className='waiterPage--sendButton'
                        onClick={handleLockClick}
                    >Skicka till köket</button>

                </section>
            </section>
        </div>

    )
}

export default WaiterPage

/*
* Författare Peter
*
* Ally, Andreas & Peter: omarbetning.
*
*
*/