import { useState } from "react";
import axios from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="mt-3">
          No account?{" "}
          <Link to="/" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}