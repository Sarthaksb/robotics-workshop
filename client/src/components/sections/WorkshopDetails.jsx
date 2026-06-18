import "./WorkshopDetails.css";

// ── Static workshop data (single source of truth) ──────────────────────────────
const WORKSHOP_DETAILS = [
  {
    id: "age-group",
    icon: "👦",
    label: "Age Group",
    value: "8–14 Years",
    accent: "cyan",
    description: "Designed for young, curious minds ready to explore tech.",
  },
  {
    id: "duration",
    icon: "📅",
    label: "Duration",
    value: "4 Weeks",
    accent: "violet",
    description: "Intensive hands-on sessions across four exciting weeks.",
  },
  {
    id: "mode",
    icon: "💻",
    label: "Mode",
    value: "Online",
    accent: "green",
    description: "Live interactive classes — learn from anywhere.",
  },
  {
    id: "fee",
    icon: "💰",
    label: "Workshop Fee",
    value: "₹2,999",
    accent: "orange",
    description: "All-inclusive fee. No hidden charges whatsoever.",
  },
  {
    id: "start-date",
    icon: "🚀",
    label: "Start Date",
    value: "15 July 2026",
    accent: "pink",
    description: "Mark your calendar — the journey begins soon!",
  },
];

// ── Single detail card ──────────────────────────────────────────────────────────
function DetailCard({ id, icon, label, value, accent, description, index }) {
  return (
    <article
      className={`wd-card wd-card--${accent}`}
      id={`detail-${id}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      aria-label={`${label}: ${value}`}
    >
      {/* Top row: icon + accent line */}
      <div className="wd-card__top">
        <span className="wd-card__icon" aria-hidden="true">
          {icon}
        </span>
        <span className={`wd-card__dot wd-card__dot--${accent}`} aria-hidden="true" />
      </div>

      {/* Label */}
      <p className="wd-card__label">{label}</p>

      {/* Main value */}
      <p className="wd-card__value">{value}</p>

      {/* Divider */}
      <div className={`wd-card__divider wd-card__divider--${accent}`} aria-hidden="true" />

      {/* Description */}
      <p className="wd-card__desc">{description}</p>
    </article>
  );
}

// ── Main WorkshopDetails component ─────────────────────────────────────────────
export default function WorkshopDetails() {
  return (
    <section id="about" className="wd-section" aria-labelledby="wd-heading">
      {/* Section header */}
      <div className="wd-header">
        <span className="wd-header__badge">Workshop At a Glance</span>
        <h2 className="wd-header__title" id="wd-heading">
          Everything You Need to Know
        </h2>
        <p className="wd-header__sub">
          A comprehensive, structured, and beginner-friendly program built for
          the next generation of innovators.
        </p>
      </div>

      {/* Cards grid */}
      <div className="wd-grid" role="list">
        {WORKSHOP_DETAILS.map((detail, index) => (
          <DetailCard key={detail.id} {...detail} index={index} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="wd-cta-strip">
        <p className="wd-cta-strip__text">
          🎯 <strong>Limited seats available.</strong> Secure your child's spot before registrations close.
        </p>
        <a href="#register" className="wd-cta-strip__btn" aria-label="Enroll now">
          Enroll Now →
        </a>
      </div>
    </section>
  );
}
