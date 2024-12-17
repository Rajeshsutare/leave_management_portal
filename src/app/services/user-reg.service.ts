import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILeaves, Iusers } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserRegService {

  staffBaseUrl = 'http://localhost:3000/staffLeaves';
  baseUrl:string='http://localhost:3000/users';

 

  constructor(private _http:HttpClient) { }


  getAllUSers():Observable<any>{
    return this._http.get<any>(this.baseUrl)
  }

  createNewUser(userObj:any) : Observable<any>{
    return this._http.post<any>(this.baseUrl,userObj)
  }

  getLeaveData():Observable<any>{
    return this._http.get<any>(this.staffBaseUrl)
  }

  createLeave(obj:any):Observable<any>{
    return this._http.post<any>(this.staffBaseUrl,obj)
  }
  
  getSingleLeaveObj(id:any){
    return this._http.get<any>(`${this.staffBaseUrl}/${id}`)
  }

  updateLeave(leaveObj:any):Observable<any>{
    return this._http.patch<any>(`${this.staffBaseUrl}/${leaveObj.id}`,leaveObj)
  }

  deleteLeave(id:any){
    return this._http.delete<any>(`${this.staffBaseUrl}/${id}`)
  }
  
}
