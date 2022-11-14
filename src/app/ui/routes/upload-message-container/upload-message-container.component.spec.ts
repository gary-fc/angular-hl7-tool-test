import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessageContainerComponent } from './upload-message-container.component';

describe('UploadMessageContainerComponent', () => {
  let component: UploadMessageContainerComponent;
  let fixture: ComponentFixture<UploadMessageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMessageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
