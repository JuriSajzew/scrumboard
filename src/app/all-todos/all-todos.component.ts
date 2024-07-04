import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDetailCardComponent } from '../dialog-detail-card/dialog-detail-card.component';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})

export class AllTodosComponent implements OnInit {
  todos: any = [];
  todoId: any = [];
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private todoService: TodoService,
  ) { }


  async ngOnInit() {
    try {
      this.todos = await this.todoService.loadTodos();
      console.log(this.todos);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  openDetailTodo(selectedTodo: any, selectedTodo_id: any) {
    const dialogRef = this.dialog.open(DialogDetailCardComponent);
    dialogRef.componentInstance.todo = selectedTodo;
    dialogRef.componentInstance.todo.todo_id = selectedTodo_id;
  }
}
