import { createReducer, on } from '@ngrx/store';
import { PhotoState } from './photos.model';
import {addFavoritePhoto, loadPhotos, loadPhotosSuccess, removeFavoritePhoto} from './photos.actions';

export const initialState: PhotoState = {
  photos: [],
  favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : {},
  loading: false
};

export const photoReducer = createReducer(
  initialState,
  on(loadPhotos, state => ({ ...state, loading: true })),
  on(loadPhotosSuccess, (state, { photos }) => ({ ...state, loading: false, photos: [...state.photos, ...photos] })),
  on(addFavoritePhoto, (state, { photo }) => ({ ...state, favorites: {...state.favorites, [photo.id]: photo.download_url } })),
  on(removeFavoritePhoto, (state, { id }) => {
    const { [id]: removed, ...favorites } = state.favorites;
    return { ...state, favorites };
  })
);
