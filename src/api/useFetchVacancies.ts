import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { VacancyFiltersModel, VacancyItemModel } from "@/types/VacancyModels";
import { BELARUS_AREA_CODE, it_codes } from "@/constants/vacancyConstants";
import { ITEMS_PER_PAGE } from "@/constants/PaginationTableConstants";

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
  const [filters, setFilters] = useState<VacancyFiltersModel>({
    salaryMin: undefined,
    technologies: [],
    experience: [],
    employment: [],
    orderBy: "publication_time",
    itemsPerPage: ITEMS_PER_PAGE,
  });
  /* ------------ */

  /* желательно придумать что то другое */
  const isFirstRender = useRef(true);
  /*  */

  /* debounce data */
  const debouncedFilters = useDebounce(filters, 700);
  /* ------------- */
  useEffect(() => {
    const handleFilterChange = async () => {
      try {
        setLoading(true);

        const professionalRoleParams = it_codes
          .map((role) => `professional_role=${role}`)
          .join("&");

        let query = `page=${currentPage - 1}&per_page=${
          filters.itemsPerPage
        }&order_by=${filters.orderBy}&area=${BELARUS_AREA_CODE}`;

        if (debouncedFilters.salaryMin) {
          query += `&salary=${debouncedFilters.salaryMin}&only_with_salary=true`;
        } else if (debouncedFilters.salaryMax) {
          query += `&only_with_salary=true`;
        }

        if (debouncedFilters.technologies.length > 0) {
          query += `&text=${debouncedFilters.technologies.join(" ")}`;
        }

        if (debouncedFilters.experience.length > 0) {
          query += `&experience=${debouncedFilters.experience.join(",")}`;
        }

        if (debouncedFilters.employment.length > 0) {
          query += `&employment=${debouncedFilters.employment.join(",")}`;
        }

        if (professionalRoleParams) {
          query += `&${professionalRoleParams}`;
        }

        const response = await axios.get(
          `https://api.hh.ru/vacancies?${query}`
        );

        // Обновление состояния с вакансиями
        setTotalPages(Math.ceil(response.data.found / filters.itemsPerPage));
        setVacancies(response.data.items);
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
     if (isFirstRender.current) {
       isFirstRender.current = false;
       return;
     }

     // Сбрасываем страницу на 1 при изменении фильтров
     setCurrentPage(1);
   }, [debouncedFilters]);

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
