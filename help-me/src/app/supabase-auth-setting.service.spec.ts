import { TestBed } from '@angular/core/testing';

import { SupabaseAuthSettingService } from './supabase-auth-setting.service';

describe('SupabaseAuthSettingService', () => {
  let service: SupabaseAuthSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseAuthSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
