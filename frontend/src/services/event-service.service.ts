import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  
  private apiUrl = 'http://localhost:1997/api/manageEvents';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl + '/events'  );
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrl +'/add', event);
  }

   updateEvent(event: any,updateData:any): Observable<any> {
    console.log('update event service', event,updateData);
    return this.http.put(this.apiUrl +`/update/${event._id}`,updateData);
  }

  deleteEvent(id: any) {
  return this.http.delete(this.apiUrl +`/delete/${id}`);
}
}
