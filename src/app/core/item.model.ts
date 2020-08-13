import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class Item {
  constructor(public id: number, public name: string, public group: number) {}
}

@Injectable({ providedIn: "root" })
export class ItemAdapter implements Adapter<Item> {
  adapt(item: any): Item {
    return new Item(item.id, item.name, item.group);
  }
}
