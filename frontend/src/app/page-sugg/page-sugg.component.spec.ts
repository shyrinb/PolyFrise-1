import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuggComponent } from './page-sugg.component';

describe('PageSuggComponent', () => {
  let component: PageSuggComponent;
  let fixture: ComponentFixture<PageSuggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSuggComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
