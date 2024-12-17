import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRegService } from '../../../services/user-reg.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrl: './hod.component.less',
})
export class HODComponent implements OnInit {
  staffLeaveData: Array<any> = [];
  noOfDays: any = [];
  rejectedLeavesCount!: number;
  HODArray!: any[];
  constructor(private _userRegService: UserRegService,
    private _router: Router,
    private notification: NzNotificationService
  ) {
    this._userRegService.getAllUSers().subscribe((res: any) => {
      console.log(res);
      this.HODArray = res.filter((hod: any) => hod.userrole === 'HOD')
    })
  }
  ngOnInit(): void {


    this._userRegService.getLeaveData().subscribe((res) => {
      console.log(res);
      this.staffLeaveData = res;
    });



  }
  onApproved(id: any) {
    console.log(id);
    this._userRegService.getSingleLeaveObj(id).subscribe(res => {
      console.log(res);

      if (res.id === id) {
        res.isApproved = true;
        res.isRejeted = false;
        res.leaveStatus = "Approved";
        this._userRegService.updateLeave(res).subscribe(res => {
          console.log(res);
          this.notification.blank('You Have Approved Leave', "")
          window.location.reload();
        })
      }

    })




  }

  onRejected(id: any) {
    this._userRegService.getSingleLeaveObj(id).subscribe(res => {
      console.log(res);
      if (res.id === id) {
        res.isApproved = false;
        res.isRejeted = true;
        res.leaveStatus = "Rejected";
        this._userRegService.updateLeave(res).subscribe(res => {
          console.log(res);
          this.notification.blank('You Have Rejected Leave', "")
          window.location.reload();
        })
      }

    })
  }

  onLogOut() {
    localStorage.removeItem('Token');
    this._router.navigateByUrl("");
    this.notification.blank('Logged Out SuccessFully ', "")
  }


}
