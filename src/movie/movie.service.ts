import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Request } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../user/models/user.dto';
import { Movie } from './models/movie.dto';

@Injectable()
export class MovieService {

    constructor(@InjectModel(Movie) private readonly movieModel: ReturnModelType<typeof Movie>) { }

    createMovie(movie: Movie, req: Request): Promise<Movie> {
        // * req.user is populated in the middleware and returns { user: <decodedJwtToken> }
        const user: User = req.user['user'];

        movie.ts = new Date();
        movie.postedBy = user.name;
        return this.movieModel.create(movie);
    }

    getAllMovies(): Promise<Movie[]> {
        return this.movieModel.find().sort({ ts: -1 }).exec();
    }

    deleteMovie(_id: string): Promise<Movie> {
        return this.movieModel.findByIdAndDelete({ _id }).exec();
    }

}
