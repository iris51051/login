import React, { useEffect, useState } from "react";
import Practice from "../layout/Practice";
import {
  ConfigProvider,
  Radio,
  Select,
  Input,
  InputNumber,
  Breadcrumb,
  Checkbox,
  Slider,
  Space,
  Divider,
  Tooltip,
  Button,
  Form,
} from "antd";
import {
  FaFaceFrown,
  FaFaceFrownOpen,
  FaFaceMeh,
  FaFaceSmile,
} from "react-icons/fa6";
import "../css/alarm.css";
import AlarmPanel from "../components/AlarmPanel";
import SelectTargetModal from "../components/SelectTargetModal";

const NewAlarm = () => {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState();
  const handleRadioChange = (e) => setRadioValue(e.target.value);
  const [targetList, setTargetList] = useState([]);
  // const updateTargetList = (updatedData) => {
  //   setTargetList(updatedData);
  //   console.log(updatedData);
  // };
  const options = [
    { label: "이메일 받기", value: "email" },
    { label: "카카오톡으로 알림 받기", value: "kakao" },
  ];
  const hourCycle = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour < 10 ? `0${hour}시` : `${hour}시`;
    const dummyObj = {
      value: hour,
      label: formattedHour,
    };
    hourCycle.push(dummyObj);
  }

  const [selectedHour, setSelectedHour] = useState();
  const valueToHour = (value) => {
    const hour = value >= 0 && value < 3 ? value + 22 : `0${value - 2}`;
    return `${hour}시`;
  };
  const handleSliderChange = (value) => setSelectedHour(value);
  const [importance, setImportance] = useState("");
  const importanceData = [
    {
      value: "low",
      title: "low",
      icon: (
        <FaFaceSmile
          className={importance === "low" ? "face-active" : ""}
          style={{ color: "green", fontSize: "25PX" }}
        />
      ),
    },
    {
      value: "medium",
      title: "medium",
      icon: (
        <FaFaceMeh
          className={importance === "medium" ? "face-active" : ""}
          style={{ color: "#ffdc29", fontSize: "25PX" }}
        />
      ),
    },
    {
      value: "high",
      title: "high",
      icon: (
        <FaFaceFrownOpen
          className={importance === "high" ? "face-active" : ""}
          style={{ color: "orange", fontSize: "25PX" }}
        />
      ),
    },
    {
      value: "critical",
      title: "critical",
      icon: (
        <FaFaceFrown
          className={importance === "critical" ? "face-active" : ""}
          style={{ color: "red", fontSize: "25PX" }}
        />
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showTargetModal = () => setIsModalOpen(true);
  const handleClose = () => {
    // console.log(targetList);
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    // submit
    console.log(values);
  };

  console.log(targetList);
  return (
    <Practice>
      <div
        style={{
          fontSize: "14px",
          paddingBottom: "0px",
          marginBottom: "50px", // 임시
          marginRight: 0,
          padding: "15px 10px 9px",
          marginLeft: "-25.5px",
        }}
      >
        <div style={{ width: "50%", float: "left", paddingLeft: "15px" }}>
          <Breadcrumb
            separator=">"
            items={[
              { title: "모니터링 알림" },
              { title: "알림 설정" },
              { title: "새 알림 등록" },
            ]}
          />
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
          <AlarmPanel />
          <Form
            form={form}
            onFinish={onFinish}
            // initialValues={{ target: { targetList } }}
          >
            <table className="custom_table font12">
              <colgroup>
                <col width="10%"></col>
                <col width="90%"></col>
              </colgroup>
              <tbody>
                <tr>
                  <th>알림 그룹</th>
                  <td>
                    <Form.Item
                      name="alarmgroup"
                      // rules={[{ required: true }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input style={{ width: "60%" }} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>알림 이름</th>
                  <td>
                    <Form.Item name="alarmNm" style={{ marginBottom: 0 }}>
                      <Input style={{ width: "60%" }} />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>알림 유형</th>
                  <td>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#41b3f9",
                        },
                      }}
                    >
                      <Form.Item name="alarm-type" style={{ marginBottom: 0 }}>
                        <Radio.Group
                          onChange={handleRadioChange}
                          value={radioValue}
                        >
                          <Radio value="ad">광고 운영</Radio>
                          <Radio value="discover">유입/탐색</Radio>
                          <Radio value="conversion">전환 데이터</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </ConfigProvider>
                  </td>
                </tr>
                {radioValue === "ad" && (
                  <>
                    <tr>
                      <td colSpan="2">
                        <div
                          style={{
                            display: "flex",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          <div
                            style={{
                              //   borderRight: "2px solid gray",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 10px",
                                fontWeight: "bold",
                              }}
                            >
                              [사이트명] 도메인 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                          <Divider type="vertical" style={{ height: "60px" }} />
                          <div
                            style={{
                              // borderRight: "2px solid gray",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{ margin: "0 0 10px", fontWeight: "bold" }}
                            >
                              광고 매체사 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                          <Divider type="vertical" style={{ height: "60px" }} />
                          <div
                            style={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <p
                              style={{ margin: "0 0 10px", fontWeight: "bold" }}
                            >
                              알림 대상 선택
                            </p>
                            <Select size="small" style={{ width: 130 }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>대상</th>
                      <td>
                        <p style={{ margin: "0 0 10px" }}>
                          알림을 설정할 대상을 선택하세요.(최대 100개 선택)
                        </p>
                        <SelectTargetModal
                          isModalOpen={isModalOpen}
                          targetList={targetList}
                          setTargetList={setTargetList}
                          handleClose={handleClose}
                        />
                        <Form.Item
                          name="target"
                          // value={targetList}
                          valuePropName="target"
                          style={{ marginBottom: 0 }}
                        >
                          <Input
                            style={{ width: "60%" }}
                            onClick={showTargetModal}
                            value={targetList}
                          />
                        </Form.Item>
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>실행 유형</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 실행 조건이 도달했을 때, 실행할 작업을 선택하세요.
                    </p>
                    <Form.Item
                      name="execution-type"
                      initialValue={["email", "kakao"]}
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox.Group
                        options={options}
                        // defaultValue={["email", "kakao"]}
                      />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>조건</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 실행 조건인 비교 데이터 기간을 선택하세요.
                    </p>
                    <Select
                      size="small"
                      style={{ width: 120, marginBottom: "10px" }}
                    />
                    <p style={{ margin: "0 0 10px" }}>
                      항목은 최대 2개까지 설정할 수 있습니다.
                    </p>
                    <div>
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                      />
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                      />
                      <Input style={{ width: 120, marginRight: "8px" }} />
                      <Button size="small">+ 삭제</Button>
                    </div>
                    <div>
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                      />
                      <Select
                        size="small"
                        style={{
                          width: 120,
                          marginBottom: "10px",
                          marginRight: "8px",
                        }}
                      />
                      <Input style={{ width: 120, marginRight: "8px" }} />
                      <Button size="small">+ 삭제</Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>실행 주기</th>
                  <td>
                    <p style={{ margin: "0 0 10px" }}>
                      알림 설정이 실행될 빈도와 시간대를 설정합니다.
                    </p>{" "}
                    <Space wrap>
                      <Form.Item
                        name={["execution-cycle", "cycle"]}
                        initialValue="day"
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={[
                            { value: "day", label: "매일" },
                            { value: "week", label: "매주" },
                            { value: "month", label: "매월" },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["execution-cycle", "time"]}
                        initialValue={9}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          size="small"
                          style={{ width: 120 }}
                          options={hourCycle}
                        />
                      </Form.Item>
                      <Form.Item
                        name={["execution-cycle", "excluding-weekends"]}
                        valuePropName="checked"
                        initialValue="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>주말 제외</Checkbox>
                      </Form.Item>
                    </Space>
                  </td>
                </tr>
                <tr>
                  <th>에티켓 시간</th>
                  <td>
                    <div style={{ display: "flex" }}>
                      <ConfigProvider
                        theme={{
                          components: {
                            Slider: {
                              railSize: 10,
                              handleSize: 8,
                              handleSizeHover: 8,
                              handleActiveColor: "#4ed8ba",
                            },
                          },
                        }}
                      >
                        <Form.Item
                          name="etiquette"
                          style={{ marginBottom: 0, width: "50%" }}
                        >
                          <Slider
                            className="etiquette"
                            marks={{
                              0: {
                                style: { fontSize: "12px", left: "1%" },
                                label: "22시",
                              },

                              9: {
                                style: { fontSize: "12px" },
                                label: "07시",
                              },
                            }}
                            max={9}
                            min={0}
                            tooltip={{
                              formatter: valueToHour,
                            }}
                            onChange={handleSliderChange}
                            style={{ margin: "0px 5px", marginBottom: "15px" }}
                          />
                        </Form.Item>
                      </ConfigProvider>

                      <div
                        style={{
                          color: "#41b3f9",
                          marginLeft: "30px",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        {valueToHour(selectedHour) === "0NaN시"
                          ? ""
                          : valueToHour(selectedHour)}
                        까지 알림 발송
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>중요도(심각도)</th>
                  <td>
                    <Form.Item name="importance" style={{ marginBottom: 0 }}>
                      <Radio.Group
                        className="importance"
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                      >
                        {importanceData.map((item) => (
                          <Tooltip key={item.value} title={item.title}>
                            <Radio.Button value={item.value}>
                              {item.icon}
                            </Radio.Button>
                          </Tooltip>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <th>수신자 설정</th>
                  <td>
                    <Form.Item name="recipient" style={{ marginBottom: 0 }}>
                      <Input
                        placeholder="수신자 그룹 선택 또는 입력"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                console.log()
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Practice>
  );
};

export default NewAlarm;
