import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../layout/PageLayout";
import "./../css/dashBoard.css";
import {
  FilterOption,
  PerformanceIndicator,
  DashboardScorecardApi,
  TabContent,
} from "../components/dashboard/DashBoardComponent";
import { FaChevronCircleRight, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { SparkLine } from "./../components/Chart";
import { addDaysToDate, betweenDay } from "../components/Common";
import fetchData from "../api/DataFetch";
import {
  SendDataContext,
  SendDataContextProvider,
} from "../context/sendDataContext";
import Practice from "../layout/Practice";
// import { DashboardScorecardApi } from "../components/Common";

const DashBoardPage = () => {
  // return <PageLayout children={DashBoardContent()}></PageLayout>;
  const [isChecked, setIsChecked] = useState(true);
  const [psDate, setPsDate] = useState("");
  const [peDate, setPeDate] = useState("");
  const [diffData, setDiffData] = useState(0);
  const [tgtData, setTgtData] = useState(0);
  const [sparklineData, setSparklineData] = useState([]);

  const options = [
    { label: "CTR", value: "m_ctr" },
    { label: "총 광고비", value: "m_cost" },
    { label: "총 매출액", value: "m_rvn" },
    { label: "ROAS(%)", value: "m_roas" },
    { label: "총 노출수", value: "m_impr" },
    { label: "총 클릭수", value: "m_click" },
    { label: "CPC", value: "m_cpc" },
    { label: "총 전환수", value: "m_conv" },
    { label: "총 전환율", value: "m_crt" },
    { label: "평균 노출수", value: "avg_impr" },
    { label: "평균 클릭수", value: "avg_click" },
    { label: "평균 CPC", value: "avg_cpc" },
    { label: "평균 광고비", value: "avg_cost" },
    { label: "평균 전환수", value: "avg_conv" },
    { label: "평균 매출액", value: "avg_rvn" },
    { label: "총 주문수", value: "odr" },
    { label: "총 주문율", value: "odr_per_m_cost" },
    { label: "총 주문금액", value: "rvn" },
    { label: "ROAS(%)", value: "roas" },
    { label: "총 구매단가", value: "rvn_per_odr" },
    { label: "총 회원가입수", value: "rgr" },
    { label: "총 회원가입률", value: "rgr_per_m_click" },
  ];
  const defaultSelectedOptions = ["m_ctr", "m_cost", "m_rvn", "m_roas"];
  const [selectedOptions, setSelectedOptions] = useState(
    defaultSelectedOptions
  );

  useEffect(() => {
    selectedOptions.forEach((indicator) => {
      DrawMiniDashboard(indicator);
    });
  }, [selectedOptions]);

  const handleCheckedChange = () => {
    setIsChecked((prevValue) => !prevValue);
    // toggleChecked();
  };

  const handleDateChange = (startDate, endDate) => {
    setPsDate(startDate.format("YYYY-MM-DD"));
    setPeDate(endDate.format("YYYY-MM-DD"));
  };

  const handleOptionClick = (option) => {
    if (defaultSelectedOptions.includes(option)) return;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const DrawMiniDashboard = (indicator) => {
    let sendData = {
      psDate: psDate,
      peDate: peDate,
      checkedVat: isChecked,
    };

    let keyVal = {
      m_ctr: "CTR",
      m_cost: "총 광고비",
      m_rvn: "총 매출액",
      m_roas: "ROAS",
      m_impr: "총 노출수",
      m_click: "총 클릭수",
      m_cpc: "CPC",
      m_conv: "총 전환수",
      m_crt: "전환율",
      avg_impr: "평균 노출수",
      avg_click: "평균 클릭수",
      avg_ctr: "평균 CTR",
      avg_cpc: "평균 CPC",
      avg_cost: "평균 광고비",
      avg_conv: "평균 전환수",
      avg_crt: "평균 전환율",
      avg_rvn: "평균 매출액",
      avg_roas: "평균 ROAS",

      odr: "총 주문수",
      odr_per_m_cost: "총 주문율",
      rvn: "총 주문금액",
      roas: "ROAS",
      rvn_per_odr: "총 구매단가",
      rgr: "총 회원가입수",
      rgr_per_m_click: "총 회원가입률",
    };

    let keyValSign = {
      m_ctr: "%",
      m_cost: "원",
      m_rvn: "원",
      m_roas: "%",
      m_impr: "",
      m_click: "",
      m_cpc: "원",
      m_conv: "",
      m_crt: "%",
      avg_impr: "",
      avg_click: "",
      avg_ctr: "%",
      avg_cpc: "원",
      avg_cost: "원",
      avg_conv: "",
      avg_crt: "%",
      avg_rvn: "",
      avg_roas: "%",
      odr: "",
      odr_per_m_cost: "%",
      rvn: "원",
      roas: "%",
      rvn_per_odr: "원",
      rgr: "",
      rgr_per_m_click: "%",
    };

    const addScriptIcon =
      !indicator.startsWith("m") && !indicator.startsWith("avg");

    // return DashboardScorecardApi("1000000", sendData, null, indicator);
    const dateDiff = betweenDay(sendData.psDate, sendData.peDate) + 1;
    let prePsDate = new Date(
      Date.parse(sendData.psDate) - dateDiff * 1000 * 60 * 60 * 24
    );
    let prePeDate = new Date(
      Date.parse(sendData.peDate) - dateDiff * 1000 * 60 * 60 * 24
    );

    prePsDate = `${prePsDate.getFullYear()}-${(prePsDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${prePsDate.getDate().toString().padStart(2, "0")}`;
    prePeDate = `${prePeDate.getFullYear()}-${(prePeDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${prePeDate.getDate().toString().padStart(2, "0")}`;

    sendData.psDate = prePsDate;

    const getData = async () => {
      try {
        const result = await fetchData();
        const percentReg = /(ctr|rate)/;
        const derivationReg = /(ctr|roas|cpc|crt|cost|rvn|rgr)/;
        const indicatorArr = [
          "m_impr",
          "m_click",
          "m_conv",
          "m_cost",
          "m_rvn",
          "m_cpc",
          "m_ctr",
          "m_roas",
          "m_crt",
          "odr",
          "odr_per_m_cost",
          "rvn",
          "roas",
          "rvn_per_odr",
          "rgr",
          "rgr_per_m_click",
        ];
        const currencyReg =
          /^m_cost$|^m_cpc$|^m_rvn$|^avg_cost$|^avg_cpc$|^avg_rvn$|^rvn_per_odr$/;

        const vatRatio = sendData.checkedVat ? 1.1 : 1.0;

        let diffDataSumObj = Object.fromEntries(
          indicatorArr.map((key) => [key, 0])
        );
        let diffData = 0;

        let tgtDataSumObj = Object.fromEntries(
          indicatorArr.map((key) => [key, 0])
        );
        let tgtData = 0;

        let sparklineData = [];

        for (
          let i = 0;
          i < betweenDay(sendData.psDate, sendData.peDate) + 1;
          i++
        ) {
          let curDate = addDaysToDate(sendData.psDate, i);
          let dataIdx = result.findIndex((item) => item.stat_date == curDate);

          if (curDate >= sendData.psDate && curDate <= prePeDate) {
            if (dataIdx > -1) {
              indicatorArr.forEach(
                (indi) => (diffDataSumObj[indi] += result[dataIdx][indi])
              );
            }
          } else {
            if (dataIdx > -1) {
              indicatorArr.forEach(
                (indi) => (tgtDataSumObj[indi] += result[dataIdx][indi])
              );

              if (!indicator.includes("avg")) {
                if (percentReg.test(indicator)) {
                  sparklineData.push(
                    Math.round(result[dataIdx][indicator] * 10000) / 100
                  );
                } else if (currencyReg.test(indicator)) {
                  sparklineData.push(
                    Math.round(result[dataIdx][indicator] * vatRatio)
                  );
                } else if (indicator.includes("roas")) {
                  sparklineData.push(
                    Math.round(result[dataIdx][indicator] * 100)
                  );
                } else {
                  sparklineData.push(
                    Math.round(result[dataIdx][indicator] * 100) / 100
                  );
                }
              }
            } else {
              if (!indicator.includes("avg")) {
                sparklineData.push(0);
              }
            }
          }
          //console.log("Inner", indicator, sparklineData);
        }

        if (!indicator.includes("avg")) {
          if (!derivationReg.test(indicator)) {
            diffData = diffDataSumObj[indicator];
            tgtData = tgtDataSumObj[indicator];
          } else {
            switch (indicator) {
              case "m_ctr":
                diffData =
                  (diffDataSumObj.m_click / diffDataSumObj.m_impr) * 100;
                tgtData = (tgtDataSumObj.m_click / tgtDataSumObj.m_impr) * 100;
                break;
              case "m_roas":
                diffData = (diffDataSumObj.m_rvn / diffDataSumObj.m_cost) * 100;
                tgtData = (tgtDataSumObj.m_rvn / tgtDataSumObj.m_cost) * 100;
                break;
              case "m_cpc":
                diffData =
                  (diffDataSumObj.m_cost / diffDataSumObj.m_click) * vatRatio;
                tgtData =
                  (tgtDataSumObj.m_cost / tgtDataSumObj.m_click) * vatRatio;
                break;
              case "m_cost":
                diffData = diffDataSumObj[indicator] * vatRatio;
                tgtData = tgtDataSumObj[indicator] * vatRatio;
                break;
              case "m_rvn":
                diffData = diffDataSumObj[indicator] * vatRatio;
                tgtData = tgtDataSumObj[indicator] * vatRatio;
                break;
              case "m_crt":
                diffData =
                  (diffDataSumObj.m_conv / diffDataSumObj.m_click) * 100;
                tgtData = (tgtDataSumObj.m_conv / tgtDataSumObj.m_click) * 100;
                break;
              case "odr_per_m_cost":
                diffData = (diffDataSumObj.odr / diffDataSumObj.m_click) * 100;
                tgtData = (tgtDataSumObj.odr / tgtDataSumObj.m_click) * 100;
                break;
              case "roas":
                diffData = (diffDataSumObj.rvn / diffDataSumObj.m_cost) * 100;
                tgtData = (tgtDataSumObj.rvn / tgtDataSumObj.m_cost) * 100;
                break;
              case "rvn_per_odr":
                diffData = diffDataSumObj.rvn / diffDataSumObj.odr;
                tgtData = tgtDataSumObj.rvn / tgtDataSumObj.odr;
                break;
              case "rgr_per_m_click":
                diffData = (diffDataSumObj.rgr / diffDataSumObj.m_click) * 100;
                tgtData = (tgtDataSumObj.rgr / tgtDataSumObj.m_click) * 100;
                break;
            }
          }
        } else {
          switch (indicator) {
            case "avg_impr":
              diffData = diffDataSumObj.m_impr / dateDiff;
              tgtData = tgtDataSumObj.m_impr / dateDiff;
              break;
            case "avg_click":
              diffData = diffDataSumObj.m_click / dateDiff;
              tgtData = tgtDataSumObj.m_click / dateDiff;
              break;
            case "avg_cost":
              diffData = (diffDataSumObj.m_cost / dateDiff) * vatRatio;
              tgtData = (tgtDataSumObj.m_cost / dateDiff) * vatRatio;
              break;
            case "avg_conv":
              diffData = diffDataSumObj.m_conv / dateDiff;
              tgtData = tgtDataSumObj.m_conv / dateDiff;
              break;
            case "avg_rvn":
              diffData = (diffDataSumObj.m_rvn / dateDiff) * vatRatio;
              tgtData = (tgtDataSumObj.m_rvn / dateDiff) * vatRatio;
              break;
            case "avg_ctr":
              diffData = (diffDataSumObj.m_ctr / dateDiff) * 100;
              tgtData = (tgtDataSumObj.m_ctr / dateDiff) * 100;
              break;
            case "avg_roas":
              diffData = (diffDataSumObj.m_roas / dateDiff) * 100;
              tgtData = (tgtDataSumObj.m_roas / dateDiff) * 100;
              break;
            case "avg_cpc":
              diffData = (diffDataSumObj.m_cpc / dateDiff) * vatRatio;
              tgtData = (tgtDataSumObj.m_cpc / dateDiff) * vatRatio;
              break;
            case "avg_crt":
              diffData = (diffDataSumObj.m_crt / dateDiff) * 100;
              tgtData = (tgtDataSumObj.m_crt / dateDiff) * 100;
              break;
          }
        }

        return { diffData, tgtData, sparklineData, indicator };
      } catch (e) {
        console.log(e);
      }
    };

    // try {
    //   const processedData = await getData();
    //   console.log(processedData);
    //   const htmlContent = (
    //     <div className="col-md-2 pl10 pr10">
    //       <div className="white-box">
    //         <h3 className="box-title">
    //           {keyVal[indicator]}
    //           {addScriptIcon && <span className="ico-script">s</span>}
    //         </h3>
    //         <div className="text-right">
    //           <h1 className="mb0">
    //             {/* {mainNumTxt} */}0
    //             <span className="font16">{keyValSign[indicator]}</span>
    //           </h1>
    //           <span className="per-up">
    //             (101%{" "}
    //             <span className="ico-up">
    //               <FaCaretUp />
    //             </span>
    //             )
    //           </span>
    //         </div>
    //         <div className="sparkline8">
    //           <SparkLine />
    //         </div>
    //       </div>
    //     </div>
    //   );
    //   return htmlContent;
    // } catch (e) {
    //   console.log(e);
    //   return null;
    // }
    return (
      <div className="col-md-2 pl10 pr10">
        <div className="white-box">
          <h3 className="box-title">
            {keyVal[indicator]}
            {addScriptIcon && <span className="ico-script">s</span>}
          </h3>
          <div className="text-right">
            <h1 className="mb0">
              {/* {mainNumTxt} */}0
              <span className="font16">{keyValSign[indicator]}</span>
            </h1>
            <span className="per-up">
              (101%{" "}
              <span className="ico-up">
                <FaCaretUp />
              </span>
              )
            </span>
          </div>
          <div className="sparkline8">
            <SparkLine />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Practice>
      <div className="row">
        <div className="col-lg-12">
          <SendDataContextProvider>
            <FilterOption
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              onCheckedChange={handleCheckedChange}
              onDateChange={handleDateChange}
            />
            <PerformanceIndicator
              // drawMiniDashboard={DrawMiniDashboard}
              // options={options}
              // selectedOptions={selectedOptions}
              // handleOptionClick={handleOptionClick}
              isChecked={isChecked}
              psDate={psDate}
              peDate={peDate}
            />
            <TabContent />
          </SendDataContextProvider>
        </div>
      </div>
    </Practice>
  );
};

export default DashBoardPage;
