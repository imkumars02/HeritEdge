const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_URI,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

const FeedbackSchema = new mongoose.Schema({
  fullName: String,
  rating: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

const VolunteerSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  address: String,
  email: String,
  gender: String,
  birthdate: Date,
  areaOfVolunteering: String,
  bloodGroup: String,
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

const DiaryEntrySchema = new mongoose.Schema({
  location: String,
  image: String,
  caption: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const DiaryEntry = mongoose.model("DiaryEntry", DiaryEntrySchema);

// Update the TripPlanSchema if needed
const TripPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  duration: Number,
  freeTime: Object,
  startDate: String,
  endTime: String,
  timeFormat: String,
  interests: {
    historical: Number,
    artCulture: Number,
    nature: Number,
    adventure: Number,
    shopping: Number,
    food: Number,
  },
  companion: String,
  budget: String,
  suggestedPlaces: [
    {
      id: Number,
      name: String,
      category: String,
      budget: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const TripPlan = mongoose.model("TripPlan", TripPlanSchema);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/check-auth", isAuthenticated, (req, res) => {
  res.json({ user: { id: req.session.userId } });
});

// Logout Route
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
});

// Get User Data Route
app.get("/api/user/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Fetch user data error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Volunteer// Volunteer Registration Route
app.post("/api/volunteer-registration", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      address,
      email,
      gender,
      birthdate,
      areaOfVolunteering,
      bloodGroup,
    } = req.body;

    const newVolunteer = new Volunteer({
      fullName,
      mobile,
      address,
      email,
      gender,
      birthdate,
      areaOfVolunteering,
      bloodGroup,
    });

    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (error) {
    console.error("Volunteer registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create Diary Entry Route
app.post("/api/diary-entries", isAuthenticated, async (req, res) => {
  try {
    const { location, image, caption } = req.body;
    const userId = req.session.userId;

    const newEntry = new DiaryEntry({
      location,
      image,
      caption,
      userId,
    });

    await newEntry.save();

    res
      .status(201)
      .json({ message: "Diary entry created successfully", entry: newEntry });
  } catch (error) {
    console.error("Diary entry creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Diary Entries Route
app.get("/api/diary-entries", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    const entries = await DiaryEntry.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(entries);
  } catch (error) {
    console.error("Fetch diary entries error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Feedback Route
app.post("/api/feedback", async (req, res) => {
  try {
    const { fullName, rating, feedback } = req.body;

    const newFeedback = new Feedback({
      fullName,
      rating,
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update the Plan Trip Route
app.post("/api/plan-trip", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;

    const {
      duration,
      freeTime,
      startDate,
      endTime,
      timeFormat,
      interests,
      companion,
      budget,
      suggestedPlaces,
    } = req.body;

    const newTripPlan = new TripPlan({
      userId,
      duration,
      freeTime,
      startDate,
      endTime,
      timeFormat,
      interests,
      companion,
      budget,
      suggestedPlaces,
    });

    await newTripPlan.save();

    res.status(201).json({
      message: "Trip plan saved successfully",
      tripPlan: newTripPlan,
    });
  } catch (error) {
    console.error("Trip plan creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new route to get the trip plan
app.get("/api/trip-plan", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const tripPlan = await TripPlan.findOne({ userId }).sort({ createdAt: -1 });

    if (!tripPlan) {
      return res.status(404).json({ message: "No trip plan found" });
    }

    res.status(200).json(tripPlan);
  } catch (error) {
    console.error("Fetch trip plan error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
