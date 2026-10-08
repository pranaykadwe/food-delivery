
import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  UserCircle,
  ClipboardList,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Utensils,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(null);

  // Cart item count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Get logged-in user
  const getUser = () => {
    const savedUser = localStorage.getItem("foodUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log("User data error:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();

    const handleStorageChange = () => {
      getUser();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("foodToken");
    localStorage.removeItem("foodUser");

    setUser(null);
    setProfileOpen(false);
    setMobileMenu(false);

    toast.success("Logged out successfully 👋");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:bg-orange-600 transition">
              <Utensils
                size={23}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-none">
                Food<span className="text-orange-500">Hub</span>
              </h1>

              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-1">
                Delicious food, delivered fast
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-semibold transition"
            >
              Home
            </Link>

            <Link
              to="/restaurants"
              className="text-gray-700 hover:text-orange-500 font-semibold transition"
            >
              Restaurants
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-orange-500 font-semibold transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-500 font-semibold transition"
            >
              Contact
            </Link>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-11 h-11 rounded-xl bg-gray-50 hover:bg-orange-50 flex items-center justify-center text-gray-700 hover:text-orange-500 transition"
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-orange-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </Link>

            {/* ================= LOGGED IN ================= */}
            {user ? (
              <div className="relative">

                <button
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="flex items-center gap-2.5 border border-gray-200 hover:border-orange-300 rounded-xl px-3 py-2 transition"
                >
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                    <User
                      size={19}
                      className="text-orange-500"
                    />
                  </div>

                  <div className="text-left max-w-28">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user.name}
                    </p>

                    <p className="text-[11px] text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    <div className="p-4 bg-orange-50 border-b border-orange-100">
                      <p className="text-xs text-orange-500 font-semibold">
                        Signed in as
                      </p>

                      <p className="font-bold text-gray-800 mt-1 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">

                      <Link
                        to="/profile"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-orange-500 transition"
                      >
                        <UserCircle size={19} />
                        <span className="font-semibold">
                          My Profile
                        </span>
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-orange-500 transition"
                      >
                        <ClipboardList size={19} />
                        <span className="font-semibold">
                          My Orders
                        </span>
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          to="/admin/orders"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-orange-500 transition"
                        >
                          <ShieldCheck size={19} />
                          <span className="font-semibold">
                            Admin Orders
                          </span>
                        </Link>
                      )}

                      <div className="border-t border-gray-100 my-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-red-500 transition"
                      >
                        <LogOut size={19} />
                        <span className="font-semibold">
                          Logout
                        </span>
                      </button>

                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* ================= NOT LOGGED IN ================= */
              <div className="flex items-center gap-2">

                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-gray-700 hover:text-orange-500 font-bold transition flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-sm"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>

              </div>
            )}

          </div>

          {/* ================= MOBILE RIGHT ================= */}
          <div className="lg:hidden flex items-center gap-2">

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </Link>

            {/* Menu Button */}
            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-orange-50 flex items-center justify-center text-gray-700 hover:text-orange-500 transition"
            >
              {mobileMenu ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>

          </div>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-gray-100 py-5">

            {/* User Info */}
            {user && (
              <div className="bg-orange-50 rounded-2xl p-4 mb-4 flex items-center gap-3">

                <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center">
                  <User
                    size={21}
                    className="text-orange-500"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-gray-800 truncate">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>

              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold transition"
              >
                Home
              </Link>

              <Link
                to="/restaurants"
                onClick={closeMobileMenu}
                className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold transition"
              >
                Restaurants
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold transition"
              >
                Contact
              </Link>

              {user && (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold flex items-center gap-3 transition"
                  >
                    <UserCircle size={19} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={closeMobileMenu}
                    className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold flex items-center gap-3 transition"
                  >
                    <ClipboardList size={19} />
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/orders"
                      onClick={closeMobileMenu}
                      className="px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-500 text-gray-700 font-semibold flex items-center gap-3 transition"
                    >
                      <ShieldCheck size={19} />
                      Admin Orders
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="px-4 py-3.5 rounded-xl hover:bg-red-50 text-red-500 font-semibold flex items-center gap-3 transition text-left"
                  >
                    <LogOut size={19} />
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <div className="grid grid-cols-2 gap-3 mt-3">

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="border border-gray-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

