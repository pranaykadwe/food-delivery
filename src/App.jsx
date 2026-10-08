
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Restaurants from "./components/Restaurants";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";
import AdminOrders from "./components/AdminOrders";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import FoodDetails from "./components/FoodDetails";

import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>

        <Navbar />

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* RESTAURANTS */}
          <Route
            path="/restaurants"
            element={<Restaurants />}
          />
<Route path="/food/:id" element={<FoodDetails />} />
          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* ORDER SUCCESS */}
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          {/* MY ORDERS */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ORDERS */}
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-gray-800">
                    404
                  </h1>

                  <p className="text-gray-500 mt-3">
                    Page Not Found
                  </p>
                </div>
              </div>
            }
          />

        </Routes>

        <Footer />

      </CartProvider>
    </BrowserRouter>
  );
};

export default App;

