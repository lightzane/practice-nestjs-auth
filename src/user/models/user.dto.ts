import { prop } from "@typegoose/typegoose";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEmail, IsString, Length } from "class-validator";

export class User {
    @IsDefined()
    @IsString()
    @Length(5)
    @prop()
    name: string;

    @IsDefined()
    @IsString()
    @IsEmail()
    @prop()
    email: string;

    @IsDefined()
    @IsString()
    @Length(8)
    @prop()
    password: string;

    @IsDefined()
    @IsArray()
    @prop({
        type: [String]
    })
    roles: string[];
}