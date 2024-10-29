import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesListComponent } from './oportunidades-list.component';

describe('OportunidadesListComponent', () => {
  let component: OportunidadesListComponent;
  let fixture: ComponentFixture<OportunidadesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunidadesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
