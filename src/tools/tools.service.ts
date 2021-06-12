import { SharedService } from 'src/shared/shared.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsService {
  constructor(private sharedService: SharedService) {}

  getCompanyMasterData(incorporation_number: string) {
    return this.sharedService.getCompanyMasterData(incorporation_number);
  }

  getMcaFilings(incorporation_number: string) {
    return this.sharedService.getMcaFilings(incorporation_number);
  }
}
