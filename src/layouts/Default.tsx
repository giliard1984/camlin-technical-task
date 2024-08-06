import React from "react";
import { Row, Col, Layout, theme, ConfigProvider, FloatButton } from 'antd';
import { Outlet } from "react-router-dom";

import styles from "./Default.module.scss";

const { Header, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  return (
    <ConfigProvider
      theme={{ components: { Layout: { bodyBg: "#f4f2ee", headerBg: "#fff" } } }}
    >
      <Layout>
        <Header className={styles.header}>
          <Row gutter={[0, 0]} justify="center" align="middle">
            <Col flex="5%" className={styles.imageWrapper}>
              <img
                alt="camling-group-image"
                src="./camlin-group-logo.svg"
              />
            </Col>
            <Col flex="85%" className={styles.headerText}>
              Front-end Tech Lead - Technical task
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          <div
            className={styles.outletWrapper}
            style={{ borderRadius: borderRadiusLG }}
          >
            <Outlet />
            <FloatButton.BackTop duration={550} visibilityHeight={800} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
