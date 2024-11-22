import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Photo } from '../../../photos/store/photos.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private readonly PHOTO_URL_V2 = 'https://picsum.photos/v2';
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getPhotos(pageIndex: number = 0): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.PHOTO_URL_V2}/list?page=${pageIndex}`, { responseType: 'json'})
      .pipe(
        map(photos => photos.map(photo =>
          ({ id: photo.id, download_url: `https://picsum.photos/id/${photo.id}/300/300` })
        ))
      )
  }
}
