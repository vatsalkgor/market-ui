import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public authenticate(username: string, password: string) {
    return this.httpClient.post(environment.backend_url, {
      username,
      password,
    });
  }
}
