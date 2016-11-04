import {Injectable} from "@angular/core";
import {User} from "./user.model";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class LoginService {
  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
        function (result) {
          return JSON.stringify(result);
        },
        function (errorMessage) {
          alert(errorMessage);
        }
    )
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then(
        function (result) {
          BackendService.token = result.uid
          return JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    )
  }
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then(
        function () {
          // called when password reset was successful,
          // you could now prompt the user to check his email
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    ).catch(this.handleErrors);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}