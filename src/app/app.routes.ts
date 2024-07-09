import { Routes } from '@angular/router';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { DialogDetailCardComponent } from './dialog-detail-card/dialog-detail-card.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'todolist', component: TodoAddComponent },
    { path: 'todolist/todo_id', component: DialogEditComponent },
    { path: 'todo/:id', component: DialogDetailCardComponent }
];
