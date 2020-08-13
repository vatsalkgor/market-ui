import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ItemAdapter, Item } from "../core/item.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor(private httpClient: HttpClient, private adapter: ItemAdapter) {}

  public getAllItem(): Observable<Item[]> {
    const url = `${environment.backend_url}/create/item`;
    return this.httpClient
      .get(url)
      .pipe(map((data: any[]) => data.map((item) => this.adapter.adapt(item))));
  }

  public insertItem(item): Observable<number> {
    const url = `${environment.backend_url}/create/item`;
    return this.httpClient
      .post(url, { ...item })
      .pipe(map((item) => (item as any).changes));
  }

  public updateItem(item): Observable<number> {
    const url = `${environment.backend_url}/create/item/${item.id}`;
    return this.httpClient
      .put(url, { ...item })
      .pipe(map((item) => (item as any).changes));
  }

  public deleteItem(id): Observable<number> {
    const url = `${environment.backend_url}/create/item/${id}`;
    return this.httpClient
      .delete(url, { ...id })
      .pipe(map((item) => (item as any).changes));
  }
}
