import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEventAdminComponent } from './popup-add-event-admin.component';

describe('PopupAddEventAdminComponent', () => {
  let component: PopupAddEventAdminComponent;
  let fixture: ComponentFixture<PopupAddEventAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddEventAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
