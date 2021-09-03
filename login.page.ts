import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string = '';
  password: string = '';

  status: Number = 0;
  // status: Number = 200;  // デバッグ用

  postObj: any = {};
  returnObj: any = {};

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) { }

  ngOnInit() {
    /*// this.status = 0;
    this.postObj['id'] = localStorage.id;
    this.postObj['password'] = localStorage.password;

    this.login();*/
  }
  ngOnDestroy() {
    if(this.status != 200){
      this.router.navigate(['/home']);
    }
  }

  navigate = () => {
    // this.postObj['id'] = this.id;
    this.postObj['password'] = this.password;

    this.login();
  }
  navigateToSignup = () => {
    this.router.navigate(['/signup']);
  }

  login = () => {
    const body = this.postObj;
    const url = 'https://7a05-116-94-251-206.ngrok.io/todo'

    this.gs.http(url, body).subscribe(
      res => {
        console.log(res);
        this.returnObj = res;
        localStorage.id = this.postObj["id"];
        localStorage.password = this.postObj["password"];
        localStorage.token = this.returnObj["token"];
        console.log('Stored item!');
        console.log(localStorage.token);
        this.router.navigate(['/home']);
      },
      error => {
        console.log("error: " + error);
      }
    );
  }

}