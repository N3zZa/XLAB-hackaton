import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { ChartData } from "@/types/ChartModels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type PostingTrendsChartProps = {
  vacancies: {
    published_at: string;
  }[];
};

const PostingTrendsChart: React.FC<PostingTrendsChartProps> = ({
  vacancies,
}) => {
  const chartData: ChartData = useMemo(() => {
    const today = new Date();
    const dates = Array.from({ length: 7 }).map((_, i) =>
      subDays(today, 6 - i)
    );
    const counts = dates.map(
      (date) =>
        vacancies.filter((v) => isSameDay(parseISO(v.published_at), date))
          .length
    );

    return {
      labels: dates.map((d) => format(d, "dd.MM")),
      datasets: [
        {
          label: "Вакансии за день",
          data: counts,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderWidth: 2,
        },
      ],
    };
  }, [vacancies]);

  return (
    <div className="w-full p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-background">
        Динамика публикаций
      </h3>
      <Line data={chartData} />
    </div>
  );
};

export default PostingTrendsChart;
