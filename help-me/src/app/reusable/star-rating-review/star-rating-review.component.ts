import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-star-rating-review',
  standalone:true,
  imports:[CommonModule,IonicModule],
  templateUrl: './star-rating-review.component.html',
  styleUrls: ['./star-rating-review.component.scss'],
})
export class StarRatingReviewComponent  implements OnInit {

  @Input() rating: number = 0;
  
  @Input() starCount: number = 5;
  // @Input() color: string = '#fffff'; // You can customize the color of the stars

  @Output() ratingUpdated = new EventEmitter<number>();

  stars: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.calculateStars();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.calculateStars();
    }
  }


  
  calculateStars() {
    this.stars = Array(this.starCount).fill(false).map((_, i) => i < this.rating);
  }

  onStarClick(index: number) {
    this.rating = index + 1;
    this.calculateStars();
    this.ratingUpdated.emit(this.rating);
  }

}
