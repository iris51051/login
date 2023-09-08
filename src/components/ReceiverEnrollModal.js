import React from "react";
import { Modal, Input } from "antd";

const ReceiverEnrollModal = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title="수신자 그룹 등록"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      // afterClose={handleAfterClose}
      okText="저장"
      cancelText="취소"
      zIndex={2000}
    >
      <table className="layer_pop_table font12">
        <colgroup>
          <col width="30%"></col>
          <col width="70%"></col>
        </colgroup>
        <tbody>
          <tr>
            <th>수신자 그룹명</th>
            <td>
              <Input placeholder="수신자 그룹명을 입력하세요"></Input>
            </td>
          </tr>
          <tr>
            <th>수신자</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default ReceiverEnrollModal;
