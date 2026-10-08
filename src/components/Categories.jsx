import React from "react";

const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Burger", emoji: "🍔" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Sandwich", emoji: "🥪" },
  { name: "Dessert", emoji: "🍰" },
];

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="text-center mb-10">
        <p className="text-orange-500 font-semibold">
          Explore Food
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Browse By Category
        </h2>

        <p className="text-gray-500 mt-3">
          Choose your favorite food category
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-5">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 text-center cursor-pointer ${
              selectedCategory === category.name
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <div className="text-5xl mb-4">
              {category.emoji}
            </div>

            <h3 className="font-semibold">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;