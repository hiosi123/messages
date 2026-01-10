import { Test, TestingModule } from '@nestjs/testing';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

describe('FindOneUserByEmailProvider', () => {
  let provider: FindOneUserByEmailProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneUserByEmailProvider],
    }).compile();

    provider = module.get<FindOneUserByEmailProvider>(FindOneUserByEmailProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
