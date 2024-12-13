import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Expositions from './pages/Expositions';
import Collections from './pages/Collections';
import Evenements from './pages/Evenements';
import Visite from './pages/Visite';
import About from './pages/About';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';  
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expositions" element={<Expositions />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/*" element={<PrivateRoute />}>
              <Route path="" element={<AdminDashboard />} />
            </Route>
          </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
