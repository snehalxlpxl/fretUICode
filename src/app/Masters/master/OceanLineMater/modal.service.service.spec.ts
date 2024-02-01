import { TestBed } from '@angular/core/testing';

import { Modal.ServiceService } from './modal.service.service';

describe('Modal.ServiceService', () => {
  let service: Modal.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Modal.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
