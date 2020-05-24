import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private _router: Router) {}
  username: string = "vatsal";
  password: string = "vatsal";
  error: string;
  ngOnInit(): void {}

  login(): void {
    this.loginService
      .authenticate(this.username, this.password)
      .subscribe((data) => {
        if ((data as any).status == 1) {
          this._router.navigate(["dashboard"]);
        } else {
          this.error = "Username or password is incorrect.";
        }
      });
  }
}
