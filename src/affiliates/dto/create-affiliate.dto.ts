import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAffiliateDto {
  @IsString({ message: 'company id is required' })
  @IsNotEmpty({ message: 'company id is required' })
  company_id: string;

  @IsString({ message: 'user id is required' })
  @IsNotEmpty({ message: 'user id is required' })
  user_id: string;
}
