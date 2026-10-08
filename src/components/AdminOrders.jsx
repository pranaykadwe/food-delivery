
import React, { useEffect, useState } from "react";
import {
  Package,
  RefreshCw,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  Truck,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const statusOptions = [
    "Preparing",
    "Confirmed",
    "Out for Delivery",
    "Delivered",
  ];

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("foodToken");
      const userData = localStorage.getItem("foodUser");

      if (!token || !userData) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(userData);

      if (user.role !== "admin") {
        navigate("/");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/orders",
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
      console.log("Admin Orders Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("foodToken");
        localStorage.removeItem("foodUser");

        navigate("/login");
        return;
      }

      if (error.response?.status === 403) {
        alert("Admin access required");
        navigate("/");
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

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const token = localStorage.getItem("foodToken");

      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: response.data.order.status,
                }
              : order
          )
        );

        alert("Order status updated successfully ✅");
      }
    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Date
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

  // Time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // Status icon
  const getStatusIcon = (status) => {
    if (status === "Delivered") {
      return (
        <CheckCircle
          size={19}
          className="text-green-600"
        />
      );
    }

    if (status === "Out for Delivery") {
      return (
        <Truck
          size={19}
          className="text-blue-600"
        />
      );
    }

    if (status === "Confirmed") {
      return (
        <CheckCircle
          size={19}
          className="text-orange-500"
        />
      );
    }

    return (
      <Clock
        size={19}
        className="text-yellow-600"
      />
    );
  };

  // Status style
  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (status === "Confirmed") {
      return "bg-orange-50 text-orange-700 border-orange-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  // Loading
  if (loading) {
    return (
      <section className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 font-semibold mt-5">
            Loading all orders...
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Package
                size={26}
                className="text-orange-500"
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Admin Orders
              </h1>

              <p className="text-gray-500 mt-1">
                Manage customer orders and delivery status.
              </p>
            </div>

          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-orange-400 hover:text-orange-500 px-5 py-3 rounded-xl font-bold transition"
          >
            <RefreshCw size={18} />
            Refresh Orders
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="text-3xl font-extrabold text-gray-900 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Preparing
            </p>

            <p className="text-3xl font-extrabold text-yellow-600 mt-2">
              {
                orders.filter(
                  (order) =>
                    order.status === "Preparing"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Out for Delivery
            </p>

            <p className="text-3xl font-extrabold text-blue-600 mt-2">
              {
                orders.filter(
                  (order) =>
                    order.status ===
                    "Out for Delivery"
                ).length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Delivered
            </p>

            <p className="text-3xl font-extrabold text-green-600 mt-2">
              {
                orders.filter(
                  (order) =>
                    order.status === "Delivered"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Empty */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 text-center">

            <Package
              size={55}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              Customer orders will appear here.
            </p>

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

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-sm text-gray-500">
                          Order ID:
                        </span>

                        <span className="font-bold text-gray-800">
                          #{order._id
                            .slice(-8)
                            .toUpperCase()}
                        </span>

                      </div>

                      <p className="text-sm text-gray-400 mt-1">
                        {formatDate(order.createdAt)} at{" "}
                        {formatTime(order.createdAt)}
                      </p>

                    </div>

                    {/* Status */}
                    <div className="flex flex-col sm:flex-row gap-3">

                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}

                        {order.status}
                      </div>

                      {/* Status Select */}
                      <div className="relative">

                        <select
                          value={order.status}
                          disabled={
                            updatingId === order._id
                          }
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className="appearance-none w-full sm:w-48 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 font-semibold text-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                        >
                          {statusOptions.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                        <ChevronDown
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* Customer + Items */}
                <div className="p-5 sm:p-6">

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Customer */}
                    <div>

                      <h3 className="font-bold text-gray-900 mb-4">
                        Customer Details
                      </h3>

                      <div className="space-y-3">

                        <div className="flex items-start gap-3">
                          <User
                            size={18}
                            className="text-orange-500 mt-0.5"
                          />

                          <div>
                            <p className="text-xs text-gray-400">
                              Name
                            </p>

                            <p className="font-semibold text-gray-700">
                              {order.customer.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail
                            size={18}
                            className="text-orange-500 mt-0.5"
                          />

                          <div className="min-w-0">
                            <p className="text-xs text-gray-400">
                              Email
                            </p>

                            <p className="font-semibold text-gray-700 break-all">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone
                            size={18}
                            className="text-orange-500 mt-0.5"
                          />

                          <div>
                            <p className="text-xs text-gray-400">
                              Phone
                            </p>

                            <p className="font-semibold text-gray-700">
                              {order.customer.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin
                            size={18}
                            className="text-orange-500 mt-0.5"
                          />

                          <div>
                            <p className="text-xs text-gray-400">
                              Address
                            </p>

                            <p className="font-semibold text-gray-700 leading-6">
                              {order.customer.address}
                              <br />
                              {order.customer.city} -{" "}
                              {order.customer.pincode}
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Items */}
                    <div className="lg:col-span-2">

                      <h3 className="font-bold text-gray-900 mb-4">
                        Ordered Items
                      </h3>

                      <div className="space-y-4">

                        {order.items.map(
                          (item, index) => (

                            <div
                              key={`${item.id}-${index}`}
                              className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3"
                            >

                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover"
                              />

                              <div className="flex-1 min-w-0">

                                <h4 className="font-bold text-gray-800 truncate">
                                  {item.name}
                                </h4>

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

                  </div>

                </div>

                {/* Total */}
                <div className="bg-gray-50 border-t border-gray-100 px-5 sm:px-6 py-5">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        Customer Order Total
                      </p>

                      <p className="text-3xl font-extrabold text-orange-500 mt-1">
                        ₹{order.total}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-2 font-bold ${order.status === "Delivered"
                          ? "text-green-600"
                          : "text-gray-600"
                        }`}
                    >
                      {getStatusIcon(order.status)}

                      {order.status === "Delivered"
                        ? "Order Delivered"
                        : "Order in Progress"}
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

export default AdminOrders;

