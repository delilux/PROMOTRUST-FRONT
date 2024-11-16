import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarrolesComponent } from './insertarroles.component';

describe('InsertarrolesComponent', () => {
  let component: InsertarrolesComponent;
  let fixture: ComponentFixture<InsertarrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarrolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertarrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
