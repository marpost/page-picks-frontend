import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import {UserBookStatusService} from "../service/user-book-status.service";
import {UserBookStatus} from "../models/userBookStatus.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> | undefined;
  userId: number | undefined;
  userBookStatuses$: Observable<UserBookStatus[]> | undefined;

  constructor(
    private authService: AuthService,
    private userBookStatusService: UserBookStatusService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getLoggedInUser();

    this.user$.subscribe(user => {
      if (user && user.id) {
        this.userId = user.id;
        console.log(this.userId)

        this.userBookStatuses$ = this.userBookStatusService.getUserBookStatuses(this.userId);
      }
    });
  }

  editProfile() {
  }

  logout() {
  }
}
