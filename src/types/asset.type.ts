export type AssetType = "poster" | "backdrop" | "video";

export type Asset = {
  type: AssetType;
  aspect_ratio: number | null;
  file_path: string;
};
