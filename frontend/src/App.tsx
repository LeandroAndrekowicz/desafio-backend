import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/produto/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;