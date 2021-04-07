import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
} from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Game } from "../../schemas/game.schema";
import { AddGameStatDto, CreateGameDto } from "./game.dto";
import GameService from "./game.service";

@Controller("game")
export default class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 201 })
  async create(@Body() gameOptions: CreateGameDto): Promise<Game> {
    return this.gameService.create(gameOptions);
  }

  @Post("stats")
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 200 })
  async addPlayerStat(@Body() statEntry: AddGameStatDto): Promise<boolean> {
    return await this.gameService.addPlayedGame(
      statEntry.id,
      statEntry.player,
      statEntry.score
    );
  }

  @Get()
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 200, isArray: true })
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(":id")
  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 200 })
  async findOne(@Param("id") id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }
}
