import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo.class';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.baseUrl + '/todos';

  constructor(private http: HttpClient) { }

  updateTodo(id: string, todo: Todo): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/`, todo);
  }

  public loadTodos() {
    const url = environment.baseUrl + '/todos';
    return lastValueFrom(this.http.get(url));
  }
}
