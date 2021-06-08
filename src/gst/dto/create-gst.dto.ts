import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGstDto {
  @IsString({ message: 'incorporation number is required' })
  @IsNotEmpty({ message: 'incorporation number is required' })
  incorporation_number: string;

  @IsString({ message: 'gst number is required' })
  @IsNotEmpty({ message: 'gst number is required' })
  gstin: string;
}
