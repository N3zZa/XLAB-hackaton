export type VacancyItemModel = {
  id: string;
  name: string;
  employer: { id: string; name: string };
  salary: { from: number; to: number; currency: string; gross: boolean };
  snippet: { requirement: string; responsibility: string };
  experience: { id: string; name: string };
  description: string;
  employment: { id: string; name: string };
  published_at: string;
};

export type VacancyDetailsModal = {
  id: string;
  name: string;
  employer: { id: string; name: string };
  salary: { from: number; to: number; currency: string; gross: boolean };
  snippet: { requirement: string; responsibility: string };
  experience: {id: string, name: string};
  employment: { id: string; name: string };
  published_at: string;
};
