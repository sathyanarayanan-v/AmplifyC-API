import { Test, TestingModule } from '@nestjs/testing';
import { McaFilingsService } from './mca-filings.service';

describe('McaFilingsService', () => {
  let service: McaFilingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [McaFilingsService],
    }).compile();

    service = module.get<McaFilingsService>(McaFilingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
