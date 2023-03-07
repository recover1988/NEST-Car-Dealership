import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    // throw new Error('Auxilio');
    return this.carsService.findOneById(Number(id));
  }
  constructor(private readonly carsService: CarsService) {}
}
