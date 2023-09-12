import { createBrowserRouter } from "react-router-dom";
import DashBoardPage from "./page/DashBoardPage";
import RegisterPage from "./page/RegisterPage";
import { AlarmPage } from "./page/AlarmPage";
import NewAlarm from "./page/NewAlarm";
import HistoryPage from "./page/HistoryPage";

const routers = createBrowserRouter([
  {
    path: "",
    element: <AlarmPage />,
  },
  {
    path: "alarm_setting",
    element: <NewAlarm />,
  },
  {
    path: "alarm_history",
    element: <HistoryPage />,
  },
  {
    path: "dashboard",
    element: <DashBoardPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

export default routers;
