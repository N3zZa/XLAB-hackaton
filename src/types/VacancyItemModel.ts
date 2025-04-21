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
  name: string;
  employer: { id: string; name: string };
  salary: { from: number; to: number; currency: string; gross: boolean };
  snippet: { requirement: string; responsibility: string };
  experience: {id: string, name: string};
  employment: { id: string; name: string };
  published_at: string;
};
