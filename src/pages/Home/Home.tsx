import VacanciesTable from "@/components/VacanciesTable/VacanciesTable";
import VacancyCharts from "@/components/VacancyCharts/VacancyCharts";
import { useState } from "react";

const Home = () => {
  const [isOpenCharts, setIsOpenCharts] = useState(false);
  
    const toggleCharts = () => setIsOpenCharts((prev) => !prev);

  return (
    <main className="px-4">
      <h2 onClick={toggleCharts} className="cursor-pointer underline">
        Открыть графики
      </h2>
      {isOpenCharts && <VacancyCharts />}
      <VacanciesTable />
    </main>
  );
};

export default Home;
