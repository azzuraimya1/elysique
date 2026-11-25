
import { INGREDIENTS, type Ingredient } from "../data/ingredients";

export interface Match {
  raw: string;
  ingredient: Ingredient | null;
  isSilicone: boolean;
}

export interface Analysis {
  matches: Match[];
  siliconeCount: number;
  flagged: Match[];
  unknownCount: number;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9/.\- ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const SILICONE_PATTERN =
  /(cone|siloxane|silanol|conol|silsesquioxane)$/i;

const LOOKUP = new Map<string, Ingredient>();

for (const ing of INGREDIENTS) {
  LOOKUP.set(norm(ing.name), ing);

  for (const alias of ing.aliases ?? []) {
    LOOKUP.set(norm(alias), ing);
  }
}

function cleanOCR(text: string): string {
  return text
    .replace(/\r?\n/g, " ")
    .replace(/([A-Za-z])-\s+([A-Za-z])/g, "$1$2")
    .replace(/\bPRO\s*-\s*PYLENE\b/gi, "Propylene")
    .replace(/\bPHEN\s*-\s*OXYETHANOL\b/gi, "Phenoxyethanol")
    .replace(/\bCAPRYLYL\s+GLY\s*-\s*COL\b/gi, "Caprylyl Glycol")

    // Correct the Melissa leaf water OCR error
    .replace(
      /MELISSA OFFICINALIS HOMER LE WATER/gi,
      "Melissa Officinalis Leaf Water"
    )

    // Separate two ingredients merged by OCR
    .replace(
      /2\s*HEXANEDIOL\s+IL\s*DL\s+BLUE\s*1\s*\(C1\s*42090\)/gi,
      "1,2-Hexanediol, Blue 1 (CI 42090)"
    )

    .replace(/\s+/g, " ")
    .trim();
}

export function extractIngredientText(text: string): string {
  const flat = cleanOCR(text);
  const match = flat.match(/ingredients?\s*[:\-]?\s*(.*)/i);

  return (match ? match[1] : flat).trim();
}

export function splitIngredients(text: string): string[] {
  const parts = extractIngredientText(text)
    // Preserve the comma in 1,2-Hexanediol
    .split(/,(?!\d)|[;•·]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);

  const seen = new Set<string>();

  return parts.filter((ingredient) => {
    const key = norm(ingredient);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function analyze(text: string): Analysis {
  const matches: Match[] = splitIngredients(text).map((raw) => {
    const normalized = norm(raw);

    let ingredient = LOOKUP.get(normalized) ?? null;

    if (!ingredient) {
      const withoutParentheses = normalized
        .replace(/[()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      ingredient = LOOKUP.get(withoutParentheses) ?? null;
    }

    const isSilicone =
      ingredient?.category === "silicone" ||
      (!ingredient && SILICONE_PATTERN.test(normalized));

    return {
      raw,
      ingredient,
      isSilicone,
    };
  });

  return {
    matches,
    siliconeCount: matches.filter((m) => m.isSilicone).length,
    flagged: matches.filter((m) => m.ingredient?.flag),
    unknownCount: matches.filter(
      (m) => !m.ingredient && !m.isSilicone
    ).length,
  };
}
