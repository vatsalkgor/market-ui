import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { isNumber } from "util";
import { GroupService } from "../services/group.service";
import { Group } from "../core/group.model";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"],
})
export class GroupComponent implements OnInit {
  constructor(private groupService: GroupService, private elRef: ElementRef) {}

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

  public newGroup: any = {};
  private refreshGroup() {
    this.groupService.getAllGroup().subscribe((data) => {
      this.groups = data;
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
        } else {
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
      } else {
      }
    });
  }

  public delete(id) {
    this.groupService.deleteGroup(id).subscribe((data) => {
      if (data == 1) {
        this.refreshGroup();
      } else {
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
