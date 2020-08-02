import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ObjectID } from "mongodb"

interface Users {
  id: ObjectID;
  Email: string;
  Password: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Credentials': 'true'
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private baseURI = "http://localhost:8080/api"
  Users: Observable<Users>;
  myForm: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  ngOnInit() { 
    this.myForm = this.fb.group({
      Email: new FormControl(),
      Password: new FormControl()
    })
    this.http.get<any>(`${this.baseURI}/get`).subscribe(data => {
     this.Users = data;
    })
  }
  onSubmit() {
    let Users = JSON.stringify(this.myForm.value)
    console.log(Users)
    this.http.post<any>(`${this.baseURI}/post`, Users, httpOptions).subscribe(err => {
      if (!err) console.log("Success")
      else console.log(err)
    })
  }
  delete(_id: ObjectID) {
    this.http.delete(`${this.baseURI}/delete/${_id}`, httpOptions).subscribe(err => {
      if (!err) console.log("Success")
      else console.log(err)
    })
    
  }
}
