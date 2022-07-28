import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountserviceService } from '../accountservice.service';
import { LoginInfo } from '../loginInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  dataSaved = false;
  dataSavedErr = false;
  message!: string;
  errMsg!:String;

  constructor(private formbuilder: FormBuilder, private accountService: AccountserviceService, private router:Router) {
    if(localStorage.getItem('Loginuser')){
      router.navigate(['/']);
    }
   }


  ngOnInit(): void {
    this.setFormState();
  }

  setFormState(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }
  get password(){
    return this.loginForm.get('password');
  }
  get email(){
    return this.loginForm.get('email');
  }
  userLogin(){
    this.accountService.login(this.loginForm.value).subscribe((data:any)=>{
      console.log(data)
      let resp = JSON.stringify(data);
      if(data['status']=="Success"){
        this.router.navigate(['/about-us']);
        window.location.reload();
        this.dataSavedErr = false;
        this.dataSaved = true;
        this.message =data['msg'];
        
      }else if(data['status']=='Error'){
        this.dataSaved = false;
        this.dataSavedErr = true;
        this.errMsg =data['msg'];
      }
      if(data['status']=="Success"){
        localStorage.setItem('Loginuser',resp);
        console.log("cookie set",resp);
      }else{
        localStorage.removeItem('Loginuser');
      }
     
    })
    this.loginForm.reset();

  }

}