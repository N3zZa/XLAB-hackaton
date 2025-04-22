import axios from "axios";
import { CircleLoader } from "components/CircleLoader/CircleLoader";
import VacancyFilters from "components/VacancyFilters/VacancyFilters";
import VacancyTableItem from "components/VacancyTableItem/VacancyTableItem";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { VacancyItemModel } from "types/VacancyItemModel";

const VacanciesTable = () => {
  const [vacancies, setVacancies] = useState<VacancyItemModel[]>([]);
  /*  */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  /*  */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  /*  */
  const [filters, setFilters] = useState<VacancyFilters>({
    salaryMin: undefined,
    salaryMax: undefined,
    technologies: [],
    experience: [],
    employment: [],
    orderBy: "publication_time", // допилить
    itemsPerPage: 20,
  });

  const debouncedFilters = useDebounce(filters, 600);

  useEffect(() => {
    const handleFilterChange = async () => {
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

      try {
        setLoading(true);
        console.log(`https://api.hh.ru/vacancies?${params}`);
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
  /*  */
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <h1>Error occuried!</h1>;
  }

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <div className="p-4 max-w-full">
      <h1 className="text-[32px] font-bold text-center mb-5">
        Нажмите на вакансию, чтобы узнать подробнее
      </h1>

      <VacancyFilters setFilters={setFilters} filters={filters} />
      {vacancies.length !== 0 ? (
        <>
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Salary</th>
                <th className="p-2 border">Technology</th>
                <th className="p-2 border">Experience</th>
                <th className="p-2 border">Employment</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy) => {
                return <VacancyTableItem key={vacancy.id} vacancy={vacancy} />;
              })}
            </tbody>
          </table>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h1 className="w-fit mx-auto text-2xl mt-10">Ничего не найдено!</h1>
      )}
    </div>
  );
};

export default VacanciesTable;
