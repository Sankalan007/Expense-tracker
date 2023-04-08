import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PresetAverages from 'src/app/model/PresetAverages';
import PresetTransactions from 'src/app/model/PresetTransaction';
import Transaction from 'src/app/model/Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/v1/transaction';

  constructor(private http: HttpClient) {}

  findAllTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/all/${userId}`);
  }

  addNewTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/add`, transaction);
  }

  getPresetTransactions(
    userId: number,
    date: string
  ): Observable<PresetTransactions> {
    return this.http.get<PresetTransactions>(
      `${this.baseUrl}/preset-transactions/${userId}/${date}`
    );
  }

  getPresetAverages(userId: number, date: string): Observable<PresetAverages> {
    return this.http.get<PresetAverages>(
      `${this.baseUrl}/preset-averages/${userId}/${date}`
    );
  }

  getTransactionsBetween(
    userId: number,
    from: String,
    to: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/transactions-between/${from}/${to}/${userId}`
    );
  }
}
