
import React from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Free delivery above ₹499
  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 499
      ? 0
      : 40;

  const total = subtotal + deliveryCharge;

  // Increase quantity
  const handleIncrease = (id) => {
    increaseQuantity(id);
  };

  // Decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      toast.error(`${item.name} removed from cart`);
      removeFromCart(item.id);
      return;
    }

    decreaseQuantity(item.id);
  };

  // Remove item
  const handleRemove = (item) => {
    removeFromCart(item.id);

    toast.success(
      `${item.name} removed from cart`
    );
  };

  // Clear entire cart
  const handleClearCart = () => {
    clearCart();

    toast.success("Cart cleared successfully");
  };

  // Go to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/checkout");
  };

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <section className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart
              size={48}
              className="text-orange-500"
            />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mt-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3 leading-6">
            Looks like you haven't added anything to
            your cart yet. Explore our delicious food
            and order your favorite meal.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
            className="mt-7 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto transition active:scale-95"
          >
            <ShoppingBag size={20} />
            Browse Foods
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Your Selection
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-2">
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="w-fit text-red-500 hover:text-red-600 font-bold text-sm flex items-center gap-2"
          >
            <Trash2 size={17} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.restaurant}
                        </p>
                      </div>

                      <p className="text-xl font-extrabold text-orange-500">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                        <button
                          onClick={() =>
                            handleDecrease(item)
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition"
                        >
                          <Minus size={17} />
                        </button>

                        <span className="w-10 text-center font-bold text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleIncrease(item.id)
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition"
                        >
                          <Plus size={17} />
                        </button>

                      </div>

                      {/* Single price */}
                      <p className="text-sm text-gray-500">
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          handleRemove(item)
                        }
                        className="text-red-500 hover:text-red-600 font-semibold text-sm flex items-center gap-1.5"
                      >
                        <Trash2 size={17} />
                        Remove
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/restaurants")}
              className="text-orange-500 hover:text-orange-600 font-bold flex items-center gap-2 mt-2"
            >
              <ArrowRight
                size={18}
                className="rotate-180"
              />
              Continue Shopping
            </button>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">

              <h2 className="text-xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 mt-6">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span className="font-semibold">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-500">
                        FREE
                      </span>
                    ) : (
                      `₹${deliveryCharge}`
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

              {/* Free Delivery Message */}
              {subtotal < 499 && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-6">
                  <p className="text-sm text-orange-700 font-medium">
                    Add ₹{499 - subtotal} more to get
                    <span className="font-bold">
                      {" "}FREE delivery 🚀
                    </span>
                  </p>
                </div>
              )}

              {subtotal >= 499 && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-6">
                  <p className="text-sm text-green-700 font-semibold">
                    🎉 You got FREE delivery!
                  </p>
                </div>
              )}

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-6 transition active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-5">
                <span>🔒</span>
                Secure & safe checkout
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;

