import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgConfirmationComponent } from './dlg-confirmation.component';

describe('DlgConfirmationComponent', () => {
  let component: DlgConfirmationComponent;
  let fixture: ComponentFixture<DlgConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlgConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
