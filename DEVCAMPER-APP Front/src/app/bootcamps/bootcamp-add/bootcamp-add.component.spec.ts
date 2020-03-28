import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampAddComponent } from './bootcamp-add.component';

describe('BootcampAddComponent', () => {
  let component: BootcampAddComponent;
  let fixture: ComponentFixture<BootcampAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootcampAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootcampAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
