import React, { useState } from "react";
import Dashboard from "../Page/Dashboard";
import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";
import Login2 from "./../Page/Login2";
import Sidebar from "./Sidebar";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import Widget from "./widget/Widget";
import { Content, Header } from "antd/es/layout/layout";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
const MainContainer = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <>
      {/* <Header /> */}
      <Head />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          {/* <Sidebar /> */}
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <div className="flex space-x-2">
                  <HomeOutlined
                    style={{ fontSize: "1.5em", verticalAlign: "middle" }}
                  />
                  {!collapsed && <h1 className="  sm:text-2xl">Home</h1>}
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/events">
                <div className="flex space-x-2">
                  <CalendarOutlined
                    style={{ fontSize: "1.5em", verticalAlign: "middle" }}
                  />
                  {!collapsed && <h1 className="  sm:text-2xl">Events</h1>}
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <MenuOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: "0 0" }}>
            <div className="w-full ">
              <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 cursor-pointer p-5">
                <Widget
                  icon={
                    <MdDashboard className="h-10 w-10 p-2 rounded-md bg-[#d8ff18]" />
                  }
                  onClick={() => {
                    navigate("/events");
                  }}
                  //title={"Events"}
                  subtitle={"All Events"}
                />
                <Widget
                  icon={
                    <IoDocuments className="h-10 w-10 p-2 rounded-md bg-[#1890FF]" />
                  }
                  onClick={() => {
                    navigate("/events/create");
                  }}
                  // title={"Spend this month"}
                  subtitle={"Create Event"}
                />
                <Widget
                  icon={
                    <MdBarChart className="h-10 w-10 p-2 rounded-md bg-[#6c358d]" />
                  }
                  onClick={() => {
                    navigate("/events/updates");
                  }}
                  // title={"Your Balance"}
                  subtitle={"Updates"}
                />
                <Widget
                  icon={
                    <MdDashboard className="h-10 w-10 p-2 rounded-md bg-[#ff4e18]" />
                  }
                  onClick={() => {
                    navigate("/events/expired");
                  }}
                  // title={"Your Balance"}
                  subtitle={"Expired"}
                />
                <Widget
                  icon={
                    <MdBarChart className="h-10 w-10 p-2 rounded-md bg-[#469334]" />
                  }
                  // title={"New "}
                  subtitle={"Todays Events"}
                  onClick={() => {
                    navigate("/events/today");
                  }}
                />
                <Widget
                  icon={
                    <IoMdHome className="h-10 w-10 p-2 rounded-md bg-[#ff18dc]" />
                  }
                  // title={"Total Events"}
                  subtitle={"2433"}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainContainer;
