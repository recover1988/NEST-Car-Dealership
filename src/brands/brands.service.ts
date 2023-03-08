import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
import { throwError } from 'rxjs';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Ford',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      name: 'Subaru',
      createdAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand)
      throw new NotFoundException(`Brand with id "${id} not found"`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.brands.find(brand => brand.id === id);
    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDb.updatedAt = new Date().getTime();
        brandDb = {
          ...brandDb,
          ...updateBrandDto,
          id
        }
        return brandDb;
      }
      return brand;
    })
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand => brand.id !== id);
    return;
  }
}
