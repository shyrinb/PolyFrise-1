import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifyEventAdminComponent } from './popup-modify-event-admin.component';

describe('PopupModifyEventAdminComponent', () => {
  let component: PopupModifyEventAdminComponent;
  let fixture: ComponentFixture<PopupModifyEventAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifyEventAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModifyEventAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
