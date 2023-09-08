import React, { useState } from "react";
import { Breadcrumb, Button, Space, Card } from "antd";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export const AddAlarm = () => {
  const [collapse, setCollapse] = useState(false);
  const items = [
    { title: " 모니터링알림", href: "/" },
    { title: "알림 설정", href: "/" },
    { title: "새 알림 등록" },
  ];
  const HanbleChangeCollapse = () => {
    setCollapse((preValue) => !preValue);
  };
  const collapseStyle = {
    margin: "-1px 0 0",
    backgroundColor: "white",
    border: "1px solid black",
    borderCollapse: "collapse",
    height: collapse ? "0px" : "100%",
    padding: collapse ? 0 : 10,
    flexDirection: "column",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    transition: "height 0.3s ease",
    justifyContent: "center",
    alignItems: "center",
  };

  const columns = [
    {
      title: "알람 설정 활용",
      border: "1px solid black",
      width: "30%",
      dataIndex: "use",
    },
    {
      title: "설정 가능한 대상",
      border: "1px solid black",
      width: "25%",
      dataIndex: "target",
    },
    {
      title: "자주 사용하는 알람 설정 활용 예시",
      border: "1px solid black",
      width: "40%",
      dataIndex: "example",
    },
    {
      title: "생성",
      border: "1px solid black",
      width: "10%",
      dataIndex: "generate",
    },
  ];
  const Generate = () => {
    console.log("몰?루");
  };
  const generateBtn = () => {
    return <Button onClick={Generate}>생성</Button>;
  };
  const Examdata = [
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
  const ExamTdStyle = {
    border: "1px solid black",
    padding: 10,
  };
  return (
    <>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Breadcrumb separator=">" items={items} />
      </div>
      <div
        className="WhiteBox"
        style={{ display: "grid", padding: 0, border: "none" }}
      >
        <div
          style={{
            padding: 5,
            border: "1px solid black",
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#f3f3f3",
          }}
        >
          <span style={{ marginRight: "auto" }}>
            {" "}
            자주 사용하는 알람 유형 활용하기
          </span>
          {collapse === false ? (
            <CaretDownOutlined
              style={{ marginRight: "10", fontSize: "20px" }}
              onClick={HanbleChangeCollapse}
            />
          ) : (
            <CaretUpOutlined
              style={{ marginRight: "10", fontSize: "20px" }}
              onClick={HanbleChangeCollapse}
            />
          )}
        </div>
        <Space className="AlarmPreset" style={collapseStyle}>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="CardPreset"
          >
            <Card
              style={{
                width: 300,
                margin: 10,
              }}
            >
              <p>AD(아이콘)</p>
              <br />
              <p>광고 운영 알림 조건</p>
            </Card>
            <Card
              style={{
                width: 300,
                margin: 10,
              }}
            >
              <p> Discover(아이콘)</p>
              <br />
              <p>유입/탐색 알림 조건</p>
            </Card>
            <Card
              style={{
                width: 300,
                margin: 10,
              }}
            >
              <p>Conversion(아이콘)</p>
              <br />
              <p>전환 알림 조건</p>
            </Card>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <table className="ExamTable">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      style={{
                        width: column.width,
                        border: column.border,
                        height: 50,
                        backgroundColor: "#e7e6e6",
                      }}
                      border={column.border}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Examdata.map((item, index) => (
                  <tr key={index}>
                    <td style={ExamTdStyle}>{item.use}</td>
                    <td style={ExamTdStyle}>{item.target}</td>
                    <td style={ExamTdStyle}>{item.exmaple}</td>
                    <td style={ExamTdStyle}>{item.generate()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Space>
      </div>
    </>
  );
};

export default AddAlarm;
