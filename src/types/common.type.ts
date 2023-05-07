export type QueryResponse<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty?: boolean;
  data: T | undefined;
};

export type PaginatedResponse<T = { [key: string]: any }> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
