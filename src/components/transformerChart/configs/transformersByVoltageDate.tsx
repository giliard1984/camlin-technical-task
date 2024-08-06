import dayjs from "dayjs";

const config = (data: any) => {
  return {
    theme: "academy",
    title: 'Transformers by Voltage and Date',
    animate: { enter: { type: 'fadeIn' } },
    // shapeField: "smooth",
    // legend: {
    //   color: {
    //     labelFormatter: (value: string) => value?.split(" ")?.at(-1),
    //   }
    // },
    axis: {
      x: {
        title: "Timestamp",
        labelFormatter: (text: string) => dayjs(text).format("DD/MM/YY"),
        lineLineWidth: 0.5,
        lineLineDash: [2, 2],
        grid: true,
        gridLineWidth: 0.7,
        gridLineDash: [3, 3]
      },
      y: {
        title: "Voltage (kV)",
        labelFormatter: (value: any) => value / 1000,
        lineLineWidth: 0.5,
        lineLineDash: [2, 2],
        grid: true,
        gridLineWidth: 0.7,
        gridLineDash: [3, 3]
      },
    },
    scale: {
      // color: { palette: "pastel2" },
      // color: { palette: "pRGn" },
      color: { palette: "puOr" },
      y: { 
        type: 'linear',
        // domain: [19000, 40000],
        // tickMethod: () => [15000, 25000, 30000, 35000, 40000]
        // tickCount: 50000
      }
    },
    label: {
      text: 'voltage',
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
    data,
    xField: 'timestamp',
    yField: 'voltage',
    colorField: 'name',
    seriesField: 'name',
    sizeField: 'health',
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
    interaction: {
      // elementHighlight: true,
      tooltip: {
        body: true,
        leading: false,
        trailing: false,
        // render: (event, { title, items }) => <div>
        //   {title.split(",")[0]}
        //   {items.map(item => {
        //     if (item.name.startsWith("Transform")) {
        //     return <div>
        //       <span style={{ backgroundColor: item.color, minWidth: "10px", minHeight: "10px", width: "10px" }}>a</span>
        //       <span>{`${item.name}: ${item.value}`}</span>
        //     </div>;
        //     }
        //   })
        //   }
        // </div>
      },
    },
    style: {
      lineWidth: 2,
      // fill: 'linear-gradient(-90deg, white 0%, navy 100%)',
    },
  };
};

export default config;
