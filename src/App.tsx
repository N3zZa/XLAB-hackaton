import { Header } from "@/components/Header/Header";
import routes from "@/pages/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { VacanciesContextProvider } from "./context/VacanciesContext";

function App() {
  return (
    <VacanciesContextProvider>
      <Router>
        <Header />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </VacanciesContextProvider>
  );
}

export default App;
