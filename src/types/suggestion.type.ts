export type SuggestionType = "movie" | "tv";

export type Suggestion = {
  id: number | string;
  title: string;
  media_type: SuggestionType;
};
