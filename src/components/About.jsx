
import React from "react";
import {
  Heart,
  Clock,
  ShieldCheck,
  Truck,
  Users,
  Utensils,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
                About FoodHub
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-3">
                Good Food.
                <span className="text-orange-500">
                  {" "}Good Mood.
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-8 mt-6 max-w-xl">
                FoodHub is a modern food delivery platform created
                to make ordering your favorite meals simple,
                fast and enjoyable.
              </p>

              <button
                onClick={() => navigate("/restaurants")}
                className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 transition"
              >
                Explore Our Menu
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000"
                alt="Delicious food"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-2xl"
              />

              <div className="absolute -bottom-5 left-5 sm:left-8 bg-white text-gray-900 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Star
                    size={22}
                    className="text-orange-500 fill-orange-500"
                  />
                </div>

                <div>
                  <p className="font-extrabold text-lg">
                    4.8/5
                  </p>
                  <p className="text-gray-500 text-sm">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Our Story
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              We believe every meal should be special.
            </h2>

            <p className="text-gray-600 leading-7 mt-5">
              FoodHub was created with one simple idea —
              bringing delicious food closer to people.
              Whether you are craving a juicy burger,
              cheesy pizza, biryani or a sweet dessert,
              we make it easy to discover and order.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              Our goal is to provide a smooth ordering
              experience while connecting customers with
              great food and trusted restaurants.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-8">

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <Users className="text-orange-500" size={28} />

                <h3 className="text-2xl font-extrabold text-gray-900 mt-3">
                  10K+
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Happy Customers
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <Utensils className="text-orange-500" size={28} />

                <h3 className="text-2xl font-extrabold text-gray-900 mt-3">
                  500+
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Food Items
                </p>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=700"
              alt="Restaurant food"
              className="w-full h-64 object-cover rounded-3xl"
            />

            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=700"
              alt="Healthy food"
              className="w-full h-64 object-cover rounded-3xl mt-10"
            />

            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=700"
              alt="Burger"
              className="w-full h-64 object-cover rounded-3xl -mt-6"
            />

            <img
              src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700"
              alt="Pizza"
              className="w-full h-64 object-cover rounded-3xl mt-4"
            />
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16 sm:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Why FoodHub?
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Everything you need for a better food experience
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              We focus on quality, convenience and customer
              satisfaction from browsing to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                <Truck
                  size={27}
                  className="text-orange-500"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Get your favorite meals delivered quickly
                and conveniently.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                <Heart
                  size={27}
                  className="text-orange-500"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Made With Care
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Quality food and a better experience are
                always our priority.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                <ShieldCheck
                  size={27}
                  className="text-orange-500"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Secure Ordering
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Enjoy a simple and secure ordering process
                every time.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center">
                <Clock
                  size={27}
                  className="text-orange-500"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Save Your Time
              </h3>

              <p className="text-gray-500 mt-2 leading-6">
                Browse, order and enjoy your food without
                unnecessary waiting.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="bg-orange-500 rounded-3xl p-8 sm:p-12 text-center text-white">

          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Hungry already?
          </h2>

          <p className="mt-3 text-orange-100 max-w-xl mx-auto">
            Explore our delicious menu and find something
            perfect for your next meal.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
            className="mt-7 bg-white text-orange-500 hover:bg-gray-100 px-7 py-3.5 rounded-xl font-bold transition"
          >
            Order Now
          </button>

        </div>
      </div>

    </section>
  );
};

export default About;

