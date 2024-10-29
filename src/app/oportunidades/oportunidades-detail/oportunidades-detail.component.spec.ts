import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesDetailComponent } from './oportunidades-detail.component';

describe('OportunidadesDetailComponent', () => {
  let component: OportunidadesDetailComponent;
  let fixture: ComponentFixture<OportunidadesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
