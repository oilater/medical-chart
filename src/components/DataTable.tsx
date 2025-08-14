// src/components/DataTable.tsx
import { css } from '@emotion/react';
import { Colors } from '../theme/colors';
import { type RefObject } from 'react';
import { isEmpty } from '../utils/check-for-null';

interface DataTableProps {
  data: Record<string, any>[];
  title?: string;
  height?: number;
  sentinelRef?: RefObject<HTMLDivElement | null>;
}

/**
 * 데이터 테이블
 * 
 * @param data 데이터
 * @param title 테이블 제목
 * @param height 테이블 높이
 * @param sentinelRef 무한스크롤 참조
 * @returns 테이블
 */
export function DataTable({ data, title, height, sentinelRef }: DataTableProps) {
  const columns = () => {
    if (isEmpty(data)) return [];
    return Object.keys(data[0]);
  }

  const headerRow = (
    <tr css={headerRowStyle}>
      {columns().map((column) => (
        <th key={column} css={headerCellStyle}>
          {column}
        </th>
      ))}
    </tr>
  )

  const tableRows = 
    data.map((row, rowIndex) => (
      <tr key={rowIndex} css={bodyRowStyle}>
        {columns().map((column) => (
          <td key={column} css={bodyCellStyle}>
            {formatCellValue(row[column], column)}
          </td>
        ))}
      </tr>
    ));

  return (
    <div css={tableContainer}>
      {title && <h3 css={tableTitle}>{title}</h3>}
      <div css={[tableWrapper, { height, overflowY: 'auto' }]}>
        <table css={tableStyle}>
          <thead css={theadStyle}>
            {headerRow}
          </thead>
          <tbody>
            {isEmpty(data) ? (
              <tr>
                <td css={emptyCellStyle} colSpan={columns.length}>
                  <div css={emptyContainer}>
                    <p css={emptyText}></p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {tableRows}
                <tr>
                  <td colSpan={columns.length}>
                    <div ref={sentinelRef} style={{ height: 1 }} />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCellValue(value: any, columnName?: string): string {
  if (!value) return '-';

  if (typeof value === 'number') {
    if (columnName === '진료년도') {
      return value.toString();
    }
    return value.toLocaleString();
  }
  return value;
}

const tableContainer = css`
  margin: 2rem 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
`;

const tableTitle = css`
  padding: 1.5rem 1.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${Colors.grey800};
  margin: 0;
`;

const tableWrapper = css`
  overflow-x: auto;
  max-width: 100%;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const headerRowStyle = css`
  background-color: ${Colors.grey50};
  border-bottom: 1px solid ${Colors.grey200};
`;

const headerCellStyle = css`
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: ${Colors.grey700};
  white-space: nowrap;
  border-bottom: 1px solid ${Colors.grey200};
  
  &:first-of-type {
    padding-left: 1.5rem;
  }
  
  &:last-of-type {
    padding-right: 1.5rem;
  }
`;

const bodyRowStyle = css`
  border-bottom: 1px solid ${Colors.grey100};
  will-change: background-color;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${Colors.grey50};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const bodyCellStyle = css`
  padding: 1rem;
  color: ${Colors.grey800};
  border-bottom: 1px solid ${Colors.grey100};
  text-align: center;
  white-space: nowrap;
  
  &:first-of-type {
    padding-left: 1.5rem;
  }
  
  &:last-of-type {
    padding-right: 1.5rem;
  }
`;

const emptyCellStyle = css`
  padding: 0;
  border: none;
  height: 550px;
`;

const emptyContainer = css`
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
`;

const emptyText = css`
  color: ${Colors.grey500};
  font-size: 1rem;
  margin: 0;
`;

const theadStyle = css`
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid ${Colors.grey200};
`;