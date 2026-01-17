import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({

  // initializes Mongoose connection to MongoDB database
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017', {
      authSource: 'admin',
      dbName: 'nest',
      user: 'root',
      pass: 'root',
    }
    ),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
