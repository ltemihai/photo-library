import {inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotoService } from '../../shared/services/photo-api/photo.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {debounceTime, of} from 'rxjs';
import {addFavoritePhoto, loadPhotos, loadPhotosFailure, loadPhotosSuccess, removeFavoritePhoto} from './photos.actions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class PhotoEffects {

  private actions$: Actions = inject(Actions);
  private photoService: PhotoService = inject(PhotoService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhotos),
      debounceTime(3000),
      mergeMap((data) =>
        this.photoService.getPhotos(data.pageIndex).pipe(
          map(photos => loadPhotosSuccess({ photos })),
          catchError(error => of(loadPhotosFailure({ error })))
        )
      )
    )
  );

  storeFavorites$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addFavoritePhoto),
        tap(({ photo }) => {
          const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
          favorites[photo.id] = photo.download_url;
          localStorage.setItem('favorites', JSON.stringify(favorites));
          this.snackBar.open('Photo added to favorites', 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false }
  );

  removeFavorites$ = createEffect(() =>
      this.actions$.pipe(
        ofType(removeFavoritePhoto),
        tap(({ id }) => {
          const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
          delete favorites[id];
          localStorage.setItem('favorites', JSON.stringify(favorites));
          this.snackBar.open('Photo removed from favorites', 'Close', { duration: 2000 });
        })
      ),
    { dispatch: false }
  );

}
