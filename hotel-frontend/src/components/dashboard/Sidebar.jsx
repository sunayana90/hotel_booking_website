// src/components/dashboard/Sidebar.jsx
import { Link } from "react-router-dom";
import { FaHotel, FaBed, FaUsers, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-black text-white fixed">
      <div className="p-6 text-2xl font-bold text-yellow-400">
        Luxe Haven
      </div>

      <nav className="mt-6 flex flex-col space-y-2 px-4">
        <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-yellow-500 hover:text-black">
          <FaHotel /> Dashboard
        </Link>

        <Link to="/dashboard/rooms" className="flex items-center gap-3 p-3 rounded hover:bg-yellow-500 hover:text-black">
          <FaBed /> Rooms
        </Link>

        <Link to="/dashboard/bookings" className="flex items-center gap-3 p-3 rounded hover:bg-yellow-500 hover:text-black">
          <FaCalendarAlt /> Bookings
        </Link>

        <Link to="/dashboard/users" className="flex items-center gap-3 p-3 rounded hover:bg-yellow-500 hover:text-black">
          <FaUsers /> Users
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/sign-in";
          }}
          className="flex items-center gap-3 p-3 rounded hover:bg-red-600 mt-10"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
}
