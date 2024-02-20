import * as chalk from 'chalk';
import * as ora from 'ora';

const Color = {
  RUNNER: [255, 94, 5],
  TOTAL: [255, 255, 255],
  SUCCESS: [0, 128, 0],
  FAILED: [255, 0, 0],
  POKEAPI_RGB: [157, 0, 255],
  POKEAPI_START: [255, 255, 0],
  POKEAPI_BERRY: [77, 77, 255],
  POKEAPI_CONTEST: [237, 48, 207],
};

export class Colors {
  constructor() {}

  start() {
    return chalk.rgb(
      Color.POKEAPI_START[0],
      Color.POKEAPI_START[1],
      Color.POKEAPI_START[2],
    )('[STARTED]');
  }

  selectColor(module: string, text: string) {
    return chalk.rgb(
      Color[module][0],
      Color[module][1],
      Color[module][2],
    )(text);
  }

  total(success: number, failed: number) {
    if (success == 0) {
      return `[ Tests: ${chalk.rgb(
        Color.FAILED[0],
        Color.FAILED[1],
        Color.FAILED[2],
      )(failed + ' failed')}, ${chalk
        .rgb(Color.TOTAL[0], Color.TOTAL[1], Color.TOTAL[2])
        .bold(success + failed)} total ]`;
    }
    if (failed == 0) {
      return `[ Tests: ${chalk.rgb(
        Color.SUCCESS[0],
        Color.SUCCESS[1],
        Color.SUCCESS[2],
      )(success + ' passed')}, ${chalk
        .rgb(Color.TOTAL[0], Color.TOTAL[1], Color.TOTAL[2])
        .bold(success + failed)} total ]`;
    }
    return `[ Tests: ${chalk.rgb(
      Color.FAILED[0],
      Color.FAILED[1],
      Color.FAILED[2],
    )(failed + ' failed')}, ${chalk.rgb(
      Color.SUCCESS[0],
      Color.SUCCESS[1],
      Color.SUCCESS[2],
    )(success + ' passed')}, ${chalk
      .rgb(Color.TOTAL[0], Color.TOTAL[1], Color.TOTAL[2])
      .bold(success + failed)} total ]`;
  }

  end() {
    return chalk.rgb(
      Color.POKEAPI_START[0],
      Color.POKEAPI_START[1],
      Color.POKEAPI_START[2],
    )('[ENDED]');
  }

  async delay(ms: number) {
    const spinner = ora('Waiting Delay...').start();
    return new Promise((resolve) => setTimeout(resolve, ms)).then(() => {
      spinner.stop();
      spinner.clear();
    });
  }
}
