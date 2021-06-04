import { DirectorRepository } from './directors.repository';
import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { convertDateStringToDate } from 'src/utils';
@Injectable()
export class DirectorsService {
  constructor(private directorRepository: DirectorRepository) {}

  async create(
    incorporation_number: string,
    createDirectorDto: CreateDirectorDto,
  ) {
    const directorDetailToSave = {
      ...createDirectorDto,
      date_of_approval: convertDateStringToDate(
        createDirectorDto.date_of_approval,
        'DD/MM/YYYY',
      ),
      incorporation_number,
    };
    return this.directorRepository.save(directorDetailToSave);
  }

  findAll() {
    return `This action returns all directors`;
  }

  findOne(id: string) {
    return this.directorRepository.findOne(id);
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findOne(id);
    const directorDetailToSave = {
      ...updateDirectorDto,
      date_of_approval: convertDateStringToDate(
        updateDirectorDto.date_of_approval,
        'DD/MM/YYYY',
      ),
      incorporation_number: updateDirectorDto.incorporation_number,
    };
    return this.directorRepository.update(director._id, directorDetailToSave);
  }

  remove(id: number) {
    return `This action removes a #${id} director`;
  }

  findOneByDin(din: string) {
    return this.directorRepository.findByDin(din);
  }
  async updateDirectorMasterData(updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findByDinAndCin(
      updateDirectorDto.din,
      updateDirectorDto.incorporation_number,
    );
    if (director) {
      return this.update(director._id, updateDirectorDto);
    }
    return this.create(
      updateDirectorDto.incorporation_number,
      updateDirectorDto,
    );
  }
}
