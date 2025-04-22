import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { CircleLoader } from '../CircleLoader/CircleLoader';
import { VacancyChartsModel } from '@/types/VacancyModels';
import { ChartData } from '@/types/ChartModels';
import RemoteVsOfficeChart from './RemoteVsOfficeChart';
import PostingTrendsChart from './PostingTrendsChart';
import { BELARUS_AREA_CODE } from '@/constants/vacancyConstants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  TimeScale
);

export default function VacancyCharts() {
 const [chartData, setChartData] = useState<ChartData|null>(null);
  const [vacancies, setVacancies] = useState<VacancyChartsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchDataForCharts = async () => {
      try {
        setLoading(true);
        // API запрос с актуальными фильтрами
        const perPage = 100;
        const pagesToFetch = 10;
        const query = "96"; // программирование

        const promises = Array.from({ length: pagesToFetch }).map((_, i) =>
          fetch(
            `https://api.hh.ru/vacancies?professional_role=${query}&area=${BELARUS_AREA_CODE}&per_page=${perPage}&page=${i}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(promises);
        const allVacancies = results.flatMap((res) => res.items);

        setVacancies(allVacancies);
      } catch (error) {
        console.error(error);
        setError("Error fetching vacancies");
      } finally {
        setLoading(false);
      }
  }
  fetchDataForCharts()
}, [])
  

 useEffect(() => {
   const getData = () => {
     // Группируем вакансии по опыту
     const experienceMap: Record<string, number> = {
       "От 1 года до 3 лет": 0,
       "От 3 до 6 лет": 0,
       "Более 6 лет": 0,
     };

     vacancies.forEach((vacancy) => {
       if (vacancy.experience && experienceMap[vacancy.experience.name] >= 0) {
         console.log(vacancy.experience.name);
         experienceMap[vacancy.experience.name] += 1;
       }
     });

     // Строим данные для графика
     const labels = Object.keys(experienceMap);
     const data = Object.values(experienceMap);
     console.log(data);
     return {
       labels,
       datasets: [
         {
           label: "Количество вакансий по опыту",
           data,
           backgroundColor: "rgba(75, 192, 192, 0.5)",
           borderColor: "rgba(75, 192, 192, 1)",
           borderWidth: 1,
         },
       ],
     };
   };

   setChartData(getData());
 }, [vacancies]);

 if (error) return <h1>{error}</h1>

  if (loading){
    return <CircleLoader />
  }
    return (
      <div className="w-full p-4 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Графики на 1000 вакансий
        </h3>
        {chartData ? (
          <div className="p-0 max-w-[100%] lg:px-4 lg:max-w-[80%] mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RemoteVsOfficeChart vacancies={vacancies} />
              <PostingTrendsChart vacancies={vacancies} />
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-background">
                Опыт работы
              </h3>
              <Bar data={chartData} options={{ responsive: true }} />
            </div>
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    );
}
