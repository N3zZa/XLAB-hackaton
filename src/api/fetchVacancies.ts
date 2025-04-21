import axios from "axios";
import { VacancyItemModel, VacancyModel } from "types/VacancyItemModel";
import { getExperienceLevels } from "utils/getExperienceLevels";


// function that needs to get coins from api
export const fetchVacancies = async (
  currentPage: number,
  itemsPerPage: number
): Promise<{ vacancies: VacancyItemModel[]; totalPages: number }> => {
  try {
    const params = {
      text: `программист junior middle senior`,
      specialization: 1,
      page: currentPage,
      per_page: itemsPerPage,
    };
    const response = await axios.get("https://api.hh.ru/vacancies", {
      params: params,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const vacancyItems = response.data.items.map((vacancy: VacancyModel) => {
      return {
        id: vacancy.id,
        title: vacancy.name,
        employer: vacancy.employer,
        salary: vacancy.salary,
        technology: vacancy.snippet,
        experience: getExperienceLevels(
          vacancy.name +
            vacancy.snippet.requirement +
            vacancy.snippet.responsibility
        ),
        employment: vacancy.employment,
        date: vacancy.published_at,
      };
    });
    console.log(response.data);

    return {
      vacancies: vacancyItems, // Список вакансий
      totalPages: response.data.pages,
    };
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return { vacancies: [], totalPages: 0 };
  }
};
