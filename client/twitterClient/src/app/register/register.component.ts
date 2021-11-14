import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../login/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm:any
  constructor(private fb:FormBuilder,private registerService:RegisterService,private router:Router) { }

  ngOnInit(): void {
  }

  uemail = new FormControl("",Validators.required);
  uname = new FormControl("",Validators.required);
  password = new FormControl("",Validators.required);

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.rForm = {
      uemail:this.uemail.value,
      uname:this.uname.value,
      password:this.password.value
    };

    this.registerService.registerUser(this.rForm).subscribe(
      (response)=>{
        alert(`Congratulations You are a registered user now`);
        this.router.navigate(['/login'])
      },
      (error)=>{
        sessionStorage.clear();
      }
    )
  }
}
