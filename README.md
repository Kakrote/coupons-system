# Coupon Distribution System

This is a **Full-Stack Coupon Distribution System** where:
- **Admins** can **add, enable/disable, delete, and track coupon usage**.
- **Users** can **claim a coupon** (only once in **24 hours**).
- **JWT Authentication** is used for Admin login.
- **Rate Limiting** is applied to prevent coupon abuse.
- **MongoDB** is used for database storage.

---

## 🚀 Setup Instructions

### **1️⃣ Clone the Project**
```bash
git clone <https://github.com/Kakrote/coupons-system>
cd coupon-system
```

### **2️⃣ Install Dependencies**
```bash
npm install
```
This will install:
- **Express** (Backend framework)
- **Mongoose** (MongoDB ODM)
- **CORS** (Cross-Origin Resource Sharing)
- **jsonwebtoken** (JWT for authentication)
- **bcryptjs** (Password hashing)
- **express-rate-limit** (Rate limiting to prevent abuse)
- **cookie-parser** (For handling cookies)
- **dotenv** (For environment variables)

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the root directory:
```bash
touch .env
```
Add the following configuration:
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
✅ **Replace `<your-mongodb-connection-string>` with your actual MongoDB URI.**  
✅ **Use a strong JWT secret key in `<your-secret-key>`.**  

### **4️⃣ Start the Server**
```bash
npm start
```
Or for development mode:
```bash
npm run dev
```
✅ The backend will start on **`http://localhost:5000`**

---

## 🌎 Deployment (Optional)
If you want to **deploy the backend** on **Render**, follow these steps:
1️⃣ Push the project to **GitHub**  
2️⃣ Go to **Render** → Create a **New Web Service**  
3️⃣ Connect your **GitHub repo**  
4️⃣ Set the **Environment Variables** in Render  
5️⃣ Deploy 🎉

---

## 🔹 Backend Implementation (Express & MongoDB)

### **1️⃣ `server.js` (Main Entry Point)**
- Sets up **Express Server**
- Connects to **MongoDB**
- Configures **CORS** to allow frontend requests
- Enables **Rate Limiting** to prevent abuse
- Uses `trust proxy` for **Render Hosting**
- Imports and applies **Admin & User Routes**

### **2️⃣ API Routes**

#### **Admin Routes (`/api/admin`)**
| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/register` | Register an admin |
| `POST` | `/login` | Admin login (JWT-based) |
| `GET` | `/coupons` | Get all coupons |
| `POST` | `/coupons` | Add a new coupon |
| `DELETE` | `/coupons/:id` | Delete a coupon |
| `PUT` | `/coupons/:id` | Enable/Disable a coupon |
| `GET` | `/history` | Get all claimed coupons |

#### **User Routes (`/api/users`)**
| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/claim` | Claim a coupon (with rate limiting) |

✅ **Rate Limiting is applied** on `/api/users/claim` to prevent abuse.

---

## 🔹 Middleware

### **1️⃣ `authMiddleware.js` (Admin Authentication)**
- Protects **Admin routes** using **JWT**  
- Extracts **admin info** from JWT token  
- **Restricts access** if token is missing or invalid  

✅ **Example Usage:**
```javascript
router.get("/coupons", authMiddleware, getCoupons);
```

### **2️⃣ `rateLimiter.js` (Rate Limiting)**
- Limits each user to **5 coupon claims per 15 minutes**  
- Uses **`req.ip`** to track users  
- **Prevents spamming**  

✅ **Example Usage:**
```javascript
router.post("/claim", claimLimiter, claimCoupon);
```

---

## 🔹 Database Models (MongoDB)

### **1️⃣ `models/Admin.js`**
- Stores **admin credentials (hashed password)**
- Used for **admin authentication**

### **2️⃣ `models/Coupon.js`**
- Stores **coupon codes**
- Keeps track of **status** (`available`, `claimed`, `disabled`)
- Stores `createdAt` timestamp

### **3️⃣ `models/UserClaim.js`**
- Tracks which **user (IP) claimed which coupon**
- Stores `claimedAt` timestamp to **enforce 24-hour cooldown**

---

## 🔹 Claiming a Coupon (`controllers/userController.js`)
✅ **User can claim a coupon only if:**  
✔️ **They haven't claimed in the last 24 hours**  
✔️ **There are available coupons**  

### **How It Works?**
```javascript
const lastClaim = await UserClaim.findOne({ ip: userIp }).sort({ claimedAt: -1 });

if (lastClaim) {
    const diff = (Date.now() - new Date(lastClaim.claimedAt)) / (1000 * 60 * 60);
    if (diff < 24) {
        return res.status(400).json({ message: "You can claim only once in 24 hours." });
    }
}
```
✅ **If 24 hours haven't passed, the user gets an error message.**  

---

## ✅ Summary
### **1️⃣ Features**
✔️ **JWT-based authentication for Admins**  
✔️ **Admin can Add, Enable/Disable, Delete, and Track Coupons**  
✔️ **Users can claim a coupon (with 24-hour cooldown)**  
✔️ **Rate Limiting prevents abuse**  
✔️ **Fully deployed backend (Render) & frontend (Vercel)**  

### **2️⃣ How to Run Locally?**
```bash
git clone <repo-url>
cd coupon-system
npm install
```
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
```bash
npm run dev
```

### **3️⃣ Deployment**
✅ **Backend:** **Render**  
✅ **Frontend:** **Vercel**  

🔥 **This Coupon System is fully optimized & ready to use! 🚀**

