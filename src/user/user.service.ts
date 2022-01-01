import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.dto';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
        private readonly jwt: JwtService
    ) { }

    async register(user: User): Promise<User> {
        // check if email is already registered
        const isExistingUser = await this.userModel.findOne({ email: user.email });
        if (isExistingUser) throw new ConflictException('Email is already taken');

        user.password = await argon2.hash(user.password);
        return this.userModel.create(user);
    }

    async login(email: string, password: string, res: Response): Promise<any> {
        const user = await this.userModel.findOne({ email });

        // Validate User
        if (!user) throw new UnauthorizedException('User not found');

        // Validate Password
        if (await argon2.verify(user.password, password)) {
            const token = this.jwt.sign({ user }); // requires jwt (see: user.module.ts)

            // requires npm cookie-parser (see: app.module.ts)
            // use middleware to read cookie and modify the request (see: app.module.ts & get-user.middleware.ts)
            // pass the jwt token to the cookie
            res.cookie('token', token, {
                httpOnly: true,
                // expires: new Date(new Date().getTime() + 30 * 1000), // expires 30s from now
                expires: new Date(new Date().getTime() + 60 * 1000 * 15), // expires 15m from now
                sameSite: true,
                secure: true
            });

            // return jwt token to the client as a response
            return res.json({ token });
        } else {
            throw new UnauthorizedException('Invalid Password');
        }
    }

}
