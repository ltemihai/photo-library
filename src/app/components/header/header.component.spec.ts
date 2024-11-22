import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([]),
        MatToolbar,
        MatButton
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should display the title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toContain('Test Title');
  });

  it('should have a "Photos" button', () => {
    fixture.detectChanges();
    const photosButton = fixture.debugElement.query(By.css('button[routerLink="/"]'));
    expect(photosButton.nativeElement.textContent).toContain('Photos');
  });

  it('should have a "Favorites" button', () => {
    fixture.detectChanges();
    const favoritesButton = fixture.debugElement.query(By.css('button[routerLink="/favorites"]'));
    expect(favoritesButton.nativeElement.textContent).toContain('Favorites');
  });
});
