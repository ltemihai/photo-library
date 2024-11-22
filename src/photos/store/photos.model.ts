export interface Photo {
  id: string;
  download_url: string;
}

export interface PhotoState {
  photos: Photo[];
  favorites: { [id: string]: string };
  loading: boolean;
}
