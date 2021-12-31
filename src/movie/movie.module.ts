import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Movie } from './models/movie.dto';

@Module({
  imports: [TypegooseModule.forFeature([Movie])],
  providers: [MovieService /* inject jwt strategy here */],
  controllers: [MovieController]
})
export class MovieModule { }
