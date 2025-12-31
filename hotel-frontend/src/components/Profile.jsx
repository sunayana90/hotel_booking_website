import React, { useEffect, useState } from "react";
import { getBookingsByEmail } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
      return;
    }

    getBookingsByEmail(email)
      .then(res => setBookings(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [email, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto pt-28 px-6 min-h-[70vh]"
    
   >
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-gray-600 mt-1">{user?.name}</p>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Bookings Section */}
      <h3 className="text-3xl font-bold mb-6">My Bookings</h3>

      {loading && (
        <p className="text-gray-500">Loading bookings...</p>
      )}

      {!loading && bookings.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">
          <p className="text-lg font-semibold">No bookings found 🛎️</p>
          <p className="text-sm mt-2 text-gray-600">
            You haven’t booked any rooms yet.
          </p>
        </div>
      )}

      {bookings.map((b, i) => (
        <div
          key={i}
          className="bg-white shadow p-6 rounded-xl mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-lg capitalize">
              {b.roomType} Room
            </p>
            <p className="text-green-600 font-bold">
              ₹{b.totalPrice || b.totalAmount}
            </p>
          </div>

          <p className="text-gray-600">
            Guests: <b>{b.guests}</b>
          </p>

          <p className="text-gray-600">
            {b.checkIn} → {b.checkOut}
          </p>
        </div>
      ))}
    </div>
  );
}
