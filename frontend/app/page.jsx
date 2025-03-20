"use client";

import { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const ClaimCoupon = () => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(""); 

  const claimCoupon = async () => {
    setLoading(true);
    setWarning(""); 

    try {
      const response = await API.post("/users/claim");

      if (response.data.status === "disabled") {
        setWarning("This coupon is disabled. Please try another one.");
        toast.error("Coupon is disabled!");
        return;
      }

      setCoupon(response.data.coupon);
      toast.success("Coupon Claimed: " + response.data.coupon);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error claiming coupon";
      if (errorMessage.includes("You can claim only once in 24 hours")) {
        setWarning(errorMessage);
      }
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Claim Your Coupon</h1>

      <button onClick={claimCoupon} disabled={loading} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? "Claiming..." : "Claim Coupon"}
      </button>

      {warning && <p className="text-red-500 mt-2">{warning}</p>}

      {coupon && <h3 className="text-xl mt-4">Your Coupon Code: {coupon}</h3>}
    </div>
  );
};

export default ClaimCoupon;
