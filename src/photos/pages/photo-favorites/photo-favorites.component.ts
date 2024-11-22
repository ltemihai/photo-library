import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PhotoState } from '../../store/photos.model';
import {Store} from '@ngrx/store';
import {selectFavorites} from '../../store/photos.selctors';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {RouterLink} from '@angular/router';
import {EmptyObjectPipe} from '../../../shared/pipes/empty-object.pipe';

@Component({
  selector: 'app-photo-favorites',
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    JsonPipe,
    KeyValuePipe,
    EmptyObjectPipe
  ],
  standalone: true,
  templateUrl: './photo-favorites.component.html',
  styleUrl: './photo-favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoFavoritesComponent implements OnInit {
  favorites$: Observable<{ [id: string]: string }> = EMPTY;

  private store = inject(Store<PhotoState>);

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavorites)
  }

  trackByPhoto(index: number, favorite: { key: string, value: string }): string {
    return favorite.key;
  }

}
