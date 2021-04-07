import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GameDocument = Game & Document;

export type GridStat = {
  player: string;
  score: string;
};

@Schema()
class GridStats {
  @Prop({ required: true })
  player: string;

  @Prop({ required: true })
  score: number;
}

const GameStatsSchema = SchemaFactory.createForClass(GridStats);

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  grid: string;

  @Prop({ required: true })
  gridId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ type: [GameStatsSchema] })
  stats: GridStats[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
