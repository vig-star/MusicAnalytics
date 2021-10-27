import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string
  validatingForm: FormGroup;
  title = "Login to Spotify";

  ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  requestAuthorization() {
    window.location.href = "http://localhost:8080/login"
    /* let clientId = "2b95b0dd175048e8bee450cdf2f4b94c";
    let clientSecret = "";
    let authorize = "https://accounts.spotify.com/authorize";

    let redirect_uri = 'http://localhost:4200/callback';

    let url = authorize;
    url += "?client_id=" + clientId;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=false";
    this.title = "Logging in...";
    window.location.href = url; */
  }
}


