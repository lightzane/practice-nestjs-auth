import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.dto';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: User,
        schemaOptions: {
          collection: 'SampleUsers'
        }
      }
    ])
    // jwt module
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
