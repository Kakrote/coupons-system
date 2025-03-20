"use client";

import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await API.get("/admin/coupons");
      setCoupons(response.data);
    } catch (error) {
      toast.error("Error fetching coupons");
    }
  };

  const addCoupon = async () => {
    if (!couponCode) return toast.error("Enter a coupon code!");
    
    try {
      await API.post("/admin/addcoupon", { code: couponCode });
      toast.success("Coupon Added!");
      setCouponCode("");
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to add coupon");
    }
  };

  const toggleCouponStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "available" ? "disabled" : "available";

    try {
        await API.put(`/admin/coupons/${id}`, { status: newStatus });  // ✅ Correct Route
        toast.success(`Coupon ${newStatus === "available" ? "enabled" : "disabled"}!`);
        fetchCoupons();
    } catch (error) {
        toast.error("Failed to update coupon status");
    }
  };

  // ✅ Delete Coupon Function
  const deleteCoupon = async (id) => {
    try {
      await API.delete(`/admin/deletecoupon/${id}`);  // ✅ Correct Route
      toast.success("Coupon Deleted!");
      fetchCoupons();  // Refresh List After Deletion
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <div className="max-w-3xl  mx-auto p-6 bg-transparent shadow-md shadow-amber-200/80 my-5 rounded-lg container ">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      {/* ✅ Add Coupon Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addCoupon}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Coupon
        </button>
      </div>

      {/* ✅ Coupon List */}
      <h3 className="text-xl font-semibold">All Coupons</h3>
      <ul className="mt-2">
        {coupons.map((coupon) => (
          <li key={coupon._id} className={`flex container justify-between items-center p-2 md:w-2xl border rounded my-2 
           `}>
            {/* <span>{coupon.code} - {coupon.status}</span> */}
            <div className="flex justify-between items-center w-full px-1 md:px-5">
              <span>{coupon.code} </span>
              <span className={`border px-3 rounded-2xl ${coupon.status=='available'?"bg-green-400 text-white":coupon.status=='disabled'?"bg-red-400":"bg-orange-400"}`}>{coupon.status}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleCouponStatus(coupon._id, coupon.status)}
                className={`px-3 py-1 rounded text-white ${
                  coupon.status === "available" ? "bg-yellow-500 hover:bg-yellow-700" : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {coupon.status === "available" ? "Disable" : "Enable"}
              </button>

              {/* ✅ Delete Button */}
              <button
                onClick={() => deleteCoupon(coupon._id)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
