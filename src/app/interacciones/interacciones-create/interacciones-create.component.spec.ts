import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionesCreateComponent } from './interacciones-create.component';

describe('InteraccionesCreateComponent', () => {
  let component: InteraccionesCreateComponent;
  let fixture: ComponentFixture<InteraccionesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteraccionesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraccionesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
