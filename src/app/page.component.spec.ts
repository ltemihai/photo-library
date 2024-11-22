import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { HeaderComponent } from './components/header/header.component';
import { By } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import { of } from 'rxjs';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  const activatedRouteMock = {
    params: of({ id: '123' }),
    snapshot: {
      paramMap: {
        get: (key: string) => '123'
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should have an app-header', () => {
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });
});
