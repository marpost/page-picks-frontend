import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestReviewedBooksComponent } from './best-reviewed-books.component';

describe('BestReviewedBooksComponent', () => {
  let component: BestReviewedBooksComponent;
  let fixture: ComponentFixture<BestReviewedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestReviewedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestReviewedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
