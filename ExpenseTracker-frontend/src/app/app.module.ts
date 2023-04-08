import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewtransactionComponent } from './components/newtransaction/newtransaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalsComponent } from './components/goals/goals.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LandingComponent,
    TransactionsComponent,
    BudgetsComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    NewtransactionComponent,
    GoalsComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
