
import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ShoppingBag,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const OrderSuccess = () => {
  return (
    <section className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-10 text-center">

          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle
              size={58}
              className="text-green-500"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-7">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-500 text-base sm:text-lg mt-3 max-w-lg mx-auto leading-7">
            Thank you for your order. Your delicious food is
            being prepared and will be delivered to you soon.
          </p>

          {/* Order Info */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mt-8">
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag
                size={24}
                className="text-orange-500"
              />

              <h2 className="text-lg font-bold text-gray-800">
                Your order is being processed
              </h2>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              You can track your order status from the
              <span className="font-semibold text-orange-500">
                {" "}My Orders
              </span>
              {" "}section.
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

            <Link
              to="/restaurants"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </Link>

            <Link
              to="/my-orders"
              className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <ClipboardList size={20} />
              View My Orders
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* Bottom Message */}
          <p className="text-sm text-gray-400 mt-8">
            🍔 Fresh food • 🚀 Fast delivery • ❤️ Made with care
          </p>

        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;

