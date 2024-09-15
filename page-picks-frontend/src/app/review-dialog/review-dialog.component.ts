import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserBookStatusService} from "../service/user-book-status.service";

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {
  rating: number = 0;
  review: string = '';
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userBookStatusService: UserBookStatusService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  submitReview() {
    this.userBookStatusService.markAsFinished(this.data.bookStatus.id, this.rating, this.review)
      .subscribe(
        () => {
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error submitting review and rating:', error);
        }
      );
  }
}
