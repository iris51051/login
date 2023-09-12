import React, { useState } from "react";
import { Modal, Divider, Checkbox, Button, Input } from "antd";
import { TiDelete } from "react-icons/ti";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const SelectTargetModal = ({
  isModalOpen,
  targetList,
  setTargetList,
  handleClose,
}) => {
  const campaign = [
    "01.비즈스프링 통합 키워드광고",
    "02.AMP(광고관리플랫폼)",
    "03.브랜드커넥트_로거포바이럴",
    "1. 솔루션",
    "2. 데이터",
    "로거_로그분석_브랜드",
    "파워링크#1",
    "파워링크#2",
    "01.비즈스프링 통합 키워드광고",
    "02.AMP(광고관리플랫폼)",
    "03.브랜드커넥트_로거포바이럴",
    "1. 솔루션",
    "2. 데이터",
    "로거_로그분석_브랜드",
    "파워링크#1",
    "파워링크#2",
  ];
  const adgroup = [
    "01.Analytics",
    "02.Attribution",
    "03.광고관리/마케팅",
    "04.로거",
    "05.바이럴",
    "06.AD Management",
    "07.매체통합리포트",
    "08.부정클릭",
    "09.테스트",
    "10.테스트2",
    "11.테스트3",
  ];
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const handleCampaignClick = (index) => setSelectedCampaign(index);
  const [checkedList, setCheckedList] = useState([]);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [searchAdgroup, setSearchAdgroup] = useState("");
  const filterCampaignData = [...campaign].filter((data) => {
    if (searchCampaign === "") return data;
    else if (data.toLowerCase().includes(searchCampaign.toLowerCase()))
      return data;
  });
  const filterAdgroupData = [...adgroup].filter((data) => {
    if (searchAdgroup === "") return data;
    else if (data.toLowerCase().includes(searchAdgroup.toLowerCase()))
      return data;
  });

  const handleCheckboxChange = (item) => {
    if (checkedList.includes(item))
      setCheckedList(checkedList.filter((adGroup) => adGroup !== item));
    else setCheckedList([...checkedList, item]);
  };
  const handleDeleteCheckbox = (item) => {
    setCheckedList(checkedList.filter((adGroup) => adGroup !== item));
  };
  const handleDeleteAll = () => setCheckedList([]);
  const handleSave = () => {
    setTargetList([...checkedList]);
    handleClose();
  };
  const handleReset = () => {
    if (targetList.length === 0) {
      setCheckedList([]);
      setSelectedCampaign(null);
    } else {
      setCheckedList(targetList);
    }
    handleClose();
  };
  return (
    <Modal
      title="캠페인 > 광고그룹"
      className="target-modal"
      open={isModalOpen}
      onCancel={handleReset}
      zIndex={2000}
      width={1200}
      footer={[
        <Button key="ok" type="primary" onClick={handleSave}>
          저장 후 닫기
        </Button>,
        <Button key="cancel" type="default" onClick={handleReset}>
          취소
        </Button>,
      ]}
    >
      <div style={{ display: "flex" }}>
        <div>
          <div style={{ fontSize: "12px", color: "gray" }}>캠페인</div>
          <ul
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "12px",
              minWidth: "350px",
              display: "block",
              paddingBottom: "0px",
              marginTop: "5px",
              paddingLeft: 0,
              height: "425.84px",
            }}
          >
            <li style={{ display: "block" }}>
              <div
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#263238",
                  fontSize: "12px",
                }}
              >
                <Input
                  placeholder="검색"
                  prefix={<FiSearch />}
                  onChange={(e) => setSearchCampaign(e.target.value)}
                />
              </div>
            </li>
            <li style={{ display: "block" }}>
              <div
                className="target-center"
                style={{
                  maxHeight: "380px",
                  overflow: "hidden scroll",
                }}
                onScroll={(e) => e.preventDefault()}
              >
                {filterCampaignData.map((item, index) => (
                  <a
                    onClick={() => handleCampaignClick(index)}
                    style={{
                      borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                      display: "block",
                      padding: "8px 20px 8px",
                      background:
                        selectedCampaign === index ? "#edf1f5" : "transparent",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          display: "block",
                          margin: "5px 0",
                          color: "#263238",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "gray" }}>광고그룹</div>
          <ul
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "12px",
              minWidth: "350px",
              display: "block",
              paddingBottom: "0px",
              marginTop: "5px",
              paddingLeft: 0,
              height: "425.84px",
            }}
          >
            <li style={{ display: "block" }}>
              <div
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#263238",
                  fontSize: "12px",
                }}
              >
                <Input
                  placeholder="검색"
                  prefix={<FiSearch />}
                  onChange={(e) => setSearchAdgroup(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#263238",
                  fontSize: "12px",
                  padding: "11px 20px 11.84px",
                }}
              >
                <Checkbox
                  checked={checkedList.length === adgroup.length}
                  onChange={() => {
                    if (checkedList.length === adgroup.length)
                      setCheckedList([]);
                    else setCheckedList(adgroup);
                  }}
                  style={{ marginRight: "5px" }}
                />
                전체 광고그룹
              </div>
            </li>
            <li style={{ display: "block" }}>
              <div
                className="target-center"
                style={{
                  maxHeight: "330px",
                  overflow: "hidden scroll",
                }}
                onScroll={(e) => e.preventDefault()}
              >
                {filterAdgroupData.map((item, index) => (
                  <a
                    style={{
                      borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                      display: "block",
                      padding: "6.4px 20px",
                      background: checkedList.includes(item)
                        ? "#edf1f5"
                        : "transparent",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        float: "left",
                        position: "relative",
                      }}
                    ></div>
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          display: "block",
                          margin: "5px 0",
                          color: "#263238",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Checkbox
                          key={item}
                          checked={checkedList.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                          style={{ marginRight: "5px" }}
                        />
                        {item}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <Divider
          type="vertical"
          style={{ height: "400px", marginLeft: "30px", marginRight: "30px" }}
        />
        <div>
          <div style={{ fontSize: "12px", color: "gray" }}>
            총 <span style={{ color: "blue" }}>{checkedList.length}</span>개
            선택
            <a
              style={{ float: "right", color: "#41b3f9" }}
              onClick={handleDeleteAll}
            >
              모두 지우기
            </a>
          </div>
          <ul
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "12px",
              minWidth: "350px",
              display: "block",
              paddingBottom: "0px",
              marginTop: "5px",
              paddingLeft: 0,
              height: "425.84px",
              marginBottom: 0,
            }}
          >
            <li style={{ display: "block" }}>
              <div
                className="selected-target"
                style={{
                  maxHeight: "420px",
                  overflow: "hidden scroll",
                }}
                onScroll={(e) => e.preventDefault()}
              >
                {checkedList.map((item, index) => (
                  <a
                    style={{
                      borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                      display: "block",
                      padding: "8px 20px 8px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          display: "block",
                          margin: "5px 0",
                          color: "#263238",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item}
                        <span style={{ float: "right" }}>
                          <TiDelete
                            style={{ width: "1.5em", height: "1.5em" }}
                            onClick={() => handleDeleteCheckbox(item)}
                          />
                        </span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </li>
          </ul>
          <div style={{ float: "right", fontSize: "12px" }}>
            {checkedList.length}/100
          </div>
        </div>
      </div>
      <span style={{ fontSize: "12px", color: "gray" }}>
        <BsFillExclamationCircleFill />
        알람 대상은 최대 100개까지 설정 가능합니다.
      </span>
    </Modal>
  );
};

export default SelectTargetModal;
