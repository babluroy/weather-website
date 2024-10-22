import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastComponent } from './forcast.component';

describe('ForcastComponent', () => {
  let component: ForcastComponent;
  let fixture: ComponentFixture<ForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForcastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
