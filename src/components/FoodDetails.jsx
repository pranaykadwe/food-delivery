
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  ShoppingCart,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import foodData from "../data/foodData";
import { useCart } from "../context/CartContext";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const food = foodData.find(
    (item) => item.id === Number(id)
  );

  if (!food) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">

          <div className="text-6xl mb-5">
            🍽️
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Food Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            Sorry, this food item does not exist.
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

  // Add to cart
  const handleAddToCart = () => {
    addToCart(food);

    toast.success(
      `${food.name} added to cart 🛒`
    );
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart(food);

    toast.success(
      `${food.name} added to cart 🛒`
    );

    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold mb-7 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Main Food Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image */}
            <div className="relative h-80 sm:h-96 lg:h-full min-h-96">

              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />

              {/* Rating */}
              <div className="absolute top-5 left-5 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">

                <Star
                  size={17}
                  className="text-yellow-500 fill-yellow-500"
                />

                <span className="font-bold text-gray-800">
                  {food.rating}
                </span>

              </div>

              {/* Category */}
              <div className="absolute top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                {food.category}
              </div>

            </div>

            {/* Details */}
            <div className="p-6 sm:p-10 flex flex-col justify-center">

              <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
                {food.restaurant}
              </p>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                {food.name}
              </h1>

              <p className="text-gray-500 leading-7 mt-5">
                Enjoy our delicious{" "}
                {food.name.toLowerCase()},
                freshly prepared with quality
                ingredients and served with great
                taste.
              </p>

              {/* Info */}
              <div className="flex flex-wrap items-center gap-4 mt-6">

                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl">

                  <Star
                    size={18}
                    className="fill-yellow-500 text-yellow-500"
                  />

                  <span className="font-bold">
                    {food.rating} Rating
                  </span>

                </div>

                <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl">

                  <Clock size={18} />

                  <span className="font-semibold">
                    {food.time}
                  </span>

                </div>

              </div>

              {/* Price */}
              <div className="mt-8">

                <p className="text-sm text-gray-400">
                  Price
                </p>

                <p className="text-4xl font-extrabold text-orange-500 mt-1">
                  ₹{food.price}
                </p>

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Plus size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={20} />
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="text-3xl">
              🍽️
            </div>

            <h3 className="font-bold text-gray-800 mt-3">
              Freshly Prepared
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Prepared fresh after you place your
              order.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="text-3xl">
              🚀
            </div>

            <h3 className="font-bold text-gray-800 mt-3">
              Fast Delivery
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Get your food delivered quickly to
              your door.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="text-3xl">
              🔒
            </div>

            <h3 className="font-bold text-gray-800 mt-3">
              Secure Ordering
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Simple and secure checkout
              experience.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FoodDetails;

