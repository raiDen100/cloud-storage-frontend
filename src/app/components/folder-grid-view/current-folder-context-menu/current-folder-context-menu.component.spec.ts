import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFolderContextMenuComponent } from './current-folder-context-menu.component';

describe('CurrentFolderContextMenuComponent', () => {
  let component: CurrentFolderContextMenuComponent;
  let fixture: ComponentFixture<CurrentFolderContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFolderContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFolderContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
