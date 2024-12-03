import StaffHeader from "../componentsStaff/StaffHeader";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

const StaffHome = () => <div>Landningssidan</div>;
const WaiterPage = () => <div>Servitörssidan</div>;
const LockedOrdersPage = () => <div>Låsta ordrar</div>;
const CookPage = () => <div>Kockenssida</div>;
const OrderHistoryPage = () => <div>Orderhistorik</div>;
const StockPage = () => <div>Lagerhållning</div>;

function StaffPage() {
    return (
        <Router>
            <div>
                <StaffHeader />

            </div>

            <main>
                <Routes>
                <Route path="/staffhome" element={<StaffHome />} />
                <Route path="/waiterpage" element={<WaiterPage />} />
                <Route path="/cook" element={<CookPage />} />
                <Route path="/lockedorders" element={<LockedOrdersPage />} />
                <Route path="/orderhistory" element={<OrderHistoryPage />} />
                <Route path="/stock" element={<StockPage />} />
            </Routes>
            </main>
        </Router>

    )
}

export default StaffPage


