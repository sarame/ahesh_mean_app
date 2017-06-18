import { TestBed, inject } from '@angular/core/testing';

import { RecipeAddService } from './recipe-add.service';

describe('RecipeAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeAddService]
    });
  });

  it('should be created', inject([RecipeAddService], (service: RecipeAddService) => {
    expect(service).toBeTruthy();
  }));
});
