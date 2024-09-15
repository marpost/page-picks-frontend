import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";
import {UserBookStatusService} from "../service/user-book-status.service";
import {UserBookStatus} from "../models/userBookStatus.model";
import {MatDialog} from "@angular/material/dialog";
import { PageUpdateDialogComponent } from '../page-update-dialog/page-update-dialog.component';
import {Router} from "@angular/router";

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
    private userBookStatusService: UserBookStatusService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getLoggedInUser();

    this.user$.subscribe(user => {
      if (user && user.id) {
        this.userId = user.id;
        this.userBookStatuses$ = this.userBookStatusService.getUserBookStatuses(this.userId);
      }
    });
  }

  toggleFavorite(bookStatus: UserBookStatus): void {
    const newFavoriteStatus = !bookStatus.favorite;
    this.userBookStatusService.updateFavorite(bookStatus.id, newFavoriteStatus).subscribe(
      updatedStatus => {
        bookStatus.favorite = updatedStatus.favorite;
      },
      error => {
        console.error('Error updating favorite status', error);
      }
    );
  }
  navigateToBookstore() {
    this.router.navigate(['/bookstore']);
  }

  continueReading(bookStatus: UserBookStatus): void {
    const dialogRef = this.dialog.open(PageUpdateDialogComponent, {
      width: '400px',
      data: { bookStatus }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userBookStatuses$ = this.userBookStatusService.getUserBookStatuses(this.userId!);
      }
    });
  }

}
