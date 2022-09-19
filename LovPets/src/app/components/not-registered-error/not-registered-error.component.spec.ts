import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRegisteredErrorComponent } from './not-registered-error.component';

describe('NotRegisteredErrorComponent', () => {
  let component: NotRegisteredErrorComponent;
  let fixture: ComponentFixture<NotRegisteredErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotRegisteredErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotRegisteredErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
