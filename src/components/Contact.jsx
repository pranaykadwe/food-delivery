
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully! 🎉");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
            Get In Touch
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2">
            Contact FoodHub
          </h1>

          <p className="text-gray-500 mt-4 leading-7">
            Have a question, suggestion or need help with your
            order? Our team would love to hear from you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Mail
                size={23}
                className="text-orange-500"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-5">
              Email Us
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              support@foodhub.com
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Phone
                size={23}
                className="text-orange-500"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-5">
              Call Us
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              +91 98765 43210
            </p>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <MapPin
                size={23}
                className="text-orange-500"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-5">
              Our Location
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Nagpur, Maharashtra, India
            </p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock
                size={23}
                className="text-orange-500"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-5">
              Working Hours
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Mon - Sun: 10 AM - 11 PM
            </p>
          </div>

        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Side */}
          <div className="bg-gray-900 text-white rounded-3xl p-7 sm:p-10">

            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">
              Let's Talk
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">
              We'd love to hear from you.
            </h2>

            <p className="text-gray-300 leading-7 mt-5">
              Whether you have feedback about our food,
              delivery experience or website, feel free to
              send us a message.
            </p>

            <div className="space-y-5 mt-10">

              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="font-bold">
                    Email
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    support@foodhub.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="font-bold">
                    Phone
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="font-bold">
                    Address
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                We usually respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-gray-100 shadow-sm">

            <div className="flex items-center gap-3 mb-7">
              <div className="bg-orange-100 p-3 rounded-xl">
                <MessageSquare
                  size={23}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Fill out the form below.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full border border-gray-200 rounded-xl py-3.5 px-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 rounded-xl py-3.5 px-4 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={19} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

