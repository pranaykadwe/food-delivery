import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import FoodCard from "./FoodCard";
import foodData from "../data/foodData";

const Restaurants = () => {
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [category, setCategory] = useState(
    categoryFromUrl || "All"
  );

  const [sort, setSort] = useState("default");

  const categories = [  
    "All",
    ...new Set(foodData.map((food) => food.category)),
  ];

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);

    if (selectedCategory === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({
        category: selectedCategory,
      });
    }
  };

  const filteredFoods = useMemo(() => {
    let result = [...foodData];

    if (search.trim()) {
      result = result.filter(
        (food) =>
          food.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          food.restaurant
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          food.category
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(
        (food) => food.category === category
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setSearchParams({});
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
            Explore Our Menu
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2">
            Find Your Favorite Food
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Search delicious food, explore categories and
            choose the perfect meal for you.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-7">
          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search food, restaurant or category..."
                className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-11 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative lg:w-64">
              <SlidersHorizontal
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 bg-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="low-high">
                  Price: Low to High
                </option>
                <option value="high-low">
                  Price: High to Low
                </option>
                <option value="rating">
                  Highest Rating
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-8">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategory(item)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-semibold transition ${
                category === item
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Result Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Foods
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {filteredFoods.length}{" "}
              {filteredFoods.length === 1 ? "item" : "items"} found
            </p>
          </div>

          {(search ||
            category !== "All" ||
            sort !== "default") && (
            <button
              onClick={clearFilters}
              className="w-fit text-orange-500 hover:text-orange-600 font-bold text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Food Cards */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 px-5 text-center">
            <div className="text-6xl">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              No Food Found
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              We couldn't find anything matching your
              search or selected category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              View All Foods
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Restaurants;