import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder,private registerService:RegisterService,private router:Router) { }

  errorMessage:string;
  successMessage:string;
  loginForm:any;

  uemail = new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]);
  password=new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]);
  ngOnInit(): void {
    if(sessionStorage.getItem("uemail")){
      this.router.navigate(['/home'])
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

  login(){
    this.loginForm={
      uemail:this.uemail.value,
      password:this.password.value
    };
    
    this.registerService.login(this.loginForm).subscribe(
      (response)=>{
        sessionStorage.setItem('uemail',response.data[0].uemail);
        sessionStorage.setItem('password',response.data[0].password);
        this.router.navigate(['/home']);
      },
      (errorResponse)=>{
        this.errorMessage=errorResponse.error.message;
        alert(this.errorMessage);
        this.router.navigate(['/register']);
        sessionStorage.clear();
      }
    )
  }

  
}
