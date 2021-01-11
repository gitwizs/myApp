import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TravelinfoPage } from './travelinfo.page';

describe('TravelinfoPage', () => {
  let component: TravelinfoPage;
  let fixture: ComponentFixture<TravelinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
