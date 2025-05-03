import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarModeloComponent } from './actualizar-modelo.component';

describe('ActualizarModeloComponent', () => {
  let component: ActualizarModeloComponent;
  let fixture: ComponentFixture<ActualizarModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
