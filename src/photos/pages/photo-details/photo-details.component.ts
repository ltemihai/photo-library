import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {EMPTY, map, Observable, switchMap} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { selectFavoritePhotoById } from '../../store/photos.selctors';
import { Store } from '@ngrx/store';
import { removeFavoritePhoto } from '../../store/photos.actions';
import {MatButton} from '@angular/material/button';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-photo-details',
  imports: [
    NgIf,
    AsyncPipe,
    MatButton
  ],
  standalone: true,
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsComponent implements OnInit {
  photoUrl$: Observable<string> = EMPTY;
  protected photoId: string = '';
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);


  constructor() { }

  ngOnInit(): void {
    this.photoUrl$ = this.route.paramMap.pipe(
      map(params => params.get('id') || '0'),
      tap(id => this.photoId = id),
      switchMap(id => this.store.select(selectFavoritePhotoById(id)))
    );
  }

  removeFromFavorites(id: string): void {
    this.store.dispatch(removeFavoritePhoto({ id }));
    this.router.navigate(['/favorites']);
  }

}
