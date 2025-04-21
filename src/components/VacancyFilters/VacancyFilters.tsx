import MultiSelect from "components/MultiSelect/MultiSelect";
import { knownTechnologies } from "constants/technologies";
import {
  currencies,
  employments,
  experiences,
} from "constants/vacancyConstants";
import { Dispatch, SetStateAction } from "react";

interface VacancyFilters {
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  technologies: string[];
  experience: string[];
  employment: string[];
  orderBy: string;
  itemsPerPage: number;
}

interface VacancyFilters {
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  technologies: string[];
  experience: string[];
  employment: string[];
  orderBy: string;
  itemsPerPage: number;
}

type VacancyFiltersProps = {
  filters: VacancyFilters;
  setFilters: Dispatch<SetStateAction<VacancyFilters>>;
};

const VacancyFilters = ({
  filters,
  setFilters,
}: VacancyFiltersProps) => {
 
 

  return (
    <div className="filters-container">
      {/* Фильтр по зарплате */}
      <div className="salary-filter">
        <input
          type="number"
          placeholder="Минимальная зарплата"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              salaryMin: Number(e.target.value),
              page: 1,
            }))
          }
        />
        <input
          type="number"
          placeholder="Максимальная зарплата"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              salaryMax: Number(e.target.value),
              page: 1,
            }))
          }
        />
        <select
          value={filters.currency}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              currency: e.target.value,
              page: 1,
            }))
          }
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* Фильтр по технологиям */}
      <MultiSelect
        options={knownTechnologies}
        selected={filters.technologies}
        onChange={(selected) =>
          setFilters((prev) => ({
            ...prev,
            technologies: selected,
            page: 1,
          }))
        }
      />

      {/* Фильтр по опыту */}
      <div className="experience-filter">
        {experiences.map((exp) => (
          <label key={exp.id}>
            <input
              name="experience"
              type="radio"
              value={exp.id}
              checked={filters.experience.includes(exp.id)}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  experience: [e.target.value],
                  page: 1,
                }));
              }}
            />
            {exp.name}
          </label>
        ))}
      </div>

      {/* Фильтр по типу занятости */}
      <div className="employment-filter">
        {employments.map((emp) => (
          <label key={emp.id}>
            <input
              type="radio"
              name="employment"
              value={emp.id}
              checked={filters.employment.includes(emp.id)}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  employment: [e.target.value],
                  page: 1,
                }));
              }}
            />
            {emp.name}
          </label>
        ))}
      </div>

      {/* Сортировка по дате */}
      <select
        value={filters.orderBy}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            orderBy: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="creation_time_desc">Свежие вакансии</option>
        <option value="creation_time_asc">Старые вакансии</option>
      </select>
    </div>
  );
};

export default VacancyFilters;
