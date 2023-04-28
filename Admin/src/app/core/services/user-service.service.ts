import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/auth.models";
@Injectable({
    providedIn: 'root'
  })
export class UserService {
    readonly API_URL = 'http://localhost:8080/Salafni';
  
  constructor(private httpClient: HttpClient) { }
  

  getAllUsers() : Observable<any> {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-Users`)

  }
  getUserById(id_user : any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-user/${id_user}`)
  }
  getUserByUsername(username : any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-user/${username}`)
  }

  addUser( User: Object):  Observable<Object>{
    return this.httpClient.post(`${this.API_URL}/add-User`, User )
  }
  editUser(User: Object):  Observable<Object>  {
    return this.httpClient.put(`${this.API_URL}/update-User`, User)
  }
  deleteUser(id_user : Object):  Observable<Object> {
    return  this.httpClient.delete(`${this.API_URL}/remove-user/${id_user}`)
  }
  
  Inscription(User:Object):  Observable<Object> {
    return this.httpClient.post(`${this.API_URL}/register`, User )
  }
   
  Verify(verificationToken:any){
    return this.httpClient.put(`${this.API_URL}/verify/${verificationToken}`,verificationToken)
  }

}

