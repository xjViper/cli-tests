import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { Log } from 'src/log/logging';
import { faker } from '@faker-js/faker';

@Injectable()
export class PokeApiBerriesService {
  constructor(
    private readonly httpService: HttpService,
    private logger: Log,
    private readonly configService: ConfigService,
  ) {}

  async getBerry() {
    const berry: number = faker.number.int({ min: 1, max: 64 });
    const url = `${this.configService.get<string>('berriesService.getBerry')}${berry}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            true,
          );
        }),
      )
      .pipe(
        catchError((error) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            error,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }

  async getBerryFirmnesses() {
    const berry: number = faker.number.int({ min: 1, max: 5 });
    const url = `${this.configService.get<string>('berriesService.getBerryFirmnesses')}${berry}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            true,
          );
        }),
      )
      .pipe(
        catchError((error) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            error,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }

  async getBerryFlavors() {
    const berry: number = faker.number.int({ min: 1, max: 5 });
    const url = `${this.configService.get<string>('berriesService.getBerryFlavors')}${berry}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            true,
          );
        }),
      )
      .pipe(
        catchError((error) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            error,
            ms,
            '/pokeapi/berry/getBerry',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }
}
