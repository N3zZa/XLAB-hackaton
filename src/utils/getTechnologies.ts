import { knownTechnologies } from "constants/technologies";


export const getTechnologies = (
  ...texts: (string | undefined)[]
): string[] => {
  const result = new Set<string>();

  texts.forEach((text) => {
    if (!text) return;
    const lowerText = text.toLowerCase();

    knownTechnologies.forEach((tech) => {
      if (lowerText.includes(tech.toLowerCase())) {
        // Исключаем дубли Go/Golang
        if (tech.toLowerCase() === "golang" && result.has("Go")) return;
        if (tech.toLowerCase() === "go" && result.has("Golang")) return;

        result.add(tech);
      }
    });
  });

  return Array.from(result);
};
