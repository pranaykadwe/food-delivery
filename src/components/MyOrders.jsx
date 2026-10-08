
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("foodToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("foodToken");
        localStorage.removeItem("foodUser");

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Status icon
  const getStatusIcon = (status) => {
    if (status === "Delivered") {
      return (
        <CheckCircle
          size={20}
          className="text-green-600"
        />
      );
    }

    if (status === "Out for Delivery") {
      return (
        <Truck
          size={20}
          className="text-blue-600"
        />
      );
    }

    if (status === "Confirmed") {
      return (
        <CheckCircle
          size={20}
          className="text-orange-500"
        />
      );
    }

    return (
      <Clock
        size={20}
        className="text-yellow-600"
      />
    );
  };

  // Status background
  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-700 border-green-100";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    if (status === "Confirmed") {
      return "bg-orange-50 text-orange-700 border-orange-100";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-100";
  };

  // Date format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // Time format
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // Loading
  if (loading) {
    return (
      <section className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-500 font-semibold mt-5">
            Loading your orders...
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package
                  size={25}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  My Orders
                </h1>

                <p className="text-gray-500 mt-1">
                  Track and manage your food orders.
                </p>
              </div>

            </div>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchOrders}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-orange-400 hover:text-orange-500 px-5 py-3 rounded-xl font-bold transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 px-6 text-center">

            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag
                size={38}
                className="text-orange-400"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't placed any orders yet.
              Discover delicious food and place your
              first order.
            </p>

            <button
              onClick={() =>
                navigate("/restaurants")
              }
              className="mt-7 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Browse Foods
            </button>

          </div>
        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >

                {/* Order Header */}
                <div className="p-5 sm:p-6 border-b border-gray-100">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="text-sm text-gray-500">
                          Order ID:
                        </span>

                        <span className="text-sm font-bold text-gray-800 break-all">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>

                      </div>

                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(order.createdAt)} at{" "}
                        {formatTime(order.createdAt)}
                      </p>

                    </div>

                    {/* Status */}
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm w-fit ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}

                      <span>
                        {order.status}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Order Items */}
                <div className="p-5 sm:p-6">

                  <div className="space-y-4">

                    {order.items.map(
                      (item, index) => (

                        <div
                          key={`${item.id}-${index}`}
                          className="flex items-center gap-4"
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                          />

                          <div className="flex-1 min-w-0">

                            <h3 className="font-bold text-gray-800 truncate">
                              {item.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {item.restaurant}
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                              ₹{item.price} ×{" "}
                              {item.quantity}
                            </p>

                          </div>

                          <p className="font-bold text-gray-800">
                            ₹
                            {Number(item.price) *
                              Number(item.quantity)}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* Delivery + Total */}
                <div className="bg-gray-50 p-5 sm:p-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Address */}
                    <div>

                      <div className="flex items-center gap-2 mb-3">
                        <MapPin
                          size={19}
                          className="text-orange-500"
                        />

                        <h3 className="font-bold text-gray-800">
                          Delivery Address
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 leading-6">
                        {order.customer.name}
                        <br />
                        {order.customer.address}
                        <br />
                        {order.customer.city} -{" "}
                        {order.customer.pincode}
                        <br />
                        📞 {order.customer.phone}
                      </p>

                    </div>

                    {/* Total */}
                    <div className="md:text-right">

                      <p className="text-sm text-gray-500">
                        Order Total
                      </p>

                      <p className="text-3xl font-extrabold text-orange-500 mt-1">
                        ₹{order.total}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default MyOrders;
