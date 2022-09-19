import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorArchivosComponent } from './selector-archivos.component';

describe('SelectorArchivosComponent', () => {
  let component: SelectorArchivosComponent;
  let fixture: ComponentFixture<SelectorArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorArchivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
