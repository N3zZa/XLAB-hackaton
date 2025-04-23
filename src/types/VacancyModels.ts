// Модель краткой информации о вакансии
export type VacancyItemModel = {
  id: string;
  name: string;
  employer: {
    id: string;
    name: string;
  };
  salary: {
    from: number;
    to: number;
    currency: string;
    gross: boolean;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
  experience: {
    id: string;
    name: string;
  };
  description: string;
  employment: {
    id: string;
    name: string;
  };
  published_at: string;
};

// Модель детальной информации о вакансии
export type VacancyDetailsModel = {
  id: string;
  name: string;
  employer: {
    id: string;
    name: string;
    logo_urls: {
      original: string;
    };
  };
  salary: {
    from: number;
    to: number;
    currency: string;
    gross: boolean;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
  schedule: {
    id: string;
    name: string;
  };
  experience: {
    id: string;
    name: string;
  };
  description: string;
  employment: {
    id: string;
    name: string;
  };
  published_at: string;
  working_hours: {
    id: string;
    name: string;
  }[];
  alternate_url: string;
  key_skills: {
    name: string;
  }[];
  area: {
    id: string;
    name: string;
  };
};

// Модель данных для графиков по вакансиям
export type VacancyChartsModel = {
  id: string;
  name: string;
  published_at: string;
  employer: {
    name: string;
  };
  work_format: {
    name: string;
  }[];
  experience: {
    name: string;
  };
  snippet: {
    requirement: string;
    responsibility: string;
  };
};

// Модель фильтров для поиска вакансий
export interface VacancyFiltersModel {
  salaryMin?: number;
  salaryMax?: number;
  technologies: string[];
  experience: string[];
  employment: string[];
  orderBy: string;
  itemsPerPage: number;
}
