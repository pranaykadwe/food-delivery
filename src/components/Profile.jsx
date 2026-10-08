
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("foodToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const userData = response.data.user;

        setUser(userData);

        // Keep localStorage updated
        localStorage.setItem(
          "foodUser",
          JSON.stringify(userData)
        );
      }
    } catch (error) {
      console.log("Profile Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("foodToken");
        localStorage.removeItem("foodUser");

        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("foodToken");
    localStorage.removeItem("foodUser");

    navigate("/login");
  };

  if (loading) {
    return (
      <section className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <RefreshCw
            size={38}
            className="text-orange-500 animate-spin mx-auto"
          />

          <p className="text-gray-500 mt-4 font-medium">
            Loading profile...
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <User
            size={60}
            className="text-gray-300 mx-auto"
          />

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Profile Not Found
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[75vh] bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <User
              size={48}
              className="text-orange-500"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-5">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

          {/* Top Section */}
          <div className="bg-linear-to-r from-orange-500 to-orange-400 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div>
                <p className="text-orange-100 text-sm">
                  Welcome back
                </p>

                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {user.name}
                </h2>
              </div>

              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                <span className="text-sm font-bold capitalize">
                  {user.role}
                </span>
              </div>

            </div>
          </div>

          {/* User Details */}
          <div className="p-6 sm:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center">
                    <User
                      size={21}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Full Name
                    </p>

                    <p className="font-bold text-gray-800 mt-1">
                      {user.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail
                      size={21}
                      className="text-blue-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-400">
                      Email Address
                    </p>

                    <p className="font-bold text-gray-800 mt-1 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck
                      size={21}
                      className="text-purple-500"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Account Role
                    </p>

                    <p className="font-bold text-gray-800 mt-1 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Account Status
                    </p>

                    <p className="font-bold text-green-600 mt-1">
                      Active
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              <button
                onClick={() => navigate("/my-orders")}
                className="bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag size={20} />
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >
                <LogOut size={20} />
                Logout
              </button>

            </div>

          </div>
        </div>

        {/* Admin Section */}
        {user.role === "admin" && (
          <div className="bg-white border border-orange-100 rounded-3xl p-6 sm:p-8 mt-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div>
                <p className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                  Administrator
                </p>

                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                  Admin Dashboard
                </h2>

                <p className="text-gray-500 mt-2">
                  Manage customer orders and update delivery status.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/orders")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
              >
                Manage Orders
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Profile;

