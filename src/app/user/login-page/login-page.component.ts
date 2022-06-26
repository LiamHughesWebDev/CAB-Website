import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router, 
    private _formBuilder: FormBuilder,
    public afAuth: AngularFireAuth) { }


    //variables
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  isResetting: boolean = false;
  isLoginMode: boolean = true; 
  currentPage: number = 1;
  isLoading: boolean = false;

  isError: boolean = false;
  errorMessage: string = "";

  isLinear = true;

  loginForm: FormGroup;
  passwordResetForm: FormGroup;
  signUpLoginInfo: FormGroup;
  signUpUserInfo: FormGroup;

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpLoginInfo = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpUserInfo = this._formBuilder.group({
      uName: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required]
    });
    this.passwordResetForm = this._formBuilder.group({
      email: ['', Validators.required]
    })
  }

  onSwitchLogin(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSwitchReset(){
    this.isResetting = !this.isResetting;
  }


  async onSubmit() {
    this.isError = false;
    this.isLoading = true;
    console.log(this.isLoginMode);

    try {
      if (this.isLoginMode === true) {
        await this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email.trim(), this.loginForm.value.password);
      }
      if (this.isLoginMode === false) {
        await this.afAuth.createUserWithEmailAndPassword(this.signUpLoginInfo.value.email.trim(), this.signUpLoginInfo.value.password);
      }
     
    } catch (err) {
      this.isError = true;
      this.errorMessage = err;
    }

    this.isLoading = false;

    if (this.isError === false){
      this.router.navigate(['/']);
    }
    
  }


}



