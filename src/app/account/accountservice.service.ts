import { Injectable } from '@angular/core';
import {Accountinfo} from './accountinfo';
import{LoginInfo}from './loginInfo';
import{HttpClient}from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {
  url="http://localhost:3000/";
  constructor(private http:HttpClient) { }
  createAccount(data:Accountinfo){
    return this.http.post(this.url+"user/register",data);
  }
  users(){
    return this.http.get(this.url);
  }
  login(data:LoginInfo){
    return this.http.post(this.url+"user/login",data)
  }
}
