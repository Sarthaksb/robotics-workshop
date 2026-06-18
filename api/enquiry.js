const enquiries = [];

export default async function handler(req, res) {
  // ── CORS headers ──────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { name, email, phone } = req.body || {};
  const errors = [];

  // ── Validation ────────────────────────────────────────────────
  if (!name || name.trim().length < 3)
    errors.push({ field: "name", message: "Name is required (min 3 characters)." });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.push({ field: "email", message: "Valid email address is required." });

  if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
    errors.push({ field: "phone", message: "Valid 10-digit Indian mobile number is required." });

  if (errors.length > 0) {
    return res.status(422).json({ success: false, message: "Validation failed.", errors });
  }

  // ── Duplicate check ───────────────────────────────────────────
  const exists = enquiries.find(
    (e) => e.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "This email is already registered.",
      errors: [{ field: "email", message: "Email already in use." }],
    });
  }

  // ── Save & respond ────────────────────────────────────────────
  const record = {
    id:          Date.now(),
    name:        name.trim(),
    email:       email.trim().toLowerCase(),
    phone:       phone.trim(),
    submittedAt: new Date().toISOString(),
  };
  enquiries.push(record);

  return res.status(201).json({
    success: true,
    message: "Registration Successful",
    data: { id: record.id, name: record.name, submittedAt: record.submittedAt },
  });
}
