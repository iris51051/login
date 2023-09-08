import { Layout, Menu, Button, Dropdown, Card, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { MdAvTimer, MdDownload, MdUpload, MdApps } from "react-icons/md";
import IconDisplay from "../components/IconDisplay";
import { IoIosShareAlt } from "react-icons/io";
import "./../css/pageLayout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserDropdown } from "../components/Dropdown";
import "animate.css";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const NavBar = ({ openClose, collapsed }) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        // position: "fixed",
        // zIndex: 5,
        // display: "flex",

        // width: "100%",
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
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button type="text" icon={<TfiMenu />} onClick={openClose} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <ul className="nav navbar-top-links pull-right">
            <ul className="nav navbar-top-links navbar-left">
              <li className="gnb-noti"></li>
              <li>
                <a>
                  <MdApps />
                </a>
              </li>
              <UserDropdown />
            </ul>
          </ul>
        </div>
      </div> */}
      <Button type="text" icon={<TfiMenu />} onClick={openClose} />
      <ul className="nav navbar-top-links pull-right">
        <ul className="nav navbar-top-links navbar-left">
          <li className="gnb-noti"></li>
          <li>
            <a>
              <MdApps />
            </a>
          </li>
          <UserDropdown />
        </ul>
      </ul>
    </Header>
  );
};

const SideBar = ({ collapsed }) => {
  const [sideMenu, setSideMenu] = useState([]);

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

  console.log(sideMenu);
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
          items={sideMenuItems}
          // items={[
          //   {
          //     key: "1",
          //     icon: <MdAvTimer />,

          //     label: "통합 대시보드",
          //     style: { paddingLeft: 20 },
          //   },
          //   {
          //     key: "2",
          //     // icon: <MdAvTimer />,
          //     icon: <IconDisplay key={1} iconName="mdi-av-timer" />,
          //     label: "대시보드",

          //     children: [
          //       {
          //         key: "1-1",
          //         label: "테스트1",
          //       },
          //       {},
          //     ],
          //   },
          //   {
          //     key: "3",
          //     icon: <MdDownload />,
          //     label: "보고서 다운로드",
          //     style: { paddingLeft: 20 },
          //   },
          //   {
          //     key: "5",
          //     icon: <MdUpload />,
          //     label: "매체 파일 업로드",
          //     style: { paddingLeft: 20 },
          //   },
          //   {
          //     key: "6",
          //     icon: <IoIosShareAlt />,
          //     label: "매체 데이터 내보내기",
          //     style: { paddingLeft: 20 },
          //   },
          //   {
          //     key: "7",
          //     icon: <MdDownload />,
          //     label: "매체 데이터 다운로드",
          //     style: { paddingLeft: 20 },
          //   },
          // ]}
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
