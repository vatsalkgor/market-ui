import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./core/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { DataTablesModule } from "angular-datatables";
import { LoginComponent } from "./login/login.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PartyComponent } from "./party/party.component";
import { GroupComponent } from "./group/group.component";
import { ItemComponent } from "./item/item.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    DashboardComponent,
    PartyComponent,
    GroupComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
