import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudeComponent } from './fraude.component';

describe('FraudeComponent', () => {
  let component: FraudeComponent;
  let fixture: ComponentFixture<FraudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
