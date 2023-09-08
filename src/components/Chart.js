import React, { useEffect, useState } from "react";
import Echarts from "echarts-for-react";
import dayjs from "dayjs";

const colors = [
  "#4180ec ",
  "#4fd9bc ",
  "#494e5f ",
  "#30c7e9",
  "#6269e9",
  "#00aaaa",
  "#42c360",
  "#b5cf14",
  "#eaab2f",
  "#bababa",
];

export const SparkLine = () => {
  const data = [0, 95, 211, 275, 234, 190, 275, 200, 0];
  const minValues = [];
  const minValue = Math.min(...data);
  const maxValues = [];
  const maxValue = Math.max(...data);

  data.forEach((value, index) => {
    if (value === minValue) {
      minValues.push(index);
    }
    if (value === maxValue) {
      maxValues.push(index);
    }
  });

  const options = {
    tooltip: {
      backgroundColor: "rgba(99, 100, 101, 0.8)",
      textStyle: {
        color: "white",
        fontSize: "2",
      },
      trigger: "axis",
      formatter: function (params) {
        var tooltipContent = "";
        params.forEach(function (item) {
          var color = "#30c7e9";
          var value = item.data;
          tooltipContent +=
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:5px;height:5px;background-color:' +
            color +
            ';"></span>';

          tooltipContent += value;
        });
        return tooltipContent;
      },
    },

    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: data,
        type: "line",
        areaStyle: {
          color: "rgba(65,128,236,0.2)",
        },
        color: "#7cb5ec",
        // symbol: "circle",
        symbolSize: 0,
        markPoint: {
          symbol: "circle",
          symbolSize: 3.5,
          label: {
            show: false,
          },
          data: [
            ...maxValues.map((index) => ({
              type: "max",
              name: "max",
              itemStyle: { color: "green" },
              coord: [index, maxValue],
            })),
            ...minValues.map((index) => ({
              type: "min",
              name: "min",
              itemStyle: { color: "orange" },
              symbolSize: 6,
              coord: [index, minValue],
            })),
          ],
        },
      },
    ],
  };
  return (
    <div>
      <Echarts option={options} style={{ height: "30px" }} />
    </div>
  );
};

export const MyChartLinePeriod = ({ indicatorSelector }) => {
  const generateDates = (start, end, interval) => {
    const dates = [];
    const current = new Date(start);

    while (current < end) {
      const dateObj = {
        value: current.toLocaleDateString(),
        textStyle: {},
      };

      if (current.getDay() === 0) dateObj.textStyle.color = "red";
      if (current.getDay() === 6) dateObj.textStyle.color = "blue";

      dates.push(dateObj);

      if (interval === "by_day") {
        current.setDate(current.getDate() + 1);
      } else if (interval === "by_week") {
        current.setDate(current.getDate() + 7);
      } else if (interval === "by_month") {
        current.setMonth(current.getMonth() + 1);
      }
    }

    const endDateObj = {
      value: end.format("YYYY. M. DD."),
      textStyle: {},
    };
    if (new Date(end).getDay() === 0) endDateObj.textStyle.color = "red";
    if (new Date(end).getDay() === 6) endDateObj.textStyle.color = "blue";

    dates.push(endDateObj);
    return dates;
  };
  const [xdata, setXdata] = useState(
    generateDates(dayjs().add(-7, "d"), dayjs().add(-1, "d"), "by_day")
  );

  const data = [
    {
      indicatorSelector1: "매체",
      name: "네이버",
      value: [15870, 15098, 11316, 11025, 13536, 12977, 17362],
    },
    {
      indicatorSelector1: "매체",
      name: "구글",
      value: [0, 12580, 5520, 4612, 8729, 16391, 9275],
    },
    {
      indicatorSelector1: "매체",
      name: "카카오",
      value: [636, 583, 328, 405, 588, 387, 682],
    },
  ];

  const avgObject = {
    indicatorSelector1: "매체",
    name: "평균 노출수",
    value: [],
  };

  for (let i = 0; i < data[0].value.length; i++) {
    const sum = data.reduce((total, item) => total + item.value[i], 0);
    const avg = (sum / data.length).toFixed(0);
    avgObject.value.push(avg);
  }

  data.push(avgObject);

  const lineChartData = (data) => {
    return data.map((item, index) => ({
      name: item.name,
      type: "line",
      smooth: true,
      // stack: item.name === "평균 노출수" ? false : true,
      data: item.value,
      symbol: "circle",
      symbolSize: item.name === "평균 노출수" ? 0 : 6,
      areaStyle:
        item.name === "평균 노출수"
          ? { color: "#a1a1a1", opacity: 0.13 }
          : null,
      lineStyle: item.name === "평균 노출수" ? { width: 0 } : { width: 2 },
      itemStyle: {
        color:
          item.name === "평균 노출수"
            ? colors[colors.length - 1]
            : colors[index],
      },
    }));
  };

  useEffect(() => {
    setXdata(
      generateDates(
        dayjs().add(-7, "d"),
        dayjs().add(-1, "d"),
        indicatorSelector
      )
    );
  }, [indicatorSelector]);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    grid: {
      left: 80,
      right: 50,
      top: 10,
      bottom: 50,
    },
    color: colors,
    legend: {
      data: data.map((item) => item.name),
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: {
      type: "category",
      data: xdata,
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      name: "노출수",
      nameLocation: "center",
      nameGap: 50,
      nameTextStyle: {
        fontWeight: "bold",
      },
      axisLine: {
        show: true,
      },
    },
    series: lineChartData(data),
  };
  return (
    <Echarts option={options} style={{ height: "450px", paddingTop: "20px" }} />
  );
};

// export const LineChart = ({ colors }) => {
//   //선택된 기간에 대한 x축 data값 생성(일, 주, 월)
//   const generateDates = (start, end, interval) => {
//     const dates = [];
//     const current = new Date(start);
//     while (current < end) {
//       dates.push(current.toLocaleDateString());
//       if (interval === "day") {
//         current.setDate(current.getDate() + 1);
//       } else if (interval === "week") {
//         current.setDate(current.getDate() + 7);
//       } else if (interval === "month") {
//         current.setMonth(current.getMonth() + 1);
//       }
//     }
//     dates.push(end.toLocaleDateString()); // 마지막 날짜 포함
//     return dates;
//   };

//   const [startDate, setStartDate] = useState(new Date("2023/04/20"));
//   const [endDate, setEndDate] = useState(new Date("2023/06/01"));
//   const [xdata, setXData] = useState(generateDates(startDate, endDate, "day"));

//   //실제 데이터 (이름, 값)
//   const defaultData = [
//     {
//       group: "광고주",
//       groupname: "아트",
//       name: "노출수",
//       value: [60, 50, 21, 58, 95, 77, 21],
//     },
//     {
//       group: "광고주",
//       groupname: "아트",
//       name: "클릭수",
//       value: [10, 20, 81, 38, 95, 17, 81],
//     },
//     {
//       group: "광고주",
//       groupname: "아트",
//       name: "CTR",
//       value: [40, 60, 84, 38, 55, 77, 40],
//     },
//     {
//       group: "광고주",
//       groupname: "컴투펫",
//       name: "노출수",
//       value: [50, 30, 24, 18, 35, 47, 60],
//     },
//     {
//       group: "광고주",
//       groupname: "컴투펫",
//       name: "클릭수",
//       value: [60, 50, 21, 58, 95, 77, 21],
//     },
//     {
//       group: "광고주",
//       groupname: "컴투펫",
//       name: "CTR",
//       value: [10, 20, 81, 38, 95, 17, 81],
//     },
//     {
//       group: "광고주",
//       groupname: "휴라이트",
//       name: "노출수",
//       value: [40, 60, 84, 38, 55, 77, 40],
//     },
//     {
//       group: "광고주",
//       groupname: "휴라이트",
//       name: "클릭수",
//       value: [20, 40, 71, 68, 55, 17, 41],
//     },
//     {
//       group: "광고주",
//       groupname: "휴라이트",
//       name: "CTR",
//       value: [30, 50, 41, 58, 65, 77, 91],
//     },
//     {
//       group: "광고주",
//       groupname: "후퍼옵틱",
//       name: "노출수",
//       value: [110, 160, 91, 41, 65, 97, 20],
//     },
//     {
//       group: "광고주",
//       groupname: "후퍼옵틱",
//       name: "클릭수",
//       value: [160, 250, 21, 318, 95, 77, 21],
//     },
//     {
//       group: "광고주",
//       groupname: "후퍼옵틱",
//       name: "CTR",
//       value: [150, 20, 224, 218, 135, 47, 26],
//     },
//     {
//       group: "매체",
//       groupname: "검샷",
//       name: "노출수",
//       value: [110, 160, 91, 41, 65, 97, 20],
//     },
//     {
//       group: "매체",
//       groupname: "검샷",
//       name: "클릭수",
//       value: [160, 250, 21, 318, 95, 77, 21],
//     },
//     {
//       group: "매체",
//       groupname: "검샷",
//       name: "CTR",
//       value: [150, 20, 224, 218, 135, 47, 26],
//     },
//     {
//       group: "매체",
//       groupname: "컴샷",
//       name: "노출수",
//       value: [30, 50, 41, 58, 65, 77, 91],
//     },
//     {
//       group: "매체",
//       groupname: "컴샷",
//       name: "클릭수",
//       value: [110, 160, 91, 41, 65, 97, 20],
//     },
//     {
//       group: "매체",
//       groupname: "컴샷",
//       name: "CTR",
//       value: [160, 250, 21, 318, 95, 77, 21],
//     },
//   ];

//   const [data, setData] = useState(defaultData);
//   const [filteredData, setFilteredData] = useState(
//     defaultData.filter(
//       (item) =>
//         item.group === defaultData[0].group && item.name === defaultData[0].name
//     )
//   );
//   const [selectedGroup, setSelectedGroup] = useState(defaultData[0].group);
//   const [selectedName, setSelectedName] = useState(defaultData[0].name);

//   const handlexDataChange = (e) => {
//     const value = e.target.value;
//     if (value === "day") {
//       const dates = generateDates(startDate, endDate, "day");
//       setXData(dates);
//     } else if (value === "week") {
//       const dates = generateDates(startDate, endDate, "week");
//       setXData(dates);
//     } else if (value === "month") {
//       const dates = generateDates(startDate, endDate, "month");
//       setXData(dates);
//     }
//   };

//   //group별 필터링
//   const handleGroupChange = (e) => {
//     setSelectedGroup(e.target.value);
//   };

//   //name별 필터링
//   const handleChange = (value) => {
//     setSelectedName(value);
//   };

//   const [options, setOptions] = useState({});

//   useEffect(() => {
//     const filteredData = defaultData.filter(
//       (item) => item.group === selectedGroup && item.name === selectedName
//     );
//     setFilteredData(filteredData);
//   }, [selectedGroup, selectedName]);

//   useEffect(() => {
//     const updateOptions = {
//       tooltip: {
//         trigger: "axis",
//         axisPointer: {
//           type: "cross",
//         },
//       },
//       grid: {
//         left: 50,
//         right: 50,
//         top: 10,
//         bottom: 50,
//       },
//       color: colors,
//       legend: {
//         data: filteredData.map((item) => item.groupname),
//         bottom: "bottom",
//         icon: "circle",
//         itemGap: 25,
//       },
//       xAxis: {
//         type: "category",
//         data: xdata,
//         boundaryGap: false,
//       },
//       yAxis: {
//         type: "value",
//         axisLine: {
//           show: true,
//         },
//       },
//       series: dataSeries(filteredData),
//     };
//     setOptions(updateOptions);
//   }, [xdata, filteredData, data]);

//   //차트에 데이터값 출력
//   const dataSeries = (filteredData) => {
//     return filteredData.map((item) => ({
//       name: item.groupname,
//       type: "line",
//       smooth: true,
//       data: item.value,
//       symbol: "circle",
//       symbolSize: 6,
//     }));
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           margin: 20,
//         }}
//       >
//         <div>
//           <Radio.Group value={selectedGroup} onChange={handleGroupChange}>
//             <Radio.Button value="광고주">광고주</Radio.Button>
//             <Radio.Button value="매체">매체</Radio.Button>
//           </Radio.Group>
//           &nbsp;&nbsp;
//           <Select
//             value={selectedName}
//             className="selectBox"
//             options={[
//               { value: "노출수", label: "노출수" },
//               { value: "클릭수", label: "클릭수" },
//               { value: "CTR", label: "CTR" },
//             ]}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <Radio.Group defaultValue="day" onChange={handlexDataChange}>
//             <Radio.Button value="day">일</Radio.Button>
//             <Radio.Button value="week">주</Radio.Button>
//             <Radio.Button value="month">월</Radio.Button>
//           </Radio.Group>
//         </div>
//       </div>
//       <ECharts
//         option={options}
//         notMerge={true}
//         // opts={{ renderer: "svg", width: "auto", height: "auto" }}
//       />
//     </div>
//   );
// };

export const MyMixChart = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        crossStyle: {
          color: "#999",
        },
      },
    },
    grid: {
      left: 80,
      right: 80,
      top: 10,
      bottom: 50,
    },
    legend: {
      data: ["ROAS(%)", "총 광고비", "총 매출액"],
      bottom: "bottom",
      icon: "circle",
      itemGap: 25,
    },
    xAxis: [
      {
        type: "category",
        data: ["A 비즈스프링", "모바일미샤", "롯데푸드몰", "대행사", "test"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "총 광고비",
        nameLocation: "middle",
        nameGap: 50,
        nameTextStyle: {
          fontWeight: "bold",
        },

        axisLine: {
          show: "true",
        },
      },
      {
        type: "value",
        name: "총 매출액",
        nameLocation: "middle",
        nameGap: 50,
        nameRotate: 270,
        nameTextStyle: {
          fontWeight: "bold",
        },
        axisLine: {
          show: "ture",
        },
      },
    ],
    series: [
      {
        name: "총 광고비",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return "￦ " + value;
          },
        },
        data: [5, 10, 6, 3, 6],
        itemStyle: {
          color: "#4180ec",
        },
        barWidth: "15px",
      },
      {
        name: "총 매출액",
        type: "bar",
        yAxisIndex: 1,
        itemStyle: {
          color: "#4fd9bc",
        },
        tooltip: {
          valueFormatter: function (value) {
            return "￦ " + value;
          },
        },
        data: [50, 42, 65, 13, 16],
        barWidth: "15px",
      },
      {
        name: "ROAS(%)",
        type: "line",
        // yAxisIndex: 1,
        itemStyle: {
          color: "#bababa",
        },
        symbol: "circle",
        symbolSize: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        data: [89, 67, 42, 35, 25],
        areaStyle: { opacity: 0.13 },
      },
    ],
  };
  return (
    <Echarts option={option} style={{ height: "450px", paddingTop: "20px" }} />
  );
};
