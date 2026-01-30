# StockZen - Modern Stock Trading Platform

StockZen is a full-stack stock trading and investment platform built with the MERN stack. It features real-time market data, portfolio management, secure authentication, and comprehensive authorization controls.

## 🚀 Features

- **User Authentication** - Secure signup/login with JWT tokens
- **Role-Based Access Control** - Admin, Trader, and User roles with custom permissions
- **Real-Time Portfolio** - Track your holdings and positions with interactive charts
- **Order Management** - Place buy/sell orders seamlessly
- **Responsive Dashboard** - Beautiful, intuitive interface built with React
- **Secure Backend** - Express.js with MongoDB for robust data management

## 📁 Project Structure

```
StockZen/
├── backend/          # Express.js API server
├── frontend/         # React landing pages & auth
├── dashboard/        # React trading dashboard
└── README.md
```

## 🛠️ Tech Stack

**Frontend:**

- React 19
- React Router
- Axios
- Chart.js
- Material-UI

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)
- npm or yarn

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ishaansh20/StockZen.git
cd StockZen
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Install Dashboard Dependencies

```bash
cd ../dashboard
npm install
```

### 5. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/stockzenDB
JWT_SECRET=your-secret-key-change-in-production
```

## 🚀 Running the Application

### Start MongoDB

```bash
mongod
```

### Start Backend Server

```bash
cd backend
npm start
```

Server runs on `http://localhost:3002`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5174`

### Start Dashboard

```bash
cd dashboard
npm run dev
```

Dashboard runs on `http://localhost:5173`

## 📱 Usage

1. Visit `http://localhost:5174` for the landing page
2. Sign up for a new account
3. Login to access the dashboard at `http://localhost:5173`
4. Start trading and managing your portfolio!

## 🔐 Authorization System

StockZen implements a comprehensive RBAC system with three user roles:

- **User** - Basic trading access (view holdings, view positions, create orders)
- **Trader** - Enhanced trading features
- **Admin** - Full system access and user management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Ishaan Sharma**

- GitHub: [@ishaansh20](https://github.com/ishaansh20)

---

**Note:** This is a learning project and should not be used for actual trading or financial transactions.

## First Time Setup - Add Dummy Data

After starting the backend server, visit these URLs in your browser to populate the database with dummy data:

1. Add Holdings: http://localhost:3002/addHoldings
2. Add Positions: http://localhost:3002/addPositions

## Accessing the Application

- **Dashboard UI**: http://localhost:5173
- **Backend API**: http://localhost:3002

## Features

- **Holdings**: View and manage your stock holdings with interactive charts
- **Positions**: Track your current positions
- **Orders**: Place buy/sell orders
- **Charts**: Visual representation using Chart.js
  - Doughnut chart in WatchList
  - Vertical bar chart in Holdings

## API Endpoints

- `GET /allHoldings` - Fetch all holdings
- `GET /allPositions` - Fetch all positions
- `POST /newOrder` - Create a new order
- `GET /addHoldings` - Add dummy holdings data
- `GET /addPositions` - Add dummy positions data

## Tech Stack

### Backend

- Express.js
- MongoDB with Mongoose
- CORS enabled
- Body Parser

### Frontend (Dashboard)

- React with Vite
- React Router DOM
- Axios for API calls
- Chart.js & react-chartjs-2
- Material-UI components

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env` file
- Default: `mongodb://localhost:27017/zerodhaDB`

### Port Conflicts

- Backend runs on port 3002
- Dashboard runs on port 5173
- Make sure these ports are available

### Charts Not Displaying

- Ensure dummy data is loaded (visit /addHoldings and /addPositions)
- Check browser console for errors
- Verify API calls are successful in Network tab
