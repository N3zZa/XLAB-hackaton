import { knownTechnologies } from "constants/technologies";

const TECHNOLOGY_NORMALIZATION: Record<string, string> = {
  golang: "Go",
  go: "Golang",
  js: "JavaScript",
  javascript: "Js",
  ts: "TypeScript",
  typescript: "Ts",
};

export const normalizeTechnology = (tech: string): string => {
  const lowerTech = tech.toLowerCase();
  return TECHNOLOGY_NORMALIZATION[lowerTech] || tech;
};

export const getTechnologies = (...texts: (string | undefined)[]): string[] => {
  const result = new Set<string>();

  texts.forEach((text) => {
    if (!text) return;
    const lowerText = text.toLowerCase();

    knownTechnologies.forEach((tech) => {
      const lowerTech = tech.toLowerCase();
      if (lowerText.includes(lowerTech)) {
        const normalized = normalizeTechnology(tech);
        result.add(normalized);
      }
    });
  });

  return Array.from(result);
};
