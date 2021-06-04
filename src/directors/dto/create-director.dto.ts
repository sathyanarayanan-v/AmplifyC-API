import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsString({ message: 'din is required' })
  @IsNotEmpty({ message: 'din is required' })
  din?: string;

  @IsString({ message: 'date of approval is required' })
  @IsNotEmpty({ message: 'date of approval is required' })
  date_of_approval?: string;

  @IsString({ message: 'director name is required' })
  @IsNotEmpty({ message: 'director name is required' })
  name?: string;

  @IsString({ message: 'status is required' })
  @IsNotEmpty({ message: 'status is required' })
  status?: string;

  @IsString({ message: 'incorporation number is required' })
  @IsNotEmpty({ message: 'incorporation number is required' })
  incorporation_number?: string;
}
