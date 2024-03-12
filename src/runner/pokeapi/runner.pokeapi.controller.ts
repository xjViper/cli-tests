import { Controller, Post, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { Colors } from 'src/log/colors';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RunnerPokeApiBerryController } from './berry/runner.pokeapi.berry.controller';
import { RunnerPokeApiContestController } from './contest/runner.pokeapi.contest.controller';

@Controller('runnerPokeApi')
export class RunnerPokeApiController {
  constructor(
    private readonly berries: RunnerPokeApiBerryController,
    private readonly contest: RunnerPokeApiContestController,
    private colors: Colors,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly runnerLogger: Logger,
  ) {}

  async testCase(
    module: string,
    test: string,
    delay: number,
    testIndex: number,
    testCases: number,
    verbose: string,
  ) {
    switch (module) {
      case 'berry':
        await this.berries.testCases(
          test,
          delay,
          testIndex,
          testCases,
          verbose,
        );
        break;
      case 'contest':
        await this.contest.testCases(
          test,
          delay,
          testIndex,
          testCases,
          verbose,
        );
        break;
      default:
        await this.run(delay, verbose);
        break;
    }
  }

  @Post('cli')
  async run(
    @Query('delay', ParseIntPipe) delay: number,
    @Query('verbose') verbose: string,
  ) {
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

    const berries = await this.berries.run(delay, verbose);

    const contest = await this.contest.run(delay, verbose);

    const success = berries.success + contest.success;

    const failed = berries.failed + contest.failed;

    this.runnerLogger.info(
      `${this.colors.selectColor(
        'POKEAPI_RGB',
        'Poke Api',
      )} ${this.colors.total(success, failed)}`,
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
