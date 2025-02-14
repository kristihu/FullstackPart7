const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");

const testingRouter = express.Router();

testingRouter.post("/reset", async (req, res) => {
  try {
    await Blog.deleteMany({});

    await User.deleteMany({});
    console.log("Database reset successfully");
    res.status(200).json({ message: "Database reset successfully" });
  } catch (error) {
    console.error("Error resetting the database:", error);
    res.status(500).json({ error: "Failed to reset the database" });
  }
});

module.exports = testingRouter;
