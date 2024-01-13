import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteEventComponent } from './popup-delete-event.component';

describe('PopupDeleteEventComponent', () => {
  let component: PopupDeleteEventComponent;
  let fixture: ComponentFixture<PopupDeleteEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
