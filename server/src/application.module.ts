import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import cookieParser from "cookie-parser";
import glob from "glob";

// const providers = glob
//   .sync("modules/*.module/*.service.ts", { cwd: __dirname, absolute: true }) // go through all the modules containing services
//   .map(require)
//   .map((imported) => imported.default);

// const controllers = glob
//   .sync("modules/*.module/*.controller.ts", { cwd: __dirname, absolute: true }) // go through all the modules containing controllers
//   .map(require)
//   .map((imported) => imported.default);

const modules = glob
  .sync("modules/*.module/*.module.ts", { cwd: __dirname, absolute: true }) // go through all the modules containing controllers
  .map(require)
  .map((imported) => imported.default);

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/bubblebreaker"),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ...modules,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(cookieParser()).forRoutes("/");
  }
}
