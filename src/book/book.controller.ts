import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Param, Body } from '@nestjs/common';
import { CreateBookDto } from 'src/libs/dto/book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }


    
    @Get('/')
    async getAllBooks(@Res() res) {
        try {
            const Books = await this.bookService.findAll();
            return res.status(HttpStatus.OK).json({
                message:Books ? `There are books` : 'There are no books',
                data: Books ? Books : []
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: String(error.message),
                data: []
            })
        }
    }

    @Get('/:id')
    async getOneBook(@Res() res , @Param('id') id : number) {
        try {
            const Book = await this.bookService.findOne(id);
            return res.status(HttpStatus.OK).json({
                message: Book ? 'Success' : 'Not Found',
                data: Book ? Book : {}
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: String(error.message),
                data: {}
            })
        }
    }


    @Post('/')
    async createBook(@Res() res , @Body() createBookDto : CreateBookDto) {
        try {
            const Book = await this.bookService.createBook(createBookDto);
            if(!Book) throw new Error('Book Not Created')
            return res.status(HttpStatus.OK).json({
                message: 'Book Created Successfully',
                data: Book ? Book : {}
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: String(error.message),
                data: []
            })
        }
    }


    @Put('/:id')
    async updateBook(@Res() res , @Param('id') id : number , @Body() createBookDto : CreateBookDto) {
        try {
            const Book = await this.bookService.updateOne(id , createBookDto);
            if(!Book) throw new Error('The book could not be edited')
            return res.status(HttpStatus.OK).json({
                message: 'Correctly Edited Book',
                data: Book ? Book : {}
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: String(error.message),
                data: []
            })
        }
    }


    @Delete('/:id')
    async deleteBook(@Res() res , @Param('id') id : number) {
        try {
            const Book = await this.bookService.deleteOne(id);
            return res.status(HttpStatus.OK).json({
                message: 'Success',
                data: Book ? Book : {}
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: String(error.message),
                data: []
            })
        }
    }

}
