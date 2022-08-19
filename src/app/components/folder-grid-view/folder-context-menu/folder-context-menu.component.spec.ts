import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderContextMenuComponent } from './folder-context-menu.component';

describe('FolderContextMenuComponent', () => {
  let component: FolderContextMenuComponent;
  let fixture: ComponentFixture<FolderContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
