import { Test, TestingModule } from '@nestjs/testing';
import { McaFilingsController } from './mca-filings.controller';
import { McaFilingsService } from './mca-filings.service';

describe('McaFilingsController', () => {
  let controller: McaFilingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [McaFilingsController],
      providers: [McaFilingsService],
    }).compile();

    controller = module.get<McaFilingsController>(McaFilingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
