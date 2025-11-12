const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

// ✅ Initialize Razorpay
let razorpay;
try {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('Razorpay environment variables not set!');
    console.error('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
    console.error('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);
  } else {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('Razorpay initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error);
}


// 🔹 Create Razorpay Order
router.post("/orders", async (req, res) => {
  try {
    let { amount } = req.body;
    console.log("Received amount:", amount);

    if (!amount || isNaN(amount)) {
      console.log("Invalid amount received");
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    // Ensure amount is integer in paise (already in paise from frontend)
    amount = Math.round(amount);
    console.log("Rounded amount in paise:", amount);

    if (amount <= 0) {
      return res.status(400).json({ success: false, error: "Amount must be greater than 0" });
    }

    const options = {
      amount: amount, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };
    console.log("Creating order with options:", options);

    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order);
    res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ success: false, error: "Failed to create order", details: error.message });
  }
});


// 🔹 Verify Payment Signature
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("Verification request body:", req.body);

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");
    console.log("Generated signature:", generatedSignature);
    console.log("Received signature:", razorpay_signature);

    if (generatedSignature === razorpay_signature) {
      console.log("Payment verification successful");
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("Payment verification failed: signatures do not match");
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ success: false, error: "Payment verification failed" });
  }
});

module.exports = router;
