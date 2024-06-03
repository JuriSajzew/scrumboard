import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Todo } from '../../models/todo.class';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-todo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-todo.component.html',
  styleUrl: './dialog-add-todo.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddTodoComponent {
  state = 'Todo';
  todo = new Todo();

  saveTodo() {
    console.log(this.todo);
    this.todo.state = this.state;
  }

}
