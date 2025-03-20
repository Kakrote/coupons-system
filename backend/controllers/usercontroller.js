const Coupon = require("../model/Coupons");
const UserClaim = require("../model/UserClaim");

const claimCoupon = async (req, res) => {
    console.log(req.body)
    try {
        const userIp = req.ip; // Users IP Address
        const sessionId = req.cookies.sessionId || Math.random().toString(36).substr(2, 9); // Generate session ID if not exists

        // Check if user has already claimed within cooldown period (24 hours)
        const lastClaim = await UserClaim.findOne({ ip: userIp }).sort({ claimedAt: -1 });

        if (lastClaim) {
            const diff = (Date.now() - new Date(lastClaim.claimedAt)) / (1000 * 60*60); // Convert ms to hours
            if (diff < 24) {
                return res.status(400).json({ message: "You can claim only once in 24 hours." });
            }
        }

        // Finding available coupons
        const coupon = await Coupon.findOneAndUpdate(
            { status: "available" },
            { status: "claimed", claimedAt: new Date() }, // Fix: Add claimedAt field
            { new: true }
        );

        if (!coupon) {
            return res.status(400).json({ message: "No available coupons right now." });
        }

        // Saving user claim
        await UserClaim.create({
            ip: userIp,
            sessionId: sessionId,
            couponId: coupon._id,
            claimedAt: new Date() // Fix: Store claimedAt in UserClaim
        });

        // Sending coupon code to user
        res.cookie("sessionId", sessionId, { httpOnly: true });
        res.json({ message: "Coupon claimed successfully!", coupon: coupon.code });

    } catch (err) {
        console.log("Claim Coupon Error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { claimCoupon };
