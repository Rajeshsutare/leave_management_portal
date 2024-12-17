import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ILeaves, Iusers } from '../../model/interfaces';
import { UserRegService } from '../../services/user-reg.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {

  departments: Array<any> = ['Sales', 'Marketing', 'Developer', 'QA', 'BA'];
  regForm !: FormGroup;
  newRegistartion !: boolean;
  allUsers: Array<Iusers> = []
  constructor(private _fb: FormBuilder,
    private fb: NonNullableFormBuilder,
    private _userService: UserRegService,
    private _router: Router,
    private _http: HttpClient,
    private _data: UserRegService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.createHodRegForm();
    this.getUsers();
  }

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  createHodRegForm() {
    this.regForm = this._fb.group({
      userrole: new FormControl(null, [Validators.required]),
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [Validators.required]),
      departmet: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required]),
      pass: new FormControl(null, [Validators.required]),
      startDate: [],
      endDate: [],
      reason: []
    })
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this._http.get<any>('http://localhost:3000/users').subscribe({
        next: res => {
          console.log(res);
          const users = res.find((val: any) => {
            return (val.user == this.validateForm.controls['userName'].value &&
              val.pass == this.validateForm.controls['password'].value &&
              val.userrole === 'HOD') ||
              (val.user == this.validateForm.controls['userName'].value &&
                val.pass == this.validateForm.controls['password'].value &&
                val.userrole === 'staff')
          })
          if (users.userrole === 'HOD') {
            localStorage.setItem('Token', 'JWT Token')
            this.notification.blank('Logged In SuccessFully As a HOD', "")
            this._router.navigate(['/HOD'])
          } else if (users.userrole === 'staff') {
            localStorage.setItem('Token', 'JWT Token')
            this.notification.blank('Logged In SuccessFully As a staff', "")
            this._router.navigate(['/staff'])
          }

        },
        error: error => {
          alert("error")
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });


    }

  }

  signUp() {
    console.log(this.regForm.value);
    this._userService.createNewUser(this.regForm.value).subscribe((res: any) => {
      console.log(res);
      this.allUsers.push(res);
      console.log(this.allUsers);
      this.notification.blank('Account Created Successfully...', "")
      this._router.navigate([''])
    })

  }

  getUsers() {
    this._userService.getAllUSers().subscribe(res => {
      console.log(res);
      this.allUsers.push(res)
    })
  }
}
