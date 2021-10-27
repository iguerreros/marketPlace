import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinkaLoginComponent } from './minka-login.component';

describe('MinkaLoginComponent', () => {
  let component: MinkaLoginComponent;
  let fixture: ComponentFixture<MinkaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinkaLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinkaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
