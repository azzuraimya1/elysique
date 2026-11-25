
export type Category =
  | "silicone"
  | "emollient"
  | "humectant"
  | "preservative"
  | "pigment"
  | "film-former"
  | "active"
  | "fragrance"
  | "solvent"
  | "other";

export interface Ingredient {
  name: string;
  aliases?: string[];
  category: Category;
  what: string;
  flag?: "comedogenic" | "irritant-possible" | "allergen-possible";
}

export const INGREDIENTS: Ingredient[] = [
  {
    name: "Water",
    aliases: ["Aqua", "Eau", "Water (Aqua)"],
    category: "solvent",
    what: "The base of many water-based products. Helps dissolve other ingredients.",
  },
  {
    name: "Butylene Glycol",
    category: "humectant",
    what: "A hydrating helper that also improves how other ingredients spread.",
  },
  {
    name: "Glycerin",
    category: "humectant",
    what: "Pulls water into the skin. Hydrating and generally well tolerated.",
  },
  {
    name: "PEG-150 Distearate",
    category: "other",
    what: "A thickener that helps improve the texture and consistency of a formula.",
  },
  {
    name: "Polysorbate 80",
    category: "other",
    what: "An emulsifier that helps oil and water ingredients mix.",
  },
  {
    name: "Niacinamide",
    category: "active",
    what: "A vitamin B3 derivative that can help with oil balance, texture and redness.",
  },
  {
    name: "Rosemary Leaf Water",
    aliases: [
      "Rosmarinus Officinalis Leaf Water",
      "Rosmarinus Officinalis (Rosemary) Leaf Water",
    ],
    category: "other",
    what: "A botanical ingredient derived from rosemary. May contribute fragrance and skin-conditioning properties.",
  },
  {
    name: "Melissa Leaf Water",
    aliases: [
      "Melissa Officinalis Leaf Water",
      "Melissa Officinalis (Lemon Balm) Leaf Water",
    ],
    category: "other",
    what: "A botanical water derived from lemon balm.",
  },
  {
    name: "Peppermint Leaf Water",
    aliases: [
      "Mentha Piperita Leaf Water",
      "Mentha Piperita (Peppermint) Leaf Water",
    ],
    category: "other",
    what: "A botanical water derived from peppermint. May irritate sensitive skin.",
    flag: "irritant-possible",
  },
  {
    name: "Hyaluronic Acid",
    aliases: ["Sodium Hyaluronate"],
    category: "humectant",
    what: "Holds a lot of water. Plumps and hydrates the skin's surface.",
  },
  {
    name: "Sodium Ascorbyl Phosphate",
    category: "active",
    what: "A stable vitamin C derivative used for antioxidant benefits and skin brightening.",
  },
  {
    name: "Menthol",
    category: "fragrance",
    what: "Creates a cooling sensation but may irritate sensitive skin.",
    flag: "irritant-possible",
  },
  {
    name: "Pentylene Glycol",
    category: "humectant",
    what: "Helps attract moisture and improve the feel of a formula.",
  },
  {
    name: "Propylene Glycol",
    category: "humectant",
    what: "Helps retain moisture and dissolve ingredients. Can irritate very sensitive skin in some people.",
    flag: "irritant-possible",
  },
  {
    name: "PEG-240",
    category: "other",
    what: "A polymer ingredient commonly used to thicken and stabilize formulas.",
  },
  {
    name: "PEG-40 Hydrogenated Castor Oil",
    category: "emollient",
    what: "Helps dissolve oils and fragrance ingredients in a formula.",
  },
  {
    name: "Phenoxyethanol",
    category: "preservative",
    what: "A common preservative that helps protect products from bacteria and mold.",
  },
  {
    name: "Ethylhexylglycerin",
    category: "preservative",
    what: "A preservative booster that also conditions skin.",
  },
  {
    name: "Caprylyl Glycol",
    category: "humectant",
    what: "Helps condition skin and supports product preservation.",
  },
  {
    name: "Disodium EDTA",
    category: "other",
    what: "Helps stabilize formulas by binding metal ions.",
  },
  {
    name: "Trideceth-5",
    aliases: ["Trideceth 5", "Trideceths"],
    category: "other",
    what: "A surfactant that helps ingredients mix and spread.",
  },
  {
    name: "1,2-Hexanediol",
    aliases: ["12-Hexanediol", "1 2 Hexanediol"],
    category: "humectant",
    what: "A multifunctional ingredient used for moisture and preservation support.",
  },
  {
    name: "1,1,2-Hexanediol",
    aliases: ["1 1 2 Hexanediol"],
    category: "humectant",
    what: "A multifunctional ingredient used in cosmetic formulations.",
  },
  {
    name: "Blue 1",
    aliases: ["CI 42090", "Blue 1 (CI 42090)"],
    category: "pigment",
    what: "A color additive used to give products a blue shade.",
  },
  {
    name: "Yellow 5",
    aliases: ["CI 19140", "FD&C Yellow No. 5"],
    category: "pigment",
    what: "A color additive used to give products a yellow shade.",
  },
  {
    name: "PEG-240/HDI Copolymer Bis-Decyltetradeceth-20 Ether",
    aliases: [
      "/HDI Copolymer Bis-Decyltetradeceth-20 Ether",
      "HDI Copolymer Bis-Decyltetradeceth-20 Ether",
    ],
    category: "other",
    what: "A cosmetic polymer used to help control formula thickness and stability. Verify the complete ingredient name against the original label.",
  },
  {
    name: "Dimethicone",
    category: "silicone",
    what: "A common silicone that gives products a smooth, slippery feel and helps makeup glide on.",
  },
  {
    name: "Cyclopentasiloxane",
    aliases: ["Cyclopentasiloxane D5", "Cyclomethicone"],
    category: "silicone",
    what: "A lightweight, volatile silicone that evaporates after application, leaving a silky finish.",
  },
  {
    name: "Cyclohexasiloxane",
    aliases: ["D6"],
    category: "silicone",
    what: "A lightweight silicone used to improve spreadability and leave a silky finish.",
  },
  {
    name: "Dimethiconol",
    category: "silicone",
    what: "A silicone that helps condition skin and create a smooth finish.",
  },
  {
    name: "Phenyl Trimethicone",
    category: "silicone",
    what: "A silicone that adds shine and improves the silky feel of a formula.",
  },
  {
    name: "Trimethylsiloxysilicate",
    category: "silicone",
    what: "A film-forming silicone that helps makeup last longer.",
  },
  {
    name: "Polysilicone-11",
    category: "silicone",
    what: "A silicone polymer used to create a smooth, soft-focus finish.",
  },
  {
    name: "Isopropyl Myristate",
    category: "emollient",
    what: "A lightweight oil that makes products feel silky. Can clog pores for some people.",
    flag: "comedogenic",
  },
  {
    name: "Isopropyl Palmitate",
    category: "emollient",
    what: "An emollient that softens skin and improves product spreadability.",
    flag: "comedogenic",
  },
  {
    name: "Parfum",
    aliases: ["Fragrance", "Perfume"],
    category: "fragrance",
    what: "A catch-all term for scent blends. Can irritate sensitive skin or trigger allergies.",
    flag: "allergen-possible",
  },
];
