import React, { useEffect, useState } from "react";
import { Layout, Menu, Collapse, Select } from "antd";
import { TfiMenu } from "react-icons/tfi";
import lightLogo from "../img/admin-logo-dark.png";
import textLogo from "../img/admin-text-dark.png";
import "../css/pracitce.css";
import {
  AppsDropdown,
  GnbNotiDropdown,
  UserDropdown,
} from "../components/Dropdown";
import IconDisplay from "../components/IconDisplay";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const NavBar = ({ openClose, collapsed }) => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1010,
        width: "100%",
        top: "0px",
        marginBottom: "0px !important",
        paddingInline: "0px",
      }}
    >
      <div
        className="navbar-header"
        style={{
          background: "#ffffff",
          float: "left",
          width: "100%",
          border: "0px",
        }}
      >
        <div
          className="top-left-part"
          style={{
            width: collapsed ? "60px" : "240px",
            float: "left",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <a className="logo">
            <b>
              <img
                src={lightLogo}
                className="light-logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  verticalAlign: "middle",
                  border: 0,
                }}
              />
            </b>
            {!collapsed && (
              <span className="hidden-xs">
                <img src={textLogo} />
              </span>
            )}
          </a>
        </div>
        <ul className="nav navbar-left" style={{ float: "left" }}>
          <li>
            <a onClick={openClose}>
              <TfiMenu />
            </a>
          </li>
        </ul>
        <ul
          className="nav navbar-right pull-right"
          style={{ marginRight: 0, float: "right !important" }}
        >
          <li>
            <ul
              className="nav navbar-left"
              style={{
                marginRight: 0,
                float: "left !important",
              }}
            >
              <li>
                <a
                  href="https://docs.google.com/document/d/1MekkUblxY_1wMOBO78BKGx7QckOBiFhT/edit?usp=sharing&ouid=107943518726383742638&rtpof=true&sd=true"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    style={{
                      padding: "4px 6px",
                      background: "#f0f8ff",
                      color: "#1b83dd",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Guide
                  </span>
                </a>
              </li>
              <li>
                <GnbNotiDropdown />
              </li>
              <li>
                <AppsDropdown />
              </li>
              <li>
                <UserDropdown />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Header>
  );
};

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState("3-2");
  // localStorage.getItem("selectedMenuItem")
  useEffect(() => {
    setSelectedMenuItem(selectedMenuItem);
  }, [currentPath]);
  const [openKeys, setOpenKeys] = useState([]);
  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
    // console.log(menuItem);
  };
  const [sideMenu, setSideMenu] = useState([]);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const isOpen =
    openSubmenu ===
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2oiLCJpYXQiOjE2OTMyNjgxNjgsImV4cCI6MTY5MzM1NDU2OCwicm9sZXMiOlsiUk9MRV9TVVBFUiJdfQ.oeEhqMYnve2g6Jab-DTQpavTlzRWtFk5tHw1F0TOENceWkOlieo_m9rC1fWoujKoLjN_fQ9aQ5CUElm5xchmjQ",
          };
          const response = await axios.get(
            "http://223.130.136.182:80/app/menu/view/1000",
            {
              headers,
            }
          );
          setSideMenu(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      // fetchMenuItems();
    }, []);

  // console.log(sideMenu);
  const sideMenuItems = [];
  sideMenu.forEach((item) => {
    if (item.parentNo === "") {
      const menuItem = {
        key: item.viewNo,
        icon: <IconDisplay iconName={JSON.parse(item.viewOption).icon} />,
        label: item.viewNm,
        style: { paddingLeft: 20 },
      };
      sideMenuItems.push(menuItem);
    } else {
      const parentItem = sideMenuItems.find(
        (parentItem) => parentItem.key === item.parentNo
      );
      if (parentItem) {
        parentItem.children.push({
          key: item.viewNo,
          label: item.viewNm,
        });
      }
    }
  });
  return (
    <>
      {!collapsed && (
        <Sider
          trigger={null}
          style={{
            zIndex: 1001,
            position: "fixed",
            paddingTop: "0px",
          }}
        >
          <div
            className="user-profile"
            style={{
              padding: "0px 0px 0px",
              textAlign: "center",
            }}
          >
            <ul id="side-menu">
              <li className="user-profile">
                <div className="nav-select-text">광고주 선택</div>
                <Select
                  defaultValue="전체 광고주"
                  style={{
                    width: 220,
                  }}
                  options={[
                    {
                      value: "jack",
                      label: "전체 광고주",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </li>
              <li className="devider"></li>
            </ul>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ height: "100vh", width: "240px" }}
            defaultSelectedKeys={selectedMenuItem}
            // selectedKeys={selectedMenuItem}
            // openKeys={openKeys}
            // onOpenChange={setOpenKeys}
            onClick={handleMenuClick}
            // items={sideMenuItems}
            items={[
              {
                key: "1",
                label: "대시보드",
                style: { paddingLeft: 20 },
              },
              {
                key: "2",
                // icon: <IconDisplay iconName="mdi-av-timer" />,
                // label: <Link to="/alarm_history">알림 히스토리</Link>,
                label: "알림 히스토리",
                onClick: () => navigate("/alarm_history"),
                style: { paddingLeft: 20 },
              },
              {
                key: "3",
                label: "알림 설정",
                children: [
                  {
                    key: "3-1",
                    // label: (
                    //   <Link
                    //     to="/alarm_setting"
                    //     style={{ textDecoration: "none" }}
                    //   >
                    //     알림 목록 및 설정
                    //   </Link>
                    // ),
                    label: "알림 목록 및 설정",
                    onClick: () => navigate("/alarm_setting"),
                  },
                  {
                    key: "3-2",
                    // label: (
                    //   <Link to="/" style={{ textDecoration: "none" }}>
                    //     알림 수신자 설정
                    //   </Link>
                    // ),
                    label: "알림 수신자 설정",
                    onClick: () => navigate("/"),
                  },
                ],
                // style: { paddingLeft: 20 },
              },
            ]}
          />
          {/* <ul id="side-menu" style={{ height: "100vh" }}>
            <li className="devider"></li>

            <li key={1}>
              <a
                style={{
                  padding: "18px 0px 18px 20px",
                  display: "block",
                  color: "#97999f",
                  cursor: "pointer",
                }}
              >
                <IconDisplay iconName="mdi-av-timer" />
                <span style={{ fontSize: "14px" }}>대시보드</span>
              </a>
            </li>
            <li key={2}>
              <a
                style={{
                  padding: "18px 0px 18px 20px",
                  display: "block",
                  color: "#97999f",
                  cursor: "pointer",
                }}
              >
                <IconDisplay iconName="mdi-chart-areaspline" />
                <span style={{ fontSize: "14px" }}>
                  광고주/매체사별 대시보드
                </span>
              </a>
            </li>

            <li key={3}>
              <a
                style={{
                  padding: "18px 0px 18px 20px",
                  display: "block",
                  color: "#97999f",
                  cursor: "pointer",
                }}
              >
                <IconDisplay iconName="mdi-chart-areaspline"></IconDisplay>
                <span style={{ fontSize: "14px" }}>
                  광고 매체사/플랫폼/상품
                </span>
                <span></span>
              </a>
              <ul
                className="second-level"
                style={{
                  display: "block",
                  listStyle: "none",
                  paddingLeft: 0,
                  marginBottom: 0,
                }}
              >
                <li style={{ display: "block" }}>
                  <a
                    style={{
                      display: "block",
                      padding: "14px 10px 14px 40px",
                      color: "#97999f",
                    }}
                  >
                    <span style={{ paddingLeft: "12px", fontSize: "13px" }}>
                      광고 매체 분석 종합
                    </span>
                  </a>
                </li>
                <li style={{ display: "block" }}>
                  <a
                    style={{
                      display: "block",
                      padding: "14px 10px 14px 40px",
                      color: "#97999f",
                    }}
                  >
                    <span style={{ paddingLeft: "12px", fontSize: "13px" }}>
                      광고 매체 분석 종합
                    </span>
                  </a>
                </li>
                <li style={{ display: "block" }}>
                  <a
                    style={{
                      display: "block",
                      padding: "14px 10px 14px 40px",
                      color: "#97999f",
                    }}
                  >
                    <span style={{ paddingLeft: "12px", fontSize: "13px" }}>
                      광고 매체 분석 종합
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul> */}
        </Sider>
      )}
    </>
  );
};

const Main = ({ collapsed, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      id="page-wrapper"
      className="body-gray"
      style={{
        minHeight: "902px",
        background: currentPath === "/dashboard" ? "#edf1f5" : "#fff",
        marginTop: "60px",
        margin: collapsed ? "60px 0px 0px 0px" : "60px 0 0px 240px",
      }}
    >
      <div className="container-fluid">{children}</div>
    </div>
  );
};

const Practice = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <NavBar openClose={handleCollapse} collapsed={collapsed} />

      <Sidebar collapsed={collapsed} />
      <Main collapsed={collapsed}>{children}</Main>
    </>
  );
};

export default Practice;
