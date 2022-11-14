import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDisplayContainerComponent } from './message-display-container.component';

describe('MessageDisplayContainerComponent', () => {
  let component: MessageDisplayContainerComponent;
  let fixture: ComponentFixture<MessageDisplayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDisplayContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDisplayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
