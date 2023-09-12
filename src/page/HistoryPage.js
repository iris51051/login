import {
  Breadcrumb,
  Radio,
  Button,
  Timeline,
  ConfigProvider,
  Input,
  Tabs,
  Form,
} from "antd";
import dayjs from 'dayjs';
import React, { useState } from "react";
import Practice from "../layout/Practice";
import {
  FaFaceFrown,
  FaFaceFrownOpen,
  FaFaceMeh,
  FaFaceSmile,
} from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import "../css/alarm.css";
import { Calendar } from "../components/Common";
import { AlarmCommentDropdown } from "../components/Dropdown";

const options = [
  { label: "기본", value: "basic" },
  { label: "맞춤", value: "custom" },
];
const options2 = [
  { key: "1", label: "Low", value: "low", bg: "green" },
  { key: "2", label: "Medium", value: "medium", bg: "#ffdc29" },
  { key: "3", label: "High", value: "high", bg: "orange" },
  { key: "4", label: "Critical", value: "critical", bg: "red" },
];
const data = [
  {
    time: "2023-08-21 16:00",
    importance: "critical",
    content:
      "매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비 860,000원에서 817,000원으로 5% 감소하였습니다.",
  },
  {
    time: "2023-08-21 13:10",
    importance: "low",
    content:
      "매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비 860,000원에서 817,000원으로 5% 감소하였습니다.",
  },
  {
    time: "2023-08-21 12:55",
    importance: "medium",
    content:
      "매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비 860,000원에서 817,000원으로 5% 감소하였습니다.",
  },
  {
    time: "2023-08-21 10:52",
    importance: "critical",
    content:
      "https://bizspring.co.kr/company/prd_logger.php 페이지가 404오류로 고객 이탈이 일어나고 있습니다.",
  },
];




const HistoryPage = () => {
  const [value1, setValue1] = useState("basic");
  const [stateFilter, setStateFilter] = useState([]);
  const [alarmHistory, setAlarmHistory] = useState(data);
  const [addComment, setAddComment] = useState(false);
  const [form] = Form.useForm();
  const onChange1 = ({ target: { value } }) => {
    setValue1(value);
  };
  //24시간,분
  const now = dayjs(); // 현재 날짜 및 시간 가져오기
  const formatted = now.format('YYYY-MM-DD HH:mm')
  const onFinish = (values) => {
    setAlarmHistory([
      {
        time: formatted,
        importance: "comment",
        content: values.comments,
        name: "서혜정",
      },
      ...alarmHistory,
    ]);
    form.resetFields();
    setAddComment(false);
  };
  const handleStateFilter = (option) => {
    if (stateFilter.includes(option)) {
      setStateFilter(stateFilter.filter((item) => item !== option));
    } else {
      setStateFilter([...stateFilter, option]);
    }
  };
  const filterdData = () => {
    if (stateFilter.length === 0) return alarmHistory;
    else
      return alarmHistory.filter((item) =>
        stateFilter.includes(item.importance)
      );
  };

  const items = filterdData().map((item, index, array) => {
    const iconColors = {
      low: "green",
      medium: "#ffdc29",
      high: "orange",
      critical: "red",
    };
    const iconStyle = {
      border: "2px solid black",
      borderRadius: "50%",
      backgroundColor: "#000",
      color: iconColors[item.importance],
      fontSize: "40px",
      boxShadow: "0 0 5px",
    };
    let icon;
    if (item.importance === "low") {
      icon = <FaFaceSmile style={iconStyle} />;
    } else if (item.importance === "medium") {
      icon = <FaFaceMeh style={iconStyle} />;
    } else if (item.importance === "high") {
      icon = <FaFaceFrownOpen style={iconStyle} />;
    } else if (item.importance === "critical") {
      icon = <FaFaceFrown style={iconStyle} />;
    } else if (item.importance === "comment") {
      icon = (
        <span
          style={{
            height: "40px",
            boxSizing: "border-box",
            borderRadius: "50%",
            width: "40px",
            background: "#eee",
            lineHeight: "40px",
            display: "block",
          }}
        >
          <FaCommentAlt style={{ color: "gray" }} />
        </span>
      );
    }
    const isLastItem = index === array.length - 1;
    return {
      dot: icon,
      label: item.time.split(" ")[1],
      children: (
        <>
          <div
            style={{
              padding: "10px 25px",
              fontSize: "15px",
              background: "#edf1f5",
              // border: "1px solid rgb(221, 221, 221)",
            }}
          >
            {item.importance === "comment" && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>서혜정</span>
                <AlarmCommentDropdown />
              </div>
            )}
            {/* 매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비 860,000원에서
            817,000원으로{" "}
            <span style={{ color: "blue", fontWeight: "bold" }}>5% 감소</span>
            하였습니다. */}
            {item.content}
          </div>
          {isLastItem && (
            <div style={{ marginTop: "20px" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setAddComment((prev) => !prev)}
              >
                <FaCommentAlt style={{ color: "#4096ff" }} />{" "}
                <span style={{ color: "#4096ff", fontWeight: 600 }}>
                  Add a comment
                </span>
              </div>
              {addComment === true && (
                <div
                  style={{
                    width: "300px",
                    marginTop: "10px",
                  }}
                >
                  <Form form={form} onFinish={onFinish}>
                    <Form.Item name="comments" style={{ marginBottom: 0 }}>
                      <Input placeholder="코멘트를 입력하세요" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        size="small"
                        style={{ marginTop: "7px", width: "90px" }}
                        htmlType="submit"
                      >
                        확인
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          )}
        </>
      ),
    };
  });

  return (
    <Practice>
      <div
        style={{
          fontSize: "14px",
          paddingBottom: "0px",
          // marginBottom: "50px",
          marginRight: 0,
          padding: "15px 10px 9px",
          marginLeft: "-25.5px",
        }}
      >
        <div
          // style={{ width: "100%", float: "left", paddingLeft: "15px" }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "15px",
          }}
        >
          <Breadcrumb
            separator=">"
            items={[{ title: "모니터링 알림" }, { title: "히스토리" }]}
            style={{ float: "left" }}
          />
          <div style={{ float: "right" }}>
            <Calendar />
          </div>
        </div>
      </div>
      <div style={{ marginRight: "-15px", marginLeft: "-15px" }}>
        <div
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
            position: "relative",
            minHeight: "1px",
            float: "left",
            width: "100%",
          }}
        >
          {/* 탭 */}
          <Tabs
            type="line"
            items={[
              {
                label: "전체",
                key: "1",
                children: (
                  <div>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#41b3f9",
                          colorBgContainer: "rgb(243, 243, 247)",
                          colorBorder: "rgb(243, 243, 247)",
                        },
                      }}
                    >
                      <Radio.Group
                        options={options}
                        onChange={onChange1}
                        value={value1}
                        optionType="button"
                        buttonStyle="solid"
                      />
                      <Button.Group style={{ marginLeft: "20px" }}>
                        {options2.map((option) => (
                          <Button
                            key={option.value}
                            className={
                              stateFilter.includes(option.value)
                                ? "statefilter-checked"
                                : ""
                            }
                            onClick={() => handleStateFilter(option.value)}
                          >
                            <span style={{ marginRight: "5px" }}>
                              <div
                                style={{
                                  width: 5,
                                  height: 12,
                                  backgroundColor: option.bg,
                                }}
                              />
                            </span>{" "}
                            {option.label}
                          </Button>
                        ))}
                      </Button.Group>
                    </ConfigProvider>
                    <Button type="default" style={{ float: "right" }}>
                      다운로드
                    </Button>
                  </div>
                ),
              },
              {
                label: "네이버 광고",
                key: "2",
              },
            ]}
          />
          {/* <ul
            className="nav"
            style={{ borderBottom: "1px solid #ddd", listStyle: "none" }}
          >
            <li style={{ float: "left" }}>
              <a
                style={{
                  border: "1px solid black",
                  borderBottomColor: "black",
                  borderRadius: "0px",
                  padding: "10px 15px",
                  display: "block",
                  position: "relative",
                }}
              >
                <span>전체</span>
              </a>
            </li>
            <li style={{ float: "left" }}>
              <a
                style={{
                  border: "1px solid black",
                  borderLeft: "0px",
                  borderBottomColor: "black",
                  borderRadius: "0px",
                  padding: "10px 15px",
                  display: "block",
                  position: "relative",
                }}
              >
                <span>네이버 광고</span>
              </a>
            </li>
          </ul> */}
          {/* <div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#41b3f9",
                  colorBgContainer: "rgb(243, 243, 247)",
                  colorBorder: "rgb(243, 243, 247)",
                },
              }}
            >
              <Radio.Group
                options={options}
                onChange={onChange1}
                value={value1}
                optionType="button"
                buttonStyle="solid"
              />
              <Button.Group style={{ marginLeft: "20px" }}>
                {options2.map((option) => (
                  <Button
                    key={option.value}
                    className={
                      stateFilter.includes(option.value)
                        ? "statefilter-checked"
                        : ""
                    }
                    onClick={() => handleStateFilter(option.value)}
                  >
                    <span style={{ marginRight: "5px" }}>
                      <div
                        style={{
                          width: 5,
                          height: 12,
                          backgroundColor: option.bg,
                        }}
                      />
                    </span>{" "}
                    {option.label}
                  </Button>
                ))}
              </Button.Group>
            </ConfigProvider>
            <Button type="default" style={{ float: "right" }}>
              다운로드
            </Button>
          </div> */}
          <div>
            <div id="tab01" style={{ marginTop: "15px" }}>
              <div
                style={{
                  borderBottom: "2px solid #e8e8e8",
                  padding: "10px 25px",
                  fontSize: "15px",
                  fontWeight: 600,
                  background: "rgb(243, 243, 247)",
                  marginBottom: "30px",
                }}
              >
                2023-08-21
              </div>
              <ConfigProvider
                theme={{ components: { Timeline: { dotBorderWidth: 0 } } }}
              >
                <Timeline
                  mode="left"
                  style={{ padding: "10px 25px" }}
                  // items={[
                  //   {},
                  //   {
                  //     dot: (
                  //       <FaFaceFrown
                  //         style={{
                  //           border: "2px solid black",
                  //           borderRadius: "50%",
                  //           backgroundColor: "#000",
                  //           color: "red",
                  //           fontSize: "40px",
                  //           boxShadow: "0 0 5px",
                  //         }}
                  //       />
                  //     ),
                  //     label: "10:00",
                  //     children: (
                  //       <div
                  //         style={{
                  //           padding: "10px 25px",
                  //           fontSize: "15px",
                  //           background: "#edf1f5",
                  //           border: "1px solid rgb(221, 221, 221)",
                  //         }}
                  //       >
                  //         매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비
                  //         860,000원에서 817,000원으로{" "}
                  //         <span style={{ color: "blue", fontWeight: "bold" }}>
                  //           5% 감소
                  //         </span>
                  //         하였습니다.
                  //       </div>
                  //     ),
                  //   },
                  //   {
                  //     dot: (
                  //       <FaFaceSmile
                  //         style={{
                  //           border: "2px solid black",
                  //           borderRadius: "50%",
                  //           backgroundColor: "#000",
                  //           color: "green",
                  //           fontSize: "40px",
                  //           boxShadow: "0 0 5px",
                  //         }}
                  //       />
                  //     ),
                  //     label: "11:10",
                  //     children: (
                  //       <div
                  //         style={{
                  //           padding: "10px 25px",
                  //           fontSize: "15px",
                  //           background: "#edf1f5",
                  //           border: "1px solid rgb(221, 221, 221)",
                  //         }}
                  //       >
                  //         매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비
                  //         860,000원에서 817,000원으로{" "}
                  //         <span style={{ color: "blue", fontWeight: "bold" }}>
                  //           5% 감소
                  //         </span>
                  //         하였습니다.
                  //       </div>
                  //     ),
                  //   },
                  //   {
                  //     dot: (
                  //       <FaFaceMeh
                  //         style={{
                  //           border: "2px solid black",
                  //           borderRadius: "50%",
                  //           backgroundColor: "#000",
                  //           color: "#ffdc29",
                  //           fontSize: "40px",
                  //           boxShadow: "0 0 5px",
                  //         }}
                  //       />
                  //     ),
                  //     label: "12:55",
                  //     children: (
                  //       <div
                  //         style={{
                  //           padding: "10px 25px",
                  //           fontSize: "15px",
                  //           background: "#edf1f5",
                  //           border: "1px solid rgb(221, 221, 221)",
                  //         }}
                  //       >
                  //         매출액이 지난주 월요일(동일 요일 & 동일 시간) 대비
                  //         860,000원에서 817,000원으로{" "}
                  //         <span style={{ color: "blue", fontWeight: "bold" }}>
                  //           5% 감소
                  //         </span>
                  //         하였습니다.
                  //       </div>
                  //     ),
                  //   },
                  //   {
                  //     dot: (
                  //       <FaFaceFrown
                  //         style={{
                  //           border: "2px solid black",
                  //           borderRadius: "50%",
                  //           backgroundColor: "#000",
                  //           color: "red",
                  //           fontSize: "40px",
                  //           boxShadow: "0 0 5px",
                  //         }}
                  //       />
                  //     ),
                  //     label: "13:00",
                  //     children: (
                  //       <div
                  //         style={{
                  //           padding: "10px 25px",
                  //           fontSize: "15px",
                  //           background: "#edf1f5",
                  //           border: "1px solid rgb(221, 221, 221)",
                  //         }}
                  //       >
                  //         <a
                  //           style={{
                  //             color: "-webkit-link",
                  //             textDecoration: "underline",
                  //           }}
                  //         >
                  //           https://bizspring.co.kr/company/prd_logger.php
                  //         </a>{" "}
                  //         <span style={{ color: "red", fontWeight: "bold" }}>
                  //           페이지가 404오류
                  //         </span>
                  //         로 고객 이탈이 일어나고 있습니다.
                  //       </div>
                  //     ),
                  //   },
                  //   {
                  //     dot: (
                  //       <span
                  //         style={{
                  //           height: "40px",
                  //           boxSizing: "border-box",
                  //           borderRadius: "50%",
                  //           width: "40px",
                  //           background: "#eee",
                  //           lineHeight: "40px",
                  //           display: "block",
                  //         }}
                  //       >
                  //         <FaCommentAlt style={{ color: "gray" }} />
                  //       </span>
                  //     ),
                  //     label: "13:50",
                  //     children: (
                  //       <>
                  //         <div
                  //           style={{
                  //             padding: "10px 25px",
                  //             fontSize: "15px",
                  //             background: "#edf1f5",
                  //             border: "1px solid rgb(221, 221, 221)",
                  //           }}
                  //         >
                  //           <div
                  //             style={{
                  //               display: "flex",
                  //               justifyContent: "space-between",
                  //             }}
                  //           >
                  //             <span style={{ fontWeight: "bold" }}>서혜정</span>

                  //             <AlarmCommentDropdown />
                  //           </div>
                  //           404 페이지 조치 완료
                  //         </div>
                  //         <div style={{ marginTop: "20px" }}>
                  //           <div
                  //             style={{ cursor: "pointer" }}
                  //             onClick={() => setAddComment((prev) => !prev)}
                  //           >
                  //             <FaCommentAlt style={{ color: "#4096ff" }} />{" "}
                  //             <span
                  //               style={{ color: "#4096ff", fontWeight: 600 }}
                  //             >
                  //               Add a comment
                  //             </span>
                  //           </div>
                  //           {addComment === true && (
                  //             <div
                  //               style={{
                  //                 width: "300px",
                  //                 marginTop: "10px",
                  //               }}
                  //             >
                  //               <Input placeholder="코멘트를 입력하세요" />
                  //               <Button
                  //                 type="primary"
                  //                 size="small"
                  //                 style={{ marginTop: "7px", width: "90px" }}
                  //               >
                  //                 확인
                  //               </Button>
                  //             </div>
                  //           )}
                  //         </div>
                  //       </>
                  //     ),
                  //   },
                  // ]}
                  items={items}
                />
              </ConfigProvider>
            </div>
            <div id="tab02"></div>
          </div>
        </div>
      </div>
    </Practice>
  );
};

export default HistoryPage;
