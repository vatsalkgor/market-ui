import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Party } from "../core/party.model";
import { PartyService } from "../services/party.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import * as $ from "jquery";

@Component({
  selector: "app-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.css"],
})
export class PartyComponent implements OnInit {
  constructor(private partyService: PartyService, private elRef: ElementRef) {}

  public party: any = {};

  public parties: Party[];
  dtOptions: DataTables.Settings = {};
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  isDtInitialized: boolean = false;

  private refreshParties() {
    this.partyService.getAllParties().subscribe((data) => {
      this.parties = data;
      // https://stackoverflow.com/a/59051036
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    });
    $("#update").attr("disabled", "true");
  }
  @ViewChild(DataTableDirective, { static: false })
  ngOnInit(): void {
    this.refreshParties();
  }
  ngAfterViewInit() {
    $("input[type=search]").addClass("guj");
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public insertParty() {
    this.partyService.insertParty(this.party).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
        this.elRef.nativeElement.querySelector("input[name='name']").focus();
      }
    });
  }

  public edit(id) {
    let found = this.parties.find((element) => {
      return element.id == id;
    });
    this.party = found;
    $("#update").removeAttr("disabled");
    $("#insert").attr("disabled", "true");
  }

  public updateParty() {
    this.partyService.updateParty(this.party).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
        $("#insert").removeAttr("disabled");
        $("#update").attr("disabled", "true");
        this.party = {};
      } else {
      }
    });
  }

  public delete(id) {
    this.partyService.deleteParty(id).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
      } else {
      }
    });
  }
}
