import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLanguagePageComponent } from './multi-language-page.component';

describe('MultiLanguagePageComponent', () => {
  let component: MultiLanguagePageComponent;
  let fixture: ComponentFixture<MultiLanguagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLanguagePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLanguagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
