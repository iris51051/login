import React, { useState } from "react";
import Practice from "../layout/Practice";
import { Button, Table, Select, Input, Breadcrumb, Form } from "antd";
import "../css/alarm.css";
import { ManageDropdown } from "../components/Dropdown";
import RecipientRow from "../components/RecipientRow";
const { Search } = Input;

export const AlarmPage = () => {
  // const [form] = Form.useForm();
  const [onOff, setOnOff] = useState(true);
  const [addGroup, setAddGroup] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 10, showSizeChanger: false },
    sorter: { field: "", order: "" },
  });
  const { sorter } = tableParams;
  const columns = [
    {
      title: "수신자 그룹명",
      key: "groupNm",
      dataIndex: "groupNm",
      sorter: true,
      align: "center",
    },
    {
      title: "수신자",
      key: "recipient",
      dataIndex: "recipient",
      align: "center",
    },
    {
      title: "생성자",
      key: "constructor",
      dataIndex: "constructor",
      align: "center",
    },
    { title: "생성 일시", key: "datetime", align: "center" },
    {
      title: "관리",
      key: "management",
      align: "center",
      render: () => <ManageDropdown />,
    },
  ];
  const dataSource = [];
  for (let i = 0; i < 100; i++) {
    const dummyObj = {
      key: i,
      groupNm: `마케팅${i}팀`,
      constructor: "김서연",
    };
    dataSource.push(dummyObj);
  }
  let sortedData = [...dataSource];
  if (sorter.field && sorter.order) {
    sortedData = [...dataSource].sort((a, b) => {
      const isAsc = sorter.order === "ascend";
      const compareResult = a[sorter.field].localeCompare(b[sorter.field]);
      return isAsc ? compareResult : -compareResult;
    });
  }

  const handlePageSize = (selectedOption) => {
    setTableParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current: 1,
        pageSize: selectedOption,
      },
    }));
  };
  const handleTableChange = (pagination, _, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
      sorter: { field: sorter.field, order: sorter.order },
    });
  };
  const filterdData = sortedData.filter((row) => {
    if (searchText == "") return row;
    else if (
      row.groupNm.toLowerCase().includes(searchText.toLowerCase()) ||
      row.constructor.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return row;
    }
  });
  const initialRecipientData = [
    {
      id: 1,
      name: "",
      katalkId: "",
      email: "",
    },
  ];
  const [recipientData, setRecipientData] = useState(initialRecipientData);

  const handleCheckedChange = () => {
    setOnOff((prevValue) => !prevValue);
  };

  const handleAddGroup = () => {
    setAddGroup(!addGroup);
    setRecipientData(initialRecipientData);
    console.log(recipientData);
  };
  const handleRecipientChange = (id, field, value) => {
    setRecipientData((prevData) =>
      prevData.map((recipient) =>
        recipient.id === id ? { ...recipient, [field]: value } : recipient
      )
    );
  };
  const handleAddRecipientRow = () => {
    setRecipientData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        name: "",
        katalkId: "",
        email: "",
      },
    ]);
  };
  const handleDeleteRecipientRow = (id) => {
    if (id === 1) {
      setRecipientData((prevData) => [
        {
          id: 1,
          name: "",
          katalkId: "",
          email: "",
        },
        ...prevData.slice(1),
      ]);
    } else {
      setRecipientData((prevData) =>
        prevData
          .filter((recipient) => recipient.id !== id)
          .map((recipient, index) => ({ ...recipient, id: index + 1 }))
      );
    }
  };

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
              { title: "알림 수신자 설정" },
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
          {" "}
          {addGroup ? (
            <>
              <table className="custom_table font12">
                <colgroup>
                  <col width="10%"></col>
                  <col width="90%"></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>수신자 그룹명</th>
                    <td>
                      <Input
                        placeholder="수신자 그룹명을 입력하세요."
                        style={{ width: "60%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>수신자</th>
                    <td id="recipient_reg_div">
                      {recipientData.map((recipient, index) => (
                        <RecipientRow
                          key={recipient.id}
                          recipient={recipient}
                          onRecipientChange={handleRecipientChange}
                          onAddRecipient={
                            index === recipientData.length - 1
                              ? handleAddRecipientRow
                              : undefined
                          }
                          onDeleteRecipientRow={handleDeleteRecipientRow}
                        />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                className="fr"
                style={{ paddingTop: "15px", justifyContent: "space-between" }}
              >
                <Button type="default" onClick={handleAddGroup}>
                  취소
                </Button>
                <Button
                  type="primary"
                  onClick={handleAddGroup}
                  style={{ marginLeft: "8px" }}
                >
                  저장
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="fl">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#41b3f9",
                    padding: "5px 10px",
                    float: "left",
                    fontSize: "12px",
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                    zIndex: 1,
                  }}
                  onClick={handleAddGroup}
                >
                  수신자 그룹 등록
                </Button>
                {/* <ReceiverEnrollModal
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
            /> */}
                <Button
                  type="default"
                  style={{
                    padding: "5px 10px",
                    float: "left",
                    fontSize: "12px",
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                    zIndex: 1,
                  }}
                >
                  삭제
                </Button>
                <div className="can-toggle" style={{ marginRight: "10px" }}>
                  <input
                    id="vat_tobble_switch"
                    type="checkbox"
                    checked={onOff}
                    onChange={(e) => setOnOff(e.target.checked)}
                  />
                  <label htmlFor="vat_toggle_swtich">
                    <div
                      className="can-toggle__switch"
                      data-checked="ON"
                      data-unchecked="OFF"
                      onClick={handleCheckedChange}
                    ></div>
                  </label>
                </div>
              </div>
              <div className="fr">
                <Select
                  defaultValue={{ value: 10, label: "10" }}
                  options={[
                    { value: 10, label: "10" },
                    { value: 25, label: "25" },
                    { value: 50, label: "50" },
                    { value: 100, label: "100" },
                  ]}
                  style={{ width: 80, float: "right" }}
                  onChange={handlePageSize}
                ></Select>
                <div style={{ float: "left", marginRight: "10px" }}>
                  <Search
                    onChange={(event) => setSearchText(event.target.value)}
                  />
                </div>
              </div>
              <div>
                <Table
                  rowSelection={{ type: "checkbox" }}
                  dataSource={filterdData}
                  columns={columns}
                  pagination={tableParams.pagination}
                  style={{ paddingTop: "6px" }}
                  onChange={handleTableChange}
                />
              </div>
            </>
          )}
          {/* <div className="fl">
            <Button
              type="primary"
              style={{
                backgroundColor: "#41b3f9",
                padding: "5px 10px",
                float: "left",
                fontSize: "12px",
                position: "relative",
                display: "inline-block",
                marginRight: "10px",
                zIndex: 1,
              }}
              onClick={handleAddGroup}
            >
              수신자 그룹 등록
            </Button>
            {/* <ReceiverEnrollModal
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
            /> */}
          {/* <Button
              type="default"
              style={{
                padding: "5px 10px",
                float: "left",
                fontSize: "12px",
                position: "relative",
                display: "inline-block",
                marginRight: "10px",
                zIndex: 1,
              }}
            >
              삭제
            </Button>
            <div className="can-toggle" style={{ marginRight: "10px" }}>
              <input
                id="vat_tobble_switch"
                type="checkbox"
                checked={onOff}
                onChange={(e) => setOnOff(e.target.checked)}
              />
              <label htmlFor="vat_toggle_swtich">
                <div
                  className="can-toggle__switch"
                  data-checked="ON"
                  data-unchecked="OFF"
                  onClick={handleCheckedChange}
                ></div>
              </label>
            </div>
          </div>
          <div className="fr">
            <Select
              defaultValue={{ value: 10, label: "10" }}
              options={[
                { value: 10, label: "10" },
                { value: 25, label: "25" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
              style={{ width: 80, float: "right" }}
            ></Select>
            <div style={{ float: "left", marginRight: "10px" }}>
              <Search />
            </div>
          </div>
          <div>
            <Table
              rowSelection={{ type: "checkbox" }}
              dataSource={dataSource}
              columns={columns}
              style={{ paddingTop: "6px" }}
            />
          </div> */}{" "}
        </div>
      </div>
    </Practice>
  );
};
