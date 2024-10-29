import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesCreateComponent } from './oportunidades-create.component';

describe('OportunidadesCreateComponent', () => {
  let component: OportunidadesCreateComponent;
  let fixture: ComponentFixture<OportunidadesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
