import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarModelosComponent } from './listar-modelos.component';

describe('ListarModelosComponent', () => {
  let component: ListarModelosComponent;
  let fixture: ComponentFixture<ListarModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarModelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
