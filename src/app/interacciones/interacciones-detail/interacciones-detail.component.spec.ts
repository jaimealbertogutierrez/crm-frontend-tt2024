import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraccionesDetailComponent } from './interacciones-detail.component';

describe('InteraccionesDetailComponent', () => {
  let component: InteraccionesDetailComponent;
  let fixture: ComponentFixture<InteraccionesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteraccionesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteraccionesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
