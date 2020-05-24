import { Component, OnInit, ViewChild } from "@angular/core";
import { Party } from "../core/party.model";
import { PartyService } from "../services/party.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.css"],
})
export class PartyComponent implements OnInit {
  constructor(
    private partyService: PartyService,
    private snackbar: MatSnackBar
  ) {}

  public name: string;
  public type: number;
  public contact: string = "";
  public pending_amount: number;
  public updateId: number;

  public insert: boolean = false;
  public update: boolean = true;

  public tableColumns: string[] = [
    "Name",
    "Type",
    "Contact",
    "Pending Amount",
    "Edit",
    "Delete",
  ];
  public parties: Party[];

  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private refreshParties() {
    this.partyService.getAllParties().subscribe((data) => {
      this.parties = data;
      this.dataSource = new MatTableDataSource<Party>(this.parties);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    this.refreshParties();
  }

  public insertParty() {
    const partyObject = {
      name: this.name,
      type: this.type,
      contact: this.contact,
      pending_amount: this.pending_amount,
    };
    this.partyService.insertParty(partyObject).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
        this.snackbar.open("Party Added!", "", {
          duration: 2000,
        });
      } else {
        this.snackbar.open("Something went wrong! Please Retry.", "", {
          duration: 2000,
        });
      }
    });
  }

  public edit(id) {
    let found = this.parties.find((element) => {
      return element.id == id;
    });
    this.updateId = found.id;
    this.name = found.name;
    this.type = found.type;
    this.contact = found.contact;
    this.pending_amount = found.pending_amount;
    this.insert = true;
    this.update = false;
  }

  public updateParty() {
    const partyObject = {
      id: this.updateId,
      name: this.name,
      type: this.type,
      contact: this.contact,
      pending_amount: this.pending_amount,
    };
    this.partyService.updateParty(partyObject).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
        this.insert = !this.insert;
        this.update = !this.update;
        this.snackbar.open("Party Changed!", "", {
          duration: 2000,
        });
      } else {
        this.snackbar.open("Something went wrong! Please Retry.", "", {
          duration: 2000,
        });
      }
    });
  }

  public delete(id) {
    this.partyService.deleteParty(id).subscribe((data) => {
      if (data == 1) {
        this.refreshParties();
        this.snackbar.open("Party Deleted!", "", {
          duration: 2000,
        });
      } else {
        this.snackbar.open("Something went wrong! Please Retry.", "", {
          duration: 2000,
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
