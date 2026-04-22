import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, Clock,
  MessageSquare, CheckCircle, Facebook,
  Twitter, Instagram, Linkedin
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: 'netred@gmail.com', // Your email address
        from_name: formData.name,
        from_email: formData.email,
        subject: `[${formData.category}] ${formData.subject || 'Contact Form Submission'}`,
        message: formData.message,
        category: formData.category
      };

      // You need to get these from your EmailJS account
      const serviceId = 'YOUR_SERVICE_ID'; // Replace with your service ID
      const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
      const userId = 'YOUR_USER_ID'; // Replace with your user ID/public key

      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      setLoading(false);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setLoading(false);
      // You might want to add error state here
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: ['support@bizconnect.com', 'info@bizconnect.com'],
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: ['+91 7009586754', '+91 8207629969'],
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: ['Jalandhar', 'Punjab, India'],
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9 AM - 6 PM', 'Saturday: 10 AM - 4 PM', 'Sunday: Closed'],
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  const faqs = [
    {
      question: 'How do I list my business on BizConnect?',
      answer: 'Click on "List Your Business" in the navigation menu or visit the business creation page to get started.'
    },
    {
      question: 'Is there a fee to list my business?',
      answer: 'Basic listings are completely free! We offer premium features for businesses wanting more visibility.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Click the report button on any review or business listing, or contact our support team directly.'
    },
    {
      question: 'Can I manage multiple business locations?',
      answer: 'Yes! Business accounts can add and manage multiple locations from a single dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="text-white relative"
        style={{
          backgroundImage: 'url(/bg3.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl mb-8">
              We're here to help! Contact us with any questions or feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${info.bg} rounded-lg flex items-center justify-center mb-4`}>
                <div className={info.color}>{info.icon}</div>
              </div>
              <h3 className="text-lg font-bold mb-3">{info.title}</h3>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold">Send us a Message</h2>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Message sent successfully!</p>
                    <p className="text-green-700 text-sm">
                      We've received your message and will respond to netred@gmail.com within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="business">Business Support</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="report">Report an Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ & Social */}
          <div className="space-y-8">
            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <a
                  href="/faq"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  View all FAQs →
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              
              <p className="text-gray-600 mb-6">
                Follow us on social media for updates, tips, and community highlights.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition"
                >
                  <Facebook size={24} />
                </a>
                
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-50 text-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100 transition"
                >
                  <Twitter size={24} />
                </a>
                
                <a
                  href="https://www.instagram.com/kajal.19__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-100 transition"
                >
                  <Instagram size={24} />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/kajaldwivedi19/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-100 transition"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              
              <p className="mb-6">
                Get the latest updates, business tips, and exclusive offers delivered to your inbox.
              </p>
              
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-r-lg hover:bg-gray-100 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200">
                {/* Google Maps would go here */}
                <div className="h-full flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-300">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Jalandhar Cantt, Jalandhar, PB 144001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4">Visit Our Office</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-gray-600">Jalandhar, Punjab</p>
                    <p className="text-gray-600">India, NY 144001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-gray-400 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-medium">Visiting Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-gray-600">By appointment only</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;