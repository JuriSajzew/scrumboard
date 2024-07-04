import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.class';
import { MatIconModule } from '@angular/material/icon';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-dialog-detail-card',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './dialog-detail-card.component.html',
  styleUrl: './dialog-detail-card.component.scss'
})
export class DialogDetailCardComponent {
  todo: Todo = new Todo();
  todoId: any = [];

  constructor(private dialog: MatDialog) { }

  baseUrl = 'http://127.0.0.1:8000';

  editTodo(todo_id: any) {
    const dialogref = this.dialog.open(DialogEditComponent, todo_id);
    dialogref.componentInstance.todo = this.todo;
    dialogref.componentInstance.todoId = todo_id;
  }
}
