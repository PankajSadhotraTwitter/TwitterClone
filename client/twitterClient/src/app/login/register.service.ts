import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import {Tweet} from '../tweet'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  login(userCredential:User):Observable<any>{
    return this.http.post("http://localhost:3000/user/login",userCredential) as Observable<any>;
  }

  registerUser(newUser:User) : Observable<any>{
    return this.http.post("http://localhost:3000/user/register",newUser) as Observable<any>;
  }

  getfeed(user:any) : Observable<Tweet[][]>{
    return this.http.post("http://localhost:3000/tweet/feed",user) as Observable<Tweet[][]>;
  }

  postTweet(tweet:any)  : Observable<any>{
    return this.http.post("http://localhost:3000/tweet/postTweet",tweet) as Observable<any>;
  }
}
