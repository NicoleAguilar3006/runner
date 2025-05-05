import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistritoComponent } from './list-distrito.component';

describe('ListDistritoComponent', () => {
  let component: ListDistritoComponent;
  let fixture: ComponentFixture<ListDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDistritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
