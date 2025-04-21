import { fetchVacancies } from "api/fetchVacancies";
import { CircleLoader } from "components/CircleLoader/CircleLoader";
import VacancyTableItem from "components/VacancyTableItem/VacancyTableItem";
import { ITEMS_PER_PAGE } from "constants/PaginationTableConstants";
import { useState, useEffect } from "react";
import { FilterModal } from "types/FilterModal";
import { VacancyItemModel } from "types/VacancyItemModel";
import { filterVacancies } from "utils/filterVacancies";


const VacanciesTable = () => {
  const [vacancies, setVacancies] = useState<VacancyItemModel[]>([]);
  /*  */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  /*  */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] =
    useState <
    FilterModal>({
      tech: "",
      minSalary: "",
      maxSalary: "",
      experience: "",
      employment: "",
      sortByDate: "desc",
    });

  

  useEffect(() => {
    const loadVacancies = async () => {
      setLoading(true);
      const data = await fetchVacancies(currentPage, ITEMS_PER_PAGE);
      if (data.vacancies.length === 0 && data.totalPages === 0) {
        setError("Error getting vacancies");
      }
      setVacancies(data.vacancies);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    loadVacancies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const handleInputFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSalaryFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "minSalary" | "maxSalary"
  ) => {
    const value = Number(e.target.value);

    if (value < 0 || isNaN(value)) {
      // Если значение некорректное, сбрасываем в дефолтное
      e.target.value = key === "minSalary" ? "0" : "";
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const filteredVacancies = filterVacancies({vacancies,filters});

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

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Technology"
          className="border p-2 rounded"
          onChange={(e) => handleInputFilter(e, "tech")}
        />
        <input
          placeholder="Min Salary(₽)"
          type="number"
          className="border p-2 rounded"
          onChange={(e) => handleSalaryFilterChange(e, "minSalary")}
        />
        <input
          placeholder="Max Salary(₽)"
          type="number"
          className="border p-2 rounded"
          onChange={(e) => handleSalaryFilterChange(e, "maxSalary")}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => handleInputFilter(e, "experience")}
        >
          <option value="">Experience</option>
          <option>Junior</option>
          <option>Middle</option>
          <option>Senior</option>
        </select>
        <select
          className="border p-2 rounded"
          onChange={(e) => handleInputFilter(e, "employment")}
        >
          <option value="">Employment</option>
          <option>Full</option>
          <option>Part</option>
          <option>Project</option>
          <option>Volunteer</option>
          <option>Probation</option>
        </select>
        <select
          className="border p-2 rounded"
          onChange={(e) => handleInputFilter(e, "sortByDate")}
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
      {filteredVacancies.length !== 0 ? (
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
              {filteredVacancies.map((vacancy) => {
                return (
                  <VacancyTableItem
                    key={
                      vacancy.id.toString() +
                      vacancy.date.toString() +
                      vacancy.title.toString()
                    }
                    vacancy={vacancy}
                  />
                );
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
