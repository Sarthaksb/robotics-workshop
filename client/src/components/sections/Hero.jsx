import { useEffect, useState } from "react";
import "./Hero.css";

// ── Countdown helpers ──────────────────────────────────────────────────────────
const TARGET_DATE = new Date("2026-07-15T00:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ── Animated digit block ───────────────────────────────────────────────────────
function CountUnit({ value, label }) {
  return (
    <div className="hero-count-unit">
      <span className="hero-count-value">{String(value).padStart(2, "0")}</span>
      <span className="hero-count-label">{label}</span>
    </div>
  );
}

// ── Floating particle ──────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main Hero component ────────────────────────────────────────────────────────
export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleEnroll = () => {
    const section = document.getElementById("register");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleLearnMore = () => {
    const section = document.getElementById("about");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero" aria-label="Workshop hero banner">
      {/* Animated background grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Floating orbs */}
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />
      <div className="hero-orb hero-orb--3" aria-hidden="true" />

      {/* Floating particles */}
      <Particles />

      <div className="hero-container">
        {/* Badge */}
        <div className="hero-badge" role="note">
          <span className="hero-badge__dot" />
          <span>Registrations Open · Limited Seats</span>
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          <span className="hero-title__line hero-title__line--sm">
            AI &amp; Robotics
          </span>
          <span className="hero-title__line hero-title__line--lg">
            Summer Workshop
          </span>
          <span className="hero-title__line hero-title__line--accent">
            2026
          </span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          Give your child a head start in tomorrow&apos;s technology. A
          hands-on, project-based online program where curious minds aged{" "}
          <strong>8–14</strong> explore AI, build robots, and learn to think
          like engineers — all from home.
        </p>

        {/* Workshop meta pills */}
        <ul className="hero-meta" aria-label="Workshop details">
          {[
            { icon: "🎓", label: "Ages 8–14" },
            { icon: "📅", label: "4 Weeks" },
            { icon: "💻", label: "Online" },
            { icon: "📍", label: "Starts 15 Jul 2026" },
          ].map(({ icon, label }) => (
            <li key={label} className="hero-meta__pill">
              <span aria-hidden="true">{icon}</span>
              {label}
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="hero-cta">
          <button
            id="hero-enroll-btn"
            className="hero-btn hero-btn--primary"
            onClick={handleEnroll}
            aria-label="Enroll now in the workshop"
          >
            <span>Enroll Now</span>
            <span className="hero-btn__price">@ ₹2,999</span>
            <span className="hero-btn__arrow" aria-hidden="true">→</span>
          </button>

          <button
            id="hero-learn-btn"
            className="hero-btn hero-btn--ghost"
            onClick={handleLearnMore}
            aria-label="Learn more about the workshop"
          >
            Learn More
          </button>
        </div>

        {/* Countdown */}
        <div className="hero-countdown" aria-label="Countdown to workshop start">
          <p className="hero-countdown__label">Workshop begins in</p>
          <div className="hero-countdown__units">
            <CountUnit value={timeLeft.days} label="Days" />
            <span className="hero-countdown__sep" aria-hidden="true">:</span>
            <CountUnit value={timeLeft.hours} label="Hrs" />
            <span className="hero-countdown__sep" aria-hidden="true">:</span>
            <CountUnit value={timeLeft.minutes} label="Min" />
            <span className="hero-countdown__sep" aria-hidden="true">:</span>
            <CountUnit value={timeLeft.seconds} label="Sec" />
          </div>
        </div>

        {/* Trust strip */}
        <div className="hero-trust" role="note" aria-label="Trust indicators">
          {[
            "✅ Certificate of Completion",
            "🎯 Project-Based Learning",
            "👩‍🏫 Expert Mentors",
            "🔁 Lifetime Recordings Access",
          ].map((item) => (
            <span key={item} className="hero-trust__item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-hint__mouse">
          <span className="hero-scroll-hint__wheel" />
        </span>
        <span className="hero-scroll-hint__text">Scroll to explore</span>
      </div>
    </section>
  );
}
