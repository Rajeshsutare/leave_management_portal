import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildRoutesComponent } from './wild-routes.component';

describe('WildRoutesComponent', () => {
  let component: WildRoutesComponent;
  let fixture: ComponentFixture<WildRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WildRoutesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WildRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
