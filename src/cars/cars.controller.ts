import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
  @Post()
  createCar(@Body() body: any) {
    return {
      ok: true,
      method: 'Post',
      body,
    };
  }
  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return {
      id,
      ok: true,
      method: 'Patch',
      body,
    };
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      ok: true,
      method: 'Delete',
    };
  }

  constructor(private readonly carsService: CarsService) {}
}
