import { SharedService } from 'src/shared/shared.service';
import { GstRepository } from './gst.repository';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateGstDto } from './dto/create-gst.dto';
import { UpdateGstDto } from './dto/update-gst.dto';

@Injectable()
export class GstService {
  constructor(
    private gstRepository: GstRepository,
    private sharedService: SharedService,
  ) {}
  create(createGstDto: CreateGstDto) {
    return this.gstRepository.create(createGstDto);
  }

  findAll() {
    return this.gstRepository.findAll();
  }

  findOne(id: string) {
    return this.gstRepository.findOne(id);
  }

  update(id: string, updateGstDto: UpdateGstDto) {
    return this.gstRepository.update(id, updateGstDto);
  }

  remove(id: string) {
    return this.gstRepository.remove(id);
  }

  async getCaptcha(): Promise<any> {
    try {
      const gstCaptcha = await this.sharedService.getGstCaptcha();

      let captchaCookie = gstCaptcha.headers['set-cookie']
        .find((x: string) => x.includes('CaptchaCookie'))
        .split(';')[0]
        .split('=')[1];
      return {
        image: gstCaptcha.data,
        captchaCookie,
      };
    } catch (error) {
      if (error.response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableException(
          'Our portal is down for maintainance. Please come back later.',
        );
      }
    }
  }

  async createGstWithPan(
    user: any,
    pan: string,
    cookie: string,
    captcha: string,
    incorporation_number: string,
  ) {
    const gstRecords = await this.sharedService.searchGstByPan(
      captcha,
      pan,
      cookie,
    );
    if (gstRecords.length) {
      return Promise.all(
        gstRecords.map((rec) =>
          this.create({
            gstin: rec.gstin,
            incorporation_number,
            gstin_status: rec.authStatus,
          }),
        ),
      );
    }
    return [];
  }

  searchTaxPayerByPan(user: any, pan: string, cookie: string, captcha: string) {
    return this.sharedService.searchGstByPan(captcha, pan, cookie);
  }
  async getGstFiling(user: any, gstin: string) {
    const filings = await this.sharedService.getGstFilings(gstin);
    if (filings.data.filingStatus) {
      return filings.data.filingStatus[0];
    }
    throw new InternalServerErrorException();
  }
}
