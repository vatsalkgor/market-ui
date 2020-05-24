import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";

export class Party {
  constructor(
    public id: number,
    public name: string,
    public type: number,
    public contact: string,
    public pending_amount: number
  ) {}
}

@Injectable({ providedIn: "root" })
export class PartyAdapter implements Adapter<Party> {
  adapt(item: any): Party {
    return new Party(
      item.id,
      item.name,
      item.type,
      item.contact,
      item.pending_amount
    );
  }
}
