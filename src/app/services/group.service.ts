import { Injectable } from "@angular/core";
import { Group, GroupAdapter } from "../core/group.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  constructor(private httpClient: HttpClient, private adapter: GroupAdapter) {}
  public getAllGroup(): Observable<Group[]> {
    const url = `${environment.backend_url}/create/group`;
    return this.httpClient
      .get(url)
      .pipe(map((data: any[]) => data.map((item) => this.adapter.adapt(item))));
  }

  public insertGroup(groupObject): Observable<number> {
    const url = `${environment.backend_url}/create/group`;
    return this.httpClient
      .post(url, { ...groupObject })
      .pipe(map((item) => (item as any).changes));
  }

  public updateGroup(groupObject): Observable<number> {
    const url = `${environment.backend_url}/create/group/${groupObject.id}`;
    return this.httpClient
      .put(url, { ...groupObject })
      .pipe(map((item) => (item as any).changes));
  }

  public deleteGroup(id): Observable<number> {
    const url = `${environment.backend_url}/create/group/${id}`;
    return this.httpClient
      .delete(url, { ...id })
      .pipe(map((item) => (item as any).changes));
  }
}
