import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';
import { Photo } from '../../../photos/store/photos.model';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PhotoService,
      ]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch photos', () => {
    const dummyPhotos: Photo[] = [
      { id: '1', download_url: 'https://picsum.photos/id/1/300/300' },
      { id: '2', download_url: 'https://picsum.photos/id/2/300/300'}
    ];

    service.getPhotos(1).subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne('https://picsum.photos/v2/list?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });
});
