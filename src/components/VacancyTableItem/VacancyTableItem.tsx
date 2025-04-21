import { VacancyItemModel } from "types/VacancyItemModel";
import { convertVacancySalary } from "utils/convertVacancySalary";
import { formatDate } from "utils/formatDate";
import { getTechnologies } from "utils/getTechnologies";

type VacancyTableItemProps = {
  vacancy: VacancyItemModel;
};

const VacancyTableItem = ({vacancy}: VacancyTableItemProps) => {
    const { title, technology, employment, experience, date } = vacancy;

    const technologies = getTechnologies(
      title,
      technology?.requirement
    );
    

  return (
    <tr>
      <td className="p-2 border">{title}</td>
      <td className="p-2 border">{convertVacancySalary(vacancy)}</td>
      <td className="p-2 border">{`${
        technologies.length > 0 ? technologies.join(", ") : "Не указаны"
      }`}</td>
      <td className="p-2 border">{experience ? experience : "Не указан"}</td>
      <td className="p-2 border">{employment.name}</td>
      <td className="p-2 border">{formatDate(date)}</td>
    </tr>
  );
};

export default VacancyTableItem;
