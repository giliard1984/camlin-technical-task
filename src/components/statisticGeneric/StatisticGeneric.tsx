import React from 'react';
import type { StatisticProps } from 'antd';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import type { StatisticType } from "../../definitions/global";

interface Props {
  data: StatisticType[]
}

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const StatisticGeneric: React.FC<Props> = ({ data }) => {

  return (
    <Row gutter={16} justify="start" align="middle" style={{ marginBottom: 40 }}>
      {
        data?.map((item: any) => <Col span={6}>
          <Card bordered={true} hoverable={true}>
            <Statistic
              title={item.title}
              value={item.value}
              suffix={item?.suffix}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: item?.color || "inherit" }}
              prefix={item?.prefix}
            />
          </Card>
        </Col>)
      }
    </Row>
  );
};

export default StatisticGeneric;
