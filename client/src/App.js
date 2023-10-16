import React from "react";
import { Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import ProductDetails from "./components/ProductDetails"; 
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
