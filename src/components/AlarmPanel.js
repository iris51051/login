import { Button, Radio } from "antd";
import React, { useState } from "react";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

const AlarmPanel = () => {
  const [collapse, setCollapse] = useState(false);
  const handleChangeCollapse = () => {
    setCollapse((preValue) => !preValue);
  };
  const columns = [
    {
      title: "알람 설정 활용",
      // border: "1px solid black",
      // width: "30%",
      dataIndex: "use",
    },
    {
      title: "설정 가능한 대상",
      // border: "1px solid black",
      // width: "25%",
      dataIndex: "target",
    },
    {
      title: "자주 사용하는 알람 설정 활용 예시",
      // border: "1px solid black",
      // width: "40%",
      dataIndex: "example",
    },
    {
      title: "생성",
      // border: "1px solid black",
      // width: "10%",
      dataIndex: "generate",
    },
  ];

  const generateBtn = () => {
    return <Button type="default">생성</Button>;
  };

  const [selectedCondition, setSelectedCondition] = useState(null);
  const adTableData = [
    {
      key: 1,
      use: "네이버 매체의 잔액이 입력한 조건이 되면 이메일 받기",
      target: "광고 매체사 : 네이버",
      exmaple:
        "계정 잔액이 10,000원 미만 시 이메일 알림 받기를 설정할 수 있습니다.",
      generate: generateBtn,
    },
    {
      key: 2,
      use: "네이버 특정 키워드가 입력한 조건이 되면 이메일 받기",
      target: "광고 매체사 : 네이버",
      exmaple:
        "A키워드의 평균 노출순위가 3위 이하 이면 이메일 받기를 설정 할 수 있습니다.",
      generate: generateBtn,
    },
  ];

  const collapsedStyle = {
    height: collapse ? "0px" : "100%",
    overflow: "hidden",
    transition: "height ease",
  };
  return (
    <div
      style={{
        border: "1px solid #e8ecee",
        borderRadius: "0px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          borderBottom: "none",
          padding: "10px 25px",
          fontSize: "15px",
          fontWeight: 600,
          background: "#f3f3f7",
          borderColor: "#ddd",
        }}
      >
        자주 사용하는 알람 유형 활용하기
        <div style={{ float: "right" }}>
          {collapse === false ? (
            <BiCaretDown
              style={{ cursor: "pointer" }}
              onClick={handleChangeCollapse}
            />
          ) : (
            <BiCaretUp
              style={{ cursor: "pointer" }}
              onClick={handleChangeCollapse}
            />
          )}
        </div>
      </div>
      <div style={collapsedStyle}>
        <div style={{ padding: "25px" }}>
          <div style={{ marginBottom: "30px" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {[
                {
                  icon: "AD(아이콘)",
                  text: "광고 운영 알림 조건",
                  value: "ad",
                },
                {
                  icon: "Discover(아이콘)",
                  text: "유입/탐색 알림 조건",
                  value: "discover",
                },
                {
                  icon: "Conversion(아이콘)",
                  text: "전환 알림 조건",
                  value: "conversion",
                },
              ].map((item, index) => (
                <li
                  key={item.value}
                  style={{
                    width: "15%",
                    marginBottom: "1.1em",
                    float: "left",
                    paddingRight: "10px",
                  }}
                >
                  <div
                    className="condition-list"
                    style={{
                      marginBottom: 0,
                      border:
                        selectedCondition === item.value
                          ? "1px solid #41b3f9"
                          : "1px solid #e4e7ea",
                      paddingLeft: 0,
                    }}
                  >
                    <Radio
                      value={item.value}
                      checked={selectedCondition === item.value}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          background: "#fff",
                          marginBottom: "0px",
                          marginTop: "0px",
                          // padding: 0,
                          padding: 25,
                          border: "none",
                        }}
                      >
                        {item.icon}
                        <br />
                        {item.text}
                      </div>
                    </Radio>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <table className="custom_table font12">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} style={{ textAlign: "center" }}>
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adTableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.use}</td>
                    <td>{item.target}</td>
                    <td>{item.exmaple}</td>
                    <td style={{ textAlign: "center" }}>{item.generate()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmPanel;
