// API 요청 Parameters
export interface ApiParams {
  page?: number;
  perPage?: number;
  returnType?: 'JSON' | 'XML';
}

export interface RequestUrlParams {
    baseURL: string;
    endpoint: string;
    apiKey: string;
}

export interface ApiResponse<TData> {
  data: TData[];
  totalCount: number;
}