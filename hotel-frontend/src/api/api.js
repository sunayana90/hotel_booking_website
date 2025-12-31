// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// export default api;

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// CREATE BOOKING
export const createBooking = (bookingData) => {
  return api.post("/bookings", bookingData);
};

export default api;

// GET BOOKINGS BY EMAIL (PROFILE)
export const getBookingsByEmail = (email) => {
  return api.get(`/bookings/${email}`);
};

