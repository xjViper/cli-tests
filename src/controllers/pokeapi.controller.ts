import { Controller, Get, Query } from '@nestjs/common';
import { PokeApiBerriesService } from 'src/services/pokeapi/berries.service';
import { PokeApiContestService } from 'src/services/pokeapi/contest.service';

@Controller('pokeapi')
export class PokeApiController {
  constructor(
    private readonly berries: PokeApiBerriesService,
    private readonly contest: PokeApiContestService,
  ) {}

  @Get('berry/getBerry')
  async getBerry(@Query('verbose') verbose: string) {
    return await this.berries.getBerry(verbose);
  }

  @Get('berry/getBerryFirmnesses')
  async getBerryFirmnesses(@Query('verbose') verbose: string) {
    return await this.berries.getBerryFirmnesses(verbose);
  }

  @Get('berry/getBerryFlavors')
  async getBerryFlavors(@Query('verbose') verbose: string) {
    return await this.berries.getBerryFlavors(verbose);
  }

  @Get('contest/getContest')
  async getContest(@Query('verbose') verbose: string) {
    return await this.contest.getContest(verbose);
  }

  @Get('contest/getContestEffect')
  async getContestEffect(@Query('verbose') verbose: string) {
    return await this.contest.getContestEffect(verbose);
  }

  @Get('contest/getSuperContestEffect')
  async getSuperContestEffect(@Query('verbose') verbose: string) {
    return await this.contest.getSuperContestEffect(verbose);
  }
}
