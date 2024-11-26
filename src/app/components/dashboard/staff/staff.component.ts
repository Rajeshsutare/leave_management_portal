import { Component, EventEmitter, Input, input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRegService } from '../../../services/user-reg.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.less',
})
export class StaffComponent implements OnInit {
  startValue: Date | null = null;
  endValue: Date | null = null;

  leaveForm!: FormGroup;
  showLeaveForm: boolean = false;
  dashBoardData: boolean = false;
  leaveData:any=[];
  noOfDays: any;
  totalLeaves:number=28;
  approvedLeave :number=0;
  rejectedLeave :number=0;
  constructor(
    private _fb: FormBuilder,
    private _userRegService: UserRegService
  ) {}
  ngOnInit(): void {
    this.createLeaveForm();
    this._userRegService.getLeaveData().subscribe(res=>{
      console.log(res);
      this.leaveData = res;
    })
    

  }

  
  createLeaveForm() {
    this.leaveForm = this._fb.group({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      leaveDays: "",
      leaveStatus: "",
      isApproved: false,
      isRejeted: false
    });
    
  }

  onLeaveform() {
    console.log(this.leaveForm.value);
    this._userRegService.createLeave(this.leaveForm.value).subscribe(res=>{
      console.log(res);
      this.leaveData = res;
      this.leaveData.forEach((el:any)=>{
        console.log(el);
        // let start = new Date(this.leaveForm.controls['startDate'].value);
        // let end = new Date(this.leaveForm.controls['endDate'].value);
        // const time = Math.abs(end.getTime() - start.getTime());
        // el.leaveDays  = time / (1000 * 3600 * 24);
        // console.log(el.leaveDays);
        
        return;
      })
      })
    
    this.showLeaveForm = !this.showLeaveForm;
  }



  // calculateDiff() {
  //   let start = new Date(this.leaveForm.controls['startDate'].value);
  //   let end = new Date(this.leaveForm.controls['endDate'].value);
  //   const time = Math.abs(end.getTime() - start.getTime());
  //   this.noOfDays = time / (1000 * 3600 * 24);
  // }



  calcuteLaves() {
    this.totalLeaves = this.totalLeaves - this.approvedLeave;
    
  }
}
