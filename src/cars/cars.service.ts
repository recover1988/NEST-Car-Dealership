import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Ecosport',
    },
  ];
  public findAll() {
    return this.cars;
  }
  public findOneById(id: number) {
    return this.cars.filter((car) => car.id === id);
  }
}
