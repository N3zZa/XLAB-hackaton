import axios from "axios";
import VacancyFilters from "@/components/VacancyFilters/VacancyFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { VacancyItemModel } from "@/types/VacancyItemModel";

export const useFetchVacancies = () => {
  /* vacancies api data states */
  const [vacancies, setVacancies] = useState<VacancyItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  /* -------------------------*/
  /* pagination state */
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  /* ---------------- */

  /* data filters */
  const [filters, setFilters] = useState<VacancyFilters>({
    salaryMin: undefined,
    salaryMax: undefined,
    technologies: [],
    experience: [],
    employment: [],
    orderBy: "relevance",
    itemsPerPage: 20,
  });
  /* ------------ */

  /* debounce data */
  const debouncedFilters = useDebounce(filters, 700);
  /* ------------- */
  useEffect(() => {
    const handleFilterChange = async () => {
      try {
        setLoading(true);
        // API запрос с актуальными фильтрами
        const params = new URLSearchParams({
          page: (currentPage - 1).toString(),
          per_page: filters.itemsPerPage.toString(),
          order_by: filters.orderBy,
          professional_role: "96",
        });

        // Опциональные параметры с проверкой
        if (debouncedFilters.salaryMin) {
          params.append("salary", debouncedFilters.salaryMin.toString());
          params.append("only_with_salary", "true");
        } else if (debouncedFilters.salaryMax) {
          params.append("only_with_salary", "true");
        }

        if (debouncedFilters.technologies.length > 0) {
          params.append("text", debouncedFilters.technologies.join(" "));
        }
        if (debouncedFilters.experience.length > 0) {
          params.append("experience", debouncedFilters.experience.join(","));
        }
        if (debouncedFilters.employment.length > 0) {
          params.append("employment", debouncedFilters.employment.join(","));
        }
        
        const response = await axios.get(
          `https://api.hh.ru/vacancies?${params}`
        );
        // Обновление состояния с вакансиями
        setTotalPages(Math.ceil(response.data.found / filters.itemsPerPage));
        if (debouncedFilters.salaryMax) {
          const filtered = response.data.items.filter(
            (vacancy: VacancyItemModel) => {
              if (!vacancy.salary) return false;
              return vacancy.salary.to <= debouncedFilters.salaryMax!;
            }
          );
          setVacancies(filtered);
        } else {
          setVacancies(response.data.items);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching vacancies");
      } finally {
        setLoading(false);
      }
    };

    handleFilterChange();
  }, [
    debouncedFilters.employment,
    debouncedFilters.experience,
    filters.itemsPerPage,
    filters.orderBy,
    debouncedFilters.technologies,
    currentPage,
    debouncedFilters.salaryMax,
    debouncedFilters.salaryMin,
  ]);

  useEffect(() => {
    if (error) {
      console.log(error);
      console.error(`Error fetching coin data`, error);
    }
  }, [error]);

  return {
    vacancies,
    loading,
    error,
    totalPages,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
  };
};
