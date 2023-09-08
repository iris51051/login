import logo from "./logo.svg";
import "./App.css";
import DashBoardPage from "./page/DashBoardPage";
import { SendDataContextProvider } from "./context/sendDataContext";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import Practice from "./layout/Practice";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
