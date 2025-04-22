export interface ChartData {
  labels: string[]; // Массив меток на оси X
  datasets: Dataset[]; // Массив наборов данных
}

export interface Dataset {
  label: string; // Лейбл для набора данных
  data: number[]; // Данные, отображаемые на графике
  backgroundColor: string | string[]; // Цвет фона
  borderColor: string | string[]; // Цвет границы
  borderWidth: number; // Ширина границы
}
