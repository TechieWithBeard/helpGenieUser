import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrivacyPollicyComponent } from './privacy-pollicy.component';

describe('PrivacyPollicyComponent', () => {
  let component: PrivacyPollicyComponent;
  let fixture: ComponentFixture<PrivacyPollicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrivacyPollicyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPollicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
