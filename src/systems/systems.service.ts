import { SystemRepository } from './system.repository';
import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Injectable()
export class SystemsService {
  constructor(private systemRepository: SystemRepository) {}
  create(createSystemDto: CreateSystemDto) {
    return 'This action adds a new system';
  }

  findAll() {
    return `This action returns all systems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: string, updateSystemDto: Partial<UpdateSystemDto>) {
    return this.systemRepository.update(id, updateSystemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }

  findOneWithUsername(username: string) {
    return this.systemRepository.findOneWithUsername(username);
  }
}
