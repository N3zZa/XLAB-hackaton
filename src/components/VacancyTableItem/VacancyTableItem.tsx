import { routesPaths } from "@/pages/routes";
import { useNavigate } from "react-router";
import { VacancyItemModel } from "@/types/VacancyModels";
import { convertVacancySalary } from "@/utils/convertVacancySalary";
import { formatDate } from "@/utils/formatDate";
import { getTechnologies } from "@/utils/getTechnologies";
import { getExperienceLevels } from "@/utils/getExperienceLevels";

type VacancyTableItemProps = {
  vacancy: VacancyItemModel;
};

const VacancyTableItem = ({ vacancy }: VacancyTableItemProps) => {
  const navigate = useNavigate();
  const { name, snippet, employment, experience, published_at, description } =
    vacancy;

  const technologies = getTechnologies(name, snippet?.requirement, description);


  /* navigate to vacancy details */
  const handleNavigate = () => {
    navigate(`${routesPaths.vacancy}${vacancy.id}`, {
      state: { id: vacancy.id },
    });
  };

  /* getting experience level of format: Junior, Middle, Senior,  */
  const experienceLevel = getExperienceLevels(
    name + snippet.requirement + description
  );

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
        {experienceLevel !== "" && <span>({experienceLevel})</span>}
      </td>
      <td className="p-2 border">{employment.name}</td>
      <td className="p-2 border">{formatDate(published_at)}</td>
    </tr>
  );
};

export default VacancyTableItem;
