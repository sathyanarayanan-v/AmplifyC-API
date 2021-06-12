import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { loggerInstance } from 'src/logger';
import mcaAxiosInstance from '../axios/mcaAxiosInstance';
import gstAxiosInstance from '../axios/gstAxiosInstance';
import taskAxiosInstance from '../axios/taskAxiosInstance';
@Injectable()
export class SharedService {
  constructor() {}
  createHash = (stringToHash: string) =>
    crypto.createHash('sha256').update(stringToHash).digest('hex');

  /**
   * hash password with sha512.
   * @function
   * @param {string} password - List of required fields.
   * @param {string} salt - Data to be validated.
   */
  private sha512(password: string, salt: string) {
    const hash = crypto.createHmac(
      'sha512',
      salt,
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value,
    };
  }

  private genRandomString(length: number) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length); /** return required number of characters */
  }

  saltHashPassword(userpassword: string) {
    const salt = this.genRandomString(16); /** Gives us salt of length 16 */
    const passwordData = this.sha512(userpassword, salt);
    return passwordData;
  }

  getPasswordHash(salt: string, password: string) {
    return this.sha512(password, salt);
  }

  signJWT = (user: any) => {
    const { username, email, _id } = user;
    return jwt.sign({ username, email, _id }, jwtConstants.pk, {
      expiresIn: '4h',
      algorithm: 'HS256',
      issuer: 'AmplifyC Authentication API',
      audience: 'AmplifyC Client',
      subject: `${username} - ${_id}`,
    });
  };

  sendMail = (
    from: string,
    to: string,
    subject: string,
    fromName: string,
    html?: string,
  ) => {
    const mailOptions = {
      from: from,
      to: to,
      subject,
      html,
    };
    const mailTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        type: 'login',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return new Promise<boolean>((resolve, reject) => {
      mailTransport.sendMail(mailOptions, function (error: any, response: any) {
        if (error) {
          loggerInstance.log(
            `Some error occurerd while sending mail. ${error}`,
            'error',
            'Nodemailer',
          );
          reject(false);
        } else {
          loggerInstance.log(
            `Mail successfully sent to email - ${to}`,
            'info',
            'Nodemailer',
          );
          resolve(true);
        }
      });
    });
  };

  async checkCompanyName(company_name: string) {
    const company_name_response_text: {
      errors?: Array<{ errorCode: string; errorDescription: string }>;
      success: 'false' | 'true';
      companyList: Array<{ companyID: string; companyName: string }>;
    } = await mcaAxiosInstance.post(
      process.env.COMPANY_NAME_SEARCH + company_name,
    );
    console.log(company_name_response_text);
    const table_headers = [
      {
        text: 'S.No',
        value: 'index',
      },
      {
        text: 'Company ID',
        value: 'companyID',
        align: 'start',
      },
      {
        text: 'Company Name',
        value: 'companyName',
      },
    ];
    if (company_name_response_text.success === 'true') {
      const companies = company_name_response_text.companyList;
      return {
        table_headers,
        companies: companies.map((data, idx) => ({ ...data, index: idx + 1 })),
      };
    } else {
      return {
        table_headers,
        companies: [],
        error: true,
        message: 'No matching found!',
      };
    }
  }

  getGstCaptcha() {
    return gstAxiosInstance.get('captcha', {
      responseType: 'arraybuffer',
    });
  }

  async searchGstByPan(
    captcha: string,
    panNO: string,
    cookie: string,
  ): Promise<Array<{ gstin: string; authStatus: string; stateCd: string }>> {
    try {
      const res = await gstAxiosInstance.post(
        'api/get/gstndtls',
        { captcha, panNO },
        {
          headers: {
            Cookie: `CaptchaCookie=${cookie}`,
          },
        },
      );
      if (res.data.errorCode) {
        return [];
      }
      return res.data.gstinResList;
    } catch (err) {
      loggerInstance.log(err, 'error', 'GSTSearchByPan');
      return [];
    }
  }

  getCompanyMasterData(incorporation_number: string) {
    return taskAxiosInstance.post('companies/master-data', {
      incorporation_number,
    });
  }

  getMcaFilings(incorporation_number: string) {
    return taskAxiosInstance.post('companies/filings', {
      incorporation_number,
    });
  }
}
