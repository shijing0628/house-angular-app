import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  subscribe(arg0: (data: any) => any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient) {}

  //for get property to be sure is an Array, so we use pipe to convert any to array
  getAllProperties(sellRent:number):Observable<IProperty[]>{
     return this.http.get('data/properties.json').pipe(
      map(data=>{
        const propertiesArray:Array<IProperty>=[];
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].sellRent === sellRent){
          propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
     );
   }
}
