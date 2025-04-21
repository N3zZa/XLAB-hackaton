export const getExperienceLevels = (
  str: string
) => {
  const lowStr = str.toLowerCase();
  const levels: ("Junior" | "Middle" | "Senior")[] = [
    "Junior",
    "Middle",
    "Senior",
  ];

  return levels.filter((level) => lowStr.includes(level.toLowerCase())).join("/");
};
