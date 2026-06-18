import { useState } from "react";
import "./RegistrationForm.css";

// ── API endpoint ────────────────────────────────────────────────────────────────
const API_URL = "/api/enquiry";

// ── Client-side validation ──────────────────────────────────────────────────────
const validate = (fields) => {
  const errors = {};

  if (!fields.name.trim())
    errors.name = "Name is required.";
  else if (fields.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters.";

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email.trim())
    errors.email = "Email is required.";
  else if (!emailRx.test(fields.email.trim()))
    errors.email = "Enter a valid email address.";

  const phoneRx = /^[6-9]\d{9}$/;
  if (!fields.phone.trim())
    errors.phone = "Phone number is required.";
  else if (!phoneRx.test(fields.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";

  return errors;
};

const INITIAL_FIELDS = { name: "", email: "", phone: "" };

// ── Reusable Field component ────────────────────────────────────────────────────
function Field({ id, label, type = "text", icon, value, error, touched, onChange, onBlur, placeholder, inputMode }) {
  const hasError = touched && error;
  const isValid  = touched && !error && value.trim() !== "";

  return (
    <div className={`rf-field${hasError ? " rf-field--error" : ""}${isValid ? " rf-field--valid" : ""}`}>
      <label className="rf-field__label" htmlFor={id}>
        <span className="rf-field__label-icon" aria-hidden="true">{icon}</span>
        {label}
        <span className="rf-field__required" aria-hidden="true">*</span>
      </label>

      <div className="rf-field__wrap">
        <input
          id={id}
          name={id}
          type={type}
          className="rf-field__input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={id === "email" ? "email" : id === "phone" ? "tel" : "name"}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError ? "true" : "false"}
          required
        />
        {isValid  && <span className="rf-field__status rf-field__status--ok"  aria-hidden="true">✓</span>}
        {hasError && <span className="rf-field__status rf-field__status--err" aria-hidden="true">!</span>}
      </div>

      {hasError && (
        <p className="rf-field__error" id={`${id}-error`} role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [fields,     setFields]     = useState(INITIAL_FIELDS);
  const [errors,     setErrors]     = useState({});
  const [touched,    setTouched]    = useState({});
  const [status,     setStatus]     = useState("idle");   // idle | loading | success | error
  const [serverMsg,  setServerMsg]  = useState("");
  const [fieldErrs,  setFieldErrs]  = useState([]);       // server-returned field errors

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (touched[name]) setErrors(validate(updated));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(fields));
  };

  // ── Submit — fetch POST to /api/enquiry ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched
    setTouched({ name: true, email: true, phone: true });
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setServerMsg("");
    setFieldErrs([]);

    try {
      const response = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:  fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ── Success ─────────────────────────────────────────────────────────────
        setStatus("success");
        setServerMsg(data.message || "Registration Successful");
        setFields(INITIAL_FIELDS);
        setTouched({});
        setErrors({});
      } else {
        // ── Server validation / conflict error ───────────────────────────────────
        setStatus("error");
        setServerMsg(data.message || "Something went wrong. Please try again.");
        setFieldErrs(data.errors || []);
      }
    } catch {
      // ── Network / unreachable error ────────────────────────────────────────────
      setStatus("error");
      setServerMsg("Unable to reach the server. Please check your connection and try again.");
      setFieldErrs([]);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setServerMsg("");
    setFieldErrs([]);
    setFields(INITIAL_FIELDS);
    setTouched({});
    setErrors({});
  };

  // ── Success screen ────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section id="register" className="rf-section" aria-labelledby="rf-heading">
        <div className="rf-card rf-success" role="status" aria-live="polite">
          <span className="rf-success__icon" aria-hidden="true">🎉</span>
          <h3 className="rf-success__title">You're Enrolled!</h3>
          <p className="rf-success__text">
            {serverMsg} — A confirmation will be sent to{" "}
            <strong>{fields.email || "your email"}</strong>. See you on{" "}
            <strong>15 July 2026!</strong>
          </p>
          <button
            id="rf-register-again-btn"
            className="rf-btn rf-btn--ghost"
            onClick={handleReset}
          >
            Register Another Student
          </button>
        </div>
      </section>
    );
  }

  // ── Form screen ───────────────────────────────────────────────────────────────
  return (
    <section id="register" className="rf-section" aria-labelledby="rf-heading">
      <div className="rf-bg-orb rf-bg-orb--1" aria-hidden="true" />
      <div className="rf-bg-orb rf-bg-orb--2" aria-hidden="true" />

      {/* Header */}
      <div className="rf-header">
        <span className="rf-header__badge">Secure Your Spot</span>
        <h2 className="rf-header__title" id="rf-heading">
          Register <span className="rf-header__title-accent">Now</span>
        </h2>
        <p className="rf-header__sub">
          Join <strong>100+ young innovators</strong> in the AI &amp; Robotics
          Summer Workshop starting <strong>15 July 2026</strong>.
        </p>
      </div>

      {/* Card */}
      <div className="rf-card">
        {/* Fee pill */}
        <div className="rf-fee-pill" aria-label="Workshop fee">
          <span className="rf-fee-pill__label">Workshop Fee</span>
          <span className="rf-fee-pill__price">₹2,999</span>
          <span className="rf-fee-pill__tag">All Inclusive</span>
        </div>

        <form
          id="registration-form"
          className="rf-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Workshop registration form"
        >
          <Field
            id="name"
            label="Child's Full Name"
            icon="👤"
            value={fields.name}
            error={errors.name}
            touched={touched.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Aarav Sharma"
          />

          <Field
            id="email"
            label="Parent's Email Address"
            type="email"
            icon="✉️"
            value={fields.email}
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. parent@example.com"
            inputMode="email"
          />

          <Field
            id="phone"
            label="Parent's Phone Number"
            type="tel"
            icon="📱"
            value={fields.phone}
            error={errors.phone}
            touched={touched.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 9876543210"
            inputMode="numeric"
          />

          {/* ── Server error banner ── */}
          {status === "error" && (
            <div className="rf-server-error" role="alert" aria-live="assertive">
              <span className="rf-server-error__icon" aria-hidden="true">⚠️</span>
              <div>
                <p className="rf-server-error__msg">{serverMsg}</p>
                {fieldErrs.length > 0 && (
                  <ul className="rf-server-error__list">
                    {fieldErrs.map((e, i) => (
                      <li key={i}>
                        <strong>{e.field}:</strong> {e.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* ── Submit button ── */}
          <button
            id="rf-submit-btn"
            type="submit"
            className={`rf-btn rf-btn--primary${status === "loading" ? " rf-btn--loading" : ""}`}
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <span className="rf-btn__spinner" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                <span>Enroll Now</span>
                <span className="rf-btn__arrow" aria-hidden="true">→</span>
              </>
            )}
          </button>

          <p className="rf-trust-note">
            🔒 Your information is safe and will never be shared.
          </p>
        </form>
      </div>

      {/* Trust strip */}
      <div className="rf-trust-strip" aria-label="Trust indicators">
        {[
          { icon: "✅", text: "Verified Mentors" },
          { icon: "📜", text: "Certificate Included" },
          { icon: "🔁", text: "Full Refund Policy" },
          { icon: "🎯", text: "Limited Seats" },
        ].map(({ icon, text }) => (
          <span key={text} className="rf-trust-strip__item">
            <span aria-hidden="true">{icon}</span> {text}
          </span>
        ))}
      </div>
    </section>
  );
}
