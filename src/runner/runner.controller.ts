import { Controller, Post, Query, ParseIntPipe, Inject } from '@nestjs/common';
import { Colors } from 'src/log/colors';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RunnerPokeApiController } from './pokeapi/runner.pokeapi.controller';

@Controller('runner')
export class RunnerController {
  constructor(
    private readonly pokeapi: RunnerPokeApiController,
    private colors: Colors,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly runnerLogger: Logger,
  ) {}

  @Post()
  async runAll(@Query('delay', ParseIntPipe) delay: number, verbose: string) {
    await this.pokeapi.run(delay, verbose);
  }

  async runTestCase(param: string | string[], delay: number, verbose: string) {
    const testCases = param.toString().split(',');

    for (let testIndex: number = 0; testIndex < testCases.length; testIndex++) {
      const route: string[] = testCases[testIndex].toString().split('/');

      const service = route[1];
      const module = route[2];
      const test = route[3];

      this.runnerLogger.info(
        this.colors.selectColor(
          'RUNNER',
          `Running Test ${testCases[testIndex]}`,
        ),
      );
      switch (service) {
        case 'pokeApi':
        case 'PokeApi':
        case 'pokeapi':
          await this.pokeapi.testCase(
            module,
            test,
            delay,
            testIndex,
            testCases.length,
            verbose,
          );
          break;
        default:
          this.runnerLogger.warn(
            `Unrecognized { ${testCases[testIndex]} } test. Please, select a correct test case to run.`,
          );
          this.runnerLogger.warn('Running all tests...');
          await this.pokeapi.testCase(
            module,
            test,
            delay,
            testIndex,
            testCases.length,
            verbose,
          );
          break;
      }
      if (testIndex != testCases.length - 1) {
        this.runnerLogger.info(
          `${this.colors.selectColor(
            'RUNNER',
            '---------------------------------------------',
          )}`,
        );
      }
    }
  }
}
