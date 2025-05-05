import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTallaComponent } from './list-talla.component';

describe('ListTallaComponent', () => {
  let component: ListTallaComponent;
  let fixture: ComponentFixture<ListTallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTallaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
