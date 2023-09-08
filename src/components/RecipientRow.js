import React from "react";
import { Input, Button, Space } from "antd";
import { FaPlus, FaMinus } from "react-icons/fa";

const RecipientRow = ({
  recipient,
  onRecipientChange,
  onAddRecipient,
  onDeleteRecipientRow,
}) => {
  const { id, name, katalkId, email } = recipient;
  const handleNameChange = (e) => onRecipientChange(id, "name", e.target.value);
  const handleKatalkIdChange = (e) =>
    onRecipientChange(id, "katalkId", e.target.value);
  const handleEmailChange = (e) =>
    onRecipientChange(id, "email", e.target.value);
  const handleDeleteRow = () => {
    if (recipient.id === 1) {
      onRecipientChange(recipient.id, "name", "");
      onRecipientChange(recipient.id, "katalkId", "");
      onRecipientChange(recipient.id, "email", "");
    } else {
      onDeleteRecipientRow(recipient.id);
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <div className="recipient-row">
        <div
          style={{
            float: "left",
            paddingRight: "0px",
            marginBottom: "5px",
            width: "13.33333333%",
          }}
        >
          <Input placeholder="이름" value={name} onChange={handleNameChange} />
        </div>
        <div
          style={{
            float: "left",
            paddingRight: "0px",
            marginBottom: "5px",
            width: "23.33333333%",
            paddingLeft: "15px",
          }}
        >
          <Input
            placeholder="카카오톡 아이디"
            value={katalkId}
            onChange={handleKatalkIdChange}
          />
        </div>
        <div
          style={{
            float: "left",
            paddingRight: "0px",
            marginBottom: "5px",
            width: "23.33333333%",
            paddingLeft: "15px",
          }}
        >
          <Input
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div
          style={{
            float: "left",
            paddingRight: "0px",
            paddingLeft: "15px",
          }}
        >
          <Button
            style={{ padding: "5px 10px", height: "28px" }}
            onClick={handleDeleteRow}
          >
            <FaMinus style={{ marginBottom: "6px" }} />
          </Button>
        </div>
        <div
          style={{
            float: "left",
            paddingRight: "0px",
            paddingLeft: "5px",
          }}
        >
          <Button
            className="plus-btn"
            style={{ padding: "5px 10px", height: "28px", display: "none" }}
            onClick={onAddRecipient}
          >
            <FaPlus style={{ color: "red", marginBottom: "6px" }} />
          </Button>
        </div>
      </div>
    </Space>
  );
};

export default RecipientRow;
