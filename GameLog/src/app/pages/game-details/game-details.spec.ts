import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetalis } from './game-details';

describe('GameDetalis', () => {
  let component: GameDetalis;
  let fixture: ComponentFixture<GameDetalis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetalis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetalis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
