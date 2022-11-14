import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePagingTableComponent } from './message-paging-table.component';

describe('MessagePagingTableComponent', () => {
  let component: MessagePagingTableComponent;
  let fixture: ComponentFixture<MessagePagingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePagingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePagingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
