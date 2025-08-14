import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { isEmpty } from "../utils/check-for-null";

type UseQueryOptionsNoKey = Omit<UseQueryOptions, "queryKey" | "queryFn">;

type UsePickQueryProps<TData> = {
  requestUrl: string;
  // queryKey, queryFn는 훅 자체적으로 설정해서 제외
  options?: UseQueryOptionsNoKey & {
    page?: number;
    perPage?: number;
  }
  cherryPick?: {
    [K in string]: keyof TData;
  };
}
/**
 * 쿼리 키, 요청 URL, 페이지, 페이지 당 아이템 수를 받아서 데이터를 가져옵니다.
 * 원하는 데이터를 키 매핑 후 사용하기 위해 cherryPick 옵션을 제공합니다.
 * 
 * @param param0 쿼리 키, 요청 URL, 페이지, 페이지 당 아이템 수
 * @returns 데이터, 상태, 총 아이템 수
 */
export function usePickQuery<TData>({ requestUrl, options, cherryPick }: UsePickQueryProps<TData>) {
  const queryKey = ["pick-data", requestUrl, options?.page, options?.perPage];
  // 데이터 페칭
  const { data, status } = useQuery<{
    data: TData[];
    totalCount: number;
    isError: boolean;
    isLoading: boolean;
  }>({
    queryKey,
    queryFn: async () => {
      try {
        if (!requestUrl) {
          console.error("requestUrl is not defined");
          return { data: [], totalCount: 0, isError: true, isLoading: false };
        }

        // 파라미터 추가
        const params = new URLSearchParams();
        if (options?.page) params.set("page", options.page.toString());
        if (options?.perPage) params.set("perPage", options.perPage.toString());

        // 파라미터 추가 후 요청 URL 조합
        const separator = requestUrl.includes("?") ? "&" : "?";
        const fullUrl = params.toString()
          ? `${requestUrl}${separator}${params.toString()}`
          : requestUrl;
        const response = await fetch(fullUrl);

        if (!response.ok) {
          console.error("API 요청 실패:", response.status);
          return { data: [], totalCount: 0, isError: true, isLoading: false };
        }

        const responseData = await response.json();
        return {
          data: responseData.data ?? [],
          totalCount: responseData.totalCount,
          isError: false,
          isLoading: false,
        };
      } catch (error) {
        console.error("API 요청 실패:", error);
        return { data: [], totalCount: 0, isError: true, isLoading: false };
      }
    },
  });

  // cherryPick 옵션에 따라 데이터 변환
  const pickedData = useMemo(() => {
    const responseData: TData[] = data?.data ?? [];
    if (!responseData || !cherryPick) return responseData;

    return responseData.map((resData: TData) => {
      const picked: Record<string, unknown> = {};
      
      for (const [newKey, originalKey] of Object.entries(cherryPick)) {
        if (isEmpty(resData[originalKey])) continue;
        picked[newKey] = resData[originalKey];
      }
      return picked;
    });
  }, [data, cherryPick]);

  return {
    data: pickedData,
    status,
    totalCount: data?.totalCount ?? 0,
  };
}