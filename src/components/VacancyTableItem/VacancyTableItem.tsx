import { VacancyItemModel } from "types/VacancyItemModel";
import { convertVacancySalary } from "utils/convertVacancySalary";
import { formatDate } from "utils/formatDate";
import { getTechnologies } from "utils/getTechnologies";

type VacancyTableItemProps = {
  vacancy: VacancyItemModel;
};

const VacancyTableItem = ({vacancy}: VacancyTableItemProps) => {
    const { name, snippet, employment, experience, published_at } = vacancy;

    const technologies = getTechnologies(name, snippet?.requirement);

  return (
    <tr>
      <td className="p-2 border">{name}</td>
      <td className="p-2 border">{convertVacancySalary(vacancy)}</td>
      <td className="p-2 border">{`${
        technologies.length > 0 ? technologies.join(", ") : "Не указаны"
      }`}</td>
      <td className="p-2 border">{experience ? experience.name : "Не указан"}</td>
      <td className="p-2 border">{employment.name}</td>
      <td className="p-2 border">{formatDate(published_at)}</td>
    </tr>
  );
};

export default VacancyTableItem;
