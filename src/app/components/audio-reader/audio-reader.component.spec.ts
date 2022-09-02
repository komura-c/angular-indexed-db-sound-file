import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioReaderComponent } from './audio-reader.component';

describe('AudioReaderComponent', () => {
  let component: AudioReaderComponent;
  let fixture: ComponentFixture<AudioReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AudioReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
