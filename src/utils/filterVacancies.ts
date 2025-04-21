import { Currency } from "types/Currency";
import { convertToRUB } from "./convertCurrency";
import { VacancyItemModel } from "types/VacancyItemModel";
import { FilterModal } from "types/FilterModal";


type FilterVacanciesParams = {
  vacancies: VacancyItemModel[];
  filters: FilterModal;
};

export const filterVacancies = ({ vacancies, filters }: FilterVacanciesParams) => {
  return vacancies
    .filter((v) => {
      const currency = v.salary?.currency as Currency;

      const convertedFrom = convertToRUB(v.salary?.from, currency);
      const convertedTo = convertToRUB(v.salary?.to, currency);

      const salaryAvailable = convertedFrom != null || convertedTo != null;

      const matchesSalaryMin = (value: number | null, filterValue: string) =>
        value !== null && value >= +filterValue;
      const matchesSalaryMax = (value: number | null, filterValue: string) =>
        value !== null && value <= +filterValue;

      // Фильтрация по минимальной зарплате
      const matchesMinSalary =
        !filters.minSalary ||
        (!salaryAvailable
          ? false
          : matchesSalaryMin(convertedFrom, filters.minSalary) ||
            matchesSalaryMin(convertedTo, filters.minSalary));

      // Фильтрация по максимальной зарплате
      const matchesMaxSalary =
        !filters.maxSalary ||
        (!salaryAvailable
          ? false
          : matchesSalaryMax(convertedFrom, filters.maxSalary) ||
            matchesSalaryMax(convertedTo, filters.maxSalary));

      return (
        (!filters.tech ||
          `${v.title} ${v.technology?.requirement ?? ""}`
            .toLowerCase()
            .includes(filters.tech.toLowerCase())) &&
        matchesMinSalary &&
        matchesMaxSalary &&
        (!filters.experience || v.experience?.includes(filters.experience)) &&
        (!filters.employment ||
          v.employment?.id === filters.employment.toLowerCase())
      );
    })
    .sort((a, b) =>
      filters.sortByDate === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
};