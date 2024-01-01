import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagefriseparam1Component } from './pagefriseparam1.component';

describe('Pagefriseparam1Component', () => {
  let component: Pagefriseparam1Component;
  let fixture: ComponentFixture<Pagefriseparam1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pagefriseparam1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagefriseparam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
