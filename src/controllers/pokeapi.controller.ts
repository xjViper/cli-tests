import { Controller, Get } from '@nestjs/common';
import { PokeApiBerriesService } from 'src/services/pokeapi/berries.service';
import { PokeApiContestService } from 'src/services/pokeapi/contest.service';

@Controller('pokeapi')
export class PokeApiController {
  constructor(
    private readonly berries: PokeApiBerriesService,
    private readonly contest: PokeApiContestService,
  ) {}

  @Get('berry/getBerry')
  async getBerry() {
    return await this.berries.getBerry();
  }

  @Get('berry/getBerryFirmnesses')
  async getBerryFirmnesses() {
    return await this.berries.getBerryFirmnesses();
  }

  @Get('berry/getBerryFlavors')
  async getBerryFlavors() {
    return await this.berries.getBerryFlavors();
  }

  @Get('contest/getContest')
  async getContest() {
    return await this.contest.getContest();
  }

  @Get('contest/getContestEffect')
  async getContestEffect() {
    return await this.contest.getContestEffect();
  }

  @Get('contest/getSuperContestEffect')
  async getSuperContestEffect() {
    return await this.contest.getSuperContestEffect();
  }
}
