import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../login/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uemail:any;
  tweetList:any[][]
  tweetForm:any;
  constructor(private formbuilder:FormBuilder,private registerService:RegisterService,private router:Router) { }

  ngOnInit(): void {

    this.loadData();
  }

  tweettext = new FormControl("");

  loadData(){
    this.uemail=sessionStorage.getItem("uemail");
    if(this.uemail){
      let user = {
        uemail:this.uemail
      };
      this.registerService.getfeed(user).subscribe(
        (response)=>{
          this.tweetList=response
        }
      ),
      (errorResponse)=>{
        alert('No tweets availble');
      }
    }
  }


  postTweet(){
    console.log(this.tweettext)
    this.tweetForm={
      uemail : sessionStorage.getItem("uemail"),
      tweet : this.tweettext.value
    };
    console.log(this.tweetForm)
    this.registerService.postTweet(this.tweetForm).subscribe(
      (response)=>{
        this.router.navigate(['/']);
        console.log("New Tweet added");
      }
    ),
    (errorResponse)=>{
      alert(`check your Internet`);
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
}