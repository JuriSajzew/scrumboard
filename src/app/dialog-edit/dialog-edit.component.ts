import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../models/todo.class';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss',
  providers: [
    provideNativeDateAdapter()
  ]
})

export class DialogEditComponent {
  @Input() todoId!: number;  // Die ID des zu bearbeitenden Todos
  todo: any = new Todo();
  apiUrl = environment.baseUrl;

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private http: HttpClient) { }

  async SaveTodo() {
    console.log('Todo ID:', this.todoId);  // Überprüfen der Todo ID
    console.log('Das ist das editierte Todo:', this.todo);

    try {
      const result = await this.addTodo();
      console.log('Update erfolgreich:', result);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Todos:', error);
    }
  }

  addTodo() {
    const day = this.todo.dateline.getDate();
    const year = this.todo.dateline.getFullYear();
    const month = this.todo.dateline.getMonth() + 1; // Monat ist 0-basiert
    const newDateline = `${year}-${month}-${day}`;

    const updateTodo = {
      "title": this.todo.title,
      "description": this.todo.description,
      "author": this.todo.author,
      "dateline": newDateline,
      "priority": this.todo.priority
    };
    console.log('Update Daten', updateTodo);

    const url = `${this.apiUrl}/todos/${this.todoId}/`;
    console.log('Anfrage URL:', url);
    // URL mit ID des Todos
    return lastValueFrom(this.http.patch(url, updateTodo));
  }

  async deleteTodo() {
    const url = `${this.apiUrl}/todos/${this.todoId}/`;
    console.log('Delete Anfrage URL:', url);
    
    try {
      await lastValueFrom(this.http.delete(url));
      console.log('Löschung erfolgreich');
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Löschen des Todos:', error);
    }
  }
}


