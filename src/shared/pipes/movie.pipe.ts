import { Injectable, Logger, PipeTransform } from '@nestjs/common';
import { Request } from 'express';
import { Movie } from '../../movie/models/movie.dto';

@Injectable()
export class MoviePipe implements PipeTransform {

  logger = new Logger(MoviePipe.name);

  transform(request: Request): Movie {
    const movie: Movie = request.body;
    this.logger.log(`Movie created: ${movie.title}`);
    return movie;
  }
}
