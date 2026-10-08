
import React from "react";
import {
  ArrowRight,
  Search,
  Star,
  Clock,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue =
      e.target.search.value.trim();

    if (searchValue) {
      navigate(
        `/restaurants?search=${encodeURIComponent(
          searchValue
        )}`
      );
    } else {
      navigate("/restaurants");
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-orange-100">

      {/* BACKGROUND DECORATION */}

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT CONTENT */}

          <div className="relative z-10">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-white border border-orange-100 shadow-sm px-4 py-2 rounded-full">

              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                🍴
              </div>

              <span className="text-sm font-bold text-orange-600">
                Delicious food, delivered fast
              </span>

            </div>

            {/* HEADING */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mt-6">

              Your favourite food,

              <span className="block text-orange-500 mt-2">
                delivered to you.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-500 text-base sm:text-lg leading-7 mt-6 max-w-xl">
              Discover delicious meals from the best
              restaurants around you. Order your favourite
              food and enjoy it from the comfort of your home.
            </p>

            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              className="mt-8 max-w-xl"
            >

              <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex items-center">

                <Search
                  size={21}
                  className="text-gray-400 ml-3 shrink-0"
                />

                <input
                  type="text"
                  name="search"
                  placeholder="Search for food or restaurant..."
                  className="flex-1 min-w-0 px-3 py-3 outline-none text-gray-700 placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <span className="hidden sm:inline">
                    Search
                  </span>

                  <Search
                    size={18}
                    className="sm:hidden"
                  />
                </button>

              </div>

            </form>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <Link
                to="/restaurants"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-lg shadow-orange-200"
              >
                Order Now
                <ArrowRight size={19} />
              </Link>

              <Link
                to="/restaurants"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-7 py-3.5 rounded-xl font-bold transition"
              >
                Explore Menu
              </Link>

            </div>

            {/* STATS */}

            <div className="flex flex-wrap items-center gap-6 mt-9">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Star
                    size={19}
                    className="text-orange-500 fill-orange-500"
                  />
                </div>

                <div>
                  <p className="font-extrabold text-gray-800">
                    4.8/5
                  </p>

                  <p className="text-xs text-gray-500">
                    Customer Rating
                  </p>
                </div>

              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-200" />

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock
                    size={19}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="font-extrabold text-gray-800">
                    30 min
                  </p>

                  <p className="text-xs text-gray-500">
                    Average Delivery
                  </p>
                </div>

              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-200" />

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Truck
                    size={19}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="font-extrabold text-gray-800">
                    100+
                  </p>

                  <p className="text-xs text-gray-500">
                    Food Options
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center lg:justify-end">

            {/* MAIN CIRCLE */}

            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 lg:w-full lg:h-full"/>

            {/* IMAGE */}

            <div className="relative z-10 w-72 sm:w-96 lg:w-full">

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85"
                alt="Delicious food"
                className="w-full aspect-square object-cover rounded-full border-8 border-white shadow-2xl"
              />

            </div>

            {/* RATING CARD */}

            <div className="absolute z-20 top-5 left-0 sm:left-2 bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3">

              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">

                <Star
                  size={20}
                  className="text-yellow-500 fill-yellow-500"
                />

              </div>

              <div>

                <p className="font-extrabold text-gray-800">
                  4.9
                </p>

                <p className="text-xs text-gray-500">
                  Excellent
                </p>

              </div>

            </div>

            {/* DELIVERY CARD */}

            <div className="absolute z-20 bottom-6 right-0 sm:right-2 bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-3">

              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">

                <Truck
                  size={20}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="font-extrabold text-gray-800">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500">
                  At your doorstep
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;

