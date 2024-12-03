import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TestPage from "../pages/TestPage";
import BasketPage from "../pages/BasketPage";
import CheckoutPage from "../pages/CheckoutPage";
import StaffPage from '../pagesStaff/StaffPage';


import StaffHome from '../pagesStaff/StaffPage';
//fixa import paths till de andra pages sen


function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/staff" element={<StaffPage />}>
          <Route path="staffhome" element={<StaffHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routers;



/* Författare: Andreas
*
* uppdaaterad av Ally. La till en outlet for en nested routing system med importer.
* 
* 
* 
*/