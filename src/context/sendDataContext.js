import { createContext, useMemo, useState } from "react";

export const SendDataContext = createContext();

export function SendDataContextProvider(props) {
  const [isChecked, setIsChecked] = useState(true);
  const [psDate, setPsDate] = useState("");
  const [peDate, setPeDate] = useState("");

  const toggleChecked = () => {
    setIsChecked((prevValue) => !prevValue);
  };

  const updateDateRange = (startDate, endDate) => {
    setPsDate(startDate.format("YYYY-MM-DD"));
    setPeDate(endDate.format("YYYY-MM-DD"));
  };

  const contextValue = useMemo(
    () => ({
      isChecked,
      setIsChecked,
      toggleChecked,
      psDate,
      peDate,
      updateDateRange,
    }),
    [isChecked, setIsChecked, toggleChecked, psDate, peDate, updateDateRange]
  );

  return (
    <SendDataContext.Provider
      //   value={{
      //     isChecked,
      //     setIsChecked,
      //     toggleChecked,
      //     psDate,
      //     peDate,
      //     updateDateRange,
      //   }}
      value={contextValue}
      {...props}
    />
  );
}
