import axios from "axios";
import { CircleLoader } from "@/components/CircleLoader/CircleLoader";
import { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { VacancyDetailsModel } from "@/types/VacancyModels";
import { convertVacancySalary } from "@/utils/convertVacancySalary";
import { Button } from "@/components/ui/button";
import noImage from "@/assets/noImage.svg"
import { formatDate } from "@/utils/formatDate";

const VacancyDetails: FC = () => {
  const [vacancyData, setVacancyData] = useState<VacancyDetailsModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacancyData = async () => {
      try {
        const response = await axios.get(
          `https://api.hh.ru/vacancies/${state.id}`
        );
        // Обновление состояния с вакансиями
        setVacancyData(response.data);
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
    return <CircleLoader />;
  }

  if (error) {
    return (
      <div>
        <h1 className="text-center">Error!</h1>
      </div>
    );
  }

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-96 p-3 md:p-4">
      {vacancyData === null ? (
        <h1>Нет данных</h1>
      ) : (
        <div className="mb-5">
          <Button variant={"secondary"} onClick={navigateBack} className="mb-6">
            &lt;-
          </Button>
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col justify-between gap-2 sm:flex-row  sm:items-center sm:gap-0">
              {" "}
              <h1 className="text-2xl font-bold">{vacancyData.name}</h1>
              <div className="flex items-center gap-3 bg-white text-secondary w-fit px-3 py-1 rounded-lg">
                <h2 className="text-lg font-medium">
                  {vacancyData.employer.name}{" "}
                </h2>
                <img
                  className="w-[35px] md:w-[50px]"
                  src={
                    vacancyData.employer.logo_urls !== null
                      ? vacancyData.employer.logo_urls.original
                      : noImage
                  }
                  alt="companylogo"
                />
              </div>
            </div>
            <span className="text-gray-500">
              Дата и время публикации: {formatDate(vacancyData.published_at)}
            </span>
            <h3>Местоположение: {vacancyData.area.name}</h3>
          </div>
          <ul className="flex flex-col gap-2 my-2">
            <li>Уровень дохода: {convertVacancySalary(vacancyData)}</li>
            <li>Занятость: {vacancyData.employment.name}</li>
            <li>Опыт: {vacancyData.experience.name}</li>
            <li>Рабочие часы: {vacancyData.working_hours[0].name}</li>
            <li>
              Ссылка на вакансию:{" "}
              <Link className="underline" to={vacancyData.alternate_url}>
                {vacancyData.alternate_url}
              </Link>
            </li>
          </ul>
          {vacancyData.key_skills.length !== 0 && (
            <ul className="flex items-center flex-wrap gap-1">
              {vacancyData.key_skills.map((skill, i) => (
                <li
                  className="py-1 px-2 bg-white text-secondary font-medium rounded-lg"
                  key={skill.name + i}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}

          <p
            className="bg-secondary p-4 rounded-xl my-2 leading-8"
            dangerouslySetInnerHTML={{ __html: vacancyData.description }}
          ></p>
        </div>
      )}
    </div>
  );
};

export default VacancyDetails;
