import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/shareddata/shareddata.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-newtransaction',
  templateUrl: './newtransaction.component.html',
  styleUrls: ['./newtransaction.component.css'],
})
export class NewtransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  userDetails!: User;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private sharedDataService: ShareddataService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });

    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      transactionDate: ['', Validators.required],
      transactionTime: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(transaction: Transaction) {
    this.transactionForm = this.fb.group({
      type: [''],
      description: [''],
      amount: [''],
      transactionDate: [''],
      transactionTime: [''],
      category: [''],
    });
    transaction.userId = this.userDetails.id;
    if (transaction.description === '')
      transaction.description = 'default message';
    console.log(transaction);
    this.transactionService.addNewTransaction(transaction).subscribe(
      (res) => {
        this.transactionService
          .findAllTransactions(this.userDetails.id)
          .subscribe(
            (transactions) => {
              this.sharedDataService.setTransaction(transactions);
            },
            (error) => {
              alert(error.message);
            }
          );
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.router.navigate(['/transactions']);
  }
}
