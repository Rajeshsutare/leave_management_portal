import { Component, EventEmitter, Input, input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRegService } from '../../../services/user-reg.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import en from '@angular/common/locales/en';
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
  approvedLeave: number = 0;
  rejectedLeave: number = 0;
  staffData !: any[];
  staffArray !: any[];
  isVisible = false;
  // iconVisible: boolean = false;
  updateBtnVisible: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private _userRegService: UserRegService,
    private _router: Router,
    private notification: NzNotificationService
  ) {

    this._userRegService.getLeaveData().subscribe(res => {
      console.log(res);
      this.leaveData = res;
      console.log(this.leaveData);
      this.calcuteLaves();
    });
    this._userRegService.getAllUSers().subscribe((res: any) => {
      console.log(res);
      this.staffArray = res;
      this.staffFilter();
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
      isRejeted: false,
      userName: "",
      departmentName: ""
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
      this.notification.blank('Leave Applied Successfully', "")
      this.isVisible = false;
      // this.iconVisible = true;


    })
    this.showLeaveForm = !this.showLeaveForm;
  }






  calcuteLaves() {

    this.leaveData.forEach((el: any) => {
      if (el.isApproved === true) {
        this.approvedLeave = this.approvedLeave + parseInt(el.leaveDays);
      } else if (el.isRejeted === true) {
        this.rejectedLeave = this.rejectedLeave + parseInt(el.leaveDays);
      } else {
        this.totalLeaves;
      }

    })

  }

  onLogOut() {
    localStorage.removeItem('Token');
    this._router.navigateByUrl("");
    this.notification.blank('Logged Out Successfully', "")

  }

  staffFilter() {
    this.staffData = this.staffArray.filter(((staff: any) => staff.userrole === "staff"));
    console.log(this.staffData);
    const user = this.staffData[0]['user'];
    this.leaveForm.get('userName')?.setValue(user);
    const department = this.staffData[0]['departmet'];
    this.leaveForm.get('departmentName')?.setValue(department)

  }

  showModal(): void {
    this.isVisible = true;
  }

  deleteLeave(id: any) {
    document.getElementById(id)?.remove();
    this._userRegService.deleteLeave(id).subscribe((res: any) => { })
    this.notification.blank('Leave Deleted Successfully !!!', "");
    window.location.reload();
  }

  editLeave(id: any) {
    console.log(id);
    this.showModal();
    this.updateBtnVisible = false;
    this._userRegService.getSingleLeaveObj(id).subscribe((res => {
      console.log(res);
      this.leaveForm.patchValue(res)
    }))
  }

  updateLeave(id: any) {
    console.log(id);
    this._userRegService.getSingleLeaveObj(id).subscribe((res: any) => {
      console.log(res);

      if (res.id === id) {
        res.startDate = this.leaveForm.controls['startDate'].value,
          res.endDate = this.leaveForm.controls['endDate'].value,
          res.reason = this.leaveForm.controls['reason'].value;
          res.startDate = new Date(this.leaveForm.controls['startDate'].value);
          res.endDate = new Date(this.leaveForm.controls['endDate'].value);
          const time = Math.abs(res.endDate.getTime() - res.startDate.getTime());
          res.leaveDays = Math.round(time / (1000 * 3600 * 24));
        this._userRegService.updateLeave(res).subscribe((res: any) => {
          console.log(res);
          this.notification.blank('Leave Updated Successfully !!!', "");
          this.isVisible = false;
          window.location.reload();
        })
      }

    })


  }


  calculateDiff(): any {
    let start = new Date(this.leaveForm.controls['startDate'].value);
    let end = new Date(this.leaveForm.controls['endDate'].value);
    const time = Math.abs(end.getTime() - start.getTime());
    const noOfDays = Math.round(time / (1000 * 3600 * 24));
    this.leaveForm.get('leaveDays')?.setValue(noOfDays);
    console.log(this.leaveForm.get('leaveDays')?.value);


  }

}
