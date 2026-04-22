import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Users, Globe, Award,
  CheckCircle, Heart, Shield, Zap
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Kajal ',
      role: 'CEO & Founder',
      image: '/img.jpg',
      bio: '2+ years in business development'
    },
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: 'Our Mission',
      description: 'To connect communities with trusted local businesses through transparency and authentic reviews.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Trust & Safety',
      description: 'We verify every business listing and implement strict review policies to ensure authenticity.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community First',
      description: 'Our platform thrives on community engagement and user contributions.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Vision',
      description: 'Building connections that transcend geographical boundaries.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'BizConnect founded' },
    { year: '2021', event: 'First 1,000 businesses listed' },
    { year: '2022', event: 'Mobile app launched' },
    { year: '2023', event: 'Expanded to 50+ cities' },
    { year: '2024', event: '1 million+ monthly users' }
  ];

  return (
    <div className="min-h-screen">
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
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About BizConnect</h1>
            <p className="text-xl mb-8">
              We're revolutionizing how communities discover and connect with local businesses.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/businesses"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Explore Businesses
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg">
              BizConnect was born from a simple idea: making it easier for people to discover 
              amazing local businesses while helping those businesses thrive. What started as a 
              small project has grown into a nationwide platform connecting millions of users 
              with trusted businesses every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <img
                src="/img4.jpg"
                alt="Our story"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Why We Started</h3>
              <p className="text-gray-600 mb-4">
                We noticed a gap between local businesses and their potential customers. 
                Many great businesses struggled to get discovered, while customers found it 
                hard to find reliable services in their area.
              </p>
              <p className="text-gray-600">
                BizConnect bridges this gap by creating a trusted platform where businesses 
                can showcase their services and customers can make informed decisions based 
                on authentic reviews and ratings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at BizConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-600">Key milestones in our growth story</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind BizConnect's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,000+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Businesses Listed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
            <div className="text-gray-600">Monthly Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
            <div className="text-gray-600">Reviews & Ratings</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="text-white py-16 relative"
        style={{
          backgroundImage: 'url(/bg4.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to discover great businesses or grow your own, 
            BizConnect has something for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Join as a User
            </Link>
            <Link
              to="/business/create"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;