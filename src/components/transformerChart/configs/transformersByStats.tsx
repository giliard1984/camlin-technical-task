const config = (data: any) => {
  const specificItems = ["Max", "Min"];
  const intervalData = data.filter((item: any) => specificItems.includes(item.type));
  const lineData = data.filter((item: any) => item.type === "Median");

  return {
    title: 'Statistics by transformer',
    // theme: "academy",
    animate: { enter: { type: 'fadeIn' } },
    // shapeField: "smooth",
    xField: 'name',
    legend: {
      color: {
        position: 'bottom',
        layout: { justifyContent: 'center' },
      },
    },
    // scale: { color: { range: ['#5B8FF9', '#5D7092', '#5AD8A6'] } },
    children: [
      {
        data: intervalData,
        type: 'interval',
        yField: 'value',
        colorField: 'type',
        group: true,
        style: { maxWidth: 50 },
        axis: {
          x: {
            // title: "Timestamp",
            // labelFormatter: (text: string) => text,
            lineLineWidth: 0.5,
            lineLineDash: [2, 2],
            grid: true,
            gridLineWidth: 0.7,
            gridLineDash: [3, 3]
          },
          y: {
            title: "Voltage (kV)",
            // position: 'right',
            labelFormatter: (value: any) => value / 1000,
            lineLineWidth: 0.5,
            lineLineDash: [2, 2],
            grid: true,
            gridLineWidth: 0.7,
            gridLineDash: [3, 3]
          },
        },
        label: { position: 'inside', formatter: (value: number) => (value / 1000).toFixed(1) },
        interaction: { elementHighlight: { background: true } },
      },
      {
        data: lineData,
        type: 'line',
        yField: 'value',
        style: { lineWidth: 2 },
        legend: {
          color: {
            labelFormatter: (_value: string) => _value === "value" ?  "Median" : _value,
          }
        },
        // TODO: Normalise this information, so it is presented on the same scale as the other chart
        // scale: {
        //   y: {
        //     domain: [0, 50000]
        //   }
        // },
        label: {
          // text: 'voltage',
          position: 'outside',
          fontSize: 10,
          fontWeight: 500,
          formatter: (value: number) => (value / 1000).toFixed(1),
          textBaseline: "bottom",
          fillOpacity: 0.7,
          transform: [
            {
              type: 'overflowHide',
            },
          ],
        },
        axis: {
          y: {
            // line: true,
            // arrow: false,
            lineLineWidth: 0.5,
            lineLineDash: [2, 2],
            grid: false,
            position: 'right',
            labelFormatter: (value: any) => value / 1000,
          }
        },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: true,
          },
        },
      },
    ],
  };
};

export default config;
