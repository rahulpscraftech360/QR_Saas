import {
  CalendarOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "../components/Head";
import QRCodeScanner from "../components/QRCodeScanner";
import QrCodeScaner2 from "../components/QrCodeScaner2";

const ScanQR = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <div>
      <QRCodeScanner />
    </div>
  );
};

export default ScanQR;
