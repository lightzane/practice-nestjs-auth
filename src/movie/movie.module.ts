import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Movie } from './models/movie.dto';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [TypegooseModule.forFeature([Movie])],
  providers: [MovieService, JwtStrategy],
  controllers: [MovieController]
})
export class MovieModule { }
