import { Controller, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { lastValueFrom } from 'rxjs';
import { PokeApiController } from 'src/controllers/pokeapi.controller';
import { Colors } from 'src/log/colors';
import { Logger } from 'winston';

@Controller('runnerPokeApiBerry')
export class RunnerPokeApiBerryController {
  constructor(
    private readonly pokeapi: PokeApiController,
    private colors: Colors,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly runnerLogger: Logger,
  ) {}

  private tests = {
    getBerry: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getBerry(verbose)),
    getBerryFirmnesses: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getBerryFirmnesses(verbose)),
    getBerryFlavors: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getBerryFlavors(verbose)),
  };

  async testCases(
    test: string,
    delay: number,
    testIndex: number,
    testCases: number,
    verbose: string,
  ) {
    if (!this.tests[test]) {
      await this.run(delay, verbose);
    } else {
      await this.tests[test](verbose);
      if (testIndex !== testCases - 1) {
        await this.colors.delay(+delay);
      }
    }
  }

  async run(delay: number, verbose: string) {
    this.runnerLogger.info(
      `${this.colors.start()} ${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berries Tests',
      )}`,
    );
    let success = 0;
    let failed = 0;

    await this.colors.delay(+delay / 4);
    const getBerry = await lastValueFrom(await this.pokeapi.getBerry(verbose));
    !getBerry.context.success ? failed++ : success++;

    await this.colors.delay(+delay);

    const getBerryFirmnesses = await lastValueFrom(
      await this.pokeapi.getBerryFirmnesses(verbose),
    );
    !getBerryFirmnesses.context.success ? failed++ : success++;

    await this.colors.delay(+delay);

    const getBerryFlavors = await lastValueFrom(
      await this.pokeapi.getBerryFlavors(verbose),
    );
    !getBerryFlavors.context.success ? failed++ : success++;

    await this.colors.delay(+delay / 4);

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berry',
      )} ${this.colors.total(success, failed)}`,
    );

    this.runnerLogger.info(
      `${this.colors.end()} ${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berries Tests',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_BERRY',
        '---------------------------------------------',
      )}`,
    );

    return { success, failed };
  }
}
