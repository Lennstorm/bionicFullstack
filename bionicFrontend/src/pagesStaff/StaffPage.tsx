import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from "../componentsStaff/StaffNavComponent";
import './styles/staffPage.css';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

interface OrderItem {
    menuItem: string;
    articleName: string;
    count: number;
    specialRequest?: string;
}

interface Order {
    orderItemID: string;
    createdAt: string;
    orderStatus: string;    // Added
    orderLocked: boolean;   // Added
    orderContent: OrderItem[];
}

function StaffPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://ko5vh81cp7.execute-api.eu-north-1.amazonaws.com/api/orders');

                const parsedOrders: Order[] = response.data.data.map((order: any) => ({
                    orderItemID: order.orderItemID,
                    createdAt: order.createdAt,
                    orderStatus: order.orderStatus,      // Added
                    orderLocked: order.orderLocked,      // Added
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
        <div>
            <StaffHeader />
            <StaffNavComponent />

            <main className="outlet-container">
                <h2 className="staffHome-h2">Ordrar:</h2>

                {loading && <p>Laddar ordrar...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.orderItemID} className="order-card">
                            <div className="order-header">
                                <h3 className="order-number">
                                    <Link
                                        to={`/waiter/${order.orderItemID}`}
                                        className="order-link"
                                        state={{ order }}
                                    >
                                        Order #: {order.orderItemID}
                                    </Link>
                                </h3>
                                <p className="order-date">
                                    <strong>Skapad:</strong> {new Date(order.createdAt).toLocaleString('sv-SE')}
                                </p>
                            </div>
                            <div className="order-status">
                                <span className={`status ${order.orderStatus.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <strong>Status:</strong> {order.orderStatus}
                                </span>
                                <span className={`locked ${order.orderLocked ? 'locked-yes' : 'locked-no'}`}>
                                    <strong>Locked:</strong> {order.orderLocked ? 'JA' : 'NEJ'}
                                </span>
                            </div>
                            <div className="order-items">
                                <table className="items-table">
                                    <thead>
                                        <tr>
                                            <th>Artikel</th>
                                            <th>Antal</th>
                                            <th>Önskemål</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderContent.map((item, index) => (
                                            <tr key={index} className="order-item">
                                                <td>{item.articleName}</td>
                                                <td>{item.count}</td>
                                                <td>{item.specialRequest || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
                <Outlet />
            </main>
        </div>
    );
}

export default StaffPage;



/*
Alistair
*/


