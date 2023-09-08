import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card, Select, DatePicker, Button, Table, Radio } from "antd";
import { FaChevronCircleRight, FaCaretUp, FaCaretDown } from "react-icons/fa";
import dayjs from "dayjs";
import "./../../css/dashBoard.css";
import { MyChartLinePeriod, MyMixChart, SparkLine } from "../Chart";
import axios from "axios";
import fetchData from "../../api/DataFetch";
import { addDaysToDate, makeToLimitDigitsString, useApi } from "../Common";
import { SendDataContext } from "../../context/sendDataContext";
import { is } from "date-fns/locale";

const { RangePicker } = DatePicker;
const rangePresets = [
  { label: "어제", value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")] },
  {
    label: "최근 7일",
    value: [dayjs().add(-7, "d"), dayjs().add(-1, "d")],
  },
  {
    label: "최근 30일",
    value: [dayjs().add(-30, "d"), dayjs().add(-1, "d")],
  },
  {
    label: "최근 90일",
    value: [dayjs().add(-90, "d"), dayjs().add(-1, "d")],
  },
  {
    label: "이번 달",
    value: [dayjs().startOf("month"), dayjs().add(-1, "d")],
  },
  {
    label: "지난 달",
    value: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  },
  {
    label: "이번 년도",
    value: [dayjs().startOf("year"), dayjs().add(-1, "d")],
  },
  {
    label: "지난 년도",
    value: [
      dayjs().subtract(1, "year").startOf("year"),
      dayjs().subtract(1, "year").endOf("year"),
    ],
  },
];
const betweenDay = (startDate, endDate) => {
  let startDateObj = new Date(
    startDate.substring(0, 4),
    startDate.substring(5, 7) - 1,
    startDate.substring(8, 10)
  );
  let endDateObj = new Date(
    endDate.substring(0, 4),
    endDate.substring(5, 7) - 1,
    endDate.substring(8, 10)
  );
  let betweenTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
  return Math.floor(betweenTime / (1000 * 60 * 60 * 24));
};

export const DashboardScorecardApi = (rptNo, sendData, param, indicator) => {
  // const { isChecked, psDate, peDate } = useContext(SendDataContext);
  // let sendData = {
  //   psDate: psDate,
  //   peDate: peDate,
  //   checkedVat: isChecked,
  // };

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

  let diffData = 0;
  let tgtData = 0;
  let sparklineData = [];
  const getData = async () => {
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
    // let diffData = 0;

    let tgtDataSumObj = Object.fromEntries(indicatorArr.map((key) => [key, 0]));
    // let tgtData = 0;

    // let sparklineData = [];

    for (let i = 0; i < betweenDay(sendData.psDate, sendData.peDate) + 1; i++) {
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
              sparklineData.push(Math.round(result[dataIdx][indicator] * 100));
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
            diffData = (diffDataSumObj.m_click / diffDataSumObj.m_impr) * 100;
            tgtData = (tgtDataSumObj.m_click / tgtDataSumObj.m_impr) * 100;
            break;
          case "m_roas":
            diffData = (diffDataSumObj.m_rvn / diffDataSumObj.m_cost) * 100;
            tgtData = (tgtDataSumObj.m_rvn / tgtDataSumObj.m_cost) * 100;
            break;
          case "m_cpc":
            diffData =
              (diffDataSumObj.m_cost / diffDataSumObj.m_click) * vatRatio;
            tgtData = (tgtDataSumObj.m_cost / tgtDataSumObj.m_click) * vatRatio;
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
            diffData = (diffDataSumObj.m_conv / diffDataSumObj.m_click) * 100;
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
  };
  getData().then((result) => {
    // console.log(result);
    // switch (indicator) {
    //   case "m_ctr":
    //     diffData = result.diffData;
    //     tgtData = result.tgtData;
    //     sparklineData = result.sparklineData;
    //     // console.log(diffData, tgtData, sparklineData);
    //     break;
    // }
    diffData = result.diffData;
    console.log(diffData);
  });
  console.log(diffData, tgtData, sparklineData);

  //console.log("out", indicator, sparklineData);
  return drawNewDashboardScorecard(diffData, tgtData, sparklineData, indicator);
  // return drawNewDashboardScorecard(indicator);
  // return {
  //   getData: async () => {
  //     const {
  //       diffData: updatedDiffData,
  //       tgtData: updatedTgtData,
  //       sparklineData: updatedSparklineData,
  //     } = await getData();
  //     return drawNewDashboardScorecard(
  //       updatedDiffData,
  //       updatedTgtData,
  //       updatedSparklineData,
  //       indicator
  //     );
  //   },
  // };
};

const drawNewDashboardScorecard = (
  diffData,
  tgtData,
  sparkChartData,
  indicator
) => {
  let changePercent = (tgtData / diffData - 1) * 100;
  changePercent = makeToLimitDigitsString(changePercent);

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

  let reg = /(ctr|crt|roas|rvn_per_odr)/;
  let mainNumTxt = "";
  if (reg.test(indicator)) {
    mainNumTxt = makeToLimitDigitsString(isNaN(tgtData) ? 0 : tgtData, 2);
  } else {
    mainNumTxt = makeToLimitDigitsString(isNaN(tgtData) ? 0 : tgtData);
  }
  return (
    <div className="col-md-2 pl10 pr10">
      <div className="white-box">
        <h3 className="box-title">
          {keyVal[indicator]}
          {addScriptIcon && <span className="ico-script">s</span>}
        </h3>
        <div className="text-right">
          <h1 className="mb0">
            {mainNumTxt}
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

export const FilterOption = ({
  isChecked,
  setIsChecked,
  onCheckedChange,
  onDateChange,
}) => {
  // const { isChecked, setIsChecked, toggleChecked, updateDateRange } = useContext(SendDataContext);
  // const [isChecked, setIsChecked] = useState(true);
  const [dateRange, setDateRage] = useState([]);
  // const [psDate, setPsDate] = useState("");
  // const [peDate, setPeDate] = useState("");

  const handleCheckedChange = () => {
    onCheckedChange();
    //setIsChecked((prevValue) => !prevValue);
  };

  useEffect(() => {
    const initialPreset = rangePresets.find(
      (preset) => preset.label === "최근 7일"
    );
    if (initialPreset) {
      setDateRage(initialPreset.value);
    }
  }, []);

  useEffect(() => {
    if (dateRange && dateRange.length > 0) {
      // setPsDate(dateRange[0].format("YYYY-MM-DD"));
      // setPeDate(dateRange[1].format("YYYY-MM-DD"));
      onDateChange(dateRange[0], dateRange[1]);
    } else {
      // setPsDate("");
      // setPeDate("");
    }
  }, [dateRange]);

  const onRangeChange = (date) => {
    setDateRage(date);
  };

  const handleClick = () => {
    // console.log(dateRange);
  };

  return (
    <Card
      className="filter-box"
      title="필터 선택"
      extra={<a href="#">More</a>}
      style={{
        width: 1600,
      }}
    >
      <div className="row mb10">
        <div className="w120px">
          <div>
            <h4 className="b">
              대상&nbsp;
              <FaChevronCircleRight />
            </h4>
          </div>
        </div>
        <div className="col-md-2">
          <Select
            defaultValue="lucy"
            style={{
              width: "100%",
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </div>
        <div className="col-md-2">
          <Select
            defaultValue="lucy"
            style={{
              width: "100%",
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </div>
        <div className="col-md-2">
          <Select
            defaultValue="lucy"
            style={{
              width: "100%",
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </div>
        <div className="col-md-1">
          <div className="fl">
            <div className="can-toggle">
              <input
                id="vat_tobble_switch"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="vat_toggle_swtich">
                <div
                  className="can-toggle__switch"
                  data-checked="VAT 포함"
                  data-unchecked="VAT 제외"
                  onClick={handleCheckedChange}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb10">
        <div className="w120px">
          <div>
            <h4 className="b">
              기간&nbsp;
              <FaChevronCircleRight />
            </h4>
          </div>
        </div>
        <div className="col-md-2">
          <RangePicker
            value={dateRange}
            onChange={onRangeChange}
            presets={[...rangePresets]}
            format="YYYY/MM/DD"
          />
        </div>
        <div className="col-md-1">
          <Button
            type="primary"
            style={{ backgroundColor: "#41b3f9" }}
            onClick={handleClick}
          >
            확인
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const PerformanceIndicator = ({
  // drawMiniDashboard,
  // options,
  // selectedOptions,
  // handleOptionClick,
  isChecked,
  psDate,
  peDate,
}) => {
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
  let sendData = {
    psDate: psDate,
    peDate: peDate,
    checkedVat: isChecked,
  };

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

  // const addScriptIcon =
  //   !indicator.startsWith("m") && !indicator.startsWith("avg");

  const defaultSelectedOptions = ["m_ctr", "m_cost", "m_rvn", "m_roas"];
  const [selectedOptions, setSelectedOptions] = useState(
    defaultSelectedOptions
  );

  useEffect(() => {
    fetchData()
      .then((responseData) => console.log(responseData))
      .catch((error) => console.log(error));
  }, []);

  async function fetchData() {
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

            // if (!indicator.includes("avg")) {
            //   if (percentReg.test(indicator)) {
            //     sparklineData.push(
            //       Math.round(result[dataIdx][indicator] * 10000) / 100
            //     );
            //   } else if (currencyReg.test(indicator)) {
            //     sparklineData.push(
            //       Math.round(result[dataIdx][indicator] * vatRatio)
            //     );
            //   } else if (indicator.includes("roas")) {
            //     sparklineData.push(
            //       Math.round(result[dataIdx][indicator] * 100)
            //     );
            //   } else {
            //     sparklineData.push(
            //       Math.round(result[dataIdx][indicator] * 100) / 100
            //     );
            //   }
            // }
          } else {
            // if (!indicator.includes("avg")) {
            //   sparklineData.push(0);
            // }
          }
        }
        //console.log("Inner", indicator, sparklineData);
      }

      // if (!indicator.includes("avg")) {
      //   if (!derivationReg.test(indicator)) {
      //     diffData = diffDataSumObj[indicator];
      //     tgtData = tgtDataSumObj[indicator];
      //   } else {
      //     switch (indicator) {
      //       case "m_ctr":
      //         diffData = (diffDataSumObj.m_click / diffDataSumObj.m_impr) * 100;
      //         tgtData = (tgtDataSumObj.m_click / tgtDataSumObj.m_impr) * 100;
      //         break;
      //       case "m_roas":
      //         diffData = (diffDataSumObj.m_rvn / diffDataSumObj.m_cost) * 100;
      //         tgtData = (tgtDataSumObj.m_rvn / tgtDataSumObj.m_cost) * 100;
      //         break;
      //       case "m_cpc":
      //         diffData =
      //           (diffDataSumObj.m_cost / diffDataSumObj.m_click) * vatRatio;
      //         tgtData =
      //           (tgtDataSumObj.m_cost / tgtDataSumObj.m_click) * vatRatio;
      //         break;
      //       case "m_cost":
      //         diffData = diffDataSumObj[indicator] * vatRatio;
      //         tgtData = tgtDataSumObj[indicator] * vatRatio;
      //         break;
      //       case "m_rvn":
      //         diffData = diffDataSumObj[indicator] * vatRatio;
      //         tgtData = tgtDataSumObj[indicator] * vatRatio;
      //         break;
      //       case "m_crt":
      //         diffData = (diffDataSumObj.m_conv / diffDataSumObj.m_click) * 100;
      //         tgtData = (tgtDataSumObj.m_conv / tgtDataSumObj.m_click) * 100;
      //         break;
      //       case "odr_per_m_cost":
      //         diffData = (diffDataSumObj.odr / diffDataSumObj.m_click) * 100;
      //         tgtData = (tgtDataSumObj.odr / tgtDataSumObj.m_click) * 100;
      //         break;
      //       case "roas":
      //         diffData = (diffDataSumObj.rvn / diffDataSumObj.m_cost) * 100;
      //         tgtData = (tgtDataSumObj.rvn / tgtDataSumObj.m_cost) * 100;
      //         break;
      //       case "rvn_per_odr":
      //         diffData = diffDataSumObj.rvn / diffDataSumObj.odr;
      //         tgtData = tgtDataSumObj.rvn / tgtDataSumObj.odr;
      //         break;
      //       case "rgr_per_m_click":
      //         diffData = (diffDataSumObj.rgr / diffDataSumObj.m_click) * 100;
      //         tgtData = (tgtDataSumObj.rgr / tgtDataSumObj.m_click) * 100;
      //         break;
      //     }
      //   }
      // } else {
      //   switch (indicator) {
      //     case "avg_impr":
      //       diffData = diffDataSumObj.m_impr / dateDiff;
      //       tgtData = tgtDataSumObj.m_impr / dateDiff;
      //       break;
      //     case "avg_click":
      //       diffData = diffDataSumObj.m_click / dateDiff;
      //       tgtData = tgtDataSumObj.m_click / dateDiff;
      //       break;
      //     case "avg_cost":
      //       diffData = (diffDataSumObj.m_cost / dateDiff) * vatRatio;
      //       tgtData = (tgtDataSumObj.m_cost / dateDiff) * vatRatio;
      //       break;
      //     case "avg_conv":
      //       diffData = diffDataSumObj.m_conv / dateDiff;
      //       tgtData = tgtDataSumObj.m_conv / dateDiff;
      //       break;
      //     case "avg_rvn":
      //       diffData = (diffDataSumObj.m_rvn / dateDiff) * vatRatio;
      //       tgtData = (tgtDataSumObj.m_rvn / dateDiff) * vatRatio;
      //       break;
      //     case "avg_ctr":
      //       diffData = (diffDataSumObj.m_ctr / dateDiff) * 100;
      //       tgtData = (tgtDataSumObj.m_ctr / dateDiff) * 100;
      //       break;
      //     case "avg_roas":
      //       diffData = (diffDataSumObj.m_roas / dateDiff) * 100;
      //       tgtData = (tgtDataSumObj.m_roas / dateDiff) * 100;
      //       break;
      //     case "avg_cpc":
      //       diffData = (diffDataSumObj.m_cpc / dateDiff) * vatRatio;
      //       tgtData = (tgtDataSumObj.m_cpc / dateDiff) * vatRatio;
      //       break;
      //     case "avg_crt":
      //       diffData = (diffDataSumObj.m_crt / dateDiff) * 100;
      //       tgtData = (tgtDataSumObj.m_crt / dateDiff) * 100;
      //       break;
      //   }
      // }

      // return { diffData, tgtData, sparklineData, indicator };
      return "test";
    } catch (error) {
      throw error;
    }
  }
  const handleOptionClick = (option) => {
    if (defaultSelectedOptions.includes(option)) return;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="col-lg-12 pl0 pr0">
      <div className="white-box">
        <h3 className="box-title col-md-2 pl0 w160px tl mt0">성과 지표</h3>
        <div className="mb20" style={{ display: "block" }}>
          <table className="dataTable" style={{ borderTop: "inherit" }}>
            <colgroup>
              <col width="140px"></col>
              {/* <col width></col> */}
            </colgroup>
            <tbody>
              <tr>
                <th className="tl active">지표 항목 선택</th>
                <td className="tl">
                  <Button.Group
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {options.map((option) => (
                      <Button
                        key={option.value}
                        className={
                          selectedOptions.includes(option.value)
                            ? "btn-border"
                            : ""
                        }
                        onClick={() => handleOptionClick(option.value)}
                      >
                        {option.label}
                        {""}
                        {!["m", "avg"].some((prefix) =>
                          option.value.startsWith(prefix)
                        ) ? (
                          <span className="ico-script">s</span>
                        ) : null}
                      </Button>
                    ))}
                  </Button.Group>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pd0">
          <div className="row">
            <div className="col-lg-12 pl5 pr5">
              <div className="dashboard_mini">
                {options.map((option) => {
                  const addScriptIcon =
                    !option.value.startsWith("m") &&
                    !option.value.startsWith("avg");
                  return selectedOptions.includes(option.value) ? (
                    <div key={option.value}>
                      {/* {drawNewDashboardScorecard(option.value)} */}
                      {/* {drawMiniDashboard(option.value)} */}
                      <div className="col-md-2 pl10 pr10">
                        <div className="white-box">
                          <h3 className="box-title">
                            {keyVal[option.value]}
                            {addScriptIcon && (
                              <span className="ico-script">s</span>
                            )}
                          </h3>
                          <div className="text-right">
                            <h1 className="mb0">
                              {/* {mainNumTxt} */}test
                              <span className="font16">
                                {keyValSign[option.value]}
                              </span>
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
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TabContent = () => {
  const [indicatorSelector1, setIndicatorSelector1] = useState("ad_provider");
  const [indicatorSelector, setIndicatorSelector] = useState("by_day");

  return (
    <>
      <div className="col-lg-12 pl0 pr0">
        <div className="white-box">
          <div className="bg-white">
            <h3 className="box-title pb10">기간별 광고 비용 추세</h3>
            <div className="custom-radio">
              <div className="fl">
                <Radio.Group
                  value={indicatorSelector1}
                  onChange={(e) => setIndicatorSelector1(e.target.value)}
                >
                  <Radio.Button value="ad_provider">매체</Radio.Button>
                  <Radio.Button value="campaign">캠페인</Radio.Button>
                  <Radio.Button value="adgroup">광고그룹</Radio.Button>
                  <Radio.Button value="ad_program">광고유형</Radio.Button>
                  <Radio.Button value="device">디바이스</Radio.Button>
                </Radio.Group>
              </div>
              <div className="fr">
                <Radio.Group
                  value={indicatorSelector}
                  onChange={(e) => setIndicatorSelector(e.target.value)}
                >
                  <Radio.Button value="by_day">일</Radio.Button>
                  <Radio.Button value="by_week">주</Radio.Button>
                  <Radio.Button value="by_month">월</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <div
              className="chart-container"
              style={{ minHeight: "450px", overflow: "hidden" }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <MyChartLinePeriod indicatorSelector={indicatorSelector} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 pl0 pr0">
        <div className="white-box">
          <h3 className="box-title">주요 광고주 성과 비교</h3>
          <p className="font12 mb10">
            <span className="ico_red"></span>
            <strong>비교기간</strong>은 조회한 날짜를 기준으로, 동일한
            직전기간입니다.
            <span className="txt-gray">
              &nbsp;(예시. 조회기간: 2021-11-01~2021-11-07(7일) → 비교기간:
              2021-10-25~2021-10-31(7일))
            </span>
          </p>
          <div className="panel-body">
            <div
              className="chart-container"
              style={{ minHeight: "450px", overflow: "hidden" }}
            >
              <div
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <MyMixChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
