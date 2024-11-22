import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailsComponent } from './photo-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { removeFavoritePhoto } from '../../store/photos.actions';
import { MatButtonModule } from '@angular/material/button';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let store: MockStore;
  let router: Router;

  const initialState = { photos: [] };
  const activatedRouteMock = {
    paramMap: of({
      get: (key: string) => '1'
    })
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailsComponent, MatButtonModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should dispatch removeFavoritePhoto and navigate on removeFromFavorites', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.removeFromFavorites('1');
    expect(dispatchSpy).toHaveBeenCalledWith(removeFavoritePhoto({ id: '1' }));
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
