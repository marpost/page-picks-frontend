import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserBookStatusService} from "../service/user-book-status.service";

@Component({
  selector: 'app-edit-review-dialog',
  templateUrl: './edit-review-dialog.component.html',
  styleUrls: ['./edit-review-dialog.component.scss']
})
export class EditReviewDialogComponent {

  stars: number[] = [1, 2, 3, 4, 5];
  rating: number;
  review: string;

  constructor(
    public dialogRef: MatDialogRef<EditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userBookStatusService: UserBookStatusService
  ) {
    this.rating = this.data.bookStatus.rating || 0;
    this.review = this.data.bookStatus.review || '';
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  onSave(): void {
    this.userBookStatusService.updateRating(this.data.bookStatus.id, this.rating).subscribe(
      () => {
        if (this.review) {
          this.userBookStatusService.updateReview(this.data.bookStatus.id, this.review).subscribe(
            () => this.dialogRef.close(true),
            error => console.error('Error updating review', error)
          );
        } else {
          this.dialogRef.close(true);
        }
      },
      error => console.error('Error updating rating', error)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
