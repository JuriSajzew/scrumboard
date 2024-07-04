import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('todolist/');
    } catch (e) {
      //Show error message
      alert('Login ist Fehlgeschlagen');
      console.error(e);
    }
  }

}
