import { useEffect } from "react";
import { SparkLine } from "./Chart";
import { FaChevronCircleRight, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { format } from "date-fns";
import fetchData from "../api/DataFetch";

const { RangePicker } = DatePicker;
export function makeToLimitDigitsString(number, fraction = 0) {
  let result;

  if (isNaN(Number(number))) {
    result = number;
  } else {
    result = Number(number).toLocaleString(undefined, {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    });
  }

  return result;
}

function makeToPercentageDigitsString(number, fraction = 2, delimiter = "%") {
  let result;
  let num =
    typeof number === "number"
      ? String(number * 100)
      : String(Number(number) * 100);
  if (num === "0" || num === "" || number === undefined || isNaN(num)) {
    if (fraction == 2) {
      result = "0.00" + delimiter;
    } else {
      result = 0 + delimiter;
    }
  } else {
    const pointPos = num.indexOf(".");
    if (pointPos === -1) {
      result = Number(num).toFixed(fraction) + delimiter;
    } else {
      const splitNumber = num.split(".");
      const rightNum = splitNumber[1].substring(0, fraction);

      result =
        Number(`${splitNumber[0]}.${rightNum}`).toFixed(fraction) + delimiter;
    }
  }

  return result;
}

export function betweenDay(firstDate, secondDate) {
  let firstDateObj = new Date(
    firstDate.substring(0, 4),
    firstDate.substring(5, 7) - 1,
    firstDate.substring(8, 10)
  );
  let secondDateObj = new Date(
    secondDate.substring(0, 4),
    secondDate.substring(5, 7) - 1,
    secondDate.substring(8, 10)
  );
  let betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
  return Math.floor(betweenTime / (1000 * 60 * 60 * 24));
}

export function addDaysToDate(startDate, daysToAdd) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + daysToAdd);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");

  const curDate = `${year}-${month}-${day}`;
  return curDate;
}

export const DashboardScorecardApi = (rptNo, sendData, param, indicator) => {
  const originPs = sendData.psDate;
  const originPe = sendData.peDate;

  const dateDiff = betweenDay(originPs, originPe) + 1;

  const prePsDate = new Date(
    Date.parse(originPs) - dateDiff * 1000 * 60 * 60 * 24
  );
  const prePeDate = new Date(
    Date.parse(originPe) - dateDiff * 1000 * 60 * 60 * 24
  );

  const year = prePsDate.getFullYear();
  const month = (prePsDate.getMonth() + 1).toString().padStart(2, "0");
  const day = prePsDate.getDate().toString().padStart(2, "0");
  sendData.psDate = `${year}-${month}-${day}`;
  console.log(sendData.psDate);

  return drawNewDashboardScorecard(indicator);
};
const drawNewDashboardScorecard = (indicator) => {
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

  return (
    <div className="col-md-2 pl10 pr10">
      <div className="white-box">
        <h3 className="box-title">
          {keyVal[indicator]}
          {addScriptIcon && <span className="ico-script">s</span>}
        </h3>
        <div className="text-right">
          <h1 className="mb0">
            test
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

export function useApi(sendData, indicator) {
  async function fetchData() {
    // const response = await fetchData();
  }

  return console.log(sendData, indicator);
}

export const Calendar = ({ value, onChange }) => {
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
  return (
    <RangePicker
      value={value}
      onChange={onChange}
      presets={[...rangePresets]}
      format="YYYY/MM/DD"
    />
  );
};
