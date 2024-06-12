import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


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

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000'

  async ngOnInit() {
    this.todos = await this.loadTodos();
    console.log(this.todos);
  }

  loadTodos() {
    const url = this.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url))
  }

  

  openCard() {

  }
}
