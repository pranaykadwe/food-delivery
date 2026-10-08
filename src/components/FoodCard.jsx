
import React from "react";
import {
  Star,
  Clock,
  ShoppingCart,
  Plus,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(food);

    toast.success(
      `${food.name} added to cart 🛒`
    );
  };

  const handleViewDetails = () => {
    navigate(`/food/${food.id}`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
          <Star
            size={15}
            className="text-yellow-500 fill-yellow-500"
          />

          <span className="text-sm font-bold text-gray-800">
            {food.rating}
          </span>
        </div>

        {/* Category */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
          {food.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition">
              {food.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {food.restaurant}
            </p>
          </div>

          <p className="text-xl font-extrabold text-orange-500 whitespace-nowrap">
            ₹{food.price}
          </p>
        </div>

        {/* Food Information */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">

          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{food.time}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShoppingCart size={16} />
            <span>Popular</span>
          </div>

        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">

          <button
            onClick={handleViewDetails}
            className="border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
          >
            <Eye size={18} />
            Details
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
          >
            <Plus size={18} />
            Add Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoodCard;

