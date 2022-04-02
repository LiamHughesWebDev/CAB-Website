import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
 
  }
  isLoginMode= true;
  isLoading = false;
  error: string = null;


  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  switchPage(page){
    var pg1 = document.getElementById("pg1");
    var pg2 = document.getElementById("pg2");

    switch (page) {
      case 1:
        pg1.style.display = "block";
        pg2.style.display = "none";
        break;

      case 1:
        pg1.style.display = "none";
        pg2.style.display = "block";
        break;  
    
      default:
        break;
    }
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true; //enables loading spinner

    if (this.isLoginMode) {
      authObs = this.loginService.login(email, password)
    } else {
      authObs = this.loginService.signup(email, password)
    }
    
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
      })
          
      form.reset();

  }

    
}

