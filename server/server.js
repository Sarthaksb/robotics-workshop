import express       from "express";
import cors          from "cors";
import dotenv        from "dotenv";
import { body, validationResult } from "express-validator";
import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Validation rules ────────────────────────────────────────────────────────────
const enquiryValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required.")
    .matches(/^[6-9]\d{9}$/).withMessage("Enter a valid 10-digit Indian mobile number."),
];

// ── Routes ──────────────────────────────────────────────────────────────────────
app.use("/api", registrationRoutes(enquiryValidation));

// ── GET /api/health ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 handler ─────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global error handler ─────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[SERVER ERROR]", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// ── Start (Local only) & Export (Vercel) ───────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅  Server running  →  http://localhost:${PORT}`);
    console.log(`📡  Enquiry route   →  POST http://localhost:${PORT}/api/enquiry`);
    console.log(`💚  Health check    →  GET  http://localhost:${PORT}/api/health`);
  });
}

export default app;
