import logo from "./logo.svg";
import "./App.css";
import DashBoardPage from "./page/DashBoardPage";
import { SendDataContextProvider } from "./context/sendDataContext";

function App() {
  return (
    <SendDataContextProvider>
      <DashBoardPage />
    </SendDataContextProvider>
  );
}

export default App;
