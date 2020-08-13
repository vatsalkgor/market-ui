import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ItemService } from "../services/item.service";
import { Item } from "../core/item.model";
import { GroupService } from "../services/group.service";
import { Group } from "../core/group.model";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private groupService: GroupService,
    private elRef: ElementRef
  ) {}

  myControl = new FormControl();
  public error;
  public insert = false;
  public update = true;
  public items: Item[];
  public groups: Group[];
  public filteredGroups: Observable<Group[]>;
  public tableColumns: string[] = ["Name", "Group", "Edit", "Delete"];
  dataSource;

  public newItem: any = {};
  private refreshItem() {
    this.itemService.getAllItem().subscribe((data) => {
      this.items = data;
    });
    this.groupService.getAllGroup().subscribe((data) => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  ngOnInit(): void {
    this.refreshItem();
  }

  public insertItem() {
    console.log(this.newItem);
  }

  public edit() {}
  public updateItem() {}

  public delete() {}
}
