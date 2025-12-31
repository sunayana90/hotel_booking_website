import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/sign-in";
    }
  }, []);
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatsCard title="Total Rooms" value="24" />
          <StatsCard title="Bookings" value="128" />
          <StatsCard title="Revenue" value="₹4,20,000" />
          <StatsCard title="Users" value="312" />
        </div>

        {/* RECENT BOOKINGS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Guest</th>
                <th className="p-2">Room</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Rahul Sharma</td>
                <td className="p-2">Deluxe Room</td>
                <td className="p-2">12 Jan 2025</td>
                <td className="p-2 text-green-600">Confirmed</td>
              </tr>
              <tr>
                <td className="p-2">Anjali Patil</td>
                <td className="p-2">Suite</td>
                <td className="p-2">14 Jan 2025</td>
                <td className="p-2 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
