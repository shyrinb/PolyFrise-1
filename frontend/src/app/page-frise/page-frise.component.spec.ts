import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFriseComponent } from './page-frise.component';

describe('PageFriseComponent', () => {
  let component: PageFriseComponent;
  let fixture: ComponentFixture<PageFriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
