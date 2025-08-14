import { Colors } from "../theme/colors";
import { css } from "@emotion/react";
import { useMemo } from "react";

interface TooltipPayload {
  value: number;
  name: string;
  dataKey: string;
  color: string;
}

interface ChartToolTipProps {
  payload?: TooltipPayload[];
  label?: string;
  suffix?: {
    [key: string]: string;
  };
}

/**
 * 차트 툴팁
 * 툴팁 페이로드, 라벨, 접미사를 받아서 툴팁을 렌더링합니다.
 * 
 * @param payload 툴팁 페이로드
 * @param label 툴팁 라벨
 * @param suffix 툴팁 접미사
 * @returns 툴팁
 */
export function ChartToolTip({ payload, label, suffix }: ChartToolTipProps) {
  const tooltipItems = useMemo(() => 
    payload?.map((data: TooltipPayload, index: number) => (
      <p key={index} css={tooltipItemStyle}>
        <span css={tooltipLeftStyle}>
          <span css={tooltipDotStyle(data.color)}></span>
          <span>{data.name}</span>
        </span>
        <span css={tooltipRightStyle}>
          {data.value.toLocaleString()}{suffix?.[data.dataKey]}
        </span>
      </p>
    )), [payload, suffix]);

  return (
    <div css={tooltipStyle}>
      <p css={tooltipTitleStyle}>{label}</p>
      {tooltipItems}
    </div>
  );
}

const tooltipStyle = css`
  background-color: white;
  border: 1px solid ${Colors.grey300};
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
`;

const tooltipTitleStyle = css`
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
  color: ${Colors.grey800};
`;

const tooltipItemStyle = css`
  margin: 6px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const tooltipLeftStyle = css`
  display: flex;
  align-items: center;
  flex: 1;
`;

const tooltipRightStyle = css`
  font-weight: bold;
  text-align: right;
  min-width: 60px;
`;

const tooltipDotStyle = (color: string) => css`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${color};
  border-radius: 50%;
  margin-right: 8px;
`;