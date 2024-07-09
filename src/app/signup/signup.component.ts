import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service/auth.service';
import { Router } from '@angular/router';
import { setTimeout } from 'timers/promises';
import { DialogSignupComponent } from '../dialog.signup/dialog.signup.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private as: AuthService, private router: Router, private dialog: MatDialog) { }

  readonly dialogRef = inject(MatDialogRef<SignupComponent>)
  username: string = '';
  email: string = '';
  password: string = '';

  async saveUser() {
    try {
      await this.as.CreateUser(this.username, this.email, this.password)
      this.router.navigateByUrl('login');
      this.dialogRef.close();
      this.dialog.open(DialogSignupComponent)
    } catch (e) {
      alert('Versuchen Sie es noch einmal');
      console.error(e);
    }
  }
}
