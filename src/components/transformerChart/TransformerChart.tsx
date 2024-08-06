import { Line, DualAxes } from '@ant-design/plots';
import React from 'react';

// chart configurations
import transformersByVoltageDate from "./configs/transformersByVoltageDate";
import transformersByStats from "./configs/transformersByStats";

interface Props {
  chart: string
  data: any[]
}

const TransformerChart: React.FC<Props> = ({ chart, data }) => {
  switch(chart) {
    case "transformersByVoltageDate":
      return <Line {...transformersByVoltageDate(data)} />;
    case "transformersByStats":
      return <DualAxes {...transformersByStats(data)} />;
    default:
      return <></>;
  }
};

export default TransformerChart;
