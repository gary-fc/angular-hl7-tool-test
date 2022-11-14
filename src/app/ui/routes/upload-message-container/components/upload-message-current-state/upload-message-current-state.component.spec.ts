import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessageCurrentStateComponent } from './upload-message-current-state.component';

describe('UploadMessageCurrentStateComponent', () => {
  let component: UploadMessageCurrentStateComponent;
  let fixture: ComponentFixture<UploadMessageCurrentStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMessageCurrentStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMessageCurrentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
