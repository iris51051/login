import React, { useState } from "react";
import { Button, Dropdown } from "antd";
import Icon from "@mdi/react";
import { mdiBell, mdiApps } from "@mdi/js";
import { IoMdPerson } from "react-icons/io";
import { TfiCrown } from "react-icons/tfi";
import { FiPower } from "react-icons/fi";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import Swal from "sweetalert2";
import "animate.css";
import "../css/pageLayout.css";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

export const GnbNotiDropdown = () => {
  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ minWidth: "280px" }}
        dropdownRender={() => (
          <ul
            className="animate__animated animate__bounceInDown"
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "14px",
              position: "absolute",
              top: "100%",
              right: 0,
              left: "auto",
              zIndex: 1000,
              minWidth: "280px",
              display: "block",
              // paddingBottom: "8px",
              marginTop: "18px",
              paddingLeft: 0,
            }}
          >
            <li style={{ display: "block" }}>
              <div
                className="message-center"
                style={{
                  maxHeight: "450px",
                  overflow: "hidden scroll",
                }}
              >
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img
                      src="http://queendesign.bizspring.co.kr/GP/img/bell-gray.png"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        margin: "0px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        color: "#888 !important",
                        fontSize: "14px",
                      }}
                    >
                      새로운 알림이 없습니다.
                    </h5>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Icon path={mdiBell} size={0.7} color="#686868" />
        </a>
      </Dropdown>
    </>
  );
};

export const AppsDropdown = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Login",
      key: 1,
    },
    { label: "Login1", key: 2 },
    { label: "Login2", key: 3 },
  ];
  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ minWidth: "280px" }}
        dropdownRender={() => (
          <ul
            className="animate__animated animate__bounceInDown"
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "14px",
              position: "absolute",
              top: "100%",
              right: 0,
              left: "auto",
              zIndex: 1000,
              minWidth: "280px",
              display: "block",
              paddingBottom: "8px",
              marginTop: "18px",
              paddingLeft: 0,
            }}
          >
            <li style={{ display: "block" }}>
              <div
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  color: "#263238",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "11px 20px 15px",
                }}
              >
                '서혜정'님이 사용중인 앱
              </div>
            </li>
            <li style={{ display: "block" }}>
              <div
                className="message-center"
                style={{
                  maxHeight: "450px",
                  overflow: "hidden scroll",
                }}
                onScroll={(e) => e.preventDefault()}
              >
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
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
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                  onClick={() => navigate("/dashboard")}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img
                      src="http://queendesign.bizspring.co.kr/GP/img/gp.svg"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      AIR(매체 통합 리포트)
                    </h5>
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
                      통합된 매체 데이터의 시각화
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                  onClick={() => navigate("/")}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img
                      src="http://queendesign.bizspring.co.kr/GP/img/monitoring.svg"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      모니터링 알람
                    </h5>
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
                      네이버 잔액 현황 및 광고비 증감 알람
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
                <a
                  style={{
                    borderBottom: "1px solid rgba(120, 130, 140, 0.13)",
                    display: "block",
                    padding: "9px 15px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      float: "left",
                      position: "relative",
                      margin: "0 10px 15px 0px",
                    }}
                  >
                    <img src="http://queendesign.bizspring.co.kr/GP/img/manager.svg" />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontWeight: 600,
                        lineHeight: "1.7em",
                        paddingRight: "5px",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                    >
                      MANAGER CONSOLE
                    </h5>
                    <span
                      style={{
                        fontSize: "12px",
                        display: "block",
                        margin: "5px 0",
                        color: "#263238",
                        overflow: "hidden",
                      }}
                    >
                      조직, 광고주 성과 확인과 설정 관리
                    </span>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Icon path={mdiApps} size={0.8} color="#686868" />
        </a>
      </Dropdown>
    </>
  );
};

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
        className="dropdown-user"
        // menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ minWidth: "280px" }}
        dropdownRender={() => (
          <ul
            className="dropdown-user animate__animated animate__flipInY"
            style={{
              border: "1px solid rgba(120, 130, 140, 0.13)",
              borderRadius: "0px",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#fff",
              listStyle: "none",
              fontSize: "14px",
              position: "absolute",
              top: "100%",
              right: 0,
              left: "auto",
              zIndex: 1000,
              minWidth: "280px",
              display: "block",
              paddingBottom: "8px",
              marginTop: "18px",
              paddingLeft: 0,
            }}
          >
            <li style={{ display: "block" }}>
              <a
                style={{
                  padding: "9px 20px",
                  fontWeight: 400,
                  color: "#333",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <IoMdPerson style={{ verticalAlign: "middle" }} />
                &nbsp; My Account
              </a>
            </li>
            <li>
              <a
                style={{
                  padding: "9px 20px",
                  fontWeight: 400,
                  color: "#333",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <TfiCrown style={{ verticalAlign: "middle" }} />
                &nbsp; Admin
              </a>
            </li>
            <li
              className="divider"
              style={{
                height: "1px",
                margin: "9px 0",
                backgroundColor: "#e5e5e5",
              }}
            ></li>
            <li>
              <a
                style={{
                  padding: "9px 20px",
                  fontWeight: 400,
                  color: "#333",
                  textDecoration: "none",
                  display: "block",
                }}
                onClick={() => showLoginModal()}
              >
                <FiPower style={{ verticalAlign: "middle" }} />
                &nbsp; Log Out
              </a>
            </li>
          </ul>
        )}
      >
        {/* <ul className="nav navbar-top-links navbar-right pull-right">
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
        </ul> */}

        <a
          className="profile-pic"
          onClick={(e) => e.preventDefault()}
          style={{ color: "#686868", textDecoration: "none" }}
        >
          <img
            src="http://queendesign.bizspring.co.kr/GP/img/profile.svg"
            alt="user-img"
            width={30}
            className="img-circle"
          ></img>
          <b className="hidden-xs">서혜정</b>
          <span className="caret"></span>
        </a>
      </Dropdown>
      <LoginModal isModalOpen={isModalOpen} handleOk={handleOk} />
    </>
  );
};

export const ManageDropdown = () => {
  const items = [
    {
      label: "수정",
      key: "0",
    },
    { label: "복사", key: "1" },
    {
      label: "삭제",
      key: "2",
      onClick: () => {
        Swal.fire({
          icon: "warning",
          title: "정말 삭제하시겠습니까?",
          text: "삭제 버튼을 클릭하면 영구적으로 삭제됩니다.",
          confirmButtonText: "삭제",
          confirmButtonColor: "rgb(221, 107, 85)",
          showCancelButton: true,
          cancelButtonText: "취소",
        });
      },
    },
  ];
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ minWidth: "100px" }}
      menu={{ items }}
    >
      <Button size="small">
        <HiMiniCog6Tooth />
      </Button>
    </Dropdown>
  );
};

export const AlarmCommentDropdown = () => {
  const items = [
    {
      label: "삭제",
      key: "1",
      onClick: () => {
        Swal.fire({
          icon: "warning",
          title: "정말 삭제하시겠습니까?",
          text: "삭제 버튼을 클릭하면 영구적으로 삭제됩니다.",
          confirmButtonText: "삭제",
          confirmButtonColor: "rgb(221, 107, 85)",
          showCancelButton: true,
          cancelButtonText: "취소",
        });
      },
    },
  ];
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ minWidth: "100px" }}
      menu={{ items }}
    >
      <Button size="small">
        <HiMiniCog6Tooth />
      </Button>
    </Dropdown>
  );
};
