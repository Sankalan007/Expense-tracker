import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class ShareddataService {
  constructor() {}

  private userDetailsSetSource = new Subject<boolean>();
  userDetailsSet$ = this.userDetailsSetSource.asObservable();

  private userDetailsSubject = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('userDetails') as string)
  );
  public userDetailsObservable = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: any): void {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this.userDetailsSubject.next(userDetails);
    this.userDetailsSetSource.next(true);
  }

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactionsObservable = this.transactionsSubject.asObservable();

  setTransaction(transaction: Transaction[]): void {
    this.transactionsSubject.next(transaction);
  }
}
