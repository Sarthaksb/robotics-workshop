import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo" aria-hidden="true">🤖</span>
          <p className="footer__tagline">AI &amp; Robotics Summer Workshop 2026</p>
        </div>

        {/* Links */}
        <nav className="footer__links" aria-label="Footer navigation">
          <a href="#about"    className="footer__link">About</a>
          <a href="#outcomes" className="footer__link">Curriculum</a>
          <a href="#faq"      className="footer__link">FAQ</a>
          <a href="#register" className="footer__link">Register</a>
        </nav>

        {/* Contact */}
        <div className="footer__contact">
          <a
            href="mailto:support@airobotics.in"
            className="footer__link"
            aria-label="Email support"
          >
            ✉️ support@airobotics.in
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} AI &amp; Robotics Workshop. All rights reserved.</p>
        <p className="footer__details">
          Ages 8–14 &nbsp;·&nbsp; 4 Weeks &nbsp;·&nbsp; Online &nbsp;·&nbsp; Starts 15 July 2026
        </p>
      </div>
    </footer>
  );
}
