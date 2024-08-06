// this context api is responsible for managing the main
// information related to the application
import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

import type { Transformer, NormalisedData, NormalisedMedian, StatisticType } from "../definitions/global";

const AppContextValue = {
  transformers: [] as Transformer[] | undefined,
  loading: false,
  error: null as Error | null,
  // setTransformers: (_data: Transformer[]) => {},
  processedStats: [] as StatisticType[],
  setProcessedStats: (_data: StatisticType[]) => {},
  normalisedData: [] as NormalisedData[],
  setNormalisedData: (_data: NormalisedData[]) => {},
  normalisedDataMedian: [] as NormalisedMedian[],
  setNormalisedDataMedian: (_data: NormalisedMedian[]) => {}
 };

const AppContext = createContext(AppContextValue);

const AppProvider = ({ children }: any) => {
  const [processedStats, setProcessedStats] = useState(AppContextValue.processedStats);
  const [normalisedData, setNormalisedData] = useState(AppContextValue.normalisedData);
  const [normalisedDataMedian, setNormalisedDataMedian] = useState(AppContextValue.normalisedDataMedian);

  // as soon as the component mounts, the transformers should be fetched
  const { data: transformers, loading, error } = useFetch<Transformer[]>("http://localhost:5179/transformers");
  
  return (
    <AppContext.Provider
      value={{
        transformers,
        loading,
        error,
        processedStats,
        setProcessedStats,
        normalisedData,
        setNormalisedData,
        normalisedDataMedian,
        setNormalisedDataMedian
      }}
    >
      {children}
    </AppContext.Provider>
  );
 };
 
 export { AppContext, AppProvider };
