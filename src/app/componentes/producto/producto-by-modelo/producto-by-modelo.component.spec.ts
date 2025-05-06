import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoByModeloComponent } from './producto-by-modelo.component';

describe('ProductoByModeloComponent', () => {
  let component: ProductoByModeloComponent;
  let fixture: ComponentFixture<ProductoByModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoByModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoByModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
