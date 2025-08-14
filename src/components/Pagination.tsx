import { css } from '@emotion/react';
import { Colors } from '../theme/colors';
import { memo } from 'react';

interface PageItemProps {
  pageNumber: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

const PageItem = memo(function PageItem({ pageNumber, isActive, onClick }: PageItemProps) {
  return (
    <button
      css={[pageItemStyle, isActive && activePageItemStyle]}
      onClick={() => onClick(pageNumber)}
    >
      {pageNumber}
    </button>
  );
});

interface PageListProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PageList = memo(function PageList({ totalPages, currentPage, onPageChange }: PageListProps) {
  const totalGroups = Math.ceil(totalPages / 10);
  const currentGroup = Math.ceil(currentPage / 10);
  
  const startPage = (currentGroup - 1) * 10 + 1;
  const endPage = Math.min(currentGroup * 10, totalPages);
  
  // 현재 그룹에 표시되는 페이지들
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, index) => startPage + index
  );

  return (
    <div css={paginationContainerStyle}>
      <div css={pageListStyle}>
        {/* 이전 버튼 */}
        {currentGroup > 1 && (
          <button
            css={[pageItemStyle, prevNextButtonStyle]}
            onClick={() => onPageChange(startPage - 1)}
          >
            이전
          </button>
        )}

        {/* 현재 표시되는 페이지 번호들 */}
        {visiblePages.map((pageNumber) => (
          <PageItem
            key={pageNumber}
            pageNumber={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={onPageChange}
          />
        ))}

        {/* 다음 버튼 */}
        {currentGroup < totalGroups && (
          <button
            css={[pageItemStyle, prevNextButtonStyle]}
            onClick={() => onPageChange(endPage + 1)}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
});

const paginationContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const pageListStyle = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const pageItemStyle = css`
  width: 40px;
  height: 40px;
  border: 1px solid ${Colors.grey200};
  background-color: white;
  color: ${Colors.grey700};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${Colors.grey50};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const activePageItemStyle = css`
  background-color: ${Colors.blue500};
  color: white;
  border-color: ${Colors.blue500};

  &:hover {
    background-color: ${Colors.blue600};
  }
`;

const prevNextButtonStyle = css`
  width: 60px;
  font-size: 13px;
`;