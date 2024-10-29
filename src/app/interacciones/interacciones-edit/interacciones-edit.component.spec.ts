import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionesEditComponent } from './interacciones-edit.component';

describe('InteraccionesEditComponent', () => {
  let component: InteraccionesEditComponent;
  let fixture: ComponentFixture<InteraccionesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteraccionesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraccionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
