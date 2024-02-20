import { Controller, Post, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { Colors } from 'src/log/colors';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RunnerPokeApiBerryController } from './berry/runner.pokeapi.berry.controller';
import { RunnerPokeApiContestController } from './contest/runner.pokeapi.contest.controller';

@Controller('runnerPokeApi')
export class RunnerPokeApiController {
  constructor(
    private readonly runnerPokeApiBerries: RunnerPokeApiBerryController,
    private readonly runnerPokeApiContest: RunnerPokeApiContestController,
    private colors: Colors,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly runnerLogger: Logger,
  ) {}

  async pokeApiTestCase(
    module: string,
    test: string,
    delay: number,
    testIndex: number,
    testCases: number,
  ) {
    switch (module) {
      case 'berry':
        await this.runnerPokeApiBerries.pokeApiBerryTestCases(
          test,
          delay,
          testIndex,
          testCases,
        );
        break;
      case 'contest':
        await this.runnerPokeApiContest.pokeApiContestTestCases(
          test,
          delay,
          testIndex,
          testCases,
        );
        break;
      default:
        await this.cliRunner(delay);
        break;
    }
  }

  @Post('cli')
  async cliRunner(@Query('delay', ParseIntPipe) delay: number) {
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_RGB',
        '---------------------------------------------',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.start()} ${this.colors.selectColor(
        'POKEAPI_RGB',
        'Poke Api CLI Tests',
      )}`,
    );

    const berries = await this.runnerPokeApiBerries.pokeApiBerryRunner(delay);

    const contest = await this.runnerPokeApiContest.pokeApiContestRunner(delay);

    const pokeApiSuccess =
      berries.pokeApiBerriesSuccess + contest.pokeApiContestSuccess;

    const pokeApiFailed =
      berries.pokeApiBerriesFailed + contest.pokeApiContestFailed;

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_RGB',
        'Poke Api',
      )} ${this.colors.total(pokeApiSuccess, pokeApiFailed)}`,
    );

    this.runnerLogger.info(
      `${this.colors.end()} ${this.colors.selectColor(
        'POKEAPI_RGB',
        'Poke Api CLI Tests',
      )}`,
    );
    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_RGB',
        '---------------------------------------------',
      )}`,
    );
  }
}
