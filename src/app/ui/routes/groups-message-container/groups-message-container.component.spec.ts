import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsMessageContainerComponent } from './groups-message-container.component';

describe('GroupsMessageContainerComponent', () => {
  let component: GroupsMessageContainerComponent;
  let fixture: ComponentFixture<GroupsMessageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsMessageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
