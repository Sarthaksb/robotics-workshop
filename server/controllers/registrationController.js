import { validationResult } from "express-validator";

// ── In-memory store (replace with DB in production) ────────────────────────────
const enquiries = [];

// ── Controller ──────────────────────────────────────────────────────────────────
export async function submitRegistration(req, res, next) {
  try {
    // 1. Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed.",
        errors:  errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone } = req.body;

    // 2. Duplicate email check
    const exists = enquiries.find(
      (e) => e.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
        errors:  [{ field: "email", message: "Email already in use." }],
      });
    }

    // 3. Save enquiry
    const record = {
      id:          enquiries.length + 1,
      name:        name.trim(),
      email:       email.trim().toLowerCase(),
      phone:       phone.trim(),
      submittedAt: new Date().toISOString(),
    };
    enquiries.push(record);

    console.log(`[ENQUIRY #${record.id}] ${record.name} — ${record.email}`);

    // 4. Success response
    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        id:          record.id,
        name:        record.name,
        submittedAt: record.submittedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}
