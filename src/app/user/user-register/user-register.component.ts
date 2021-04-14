import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/user-service.service';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']

})
export class UserRegisterComponent implements OnInit {
  registrationForm:FormGroup;
  user:User;
  userSubmitted:boolean;

  constructor(private fb:FormBuilder, private  userService: UserServiceService,private alertify:AlertifyService) { }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    //   cpassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(8)])
    // },this.passwordMatchingValidator);
    this.createRegistrationForm();
  }



    passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('cpassword').value ? null : {notmatched: true};
    }

createRegistrationForm(){
  this.registrationForm= this.fb.group({ 
     userName: [null, Validators.required],
     email: [null, [Validators.required, Validators.email]],
     password: [null, [Validators.required, Validators.minLength(8)]],
     cpassword: [null, Validators.required],
     mobile: [null, [Validators.required, Validators.maxLength(10)]]
  },{validators:this.passwordMatchingValidator})
}


 get userName(){
   return this.registrationForm.get('userName') as FormControl;
 }
 get email(){
   return this.registrationForm.get('email') as FormControl;
 }
  get password(){
   return this.registrationForm.get('password') as FormControl;
 }
  get cpassword(){
   return this.registrationForm.get('cpassword') as FormControl;
 }
  get mobile(){
   return this.registrationForm.get('mobile') as FormControl;
 }


 //--------------------------------------------------------------
  onSubmit(){
    console.log(this.registrationForm);
    this.userSubmitted=true;
    if(this.registrationForm.valid){
   // this.user = Object.assign(this.user, this.registrationForm.value);

    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted=false;
    this.alertify.success('Successfully resigistered.')
    }  else{
      this.alertify.error('Provide correct info please!')
    }


  }
 
   userData():User {
     return this.user={
       userName:this.userName.value,
       email:this.email.value,
       password:this.password.value,
       mobile:this.mobile.value
     }
   }


}
