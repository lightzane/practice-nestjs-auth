import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminRoleGuard } from '../shared/guards/admin-role.guard';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { Movie } from './models/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
@ApiTags('movie')
@UseGuards(JwtGuard)
export class MovieController {

    constructor(private readonly movieService: MovieService) { }

    @Post('create')
    createMovie(@Req() req: Request, @Body() movie: Movie): Promise<Movie> {
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
