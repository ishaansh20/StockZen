require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsMode");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI || "mongodb://localhost/stockzenDB";
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Authorization middleware - check if user has required role
const authorizeRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: "Account is deactivated" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: `Access denied. Required role: ${roles.join(" or ")}`,
        });
      }

      req.userRole = user.role;
      req.userPermissions = user.permissions;
      next();
    } catch (error) {
      res.status(500).json({ message: "Authorization error" });
    }
  };
};

// Permission-based authorization middleware
const authorizePermission = (...permissions) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hasPermission = permissions.some((permission) =>
        user.permissions.includes(permission),
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: `Access denied. Required permission: ${permissions.join(" or ")}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Permission check error" });
    }
  };
};

// AUTH ROUTES
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or username" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token with role
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if account is active
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Account is deactivated. Please contact support." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token with role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get current user profile (protected route)
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update user permissions (admin only)
app.put(
  "/api/admin/users/:userId/permissions",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { permissions } = req.body;
      const { userId } = req.params;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.permissions = permissions;
      await user.save();

      res.json({
        message: "Permissions updated successfully",
        user: {
          id: user._id,
          username: user.username,
          permissions: user.permissions,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating permissions" });
    }
  },
);

// Update user role (admin only)
app.put(
  "/api/admin/users/:userId/role",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;
      const { userId } = req.params;

      if (!["user", "admin", "trader"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = role;
      await user.save();

      res.json({
        message: "Role updated successfully",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating role" });
    }
  },
);

// Deactivate/activate user account (admin only)
app.put(
  "/api/admin/users/:userId/status",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { isActive } = req.body;
      const { userId } = req.params;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isActive = isActive;
      await user.save();

      res.json({
        message: `User ${isActive ? "activated" : "deactivated"} successfully`,
        user: {
          id: user._id,
          username: user.username,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user status" });
    }
  },
);

// Get all users (admin only)
app.get(
  "/api/admin/users",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const users = await UserModel.find().select("-password");
      res.json({
        count: users.length,
        users,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  },
);

// Delete user (admin only)
app.delete(
  "/api/admin/users/:userId",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "User deleted successfully",
        deletedUser: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  },
);

// DUMMY DATA
app.get("/addHoldings", async (req, res) => {
  let tempHoldings = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];

  tempHoldings.forEach((item) => {
    let newHolding = new HoldingsModel({
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });

    newHolding.save();
  });
  res.send("Done!");
});

app.get("/addPositions", async (req, res) => {
  let tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  tempPositions.forEach((item) => {
    let newPosition = new PositionsModel({
      product: item.product,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });

    newPosition.save();
  });
  res.send("Done!");
});

app.get(
  "/allHoldings",
  authenticateToken,
  authorizePermission("view_holdings"),
  async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  },
);

app.get(
  "/allPositions",
  authenticateToken,
  authorizePermission("view_positions"),
  async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  },
);

app.post(
  "/newOrder",
  authenticateToken,
  authorizePermission("create_orders"),
  async (req, res) => {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    newOrder.save();

    res.send("Order saved!");
  },
);

const startServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();
