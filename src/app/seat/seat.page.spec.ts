import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeatPage } from './seat.page';

describe('SeatPage', () => {
  let component: SeatPage;
  let fixture: ComponentFixture<SeatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
