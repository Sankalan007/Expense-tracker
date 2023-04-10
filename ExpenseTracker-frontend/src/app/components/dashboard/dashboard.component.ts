import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import PresetAverages from 'src/app/model/PresetAverages';
import PresetTransactions from 'src/app/model/PresetTransaction';
import Transaction from 'src/app/model/Transaction';
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
  presetAverages!: PresetAverages;
  userDetails!: User;
  userDetailsSet = false;
  transactions!: Transaction[];
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
    });

    this.getPresetTransactions();
    this.getPresetAverages();
    this.getFewTransactions();
  }

  formatTime(time: string) {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    return `${hour}:${minutes} ${suffix}`;
  }

  getPresetTransactions() {
    const userId = this.userDetails.id;
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
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

  getPresetAverages() {
    const userId = this.userDetails.id;
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    if (userId != null || userId != undefined) {
      this.transactionService.getPresetAverages(userId, date).subscribe(
        (res: PresetAverages) => {
          this.presetAverages = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  getFewTransactions() {
    this.transactionService
      .findAllTransactionsByCreatedDesc(this.userDetails.id)
      .subscribe(
        (res) => {
          this.transactions = res.slice(0, 3);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
