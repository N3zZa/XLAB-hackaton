export type VacancyModel = {
  id: string;
  name: string;
  employer: string;
  salary: string;
  snippet: { requirement: string; responsibility: string };
  experience: string;
  employment: string;
  published_at: string;
};

export type VacancyItemModel = {
  id: string;
  title: string;
  employer: { id: string; name: string };
  salary: { from: number; to: number; currency: string; gross: boolean };
  technology: { requirement: string; responsibility: string };
  experience: "Junior" | "Middle" | "Senior" | undefined;
  employment: { id: string; name: string };
  date: string;
};

