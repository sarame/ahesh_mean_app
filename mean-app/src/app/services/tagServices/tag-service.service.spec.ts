import { TestBed, inject } from '@angular/core/testing';

import { TagServiceService } from './tag-service.service';

describe('TagServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagServiceService]
    });
  });

  it('should be created', inject([TagServiceService], (service: TagServiceService) => {
    expect(service).toBeTruthy();
  }));
});
