import { VacancyChartsModel } from "@/types/VacancyModels";

export const vacanciesByDate = (data: VacancyChartsModel[]) => {
  const grouped: Record<string, number> = {};

  data.forEach((v) => {
    const date = new Date(v.published_at).toLocaleDateString("ru-RU");
    grouped[date] = (grouped[date] || 0) + 1;
  });

  return Object.entries(grouped).map(([date, count]) => ({
    x: date,
    y: count,
  }));
};
