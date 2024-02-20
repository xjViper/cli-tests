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

  private testCases = {
    getBerry: async () => lastValueFrom(await this.pokeapi.getBerry()),
    getBerryFirmnesses: async () =>
      lastValueFrom(await this.pokeapi.getBerryFirmnesses()),
    getBerryFlavors: async () =>
      lastValueFrom(await this.pokeapi.getBerryFlavors()),
  };

  async pokeApiBerryTestCases(
    test: string,
    delay: number,
    testIndex: number,
    testCases: number,
  ) {
    if (!this.testCases[test]) {
      await this.pokeApiBerryRunner(delay);
    } else {
      await this.testCases[test];
      if (testIndex !== testCases - 1) {
        await this.colors.delay(+delay);
      }
    }
  }

  async pokeApiBerryRunner(@Query('delay', ParseIntPipe) delay: number) {
    this.runnerLogger.info(
      `${this.colors.start()} ${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berries Tests',
      )}`,
    );
    let pokeApiBerriesSuccess = 0;
    let pokeApiBerriesFailed = 0;

    await this.colors.delay(+delay / 4);
    const getBerry = await lastValueFrom(await this.pokeapi.getBerry());
    !getBerry.context.success
      ? pokeApiBerriesFailed++
      : pokeApiBerriesSuccess++;

    await this.colors.delay(+delay);

    const getBerryFirmnesses = await lastValueFrom(
      await this.pokeapi.getBerryFirmnesses(),
    );
    !getBerryFirmnesses.context.success
      ? pokeApiBerriesFailed++
      : pokeApiBerriesSuccess++;

    await this.colors.delay(+delay);

    const getBerryFlavors = await lastValueFrom(
      await this.pokeapi.getBerryFlavors(),
    );
    !getBerryFlavors.context.success
      ? pokeApiBerriesFailed++
      : pokeApiBerriesSuccess++;

    await this.colors.delay(+delay / 4);

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berry',
      )} ${this.colors.total(pokeApiBerriesSuccess, pokeApiBerriesFailed)}`,
    );

    this.runnerLogger.info(
      `${this.colors.end()} ${this.colors.selectColor(
        'POKEAPI_BERRY',
        'Poke Api Berries Canary Tests',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_BERRY',
        '---------------------------------------------',
      )}`,
    );

    return { pokeApiBerriesSuccess, pokeApiBerriesFailed };
  }
}
