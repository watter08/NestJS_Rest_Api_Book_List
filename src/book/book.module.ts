import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      })

    })
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule { }
