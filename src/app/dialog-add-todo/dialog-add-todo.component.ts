import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Todo } from '../../models/todo.class';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DialogRef } from '@angular/cdk/dialog';
import { TodoService } from '../todo.service';

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
    MatDatepickerModule,
    MatMenuModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-add-todo.component.html',
  styleUrl: './dialog-add-todo.component.scss',
  providers: [
    provideNativeDateAdapter(),
    TodoService
  ],
})
export class DialogAddTodoComponent {
  state = 'Todo';
  todo = new Todo();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAddTodoComponent>,
    private todoservice: TodoService,
  ) { }

  refresh(): void {
    window.location.reload();
  }

  url = environment.baseUrl;

  async saveTodo() {
    console.log(this.todo);
    this.todo.state = this.state;
    this.dialogRef.close();
    this.addTodo();
    window.location.reload();
  }

  addTodo() {
    const day = this.todo.dateline.getDate()
    const year = this.todo.dateline.getFullYear()
    const month = this.todo.dateline.getMonth()
    const newDateline = year + '-' + month + '-' + day


    const newTodo = {
      "title": this.todo.title,
      "description": this.todo.description,
      "dateline": newDateline,
      "priority": this.todo.priority,
      "state": this.todo.state,
    };
    console.log(newTodo)
    const url = this.url + '/todos/';
    return lastValueFrom(this.http.post(url, newTodo));
  }
}

