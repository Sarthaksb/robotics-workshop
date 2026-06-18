import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar__inner">

        {/* Logo */}
        <a href="#hero" className="navbar__logo" aria-label="AI Robotics Workshop home">
          <span className="navbar__logo-icon" aria-hidden="true">🤖</span>
          <span className="navbar__logo-text">
            AI<span className="navbar__logo-accent">&</span>Robotics
          </span>
        </a>

        {/* Nav links */}
        <nav className="navbar__links" aria-label="Page sections">
          <a href="#about"    className="navbar__link">About</a>
          <a href="#outcomes" className="navbar__link">Curriculum</a>
          <a href="#faq"      className="navbar__link">FAQ</a>
          <a href="#register" className="navbar__link">Register</a>
        </nav>

        {/* CTA */}
        <a href="#register" className="navbar__cta" aria-label="Enroll now in the workshop">
          Enroll Now
        </a>
      </div>
    </header>
  );
}
