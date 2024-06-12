import { Component, forwardRef } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Todo } from '../../models/todo.class';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

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
    provideNativeDateAdapter()
  ],
})
export class DialogAddTodoComponent {
  state = 'Todo';
  todo = new Todo();

  constructor(private http: HttpClient) { }

  url = environment.baseUrl;

  saveTodo() {
    console.log(this.todo);
    this.todo.state = this.state;
    this.addTodo();
  }

  addTodo() {
    const day = this.todo.dateline.getDate()
    const year = this.todo.dateline.getFullYear()
    const month = this.todo.dateline.getMonth()
    const newDateline = year + '-' + month + '-' + day


    const newTodo = {
      "title": this.todo.title,
      "description": this.todo.description,
      "author": this.todo.author,
      "dateline": newDateline,
      "priority": this.todo.priority
    };
    console.log(newTodo)
    const url = this.url + '/todos/';
    return lastValueFrom(this.http.post(url, newTodo));

  }



}
