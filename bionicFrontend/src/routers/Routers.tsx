import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TestPage from "../pages/TestPage";
import BasketPage from "../pages/BasketPage";
import CheckoutPage from "../pages/CheckoutPage";
import ServicePage from '../pages/ServicePage';


function Routers() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/test" element={<TestPage />} />
            

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