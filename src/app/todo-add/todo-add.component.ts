import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddTodoComponent } from '../dialog-add-todo/dialog-add-todo.component';
import { AllTodosComponent } from '../all-todos/all-todos.component';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [
    AllTodosComponent,
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent {
  title = 'scrumboard';

  todos = [
    {
      name: 'Todo'
    },
    {
      name: 'Do today'
    },
    {
      name: 'In progress'
    },
    {
      name: 'Done'
    },
  ]

  constructor(public dialog: MatDialog) {
  }

  openDialog(todo: any) {
    const dialogref = this.dialog.open(DialogAddTodoComponent);
    dialogref.componentInstance.state = todo.name;
  }
}

