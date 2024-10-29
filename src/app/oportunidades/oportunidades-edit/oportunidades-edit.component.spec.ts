import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesEditComponent } from './oportunidades-edit.component';

describe('OportunidadesEditComponent', () => {
  let component: OportunidadesEditComponent;
  let fixture: ComponentFixture<OportunidadesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
