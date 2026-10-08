
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  Mail,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  // Delivery charge
  const deliveryFee = subtotal >= 499 ? 0 : 40;

  // Final total
  const total = subtotal + deliveryFee;

  // Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("foodToken");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const orderData = {
        customer: formData,

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          restaurant: item.restaurant,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image,
        })),

        total,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Cart empty karo
        clearCart();

        // Order success page
        navigate("/order-success");
      }
    } catch (error) {
      console.log("Order Error:", error);

      alert(
        error.response?.data?.message ||
          "Order failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart protection
  if (cart.length === 0) {
    return (
      <section className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag
            size={60}
            className="mx-auto text-gray-300"
          />

          <h1 className="text-3xl font-bold text-gray-800 mt-5">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-2">
            Add some delicious food before checkout.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Browse Foods
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold mb-7 transition"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your delivery details and place your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                  <MapPin
                    size={22}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Delivery Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                      />
                    </div>
                  </div>

                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      autoComplete="tel"
                      className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No, Street, Area..."
                    rows="4"
                    autoComplete="street-address"
                    className="w-full border border-gray-200 rounded-xl py-3.5 px-4 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>

                {/* City + Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      autoComplete="address-level2"
                      className="w-full border border-gray-200 rounded-xl py-3.5 px-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      autoComplete="postal-code"
                      className="w-full border border-gray-200 rounded-xl py-3.5 px-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                    />
                  </div>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  {loading ? (
                    "Placing Order..."
                  ) : (
                    <>
                      <CheckCircle size={21} />
                      Place Order
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-28">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                  <ShoppingBag
                    size={22}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="text-sm text-gray-500">
                    {cart.length} item
                    {cart.length > 1 ? "s" : ""}
                  </p>
                </div>

              </div>

              {/* Items */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">

                      <h3 className="font-bold text-gray-800 truncate">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-gray-800">
                      ₹
                      {Number(item.price) *
                        Number(item.quantity)}
                    </p>
                  </div>
                ))}

              </div>

              {/* Price */}
              <div className="border-t border-gray-100 mt-6 pt-5 space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-extrabold text-orange-500">
                    ₹{total}
                  </span>
                </div>

              </div>

              {subtotal < 499 && (
                <div className="mt-5 bg-orange-50 text-orange-700 rounded-xl p-3 text-sm font-semibold">
                  Add ₹{499 - subtotal} more to get free delivery 🚀
                </div>
              )}

              {subtotal >= 499 && (
                <div className="mt-5 bg-green-50 text-green-700 rounded-xl p-3 text-sm font-semibold">
                  🎉 You unlocked free delivery!
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
