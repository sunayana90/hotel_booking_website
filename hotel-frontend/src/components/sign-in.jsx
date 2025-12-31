// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
//     if (password.length < 6) newErrors.password = "Password is required";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));

//       if (!user) {
//         setErrors({ general: "User not registered. Please sign up first." });
//         setTimeout(() => navigate("/sign-up"), 2000);
//         return;
//       }

//       if (user.email === email && user.password === password) {
//         localStorage.setItem("isLoggedIn", true);
//         localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
//         setTimeout(() => navigate("/"), 1000);
//       } else {
//         setErrors({ general: "Invalid email or password" });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDemo = () => {
//     setEmail("demo@luxehaven.com");
//     setPassword("demo123");
//     localStorage.setItem("user", JSON.stringify({ name: "Demo User", email: "demo@luxehaven.com", password: "demo123" }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black pt-32 pb-12 px-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 text-center">
//             <h2 className="text-4xl font-bold text-black mb-2">Welcome Back</h2>
//             <p className="text-black/70">Sign in to your Luxe Haven account</p>
//           </div>

//           <div className="p-8">
//             {/* Error Message */}
//             {errors.general && (
//               <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
//                 <FaExclamationCircle className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
//                 <p className="text-red-700 font-semibold">{errors.general}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <FaEnvelope className="text-yellow-500" /> Email *
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
//                   }}
//                   placeholder="your@email.com"
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
//                     errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <FaExclamationCircle /> {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                   <FaLock className="text-yellow-500" /> Password *
//                 </label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
//                   }}
//                   placeholder="Enter your password"
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ${
//                     errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <FaExclamationCircle /> {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 rounded border-gray-300 text-yellow-500"
//                   />
//                   <span className="text-sm text-gray-700">Remember me</span>
//                 </label>
//                 <Link to="#" className="text-sm text-yellow-500 hover:text-yellow-600 font-semibold">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? "Signing In..." : "Sign In"}
//               </button>
//             </form>

//             {/* Demo Button */}
//             <button
//               type="button"
//               onClick={handleDemo}
//               className="w-full mt-4 border-2 border-yellow-500 text-yellow-500 font-bold py-3 rounded-lg hover:bg-yellow-50 transition duration-300"
//             >
//               Try Demo Account
//             </button>

//             {/* Sign Up Link */}
//             <p className="text-center text-gray-600 mt-6">
//               Don't have an account?{" "}
//               <Link to="/sign-up" className="text-yellow-500 font-bold hover:text-yellow-600 transition">
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE USER
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔁 REDIRECT BASED ON ROLE
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      // 👇 USER DOES NOT EXIST → SIGN UP
      if (err.response?.data?.redirect === "signup") {
        navigate("/sign-up", {
          state: { email },
        });
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Sign In
        </h2>

        {/* ERROR MESSAGE */}
        {errors.general && (
          <p className="text-red-500 text-center mb-4">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-black font-semibold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-yellow-500 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
