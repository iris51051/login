import React, { useState } from "react";
import { Dropdown } from "antd";
import { IoMdPerson } from "react-icons/io";
import { TfiCrown } from "react-icons/tfi";
import { FiPower } from "react-icons/fi";
import "../css/pageLayout.css";
import LoginModal from "./LoginModal";

export const UserDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showLoginModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      label: (
        <a>
          <IoMdPerson style={{ verticalAlign: "middle" }} />
          &nbsp; My Account
        </a>
      ),
      key: "account",
    },
    {
      label: (
        <a>
          <TfiCrown style={{ verticalAlign: "middle" }} />
          &nbsp; Admin
        </a>
      ),
      key: "admin",
    },
    {
      label: <div className="separator"></div>,
      key: "divider",
    },
    {
      label: (
        <a>
          <FiPower style={{ verticalAlign: "middle" }} />
          &nbsp; Log Out
        </a>
      ),
      key: "logout",
      onClick: () => {
        showLoginModal();
      },
    },
  ];
  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ minWidth: "280px" }}
      >
        <ul className="nav navbar-top-links navbar-right pull-right">
          <li>
            <a className="profile-pic" onClick={(e) => e.preventDefault()}>
              <img
                src="http://queendesign.bizspring.co.kr/GP/img/profile.svg"
                alt="user-img"
                width={30}
                className="img-circle"
              ></img>
              <b className="hidden-xs">서혜정</b>
              <span className="caret"></span>
            </a>
          </li>
        </ul>
      </Dropdown>
      <LoginModal isModalOpen={isModalOpen} handleOk={handleOk} />
    </>
  );
};
