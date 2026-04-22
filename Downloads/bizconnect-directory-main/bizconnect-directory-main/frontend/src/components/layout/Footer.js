import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4 text-white">BizConnect</div>
            <p className="text-gray-400 mb-6">
              Connecting businesses with customers through trust and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/kajal.19__/" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/kajaldwivedi19/" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-gray-400 hover:text-white transition">
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link to="/business/create" className="text-gray-400 hover:text-white transition">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/businesses?category=restaurant" className="text-gray-400 hover:text-white transition">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=retail" className="text-gray-400 hover:text-white transition">
                  Retail Stores
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=service" className="text-gray-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=health" className="text-gray-400 hover:text-white transition">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/businesses?category=education" className="text-gray-400 hover:text-white transition">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin size={18} className="mr-3" />
                Punjab, India
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={18} className="mr-3" />
                +91 7009586754
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={18} className="mr-3" />
                support@bizconnect.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} BizConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;