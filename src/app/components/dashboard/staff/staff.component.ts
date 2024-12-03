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
  leaveData: any = [];
  // noOfDays: any;
  totalLeaves: number = 28;
  approvedLeave : number = 0;
  rejectedLeave : number = 0;
  constructor(
    private _fb: FormBuilder,
    private _userRegService: UserRegService
  ) { 
      this._userRegService.getLeaveData().subscribe(res => {
      console.log(res);
      this.leaveData = res;
      this.calcuteLaves();
    })
  }
  ngOnInit(): void {
    this.createLeaveForm();
    



  }


  createLeaveForm() {
    this.leaveForm = this._fb.group({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      leaveDays: "",
      leaveStatus: "Pending",
      isApproved: false,
      isRejeted: false
    });

  }

  onLeaveform() {
    console.log(this.leaveForm.value);
    this.calculateDiff();
    this._userRegService.createLeave(this.leaveForm.value).subscribe(res => {
      console.log(res);
      this.leaveData = res;
      console.log(this.leaveData);
      window.location.reload();
    })

    this.showLeaveForm = !this.showLeaveForm;
  }



  calculateDiff():any {
    let start = new Date(this.leaveForm.controls['startDate'].value);
    let end = new Date(this.leaveForm.controls['endDate'].value);
    const time = Math.abs(end.getTime() - start.getTime());
    const noOfDays = time / (1000 * 3600 * 24);
    this.leaveForm.get('leaveDays')?.setValue(noOfDays);
    console.log(this.leaveForm.get('leaveDays')?.value);
    
    
  }



  calcuteLaves() {

    this.leaveData.forEach((el:any)=>{
     if(el.isApproved === true){
      this.approvedLeave = this.approvedLeave + parseInt(el.leaveDays);
     }else if(el.isRejeted === true){
      this.rejectedLeave = this.rejectedLeave + parseInt(el.leaveDays) ;
     }else{
      this.totalLeaves;
     }
      
    })

    

  }
}
