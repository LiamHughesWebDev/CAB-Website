import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class LoginService {

    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.LoginAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(errorRes => {
                let errorMessage = "An unknown error occurred!";
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = "This email exists already!";
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = "Too many failed attempts, please try again later!";
                        break;
                } 
                return throwError(errorMessage);
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.LoginAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    };
}