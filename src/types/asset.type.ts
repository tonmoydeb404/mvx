export type AssetType = "poster" | "backdrop" | "video" | "profiles";

export type Asset = {
  type: AssetType;
  aspect_ratio: number | null;
  file_path: string;
};
