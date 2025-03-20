"use client";
import { useState } from "react";
import API from "../../utils/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/admin/login", form);
      localStorage.setItem("adminToken", response.data.token); // ✅ Token Store Karo
      toast.success("Login Successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="bg-transparent p-6 rounded shadow-md shadow-amber-200/80">
        <input type="text" placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-2" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <a href="/admin/register" className="text-blue-600 underline">Register</a>
      </p>

    </div>
  );
};

export default AdminLogin;
