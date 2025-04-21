import { FC } from "react";
import { useLocation } from "react-router"


const VacancyDetails: FC = () => {
  const location = useLocation();
  
  console.log(location.state)
  return (
    <div>VacancyDetails</div>
  )
}

export default VacancyDetails