import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})


export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm:NgForm;
   @ViewChild('formTabs') formTabs: TabsetComponent;
   addPropertyForm: FormGroup;

  propertyTypes:Array<string> =['house','apartment','duplex'];
  furnishTypes:Array<string> =['fully','semi','unfurnished'];

  // right privew part
  propertyView:IPropertyBase ={
    id:null,
    name:'',
    price:null,
    sellRent:null,
    pType:null,
    fType:null,
    BHK:null,
    builtArea:null,
    city:null,
    RTM:null
  }


  constructor(private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
   this.addPropertyForm=this.fb.group({
     BasicInfo:this.fb.group({
          sellRent:[null,Validators.required],
          pType:[null,Validators.required],
          name:[null,Validators.required],
          city:[null,Validators.required],
     }),
     PriceInfo:this.fb.group({
          price:[null,Validators.required],
          builtArea:[null,Validators.required]
     })
    
   })
  }
  
   get BasicInfo(){
     return this.addPropertyForm.controls.BasicInfo as FormGroup;
   }

  onBack(){
    this.router.navigate(['/'])
  }
  onSubmit(){
    console.log('hi')
    console.log(this.addPropertyForm)
  }
  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }



}
