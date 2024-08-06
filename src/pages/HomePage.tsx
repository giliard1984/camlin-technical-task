import React, { useEffect, useContext } from "react";
import _ from "lodash";
import StatisticGeneric from "../components/statisticGeneric/StatisticGeneric";
import TableGeneric from "../components/tableGeneric/TableGeneric";
import TransformerChart from "../components/transformerChart/TransformerChart";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { AppContext } from "../contexts/AppContext";
import type { Transformer, NormalisedData, NormalisedMedian } from "../definitions/global";

// array containing all columns we don't want to present
const ignoredAttributes = ["assetId", "lastTenVoltgageReadings"];

const HomePage: React.FC = () => {
  // retrieved states and methods associated with the search context
  const {
    transformers,
    processedStats,
    setProcessedStats,
    normalisedData,
    setNormalisedData,
    normalisedDataMedian,
    setNormalisedDataMedian
  } = useContext(AppContext);

  // based on the original data, the columns array is processed, which should be used by the table component
  const columns = transformers?.length ? Object?.keys(transformers[0])?.map((attribute: string) => {
    return {
      title: _.upperFirst(attribute),
      dataIndex: String(attribute).toLowerCase(),
      key: String(attribute).toLowerCase(),
      hidden: ignoredAttributes.includes(attribute)
    }
  }) : [];

  // normalises the original data, so we can leverage some of the charts features. e.g. double filter (by name and health)
  // it is interesting as there is a correlation in between these two attributes
  useEffect(() => {
    let normalisedDataTemp: NormalisedData[] = [];

    if (transformers?.length) {
      transformers?.forEach((transformer: Transformer) => {
        transformer?.lastTenVoltgageReadings?.forEach((reading: any) => {
          normalisedDataTemp.push({
            assetId: transformer.assetId,
            name: transformer.name,
            region: transformer.region,
            health: transformer.health,
            timestamp: reading.timestamp,
            voltage: reading.voltage
          });
        })
      });

      // sort the array based on the 'timestamp' property as it comes in a different order
      setNormalisedData(normalisedDataTemp?.sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
    }
  }, [transformers]);

  // as we already know the unique transformers list, I am leveraging this information here to find its medians for instance
  useEffect(() => {
    if (normalisedData?.length > 0) {
      const uniqueTransformerNames = normalisedData.reduce((acc: string[], obj: NormalisedData) => {
        if (!acc.includes(obj.name)) {
            acc.push(obj.name);
        }
        return acc;
      }, []);
    
      const uniqueTransformerRegions = normalisedData.reduce((acc: string[], obj: NormalisedData) => {
        if (!acc.includes(obj.region)) {
            acc.push(obj.region);
        }
        return acc;
      }, []);

      uniqueTransformerNames?.forEach((transformer: string) => {
        const filteredTransformerByName = normalisedData?.filter((item: NormalisedData) => item.name === transformer);
        let sumVoltage = 0;
        const voltages: number[] = [];

        filteredTransformerByName?.forEach((item: NormalisedData) => {
          sumVoltage += Number(item.voltage);
          voltages.push(Number(item.voltage));
        }, []);

        // calculates the median
        const median = (arr: number[]) => {
          const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
          return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        };

        // pushes to the array the max, min, median and average number by transformer
        // TODO: Fix the typescript error
        setNormalisedDataMedian((oldArray: NormalisedMedian[]) => [
          ...oldArray,
          {
            assetId: filteredTransformerByName[0]?.assetId,
            name: transformer,
            region: filteredTransformerByName[0]?.region,
            type: "Max",
            value: Math.max(...filteredTransformerByName.map((o: any) => o.voltage))
          },
          {
            assetId: filteredTransformerByName[0]?.assetId,
            name: transformer,
            region: filteredTransformerByName[0]?.region,
            type: "Min",
            value: Math.min(...filteredTransformerByName.map((o: any) => o.voltage))
          },
          {
            assetId: filteredTransformerByName[0]?.assetId,
            name: transformer,
            region: filteredTransformerByName[0]?.region,
            type: "Median",
            value: median(voltages)
          },
          {
            assetId: filteredTransformerByName[0]?.assetId,
            name: transformer,
            region: filteredTransformerByName[0]?.region,
            type: "Average",
            value: sumVoltage / filteredTransformerByName?.length
          }
        ]);
      });

      // pushes some stats to the top-level (overall data)
      setProcessedStats([
        {
          title: "Total Transformers",
          value: uniqueTransformerNames?.length,
        },
        {
          title: "Total Regions",
          value: uniqueTransformerRegions?.length,
        },
        {
          title: "Highest Voltage",
          value: Math.max(...normalisedData.map((o: any) => o.voltage)) / 1000,
          suffix: "kV",
          color: "#3f8600",
          prefix: <ArrowUpOutlined />
        },
        {
          title: "Lowest Voltage",
          value: Math.min(...normalisedData.map((o: any) => o.voltage)) / 1000,
          suffix: "kV",
          color: "#cf1322",
          prefix: <ArrowDownOutlined />
        }
      ]);
    }
  }, [normalisedData]);

  if (transformers?.length)
    return (
      <>
        <h1>Transformers Dashboard</h1>
        { processedStats && <StatisticGeneric data={processedStats} /> }
        <TableGeneric
          rowKey="assetId"
          columns={columns}
          dataSource={transformers} 
        />
        { normalisedData?.length &&
          <>
            <TransformerChart
              chart="transformersByVoltageDate"
              data={normalisedData}
            />
            <TransformerChart
              chart="transformersByStats"
              data={normalisedDataMedian}
            />
          </>
        }
      </>
    );

  return <></>;
};

export default HomePage;
