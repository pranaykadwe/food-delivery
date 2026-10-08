import React from "react";
import {   } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-orange-500">
              Foodie
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Your favorite food delivered directly to your doorstep.
              Discover restaurants, order delicious meals and enjoy
              your food.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
            
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Instagram size={20} /> */}
              </a>

              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Twitter size={20} /> */}
              </a>

            </div>

          </div>

          {/* Company */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <a href="#" className="hover:text-orange-500">
                About Us
              </a>

              <a href="#" className="hover:text-orange-500">
                Careers
              </a>

              <a href="#" className="hover:text-orange-500">
                Contact Us
              </a>

              <a href="#" className="hover:text-orange-500">
                Blog
              </a>

            </div>

          </div>

          {/* Help */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <a href="#" className="hover:text-orange-500">
                Help Center
              </a>

              <a href="#" className="hover:text-orange-500">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-orange-500">
                Terms & Conditions
              </a>

              <a href="#" className="hover:text-orange-500">
                FAQs
              </a>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="text-gray-400 space-y-3">

              <p>📍 Nagpur, Maharashtra</p>

              <p>📧 support@foodie.com</p>

              <p>📞 +91 98765 43210</p>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">

          <p>
            © 2026 Foodie. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;