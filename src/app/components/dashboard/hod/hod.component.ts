import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRegService } from '../../../services/user-reg.service';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrl: './hod.component.less',
})
export class HODComponent implements OnInit {
  staffLeaveData: Array<any> = [];
  noOfDays: any = [];
  rejectedLeavesCount!: number;
  constructor(private _userRegService: UserRegService) { }
  ngOnInit(): void {


    this._userRegService.getLeaveData().subscribe((res) => {
      console.log(res);
      this.staffLeaveData = res;
      this.staffLeaveData.forEach((e: any) => {
        if (e.startDate) {
          let startdate = e.startDate;
          let endtdate = e.endDate;
          let start = new Date(startdate);
          let end = new Date(endtdate);
          const time = Math.abs(end.getTime() - start.getTime());
          e.leaveDays = time / (1000 * 3600 * 24)
          console.log(this.staffLeaveData);

          return;
        }

      });
    });



  }
  onApproved(id: any, mail: any) {
    console.log(id);
    this._userRegService.getSingleLeaveObj(id).subscribe(res => {
      console.log(res);

      if (res.id === id) {
        res.isApproved = true;
        res.isRejeted = false;
        res.leaveStatus = "Approved";
        this._userRegService.updateLeave(id, res).subscribe(res => {
          console.log(res);
          window.location.reload();
        })
      }

    })




  }

  onRejected(id: any, mail: any) {
    this._userRegService.getSingleLeaveObj(id).subscribe(res => {
      console.log(res);
      if (res.id === id) {
        res.isApproved = false;
        res.isRejeted = true;
        res.leaveStatus = "Rejected";
        this._userRegService.updateLeave(id, res).subscribe(res => {
          console.log(res);
          window.location.reload();
        })
      }

    })
  }


}
