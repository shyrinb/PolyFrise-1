import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDescComponent } from './popup-desc.component';

describe('PopupDescComponent', () => {
  let component: PopupDescComponent;
  let fixture: ComponentFixture<PopupDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
