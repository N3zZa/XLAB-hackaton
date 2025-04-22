import { createContext, useContext, useState, ReactNode } from "react";

interface VacanciesContextContextType {
  isOpenCharts: boolean;
  toggleCharts: () => void;
  openCharts: () => void;
  closeCharts: () => void;
}

const MenuContext = createContext<VacanciesContextContextType | undefined>(
  undefined
);

export const useVacancies = (): VacanciesContextContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const VacanciesContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenCharts, setIsOpenCharts] = useState(false);

  const toggleCharts = () => setIsOpenCharts((prev) => !prev);
  const openCharts = () => setIsOpenCharts(true);
  const closeCharts = () => setIsOpenCharts(false);

  return (
    <MenuContext.Provider
      value={{ isOpenCharts, toggleCharts, openCharts, closeCharts }}
    >
      {children}
    </MenuContext.Provider>
  );
};
