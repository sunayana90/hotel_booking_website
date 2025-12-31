import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\+?[\d\s\-()]{10,}$/)) newErrors.phone = "Valid phone is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Send to backend
      try {
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        
        if (response.ok) {
          setSubmitted(true);
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
          setTimeout(() => setSubmitted(false), 5000);
        }
      } catch (error) {
        console.error("Contact form error:", error);
        alert("Failed to send message. Please try again.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black min-h-screen pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg border-t-4 border-yellow-500 hover:shadow-yellow-500/50 hover:shadow-2xl transition">
            <FaMapMarkerAlt className="text-yellow-500 text-3xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-gray-400">123 Luxury Boulevard, Mumbai, Maharashtra 400001, India</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 shadow-lg border-t-4 border-yellow-500 hover:shadow-yellow-500/50 hover:shadow-2xl transition">
            <FaPhone className="text-yellow-500 text-3xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
            <p className="text-gray-400">+91 (22) 1234-5678</p>
            <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM IST</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 shadow-lg border-t-4 border-yellow-500 hover:shadow-yellow-500/50 hover:shadow-2xl transition">
            <FaEnvelope className="text-yellow-500 text-3xl mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400">info@luxehaven.com</p>
            <p className="text-gray-400 text-sm">We reply within 24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-xl shadow-xl p-10 border border-gray-800">
            {submitted && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg flex items-center gap-3">
                <FaCheckCircle className="text-green-400 text-2xl" />
                <div>
                  <h4 className="font-bold text-green-400">Message Sent!</h4>
                  <p className="text-green-400">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition bg-gray-800 text-white placeholder-gray-500 ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition bg-gray-800 text-white placeholder-gray-500 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition bg-gray-800 text-white placeholder-gray-500 ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition bg-gray-800 text-white placeholder-gray-500 ${
                    errors.subject ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition resize-none bg-gray-800 text-white placeholder-gray-500 ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105 duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
