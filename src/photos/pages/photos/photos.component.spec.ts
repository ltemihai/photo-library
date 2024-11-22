import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PhotosComponent } from './photos.component';
import { selectLoading, selectPhotos } from '../../store/photos.selctors';
import { loadPhotos, addFavoritePhoto } from '../../store/photos.actions';
import { By } from '@angular/platform-browser';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let store: MockStore;
  const initialState = { photos: [], loading: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadPhotos on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadPhotos({ pageIndex: 0 }));
  });

  it('should display loading spinner when loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.directive(MatProgressSpinner));
    expect(spinner).toBeTruthy();
  });

  it('should display photos', () => {
    const photos = [{ id: '1', download_url: 'test1.jpg' }, { id: '2', download_url: 'test2.jpg' }];
    store.overrideSelector(selectPhotos, photos);
    store.refreshState();
    fixture.detectChanges();
    const photoElements = fixture.debugElement.queryAll(By.css('img'));
    expect(photoElements.length).toBe(2);
  });

  it('should dispatch addFavoritePhoto when addPhotoToFavorite is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const photo = { id: '1', download_url: 'test1.jpg' };
    fixture.detectChanges();
    component.addPhotoToFavorite(photo);
    expect(dispatchSpy).toHaveBeenCalledWith(addFavoritePhoto({ photo }));
  });

  it('should dispatch loadPhotos on scroll', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadPhotos({ pageIndex: 0 }));
  });
});
