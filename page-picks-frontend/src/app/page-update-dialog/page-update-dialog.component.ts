import {Component, Inject, OnInit} from '@angular/core';
import {UserBookStatusService} from "../service/user-book-status.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReviewDialogComponent} from "../review-dialog/review-dialog.component";

@Component({
  selector: 'app-page-update-dialog',
  templateUrl: './page-update-dialog.component.html',
  styleUrls: ['./page-update-dialog.component.scss']
})
export class PageUpdateDialogComponent {
  currentPage: number;
  isFinishedReading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PageUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userBookStatusService: UserBookStatusService,
    private dialog: MatDialog
  ) {
    this.currentPage = data.bookStatus.currentPage;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitPageUpdate() {
    this.userBookStatusService.updateCurrentPage(this.data.bookStatus.id, this.currentPage)
      .subscribe(
        () => {
          this.dialogRef.close(true);  // Close the dialog and signal success
        },
        error => {
          console.error('Error updating current page:', error);
        }
      );
  }

  markAsFinished() {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: { bookStatus: this.data.bookStatus }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { rating, review } = result;
        this.userBookStatusService.markAsFinished(this.data.bookStatus.id, rating, review)
          .subscribe(() => {
            console.log('Book marked as finished with review and rating');
          }, error => {
            console.error('Error marking as finished:', error);
          });
      }
    });
  }
}
