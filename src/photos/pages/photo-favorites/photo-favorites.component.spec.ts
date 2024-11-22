import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PhotoFavoritesComponent } from './photo-favorites.component';
import { selectFavorites } from '../../store/photos.selctors';
import { ActivatedRoute } from '@angular/router';

describe('PhotoFavoritesComponent', () => {
  let component: PhotoFavoritesComponent;
  let fixture: ComponentFixture<PhotoFavoritesComponent>;
  let store: MockStore;
  const initialState = { photos: { favorites: {} } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFavoritesComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // Mock the parameter value
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFavoritesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select favorites on init', () => {
    const favorites = { '1': 'https://example.com/photo1.jpg', '2': 'https://example.com/photo2.jpg' };
    store.overrideSelector(selectFavorites, favorites);
    store.refreshState();
    fixture.detectChanges();
    component.favorites$.subscribe(favs => {
      expect(favs).toEqual(favorites);
    });
  });

  it('should track by photo key', () => {
    const key = component.trackByPhoto(0, { key: '1', value: 'https://example.com/photo1.jpg' });
    expect(key).toBe('1');
  });
});
