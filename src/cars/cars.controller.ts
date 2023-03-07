import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Honda', 'Ford'];

  @Get()
  getAllCars() {
    return this.cars;
  }
  @Get(':id') // ':id/:brands'
  getCarById(@Param('id') id) {
    console.log(id);
    if (!(Number(id) >= 0 && Number(id) < this.cars.length)) {
      return {
        msg: `El ${id} no es un elemento valido`,
      };
    }

    return {
      id,
      car: this.cars[Number(id)],
    };
  }
}
