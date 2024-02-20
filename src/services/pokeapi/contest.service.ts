import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { Log } from 'src/log/logging';
import { faker } from '@faker-js/faker';

@Injectable()
export class PokeApiContestService {
  constructor(
    private readonly httpService: HttpService,
    private logger: Log,
    private readonly configService: ConfigService,
  ) {}

  async getContest() {
    const contest: number = faker.number.int({ min: 1, max: 5 });
    const url = `${this.configService.get<string>('contestService.getContest')}${contest}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/contest/getContest',
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
            '/pokeapi/contest/getContest',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }

  async getContestEffect() {
    const contest: number = faker.number.int({ min: 1, max: 33 });
    const url = `${this.configService.get<string>('contestService.getContestEffect')}${contest}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/contest/getContestEffect',
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
            '/pokeapi/contest/getContestEffect',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }

  async getSuperContestEffect() {
    const contest: number = faker.number.int({ min: 1, max: 22 });
    const url = `${this.configService.get<string>('contestService.getSuperContestEffect')}${contest}`;
    const startTime = Date.now();
    return this.httpService
      .get(url)
      .pipe(
        map((response) => {
          const ms = Date.now() - startTime;
          return this.logger.request(
            response,
            ms,
            '/pokeapi/contest/getSuperContestEffect',
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
            '/pokeapi/contest/getSuperContestEffect',
            'POKE_API',
            HttpStatus.OK,
            false,
          );
        }),
      );
  }
}
