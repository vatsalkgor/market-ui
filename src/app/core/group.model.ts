import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class Group {
  constructor(
    public id: number,
    public name: string,
    public fcom: number,
    public fwage: number,
    public ccom: number,
    public cwage: number
  ) {}
}

@Injectable({ providedIn: "root" })
export class GroupAdapter implements Adapter<Group> {
  adapt(item: any): Group {
    return new Group(
      item.id,
      item.name,
      item.fcom,
      item.fwage,
      item.ccom,
      item.cwage
    );
  }
}
