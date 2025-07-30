

import React from 'react';
import { ShoppingCart, Users, Award, TrendingUp, Heart, Shield, Truck, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
  const stats = [
    { number: '1M+', label: 'Happy Customers', icon: Users },
    { number: '10K+', label: 'Products Available', icon: ShoppingCart },
    { number: '50+', label: 'Countries Served', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make starts with our customers in mind. Your satisfaction is our success.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We protect your data and transactions with enterprise-grade security measures.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping with real-time tracking to get your orders to you quickly.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We partner only with verified sellers and brands to ensure premium quality products.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      // image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      image: 'https://plus.unsplash.com/premium_photo-1675713554352-e3351772eadd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Visionary leader with 15+ years in e-commerce innovation.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Tech expert ensuring seamless platform performance.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'Passionate about creating exceptional customer journeys.'
    },
    {
      name: 'David Kim',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'Logistics master ensuring smooth order fulfillment.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-yellow-500">Cart Mart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Revolutionizing e-commerce with innovative solutions, exceptional service, and a commitment to connecting people with the products they love.
            </p>
            <div className="inline-flex items-center bg-yellow-500 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors cursor-pointer">
              <ShoppingCart className="mr-2" size={24} />
              Our Story Begins Here
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="text-blue-900" size={32} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2018, Cart Mart began as a simple idea: to create an e-commerce platform that truly puts customers first. What started as a small team of passionate individuals has grown into a global marketplace serving millions of customers worldwide.
                </p>
                <p>
                  We recognized that online shopping had become impersonal and complicated. Our mission was to change that by building a platform that combines cutting-edge technology with genuine human care, making online shopping as enjoyable as browsing your favorite local store.
                </p>
                <p>
                  Today, Cart Mart stands as a testament to innovation, reliability, and customer satisfaction. We've built more than just a marketplace – we've created a community where buyers and sellers thrive together, supported by world-class technology and unwavering commitment to excellence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg leading-relaxed mb-6">
                  To democratize commerce by providing a platform where anyone can buy and sell with confidence, backed by innovative technology and exceptional customer service.
                </p>
                <div className="inline-flex items-center text-yellow-500 font-semibold">
                  <Award className="mr-2" size={20} />
                  Trusted by millions worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape every decision we make at Cart Mart.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="text-blue-900" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary minds behind Cart Mart's success, dedicated to bringing you the best e-commerce experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{member.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Experience the Cart Mart difference today. Join millions of satisfied customers who trust us for their online shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={"/"}>
            <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors inline-flex items-center">
              <ShoppingCart className="mr-2" size={24} />
              Start Shopping Now
            </button>
            </Link>
            <Link href={'/contact'}>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center">
              <Headphones className="mr-2" size={24} />
              Contact Our Team
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}