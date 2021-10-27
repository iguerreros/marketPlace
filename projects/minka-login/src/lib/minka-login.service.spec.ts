import { TestBed } from '@angular/core/testing';

import { MinkaLoginService } from './minka-login.service';

describe('MinkaLoginService', () => {
  let service: MinkaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinkaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
