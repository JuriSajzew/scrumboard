import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DialogAddTodoComponent } from './dialog-add-todo/dialog-add-todo.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

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
