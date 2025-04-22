import MultiSelect from "components/MultiSelect/MultiSelect";
import { knownTechnologies } from "constants/technologies";
import {
  employments,
  experiences,
} from "constants/vacancyConstants";
import { Dispatch, SetStateAction } from "react";



interface VacancyFilters {
  salaryMin?: number;
  salaryMax?: number;
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
          value={filters.salaryMin ?? ""}
          placeholder="Минимальная зарплата"
          onChange={(e) => {
            const value = e.target.value;
            const numValue = value ? Math.max(0, Number(value)) : undefined;
            setFilters((prev) => ({
              ...prev,
              salaryMin: numValue,
              page: 0,
            }));
          }}
        />
        <select
          value={filters.orderBy}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              orderBy: e.target.value,
              page: 0,
            }))
          }
        >
          <option value="salary_desc">По убыванию дохода</option>
          <option value="salary_asc">По возрастанию дохода</option>
          <option value="publication_time">Свежие вакансии</option>
          <option value="relevance">По соответствию</option>
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
            page: 0,
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
                  page: 0,
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
                  page: 0,
                }));
              }}
            />
            {emp.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default VacancyFilters;
