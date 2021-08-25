import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAdderComponent } from './animal-adder.component';

describe('AnimalAdderComponent', () => {
  let component: AnimalAdderComponent;
  let fixture: ComponentFixture<AnimalAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
