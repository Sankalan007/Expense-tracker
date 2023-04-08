import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import PresetTransactions from 'src/app/model/PresetTransaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/shareddata/shareddata.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  presetTransactions!: PresetTransactions;
  userDetails!: User;
  userDetailsSet = false;
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private sharedDataService: ShareddataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
      console.log(res);
    });
    this.sharedDataService.userDetailsSet$.subscribe(() => {
      this.userDetailsSet = true;
      this.cdr.detectChanges();
    });
    this.getPresetTransactions();
  }

  getPresetTransactions() {
    const userId = this.userDetails.id;
    const date = new Date().toISOString().substring(0, 10);
    if (userId != null || userId != undefined) {
      this.transactionService.getPresetTransactions(userId, date).subscribe(
        (res: PresetTransactions) => {
          this.presetTransactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
