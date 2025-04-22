import axios from "axios";
import { CircleLoader } from "@/components/CircleLoader/CircleLoader";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"
import { VacancyItemModel } from "@/types/VacancyItemModel";
import { convertVacancySalary } from "@/utils/convertVacancySalary";
import { Button } from "@/components/ui/button";


const VacancyDetails: FC = () => {
  const [vacancyData, setVacancyData] = useState<VacancyItemModel|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);
  const {state} = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchVacancyData = async () => {
      try {
        const response = await axios.get(
          `https://api.hh.ru/vacancies/${state.id}`
        );
        // Обновление состояния с вакансиями
        setVacancyData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching vacancies");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancyData();
  }, [state.id]);

  if (loading) {
    return <CircleLoader />
  }

  if (error) {
    return (
      <div>
        <h1 className="text-center">Error!</h1>
      </div>
    )
  }

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-96 p-0 md:p-4">
      <div className="mb-5">
        {vacancyData === undefined && <h1>Нет данных</h1>}
        <Button variant={"secondary"} onClick={navigateBack} className="mb-6">
          &lt;-
        </Button>
        <div className="flex items-center gap-2 m-auto">
          <h1 className="text-2xl font-bold">
            {vacancyData?.name}{" "}
          </h1>
        </div>
        <ul className="flex flex-col gap-2 mt-2">
          <li>Уровень дохода: {convertVacancySalary(vacancyData)}</li>
        </ul>
      </div>
      {/*    <div className="flex gap-4 mb-4">
        {["d1", "h12", "h1"].map((int) => (
          <Button
            key={int}
            variant={interval === int ? "blue" : "gray"}
            onClick={() => handleInterval(int)}
          >
            {int}
          </Button>
        ))}
      </div> */}
      {/* <h1 className="text-xl font-bold">Price Chart ({interval})</h1>
      {coinHistory.loading ? (
        <CircleLoader />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={coinHistory.history}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="priceUsd"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )} */}
    </div>
  );
}

export default VacancyDetails