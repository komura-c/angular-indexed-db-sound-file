import { TestBed } from '@angular/core/testing';

import { AudioFileDbService } from './audio-file-db.service';

describe('AudioFileDbService', () => {
  let service: AudioFileDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioFileDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
