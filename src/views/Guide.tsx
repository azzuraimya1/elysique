
import { useState } from "react";

const LESSONS = [
  {
    name: "Primer",
    category: "PREP YOUR BASE",
    description:
      "Primer creates a smooth starting point for your makeup. It can help makeup apply evenly and last longer.",
    what: "Think of primer as the first step in preparing your skin for makeup.",
    look: "Silicone-based primers can create a smooth, blurred finish. Water-based primers are often lightweight and hydrating.",
    tip: "You don't have to use primer. Skincare and moisturizer can be enough to get started.",
    question: "What is the main purpose of primer?",
    answers: [
      "To prepare skin for makeup",
      "To add color to your cheeks",
      "To remove makeup",
    ],
    correct: 0,
    explanation:
      "That's right! Primer helps prepare the skin so makeup can apply more smoothly.",
  },
  {
    name: "Foundation & Skin Tint",
    category: "EVEN YOUR COMPLEXION",
    description:
      "Foundation and skin tint help even out your skin tone. They come in different coverage levels and finishes.",
    what: "Skin tints usually provide lighter coverage, while foundations can range from light to full coverage.",
    look: "Test your shade along your jawline in natural light. Dewy finishes can add glow, while matte finishes can reduce the appearance of shine.",
    tip: "If you're new to makeup, try a skin tint or light-coverage foundation first.",
    question: "Where should you test a foundation shade?",
    answers: [
      "On the back of your hand",
      "Along your jawline",
      "On your forehead only",
    ],
    correct: 1,
    explanation:
      "Correct! Your jawline helps you compare the shade with both your face and neck.",
  },
  {
    name: "Concealer",
    category: "TARGETED COVERAGE",
    description:
      "Concealer provides extra coverage in specific areas, such as dark circles, blemishes, and redness.",
    what: "You can use concealer under your eyes, around your nose, or anywhere you want a little extra coverage.",
    look: "Choose a shade close to your foundation for blemishes. For a brighter under-eye look, some people prefer a shade slightly lighter.",
    tip: "Apply a small amount first. You can always build up the coverage.",
    question: "Which concealer shade is a good starting point for covering blemishes?",
    answers: [
      "A shade close to your foundation",
      "Several shades lighter",
      "The darkest shade available",
    ],
    correct: 0,
    explanation:
      "Exactly! A shade close to your foundation helps the concealer blend naturally into your base.",
  },
  {
    name: "Setting Powder",
    category: "SET YOUR MAKEUP",
    description:
      "Setting powder helps reduce shine and keep certain areas of your makeup in place.",
    what: "Powder is commonly used around the T-zone, under the eyes, and anywhere makeup tends to crease or become shiny.",
    look: "Translucent powder is a beginner-friendly option. Choose a powder that suits your skin tone and desired finish.",
    tip: "Use a light hand. Applying too much powder can make your makeup look dry or cakey.",
    question: "Where should you apply setting powder?",
    answers: [
      "Everywhere in a thick layer",
      "Only on your lips",
      "Where you want to reduce shine or set makeup",
    ],
    correct: 2,
    explanation:
      "Yes! Focus on the areas where you need it instead of automatically applying it everywhere.",
  },
  {
    name: "Blush & Bronzer",
    category: "ADD COLOR & WARMTH",
    description:
      "Blush adds color to your cheeks, while bronzer adds warmth and dimension to your face.",
    what: "Blush can give your face a fresh, rosy look. Bronzer can create a sun-kissed effect.",
    look: "Cream formulas are often easy to blend with your fingers or a makeup sponge. Choose shades that complement your preferences and skin tone.",
    tip: "Start with a small amount and build gradually. It's easier to add more than to remove too much.",
    question: "What does blush primarily add to your makeup look?",
    answers: [
      "Color to your cheeks",
      "Coverage under your eyes",
      "A matte finish to your lips",
    ],
    correct: 0,
    explanation:
      "That's right! Blush adds color and a fresh-looking flush to your cheeks.",
  },
  {
    name: "Brows, Mascara & Lips",
    category: "THE FINISHING TOUCHES",
    description:
      "These finishing products help define your features without requiring a complicated routine.",
    what: "Brow gel helps shape your brows, mascara enhances your lashes, and lip products add color or moisture.",
    look: "Try a tinted brow gel, a mascara you enjoy, and a tinted lip balm for a simple everyday look.",
    tip: "You don't need a full collection. A few products you know how to use can go a long way.",
    question: "Which combination makes a simple beginner finishing routine?",
    answers: [
      "Brow gel, mascara, and tinted lip balm",
      "Three different foundations",
      "Setting powder and primer only",
    ],
    correct: 0,
    explanation:
      "You got it! Those three products can add definition and a little color to an everyday look.",
  },
];

export default function Guide() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const lesson = LESSONS[lessonIndex];
  const answeredCorrectly = selectedAnswer === lesson.correct;
  const progress = Math.round((completed.length / LESSONS.length) * 100);

  function chooseAnswer(index: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === lesson.correct && !completed.includes(lessonIndex)) {
      setCompleted((previous) => [...previous, lessonIndex]);
    }
  }

  function nextLesson() {
    if (lessonIndex === LESSONS.length - 1) {
      setFinished(true);
      return;
    }

    setLessonIndex((previous) => previous + 1);
    setSelectedAnswer(null);
  }

  function previousLesson() {
    if (lessonIndex === 0) return;

    setLessonIndex((previous) => previous - 1);
    setSelectedAnswer(null);
  }

  function restartCourse() {
    setLessonIndex(0);
    setSelectedAnswer(null);
    setCompleted([]);
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="guide-course">
        <div className="card">
          <p className="eyebrow">ELYSIQUE BEGINNER COURSE</p>
          <h2>You've completed the basics!</h2>
          <p>
            You just learned about six essential makeup categories.
            Remember, makeup is about finding what works for you.
          </p>

          <h3>Your course progress</h3>
          <p>
            {completed.length} of {LESSONS.length} knowledge checks answered correctly.
          </p>

          <div className="guide-progress-track">
            <div
              className="guide-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3>Your beginner shopping list</h3>
          <ul>
            <li>Sunscreen for daytime skin protection</li>
            <li>Skin tint or light-coverage foundation</li>
            <li>Concealer</li>
            <li>Cream blush</li>
            <li>Mascara</li>
            <li>Tinted lip balm</li>
          </ul>

          <p>
            You don't need to buy everything at once. Start with the
            products you actually want to use.
          </p>

          <button className="tab active" onClick={restartCourse}>
            Review the lessons
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="guide-course">
      <div className="guide-heading">
        <p className="eyebrow">THE ELYSIQUE BEGINNER COURSE</p>
        <h2>Learn your makeup essentials.</h2>
        <p>
          One product at a time. Learn what it does, what to look for,
          and how to use it.
        </p>
      </div>

      <div className="card guide-progress-card">
        <div className="guide-progress-label">
          <span>YOUR PROGRESS</span>
          <span>
            {lessonIndex + 1} OF {LESSONS.length}
          </span>
        </div>

        <div className="guide-progress-track">
          <div
            className="guide-progress-fill"
            style={{
              width: `${((lessonIndex + 1) / LESSONS.length) * 100}%`,
            }}
          />
        </div>

        <div className="guide-lesson-dots">
          {LESSONS.map((item, index) => (
            <button
              key={item.name}
              className={
                index === lessonIndex
                  ? "guide-dot current"
                  : completed.includes(index)
                    ? "guide-dot complete"
                    : "guide-dot"
              }
              onClick={() => {
                setLessonIndex(index);
                setSelectedAnswer(null);
              }}
              aria-label={`Go to ${item.name} lesson`}
              title={item.name}
            />
          ))}
        </div>
      </div>

      <div className="card guide-lesson-card">
        <p className="eyebrow">{lesson.category}</p>
        <p className="guide-lesson-number">
          LESSON {String(lessonIndex + 1).padStart(2, "0")}
        </p>

        <h2>{lesson.name}</h2>
        <p className="guide-description">{lesson.description}</p>

        <div className="guide-info">
          <h3>What does it do?</h3>
          <p>{lesson.what}</p>
        </div>

        <div className="guide-info">
          <h3>What should you look for?</h3>
          <p>{lesson.look}</p>
        </div>

        <div className="guide-tip">
          <strong>ELYSIQUE TIP</strong>
          <p>{lesson.tip}</p>
        </div>
      </div>

      <div className="card guide-quiz-card">
        <p className="eyebrow">CHECK YOUR KNOWLEDGE</p>
        <h3>{lesson.question}</h3>

        <div className="guide-answer-list">
          {lesson.answers.map((answer, index) => {
            const isCorrect = index === lesson.correct;
            const isSelected = selectedAnswer === index;

            let answerClass = "guide-answer";

            if (selectedAnswer !== null && isCorrect) {
              answerClass += " correct";
            } else if (isSelected && !isCorrect) {
              answerClass += " incorrect";
            }

            return (
              <button
                key={answer}
                className={answerClass}
                onClick={() => chooseAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span>{String.fromCharCode(65 + index)}.</span>
                {answer}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="guide-feedback" role="status">
            <strong>
              {answeredCorrectly ? "Correct!" : "Not quite. Here's the answer:"}
            </strong>
            <p>{lesson.explanation}</p>
          </div>
        )}
      </div>

      <div className="guide-navigation">
        <button
          className="tab"
          onClick={previousLesson}
          disabled={lessonIndex === 0}
        >
          Previous
        </button>

        <button
          className="tab active"
          onClick={nextLesson}
          disabled={selectedAnswer === null}
        >
          {lessonIndex === LESSONS.length - 1
            ? "Complete course"
            : "Next lesson"}
        </button>
      </div>

      <p className="guide-encouragement">
        Beauty is a learning process. Take your time and enjoy it.
      </p>
    </section>
  );
}
