import { PartialType } from '@nestjs/mapped-types';
import { CreateMcaFilingDto } from './create-mca-filing.dto';

export class UpdateMcaFilingDto extends PartialType(CreateMcaFilingDto) {}
