import { Module } from '@nestjs/common';
import { PokeApiController } from 'src/controllers/pokeapi.controller';
import { RunnerController } from './runner.controller';
import { RunnerPokeApiBerryController } from './pokeapi/berry/runner.pokeapi.berry.controller';

@Module({
  controllers: [RunnerController, RunnerPokeApiBerryController],
  imports: [PokeApiController],
})
export class RunnerModule {}
