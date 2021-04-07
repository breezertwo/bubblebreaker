import { Model, UpdateWriteOpResult } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Game, GameDocument } from "../../schemas/game.schema";
import { CreateGameDto } from "./game.dto";

@Injectable()
export default class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    console.log("GameService online");
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    return createdGame.save();
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.find({}, { stats: 0 }).exec();
  }

  async findOne(id: string): Promise<Game> {
    return this.gameModel.findOne({ gridId: id }).exec();
  }

  async addPlayedGame(
    id: string,
    player: string,
    score: number
  ): Promise<boolean> {
    const game = await this.gameModel.findOne({ gridId: id });

    if (game) {
      game.stats.push({
        player,
        score,
      });
      return game.save().then(
        () => {
          return true;
        },
        () => {
          return false;
        }
      );
    }
    return false;
  }
}
