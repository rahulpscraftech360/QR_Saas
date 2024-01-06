import React from "react";

import { Card, Col, Grid, Row, Statistic, theme, Typography } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const stats = [
  {
    id: 1,
    name: "Create Event",
    value: "12467.22",
    prevValue: "8923.11",
    changeType: "increase",
    precision: 2,
    prefix: "",
    color: "#faad14",
  },
  {
    id: 2,
    name: "Upcoming",
    value: "7209.44",
    prevValue: "8654.33",
    changeType: "decrease",
    precision: 2,
    prefix: "",
    color: "#faad14",
  },
  {
    id: 3,
    name: "Updates",
    value: "634.22",
    prevValue: "3812.89",
    changeType: "decrease",
    precision: 2,
    prefix: "",
    color: "#faad14",
  },
  {
    id: 4,
    name: "Finished Event",
    value: "2456",
    prevValue: "2123",
    changeType: "increase",
    color: "#faad14",
    precision: 0,
    prefix: "",
  },
];

export default function Login2() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    card: {
      position: "relative",
    },
    container: {
      margin: "0 auto",
      maxWidth: screens.lg ? token.screenXL : token.screenSM,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      padding: `${token.sizeXXL}px 0px`,
    },
  };

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <Row
          gutter={[
            {
              xs: token.size,
              sm: token.size,
              md: token.size,
              lg: token.sizeLG,
              xl: token.sizeLG,
            },
            token.size,
          ]}
        >
          {stats.map((stat) => (
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <Card bodyStyle={styles.card}>
                <Statistic
                  title={stat.value}
                  value={stat.name}
                  precision={stat.precision}
                  valueStyle={{
                    color: stat.color,
                  }}
                  prefix={stat.prefix}
                />
                <Text type="secondary">vs. ${stat.prevValue} last month</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
