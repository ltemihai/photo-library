import { createAction, props } from '@ngrx/store';
import { Photo } from './photos.model';

export const loadPhotos = createAction('[Photo] Load Photos', props<{ pageIndex: number }>());
export const loadPhotosSuccess = createAction('[Photo] Load Photos Success', props<{ photos: Photo[] }>());
export const loadPhotosFailure = createAction('[Photo] Load Photos Failure', props<{ error: any }>());

export const addFavoritePhoto = createAction('[Photo] Add Favorite', props<{ photo: Photo }>());
export const removeFavoritePhoto = createAction(
  '[Photo] Remove Favorite Photo',
  props<{ id: string }>()
);
