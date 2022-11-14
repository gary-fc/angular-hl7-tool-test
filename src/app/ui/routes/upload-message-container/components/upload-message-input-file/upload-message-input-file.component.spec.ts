import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessageInputFileComponent } from './upload-message-input-file.component';

describe('UploadMessageInputFileComponent', () => {
  let component: UploadMessageInputFileComponent;
  let fixture: ComponentFixture<UploadMessageInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMessageInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMessageInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
