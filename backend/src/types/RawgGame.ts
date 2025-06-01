export interface RawgGame {
  id: number;
  name: string;
  description_raw?: string;
  description?: string;
  released: string;
  background_image: string;
  platforms: { platform: { name: string } }[];
}
