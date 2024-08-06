export type VoltageReading = {
  timestamp: string
  voltage: string
};

export type Health = "Excellent" | "Good" | "Fair" | "Poor" | "Critical";

export type Transformer = {
  assetId: number
  name: string
  region: string
  health: Health
  lastTenVoltgageReadings: VoltageReading[]
};

export type NormalisedData = {
  assetId: number
  name: string
  region: string
  health: Health
  timestamp: string
  voltage: string
};

export type NormalisedMedian = {
  assetId: number
  name: string
  region: string
  type: string
  value: number
};

export type StatisticType = {
  title: string
  value: number
  suffix?: string
  color?: string
  prefix?: any
}

export type useFetchState<T> = {
  data: T | undefined
  error: Error | null
  loading: boolean
};
