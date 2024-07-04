import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo.service';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    TodoService,
    
  ],
})


export class AppComponent {

}
