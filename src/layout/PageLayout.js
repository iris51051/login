import { Layout, Menu, Button, Dropdown, Card, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { MdAvTimer, MdDownload, MdUpload, MdApps } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import "./../css/pageLayout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserDropdown } from "../components/Dropdown";
import "animate.css";

const { Header, Sider, Content } = Layout;

const NavBar = ({ openClose, collapsed }) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="top-left-part">
        <a className="logo">
          <b>
            <img
              src="http://queendesign.bizspring.co.kr/GP/plugins/images/admin-logo-dark.png"
              className="light-logo"
            ></img>
          </b>
          <span className="hidden-xs">
            <img
              src="http://queendesign.bizspring.co.kr/GP/plugins/images/admin-text-dark.png"
              className="light-logo"
            ></img>
          </span>
        </a>
      </div>
      <Button type="text" icon={<TfiMenu />} onClick={openClose} />
      <ul className="nav navbar-top-links pull-right">
        <ul className="nav navbar-top-links navbar-left">
          <li className="gnb-noti"></li>
          <li>
            <a>
              <MdApps />
            </a>
          </li>
          {/* <ul className="nav navbar-top-links navbar-right pull-right">
            <li>
              <a className="profile-pic">
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

          <UserDropdown />
        </ul>
      </ul>
    </Header>
  );
};

const SideBar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 4,
      }}
      width="240px"
      collapsedWidth="0"
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
      <div className="demo-logo--vertical">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MdAvTimer />,
              label: "통합 대시보드",
              style: { paddingLeft: 15 },
            },
            {
              key: "2",
              icon: <MdAvTimer />,
              label: "대시보드",
              style: { paddingLeft: 15 },
            },
            {
              key: "3",
              icon: <MdDownload />,
              label: "보고서 다운로드",
              style: { paddingLeft: 15 },
            },
            {
              key: "5",
              icon: <MdUpload />,
              label: "매체 파일 업로드",
              style: { paddingLeft: 15 },
            },
            {
              key: "6",
              icon: <IoIosShareAlt />,
              label: "매체 데이터 내보내기",
              style: { paddingLeft: 15 },
            },
            {
              key: "7",
              icon: <MdDownload />,
              label: "매체 데이터 다운로드",
              style: { paddingLeft: 15 },
            },
          ]}
        />
      </div>
    </Sider>
  );
};

const Main = ({ collapsed, children }) => {
  return (
    <div style={{ minHeight: "902px" }}>
      <Content
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          left: collapsed ? 0 : 240,
          width: collapsed ? "100%" : "87.4%",
          zIndex: 0,
        }}
      >
        <div className="container-fluid">{children}</div>
      </Content>
    </div>
  );
};

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <NavBar openClose={handleCollapse} collapsed={collapsed} />
      <Layout hasSider>
        <SideBar collapsed={collapsed} />
        <Main collapsed={collapsed}>{children}</Main>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
