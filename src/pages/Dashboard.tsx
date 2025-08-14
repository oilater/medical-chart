import { useEffect, useRef, useState } from 'react';
import { usePickQuery } from '../hooks/usePickQuery';
import { ApiUrl } from '../apis/url';
import { ChartConfigs } from '../configs/chart';
import { RelativeLineChart } from '../components/RelativeLineChart';
import { ChartToolTip } from '../components/ChartToolTip';
import { PageList } from '../components/Pagination';
import { DataTable } from '../components/DataTable';
import { sortMedicalData } from '../utils/sort-medicala-data';
import { contactDescription, container, section, title } from '../theme/common-css';
import { css } from '@emotion/react';
import type { ProcessedMedicalData, RawMedicalData } from '../types/data';

const PER_PAGE_CHART = 13;
const PER_PAGE_TABLE = 100;

export default function Dashboard() {
  const [currentChartPage, setCurrentChartPage] = useState(1);
  const [currentTablePage, setCurrentTablePage] = useState(1); // 전체 데이터 무한스크롤 시 페이지별 요청을 위해
  const [accumulatedTableData, setAccumulatedTableData] = useState<ProcessedMedicalData[]>([]); // 무한스크롤 누적 데이터
  const sentinelRef = useRef<HTMLDivElement>(null); // 무한스크롤 참조

  // 차트 데이터 받아오기
  // cherryPick 옵션을 설정해 원하는 데이터를 키 매핑 후 사용합니다.
  const {
    data: chartData,
    totalCount: chartTotalCount,
    status: chartStatus,
  } = usePickQuery<RawMedicalData>({
    requestUrl: ApiUrl.MedicalExpense,
    options: {
      page: currentChartPage,
      perPage: PER_PAGE_CHART,
    },
    cherryPick: {
      department: '진료과목(표시과목)',
      patientCount: '환자수',
      daysInHospital: '입내원일수',
    },
  });

  // 테이블 데이터 받아오기
  // 페이지별 데이터를 받아옵니다.
  const {
    data: tableData,
    totalCount: tableTotalCount,
  } = usePickQuery({
    requestUrl: ApiUrl.MedicalExpense,
    options: {
      page: currentTablePage,
      perPage: PER_PAGE_TABLE,
    },
  });

  // 무한스크롤 데이터 누적
  useEffect(() => {
    if (currentTablePage === 1 && tableData?.length) {
      setAccumulatedTableData(tableData as ProcessedMedicalData[]);
    } else if (currentTablePage > 1 && tableData?.length) {
      setAccumulatedTableData(prev => [...prev, ...(tableData as ProcessedMedicalData[])]);
    }
  }, [currentTablePage, tableData]);

  // 누적 테이블 데이터 정렬해서 사용
  const sortedTableData = sortMedicalData(accumulatedTableData);
  const chartPageCount = Math.ceil(chartTotalCount / PER_PAGE_CHART);
  const tablePageCount = Math.ceil(tableTotalCount / PER_PAGE_TABLE);

  // 무한스크롤
  useEffect(function infiniteScroll() {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && currentTablePage < tablePageCount) {
          setCurrentTablePage(prev => prev + 1);
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '200px',
      }
    );
    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [tablePageCount, currentTablePage, accumulatedTableData.length]);

  return (
    <div css={container}>
      <section css={section} id="chart">
        <h1 css={title}>진료과목별 환자수 대비 입∙내원일수</h1>
        <p css={contactDescription}>환자수와 입∙내원일수를 비교해보세요 😀</p>
        
        <RelativeLineChart
          config={ChartConfigs.MedicalExpense}
          data={chartData}
          toolTip={
            <ChartToolTip
              suffix={{
                patientCount: '명',
                daysInHospital: '일',
              }}
            />
          }
        />
        {chartStatus === 'pending' && <div css={loading}></div>}
        {chartStatus === 'success' && (
          <PageList
            totalPages={chartPageCount}
            currentPage={currentChartPage}
            onPageChange={setCurrentChartPage}
          />
        )}
      </section>

      <section css={section} id="table">
        <h1 css={title}>진료비 통계</h1>
        <p css={contactDescription}>통계를 한 눈에 확인해보세요 스크롤을 내리다보면 다음 데이터를 볼 수 있어요 😀</p>
        
        <DataTable 
          height={550}
          data={sortedTableData} 
          sentinelRef={sentinelRef}
        />
      </section>
    </div>
  );
}

const loading = css`
  width: 1000px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;