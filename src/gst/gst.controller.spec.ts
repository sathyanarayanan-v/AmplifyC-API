import { Test, TestingModule } from '@nestjs/testing';
import { GstController } from './gst.controller';
import { GstService } from './gst.service';

describe('GstController', () => {
  let controller: GstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GstController],
      providers: [GstService],
    }).compile();

    controller = module.get<GstController>(GstController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
