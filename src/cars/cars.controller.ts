import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id') id) {
    console.log(id);
    return this.carsService.findOneById(Number(id));
  }
  constructor(private readonly carsService: CarsService) {}
}
