import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { GetUserMiddleware } from './shared/middlewares/get-user.middleware';
import { MovieController } from './movie/movie.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/config.env',
      isGlobal: true
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION')
      })
    }),
    UserModule,
    MovieModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  // Client --> Middleware --> Route handlers
  // useful when you want to access cookies
  // and modify the request headers before reaching the route handlers
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(MovieController);
  }
  
  // * Sample Multiple Middleware
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthenticationMiddleware)
  //     .forRoutes({ path: '/**', method: RequestMethod.ALL });
  //   consumer
  //     .apply(RequestFilterMiddleware)
  //     .forRoutes({ path: '/**', method: RequestMethod.GET });
  // }
}
