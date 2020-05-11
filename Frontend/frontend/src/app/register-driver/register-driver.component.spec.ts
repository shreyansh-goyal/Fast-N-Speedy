import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDriverComponent } from './register-driver.component';

describe('RegisterDriverComponent', () => {
  let component: RegisterDriverComponent;
  let fixture: ComponentFixture<RegisterDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
