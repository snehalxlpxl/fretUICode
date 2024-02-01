import { TestBed } from '@angular/core/testing';

import { ExportExeclFileService } from './export-execl-file.service';

describe('ExportExeclFileService', () => {
  let service: ExportExeclFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportExeclFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
