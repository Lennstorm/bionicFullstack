import './styles/cookPage.css';
import ServiceHeader from '../componentsStaff/StaffHeader';
import StaffNavComponent from '../componentsStaff/StaffNavComponent';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
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
    createdAt: string;
    orderStatus: string;
    orderLocked: boolean;
    orderContent: OrderItem[];
}

function cookPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [lockedFilter, setLockedFilter] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(config.endpoints.orders.getAll);

                const parsedOrders: Order[] = response.data.data.map((order: any) => ({
                    orderItemID: order.orderItemID,
                    createdAt: order.createdAt,
                    orderStatus: order.orderStatus,
                    orderLocked: order.orderLocked,
                    orderContent: order.orderContent.map((item: any) => ({
                        menuItem: item.menuItemID,
                        articleName: item.articleName,
                        count: item.count,
                        specialRequest: item.specialRequest,
                    })),
                }));

                setOrders(parsedOrders);
                setError(null);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='page cookPage--wrapper'>
            <section className='cookPage--header'>
                <ServiceHeader />
            </section>
            <section className='cookPage--nav'>
                <StaffNavComponent />
            </section>
            <main className='cookPage--main'>
                <aside className='cookPage--aside-left'>
                    <div className='cookPage--left-row1'></div>
                    <div className='cookPage--left-row2'></div>
                    <div className='cookPage--left-row3'>
                        <RoundedButton
                            text="Läst!"
                            onClick={() => console.log('Rounded Button!')}
                            color="blue"
                            fontStyle="bold"
                        />
                    </div>
                </aside>

                <aside className='cookPage--aside-right'>
                    <div className='cookPage--right-heading'></div>
                    <div className='cookPage--right-orderTable'></div>
                    <RoundedButton
                        text="Matlagning påbörjad"
                        onClick={() => console.log('Rounded Button!')}
                        color="green"
                        fontStyle="bold"
                    />
                    <RoundedButton
                        text="Ordern Tillagad!"
                        onClick={() => console.log('Rounded Button!')}
                        color="green"
                        fontStyle="bold"
                    />


                </aside>

            </main>
        </div>
    )
}

export default cookPage;