import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { isNumber } from "util";
import { GroupService } from "../services/group.service";
import { Group } from "../core/group.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"],
})
export class GroupComponent implements OnInit {
  constructor(
    private groupService: GroupService,
    private snackbar: MatSnackBar,
    private elRef: ElementRef
  ) {}

  public error;
  public insert = false;
  public update = true;
  public groups: Group[];
  public tableColumns: string[] = [
    "Name",
    "Farmer Commission",
    "Farmer Wage",
    "Customer Commission",
    "Customer Wage",
    "Edit",
    "Delete",
  ];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public newGroup: any = {};
  private refreshGroup() {
    this.groupService.getAllGroup().subscribe((data) => {
      this.groups = data;
      this.dataSource = new MatTableDataSource<Group>(this.groups);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.refreshGroup();
  }

  public insertGroup() {
    console.log(typeof this.newGroup.fcom);
    if (
      !isNaN(this.newGroup.fcom) &&
      !isNaN(this.newGroup.fwage) &&
      !isNaN(this.newGroup.ccom) &&
      !isNaN(this.newGroup.cwage)
    ) {
      this.error = "";
      this.groupService.insertGroup(this.newGroup).subscribe((data) => {
        if (data == 1) {
          this.refreshGroup();
          this.elRef.nativeElement.querySelector("input[name='name']").focus();
          this.newGroup = {};
          this.snackbar.open("Group Added!", "", {
            duration: 2000,
          });
        } else {
          this.snackbar.open("Something went wrong! Please Retry.", "", {
            duration: 2000,
          });
        }
      });
    } else {
      this.error = "Enter Valid Values for commision and wage.";
    }
  }

  public edit(id) {
    let found = this.groups.find((element) => {
      return element.id == id;
    });
    this.newGroup = found;
    this.insert = true;
    this.update = false;
  }

  public updateGroup() {
    const groupObject = {
      ...this.newGroup,
    };
    this.groupService.updateGroup(groupObject).subscribe((data) => {
      if (data == 1) {
        this.refreshGroup();
        this.insert = !this.insert;
        this.update = !this.update;
        this.newGroup = {};
        this.snackbar.open("Group Changed!", "", {
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
    this.groupService.deleteGroup(id).subscribe((data) => {
      if (data == 1) {
        this.refreshGroup();
        this.snackbar.open("Group Deleted!", "", {
          duration: 2000,
        });
      } else {
        this.snackbar.open("Something went wrong! Please Retry.", "", {
          duration: 2000,
        });
      }
    });
  }
}
