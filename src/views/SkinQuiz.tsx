import { useState } from "react";
import { QUIZ, SKIN_TYPES, scoreQuiz } from "../data/skin";

export default function SkinQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const complete = QUIZ.every((q) => answers[q.id] !== undefined);
  const result = done ? SKIN_TYPES[scoreQuiz(answers)] : null;

  if (result) {
    return (
      <section>
        <h2>Your skin looks: {result.label}</h2>
        <p>{result.description}</p>
        <div className="card">
          <h3>Look for</h3>
          <ul>{result.lookFor.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="card">
          <h3>Go easy on</h3>
          <ul>{result.avoid.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="card">
          <h3>Foundation tip</h3>
          <p>{result.foundationTip}</p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setAnswers({});
            setDone(false);
          }}
        >
          Retake quiz
        </button>
        <p className="note">
          This is a starting point, not a diagnosis. Skin changes with season, age and hormones.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2>Find your skin type</h2>
      <p>Answer for your bare skin, with no products on.</p>
      {QUIZ.map((q) => (
        <fieldset className="card" key={q.id}>
          <legend>{q.text}</legend>
          {q.options.map((o, i) => (
            <label key={o.label} className="option">
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === i}
                onChange={() => setAnswers({ ...answers, [q.id]: i })}
              />
              {o.label}
            </label>
          ))}
        </fieldset>
      ))}
      <button className="primary" disabled={!complete} onClick={() => setDone(true)}>
        See my result
      </button>
    </section>
  );
}
