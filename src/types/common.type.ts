export type ApiResponse<T> = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty?: boolean;
  data: T | undefined;
};
