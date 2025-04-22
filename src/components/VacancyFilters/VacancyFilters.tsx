import { employments, experiences } from "@/constants/vacancyConstants";
import { Dispatch, SetStateAction } from "react";
import { MultiSelector } from "../ui/multiselector";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { sortOptions } from "@/constants/sortOptions";
import SelectContainer from "../Select/SelectContainer";
import { VacancyFiltersModel } from "@/types/VacancyModels";
import { Button } from "../ui/button";


type VacancyFiltersProps = {
  filters: VacancyFiltersModel;
  setFilters: Dispatch<SetStateAction<VacancyFiltersModel>>;
};

const VacancyFilters = ({ filters, setFilters }: VacancyFiltersProps) => {


  const handleClearFilters = () => {
    setFilters({
      salaryMin: undefined,
      technologies: [],
      experience: [],
      employment: [],
      orderBy: "publication_time",
      itemsPerPage: 50,
    });
  }
  return (
    <div className="my-5 flex flex-col gap-3">
      {/* Фильтр по зарплате */}
      <div className="salary-filter">
        <input
          className="border border-border px-4 py-2 outline-none"
          type="number"
          value={filters.salaryMin ?? ""}
          placeholder="Минимальная зарплата"
          onChange={(e) => {
            const value = e.target.value;
            const numValue = value ? Math.max(0, Number(value)) : undefined;
            setFilters((prev) => ({
              ...prev,
              salaryMin: numValue,
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
      <Button className="w-fit" onClick={handleClearFilters}>Очистить фильтры</Button>
    </div>
  );
};

export default VacancyFilters;
