// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../api/api";

// export default function SignUp() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: location.state?.email || "",
//     password: "",
//   });

//   const submit = async (e) => {
//     e.preventDefault();

//     await api.post("/auth/signup", form);

//     // AFTER SIGNUP → SIGN IN
//     navigate("/sign-in");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <form
//         onSubmit={submit}
//         className="bg-white p-8 rounded-xl w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Create Account</h2>

//         <input
//           placeholder="Full Name"
//           required
//           className="w-full border p-2 rounded"
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />

//         <input
//           placeholder="Email"
//           value={form.email}
//           required
//           className="w-full border p-2 rounded"
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           className="w-full border p-2 rounded"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button className="w-full bg-yellow-500 py-2 rounded font-bold">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ HANDLE SIGNUP
  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await api.post("/auth/signup", form);
      navigate("/sign-in");
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({ 
        general: err.response?.data?.message || "Signup failed. Try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {errors.general && (
          <p className="text-red-500 text-center text-sm">{errors.general}</p>
        )}

        <input
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" disabled={isLoading} className="w-full bg-yellow-500 py-2 rounded font-bold hover:bg-yellow-400 transition disabled:opacity-50">
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
