import { useFetchVacancies } from "@/api/useFetchVacancies";
import { CircleLoader } from "@/components/CircleLoader/CircleLoader";
import VacancyFilters from "@/components/VacancyFilters/VacancyFilters";
import VacancyTableItem from "@/components/VacancyTableItem/VacancyTableItem";
import { Button } from "../ui/button";

const VacanciesTable = () => {
  const {
    vacancies,
    loading,
    error,
    totalPages,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
  } = useFetchVacancies();

  const handlePageChange = (distance: number) => {
    if (currentPage >= 1 && currentPage <= totalPages) {
      setCurrentPage(currentPage + distance);
    }
  };

  if (error) {
    return <h1>Error occuried!</h1>;
  }

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <div className="max-w-full">
      <h1 className="text-[32px] font-bold text-center mb-5">
        Нажмите на вакансию, чтобы узнать подробнее
      </h1>

      {/* filters */}
      <VacancyFilters setFilters={setFilters} filters={filters} />
      {/* ------- */}

      
      {vacancies.length !== 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border">
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
                  return (
                    <VacancyTableItem key={vacancy.id} vacancy={vacancy} />
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* pagintaion buttons */}
          <div className="flex gap-3 items-center w-fit mx-auto mt-3">
            <Button
              variant={"secondary"}
              onClick={() => handlePageChange(-1)}
              disabled={currentPage <= 1}
            >
              &lt;-
            </Button>
            <span>
              Страница {currentPage} из {totalPages}
            </span>
            <Button
              variant={"secondary"}
              onClick={() => handlePageChange(1)}
              disabled={currentPage >= totalPages}
            >
              -&gt;
            </Button>
          </div>
        </>
      ) : (
        <h1 className="w-fit mx-auto text-2xl mt-10">Ничего не найдено!</h1>
      )}
    </div>
  );
};

export default VacanciesTable;
