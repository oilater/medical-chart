import { API_KEY, BASE_URL, ENDPOINTS } from "./config";
import type { RequestUrlParams } from "./types";

/**
 * 요청 URL 생성 함수
 * @param baseURL - 기본 URL
 * @param endpoint - 엔드포인트
 * @param apiKey - API 키
 * @returns 요청 URL
 */
function getRequestUrl({ baseURL, endpoint, apiKey }: RequestUrlParams): string {
  return `${baseURL}${endpoint}?serviceKey=${apiKey}`;
}

export const ApiUrl = {
  MedicalExpense: getRequestUrl({
    baseURL: BASE_URL.ODCLOUD,
    apiKey: API_KEY.ODCLOUD,
    endpoint: ENDPOINTS.MEDICAL_EXPENSE,
  }),
};