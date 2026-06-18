import "./LearningOutcomes.css";

// ── Outcomes data ───────────────────────────────────────────────────────────────
const OUTCOMES = [
  {
    id: "ai-intro",
    number: "01",
    icon: "🧠",
    title: "Introduction to Artificial Intelligence",
    description:
      "Understand how AI works, explore machine learning concepts, and discover how smart systems are built to think and learn from data.",
    tags: ["AI Basics", "Machine Learning", "Neural Nets"],
    accent: "cyan",
  },
  {
    id: "robotics",
    number: "02",
    icon: "🤖",
    title: "Robotics Fundamentals",
    description:
      "Dive into the building blocks of robotics — sensors, actuators, motors, and circuits — and learn how machines interact with the physical world.",
    tags: ["Sensors", "Actuators", "Circuits"],
    accent: "violet",
  },
  {
    id: "programming",
    number: "03",
    icon: "💻",
    title: "Basic Programming Concepts",
    description:
      "Start coding from scratch using beginner-friendly tools. Learn variables, loops, conditions, and functions through engaging exercises.",
    tags: ["Coding", "Loops", "Functions"],
    accent: "green",
  },
  {
    id: "problem-solving",
    number: "04",
    icon: "🎯",
    title: "Problem Solving Skills",
    description:
      "Develop analytical thinking and logical reasoning to break complex challenges into manageable steps — a skill for life beyond tech.",
    tags: ["Critical Thinking", "Logic", "Creativity"],
    accent: "orange",
  },
  {
    id: "projects",
    number: "05",
    icon: "🚀",
    title: "Build Mini AI & Robotics Projects",
    description:
      "Apply everything learned by building real, working mini-projects — from a smart chatbot to a line-following robot — that you can show the world.",
    tags: ["Hands-On", "Projects", "Portfolio"],
    accent: "pink",
    featured: true,
  },
];

// ── Outcome card ────────────────────────────────────────────────────────────────
function OutcomeCard({ outcome, index }) {
  const { id, number, icon, title, description, tags, accent, featured } = outcome;

  return (
    <article
      className={`lo-card lo-card--${accent}${featured ? " lo-card--featured" : ""}`}
      id={`outcome-${id}`}
      style={{ animationDelay: `${index * 0.12}s` }}
      aria-label={title}
    >
      {featured && (
        <span className="lo-card__featured-badge" aria-label="Capstone project">
          ⭐ Capstone Project
        </span>
      )}

      {/* Number + Icon row */}
      <div className="lo-card__header">
        <span className={`lo-card__number lo-card__number--${accent}`}>
          {number}
        </span>
        <span className="lo-card__icon" aria-hidden="true">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="lo-card__title">{title}</h3>

      {/* Description */}
      <p className="lo-card__desc">{description}</p>

      {/* Tags */}
      <ul className="lo-card__tags" aria-label="Topics covered">
        {tags.map((tag) => (
          <li key={tag} className={`lo-card__tag lo-card__tag--${accent}`}>
            {tag}
          </li>
        ))}
      </ul>

      {/* Bottom accent bar */}
      <div className={`lo-card__bar lo-card__bar--${accent}`} aria-hidden="true" />
    </article>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="lo-section" aria-labelledby="lo-heading">

      {/* Background decorations */}
      <div className="lo-bg-orb lo-bg-orb--1" aria-hidden="true" />
      <div className="lo-bg-orb lo-bg-orb--2" aria-hidden="true" />

      {/* Section header */}
      <div className="lo-header">
        <span className="lo-header__badge">What You Will Learn</span>
        <h2 className="lo-header__title" id="lo-heading">
          Learning <span className="lo-header__title-accent">Outcomes</span>
        </h2>
        <p className="lo-header__sub">
          By the end of this 4-week journey, every student walks away with
          real skills, a working project, and the confidence to create.
        </p>
      </div>

      {/* Cards grid */}
      <div className="lo-grid" role="list">
        {OUTCOMES.map((outcome, index) => (
          <OutcomeCard key={outcome.id} outcome={outcome} index={index} />
        ))}
      </div>

      {/* Bottom summary stat strip */}
      <div className="lo-stats" role="list" aria-label="Program highlights">
        {[
          { value: "5",    label: "Core Skills",     icon: "🎓" },
          { value: "20+",  label: "Live Sessions",   icon: "📡" },
          { value: "4",    label: "Weeks",            icon: "📅" },
          { value: "100%", label: "Project-Based",   icon: "🔨" },
        ].map(({ value, label, icon }) => (
          <div key={label} className="lo-stat" role="listitem">
            <span className="lo-stat__icon" aria-hidden="true">{icon}</span>
            <span className="lo-stat__value">{value}</span>
            <span className="lo-stat__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
