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

  getAllTransactions() {
    this.transactionService.findAllTransactions(this.userDetails.id).subscribe(
      (res) => {
        this.transactions = res;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
