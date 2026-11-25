import { useState } from "react";
import { analyze, type Analysis } from "../lib/analyze";

const FLAG_TEXT: Record<string, string> = {
  comedogenic: "Can clog pores for some people",
  "irritant-possible": "Can irritate sensitive skin",
  "allergen-possible": "Possible allergen or fragrance",
};

const SAMPLE =
  "Ingredients: Water, Cyclopentasiloxane, Glycerin, Dimethicone, Niacinamide, Titanium Dioxide, Isopropyl Myristate, Phenoxyethanol, Parfum";

export default function Scanner() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function onFile(file: File) {
    setBusy(true);
    setError("");
    setProgress(0);
    try {
      // Loaded on demand so the main bundle stays small.
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng", 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") setProgress(m.progress);
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      setText(data.text);
      setResult(analyze(data.text));
    } catch {
      setError("Couldn't read that photo. Try a clearer, well-lit, close-up shot, or paste the text below.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <h2>Scan a label</h2>
      <p>
        Take a clear, close-up photo of the ingredient list on the back of the product. Everything
        runs in your browser: your photo is never uploaded.
      </p>

      <label className="primary file">
        {busy ? `Reading… ${Math.round(progress * 100)}%` : "Take or choose a photo"}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <h3>Or paste the ingredients</h3>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Water, Dimethicone, Glycerin…"
        />
        <div className="row">
          <button className="primary" disabled={!text.trim()} onClick={() => setResult(analyze(text))}>
            Analyze
          </button>
          <button
            onClick={() => {
              setText(SAMPLE);
              setResult(analyze(SAMPLE));
            }}
          >
            Try an example
          </button>
        </div>
      </div>

      {result && (
        <div>
          <div className="card summary">
            <h3>Summary</h3>
            <p>
              {result.matches.length} ingredients found.{" "}
              {result.siliconeCount > 0
                ? `${result.siliconeCount} silicone${result.siliconeCount > 1 ? "s" : ""} detected, so this is likely a silicone-based product.`
                : "No silicones detected."}
            </p>
            {result.flagged.length > 0 && (
              <p>
                Worth a look: {result.flagged.map((m) => m.ingredient!.name).join(", ")}.
              </p>
            )}
            {result.unknownCount > 0 && (
              <p className="note">
                {result.unknownCount} ingredient{result.unknownCount > 1 ? "s aren't" : " isn't"} in
                the database yet. OCR can also misread letters, so check the original label.
              </p>
            )}
          </div>

          {result.matches.map((m, i) => (
            <div className="card ingredient" key={i}>
              <h3>
                {m.ingredient?.name ?? m.raw}
                {m.isSilicone && <span className="badge silicone">silicone</span>}
                {m.ingredient?.flag && <span className="badge warn">{FLAG_TEXT[m.ingredient.flag]}</span>}
              </h3>
              <p>
                {m.ingredient
                  ? m.ingredient.what
                  : m.isSilicone
                  ? "Looks like a silicone based on its name. It isn't in the database yet."
                  : "Not in the database yet."}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
