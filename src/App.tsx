
import { useState } from "react";
import Guide from "./views/Guide";
import SkinQuiz from "./views/SkinQuiz";
import Silicones from "./views/Silicones";
import Scanner from "./views/Scanner";

const FEATURES = [
  {
    id: "guide",
    number: "01",
    title: "Learn your products",
    description: "Build your makeup routine, one product at a time.",
    detail: "THE BEGINNER GUIDE",
  },
  {
    id: "skin",
    number: "02",
    title: "Understand your skin",
    description: "Discover your skin type and learn what works for it.",
    detail: "YOUR SKIN PROFILE",
  },
  {
    id: "silicone",
    number: "03",
    title: "Decode ingredients",
    description: "Understand silicone, water-based formulas and more.",
    detail: "INGREDIENT EDUCATION",
  },
  {
    id: "scan",
    number: "04",
    title: "Scan a product",
    description: "Read an ingredient label and understand what's inside.",
    detail: "THE INGREDIENT SCANNER",
  },
] as const;

type TabId = (typeof FEATURES)[number]["id"];
type Screen = "welcome" | "home" | TabId;

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const goHome = () => setScreen("home");

  return (
    <div className="app">
      <header className="site-header">
        <button
          className="wordmark"
          onClick={goHome}
          aria-label="Return to Elysique home"
        >
          ELYSIQUE
          <span>BEAUTY, DECODED.</span>
        </button>

        {screen !== "welcome" && (
          <nav className="top-nav" aria-label="Main navigation">
            <button
              className={screen === "home" ? "nav-link active" : "nav-link"}
              onClick={goHome}
            >
              Home
            </button>
            <button
              className="nav-link"
              onClick={() => setScreen("guide")}
            >
              Explore
            </button>
            <button
              className="nav-link"
              onClick={() => setScreen("scan")}
            >
              Scan
            </button>
          </nav>
        )}
      </header>

      <main className="main-content">
        {screen === "welcome" && (
          <section className="welcome-screen">
            <div className="welcome-copy">
              <p className="eyebrow">THE ART AND SCIENCE OF BEAUTY</p>

              <h1>
                Beauty,
                <br />
                <em>decoded.</em>
              </h1>

              <p className="welcome-description">
                A new way to understand your skin, learn about makeup,
                and make confident beauty decisions.
              </p>

              <button
                className="primary-button"
                onClick={() => setScreen("home")}
              >
                Begin your journey <span>→</span>
              </button>

              <p className="welcome-note">
                YOUR BEAUTY JOURNEY STARTS HERE
              </p>
            </div>

            <div className="welcome-art">
              <div className="art-circle art-circle-one" />
              <div className="art-circle art-circle-two" />
              <div className="art-label">
                <span>ELYSIQUE</span>
                <span>THE BEAUTY EDIT</span>
              </div>
            </div>
          </section>
        )}

        {screen === "home" && (
          <section className="dashboard">
            <div className="dashboard-intro">
              <p className="eyebrow">WELCOME TO YOUR BEAUTY SPACE</p>
              <h1>
                Discover your
                <br />
                <em>beauty, your way.</em>
              </h1>
              <p>
                Whether you're just starting out or learning something new,
                we're here to help you understand beauty beyond the surface.
              </p>
            </div>

            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR LEARNING SPACE</p>
                <h2>Where would you like to begin?</h2>
              </div>
              <span className="section-count">04 EXPERIENCES</span>
            </div>

            <div className="feature-grid">
              {FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  className={`feature-card feature-${feature.id}`}
                  onClick={() => setScreen(feature.id)}
                >
                  <span className="feature-number">{feature.number}</span>
                  <span className="feature-detail">{feature.detail}</span>
                  <span className="feature-title">{feature.title}</span>
                  <span className="feature-description">
                    {feature.description}
                  </span>
                  <span className="feature-arrow">Explore experience →</span>
                </button>
              ))}
            </div>

            <section className="quote-panel">
              <p className="eyebrow">A LITTLE REMINDER</p>
              <h2>
                Beauty isn't about knowing everything.
                <br />
                It's about understanding what works for you.
              </h2>
            </section>
          </section>
        )}

        {screen !== "welcome" && screen !== "home" && (
          <section className="feature-screen">
            <button className="back-button" onClick={goHome}>
              ← Back to home
            </button>

            {screen === "guide" && <Guide />}
            {screen === "skin" && <SkinQuiz />}
            {screen === "silicone" && <Silicones />}
            {screen === "scan" && <Scanner />}
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div>
          <span className="footer-brand">ELYSIQUE</span>
          <span className="footer-tagline">Beauty, decoded.</span>
        </div>
        <p>
          Educational only, not medical advice. If a product irritates your
          skin, stop using it and talk to a dermatologist.
        </p>
        <span className="footer-copyright">
          THE ART AND SCIENCE OF BEAUTY
        </span>
      </footer>
    </div>
  );
}
