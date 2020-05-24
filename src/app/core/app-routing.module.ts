import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { PartyComponent } from "../party/party.component";

const routes: Routes = [
  { path: "party", component: PartyComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
