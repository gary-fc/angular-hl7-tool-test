import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTreeSegmentComponent } from './field-tree-segment.component';

describe('FieldTreeSegmentComponent', () => {
  let component: FieldTreeSegmentComponent;
  let fixture: ComponentFixture<FieldTreeSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTreeSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTreeSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
