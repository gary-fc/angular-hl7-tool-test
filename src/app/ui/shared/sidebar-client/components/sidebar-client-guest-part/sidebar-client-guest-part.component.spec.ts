import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarClientGuestPartComponent } from './sidebar-client-guest-part.component';

describe('SidebarClientGuestPartComponent', () => {
  let component: SidebarClientGuestPartComponent;
  let fixture: ComponentFixture<SidebarClientGuestPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarClientGuestPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarClientGuestPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
