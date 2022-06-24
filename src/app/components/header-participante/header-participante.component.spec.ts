import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderParticipanteComponent } from './header-participante.component';

describe('HeaderParticipanteComponent', () => {
  let component: HeaderParticipanteComponent;
  let fixture: ComponentFixture<HeaderParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
