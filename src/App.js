import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Cart from './screens/Cart';

import MyOrder from './screens/MyOrder'

import { CartProvider } from './Components/ContextReducer'  // Capital C

function App() {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/myOrder" element={<MyOrder />} />
                    <Route exact path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App