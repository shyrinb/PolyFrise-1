import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagefriseparam1dateComponent } from './pagefriseparam1date.component';

describe('Pagefriseparam1dateComponent', () => {
  let component: Pagefriseparam1dateComponent;
  let fixture: ComponentFixture<Pagefriseparam1dateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pagefriseparam1dateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagefriseparam1dateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
