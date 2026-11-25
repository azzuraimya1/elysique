export type SkinKey = "dry" | "oily" | "combination" | "normal" | "sensitive";

export interface SkinType {
  key: SkinKey;
  label: string;
  description: string;
  lookFor: string[];
  avoid: string[];
  foundationTip: string;
}

export const SKIN_TYPES: Record<SkinKey, SkinType> = {
  dry: {
    key: "dry",
    label: "Dry",
    description: "Skin often feels tight or flaky, and makeup can cling to dry patches.",
    lookFor: ["Hydrating, dewy or satin foundations", "Glycerin, hyaluronic acid, squalane", "Cream blush and cream bronzer"],
    avoid: ["Ultra-matte, long-wear formulas", "Heavy powder all over the face", "Lots of drying alcohol"],
    foundationTip: "Moisturize first and let it sink in for a few minutes before foundation.",
  },
  oily: {
    key: "oily",
    label: "Oily",
    description: "Shine appears within a few hours, especially on the forehead, nose and chin.",
    lookFor: ["Oil-free or matte foundations", "Silica, kaolin, niacinamide", "Powder products in the T-zone"],
    avoid: ["Heavy oils and butters", "Rich cream formulas", "Very dewy finishes all over"],
    foundationTip: "A mattifying primer on the T-zone only, then set with a light dusting of powder.",
  },
  combination: {
    key: "combination",
    label: "Combination",
    description: "Oily in the T-zone (forehead, nose, chin) but normal or dry on the cheeks.",
    lookFor: ["Lightweight, balanced foundations", "Different products for different zones", "Blotting papers for midday touch-ups"],
    avoid: ["Treating the whole face the same way", "Very heavy or very matte formulas"],
    foundationTip: "Powder only where you get shiny and keep the cheeks glowy.",
  },
  normal: {
    key: "normal",
    label: "Normal",
    description: "Neither very oily nor very dry. Few concerns and a wide range of products will work.",
    lookFor: ["Almost anything. Pick by finish and coverage you like", "Sunscreen in your base products"],
    avoid: ["Nothing in particular. Patch-test new products anyway"],
    foundationTip: "Start with a light coverage formula and build up where you need it.",
  },
  sensitive: {
    key: "sensitive",
    label: "Sensitive",
    description: "Skin reacts easily: redness, stinging or itching with new products.",
    lookFor: ["Short ingredient lists", "Fragrance-free formulas", "Mineral formulas with zinc oxide or titanium dioxide"],
    avoid: ["Added fragrance (parfum)", "Denatured alcohol", "Lots of essential oils"],
    foundationTip: "Patch-test any new product on your jaw for a few days before using it on your whole face.",
  },
};

export interface QuizQuestion {
  id: string;
  text: string;
  options: { label: string; scores: Partial<Record<SkinKey, number>> }[];
}

export const QUIZ: QuizQuestion[] = [
  {
    id: "afterwash",
    text: "About an hour after washing your face, with nothing on it, how does your skin feel?",
    options: [
      { label: "Tight, maybe a bit flaky", scores: { dry: 3 } },
      { label: "Comfortable, not shiny", scores: { normal: 3 } },
      { label: "Shiny all over", scores: { oily: 3 } },
      { label: "Shiny on the forehead and nose only", scores: { combination: 3 } },
    ],
  },
  {
    id: "midday",
    text: "By mid-afternoon, how does your foundation or moisturizer look?",
    options: [
      { label: "Patchy or clinging to dry spots", scores: { dry: 2 } },
      { label: "Pretty much the same as in the morning", scores: { normal: 2 } },
      { label: "Slipping or greasy", scores: { oily: 2 } },
      { label: "Greasy in the T-zone, fine elsewhere", scores: { combination: 2 } },
    ],
  },
  {
    id: "react",
    text: "How does your skin react to new products?",
    options: [
      { label: "Rarely at all", scores: { normal: 1 } },
      { label: "Often stings, itches or gets red", scores: { sensitive: 4 } },
      { label: "Sometimes breaks out", scores: { oily: 1, combination: 1 } },
      { label: "Sometimes feels tight or dry", scores: { dry: 1 } },
    ],
  },
  {
    id: "pores",
    text: "How visible are your pores?",
    options: [
      { label: "Barely visible", scores: { dry: 1, normal: 1 } },
      { label: "Visible on nose and cheeks", scores: { combination: 2 } },
      { label: "Large and visible in many areas", scores: { oily: 2 } },
    ],
  },
];

export function scoreQuiz(answers: Record<string, number>): SkinKey {
  const totals: Record<SkinKey, number> = { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 0 };
  for (const q of QUIZ) {
    const idx = answers[q.id];
    if (idx === undefined) continue;
    const scores = q.options[idx].scores;
    for (const k of Object.keys(scores) as SkinKey[]) totals[k] += scores[k] ?? 0;
  }
  // Sensitivity is a trait that overrides, if it scores high enough.
  if (totals.sensitive >= 4) return "sensitive";
  const base: SkinKey[] = ["dry", "oily", "combination", "normal"];
  return base.reduce((best, k) => (totals[k] > totals[best] ? k : best), base[0]);
}
