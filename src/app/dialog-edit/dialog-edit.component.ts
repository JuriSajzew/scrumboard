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
    const dateline = this.parseDateline();

    if (!dateline) {
      return; // Error handling bereits in parseDateline() durchgeführt
    }

    const newDateline = this.formatDateline(dateline);
    const updateTodo = this.createUpdateTodoObject(newDateline);
    const url = `${this.apiUrl}/todos/${this.todoId}/`;

    this.closeDialog();

    console.log('Update Daten', updateTodo);
    console.log('Anfrage URL:', url);

    return lastValueFrom(this.http.patch(url, updateTodo));
  }

  private parseDateline(): Date | null {
    let dateline: Date;

    if (typeof this.todo.dateline === 'string') {
      console.log('dateline ist ein String:', this.todo.dateline);
      dateline = new Date(this.todo.dateline);
    } else if (this.todo.dateline instanceof Date) {
      console.log('dateline ist ein Date-Objekt:', this.todo.dateline);
      dateline = this.todo.dateline;
    } else {
      console.error('dateline hat ein unerwartetes Format:', this.todo.dateline);
      return null;
    }

    if (isNaN(dateline.getTime())) {
      console.error('dateline ist kein gültiges Datum:', dateline);
      return null;
    }

    return dateline;
  }
/**
 * Formats a date into a string in the format 'YYYY-MM-DD'.
 * @param dateline The date to be formatted.
 * @returns The formatted date string.
 */
  private formatDateline(dateline: Date): string {
    const day = dateline.getDate().toString().padStart(2, '0');
    const year = dateline.getFullYear();
    const month = (dateline.getMonth() + 1).toString().padStart(2, '0'); // Monat ist 0-basiert
    return `${year}-${month}-${day}`;
  }

  private createUpdateTodoObject(newDateline: string) {
    return {
      title: this.todo.title,
      description: this.todo.description,
      dateline: newDateline,
      priority: this.todo.priority,
      state: this.todo.state
    };
  }
  /**
  *Closes the current dialogue window.
  */
  private closeDialog() {
    this.dialogRef.close();
  }
/**
 * Deleting the todo card
 */
  async deleteTodo() {
    const url = `${this.apiUrl}/todos/${this.todoId}/`;
    console.log('Delete Anfrage URL:', url);

    try {
      await lastValueFrom(this.http.delete(url));
      console.log('Löschung erfolgreich');
      this.dialogRef.close();
      window.location.reload();
    } catch (error) {
      console.error('Fehler beim Löschen des Todos:', error);
    }
  }
}


