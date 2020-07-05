import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { URL } from './url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(URL)
    private urlRepository: Repository<URL>,
) { }
async  findOne(urlHash:string): Promise<URL> {
  return await this.urlRepository.findOne({where:{urlHash},select:["url"]});
}

async  create(url:URL): Promise<URL> {
  return await this.urlRepository.save(url);
}

async update(url: URL): Promise<UpdateResult> {
  return await this.urlRepository.update(url.id,url);
}

async delete(id:number): Promise<DeleteResult> {
  return await this.urlRepository.delete(id);
}
}
