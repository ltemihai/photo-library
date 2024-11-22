import {createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotoState } from "./photos.model";

export const selectPhotoState = createFeatureSelector<PhotoState>('photoState');

export const selectPhotos = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.photos
);

export const selectFavorites = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.favorites
);

export const selectLoading = createSelector(
  selectPhotoState,
  (state: PhotoState) => state.loading
);

export const selectFavoritePhotoById = (photoId: string) => createSelector(
  selectPhotoState,
  (state: PhotoState) => state.favorites[photoId]
);
