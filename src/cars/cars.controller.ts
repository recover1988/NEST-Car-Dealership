import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    console.log(id);
    // throw new Error('Auxilio');
    return this.carsService.findOneById(id);
  }
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return {
      ok: true,
      method: 'Post',
      createCarDto,
    };
  }
  @Patch(':id')
  updateCar(@Body() body: any, @Param('id', ParseUUIDPipe) id: string) {
    return {
      id,
      ok: true,
      method: 'Patch',
      body,
    };
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return {
      id,
      ok: true,
      method: 'Delete',
    };
  }

  constructor(private readonly carsService: CarsService) {}
}
