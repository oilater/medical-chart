import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { CurveType } from 'recharts/types/shape/Curve';
import type { ChartConfig } from '../types/chart';
import { Colors } from '../theme/colors';
import { css } from '@emotion/react';
import { useMemo } from 'react';
import { formatNumberWithUnit } from '../utils/format-number';
import { isEmpty } from '../utils/check-for-null';

const CHART_MARGIN = { top: 10, right: 20, left: 20, bottom: 10 };
const GRID_PROPS = {
  strokeDasharray: "3 3",
  stroke: Colors.grey200,
  opacity: 0.6
};

interface RelativeLineChartProps {
  data: unknown[];
  config: ChartConfig;
  type?: CurveType;
  toolTip?: React.ReactElement;
  width?: string | number;
  height?: string | number;
  hasLegend?: boolean;
  hasGrid?: boolean;
}

/**
 * 라인 차트 컴포넌트
 */
export function RelativeLineChart({ 
  data, 
  config,
  type = 'monotoneX',
  width = '100%',
  height = 600,
  hasLegend = true,
  toolTip,
  hasGrid = true,
}: RelativeLineChartProps) {
  
  const yAxisDomains = useYAxisDomains(data, config.yAxisKeys);

  return (
    <div css={chartWrapperStyle()}>
      <ResponsiveContainer width={width} height={height} minHeight={height}>
        <LineChart data={data} margin={CHART_MARGIN}>
          {hasLegend && (
            <Legend 
              verticalAlign="top"
              align="right"
              height={100}
              iconType="line"
              wrapperStyle={{ paddingLeft: 20 }}
            />
          )}

          {hasGrid && <CartesianGrid {...GRID_PROPS} />}

          {toolTip && (
            <Tooltip 
              content={toolTip}
              cursor={{ stroke: Colors.grey300, strokeWidth: 1 }}
              offset={30}
            />
          )}
          
          <XAxis 
            dataKey={config.xAxisKey as string}
            textAnchor="middle"
            height={80}
            tick={{ fontSize: 13, fill: Colors.grey600 }}
            tickMargin={15}
            axisLine={{ stroke: Colors.grey300 }}
            interval={0}
          />

          {renderYAxes(config.yAxisKeys, yAxisDomains)}
          {renderLines(config.yAxisKeys, type)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Y축 도메인 계산
 */
function useYAxisDomains(data: unknown[], yAxisKeys: ChartConfig['yAxisKeys']) {
  return useMemo(() => {
    const domains: Record<string, [number, number]> = {};
    
    yAxisKeys.forEach((yAxis) => {
      const key = yAxis.key as string;
      const values = data
        .map((item: unknown) => (item as Record<string, unknown>)[key])
        .filter((value): value is number => 
          value !== null && value !== undefined && typeof value === 'number' && !isNaN(value)
        );
      
      if (isEmpty(values)) {
        domains[yAxis.yAxisId as string] = [0, 100];
        return;
      }
      
      const max = Math.max(...values);
      const step = calculateStep(max, 5);
      const maxTick = getYAxisDomain(max, step);
      domains[yAxis.yAxisId as string] = [0, maxTick];
    });
    
    return domains;
  }, [data, yAxisKeys]);
}

/**
 * Y축 렌더링
 */
function renderYAxes(yAxisKeys: ChartConfig['yAxisKeys'], yAxisDomains: Record<string, [number, number]>) {
  return yAxisKeys.map((yAxis, index) => (
    <YAxis 
      key={index}
      yAxisId={yAxis.yAxisId}
      orientation={yAxis.yAxisId === 'left' ? 'left' : 'right'} // y축 위치 결정
      domain={yAxisDomains[yAxis.yAxisId as string] ?? [0, 'auto']}
      tickFormatter={formatNumberWithUnit} // 숫자 포맷팅
      label={{ 
        value: yAxis.name, 
        position: 'top', 
        fontSize: 14,
        fontWeight: 500,
        fill: yAxis.color,
        offset: 40
      }}
      tick={{ fontSize: 13, fill: yAxis.yAxisColor }}
      tickLine={{ stroke: yAxis.yAxisColor }}
      tickMargin={10}
      axisLine={{ stroke: yAxis.yAxisColor }}
    />
  ));
}

/**
 * 라인 렌더링
 */
function renderLines(yAxisKeys: ChartConfig['yAxisKeys'], type: CurveType) {
  return yAxisKeys.map((yAxis, index) => (
    <Line 
      key={index}
      type={type}
      dataKey={yAxis.key as string} 
      yAxisId={yAxis.yAxisId}
      stroke={yAxis.color} 
      name={yAxis.name}
      strokeWidth={3}
      strokeOpacity={0.9}
      animationEasing="ease-out"
      animationDuration={800}
      dot={{ 
        fill: yAxis.color, 
        strokeWidth: 2, 
        r: 4,
        stroke: 'white',
      }}
      activeDot={{ 
        r: 5.5, 
        stroke: yAxis.color,
        strokeWidth: 2,
        fill: 'white',
      }}
    />
  ));
}

/**
 * Y축 눈금 간격 계산
 */
function calculateStep(max: number, minTickCount: number): number {
  if (max === 0) return 1;

  let step = max / (minTickCount - 1);

  const getNiceStep = (value: number) => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;
    let nice;

    if (normalized <= 1) nice = 1;
    else if (normalized <= 2) nice = 2;
    else if (normalized <= 5) nice = 5;
    else nice = 10;

    return nice * magnitude;
  };

  return getNiceStep(step);
}

/**
 * Y축 최대값을 step의 배수로 올림
 */
function getYAxisDomain(max: number, step: number): number {
  return Math.ceil(max / step) * step;
}

const chartWrapperStyle = () => css`
  * {
    outline: none;
  }
`;
