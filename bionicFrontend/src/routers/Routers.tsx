import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import TestPage from "../pages/TestPage";

function Routers() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/test" element={<TestPage />} />

        </Routes>
    </Router>
  );
}

export default Routers;            


/* Författare: Andreas
*
* 
* 
* 
* 
*/