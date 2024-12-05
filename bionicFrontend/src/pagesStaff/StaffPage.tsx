import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from "../componentsStaff/StaffNavComponent";
import './styles/staffPage.css';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import config from "../config";

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

function StaffPage() {
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

    //---filtrera bland ordrar på sidan
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderItemID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderContent.some(item => item.articleName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
            statusFilter === '' || order.orderStatus === statusFilter;

        const matchesLocked =
            lockedFilter === '' || (lockedFilter === 'JA' ? order.orderLocked : !order.orderLocked);

        return matchesSearch && matchesStatus && matchesLocked;
    });

    return (
        <div>
            <StaffHeader />
            <StaffNavComponent />

            <main className="outlet-container">
                <h2 className="staffHome-h2">Ordrar:</h2>

                <div className="controls">
                    <input
                        type="text"
                        placeholder="Sök Ordrar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                        aria-label="Search orders"
                    />

                    <div className="filters">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                            aria-label="Filter by status"
                        >
                            <option value="">Alla Statustyper</option>
                            <option value="väntande">Väntande</option>
                            <option value="under tillagning">Under Tillagning</option>
                            <option value="klar">Klar</option>
                        </select>

                        <select
                            value={lockedFilter}
                            onChange={(e) => setLockedFilter(e.target.value)}
                            className="filter-select"
                            aria-label="Filter by locked state"
                        >
                            <option value="">Alla Låststatusar</option>
                            <option value="JA">JA</option>
                            <option value="NEJ">NEJ</option>
                        </select>
                    </div>
                </div>

                {loading && <p className="loading-message">Laddar ordrar...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="orders-list">
                    {filteredOrders.map(order => (
                        <div key={order.orderItemID} className="order-card">
                            <div className="order-header">
                                <h3 className="order-number">
                                    <Link
                                        to={`/waiter/${order.orderItemID}`}
                                        className="order-link"
                                        state={{ order }}
                                        aria-label={`View details for order number ${order.orderItemID}`}
                                    >
                                        Order #: {order.orderItemID}
                                    </Link>
                                </h3>
                                <p className="order-date">
                                    <strong>Skapad:</strong> {new Date(order.createdAt).toLocaleString('sv-SE')}
                                </p>
                            </div>
                            <div className="order-status" role="status" aria-live="polite">
                                <span className={`status ${order.orderStatus.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <strong>Status:</strong> {order.orderStatus}
                                </span>
                                <span className={`locked ${order.orderLocked ? 'locked-yes' : 'locked-no'}`}>
                                    <strong>Låst:</strong> {order.orderLocked ? 'JA' : 'NEJ'}
                                </span>
                            </div>
                            <div className="order-items">
                                <ul className="items-list">
                                    {order.orderContent.map((item, index) => (
                                        <li key={index} className="order-item">
                                            <span className="item-name">{item.articleName}</span>
                                            <span className="item-quantity">x{item.count}</span>
                                            <span className="item-request">{item.specialRequest ? `• ${item.specialRequest}` : ''}</span>
                                        </li>
                                    ))}
                                </ul>
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


