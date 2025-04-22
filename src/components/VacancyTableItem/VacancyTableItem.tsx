import { routesPaths } from "pages/routes";
import { useNavigate } from "react-router";
import { VacancyItemModel } from "types/VacancyItemModel";
import { convertVacancySalary } from "utils/convertVacancySalary";
import { formatDate } from "utils/formatDate";
import { getTechnologies } from "utils/getTechnologies";

type VacancyTableItemProps = {
  vacancy: VacancyItemModel;
};

const VacancyTableItem = ({vacancy}: VacancyTableItemProps) => {
  const navigate = useNavigate();
  const { name, snippet, employment, experience, published_at, description } = vacancy;

    const technologies = getTechnologies(
      name,
      snippet?.requirement,
      description
    );

  const handleNavigate = () => {
    navigate(`${routesPaths.vacancy}${vacancy.id}`, { state: { id: vacancy.id } })
  }

  return (
    <tr
      onClick={handleNavigate}
      className="border hover:bg-[#212f49] cursor-pointer"
    >
      <td className="p-2 border">{name}</td>
      <td className="p-2 border">{convertVacancySalary(vacancy)}</td>
      <td className="p-2 border">{`${
        technologies.length > 0 ? technologies.join(", ") : "Не указаны"
      }`}</td>
      <td className="p-2 border">
        {experience ? experience.name : "Не указан"}
      </td>
      <td className="p-2 border">{employment.name}</td>
      <td className="p-2 border">{formatDate(published_at)}</td>
    </tr>
  );
};

export default VacancyTableItem;
