"use client";

import { useState } from "react";
import API from "../../../utils/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/register", form);
      toast.success("Admin Registered Successfully! Now Login.");
      router.push("/admin"); // ✅ Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Admin Registration</h2>
      <form onSubmit={handleRegister} className="bg-transparent p-6 rounded shadow-md shadow-amber-200/80">
        <input type="text" placeholder="Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-2" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
