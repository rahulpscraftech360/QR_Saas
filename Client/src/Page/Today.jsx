import React, { useEffect, useState } from "react";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "../components/widget/Widget";
import { IoMdHome } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout, { Content } from "antd/es/layout/layout";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Card, Col, Menu, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import Head from "../components/Head";
import { useSelector } from "react-redux";
import axios from "../utils/axiosConfig";
import Event from "../components/Event";

const Today = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState([]);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const Navigate = useNavigate();
  const organization = useSelector(
    (store) => store.organization.organizationData
  );
  const organizationId = organization._id;

  // console.log(organization, "organization");
  const token = useSelector((store) => store.organization.tokens.access.token);
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // Other custom headers if needed
  };

  console.log("token", token);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events/today/", {
          params: { organizationId },
          header: headers, // Pass organizationId as a query parameter
        });
        // console.log("eve", response.data);
        // Handle the response data
        setEvents(response.data);
      } catch (error) {
        // console.error("Error fetching events:", error);
        // Handle errors
      }
    };

    fetchEvents();
  }, []);
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
              <div className="mt-3 ">
                <div className="">
                  <div className="">
                    <Card
                      className="header-solid h-full "
                      bordered={false}
                      title={[
                        <h6 className="font-semibold m-0">Todays Events</h6>,
                      ]}
                      bodyStyle={{ paddingTop: "", background: "#E0E5F2" }}
                    >
                      <Row
                        gutter={[24, 24]}
                        style={{ marginTop: "20px  " }}
                        className="bg-[#E0E5F2] "
                      >
                        {events.map((event, index) => (
                          <Col
                            xs={24}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            key={index}
                          >
                            <div key={index}>
                              <Event event={event} />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Today;
