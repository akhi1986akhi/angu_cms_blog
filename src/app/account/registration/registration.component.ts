import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // regForm = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  //   password:new FormControl('')
  // })

  regForm!:FormGroup;
  dataSaved = false;
  dataSavedErr = false;
  message!: string;
  errMsg!:String;
  constructor(private formbuilder: FormBuilder, private accountService: AccountserviceService) {

   }
 
  ngOnInit() {
    this.setFormState();
  }

  
  setFormState(): void {
    this.regForm = this.formbuilder.group({
       name: ['', [Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }
  // validation getter
get name(){
  return this.regForm.get('name');
}
get password(){
  return this.regForm.get('password');
}
get email(){
  return this.regForm.get('email');
}
  onSubmit() {
    
    this.accountService.users().subscribe((data)=>{
      console.log(data);
    })

    this.regForm.reset();
  }

  postData(){
    this.accountService.createAccount(this.regForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data['msg1']){
        this.dataSavedErr = true;
        this.dataSaved = false;
        this.errMsg = data['msg1'];
      }else{
        // alert("Data inserted successfully");
        this.dataSavedErr = false;
        this.dataSaved = true;
        this.message = data['msg'];
      }
    })
    this.regForm.reset();
  }
  
  }


