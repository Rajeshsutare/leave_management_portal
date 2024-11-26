import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HODComponent } from './hod.component';

describe('HODComponent', () => {
  let component: HODComponent;
  let fixture: ComponentFixture<HODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HODComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
