import { Router } from "express";
import ContactSubmission from "../models/ContactSubmission.js";

const router = Router();

// Simple shared-secret gate for the admin leads view.
// Set ADMIN_TOKEN in .env — the frontend sends it back as the x-admin-token header.
function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (!process.env.ADMIN_TOKEN) {
    return res.status(500).json({ error: "ADMIN_TOKEN is not configured on the server." });
  }
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Invalid or missing admin token." });
  }
  next();
}

// POST /api/contact — public, used by the Contact Us form
router.post("/", async (req, res) => {
  try {
    const { fullName, companyName, workEmail, phoneNumber, projectType, message } = req.body;

    if (!fullName || !workEmail || !message) {
      return res.status(400).json({ error: "Full name, work email and message are required." });
    }

    const submission = await ContactSubmission.create({
      fullName,
      companyName,
      workEmail,
      phoneNumber,
      projectType,
      message,
    });

    res.status(201).json({ success: true, id: submission._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit message", details: err.message });
  }
});

// GET /api/contact — admin only, powers the /admin/contacts leads view
router.get("/", requireAdmin, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submissions", details: err.message });
  }
});

export default router;
