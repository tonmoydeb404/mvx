export type TimeType = "day" | "week";

export type TMDBResponse<T = { [key: string]: any }> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
