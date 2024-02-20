import { Controller, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { lastValueFrom } from 'rxjs';
import { PokeApiController } from 'src/controllers/pokeapi.controller';
import { Colors } from 'src/log/colors';
import { Logger } from 'winston';

@Controller('runnerPokeApiContest')
export class RunnerPokeApiContestController {
  constructor(
    private readonly pokeapi: PokeApiController,
    private colors: Colors,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly runnerLogger: Logger,
  ) {}

  private testCases = {
    getContest: async () => lastValueFrom(await this.pokeapi.getContest()),
    getContestEffect: async () =>
      lastValueFrom(await this.pokeapi.getContestEffect()),
    getSuperContestEffect: async () =>
      lastValueFrom(await this.pokeapi.getSuperContestEffect()),
  };

  async pokeApiContestTestCases(
    test: string,
    delay: number,
    testIndex: number,
    testCases: number,
  ) {
    if (!this.testCases[test]) {
      await this.pokeApiContestRunner(delay);
    } else {
      await this.testCases[test];
      if (testIndex !== testCases - 1) {
        await this.colors.delay(+delay);
      }
    }
  }

  async pokeApiContestRunner(@Query('delay', ParseIntPipe) delay: number) {
    this.runnerLogger.info(
      `${this.colors.start()} ${this.colors.selectColor(
        'POKEAPI_CONTEST',
        'Poke Api Contest Tests',
      )}`,
    );
    let pokeApiContestSuccess = 0;
    let pokeApiContestFailed = 0;

    await this.colors.delay(+delay / 4);
    const getContest = await lastValueFrom(await this.pokeapi.getContest());
    !getContest.context.success
      ? pokeApiContestFailed++
      : pokeApiContestSuccess++;

    await this.colors.delay(+delay);

    const getContestEffect = await lastValueFrom(
      await this.pokeapi.getContestEffect(),
    );
    !getContestEffect.context.success
      ? pokeApiContestFailed++
      : pokeApiContestSuccess++;

    await this.colors.delay(+delay);

    const getSuperContestEffect = await lastValueFrom(
      await this.pokeapi.getSuperContestEffect(),
    );
    !getSuperContestEffect.context.success
      ? pokeApiContestFailed++
      : pokeApiContestSuccess++;

    await this.colors.delay(+delay / 4);

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_CONTEST',
        'Poke Api Contest',
      )} ${this.colors.total(pokeApiContestSuccess, pokeApiContestFailed)}`,
    );

    this.runnerLogger.info(
      `${this.colors.end()} ${this.colors.selectColor(
        'POKEAPI_CONTEST',
        'Poke Api Contest Canary Tests',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_CONTEST',
        '---------------------------------------------',
      )}`,
    );

    return { pokeApiContestSuccess, pokeApiContestFailed };
  }
}
