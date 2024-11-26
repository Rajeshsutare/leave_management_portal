import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRegService } from '../../../services/user-reg.service';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrl: './hod.component.less',
})
export class HODComponent implements OnInit {
  staffLeaveData: Array<any> = [];
  noOfDays: any=[];
  rejectedLeavesCount!: number ;
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
         e.leaveDays =  time / (1000 * 3600 * 24)
          console.log(this.staffLeaveData);
  
          return;
        }
  
      });
    });
 


  }
  onApproved(eve: any, mail: any) {
    this.staffLeaveData.find((ele: any) => {
      if (ele.id === eve && ele.email === mail) {
        console.log(ele);
        ele.isApproved = true;
        ele.isRejeted = false;
        ele.leaveStatus = "Approved";
        let updatedObj = {
          ...ele
        }
        console.log(updatedObj);
        this._userRegService.updateLeave(updatedObj).subscribe(res=>{
          console.log(res);
          
        })
      }
    });


  }

  onRejected(eve: any, mail: any) {
    this.staffLeaveData.find((ele: any) => {
      if (ele.id === eve && ele.email === mail) {
        console.log(ele);
        ele.isRejeted = true;
        ele.isApproved = false;
        ele.leaveStatus = "Rejected";
        let updatedObj = {
          ...ele
        }
        console.log(updatedObj);
        this._userRegService.updateLeave(updatedObj).subscribe(res=>{
          console.log(res);
          
        })
      }
    });
  }


}
