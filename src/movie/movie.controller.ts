import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CustomRequest } from '../shared/decorators/custom-request.decorator';
import { AdminRoleGuard } from '../shared/guards/admin-role.guard';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { MoviePipe } from '../shared/pipes/movie.pipe';
import { Movie } from './models/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
@ApiTags('movie')
@UseGuards(JwtGuard)
export class MovieController {

    constructor(private readonly movieService: MovieService) { }

    @Post('create')
    createMovie(@Req() req: Request, @Body() @CustomRequest(MoviePipe) movie: Movie): Promise<Movie> {
        // * For using pipes with @Body()
        // This would suffice: @Body( new MoviePipe() )

        // * However, if you need the ExecutionContext to access the HTTP request inside the Pipes
        // Create a custom decorator "@CustomRequest()"

        return this.movieService.createMovie(movie, req);
    }

    @Get()
    getAllMovie(): Promise<Movie[]> {
        return this.movieService.getAllMovies();
    }

    @Delete('delete/:id')
    @UseGuards(AdminRoleGuard) // or UseGuards(new RoleGuard(['admin']))
    deleteMovie(@Param('id') _id: string): Promise<Movie> {
        return this.movieService.deleteMovie(_id);
    }

}
