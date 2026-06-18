import { useState } from "react";
import "./FAQ.css";

// ── FAQ data ────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: "faq-age",
    question: "Who is this workshop designed for?",
    answer:
      "This workshop is specifically designed for children aged 8 to 14 years. No prior knowledge of AI, robotics, or programming is required. Our curriculum is carefully crafted to be beginner-friendly while remaining engaging and challenging for all experience levels.",
    icon: "👦",
    category: "Eligibility",
  },
  {
    id: "faq-online",
    question: "How are the online classes conducted?",
    answer:
      "All sessions are conducted live via an interactive video platform. Students join from home with a laptop or tablet and a stable internet connection. Classes are highly interactive — students can ask questions, participate in polls, and collaborate on projects in real time. All sessions are also recorded and available for replay anytime.",
    icon: "💻",
    category: "Format",
  },
  {
    id: "faq-fee",
    question: "What does the ₹2,999 fee include?",
    answer:
      "The fee covers everything — 20+ live interactive sessions across 4 weeks, all learning materials, access to project kits (digital), lifetime recording access, mentor support, and a Certificate of Completion. There are absolutely no hidden charges.",
    icon: "💰",
    category: "Pricing",
  },
  {
    id: "faq-schedule",
    question: "What is the class schedule and duration?",
    answer:
      "The workshop runs for 4 weeks starting 15 July 2026. Classes are held 5 days a week, Monday through Friday, with each session lasting approximately 60 minutes. Weekend optional doubt-clearing sessions are also available at no extra cost.",
    icon: "📅",
    category: "Schedule",
  },
  {
    id: "faq-certificate",
    question: "Will my child receive a certificate?",
    answer:
      "Yes! Every student who completes the workshop and submits their capstone project receives a verified digital Certificate of Completion. The certificate includes the student's name, the skills covered, and can be shared on social platforms or added to a portfolio.",
    icon: "🎓",
    category: "Certification",
  },
  {
    id: "faq-prerequisites",
    question: "What equipment or software is needed?",
    answer:
      "Just a laptop or desktop (Windows/Mac/Linux), a stable internet connection, and a webcam/microphone. We use free, browser-based tools so there's nothing to install. Detailed setup instructions are sent to enrolled families a week before the start date.",
    icon: "🔧",
    category: "Setup",
  },
  {
    id: "faq-refund",
    question: "Is there a refund policy?",
    answer:
      "Yes. We offer a full refund if requested within 48 hours of enrollment, or if you cancel before the workshop start date. After the first class, a 50% refund is applicable up to Day 3. Please reach out to our support team for assistance.",
    icon: "🔄",
    category: "Policy",
  },
];

// ── Single FAQ item ─────────────────────────────────────────────────────────────
function FAQItem({ faq, isOpen, onToggle }) {
  const { id, question, answer, icon, category } = faq;

  return (
    <div
      className={`faq-item${isOpen ? " faq-item--open" : ""}`}
      id={id}
    >
      {/* Question button (toggle) */}
      <button
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-answer`}
        id={`${id}-trigger`}
      >
        {/* Left: icon + question */}
        <span className="faq-item__left">
          <span className="faq-item__icon" aria-hidden="true">{icon}</span>
          <span className="faq-item__question">{question}</span>
        </span>

        {/* Right: category badge + chevron */}
        <span className="faq-item__right">
          <span className="faq-item__category" aria-hidden="true">
            {category}
          </span>
          <span className="faq-item__chevron" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </span>
      </button>

      {/* Answer panel */}
      <div
        className="faq-item__body"
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        style={{ "--faq-max-h": isOpen ? "400px" : "0px" }}
      >
        <p className="faq-item__answer">{answer}</p>
      </div>
    </div>
  );
}

// ── Main FAQ component ──────────────────────────────────────────────────────────
export default function FAQ() {
  // Track which FAQ id is currently open (only one at a time)
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      {/* Background decorations */}
      <div className="faq-bg-orb faq-bg-orb--1" aria-hidden="true" />
      <div className="faq-bg-orb faq-bg-orb--2" aria-hidden="true" />

      {/* Header */}
      <div className="faq-header">
        <span className="faq-header__badge">Got Questions?</span>
        <h2 className="faq-header__title" id="faq-heading">
          Frequently Asked{" "}
          <span className="faq-header__title-accent">Questions</span>
        </h2>
        <p className="faq-header__sub">
          Everything you need to know before enrolling your child. Can't find
          your answer?{" "}
          <a href="mailto:support@airobotics.in" className="faq-header__link">
            Email us directly →
          </a>
        </p>
      </div>

      {/* FAQ list */}
      <div
        className="faq-list"
        role="list"
        aria-label="Frequently asked questions"
      >
        {FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => handleToggle(faq.id)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="faq-contact">
        <p className="faq-contact__text">
          Still have questions? We're happy to help.
        </p>
        <div className="faq-contact__actions">
          <a
            href="mailto:support@airobotics.in"
            id="faq-email-btn"
            className="faq-contact__btn faq-contact__btn--outline"
          >
            ✉️ Email Support
          </a>
          <a
            href="#register"
            id="faq-enroll-btn"
            className="faq-contact__btn faq-contact__btn--primary"
          >
            Enroll Now →
          </a>
        </div>
      </div>
    </section>
  );
}
