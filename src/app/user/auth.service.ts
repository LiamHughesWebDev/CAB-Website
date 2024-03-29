import { SafeMethodCall } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isError: boolean = false;
  errorMessage: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }


  //Logging in, Signing Up, & logging out

  async loginUser(email, password){
    await this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.router.navigate(['/']);
    })

    
  }

  async SignUpUser(email, password, fName, lName, uName){
    await this.afAuth.createUserWithEmailAndPassword(email, password).then( (user) => {
      console.log(user);

      this.db.collection("Users").doc(user.user.uid).set({
        firstName: fName,
        lastName: lName,
        userName: uName
      })
      this.router.navigate(['/']);
    })

    
  }
  

  logoutuser(){
    console.log("logged out");
  }

  //Storing User Data
  


}
