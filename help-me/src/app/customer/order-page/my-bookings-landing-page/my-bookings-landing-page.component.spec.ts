import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBookingsLandingPageComponent } from './my-bookings-landing-page.component';

describe('MyBookingsLandingPageComponent', () => {
  let component: MyBookingsLandingPageComponent;
  let fixture: ComponentFixture<MyBookingsLandingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookingsLandingPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookingsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
