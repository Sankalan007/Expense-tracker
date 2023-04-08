import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShareddataService } from 'src/app/services/shareddata/shareddata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userDetails: User | null = null;
  userDetailsSet = false;
  constructor(
    private sharedDataService: ShareddataService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));

    this.sharedDataService.userDetailsObservable.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
    this.sharedDataService.userDetailsSet$.subscribe(() => {
      this.userDetailsSet = true;
      this.cdr.detectChanges();
    });
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
    this.sharedDataService.setUserDetails('');
    this.router.navigate(['/']);
  }
}
