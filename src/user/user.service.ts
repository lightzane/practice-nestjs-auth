import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.dto';

// import argon2
// import jwt
// import express

@Injectable()
export class UserService {

    // constructor(
    //     ?,
    //     ?
    // ) { }

    // async register(user: User): Promise<User> {
    //     // check if email is already registered
    // }

    // async login(?): Promise<any> {

    //     // Validate User

    //     // Validate Password

    //     // set cookies

    //     // return jwt token to the client as a response
    // }

}
