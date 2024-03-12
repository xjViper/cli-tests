import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { Log } from 'src/log/logging';
import { faker } from '@faker-js/faker';
import { Verbose } from 'src/cli/commands/tests-api.command';

@Injectable()
export class PokeApiBerriesService {
  constructor(
    private readonly httpService: HttpService,
    private logger: Log,
    private readonly configService: ConfigService,
  ) {}

  async getBerry(verbose: string) {
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
            verbose,
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
            verbose,
          );
        }),
      );
  }

  async getBerryFirmnesses(verbose: string) {
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
            '/pokeapi/berry/getBerryFirmnesses',
            'POKE_API',
            HttpStatus.OK,
            true,
            verbose,
          );
        }),
      )
      .pipe(
        catchError((error) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            error,
            ms,
            '/pokeapi/berry/getBerryFirmnesses',
            'POKE_API',
            HttpStatus.OK,
            false,
            verbose,
          );
        }),
      );
  }

  async getBerryFlavors(verbose: string) {
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
            '/pokeapi/berry/getBerryFlavors',
            'POKE_API',
            HttpStatus.OK,
            true,
            verbose,
          );
        }),
      )
      .pipe(
        catchError((error) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            error,
            ms,
            '/pokeapi/berry/getBerryFlavors',
            'POKE_API',
            HttpStatus.OK,
            false,
            verbose,
          );
        }),
      );
  }
}
