import { employments, experiences } from "@/constants/vacancyConstants";
import { Dispatch, SetStateAction } from "react";
import { MultiSelector } from "../ui/multiselector";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { sortOptions } from "@/constants/sortOptions";
import SelectContainer from "../Select/SelectContainer";

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

const VacancyFilters = ({ filters, setFilters }: VacancyFiltersProps) => {
  return (
    <div className="my-5 flex flex-col gap-3">
      {/* Фильтр по зарплате */}
      <div className="salary-filter">
        <input
          className="border border-border px-4 py-2"
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
      </div>
      <SelectContainer
        value={filters.orderBy}
        onChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            orderBy: value,
            page: 0,
          }))
        }
        items={sortOptions}
      />
      <MultiSelector
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
      <RadioGroup
        value={filters.experience[0] || ""}
        onValueChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            experience: [value],
            page: 0,
          }));
        }}
        className="flex flex gap-2 flex-wrap border border-border p-3 w-fit"
      >
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-center space-x-2">
            <RadioGroupItem value={exp.id} id={exp.id} />
            <Label htmlFor={exp.id}>{exp.name}</Label>
          </div>
        ))}
      </RadioGroup>
      {/*  */}

      {/* фильтр по занятости */}
      <RadioGroup
        value={filters.employment[0] || ""}
        onValueChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            employment: [value],
            page: 0,
          }));
        }}
        className="flex flex gap-2 flex-wrap border border-border p-3 w-fit"
      >
        {employments.map((emp) => (
          <div key={emp.id} className="flex items-center space-x-2">
            <RadioGroupItem value={emp.id} id={emp.id} />
            <Label htmlFor={emp.id}>{emp.name}</Label>
          </div>
        ))}
      </RadioGroup>
      {/*  */}
    </div>
  );
};

export default VacancyFilters;
