import { GstService } from './../gst/gst.service';
import { SharedService } from 'src/shared/shared.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsService {
  constructor(
    private sharedService: SharedService,
    private gstService: GstService,
  ) {}

  getCompanyMasterData(incorporation_number: string) {
    return this.sharedService.getCompanyMasterData(incorporation_number);
  }

  getMcaFilings(incorporation_number: string) {
    return this.sharedService.getMcaFilings(incorporation_number);
  }

  searchTaxPayerByPan(
    user: any,
    pan: string,
    idToken: string,
    captcha: string,
  ) {
    return this.gstService.searchTaxPayerByPan(user, pan, idToken, captcha);
  }

  getGstFilings(user: any, gst: string) {
    return this.gstService.getGstFiling(user, gst);
  }

  getGstDetails(user: any, gstin: string, captcha: string, cookie: string) {
    return this.gstService.getGstDetails(user, gstin, captcha, cookie);
  }
}
