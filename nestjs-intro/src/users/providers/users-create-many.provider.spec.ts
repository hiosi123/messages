import { Test, TestingModule } from '@nestjs/testing';
import { UsersCreateManyProvider } from './users-create-many.provider';

describe('UsersCreateManyProvider', () => {
  let provider: UsersCreateManyProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCreateManyProvider],
    }).compile();

    provider = module.get<UsersCreateManyProvider>(UsersCreateManyProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
