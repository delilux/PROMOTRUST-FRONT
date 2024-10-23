import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipsComponent } from './listar-tips.component';

describe('ListarTipsComponent', () => {
  let component: ListarTipsComponent;
  let fixture: ComponentFixture<ListarTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
