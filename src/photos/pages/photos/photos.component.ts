import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import {debounceTime, EMPTY, Observable, Subject} from 'rxjs';
import {Photo, PhotoState} from '../../store/photos.model';
import { Store } from '@ngrx/store';
import {addFavoritePhoto, loadPhotos} from '../../store/photos.actions';
import {selectLoading, selectPhotos} from '../../store/photos.selctors';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photos',
  imports: [
    AsyncPipe,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    MatProgressSpinner
  ],
  standalone: true,
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollSubject.next();
  }

  photos$: Observable<Photo[]> = EMPTY;
  loading$: Observable<boolean> = EMPTY;
  private scrollSubject = new Subject<void>();

  private store = inject(Store<PhotoState>);
  private pageIndex = 0;

  ngOnInit(): void {
    this.store.dispatch(loadPhotos({ pageIndex: this.pageIndex }));
    this.photos$ = this.store.select(selectPhotos);
    this.loading$ = this.store.select(selectLoading);

    this.scrollSubject.pipe(debounceTime(200)).subscribe(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.pageIndex++;
        this.store.dispatch(loadPhotos({ pageIndex: this.pageIndex }));
      }
    });
  }

  trackByPhoto(index: number, photo: Photo): string {
    return photo.id;
  }

  addPhotoToFavorite(photo: Photo): void {
    this.store.dispatch(addFavoritePhoto({ photo }));
  }

}
