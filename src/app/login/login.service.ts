import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = new BehaviorSubject<User>(null); //creates a subscribable object, initially null, that components can gather previously emitted data from

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http //returns user to component
      .post<AuthResponseData>( //post requests expects interface data back from Firebase API post
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.LoginAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => { //sends response data, without changing it, to a method that creates a new local user object
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>( //post requests expects interface data back from Firebase API post
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.LoginAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => { //sends response data, without changing it, to method to create new local user object
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin(){
    const currentUser: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
      return;
    } 

    const loadedUser = new User(currentUser.email, currentUser.id, currentUser._token, new Date(currentUser._tokenExpirationDate));

    if (loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log(userId);
    this.user.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
