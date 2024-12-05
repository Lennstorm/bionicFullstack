import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from "../componentsStaff/StaffNavComponent";
import './styles/staffPage.css';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

interface OrderItem {
    menuItem: string;
    count: number;
    specialRequest?: string;
}

interface Order {
    orderItemID: string;
    createdAt: string;
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
                    orderContent: order.orderContent.map((item: any) => ({
                        menuItem: item.menuItem,
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
                        <div key={order.orderItemID} className="order">
                            <div className="order-header">
                                <h3 className="orderLink-h3">
                                    <Link
                                        to={`/waiter/${order.orderItemID}`}
                                        className="order-link"
                                        state={{ order }}
                                    >
                                        Order #: {order.orderItemID}
                                    </Link>
                                </h3>
                                <p><strong>Order Skapad:</strong> {new Date(order.createdAt).toLocaleString('sv-SE')}</p>
                            </div>
                            <ul>
                                {order.orderContent.map((item, index) => (
                                    <li key={index} className="order-item">
                                        <div className="order-item-info">
                                            <span className="item-name">{item.menuItem}</span>
                                            <span className="item-quantity">x{item.count}</span>
                                        </div>
                                        {item.specialRequest && item.specialRequest.trim() !== "" && (
                                            <div className="special-request">
                                                <span>Special Request: {item.specialRequest}</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
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


