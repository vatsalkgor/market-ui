import { Injectable } from "@angular/core";
import { Party, PartyAdapter } from "../core/party.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PartyService {
  constructor(private httpClient: HttpClient, private adapter: PartyAdapter) {}

  public getAllParties(): Observable<Party[]> {
    const url = `${environment.backend_url}/create/party`;
    return this.httpClient
      .get(url)
      .pipe(map((data: any[]) => data.map((item) => this.adapter.adapt(item))));
  }

  public insertParty(partyObject): Observable<number> {
    const url = `${environment.backend_url}/create/party`;
    return this.httpClient
      .post(url, { ...partyObject })
      .pipe(map((item) => (item as any).changes));
  }

  public updateParty(partyObject): Observable<number> {
    const url = `${environment.backend_url}/create/party/${partyObject.id}`;
    return this.httpClient
      .put(url, { ...partyObject })
      .pipe(map((item) => (item as any).changes));
  }

  public deleteParty(id): Observable<number> {
    const url = `${environment.backend_url}/create/party/${id}`;
    return this.httpClient
      .delete(url, { ...id })
      .pipe(map((item) => (item as any).changes));
  }
}
