
import React from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FoodCard from "./FoodCard";
import foodData from "../data/foodData";

const Home = () => {
  const navigate = useNavigate();

  const popularFoods = [...foodData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const categories = [
    {
      name: "Burger",
      emoji: "🍔",
      color: "bg-yellow-50",
    },
    {
      name: "Pizza",
      emoji: "🍕",
      color: "bg-red-50",
    },
    {
      name: "Biryani",
      emoji: "🍛",
      color: "bg-orange-50",
    },
    {
      name: "Pasta",
      emoji: "🍝",
      color: "bg-blue-50",
    },
    {
      name: "Sandwich",
      emoji: "🥪",
      color: "bg-green-50",
    },
    {
      name: "Dessert",
      emoji: "🍰",
      color: "bg-pink-50",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(
      `/restaurants?category=${encodeURIComponent(
        category
      )}`
    );
  };

  return (
    <main>

      {/* ==================================================
          HERO SECTION
      ================================================== */}
      <section className="bg-linear-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white border border-orange-100 shadow-sm px-4 py-2 rounded-full">
                <span className="text-orange-500">
                  ✨
                </span>

                <span className="text-sm font-bold text-orange-600">
                  Delicious food, delivered fast
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mt-6">
                Your Favorite Food,
                <span className="text-orange-500">
                  {" "}Delivered
                </span>{" "}
                To Your Door.
              </h1>

              <p className="text-gray-500 text-base sm:text-lg leading-8 max-w-xl mt-6">
                Discover delicious meals from your favorite
                restaurants. Order fresh food, track your
                delivery and enjoy every bite from the comfort
                of your home.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={() =>
                    navigate("/restaurants")
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-orange-200"
                >
                  Explore Foods
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() =>
                    navigate("/about")
                  }
                  className="bg-white border border-gray-200 hover:border-orange-400 hover:text-orange-500 text-gray-700 px-7 py-4 rounded-xl font-bold transition"
                >
                  Learn More
                </button>

              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center gap-6 mt-8">

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldCheck
                      size={18}
                      className="text-green-600"
                    />
                  </div>

                  <span className="text-sm font-semibold text-gray-600">
                    Secure Ordering
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
                    <Truck
                      size={18}
                      className="text-orange-500"
                    />
                  </div>

                  <span className="text-sm font-semibold text-gray-600">
                    Fast Delivery
                  </span>
                </div>

              </div>

            </div>

            {/* Hero Image */}
            <div className="relative">

              <div className="absolute -top-8 -right-5 sm:right-5 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl" />

              <div className="absolute -bottom-8 -left-5 w-40 h-40 bg-yellow-200/50 rounded-full blur-2xl" />

              <div className="relative">

                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
                  alt="Delicious food"
                 className="w-full h-80 sm:h-96 lg:h-[128] object-cover rounded-3xl shadow-2xl"
                />

                {/* Rating Card */}
                <div className="absolute top-5 left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">

                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star
                      size={20}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  </div>

                  <div>
                    <p className="font-extrabold text-gray-900">
                      4.9/5
                    </p>

                    <p className="text-xs text-gray-400">
                      Customer Rating
                    </p>
                  </div>

                </div>

                {/* Delivery Card */}
                <div className="absolute bottom-5 right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">

                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock
                      size={20}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <p className="font-extrabold text-gray-900">
                      20-30 min
                    </p>

                    <p className="text-xs text-gray-400">
                      Average Delivery
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          FEATURES
      ================================================== */}
      <section className="bg-white py-12 border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Truck
                  size={24}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Fast Delivery
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Delivered to your door
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Utensils
                  size={24}
                  className="text-green-600"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Fresh Food
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Prepared fresh for you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                <Star
                  size={24}
                  className="text-yellow-500 fill-yellow-500"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Top Rated
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Loved by customers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck
                  size={24}
                  className="text-blue-500"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Secure Payment
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Safe & secure checkout
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          CATEGORIES
      ================================================== */}
      <section className="py-16 sm:py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">

            <div>
              <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
                Explore Categories
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                What are you craving?
              </h2>

              <p className="text-gray-500 mt-3">
                Choose your favorite category and discover
                delicious food.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/restaurants")
              }
              className="text-orange-500 hover:text-orange-600 font-bold flex items-center gap-2 w-fit"
            >
              View All
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  handleCategoryClick(
                    category.name
                  )
                }
                className={`${category.color} rounded-2xl p-5 text-center border border-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-5xl">
                  {category.emoji}
                </div>

                <h3 className="font-bold text-gray-800 mt-4">
                  {category.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Explore now
                </p>
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* ==================================================
          POPULAR FOODS
      ================================================== */}
      <section className="py-16 sm:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">

            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Customer Favorites
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Popular Foods
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Try some of our most loved dishes, selected
              based on customer ratings.
            </p>

          </div>

          {popularFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {popularFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                />
              ))}

            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No food available right now.
            </div>
          )}

          <div className="text-center mt-10">

            <button
              onClick={() =>
                navigate("/restaurants")
              }
              className="bg-gray-900 hover:bg-gray-800 text-white px-7 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 transition"
            >
              Explore Full Menu
              <ArrowRight size={19} />
            </button>

          </div>

        </div>
      </section>

      {/* ==================================================
          CTA
      ================================================== */}
      <section className="py-16 sm:py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 sm:px-10 lg:px-16 py-12 sm:py-16">

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              <div>

                <p className="text-orange-400 font-bold uppercase tracking-wider text-sm">
                  Hungry already?
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 leading-tight">
                  Great food is just one click away.
                </h2>

                <p className="text-gray-400 mt-4 max-w-xl leading-7">
                  Browse our menu, add your favorite dishes
                  to the cart and get them delivered fresh
                  to your doorstep.
                </p>

                <button
                  onClick={() =>
                    navigate("/restaurants")
                  }
                  className="mt-7 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 transition active:scale-95"
                >
                  Order Now
                  <ArrowRight size={19} />
                </button>

              </div>

              <div className="hidden lg:flex justify-end">

                <div className="w-64 h-64 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/20">

                  <div className="text-center text-white">

                    <div className="text-7xl">
                      🍔
                    </div>

                    <p className="font-extrabold text-xl mt-3">
                      Eat. Enjoy.
                    </p>

                    <p className="text-orange-100 text-sm">
                      Repeat.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          LOCATION / DELIVERY
      ================================================== */}
      <section className="py-14 bg-white">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
            <MapPin
              size={27}
              className="text-orange-500"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-5">
            Delicious food at your doorstep
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-7">
            Order from your favorite restaurants and enjoy
            fresh, tasty meals without leaving your home.
          </p>

          <button
            onClick={() =>
              navigate("/restaurants")
            }
            className="mt-6 text-orange-500 hover:text-orange-600 font-bold inline-flex items-center gap-2"
          >
            Start Ordering
            <ArrowRight size={18} />
          </button>

        </div>

      </section>

    </main>
  );
};

export default Home;

