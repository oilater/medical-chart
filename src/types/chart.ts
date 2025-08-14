export interface ChartConfig {
  xAxisKey: string;
  yAxisKeys: YAxisConfig[];
  yAxisDomain?: {
    left?: [number, number];
    right?: [number, number];
  };
}

interface YAxisConfig {
  key: string;
  name: string;
  color: string;
  yAxisId?: 'left' | 'right';
  yAxisColor?: string;
}