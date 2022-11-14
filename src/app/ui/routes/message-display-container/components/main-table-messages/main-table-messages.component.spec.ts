import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTableMessagesComponent } from './main-table-messages.component';

describe('MainTableMessagesComponent', () => {
  let component: MainTableMessagesComponent;
  let fixture: ComponentFixture<MainTableMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTableMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
