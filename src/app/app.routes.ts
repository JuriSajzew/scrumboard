import { Routes } from '@angular/router';
import { TodoAddComponent } from './todo-add/todo-add.component';

export const routes: Routes = [
    { path: '', redirectTo: 'todolist', pathMatch: 'full' },
    { path: 'todolist', component: TodoAddComponent }
];
