import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Budget from 'src/app/model/Budget';
import { SpendCategories } from 'src/app/model/SpendCategories';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/api/v1/budget';

  constructor(private http: HttpClient) {}

  getAllBudget(userId: number): Observable<SpendCategories> {
    return this.http.get<SpendCategories>(`${this.baseUrl}/all/${userId}`);
  }

  addNewBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}/add`, budget);
  }
}
