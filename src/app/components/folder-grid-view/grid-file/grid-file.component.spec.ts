import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFileComponent } from './grid-file.component';

describe('GridFileComponent', () => {
  let component: GridFileComponent;
  let fixture: ComponentFixture<GridFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
