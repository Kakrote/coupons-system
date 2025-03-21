"use client";

import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [claimHistory, setClaimHistory] = useState([]); // ✅ Added User Claim History State

  useEffect(() => {
    fetchCoupons();
    fetchUserClaimHistory(); // ✅ Fetch User Claim History
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
        await API.put(`/admin/coupons/${id}`, { status: newStatus });
        toast.success(`Coupon ${newStatus === "available" ? "enabled" : "disabled"}!`);
        fetchCoupons();
    } catch (error) {
        toast.error("Failed to update coupon status");
    }
  };

  const deleteCoupon = async (id) => {
    try {
      await API.delete(`/admin/deletecoupon/${id}`);
      toast.success("Coupon Deleted!");
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  // ✅ Fetch User Claim History
  const fetchUserClaimHistory = async () => {
    try {
        const response = await API.get("/admin/history");
        setClaimHistory(response.data);
    } catch (error) {
        toast.error("Error fetching claim history");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent shadow-md shadow-amber-200/80 my-5 rounded-lg container">
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
          <li key={coupon._id} className={`flex container justify-between items-center p-2 md:w-2xl border rounded my-2`}>
            <div className="flex justify-between items-center w-full px-1 md:px-5">
              <span>{coupon.code} </span>
              <span className={`border px-3 rounded-2xl ${coupon.status=='available'?"bg-green-400 text-white":coupon.status=='disabled'?"bg-red-400":"bg-orange-400"}`}>{coupon.status}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleCouponStatus(coupon._id, coupon.status)}
                className={`px-3 py-1 rounded text-white ${coupon.status === "available" ? "bg-yellow-500 hover:bg-yellow-700" : "bg-green-500 hover:bg-green-700"}`}
              >
                {coupon.status === "available" ? "Disable" : "Enable"}
              </button>

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

      {/* ✅ User Claim History Section */}
      <h3 className="text-xl font-semibold mt-6">User Claim History</h3>
      {claimHistory.length === 0 ? (
        <p className="text-center text-gray-500">No claims yet.</p>
      ) : (
        <table className="w-full mt-2 border-collapse border border-gray-300 shadow-md shadow-amber-400/80">
          <thead>
            <tr className="bg-transparent">
              <th className="border p-2">IP Address</th>
              <th className="border p-2">Session ID</th>
              <th className="border p-2">Coupon Code</th>
              <th className="border p-2">Claimed At</th>
            </tr>
          </thead>
          <tbody>
            {claimHistory.map((claim, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{claim.ip}</td>
                <td className="p-2 border">{claim.sessionId}</td>
                <td className="p-2 border">{claim.couponId ? claim.couponId.code:"Unknown"}</td>
                <td className="p-2 border">{new Date(claim.claimedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
