// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MongoDB Connection =================
mongoose.connect("mongodb+srv://vijayvijayreal:fgzWO9ox5tGL5XVR@studentdata.hogsx52.mongodb.net/?retryWrites=true&w=majority&appName=StudentData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ================= Schema =================
const recordSchema = new mongoose.Schema({
  date: String,
  day: String,
  batch: String,
  student: String,
  savedAt: String
});
const Record = mongoose.model("Record", recordSchema);

// ================= Routes =================
// Add record
app.post("/api/records", async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all records
app.get("/api/records", async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

// Clear all records
app.delete("/api/records", async (req, res) => {
  await Record.deleteMany({});
  res.json({ message: "All records cleared" });
});

// ================= Start Server =================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
