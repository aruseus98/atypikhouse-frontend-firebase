import { TestBed } from '@angular/core/testing';

import { EditerAuthGuard } from './editer-auth.guard';

describe('EditerAuthGuard', () => {
  let guard: EditerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
