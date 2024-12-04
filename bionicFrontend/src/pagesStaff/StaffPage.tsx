import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from "../componentsStaff/StaffNavComponent";
import './styles/staffPage.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import config from "../config"; Avkommentera när nedanstående kommentering tas bort!

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
    const [error, setError] = useState<string | null>(null); //blir rätt när apianropet används!

    useEffect(() => {
        // to bort kommentar för att använda, men ta bort eller kommentera ut mackdata istället.
        /*
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(config.endpoints.orders.getAll);

                // Assuming the API returns the data in the correct structure,
                // if not, you may need to adjust the mapping below.
                const parsedOrders: Order[] = response.data.map((order: any) => {
                    return {
                        orderItemID: order.orderItemID.S,
                        createdAt: order.createdAt.S,
                        orderContent: order.orderContent.L.map((item: any) => ({
                            menuItem: item.M.menuItem.S,
                            count: parseInt(item.M.count.N, 10),
                            specialRequest: item.M.specialRequest?.S,
                        })),
                    };
                });

                setOrders(parsedOrders);
                setError(null);
            } catch (err) {
                setError("Failed to fetch orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        */

        // Mock-data---------------------
        const mockOrders: Order[] = [
            {
                orderItemID: '1',
                createdAt: new Date('2024-12-01T10:30:00Z').toISOString(),
                orderContent: [
                    { menuItem: 'Pizza Margherita', count: 2, specialRequest: 'Extra ost på en tack!' },
                    { menuItem: 'Spaghetti Carbonara', count: 1 },
                ],
            },
            {
                orderItemID: '2',
                createdAt: new Date('2024-12-02T14:45:00Z').toISOString(),
                orderContent: [
                    { menuItem: 'Caesarsalad', count: 3 },
                    { menuItem: 'Vitlöksbröd', count: 2, specialRequest: 'Extra vitlök.' },
                ],
            },
            {
                orderItemID: '3',
                createdAt: new Date('2024-12-03T09:15:00Z').toISOString(),
                orderContent: [
                    { menuItem: 'Lasagna', count: 1, specialRequest: 'Ingen pasta tack!.' },
                ],
            }
        ];

        setOrders(mockOrders);
        setLoading(false);
    }, []);
    //----------------------------------

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
            </main>
        </div>
    );
}

export default StaffPage;



/*
*Alistair
*Andreas lagt till funktion för att hantera url centralt
*/


