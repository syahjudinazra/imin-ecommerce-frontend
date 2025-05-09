import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "./Logo";
const Footer = () => {
  return (
    <footer className="bg-gray-100 -mt-24 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 mt-32 md:grid-cols-5 gap-8 ml-4">
          {/* Logo and Tagline Section */}
          <div className="md:col-span-1">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-gray-600 text-sm mb-6">
              We have clothes that suits your style and which you're proud to
              Imin is a POS hardware device provider company that has many types
              of devices according to your business needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-800 hover:text-gray-600">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800 uppercase text-sm mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800 uppercase text-sm mb-4">
              HELP
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Customer Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Delivery Details
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800 uppercase text-sm mb-4">
              FAQ
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Manage Deliveries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Payments
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-800 uppercase text-sm mb-4">
              RESOURCES
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  iMin Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  iMin Kit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  iMin Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  iMin Firmware
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            iMin © 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
