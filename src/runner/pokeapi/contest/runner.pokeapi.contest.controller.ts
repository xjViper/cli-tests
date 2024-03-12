import { Controller, Inject } from '@nestjs/common';
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

  private tests = {
    getContest: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getContest(verbose)),
    getContestEffect: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getContestEffect(verbose)),
    getSuperContestEffect: async (verbose: string) =>
      lastValueFrom(await this.pokeapi.getSuperContestEffect(verbose)),
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
        'POKEAPI_CONTEST',
        'Poke Api Contest Tests',
      )}`,
    );
    let success = 0;
    let failed = 0;

    await this.colors.delay(+delay / 4);
    const getContest = await lastValueFrom(
      await this.pokeapi.getContest(verbose),
    );
    !getContest.context.success ? failed++ : success++;

    await this.colors.delay(+delay);

    const getContestEffect = await lastValueFrom(
      await this.pokeapi.getContestEffect(verbose),
    );
    !getContestEffect.context.success ? failed++ : success++;

    await this.colors.delay(+delay);

    const getSuperContestEffect = await lastValueFrom(
      await this.pokeapi.getSuperContestEffect(verbose),
    );
    !getSuperContestEffect.context.success ? failed++ : success++;

    await this.colors.delay(+delay / 4);

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_CONTEST',
        'Poke Api Contest',
      )} ${this.colors.total(success, failed)}`,
    );

    this.runnerLogger.info(
      `${this.colors.end()} ${this.colors.selectColor(
        'POKEAPI_CONTEST',
        'Poke Api Contest Tests',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_CONTEST',
        '---------------------------------------------',
      )}`,
    );

    return { success, failed };
  }
}
