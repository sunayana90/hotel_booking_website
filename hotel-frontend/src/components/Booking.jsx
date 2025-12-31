import React, { useState, useEffect } from "react";
import { createBooking } from "../api/api";
import { FaCalendarAlt, FaUsers, FaDoorOpen, FaCheckCircle } from "react-icons/fa";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "deluxe",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [errors, setErrors] = useState({});
  const [bookingData, setBookingData] = useState({ name: "", roomType: "", totalPrice: 0 });

  // Initialize with selected room from localStorage
  useEffect(() => {
    const storedRoom = localStorage.getItem('selectedRoom');
    if (storedRoom) {
      const room = JSON.parse(storedRoom);
      setSelectedRoomData(room);
      
      // Map room title to room type value
      let roomTypeValue = "deluxe";
      if (room.category === "STANDARD") roomTypeValue = "standard";
      else if (room.category === "EXECUTIVE") roomTypeValue = "executive";
      else if (room.category === "PRESIDENTIAL") roomTypeValue = "presidential";
      
      setForm(prev => ({ ...prev, roomType: roomTypeValue }));
      localStorage.removeItem('selectedRoom'); // Clear after using
    }
  }, []);

 const roomTypes = [
  { value: "standard", label: "Standard Room", price: 8000, display: "₹8,000/night" },
  { value: "deluxe", label: "Deluxe Room", price: 12000, display: "₹12,000/night" },
  { value: "executive", label: "Executive Suite", price: 20000, display: "₹20,000/night" },
  { value: "presidential", label: "Presidential Suite", price: 40000, display: "₹40,000/night" },
];


  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!form.phone.match(/^\+?[\d\s\-()]{10,}$/)) newErrors.phone = "Valid phone number is required";
    if (!form.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!form.checkOut) newErrors.checkOut = "Check-out date is required";
    if (new Date(form.checkOut) <= new Date(form.checkIn)) newErrors.checkOut = "Check-out must be after check-in";
    if (form.guests < 1 || form.guests > 6) newErrors.guests = "Guests must be between 1 and 6";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newErrors = validateForm();

  //   if (Object.keys(newErrors).length === 0) {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/bookings", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(form),
  //       });

  //       if (response.ok) {
  //         setSubmitted(true);
  //         setForm({
  //           name: "",
  //           email: "",
  //           phone: "",
  //           checkIn: "",
  //           checkOut: "",
  //           guests: 1,
  //           roomType: "deluxe",
  //           specialRequests: "",
  //         });
  //         setTimeout(() => setSubmitted(false), 5000);
  //       }
  //     } catch (error) {
  //       console.error("Booking error:", error);
  //       alert("Failed to complete booking. Please try again.");
  //     }
  //   } else {
  //     setErrors(newErrors);
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setLoading(true);

    // Calculate totals for display
    const checkOut = new Date(form.checkOut);
    const checkIn = new Date(form.checkIn);
    const calculatedNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    const selectedRoom = roomTypes.find(r => r.value === form.roomType);
    const calculatedPrice = selectedRoom ? selectedRoom.price : 0;
    
    const calculatedBasePrice = calculatedNights * calculatedPrice;
    const calculatedExtraGuests = form.guests > 2 ? form.guests - 2 : 0;
    const calculatedExtraCost = calculatedExtraGuests * 1500 * calculatedNights;
    const calculatedSubTotal = calculatedBasePrice + calculatedExtraCost;
    const calculatedGST = Math.round(calculatedSubTotal * 0.12);
    const calculatedTotal = calculatedSubTotal + calculatedGST;

    const response = await createBooking({
      ...form,
      nights: calculatedNights,
      pricePerNight: calculatedPrice,
      basePrice: calculatedBasePrice,
      extraGuestCost: calculatedExtraCost,
      gstAmount: calculatedGST,
      totalAmount: calculatedTotal,
    });

    console.log("Booking response:", response.data);

    // ✅ STORE BOOKING DATA FOR SUCCESS SCREEN
    const displayRoomType = selectedRoomData 
      ? selectedRoomData.title 
      : roomTypes.find(r => r.value === form.roomType)?.label;

    setBookingData({
      name: form.name,
      roomType: displayRoomType,
      totalPrice: calculatedTotal,
    });

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      roomType: "deluxe",
      specialRequests: "",
    });

  } catch (error) {
    console.error("Booking error:", error);
    alert("❌ Booking failed");
  } finally {
    setLoading(false);
  }
};


  const calculateNights = () => {
    if (form.checkIn && form.checkOut) {
      const checkOut = new Date(form.checkOut);
      const checkIn = new Date(form.checkIn);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };
const GST_RATE = 0.12;
const BASE_GUESTS = 2;
const EXTRA_GUEST_PRICE = 1500;

const selectedRoom = roomTypes.find(r => r.value === form.roomType);
const pricePerNight = selectedRoom ? selectedRoom.price : 0;

const nights = calculateNights();

const basePrice = nights * pricePerNight;

const extraGuests = form.guests > BASE_GUESTS ? form.guests - BASE_GUESTS : 0;
const extraGuestCost = extraGuests * EXTRA_GUEST_PRICE * nights;

const subTotal = basePrice + extraGuestCost;
const gstAmount = Math.round(subTotal * GST_RATE);
const totalPrice = subTotal + gstAmount;

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center px-4 pt-32 pb-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-yellow-400">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-yellow-400">
                <FaCheckCircle className="text-yellow-500 text-5xl" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-yellow-600 mb-4">
              Booking Successful!
            </h2>
            
            <p className="text-gray-600 text-lg mb-8">
              Your room has been booked successfully. A confirmation email has been sent to your email address.
            </p>

            <div className="bg-gradient-to-b from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 space-y-4">
              <div className="text-left space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Guest Name</p>
                  <p className="text-xl font-bold text-gray-900">{bookingData.name}</p>
                </div>
                <hr className="border-yellow-300" />
                <div>
                  <p className="text-gray-600 text-sm">Room Type</p>
                  <p className="text-xl font-bold text-gray-900">{bookingData.roomType}</p>
                </div>
                <hr className="border-yellow-300" />
                <div>
                  <p className="text-gray-600 text-sm">Total Amount</p>
                  <p className="text-3xl font-bold text-yellow-600">₹{bookingData.totalPrice}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300 transform hover:scale-105"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 pt-32 pb-12">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Book Your Stay
            </h2>
            <p className="text-gray-600 mb-8">Experience luxury at Luxe Haven</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-yellow-500" /> Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    errors.checkIn ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-yellow-500" /> Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
                    errors.checkOut ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaDoorOpen className="text-yellow-500" /> Room Type *
                </label>
                <select
                  name="roomType"
                  value={form.roomType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {roomTypes.map(room => (
                    <option key={room.value} value={room.value}>
                     {room.label} - {room.display}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUsers className="text-yellow-500" /> Number of Guests *
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
                {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requirements or requests?"
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              
 <button
  type="submit"
  disabled={loading}
  className="w-full bg-yellow-500 py-3 rounded-lg font-bold"
>
  {loading ? "Booking..." : "Complete Booking"}
</button>



            </form>
          </div>

          {/* Summary Section */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-2xl p-10 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Booking Summary</h3>

              <div className="space-y-6 border-b pb-6">
                {form.checkIn && form.checkOut && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-semibold">{new Date(form.checkIn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-semibold">{new Date(form.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Number of Nights:</span>
                      <span className="font-semibold text-yellow-500">{nights} nights</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-semibold">{roomTypes.find(r => r.value === form.roomType)?.label}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-semibold">{form.guests}</span>
                </div>
              </div>

             <div className="pt-6 space-y-4">
  {nights > 0 && (
    <>
      <div className="flex justify-between">
        <span className="text-gray-600">Price / Night:</span>
        <span className="font-semibold">₹{pricePerNight}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">
          Room ({nights} nights):
        </span>
        <span className="font-semibold">₹{basePrice}</span>
      </div>

      {extraGuests > 0 && (
        <div className="flex justify-between">
          <span className="text-gray-600">
            Extra Guests ({extraGuests}):
          </span>
          <span className="font-semibold">
            ₹{extraGuestCost}
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-gray-600">GST (12%):</span>
        <span className="font-semibold">₹{gstAmount}</span>
      </div>

      <hr />

      <div className="flex justify-between text-xl">
        <span className="font-bold">Total Amount:</span>
        <span className="font-bold text-green-600">
          ₹{totalPrice}
        </span>
      </div>
    </>
  )}

  <p className="text-xs text-gray-500 text-center pt-4">
    Inclusive of GST. Extra services charged separately.
  </p>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Booking.js
