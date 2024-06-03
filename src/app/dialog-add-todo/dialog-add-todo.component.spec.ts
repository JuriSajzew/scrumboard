import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTodoComponent } from './dialog-add-todo.component';

describe('DialogAddTodoComponent', () => {
  let component: DialogAddTodoComponent;
  let fixture: ComponentFixture<DialogAddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
