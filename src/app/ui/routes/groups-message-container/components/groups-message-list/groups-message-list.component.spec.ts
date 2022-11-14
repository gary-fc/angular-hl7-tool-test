import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsMessageListComponent } from './groups-message-list.component';

describe('GroupsMessageListComponent', () => {
  let component: GroupsMessageListComponent;
  let fixture: ComponentFixture<GroupsMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsMessageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
