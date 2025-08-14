import type { ProcessedMedicalData, RawMedicalData } from "../types/data";

/**
 * 의료 데이터 필드 순서를 변경하는 함수
 * @param data - 원본 데이터 배열
 * @returns 순서가 변경된 데이터 배열
 */
export function sortMedicalData(data: RawMedicalData[]): ProcessedMedicalData[] {
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => ({
    진료년도: item.진료년도,
    의료기관종별: item.의료기관종별,
    진료과목: item.진료과목_표시과목 ?? item["진료과목(표시과목)"] ?? "",
    명세서청구건수: item.명세서청구건수,
    보험자부담금_선별포함: item.보험자부담금_선별포함 ?? item["보험자부담금(선별포함)"] ?? 0,
    요양급여비용총액_선별포함: item.요양급여비용총액_선별포함 ?? item["요양급여비용총액(선별포함)"] ?? 0,
    환자수: item.환자수,
    입내원일수: item.입내원일수,
  }));
}