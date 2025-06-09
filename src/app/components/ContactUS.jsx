"use client"
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Package, 
  HelpCircle,
  AlertTriangle,
  Headphones,
  Search,
  Star,
  Send,
  CheckCircle
} from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactOptions = [
    {
      icon: Package,
      title: 'Check Order Status',
      description: 'Track your orders and delivery updates in real-time',
      action: 'Track Order',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Find answers to common questions and troubleshooting guides',
      action: 'Browse FAQ',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: AlertTriangle,
      title: 'Report Abuse',
      description: 'Report suspicious activity, fraud, or policy violations',
      action: 'Report Issue',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: '24/7 dedicated support for all your shopping needs',
      action: 'Get Support',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: 'Feedback & Reviews',
      description: 'Share your experience and help us improve our service',
      action: 'Leave Review',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Account Security',
      description: 'Report security concerns or get help with account issues',
      action: 'Security Help',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      subtext: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@cartmart.com',
      subtext: 'Response within 2 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available on website',
      subtext: 'Instant assistance'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: '123 Commerce Street, Tech City, TC 12345',
      subtext: 'Visit us in person'
    }
  ];

  const categories = [
    'General Inquiry',
    'Order Issue',
    'Payment Problem',
    'Technical Support',
    'Product Question',
    'Shipping Concern',
    'Account Help',
    'Report Abuse',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Contact <span className="text-yellow-500">Cart Mart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              We're here to help! Get in touch with our dedicated support team for any questions, concerns, or assistance you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="inline-flex items-center bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-semibold">
                <Clock className="mr-2" size={20} />
                24/7 Support Available
              </div>
              <div className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full font-semibold">
                <MessageCircle className="mr-2" size={20} />
                Average Response: 5 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">How Can We Help You?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the option that best describes what you need assistance with.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-200">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    <option.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">{option.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                  <div className="inline-flex items-center text-yellow-600 font-semibold group-hover:text-yellow-500 transition-colors">
                    {option.action}
                    <Send className="ml-2" size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message</h2>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please provide detailed information about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 inline-flex items-center justify-center"
                  >
                    <Send className="mr-2" size={20} />
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Get In Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Our customer support team is available 24/7 to assist you with any questions or concerns. Choose your preferred method of contact below.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl">
                      <info.icon className="text-blue-900" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg">{info.title}</h3>
                      <p className="text-gray-800 font-medium">{info.details}</p>
                      <p className="text-gray-500 text-sm">{info.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="mr-2" size={24} />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-yellow-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span className="text-yellow-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holidays:</span>
                    <span className="text-yellow-400">24/7</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <p className="text-sm opacity-90">
                    <strong>Live Chat:</strong> Always available on our website
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact our support team.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How can I track my order?",
                answer: "You can track your order by logging into your account and visiting the 'My Orders' section, or use our order tracking tool with your order number."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for most items. Products must be in original condition. Some restrictions apply for certain categories."
              },
              {
                question: "How do I report a problem with a seller?",
                answer: "Use our 'Report Abuse' feature to report any issues with sellers, including fraud, counterfeit products, or policy violations."
              },
              {
                question: "Is my payment information secure?",
                answer: "Yes, we use industry-standard encryption and security measures to protect all payment information and personal data."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-blue-600 text-lg mb-3 flex items-start">
                  <HelpCircle className="mr-2 mt-1 flex-shrink-0" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}