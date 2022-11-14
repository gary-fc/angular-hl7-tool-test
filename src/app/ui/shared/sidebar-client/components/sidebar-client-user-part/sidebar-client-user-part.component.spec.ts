import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarClientUserPartComponent } from './sidebar-client-user-part.component';

describe('SidebarClientUserPartComponent', () => {
  let component: SidebarClientUserPartComponent;
  let fixture: ComponentFixture<SidebarClientUserPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarClientUserPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarClientUserPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
