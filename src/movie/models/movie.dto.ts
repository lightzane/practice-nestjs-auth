import { IsDefined, IsString } from 'class-validator';
import { prop } from '@typegoose/typegoose';

export class Movie {
    @IsDefined()
    @IsString()
    @prop()
    title: string;

    @IsDefined()
    @IsString()
    @prop()
    description: string;

    @prop()
    postedBy: string;

    @IsDefined()
    @IsString()
    @prop()
    imgUrl: string;

    @prop()
    ts: Date;
}