import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TestPage from "../pages/TestPage";
import BasketPage from "../pages/BasketPage";
import CheckoutPage from "../pages/CheckoutPage";
import WaiterPage from '../pagesStaff/WaiterPage.tsx';


import StaffPage from '../pagesStaff/StaffPage';

//kommentera in när de ska användas!!

// import WaiterPage from '../pagesStaff/WaiterPage';
// import LockedOrdersPage from '../pagesStaff/LockedOrdersPage';
// import CookPage from '../pagesStaff/CookPage';
// import OrderHistoryPage from '../pagesStaff/OrderHistoryPage';
// import StockPage from '../pagesStaff/StockPage';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route>
        <Route path="/waiterpage" element={<WaiterPage />} />
         
        </Route>
      </Routes>
    </Router>
  );
}

export default Routers;

 {/*
          <Route path="waiterpage" element={<WaiterPage />} />
          <Route path="lockedorders" element={<LockedOrdersPage />} />
          <Route path="cook" element={<CookPage />} />
          <Route path="orderhistory" element={<OrderHistoryPage />} />
          <Route path="stock" element={<StockPage />} />
          */}

/* Författare: Andreas
*
* uppdaaterad av Ally. La till en outlet for en nested routing system med importer.
* 
* 
* 
*/