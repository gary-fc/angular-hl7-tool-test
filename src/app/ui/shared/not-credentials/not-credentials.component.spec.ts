import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCredentialsComponent } from './not-credentials.component';

describe('NotCredentialsComponent', () => {
  let component: NotCredentialsComponent;
  let fixture: ComponentFixture<NotCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
