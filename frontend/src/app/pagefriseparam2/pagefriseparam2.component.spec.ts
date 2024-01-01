import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagefriseparam2Component } from './pagefriseparam2.component';

describe('Pagefriseparam2Component', () => {
  let component: Pagefriseparam2Component;
  let fixture: ComponentFixture<Pagefriseparam2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pagefriseparam2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pagefriseparam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
