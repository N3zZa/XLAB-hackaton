import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartData } from "@/types/ChartModels";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  vacancies: {
    work_format?: { name: string }[];
  }[];
};

const RemoteVsOfficeChart: React.FC<Props> = ({ vacancies }) => {
  const formatCounts: Record<string, number> = {
    Удалённо: 0,
    Гибрид: 0,
    Офис: 0,
  };

  vacancies.forEach((vac) => {
    if (!vac.work_format || vac.work_format.length === 0) {
      formatCounts["Офис"] += 1; // Если нет work_format — считаем офисной
      return;
    }

    vac.work_format.forEach((format) => {
      if (format.name.includes("Удалённо")) formatCounts["Удалённо"] += 1;
      else if (format.name.includes("Гибрид")) formatCounts["Гибрид"] += 1;
      else formatCounts["Офис"] += 1;
    });
  });

  const chartData: ChartData = {
    labels: Object.keys(formatCounts),
    datasets: [
      {
        label: "Формат работы",
        data: Object.values(formatCounts),
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-background">
        Формат работы
      </h3>
      <Pie data={chartData} />
    </div>
  );
};

export default RemoteVsOfficeChart;
