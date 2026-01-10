import { Test, TestingModule } from '@nestjs/testing';
import { BycryptProvider } from './bycrypt.provider';

describe('BycryptProvider', () => {
  let provider: BycryptProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BycryptProvider],
    }).compile();

    provider = module.get<BycryptProvider>(BycryptProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
