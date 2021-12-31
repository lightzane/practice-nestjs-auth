import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { User } from './models/user.dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    register(@Body() user: User): Promise<User> {
        return this.userService.register(user);
    }

    @Post('login')
    login(@Res() res: Response, @Body('email') email: string, @Body('password') password: string): Promise<any> {
        return this.userService.login(email, password, res);
    }

    @Get('logout')
    logout(@Res() res: Response): any {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: true,
            secure: true
        });
        return res.json();
    }

}
