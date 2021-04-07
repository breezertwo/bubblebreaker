import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGameDto {
  @ApiProperty()
  @IsNotEmpty()
  grid: string;

  @ApiProperty()
  @IsNotEmpty()
  gridId: string;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ type: () => [StatsDto] })
  @IsNotEmpty()
  stats: StatsDto[];
}

class StatsDto {
  @ApiProperty()
  @IsNotEmpty()
  player: string;

  @ApiProperty()
  @IsNotEmpty()
  score: number;
}

export class AddGameStatDto extends StatsDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
