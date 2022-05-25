import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthResponseData, LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService, 
              private router: Router, 
              private _formBuilder: FormBuilder) { }

  private userSub: Subscription;
  isAuthenticated: boolean = false;
  isResetting: boolean = false;
  isLoginMode: boolean = true; 
  currentPage: number = 1;
  isLoading: boolean = false;
  error: boolean = false;
  errorMessage: string = "";
  resetEmail: string = "";
  sentEmail: boolean = false;
  
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit(): void {
    this.userSub = this.loginService.user.subscribe(user => {
      this.isAuthenticated = !!user; //if user exists, this returns true
    });
    
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      uName: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required]
    });
  }

  onSwitchLogin(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSwitchReset(){
    this.isResetting = !this.isResetting;
  }


  onRegister(){
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    const email = this.firstFormGroup.value.email;
    const password = this.firstFormGroup.value.password;
    const fName = this.secondFormGroup.value.fName;
    const lName = this.secondFormGroup.value.lName;
    const uName = this.secondFormGroup.value.uName;
    let authObs: Observable<AuthResponseData>;



    console.log(email, password);
    this.isLoading = true; //enables loading spinner
    
    authObs = this.loginService.signup(email, password, fName, lName,uName);
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoginMode = false;
        this.isLoading = false;
      }
    )

  }

  onLogin(form){
    if (!form.valid){
      return;
    }

    let authObs: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    this.isLoading = true; //enables loading spinner
    
    authObs = this.loginService.login(email, password);
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoginMode = false;
        this.isLoading = false;
      }
    )

    form.reset();
   
  }

  // sendResetEmail(){
  //   this.resetEmail = (<HTMLInputElement>document.getElementById("resetEmail")).value.trim();
  //   console.log(this.resetEmail);
  //   this.loginService.resetPasswordEmail(this.resetEmail);
  //   this.sentEmail = true;
  // }
  // submitPasswordReset(){
  //   var code = (<HTMLInputElement>document.getElementById("resetCode")).value.trim();
  //   var newPassword = (<HTMLInputElement>document.getElementById("resetPassword")).value.trim();

  //   this.loginService.submitPasswordReset(this.resetEmail, code, newPassword);
  // }




  handleError(errorRes: HttpErrorResponse) {
    this.error = true;
    this.errorMessage = 'An unknown error occurred!';
    
    switch (errorRes.error.data.message) {
      case 'EMAIL_EXISTS':
        this.errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        this.errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        this.errorMessage = 'This password is not correct.';
        break;
      case 'Wrong user credentials.':
        this.errorMessage = 'Invalid Email or Password.';
        break;
    }
    
  }
  
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}