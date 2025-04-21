import axios from "axios";
import { CircleLoader } from "components/CircleLoader/CircleLoader";
import VacancyFilters from "components/VacancyFilters/VacancyFilters";
import VacancyTableItem from "components/VacancyTableItem/VacancyTableItem";
import { currencies } from "constants/vacancyConstants";
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
   currency: currencies.find((c) => c.default)?.code || "RUR",
   technologies: [],
   experience: [],
   employment: [],
   orderBy: "publication_time", // допилить
   itemsPerPage: 20,
 });


  useEffect(() => {
    const handleFilterChange = async () => {
      // API запрос с актуальными фильтрами
      const params = new URLSearchParams();
      // Обязательные параметры
      params.append("page", currentPage.toString());
      params.append("per_page", filters.itemsPerPage.toString());
      params.append("order_by", filters.orderBy);
      params.append("professional_role", "96"); // выдает только вакансии Программист, разработчик

      // Опциональные параметры с проверкой
      if (filters.salaryMin) {
        params.append("salaryMin", filters.salaryMin.toString());
      }
      if (filters.salaryMax) {
        params.append("salaryMax", filters.salaryMax.toString());
      }
      if (filters.currency) {
        params.append("currency", filters.currency);
      }
      if (filters.technologies.length > 0) {
        params.append("technologies", filters.technologies.join(","));
      }
      if (filters.experience.length > 0) {
        params.append("experience", filters.experience.join(","));
      }
      if (filters.employment.length > 0) {
        params.append("employment", filters.employment.join(","));
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.hh.ru/vacancies?${params}`
        );
        // Обновление состояния с вакансиями
        setVacancies(response.data.items);
        setTotalPages(Math.ceil(response.data.found / filters.itemsPerPage));
      } catch (error) {
        console.error(error);
        setError("Error fetching vacancies");
      } finally {
        setLoading(false);
      }
    };

    handleFilterChange();
  }, [
   filters,currentPage
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

      <VacancyFilters
        setFilters={setFilters}
        filters={filters}
      />
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
