

import StaffHeader from "../componentsStaff/StaffHeader";
import StaffNavComponent from "../componentsStaff/StaffNavComponent";
import { Outlet } from "react-router-dom";
import './styles/staffPage.css'


function StaffPage() {
    return (
        <div>
            <StaffHeader />

            <StaffNavComponent />
            <main className="outlet-container">
                <Outlet />
            </main>
        </div>
    );
}

export default StaffPage;

/*
Alistair
*/


