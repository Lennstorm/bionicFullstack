//bionicFrontend/src/pagesStaff/CookPage.tsx

import './styles/cookPage.css';
import StaffHeader from '../componentsStaff/StaffHeader';
import StaffNavComponent from '../componentsStaff/StaffNavComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CookPageFallback from './CookPageFallback';
import axios from 'axios';
import config from '../config';
import RoundedButton from '../components/RoundedButton';

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

function CookPage() {

    const location = useLocation();
    const order = location.state?.order as Order | undefined;
    console.log('har vi hämtat order???: ', order);
    const [selectedDish, setSelectedDish] = useState<OrderItem | null>(null);
    const navigate = useNavigate();

    const handleCookedClick = async () => {
        if (!order) return;
        try {
            const response = await axios.put(`${config.endpoints.orders.update}/${order.orderItemID}`,{
                userID: order.userID,
                orderStatus: "klar",
                orderLocked: true
            });
            console.log('Ordern tillagad och status uppdaterad till "klar"!', response);
            navigate("/staff");
        } catch (err) {
            console.error('Misslyckades att uppdatera order', err);
        }
    };

    if (!order) {
        return (
            <div className='cookPage--wrapper'>
                <section className='cookPage--header'>
                    <StaffHeader />
                    <StaffNavComponent />
                </section>
                <CookPageFallback onBackToStaff={() => navigate('/staff')} />
            </div>
        );
    }

    return (
        <div className='page cookPage--wrapper'>
            <section className='cookPage--header'>
                <StaffHeader />
            </section>
            <section className='cookPage--nav'>
                <StaffNavComponent />
            </section>
            <main className='cookPage--main'>
                <aside className='cookPage--aside-left'>
                    <div className='cookPage--left-row1'>

                        <div className='cookPage--row1-field'>
                            <label>Maträtt</label>
                            <input
                                type="text"
                                value={selectedDish ? selectedDish.articleName : ''}
                            />
                        </div>
                        <div className="cookPage--row1-field">
                            <label>Ordernummer</label>
                            <input
                                type="text"
                                value={order.orderItemID}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='cookPage--left-row2'>

                        <div className='cookPage--row2-field'>
                            <label >Antal</label>
                            <input
                                type="number"
                                value={selectedDish ? selectedDish.count : 0}
                            />
                        </div>

                        <div className='cookPage--row2-field'>
                            <label>Orderstatus</label>
                            <input
                                type="text"
                                value={order.orderStatus}
                               
                            />
                        </div>
                    </div>
                    <div className='cookPage--left-row3'>
                        <div className='cookPage--row3-field'>
                            <label>Kommentar till kocken</label>
                            <textarea
                                value={selectedDish ? (selectedDish.specialRequest || '') : ''}
                                
                            />
                        </div>
                        <RoundedButton
                            text="Läst!"
                            onClick={() => console.log('Rounded Button!')}
                            color="blue"
                            fontStyle="bold"
                        />
                    </div>
                </aside>


                <aside className='cookPage--aside-right'>
                    <div className='cookPage--right-heading'>
                    <h4>Order #{order.orderItemID}</h4>

                    </div>

                    <div className='cookPage--right-orderTable'>
                    <ul className="cookPage--orderWindow-itemsList">
                            {order.orderContent.map((item, index) => (
                                <li
                                    key={index}
                                    className="cookPage--itemsList-orderItem"
                                    onClick={() => setSelectedDish(item)}
                                >
                                    <span className="cookPage--orderWindow-redCircle" style={{ backgroundColor: item.specialRequest ? 'red' : 'transparent' }}></span>
                                    <span className="cookPage--orderItem-name">{item.articleName}</span>
                                    <span className="cookPage--orderItem-quantity">{item.count}</span>
                                </li>
                            ))}
                        </ul>                        
                    </div>


                </aside>
                <aside className='cookPage--main-leftBtnArea'>

{/*                 <RoundedButton
                    text="Matlagning påbörjad"
                    onClick={() => console.log('Rounded Button!')}
                    color="green"
                    fontStyle="bold"
                    /> */}
                    </aside>
                    <aside className='cookPage--main-rightBtnArea'>

                <RoundedButton
                    text="Ordern Tillagad!"
                    onClick={handleCookedClick}
                    color="green"
                    fontStyle="bold"
                    />
                    </aside>

            </main>
        </div >
    )
}

export default CookPage;

/* 
* Författare Andreas
*
*
* 
* 
*/