import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCatComponent } from './popup-cat.component';

describe('PopupCatComponent', () => {
  let component: PopupCatComponent;
  let fixture: ComponentFixture<PopupCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
