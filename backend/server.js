const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
app=express()
connectDB()
app.use(cors({
    origin: "https://coupons-system.vercel.app/",  // ✅ Only allow frontend requests
    methods: "GET,POST,PUT,DELETE",
    credentials: true // ✅ Allow cookies & authentication headers
  }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

const port=process.env.PORT || 5000
app.listen(port,()=>console.log(`Server running on port ${port}`))