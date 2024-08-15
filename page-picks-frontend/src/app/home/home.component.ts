import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../all-books/add-book-dialog/add-book-dialog.component';
import { AllBooksComponent } from '../all-books/all-books.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @ViewChild(AllBooksComponent) allBooksComponent!: AllBooksComponent;

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '400px',
      panelClass: 'dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allBooksComponent.fetchData();
      }
    });
  }

}
