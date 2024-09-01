import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent  implements OnInit {

  @Input() rating!: number;

  get starsArray(): number[] {
    return new Array(Math.round(this.rating));
  }

  ngOnInit() {}

}
