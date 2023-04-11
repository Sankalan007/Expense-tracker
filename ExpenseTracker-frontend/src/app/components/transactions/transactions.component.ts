import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/shareddata/shareddata.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  userDetails!: User;

  filterType!: string;
  startDate!: string;
  endDate!: string;
  order!: string;
  presetFilter!: string;

  showAlert: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private sharedDataService: ShareddataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });
    this.sharedDataService.transactionsObservable.subscribe(
      (res: Transaction[]) => {
        this.transactions = res;
      },
      (error) => {
        alert(error.message);
      }
    );
    this.getAllTransactions();
  }

  resetFilters() {
    // reset filter properties here
    this.filterType = 'preset' ? 'custom' : 'preset';
  }
  resetDailyFilters() {}

  applyButtonDisabled() {
    if (this.filterType != null) {
      if (this.filterType === 'preset') {
        if (this.presetFilter != null) {
          if (this.order != null) return true;
          else return false;
        } else return false;
      } else if (this.filterType == 'custom') {
        if (
          (this.startDate != null || this.endDate != null) &&
          this.startDate <= this.endDate
        ) {
          if (this.order != null) return true;
          else return false;
        } else return false;
      } else return false;
    }
    return false;
  }

  applyFilters() {
    console.log(
      this.filterType,
      this.presetFilter,
      this.startDate,
      this.endDate,
      this.order
    );
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'daily' &&
      this.order === 'asc'
    )
      this.getDailyTransactions();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'monthly' &&
      this.order === 'asc'
    )
      this.getMonthlyTransactions();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'annual' &&
      this.order === 'asc'
    )
      this.getAnnualTransactions();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'all' &&
      this.order === 'asc'
    )
      this.getAllTransactionsByAsc();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'daily' &&
      this.order === 'desc'
    )
      this.getDailyTransactionsDesc();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'monthly' &&
      this.order === 'desc'
    )
      this.getMonthlyTransactionsDesc();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'annual' &&
      this.order === 'desc'
    )
      this.getAnnualTransactionsDesc();
    if (
      this.filterType === 'preset' &&
      this.presetFilter === 'all' &&
      this.order === 'desc'
    )
      this.getAllTransactions();
    if (
      this.filterType === 'custom' &&
      this.startDate != null &&
      this.endDate != null &&
      this.order === 'asc'
    )
      this.getTransactionsBetween();
    if (
      this.filterType === 'custom' &&
      this.startDate != null &&
      this.endDate != null &&
      this.order === 'desc'
    )
      this.getTransactionsBetweenDesc();
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

  getAllTransactions() {
    this.transactionService
      .findAllTransactionsByCreatedDesc(this.userDetails.id)
      .subscribe(
        (res) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  deleteTransaction(transactionId: number) {
    this.transactionService.deleteTransaction(transactionId).subscribe(
      (res: void) => {
        this.getAllTransactions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllTransactionsByAsc() {
    this.transactionService.findAllTransactions(this.userDetails.id).subscribe(
      (res) => {
        this.transactions = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getDailyTransactions() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getDailyTransaction(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getMonthlyTransactions() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getMonthlyTransaction(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getAnnualTransactions() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getAnnualTransaction(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getDailyTransactionsDesc() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getDailyTransactionDesc(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getMonthlyTransactionsDesc() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getMonthlyTransactionDesc(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getAnnualTransactionsDesc() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getAnnualTransactionDesc(this.userDetails.id, date)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getTransactionsBetween() {
    this.transactionService
      .getTransactionsBetween(this.userDetails.id, this.startDate, this.endDate)
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  getTransactionsBetweenDesc() {
    this.transactionService
      .getTransactionsBetweenDesc(
        this.userDetails.id,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (res: Transaction[]) => {
          this.transactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
