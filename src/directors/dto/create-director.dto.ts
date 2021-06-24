import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsString({ message: 'din is required' })
  @IsNotEmpty({ message: 'din is required' })
  din?: string;

  @IsString({ message: 'date of approval is required' })
  @IsNotEmpty({ message: 'date of approval is required' })
  begin_date?: string;

  @IsString({ message: 'director name is required' })
  @IsNotEmpty({ message: 'director name is required' })
  name?: string;

  @IsString({ message: 'end_date is required' })
  @IsNotEmpty({ message: 'end_date is required' })
  end_date?: string;

  @IsString({ message: 'incorporation number is required' })
  @IsNotEmpty({ message: 'incorporation number is required' })
  incorporation_number?: string;
}
