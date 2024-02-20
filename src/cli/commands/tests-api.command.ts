import { Inject, Injectable } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Colors } from 'src/log/colors';
import { RunnerController } from 'src/runner/runner.controller';
import { Logger } from 'winston';

interface ApiOptions {
  delay?: number;
  testCase?: string;
  frequency?: number;
}

@Command({
  name: 'run',
  description: 'Run all tests',
})
@Injectable()
export class RunTestsCmd extends CommandRunner {
  constructor(
    private runner: RunnerController,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private colors: Colors,
  ) {
    super();
  }

  async run(passedParams: string[], options?: ApiOptions): Promise<void> {
    this.logger.info(
      this.colors.start(),
      this.colors.selectColor('RUNNER', 'CLI Tests'),
    );
    if (
      options?.frequency > 1 &&
      typeof options?.frequency === 'number' &&
      isFinite(options?.frequency)
    ) {
      for (let i: number = 0; i < options?.frequency; i++) {
        this.logger.info(
          this.colors.selectColor(
            'RUNNER',
            `Test ${i + 1}/${options.frequency} Started`,
          ),
        ),
          await this.runTests(options?.delay, options?.testCase);
        this.logger.info(
          this.colors.selectColor(
            'RUNNER',
            `---------------------------------------------`,
          ),
        );
        if (i != options.frequency - 1) {
          await this.colors.delay(options?.delay || 1000);
        }
      }
    } else {
      await this.runTests(options?.delay, options?.testCase);
    }

    this.logger.info(
      this.colors.end(),
      this.colors.selectColor('RUNNER', 'CLI Tests'),
    );
    process.exit();
  }

  async runTests(delay: number, testCase: string) {
    const tests = this.removeEmptyTestCases(testCase);

    const delay_ok = typeof delay === 'number' && isFinite(delay) && delay > 0;
    const testCases_ok = tests.length > 0;

    if (delay_ok && testCases_ok) {
      await this.runWithBoth(delay, tests);
    } else if (!delay_ok && testCases_ok) {
      await this.runWithOnlyTestCase(tests);
    } else if (delay_ok && !testCases_ok) {
      await this.runWithDelay(delay);
    } else {
      await this.runWithNone();
    }
  }

  async runWithBoth(delay: number, testCase: string | string[]) {
    await this.runner.runTestCase(testCase, delay);
  }

  async runWithOnlyTestCase(testCase: string | string[]) {
    await this.runner.runTestCase(testCase, 2000);
  }

  async runWithDelay(delay: number) {
    await this.runner.runAll(delay);
  }

  async runWithNone() {
    await this.runner.runAll(2000);
  }

  private removeEmptyTestCases(cases: string | string[]): string | string[] {
    if (typeof cases === 'undefined') {
      return '';
    }
    if (Array.isArray(cases)) {
      return cases.filter((str) => str && str.trim().length !== 0);
    }
    return cases.trim().length !== 0 ? cases : '';
  }

  @Option({
    flags: '-d, --delay [number]',
    description: 'Delay (ms) between tests',
  })
  parseNumberDelay(delay: string): number {
    return Number.parseInt(delay);
  }

  @Option({
    flags: '-tc, --testCase <testCase...>',
    description: 'Choose which tests will be performed based on the test route',
  })
  parseStringTestCase(val: string, cases: string[] = []): string[] {
    cases.push(val);
    return cases;
  }

  @Option({
    flags: '-f, --frequency [number]',
    description:
      'How many times will the test be performed on a single command',
  })
  parseNumberFrequency(delay: string): number {
    return Number.parseInt(delay);
  }
}
