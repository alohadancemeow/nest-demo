import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

  // initializes Mongoose connection to MongoDB database
  imports: [
    ConfigModule.forRoot(), // Initialize ConfigModule
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Make ConfigModule available
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASS'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService], // Inject ConfigService to use it in useFactory
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
