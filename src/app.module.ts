import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import configuration from './config/configuration';
import { PokeApiController } from './controllers/pokeapi.controller';
import { PokeApiBerriesService } from './services/pokeapi/berries.service';
import { RunnerController } from './runner/runner.controller';
import { RunTestsCmd } from './cli/commands/tests-api.command';
import { RunnerPokeApiController } from './runner/pokeapi/runner.pokeapi.controller';
import { RunnerPokeApiBerryController } from './runner/pokeapi/berry/runner.pokeapi.berry.controller';
import { Colors } from './log/colors';
import { Log } from './log/logging';
import { PokeApiContestService } from './services/pokeapi/contest.service';
import { RunnerPokeApiContestController } from './runner/pokeapi/contest/runner.pokeapi.contest.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('CLI Test', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [PokeApiController, RunnerController],
  providers: [
    PokeApiBerriesService,
    PokeApiContestService,
    Log,
    Colors,
    RunTestsCmd,
    PokeApiController,
    RunnerController,
    RunnerPokeApiController,
    RunnerPokeApiBerryController,
    RunnerPokeApiContestController,
  ],
})
export class AppModule {}
